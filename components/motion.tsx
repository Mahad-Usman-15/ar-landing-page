"use client";

import {
  useEffect,
  useRef,
  type CSSProperties,
  type ReactNode,
} from "react";

/**
 * Fade-up reveal when the element enters the viewport.
 * `delay` staggers grids of cards (ms).
 */
export function Reveal({
  children,
  delay = 0,
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "article" | "li" | "figure";
}) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          // Also reveal anything already scrolled past — on reload with a
          // restored scroll position or a #hash landing, those never intersect.
          const alreadyPassed = entry.boundingClientRect.bottom < 0;
          if (entry.isIntersecting || alreadyPassed) {
            el.classList.add("is-visible");
            observer.disconnect();
          }
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      // @ts-expect-error — ref type varies with the rendered tag
      ref={ref}
      className={`reveal ${className}`}
      style={{ transitionDelay: delay ? `${delay}ms` : undefined }}
    >
      {children}
    </Tag>
  );
}

/**
 * Scroll parallax: translates children vertically relative to how far the
 * element is from the viewport center. Positive speed drifts down slower
 * than scroll (background feel); negative speed drifts against the scroll.
 */
export function Parallax({
  children,
  speed = 0.12,
  minWidth = 640,
  className = "",
  style,
}: {
  children: ReactNode;
  speed?: number;
  /**
   * Below this viewport width the drift is disabled. Grids collapse to a single
   * column on small screens, where differing offsets make stacked cards collide
   * instead of reading as depth.
   */
  minWidth?: number;
  className?: string;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      if (window.innerWidth < minWidth) {
        el.style.transform = "";
        return;
      }
      const rect = el.getBoundingClientRect();
      const viewportCenter = window.innerHeight / 2;
      const elementCenter = rect.top + rect.height / 2;
      const offset = (elementCenter - viewportCenter) * speed;
      el.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [speed, minWidth]);

  return (
    <div ref={ref} data-parallax className={`will-change-transform ${className}`} style={style}>
      {children}
    </div>
  );
}
