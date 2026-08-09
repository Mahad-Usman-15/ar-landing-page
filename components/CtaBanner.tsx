import Link from "next/link";
import { Reveal } from "@/components/motion";
import { CONTACT } from "@/lib/data";

export default function CtaBanner() {
  return (
    <section aria-labelledby="cta-heading" className="bg-acid text-black">
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-8 px-5 py-16 sm:px-8 md:flex-row md:items-center md:justify-between md:py-20">
        <Reveal>
          <h2
            id="cta-heading"
            className="font-display text-5xl leading-[0.9] uppercase sm:text-6xl md:text-7xl"
          >
            Ready To Scale
            <span className="block">Your Business?</span>
          </h2>
          <p className="mt-4 max-w-md font-body text-base font-light">
            Strategy, brand and technology under one roof. Let&apos;s turn your
            idea into a business that performs.
          </p>
        </Reveal>

        <Reveal delay={100}>
          <div className="flex flex-col gap-3 sm:flex-row md:flex-col lg:flex-row">
            <Link
              href="#contact"
              className="group inline-flex items-center justify-center gap-3 border border-black bg-black px-8 py-4 font-display text-xl tracking-widest text-acid uppercase transition-colors hover:bg-transparent hover:text-black"
            >
              Start A Project
              <span aria-hidden className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </Link>
            <Link
              href={CONTACT.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 border border-black px-8 py-4 font-display text-xl tracking-widest uppercase transition-colors hover:bg-black hover:text-acid"
            >
              WhatsApp Me
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
