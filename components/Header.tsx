"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { NAV_LINKS, CONTACT } from "@/lib/data";

export default function Header() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const openerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  // Distinguishes "closed because the user closed it" from "closed on first
  // render", so mounting the page never steals focus to the hamburger.
  const hasOpened = useRef(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Send focus into the dialog when it opens and return it to the trigger when
  // it closes — without this, opening the menu leaves focus on the hamburger
  // and Tab walks the page hidden underneath the overlay.
  useEffect(() => {
    if (open) {
      hasOpened.current = true;
      closeRef.current?.focus();
    } else if (hasOpened.current) {
      openerRef.current?.focus();
    }
  }, [open]);

  // Escape to dismiss, and a Tab cycle confined to the overlay.
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        return;
      }
      if (event.key !== "Tab") return;

      const root = menuRef.current;
      if (!root) return;

      const focusables = Array.from(
        root.querySelectorAll<HTMLElement>("a[href], button:not([disabled])")
      );
      if (focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement;
      const outside = !root.contains(active);

      if (event.shiftKey && (active === first || outside)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (active === last || outside)) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="flex items-center justify-between bg-canvas/90 px-5 py-4 backdrop-blur-sm sm:px-8">
        <Link
          href="#home"
          className="font-display text-xl tracking-wide text-white uppercase glow-text-hover sm:text-2xl"
        >
          AbdurRahman Mahmood
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-display text-base tracking-widest text-white uppercase transition-colors hover:text-acid"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="#contact"
            className="border border-acid px-5 py-1.5 font-display text-base tracking-widest text-acid uppercase transition-colors glow-hover hover:bg-acid hover:text-black"
          >
            Work With Me
          </Link>
        </nav>

        <button
          ref={openerRef}
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          aria-expanded={open}
          aria-haspopup="dialog"
          aria-controls="mobile-menu"
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
        >
          <span className="h-0.5 w-7 bg-white" />
          <span className="h-0.5 w-7 bg-white" />
          <span className="h-0.5 w-7 bg-acid" />
        </button>
      </div>

      {/* Fullscreen acid overlay menu */}
      <div
        ref={menuRef}
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        className={`fixed inset-0 z-50 flex flex-col bg-acid px-8 py-6 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        // `inert` (not just aria-hidden) so the off-screen menu is neither
        // focusable by keyboard nor exposed to assistive tech while closed.
        inert={!open}
      >
        <div className="flex items-center justify-between">
          <span className="font-display text-xl tracking-wide text-black uppercase">
            Menu
          </span>
          <button
            ref={closeRef}
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="relative h-10 w-10"
          >
            <span className="absolute top-1/2 left-1/2 h-0.5 w-8 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-black" />
            <span className="absolute top-1/2 left-1/2 h-0.5 w-8 -translate-x-1/2 -translate-y-1/2 -rotate-45 bg-black" />
          </button>
        </div>

        <nav
          aria-label="Menu"
          className="mt-12 flex flex-col gap-2 overflow-y-auto"
        >
          {NAV_LINKS.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="font-display text-5xl leading-tight tracking-wide text-black uppercase transition-transform duration-300 hover:translate-x-3 sm:text-6xl"
              style={{ transitionDelay: `${i * 30}ms` }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="mt-auto border-t border-black/30 pt-6">
          <Link
            href={`mailto:${CONTACT.email}`}
            className="font-body text-sm font-medium text-black underline-offset-4 hover:underline"
          >
            {CONTACT.email}
          </Link>
        </div>
      </div>
    </header>
  );
}
