"use client";

import { useActionState, useEffect, useRef } from "react";
import { useFormStatus } from "react-dom";
import Link from "next/link";
import { submitContactForm } from "@/app/actions";
import { initialContactState } from "@/lib/contact";
import { Parallax, Reveal } from "@/components/motion";
import { CONTACT, SERVICES } from "@/lib/data";

const FIELD_CLASS =
  "w-full rounded-base border border-line bg-charcoal/40 px-4 py-3 font-body text-base font-light text-white placeholder:text-mist/60 transition-colors focus:border-acid focus:outline-none focus:ring-1 focus:ring-acid";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="group inline-flex items-center gap-3 border border-acid bg-acid px-8 py-3 font-display text-xl tracking-widest text-black uppercase transition-all glow-hover hover:bg-transparent hover:text-acid disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? "Sending…" : "Submit"}
      <span aria-hidden className="transition-transform group-hover:translate-x-1">
        →
      </span>
    </button>
  );
}

export default function Contact() {
  const [state, formAction] = useActionState(submitContactForm, initialContactState);

  // The text fields repopulate themselves: React syncs `defaultValue` to the DOM
  // `defaultValue` attribute, which is exactly what `form.reset()` restores.
  // A <select> is the exception — `reset()` restores it from its options'
  // `defaultSelected`, which React never sets from the select's `defaultValue`,
  // so the chosen service silently reverts to the placeholder on a failed submit.
  // Re-apply it after every action result. This effect runs after the commit that
  // performs the reset, and writes unconditionally, so it cannot be skipped by a
  // state bail-out the way a controlled value could.
  const serviceRef = useRef<HTMLSelectElement>(null);
  useEffect(() => {
    if (serviceRef.current) serviceRef.current.value = state.values.service;
  }, [state]);

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="mx-auto max-w-6xl px-5 py-20 sm:px-8 md:py-28"
    >
      <Reveal>
        <p className="font-display text-base tracking-[0.3em] text-acid uppercase">
          Enquiries
        </p>
        <h2
          id="contact-heading"
          className="mt-2 font-display text-6xl leading-[0.9] text-white uppercase sm:text-7xl md:text-8xl"
        >
          Let&apos;s Build
          <span className="block text-acid">Something Big</span>
        </h2>
      </Reveal>

      <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Reveal className="lg:col-span-2">
          <form action={formAction} noValidate className="flex flex-col gap-4">
            {/* Honeypot — visually hidden, ignored by humans. The name avoids
                anything address-autofill recognises (see app/actions.ts). */}
            <input
              type="text"
              name="hp_ref"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden
              className="absolute h-0 w-0 opacity-0"
            />

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="sr-only">
                  Your name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  placeholder="Your name"
                  defaultValue={state.values.name}
                  aria-invalid={Boolean(state.errors.name)}
                  aria-describedby={state.errors.name ? "name-error" : undefined}
                  className={FIELD_CLASS}
                />
                {state.errors.name && (
                  <p id="name-error" className="mt-1 font-body text-xs text-acid">
                    {state.errors.name}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="sr-only">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="Email address"
                  defaultValue={state.values.email}
                  aria-invalid={Boolean(state.errors.email)}
                  aria-describedby={state.errors.email ? "email-error" : undefined}
                  className={FIELD_CLASS}
                />
                {state.errors.email && (
                  <p id="email-error" className="mt-1 font-body text-xs text-acid">
                    {state.errors.email}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="phone" className="sr-only">
                  Phone number (optional)
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  placeholder="Phone (optional)"
                  defaultValue={state.values.phone}
                  className={FIELD_CLASS}
                />
              </div>

              <div>
                <label htmlFor="service" className="sr-only">
                  Service you need
                </label>
                <select
                  id="service"
                  name="service"
                  ref={serviceRef}
                  defaultValue={state.values.service}
                  className={FIELD_CLASS}
                >
                  <option value="" disabled>
                    What do you need?
                  </option>
                  {SERVICES.map((service) => (
                    <option key={service.title} value={service.title}>
                      {service.title}
                    </option>
                  ))}
                  <option value="Something else">Something else</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="message" className="sr-only">
                Your enquiry
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={7}
                placeholder="Tell me about your project…"
                defaultValue={state.values.message}
                aria-invalid={Boolean(state.errors.message)}
                aria-describedby={state.errors.message ? "message-error" : undefined}
                className={`${FIELD_CLASS} resize-y`}
              />
              {state.errors.message && (
                <p id="message-error" className="mt-1 font-body text-xs text-acid">
                  {state.errors.message}
                </p>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <SubmitButton />
              <p
                role="status"
                aria-live="polite"
                className={`font-body text-sm font-light ${
                  state.status === "success" ? "text-acid" : "text-mist"
                }`}
              >
                {state.message}
              </p>
            </div>
          </form>
        </Reveal>

        <Parallax speed={-0.05}>
          <Reveal delay={120}>
            <div className="h-full rounded-lg bg-acid p-7 text-black">
              <h3 className="font-display text-2xl tracking-wide uppercase">
                Direct Contact
              </h3>

              <dl className="mt-6 space-y-5">
                <div className="border-b border-black/25 pb-4">
                  <dt className="font-display text-lg tracking-wide uppercase">Email</dt>
                  <dd className="mt-1">
                    <Link
                      href={`mailto:${CONTACT.email}`}
                      className="font-body text-sm break-all underline-offset-4 hover:underline"
                    >
                      {CONTACT.email}
                    </Link>
                  </dd>
                </div>

                <div className="border-b border-black/25 pb-4">
                  <dt className="font-display text-lg tracking-wide uppercase">WhatsApp</dt>
                  <dd className="mt-1">
                    <Link
                      href={CONTACT.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-body text-sm underline-offset-4 hover:underline"
                    >
                      {CONTACT.whatsapp}
                    </Link>
                  </dd>
                </div>

                <div>
                  <dt className="font-display text-lg tracking-wide uppercase">LinkedIn</dt>
                  <dd className="mt-1">
                    <Link
                      href={CONTACT.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-body text-sm underline-offset-4 hover:underline"
                    >
                      Connect with AbdurRahman
                    </Link>
                  </dd>
                </div>
              </dl>

              <p className="mt-6 font-body text-xs">
                Typical response time: within 24 hours.
              </p>
            </div>
          </Reveal>
        </Parallax>
      </div>
    </section>
  );
}
