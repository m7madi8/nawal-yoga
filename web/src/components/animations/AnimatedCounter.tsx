"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Props = {
  to: number;
  suffix?: string;
  prefix?: string;
  className?: string;
  duration?: number;
};

export function AnimatedCounter({
  to,
  suffix = "",
  prefix = "",
  className,
  duration = 1.6,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.textContent = `${prefix}${to}${suffix}`;
      return;
    }

    const state = { value: 0 };
    const ctx = gsap.context(() => {
      gsap.to(state, {
        value: to,
        duration,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          once: true,
        },
        onUpdate: () => {
          el.textContent = `${prefix}${Math.round(state.value)}${suffix}`;
        },
      });
    }, el);

    return () => ctx.revert();
  }, [to, suffix, prefix, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}0{suffix}
    </span>
  );
}
