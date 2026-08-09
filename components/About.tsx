import { Parallax, Reveal } from "@/components/motion";
import { EXPERIENCE } from "@/lib/data";

const STATS = [
  { value: "18+", label: "Services Delivered Across Disciplines" },
  { value: "9+", label: "Brands & Companies Worked With" },
  { value: "2", label: "Companies Founded & Led" },
];

export default function About() {
  return (
    <section id="about" aria-labelledby="about-heading" className="mx-auto max-w-6xl px-5 py-20 sm:px-8 md:py-28">
      <Reveal>
        <h2 id="about-heading" className="font-display text-6xl leading-[0.9] text-white uppercase sm:text-7xl md:text-8xl">
          The Mind Behind
          <span className="block text-acid">The Strategy</span>
        </h2>
      </Reveal>

      <div className="mt-12 grid grid-cols-1 gap-12 md:grid-cols-5 md:gap-8">
        <Reveal className="md:col-span-3">
          <p className="font-body text-lg leading-relaxed font-light text-mist">
            AbdurRahman specializes in business growth, branding, finance,
            technology and digital innovation. From founding and leading{" "}
            <span className="text-white">Gracode Studio</span> and{" "}
            <span className="text-white">WHAZ</span> to consulting for brands
            across e-commerce, gaming and fashion, he combines creativity,
            business intelligence and technology to build impactful brands and
            sustainable businesses.
          </p>
          <p className="mt-6 font-body text-lg leading-relaxed font-light text-mist">
            His mission is simple: strategy that looks as good as it performs —
            creative execution grounded in numbers, powered by AI, and built to
            convert.
          </p>

          {/* Stats cards with alternating parallax drift */}
          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {STATS.map((stat, i) => (
              <Parallax key={stat.label} speed={i % 2 === 0 ? -0.05 : 0.05}>
                <div className="glow-hover h-full border border-line bg-charcoal/40 p-6">
                  <p className="font-display text-6xl text-acid">{stat.value}</p>
                  <p className="mt-2 font-body text-sm font-light text-mist">
                    {stat.label}
                  </p>
                </div>
              </Parallax>
            ))}
          </div>
        </Reveal>

        <Reveal delay={120} className="md:col-span-2">
          <h3 className="font-display text-2xl tracking-widest text-white uppercase">
            Roles &amp; Experience
          </h3>
          <ul className="mt-6 divide-y divide-line border-y border-line">
            {EXPERIENCE.map((item) => (
              <li
                key={`${item.role}-${item.org}`}
                className="group flex items-baseline justify-between gap-4 py-3 transition-colors hover:bg-charcoal/40"
              >
                <span className="font-body text-sm font-light text-mist transition-colors group-hover:text-white">
                  {item.role}
                </span>
                <span className="font-display text-lg tracking-wide text-white uppercase transition-colors group-hover:text-acid">
                  {item.org}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
