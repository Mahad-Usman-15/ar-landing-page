import Link from "next/link";
import { CONTACT, NAV_LINKS } from "@/lib/data";

const SOCIALS = [
  { label: "LinkedIn", href: CONTACT.linkedin },
  { label: "WhatsApp", href: CONTACT.whatsappUrl },
  { label: "Email", href: `mailto:${CONTACT.email}` },
];

export default function Footer() {
  return (
    <footer className="border-t border-line bg-canvas">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-3">
          <div>
            <p className="font-display text-3xl leading-none text-white uppercase">
              AbdurRahman
              <span className="block text-acid">Mahmood</span>
            </p>
            <p className="mt-3 font-body text-sm font-light text-mist">
              {CONTACT.title}
            </p>
          </div>

          <nav aria-label="Footer">
            <h2 className="font-display text-lg tracking-widest text-white uppercase">
              Navigate
            </h2>
            <ul className="mt-4 space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-body text-sm font-light text-mist transition-colors hover:text-acid"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="font-display text-lg tracking-widest text-white uppercase">
              Connect
            </h2>
            <ul className="mt-4 space-y-2">
              {SOCIALS.map((social) => (
                <li key={social.label}>
                  <Link
                    href={social.href}
                    target={social.href.startsWith("mailto:") ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    className="font-body text-sm font-light text-mist transition-colors hover:text-acid"
                  >
                    {social.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-body text-xs font-light text-mist">
            © {new Date().getFullYear()} AbdurRahman Mahmood. All rights reserved.
          </p>
          <p className="font-body text-xs font-light text-mist">
            Business &amp; Creative Strategy · Branding · AI &amp; Automation
          </p>
        </div>
      </div>
    </footer>
  );
}
