import Image from "next/image";
import Link from "next/link";
import { Parallax, Reveal } from "@/components/motion";
import { ROLES_TICKER } from "@/lib/data";
import portrait from "@/public/abdurrehman.png";

export default function Hero() {
  return (
    <section id="home" aria-label="Introduction" className="pt-16">
      {/* Viewport-filling display name */}
      <div className="@container relative flex flex-col items-center overflow-hidden">
        <h1 className="w-full text-center font-display text-acid uppercase">
          {/*
            Bebas Neue renders "ABDURRAHMAN" at ~4.606x its font-size, so 21.4cqw
            spans the container almost exactly. Container units (not vw) because
            vw includes the scrollbar and would overflow by its width.
          */}
          <span className="block text-[21.4cqw] leading-[0.86]">AbdurRahman</span>
          <span className="sr-only">Mahmood — Business &amp; Creative Strategist</span>
        </h1>
        <p className="mt-4 flex items-center gap-3 font-display text-base tracking-[0.3em] text-white uppercase">
          Scroll
          <span aria-hidden className="inline-block animate-scroll-pulse text-acid">
            ↓
          </span>
        </p>
      </div>

      {/* Intro: copy left, portrait right */}
      <div className="mx-auto mt-16 grid max-w-6xl grid-cols-1 items-center gap-10 px-5 sm:px-8 md:mt-24 md:grid-cols-2 md:gap-6">
        <Reveal>
          <p className="max-w-xl font-body text-xl leading-relaxed font-light text-white sm:text-2xl">
            <span className="font-medium">AbdurRahman Mahmood</span>;{" "}
            <span className="text-acid">Business &amp; Creative Strategist</span>,
            entrepreneur and multidisciplinary professional — helping{" "}
            <span className="text-acid">startups, founders and businesses</span>{" "}
            scale through strategic consulting, creative execution,{" "}
            <span className="text-acid">AI-powered solutions</span> and
            performance-driven marketing.
          </p>
          <Link
            href="#about"
            className="mt-8 inline-flex items-center gap-3 font-display text-xl tracking-widest text-acid uppercase glow-text-hover"
          >
            About Me <span aria-hidden>→</span>
          </Link>
        </Reveal>

        <Parallax speed={-0.06} className="justify-self-center md:justify-self-end">
          <div className="relative">
            <div
              aria-hidden
              className="absolute -right-3 -bottom-3 h-full w-full border border-acid/40"
            />
            <Image
              src={portrait}
              alt="Portrait of AbdurRahman Mahmood, Business and Creative Strategist"
              // Left to default lazy loading. `preload`/`loading="eager"` both
              // emit a DPR-blind preload <link> that reserves a variant the
              // browser discards on high-DPR screens; in-viewport lazy images
              // are fetched immediately anyway, and the LCP element here is the
              // display type rather than this portrait.
              className="relative w-64 object-cover grayscale transition duration-500 hover:grayscale-0 sm:w-80 md:w-96"
              sizes="(max-width: 639px) 256px, (max-width: 767px) 320px, 384px"
            />
          </div>
        </Parallax>
      </div>

      {/* Roles marquee */}
      <div className="mt-16 overflow-hidden border-y border-line py-4 md:mt-24">
        <div className="flex w-max animate-marquee gap-8 whitespace-nowrap">
          {[...ROLES_TICKER, ...ROLES_TICKER].map((role, i) => (
            <span
              key={i}
              aria-hidden={i >= ROLES_TICKER.length}
              className="flex items-center gap-8 font-display text-2xl tracking-widest text-mist uppercase"
            >
              {role} <span className="text-acid">✦</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
