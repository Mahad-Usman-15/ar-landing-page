"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Parallax, Reveal } from "@/components/motion";
import {
  PORTFOLIO_CATEGORIES,
  PORTFOLIO_ITEMS,
  type PortfolioItem,
} from "@/lib/data";

/** Plays only while the card is on screen, so reels never all download at once. */
function ShowreelVideo({ item }: { item: PortfolioItem }) {
  const ref = useRef<HTMLVideoElement | null>(null);
  const [blocked, setBlocked] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // `preload="metadata"` paints the first frame in most browsers, but
          // where autoplay is refused (iOS Low Power Mode, "never autoplay"
          // settings) that frame can stay blank with no way to start playback.
          // Fall back to native controls so the reel is still reachable.
          video.play().catch(() => setBlocked(true));
        } else {
          video.pause();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      src={item.src}
      className="h-full w-full bg-charcoal object-cover transition duration-700 group-hover:scale-105"
      muted
      loop
      playsInline
      preload="metadata"
      controls={blocked}
      aria-label={item.alt}
    />
  );
}

function PortfolioCard({ item, index }: { item: PortfolioItem; index: number }) {
  return (
    <figure className="glow-hover group relative overflow-hidden border border-line bg-charcoal/40">
      <div className="relative aspect-4/5 w-full">
        {item.type === "image" ? (
          <Image
            src={item.src}
            alt={item.alt}
            fill
            sizes="(max-width: 1024px) 50vw, 33vw"
            className="object-cover transition duration-700 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <ShowreelVideo item={item} />
        )}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100"
        />
      </div>
      <figcaption className="absolute bottom-0 left-0 flex w-full items-center justify-between gap-2 px-3 py-2.5 sm:px-4 sm:py-3">
        <span className="font-display text-sm tracking-wide text-white uppercase sm:text-xl">
          {item.category}
        </span>
        <span
          aria-hidden
          className="text-acid transition-transform duration-300 group-hover:translate-x-1"
        >
          →
        </span>
      </figcaption>
      <span className="absolute top-3 left-4 font-display text-sm tracking-widest text-acid">
        {String(index + 1).padStart(2, "0")}
      </span>
      {item.type === "video" && (
        <span className="absolute top-3 right-4 border border-acid/60 px-2 py-0.5 font-display text-xs tracking-widest text-acid">
          Reel
        </span>
      )}
    </figure>
  );
}

export default function Portfolio() {
  const [active, setActive] =
    useState<(typeof PORTFOLIO_CATEGORIES)[number]>("All");

  const items =
    active === "All"
      ? PORTFOLIO_ITEMS
      : PORTFOLIO_ITEMS.filter((item) => item.category === active);

  return (
    <section
      id="portfolio"
      aria-labelledby="portfolio-heading"
      className="mx-auto max-w-6xl px-5 py-20 sm:px-8 md:py-28"
    >
      <Reveal>
        <p className="font-display text-base tracking-[0.3em] text-acid uppercase">
          Selected Work
        </p>
        <h2
          id="portfolio-heading"
          className="mt-2 font-display text-6xl leading-[0.9] text-white uppercase sm:text-7xl md:text-8xl"
        >
          Proof, Not
          <span className="block text-acid">Promises</span>
        </h2>
      </Reveal>

      {/*
        Toggle buttons, not tabs. The ARIA tab pattern promises a `tabpanel`,
        `aria-controls`, and arrow-key navigation; none of that exists here, so
        `role="tab"` only told screen readers about controls that lead nowhere.
        `aria-pressed` describes what these actually are.
      */}
      <div
        role="group"
        aria-label="Filter portfolio by category"
        className="mt-10 flex flex-wrap gap-3"
      >
        {PORTFOLIO_CATEGORIES.map((category) => (
          <button
            key={category}
            type="button"
            aria-pressed={active === category}
            onClick={() => setActive(category)}
            className={`border px-4 py-1.5 font-display text-base tracking-widest uppercase transition-colors ${
              active === category
                ? "border-acid bg-acid text-black"
                : "glow-hover border-line text-mist hover:text-white"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Filtering swaps the grid silently; announce the result for screen readers. */}
      <p role="status" aria-live="polite" className="sr-only">
        {`Showing ${items.length} ${items.length === 1 ? "project" : "projects"}${
          active === "All" ? "" : ` in ${active}`
        }.`}
      </p>

      {/* Two-up even on the smallest screens — 17 stacked tiles is an unusable scroll */}
      <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3">
        {items.map((item, i) => (
          <Parallax
            key={item.src}
            speed={[-0.05, 0.04, -0.03][i % 3]}
          >
            <Reveal delay={(i % 3) * 80}>
              <PortfolioCard item={item} index={i} />
            </Reveal>
          </Parallax>
        ))}
      </div>
    </section>
  );
}
