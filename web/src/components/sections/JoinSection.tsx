"use client";

import Link from "next/link";
import { useI18n } from "@/lib/i18n/provider";
import { waLink } from "@/lib/i18n/dictionaries";
import { MagneticButton } from "@/components/animations/MagneticButton";
import { Reveal } from "@/components/animations/Reveal";
import { TextReveal } from "@/components/animations/TextReveal";

export function JoinSection() {
  const { t } = useI18n();

  return (
    <section
      id="join"
      className="relative overflow-hidden bg-[#fafaf8] py-[clamp(5rem,12vw,8rem)] text-center"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_45%_at_50%_40%,rgba(156,133,104,0.08),transparent_70%)]"
      />
      <div className="relative mx-auto max-w-2xl px-5">
        <TextReveal className="font-display mb-5 text-[clamp(2rem,5vw,3.5rem)] font-light leading-[1.15] text-ink">
          {t("join_title")}
        </TextReveal>
        <Reveal delay={0.1}>
          <p className="mx-auto mb-9 text-lg text-[var(--text-soft)]">{t("join_lead")}</p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <MagneticButton
              href={waLink(t("wa_prefill"))}
              variant="solid"
              className="rounded-full px-8"
            >
              {t("join_cta")}
            </MagneticButton>
            <Link
              href="/practice"
              className="inline-flex min-h-12 items-center rounded-full border border-olive/25 px-6 text-[0.7rem] tracking-[0.12em] text-olive uppercase"
            >
              {t("join_secondary")}
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
