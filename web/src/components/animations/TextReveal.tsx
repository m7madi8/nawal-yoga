"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { clsx } from "clsx";

gsap.registerPlugin(ScrollTrigger);

type Props = {
  children: string;
  as?: ElementType;
  className?: string;
  delay?: number;
  /** Animate on mount (hero) instead of scroll */
  immediate?: boolean;
  mode?: "words" | "lines";
};

/**
 * Calm word-mask reveal for headings. Pass plain string children only.
 */
export function TextReveal({
  children,
  as: Tag = "h2",
  className,
  delay = 0,
  immediate = false,
  mode = "words",
}: Props) {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const targets = el.querySelectorAll<HTMLElement>("[data-tr-word]");
    if (!targets.length) return;

    const ctx = gsap.context(() => {
      gsap.set(targets, { yPercent: 110, opacity: 0, rotate: 0.2 });
      const tween = {
        yPercent: 0,
        opacity: 1,
        rotate: 0,
        duration: 1.05,
        stagger: mode === "words" ? 0.045 : 0.08,
        delay,
        ease: "power3.out",
      };

      if (immediate) {
        gsap.to(targets, tween);
      } else {
        gsap.to(targets, {
          ...tween,
          scrollTrigger: {
            trigger: el,
            start: "top 86%",
            toggleActions: "play none none none",
          },
        });
      }
    }, el);

    return () => ctx.revert();
  }, [children, delay, immediate, mode]);

  const words = children.trim().split(/(\s+)/);

  return (
    <Tag ref={root} className={clsx("text-reveal", className)}>
      {words.map((chunk, i) => {
        if (/^\s+$/.test(chunk)) {
          return <span key={`s-${i}`}>{chunk}</span>;
        }
        return (
          <span key={`w-${i}`} className="inline-block overflow-hidden align-bottom pb-[0.08em]">
            <span data-tr-word className="inline-block will-change-transform">
              {chunk}
            </span>
          </span>
        );
      })}
    </Tag>
  );
}

export function SoftText({
  children,
  className,
  delay = 0,
  as: Tag = "p",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: ElementType;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 18 },
        {
          opacity: 1,
          y: 0,
          duration: 1.15,
          delay,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        },
      );
    }, el);

    return () => ctx.revert();
  }, [delay]);

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
