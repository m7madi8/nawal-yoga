"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useI18n } from "@/lib/i18n/provider";
import { Reveal } from "@/components/animations/Reveal";
import { TextReveal } from "@/components/animations/TextReveal";
import { AnimatedCounter } from "@/components/animations/AnimatedCounter";

gsap.registerPlugin(ScrollTrigger);

export function GuideSection() {
  const { t } = useI18n();
  const imgWrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = imgWrap.current;
    if (!wrap) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const img = wrap.querySelector("img");
    if (!img) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        img,
        { yPercent: -6, scale: 1.06 },
        {
          yPercent: 6,
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: "#about",
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    }, wrap);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" className="bg-[#fafaf8] py-[clamp(4.5rem,10vw,7rem)]">
      <div className="mx-auto grid max-w-[70rem] items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <Reveal>
          <div
            ref={imgWrap}
            className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-stone sm:rounded-[2rem]"
          >
            <Image
              src="/media/home/trainer.jpg"
              alt={t("brand")}
              fill
              className="object-cover will-change-transform"
              sizes="(max-width: 1024px) 100vw, 45vw"
            />
          </div>
        </Reveal>

        <div>
          <Reveal delay={0.08}>
            <p className="mb-3 text-[0.65rem] tracking-[0.28em] text-brass uppercase">
              {t("guide_kicker")}
            </p>
          </Reveal>
          <TextReveal className="font-display mb-3 text-[clamp(2rem,4vw,3.25rem)] font-light text-ink">
            {t("guide_hello")}
          </TextReveal>
          <Reveal delay={0.12}>
            <p className="mb-5 text-[0.7rem] tracking-[0.16em] text-brass uppercase">
              {t("guide_title")}
            </p>
            <p className="mb-5 max-w-md text-[1.05rem] leading-relaxed text-[var(--text-soft)]">
              {t("guide_bio_short")}
            </p>
            <p className="mb-8 max-w-md font-display text-xl leading-snug text-ink">
              {t("guide_trust")}
            </p>
            <div className="grid grid-cols-3 gap-4 border-t border-[var(--border-soft)] pt-6">
              <div>
                <p className="font-display text-2xl text-ink sm:text-3xl">
                  <AnimatedCounter to={2000} suffix="+" />
                </p>
                <p className="mt-1 text-[0.6rem] tracking-[0.12em] text-[var(--text-soft)] uppercase">
                  {t("stat_women")}
                </p>
              </div>
              <div>
                <p className="font-display text-2xl text-ink sm:text-3xl">
                  <AnimatedCounter to={7} suffix="+" duration={1.2} />
                </p>
                <p className="mt-1 text-[0.6rem] tracking-[0.12em] text-[var(--text-soft)] uppercase">
                  {t("stat_years")}
                </p>
              </div>
              <div>
                <p className="font-display text-2xl text-ink sm:text-3xl">
                  RYT <AnimatedCounter to={200} suffix="+" duration={1.4} />
                </p>
                <p className="mt-1 text-[0.6rem] tracking-[0.12em] text-[var(--text-soft)] uppercase">
                  {t("stat_cert")}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
