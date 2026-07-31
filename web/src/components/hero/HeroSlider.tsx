"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { clsx } from "clsx";

export type HeroSlide = {
  /** Desktop / wide screens */
  src: string;
  /** Portrait crop for phones */
  mobileSrc?: string;
  alt: string;
  label: string;
};

type Props = {
  slides: HeroSlide[];
  intervalMs?: number;
  className?: string;
  onIndexChange?: (index: number) => void;
  showThumbs?: boolean;
};

const ease = [0.22, 1, 0.36, 1] as const;

export function HeroSlider({
  slides,
  intervalMs = 5200,
  className,
  onIndexChange,
  showThumbs = true,
}: Props) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const goTo = useCallback(
    (next: number) => {
      const i = ((next % slides.length) + slides.length) % slides.length;
      setIndex(i);
      onIndexChange?.(i);
    },
    [onIndexChange, slides.length],
  );

  useEffect(() => {
    if (paused || slides.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const id = window.setInterval(() => {
      setIndex((prev) => {
        const next = (prev + 1) % slides.length;
        onIndexChange?.(next);
        return next;
      });
    }, intervalMs);

    return () => window.clearInterval(id);
  }, [intervalMs, onIndexChange, paused, slides.length]);

  const slide = slides[index];
  const mobileSrc = slide.mobileSrc ?? slide.src;

  return (
    <div
      className={clsx("relative h-full w-full overflow-hidden bg-stone", className)}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <AnimatePresence mode="sync" initial={false}>
        <motion.div
          key={`${slide.src}-${mobileSrc}`}
          className="absolute inset-0"
          initial={{ opacity: 0, filter: "blur(12px)", scale: 1.06 }}
          animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
          exit={{ opacity: 0, filter: "blur(6px)" }}
          transition={{ duration: 1.6, ease }}
        >
          <motion.div
            className="absolute inset-0"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1.02 }}
            transition={{ duration: intervalMs / 1000 + 1, ease: "linear" }}
          >
            <div className="relative h-full w-full">
              {/* Mobile portrait heroes */}
              <Image
                src={mobileSrc}
                alt={slide.alt}
                fill
                priority={index === 0}
                sizes="100vw"
                className="object-cover object-center md:hidden"
                quality={88}
              />
              {/* Desktop / tablet landscape */}
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                priority={index === 0}
                sizes="100vw"
                className="hidden object-cover object-center md:block"
                quality={88}
              />
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/25 via-transparent to-transparent" />

      {showThumbs && (
        <div className="hero-thumbs absolute inset-x-0 bottom-4 z-20 flex justify-center gap-2 px-4 sm:bottom-5">
          {slides.map((s, i) => (
            <button
              key={s.mobileSrc ?? s.src}
              type="button"
              onClick={() => goTo(i)}
              aria-label={s.label}
              aria-current={i === index}
              className={clsx(
                "relative h-10 w-8 overflow-hidden rounded-md border transition-all duration-500 sm:h-12 sm:w-9",
                i === index
                  ? "border-white/80 opacity-100 scale-105"
                  : "border-white/25 opacity-55",
              )}
            >
              <Image
                src={s.mobileSrc ?? s.src}
                alt=""
                fill
                className="object-cover md:hidden"
                sizes="40px"
              />
              <Image
                src={s.src}
                alt=""
                fill
                className="hidden object-cover md:block"
                sizes="40px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
