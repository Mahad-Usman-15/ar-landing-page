"use server";

import { headers } from "next/headers";
import { Resend } from "resend";
import { CONTACT } from "@/lib/data";
import {
  EMPTY_CONTACT_VALUES,
  type ContactState,
  type ContactValues,
} from "@/lib/contact";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// --- Rate limiting -----------------------------------------------------------
// This action is reachable by anyone who can POST to the page, and every call
// that reaches Resend costs quota and lands in a real inbox. The honeypot below
// only stops naive bots, not a scripted loop.
//
// Deliberately in-memory: this site is a single page with no datastore, and a
// per-instance counter still caps the blast radius of a flood. Only *successful
// sends* are recorded, so a visitor who mistypes their email five times is never
// locked out — the budget tracks outbound email, not form attempts.
const RATE_LIMIT_MAX_SENDS = 3;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const sendLog = new Map<string, number[]>();

function prune(now: number) {
  for (const [key, times] of sendLog) {
    const recent = times.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
    if (recent.length === 0) sendLog.delete(key);
    else sendLog.set(key, recent);
  }
}

async function clientKey(): Promise<string> {
  const h = await headers();
  const forwarded = h.get("x-forwarded-for");
  return (
    forwarded?.split(",")[0]?.trim() ||
    h.get("x-real-ip")?.trim() ||
    "unknown"
  );
}

function hasSendBudget(key: string): boolean {
  const now = Date.now();
  prune(now);
  const recent = sendLog.get(key) ?? [];
  return recent.length < RATE_LIMIT_MAX_SENDS;
}

function recordSend(key: string) {
  const now = Date.now();
  sendLog.set(key, [...(sendLog.get(key) ?? []), now]);
}
// -----------------------------------------------------------------------------

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function submitContactForm(
  _prevState: ContactState,
  formData: FormData
): Promise<ContactState> {
  const values: ContactValues = {
    name: String(formData.get("name") ?? "").trim(),
    email: String(formData.get("email") ?? "").trim(),
    phone: String(formData.get("phone") ?? "").trim(),
    service: String(formData.get("service") ?? "").trim(),
    message: String(formData.get("message") ?? "").trim(),
  };

  // Honeypot — bots fill hidden fields, humans do not. Deliberately *not* named
  // "company"/"organization": browser address autofill populates those even with
  // `autocomplete="off"`, which would silently discard a real enquiry behind a
  // fake success message. The warning below makes that case diagnosable.
  if (String(formData.get("hp_ref") ?? "").trim() !== "") {
    console.warn("Contact form honeypot tripped — submission discarded.");
    return {
      status: "success",
      message: "Thanks — your message is on its way.",
      errors: {},
      values: EMPTY_CONTACT_VALUES,
    };
  }

  const { name, email, phone, service, message } = values;

  const errors: ContactState["errors"] = {};
  if (name.length < 2) errors.name = "Please enter your name.";
  if (!EMAIL_PATTERN.test(email)) errors.email = "Please enter a valid email address.";
  if (message.length < 10) errors.message = "Tell me a little more — at least 10 characters.";
  if (name.length > 120) errors.name = "That name is too long.";
  if (message.length > 5000) errors.message = "Please keep it under 5000 characters.";

  if (Object.keys(errors).length > 0) {
    return {
      status: "error",
      message: "Please fix the highlighted fields.",
      errors,
      values,
    };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not set — contact form cannot send email.");
    return {
      status: "error",
      message: `Email delivery isn't configured yet. Please reach out directly at ${CONTACT.email}.`,
      errors: {},
      values,
    };
  }

  const key = await clientKey();
  if (!hasSendBudget(key)) {
    console.warn(`Contact form rate limit hit for ${key}.`);
    return {
      status: "error",
      message: `You've sent a few messages already — I've got them. For anything urgent, email ${CONTACT.email} directly.`,
      errors: {},
      values,
    };
  }

  const resend = new Resend(apiKey);
  const from = process.env.CONTACT_FROM_EMAIL ?? "New Enquiry <onboarding@resend.dev>";
  const to = process.env.CONTACT_TO_EMAIL ?? CONTACT.email;

  try {
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `New enquiry from ${name}${service ? ` — ${service}` : ""}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        phone ? `Phone: ${phone}` : null,
        service ? `Service: ${service}` : null,
        "",
        message,
      ]
        .filter(Boolean)
        .join("\n"),
      html: `
        <div style="font-family:Arial,sans-serif;background:#000;color:#fff;padding:24px">
          <h1 style="color:#dbff00;font-size:20px;margin:0 0 16px">New Website Enquiry</h1>
          <p style="margin:4px 0"><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p style="margin:4px 0"><strong>Email:</strong> ${escapeHtml(email)}</p>
          ${phone ? `<p style="margin:4px 0"><strong>Phone:</strong> ${escapeHtml(phone)}</p>` : ""}
          ${service ? `<p style="margin:4px 0"><strong>Service:</strong> ${escapeHtml(service)}</p>` : ""}
          <p style="margin:16px 0 4px"><strong>Message:</strong></p>
          <p style="white-space:pre-wrap;margin:0">${escapeHtml(message)}</p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend returned an error:", error);
      return {
        status: "error",
        message: `Something went wrong sending your message. Please email ${CONTACT.email} directly.`,
        errors: {},
        values,
      };
    }
  } catch (cause) {
    console.error("Contact form send failed:", cause);
    return {
      status: "error",
      message: `Something went wrong sending your message. Please email ${CONTACT.email} directly.`,
      errors: {},
      values,
    };
  }

  recordSend(key);

  return {
    status: "success",
    message: "Message received. I'll get back to you within 24 hours.",
    errors: {},
    // Cleared deliberately: a successful send should leave an empty form.
    values: EMPTY_CONTACT_VALUES,
  };
}
