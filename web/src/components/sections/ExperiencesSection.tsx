"use client";

import { useI18n } from "@/lib/i18n/provider";
import { Reveal } from "@/components/animations/Reveal";
import { TextReveal } from "@/components/animations/TextReveal";
import { VideoWithSound } from "@/components/ui/VideoWithSound";

/** Atmosphere / video only — pathways live in PathwaysSection once. */
export function ExperiencesSection() {
  const { t } = useI18n();

  return (
    <section id="feel" className="bg-[#fafaf8] py-[clamp(4rem,9vw,6.5rem)]">
      <div className="mx-auto max-w-[70rem] px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-6">
            <Reveal>
              <p className="mb-3 text-[0.65rem] tracking-[0.28em] text-brass uppercase">
                {t("experience_kicker")}
              </p>
            </Reveal>
            <TextReveal className="font-display mb-3 max-w-xl text-[clamp(1.85rem,4vw,3rem)] font-light text-ink">
              {t("experience_title")}
            </TextReveal>
            <Reveal delay={0.08}>
              <p className="mb-6 max-w-md text-[var(--text-soft)]">{t("experience_lead")}</p>
              <h3 className="font-display mb-2 text-2xl text-ink">{t("practice_title")}</h3>
              <p className="max-w-md text-[var(--text-soft)] leading-relaxed">{t("practice_lead")}</p>
            </Reveal>
          </div>

          <Reveal className="lg:col-span-6" delay={0.1}>
            <VideoWithSound
              src="/media/home/video.mp4"
              poster="/media/home/portrait.jpg"
              className="mx-auto aspect-[9/16] w-full max-w-sm max-h-[560px] rounded-[1.5rem] lg:ms-auto lg:me-0"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
