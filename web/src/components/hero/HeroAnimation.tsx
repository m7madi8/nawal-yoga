"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

function nodes(root: HTMLElement, sel: string) {
  return gsap.utils.toArray<HTMLElement>(root.querySelectorAll(sel));
}

/**
 * Cinematic hero entrance — calm luxury pacing.
 */
export function HeroAnimation({ children, className, delay = 0.4 }: Props) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      gsap.set(nodes(el, "[data-hero]"), { clearProps: "all", opacity: 1, y: 0, filter: "none" });
      return;
    }

    const ctx = gsap.context(() => {
      const brand = nodes(el, "[data-hero='brand']");
      const words = nodes(el, "[data-hero='word']");
      const support = nodes(el, "[data-hero='support']");
      const cta = nodes(el, "[data-hero='cta']");
      const meta = nodes(el, "[data-hero='meta']");

      const all = [...brand, ...words, ...support, ...cta, ...meta];
      if (all.length) gsap.set(all, { opacity: 0, y: 20 });
      const canBlur = !window.matchMedia("(max-width: 768px)").matches;
      if (words.length) gsap.set(words, { y: 40, ...(canBlur ? { filter: "blur(6px)" } : {}) });

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        delay,
      });

      if (brand.length) tl.to(brand, { opacity: 1, y: 0, duration: 1.1 }, 0);
      if (meta.length) tl.to(meta, { opacity: 1, y: 0, duration: 1 }, 0.12);
      if (words.length) {
        tl.to(
          words,
          {
            opacity: 1,
            y: 0,
            ...(canBlur ? { filter: "blur(0px)" } : {}),
            duration: 1.35,
            stagger: 0.14,
          },
          0.22,
        );
      }
      if (support.length) tl.to(support, { opacity: 1, y: 0, duration: 1.1 }, 0.58);
      if (cta.length) tl.to(cta, { opacity: 1, y: 0, duration: 1, stagger: 0.1 }, 0.78);
    }, el);

    return () => ctx.revert();
  }, [delay]);

  return (
    <div ref={root} className={className}>
      {children}
    </div>
  );
}
