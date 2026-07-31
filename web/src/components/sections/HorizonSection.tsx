"use client";

import { useI18n } from "@/lib/i18n/provider";
import { waLink } from "@/lib/i18n/dictionaries";
import { horizonItems } from "@/lib/content/horizon";
import { Reveal } from "@/components/animations/Reveal";
import { TextReveal } from "@/components/animations/TextReveal";

export function HorizonSection() {
  const { t, dir } = useI18n();

  return (
    <section
      id="horizon"
      className="relative overflow-hidden bg-[#fafaf8] py-[clamp(4.5rem,10vw,7.5rem)] text-ink"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_40%_at_20%_0%,rgba(156,133,104,0.07),transparent_65%)]"
      />

      <div className="relative mx-auto max-w-[70rem] px-4 sm:px-6 lg:px-8">
        <Reveal>
          <p className="mb-3 text-[0.65rem] tracking-[0.28em] text-brass uppercase">
            {t("horizon_kicker")}
          </p>
        </Reveal>
        <TextReveal className="font-display mb-3 max-w-2xl text-[clamp(2rem,4.5vw,3.25rem)] font-light leading-tight text-ink">
          {t("horizon_title")}
        </TextReveal>
        <Reveal delay={0.08}>
          <p className="mb-12 max-w-lg text-[var(--text-soft)] sm:mb-16">
            {t("horizon_lead")}
          </p>
        </Reveal>

        <ul className="border-t border-brass/25">
          {horizonItems.map((item, i) => {
            const hasCta = Boolean(item.waKey && item.cta);
            const isLast = i === horizonItems.length - 1;

            return (
              <li key={item.id}>
                <Reveal delay={i * 0.06}>
                  <div
                    className={`group relative border-b border-brass/25 py-8 sm:py-10 ${
                      isLast ? "opacity-90" : ""
                    }`}
                  >
                    <span
                      aria-hidden
                      className={`pointer-events-none absolute top-0 h-px origin-left bg-brass/70 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                        dir === "rtl" ? "right-0 left-auto origin-right" : "left-0"
                      } w-0 group-hover:w-full`}
                    />

                    <p className="mb-2 text-[0.65rem] tracking-[0.22em] text-brass uppercase">
                      {t(item.status)}
                    </p>

                    <h3
                      className={`font-display mb-3 max-w-xl text-[clamp(1.75rem,4vw,2.75rem)] font-light leading-[1.1] text-ink transition duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                        dir === "rtl"
                          ? "group-hover:-translate-x-1"
                          : "group-hover:translate-x-1"
                      }`}
                    >
                      {t(item.title)}
                    </h3>

                    <p className="mb-5 max-w-md text-[1.02rem] leading-relaxed text-[var(--text-soft)]">
                      {t(item.desc)}
                    </p>

                    {hasCta && item.waKey && item.cta ? (
                      <a
                        href={waLink(t(item.waKey))}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex w-fit items-center gap-2 border-b border-olive/30 pb-0.5 text-[0.7rem] tracking-[0.14em] text-olive uppercase transition group-hover:border-olive group-hover:gap-3"
                      >
                        {t(item.cta)} {dir === "rtl" ? "←" : "→"}
                      </a>
                    ) : null}
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
