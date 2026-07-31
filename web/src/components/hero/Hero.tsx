"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { useI18n } from "@/lib/i18n/provider";
import { waLink } from "@/lib/i18n/dictionaries";
import { MagneticButton } from "@/components/animations/MagneticButton";
import { HeroSlider, type HeroSlide } from "./HeroSlider";
import { HeroAnimation } from "./HeroAnimation";

export function Hero() {
  const { t } = useI18n();
  const [active, setActive] = useState(0);

  const mobileSlides: HeroSlide[] = useMemo(
    () => [
      {
        src: "/media/home/hero-m1.jpg",
        mobileSrc: "/media/home/hero-m1.jpg",
        alt: t("hero_slide_1_alt"),
        label: t("hero_slide_1"),
      },
      {
        src: "/media/home/hero-m2.jpg",
        mobileSrc: "/media/home/hero-m2.jpg",
        alt: t("hero_slide_2_alt"),
        label: t("hero_slide_2"),
      },
      {
        src: "/media/home/hero-m3.jpg",
        mobileSrc: "/media/home/hero-m3.jpg",
        alt: t("hero_slide_3_alt"),
        label: t("hero_slide_3"),
      },
      {
        src: "/media/home/hero-m4.jpg",
        mobileSrc: "/media/home/hero-m4.jpg",
        alt: t("hero_slide_4_alt"),
        label: t("hero_slide_4"),
      },
      {
        src: "/media/home/hero-m5.jpg",
        mobileSrc: "/media/home/hero-m5.jpg",
        alt: t("hero_slide_5_alt"),
        label: t("hero_slide_5"),
      },
      {
        src: "/media/home/hero-m6.jpg",
        mobileSrc: "/media/home/hero-m6.jpg",
        alt: t("hero_slide_6_alt"),
        label: t("hero_slide_6"),
      },
    ],
    [t],
  );

  return (
    <section
      className="relative h-[calc(100svh-3.5rem)] overflow-hidden bg-ink"
      aria-label={t("brand")}
    >
      {/* Large screens: hero.jpg only */}
      <div className="absolute inset-0 hidden md:block">
        <Image
          src="/media/home/hero.jpg"
          alt={t("hero_slide_1_alt")}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
          quality={90}
        />
      </div>

      {/* Mobile: rotating portrait heroes */}
      <div className="absolute inset-0 md:hidden">
        <HeroSlider slides={mobileSlides} onIndexChange={setActive} showThumbs={false} />
      </div>

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_75%_65%_at_50%_45%,rgba(44,41,37,0.12),rgba(44,41,37,0.52))]" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink/20 via-transparent via-40% to-ink/80" />

      <HeroAnimation
        delay={0.35}
        className="relative z-10 flex h-full flex-col items-center justify-end px-5 pb-[clamp(5.75rem,14svh,8.75rem)] pt-24 text-center sm:px-8 md:pb-[clamp(6.5rem,15svh,9.5rem)]"
      >
        <p
          data-hero="brand"
          className="mb-3 text-[0.65rem] font-medium tracking-[0.35em] text-white/70 uppercase"
        >
          {t("brand")}
        </p>
        <p
          data-hero="meta"
          className="mb-5 text-[0.65rem] tracking-[0.2em] text-brass uppercase"
        >
          {t("hero_proof")}
        </p>

        <h1 className="font-display mb-5 max-w-3xl text-[clamp(2.5rem,7vw,5.25rem)] font-light leading-[1.05] tracking-[-0.02em] text-white">
          <span data-hero="word" className="block">
            {t("hero_title_1")}
          </span>
          <span data-hero="word" className="mt-1 block italic font-normal text-white/90">
            {t("hero_title_2")}
          </span>
        </h1>

        <p
          data-hero="support"
          className="mb-8 max-w-md text-base leading-relaxed text-white/72 sm:text-[1.05rem]"
        >
          {t("hero_support")}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <span data-hero="cta" className="inline-flex">
            <MagneticButton
              href={waLink(t("wa_prefill"))}
              variant="light"
              className="rounded-full px-8"
            >
              {t("hero_cta")}
            </MagneticButton>
          </span>
          <a
            data-hero="cta"
            href="#about"
            className="inline-flex min-h-12 items-center rounded-full border border-white/35 px-6 text-[0.7rem] tracking-[0.12em] text-white/85 uppercase"
          >
            {t("hero_secondary")}
          </a>
        </div>
      </HeroAnimation>

      <div className="pointer-events-none absolute inset-x-0 bottom-6 z-20 flex flex-col items-center gap-4">
        <div
          className="pointer-events-auto flex gap-1.5 md:hidden"
          role="tablist"
          aria-label={t("hero_chapter")}
        >
          {mobileSlides.map((s, i) => (
            <span
              key={s.label}
              aria-hidden
              className={`h-1 rounded-full transition-all duration-500 ${
                i === active ? "w-6 bg-white" : "w-1.5 bg-white/35"
              }`}
            />
          ))}
        </div>
        <p className="text-[0.6rem] tracking-[0.28em] text-white/45 uppercase">
          {t("hero_scroll")}
        </p>
      </div>
    </section>
  );
}
