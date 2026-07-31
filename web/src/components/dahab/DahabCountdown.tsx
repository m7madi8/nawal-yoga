"use client";

import { useEffect, useState } from "react";
import { useI18n } from "@/lib/i18n/provider";
import { DAHAB_PROGRESS, DAHAB_TARGET } from "@/lib/content/dahab";
import { Reveal } from "@/components/animations/Reveal";

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export function DahabCountdown() {
  const { t } = useI18n();
  const [parts, setParts] = useState({ d: 0, h: 0, m: 0, s: 0 });

  useEffect(() => {
    const tick = () => {
      const diff = Math.max(0, DAHAB_TARGET.getTime() - Date.now());
      const d = Math.floor(diff / 86400000);
      const h = Math.floor((diff % 86400000) / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      setParts({ d, h, m, s });
    };
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <section className="bg-[#f3ebe1] py-12 sm:py-14" aria-label={t("a11y_countdown")}>
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <Reveal>
          <div className="grid grid-cols-4 gap-2 sm:gap-4">
            {[
              { v: parts.d, l: t("retreat_dahab_cv_cd_days") },
              { v: pad(parts.h), l: t("retreat_dahab_cv_cd_hours") },
              { v: pad(parts.m), l: t("retreat_dahab_cv_cd_minutes") },
              { v: pad(parts.s), l: t("retreat_dahab_cv_cd_seconds") },
            ].map((box) => (
              <div
                key={box.l}
                className="rounded-2xl bg-[#fafaf8]/80 px-2 py-4 text-center sm:px-4 sm:py-5"
              >
                <p className="font-display text-2xl text-ink sm:text-4xl">{box.v}</p>
                <p className="mt-1 text-[0.6rem] tracking-[0.14em] text-[var(--text-soft)] uppercase sm:text-xs">
                  {box.l}
                </p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.06}>
          <div className="mt-8">
            <div className="mb-2 flex justify-between text-sm text-[var(--text-soft)]">
              <span>{t("retreat_dahab_cv_spots_count")}</span>
            </div>
            <div
              className="h-1.5 overflow-hidden rounded-full bg-brass/20"
              role="progressbar"
              aria-valuenow={DAHAB_PROGRESS}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <div
                className="h-full rounded-full bg-[#8b6b4a] transition-[width]"
                style={{ width: `${DAHAB_PROGRESS}%` }}
              />
            </div>
            <p className="mt-4 text-center text-sm text-[var(--text-soft)]">
              {t("retreat_dahab_cv_urgency_note")}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
