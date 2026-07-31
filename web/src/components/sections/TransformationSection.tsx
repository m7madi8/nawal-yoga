"use client";

import { useI18n } from "@/lib/i18n/provider";
import { Reveal } from "@/components/animations/Reveal";
import { TextReveal } from "@/components/animations/TextReveal";

export function TransformationSection() {
  const { t } = useI18n();

  const before = [t("transform_b1"), t("transform_b2"), t("transform_b3")];
  const after = [t("transform_a1"), t("transform_a2"), t("transform_a3")];

  return (
    <section className="relative overflow-hidden bg-ink py-[clamp(4.5rem,10vw,7.5rem)] text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_70%_20%,rgba(156,133,104,0.14),transparent_65%)]"
      />
      <div className="relative mx-auto max-w-[70rem] px-4 sm:px-6 lg:px-8">
        <Reveal>
          <p className="mb-3 text-[0.65rem] tracking-[0.28em] text-brass uppercase">
            {t("transform_kicker")}
          </p>
        </Reveal>
        <TextReveal className="font-display mb-12 max-w-lg text-[clamp(1.85rem,4vw,3rem)] font-light text-white">
          {t("transform_title")}
        </TextReveal>

        <div className="grid gap-12 md:grid-cols-2 md:gap-16">
          <Reveal>
            <p className="mb-6 text-[0.65rem] tracking-[0.22em] text-white/45 uppercase">
              {t("transform_before")}
            </p>
            <ul className="space-y-0 border-t border-white/15">
              {before.map((line) => (
                <li
                  key={line}
                  className="border-b border-white/15 py-5 font-display text-xl text-white/55 sm:text-2xl"
                >
                  {line}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mb-6 text-[0.65rem] tracking-[0.22em] text-brass uppercase">
              {t("transform_after")}
            </p>
            <ul className="space-y-0 border-t border-white/15">
              {after.map((line) => (
                <li
                  key={line}
                  className="border-b border-white/15 py-5 font-display text-xl text-white sm:text-2xl"
                >
                  {line}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
