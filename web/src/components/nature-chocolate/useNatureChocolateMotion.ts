"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useNatureChocolateMotion(
  rootRef: React.RefObject<HTMLDivElement | null>,
  locale: string,
) {
  useEffect(() => {
    const page = rootRef.current;
    if (!page) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      const heroParts = page.querySelectorAll(
        ".nc-hero__labels, .nc-hero__title, .nc-hero__divider, .nc-hero__meta, .nc-hero .nc-sold-note, .nc-hero__cta",
      );

      if (reduce) {
        gsap.fromTo(
          heroParts,
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: 0.4, ease: "power1.out", stagger: 0.05 },
        );
        return;
      }

      page.classList.add("nc-page--motion");

      gsap.set(heroParts, { autoAlpha: 0, y: 20 });
      gsap
        .timeline({ defaults: { ease: "power2.out" } })
        .to(heroParts, { autoAlpha: 1, y: 0, duration: 0.85, stagger: 0.11 }, 0.18);

      gsap.utils
        .toArray<HTMLElement>(
          ".nc-intro__card, .nc-shots__grid, .nc-program__head, .nc-stop, .nc-reels__row, .nc-includes__card, .nc-pricing__head, .nc-pricing__grid, .nc-cta__inner",
        )
        .forEach((el) => {
          gsap.fromTo(
            el,
            { autoAlpha: 0, y: 28 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.75,
              ease: "power2.out",
              scrollTrigger: { trigger: el, start: "top 88%", once: true },
            },
          );
        });

      page.querySelectorAll(".nc-includes__item").forEach((item, i) => {
        gsap.fromTo(
          item,
          { autoAlpha: 0, x: 12 },
          {
            autoAlpha: 1,
            x: 0,
            duration: 0.45,
            delay: i * 0.05,
            ease: "power2.out",
            scrollTrigger: { trigger: item, start: "top 92%", once: true },
          },
        );
      });
    }, page);

    return () => {
      ctx.revert();
      page.classList.remove("nc-page--motion");
    };
  }, [rootRef, locale]);
}
