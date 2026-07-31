"use client";

import { useEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useSoundHealingMotion(root: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const heroBits = gsap.utils.toArray<HTMLElement>(el.querySelectorAll("[data-sh-hero]"));
      if (heroBits.length) {
        gsap.fromTo(
          heroBits,
          { opacity: 0, y: 22 },
          {
            opacity: 1,
            y: 0,
            duration: 0.95,
            stagger: 0.08,
            ease: "power3.out",
            delay: 0.12,
          },
        );
      }

      gsap.utils.toArray<HTMLElement>(el.querySelectorAll("[data-sh-reveal]")).forEach((section) => {
        gsap.fromTo(
          section,
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>(el.querySelectorAll("[data-sh-cell]")).forEach((cell, i) => {
        gsap.fromTo(
          cell,
          { opacity: 0, scale: 0.96 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.75,
            delay: i * 0.05,
            ease: "power2.out",
            scrollTrigger: {
              trigger: cell,
              start: "top 92%",
              toggleActions: "play none none none",
            },
          },
        );
      });
    }, el);

    return () => ctx.revert();
  }, [root]);
}
