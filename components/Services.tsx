import { Parallax, Reveal } from "@/components/motion";
import { SERVICES } from "@/lib/data";

export default function Services() {
  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="border-y border-line bg-charcoal/20 py-20 md:py-28"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <p className="font-display text-base tracking-[0.3em] text-acid uppercase">
            What I Do
          </p>
          <h2
            id="services-heading"
            className="mt-2 font-display text-6xl leading-[0.9] text-white uppercase sm:text-7xl md:text-8xl"
          >
            Services Built
            <span className="block text-acid">To Convert</span>
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, i) => (
            <Parallax
              key={service.title}
              // three-column rhythm: outer columns drift up, middle drifts down
              speed={[-0.04, 0.06, -0.04][i % 3]}
            >
              <Reveal delay={(i % 3) * 90} className="h-full">
                <article className="glow-hover group flex h-full flex-col border border-line bg-canvas p-7">
                  <span className="font-display text-lg text-line transition-colors group-hover:text-acid">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-3 font-display text-3xl leading-none text-white uppercase">
                    {service.title}
                  </h3>
                  <p className="mt-4 flex-1 font-body text-sm leading-relaxed font-light text-mist">
                    {service.description}
                  </p>
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {service.items.map((item) => (
                      <li
                        key={item}
                        className="border border-line px-3 py-1 font-body text-xs font-medium text-mist transition-colors group-hover:border-acid/40 group-hover:text-white"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            </Parallax>
          ))}
        </div>
      </div>
    </section>
  );
}
