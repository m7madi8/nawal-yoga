"use client";

import { useI18n } from "@/lib/i18n/provider";
import { Reveal } from "@/components/animations/Reveal";
import { TextReveal } from "@/components/animations/TextReveal";

export function PhilosophySection() {
  const { t } = useI18n();
  const items = [
    { title: t("phil_1_title"), text: t("phil_1_text") },
    { title: t("phil_2_title"), text: t("phil_2_text") },
    { title: t("phil_3_title"), text: t("phil_3_text") },
  ];

  return (
    <section className="bg-[#fafaf8] py-[clamp(4.5rem,10vw,7rem)]">
      <div className="mx-auto max-w-[70rem] px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <Reveal>
            <p className="mb-3 text-[0.65rem] tracking-[0.28em] text-brass uppercase">
              {t("philosophy_kicker")}
            </p>
          </Reveal>
          <TextReveal className="font-display mb-4 text-[clamp(1.85rem,4vw,3rem)] font-light text-ink">
            {t("philosophy_title")}
          </TextReveal>
          <Reveal delay={0.08}>
            <p className="mx-auto text-lg text-[var(--text-soft)]">{t("philosophy_lead")}</p>
          </Reveal>
        </div>

        <div className="mx-auto max-w-3xl divide-y divide-[var(--border-soft)] border-y border-[var(--border-soft)]">
          {items.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.07}>
              <article className="grid gap-3 py-8 sm:grid-cols-[minmax(0,11rem)_1fr] sm:gap-10">
                <h3 className="font-display text-xl text-ink sm:text-2xl">{item.title}</h3>
                <p className="text-[1.05rem] leading-relaxed text-[var(--text-soft)]">{item.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
