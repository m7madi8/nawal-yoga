"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useI18n } from "@/lib/i18n/provider";
import type { DictKey } from "@/lib/i18n/dictionaries";
import {
  WA_GROUP_HAIFA,
  WAZE_SAT,
  WAZE_TUE,
  haifaFeedback,
  haifaPlans,
  haifaPowerGallery,
} from "@/lib/content/haifa";
import { Reveal } from "@/components/animations/Reveal";
import { HaifaRegisterSheet } from "@/components/practice/HaifaRegisterSheet";

function WazeIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
      <path d="M12 21s7-5.2 7-11a7 7 0 10-14 0c0 5.8 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

function WaIcon() {
  return (
    <svg className="h-5 w-5 shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.865 9.865 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export default function PracticeClient() {
  const { t, dir } = useI18n();
  const [sheetOpen, setSheetOpen] = useState(false);
  const [pkg, setPkg] = useState("trial");

  function openRegister(id: string) {
    setPkg(id);
    setSheetOpen(true);
  }

  return (
    <main className="bg-[#fafaf8] text-ink">
      {/* HERO */}
      <section className="overflow-hidden pt-6 pb-14 sm:pt-8 sm:pb-18">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/#pathways"
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-[var(--border-soft)] px-4 py-2 text-sm text-[var(--text-soft)]"
          >
            <span aria-hidden>{dir === "rtl" ? "→" : "←"}</span>
            {t("back")}
          </Link>

          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
            <Reveal>
              <div>
                <span className="mb-3 inline-flex text-[0.65rem] tracking-[0.22em] text-brass uppercase">
                  {t("jiva_page_label")}
                </span>
                <h1 className="font-display mb-5 text-[clamp(2.4rem,5.5vw,4rem)] font-light leading-[1.08] text-ink">
                  {t("jiva_page_title")}
                </h1>
                <p className="mb-4 max-w-md leading-relaxed text-[var(--text-soft)]">
                  {t("jiva_page_body")}
                </p>
                <p className="mb-8 max-w-md leading-relaxed text-[var(--text-soft)]">
                  {t("jiva_page_body_2")}
                </p>

                <div className="mb-6 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-[var(--border-soft)] bg-white/50 p-4">
                    <p className="mb-1 text-[0.65rem] tracking-[0.16em] text-brass uppercase">
                      {t("jiva_class_power_day")}
                    </p>
                    <p className="mb-3 text-sm leading-snug text-ink">{t("jiva_schedule_slot1")}</p>
                    <a
                      href={WAZE_TUE}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs tracking-[0.08em] text-olive uppercase"
                      aria-label={t("jiva_waze_tue_aria")}
                    >
                      <WazeIcon />
                      {t("jiva_waze_btn")}
                    </a>
                  </div>
                  <div className="rounded-2xl border border-[var(--border-soft)] bg-white/50 p-4">
                    <p className="mb-1 text-[0.65rem] tracking-[0.16em] text-brass uppercase">
                      {t("jiva_class_saturday_day")}
                    </p>
                    <p className="mb-3 text-sm leading-snug text-ink">{t("jiva_schedule_slot2")}</p>
                    <a
                      href={WAZE_SAT}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs tracking-[0.08em] text-olive uppercase"
                      aria-label={t("jiva_waze_sat_aria")}
                    >
                      <WazeIcon />
                      {t("jiva_waze_btn")}
                    </a>
                  </div>
                </div>

                <p className="max-w-md text-sm leading-relaxed text-[var(--text-soft)]">
                  {t("jiva_page_whatsapp")}
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <figure className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-[1.25rem] bg-stone lg:ms-auto lg:max-w-none">
                <Image
                  src="/media/haifa/hero.jpg"
                  alt={t("jiva_hero_img_alt")}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 90vw, 45vw"
                />
              </figure>
            </Reveal>
          </div>
        </div>
      </section>

      {/* CLASSES */}
      <section className="border-t border-[var(--border-soft)] py-16 sm:py-20" aria-labelledby="haifa-classes-title">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="mb-2 text-[0.65rem] tracking-[0.22em] text-brass uppercase">
              {t("jiva_classes_kicker")}
            </p>
            <h2
              id="haifa-classes-title"
              className="font-display mb-10 text-[clamp(1.75rem,3.5vw,2.5rem)] font-light"
            >
              {t("jiva_classes_title")}
            </h2>
          </Reveal>

          {/* Power Yoga */}
          <Reveal>
            <article className="mb-8 overflow-hidden rounded-[1.5rem] border border-[var(--border-soft)] bg-white/60 lg:mb-10">
              <div className="grid lg:grid-cols-2">
                <div
                  className="grid grid-cols-2 gap-2 p-3 sm:p-4"
                  aria-label={t("jiva_power_gallery_label")}
                >
                  {haifaPowerGallery.map((img, i) => (
                    <div
                      key={img.src}
                      className={`relative overflow-hidden rounded-xl bg-stone ${
                        i === 0 ? "col-span-2 aspect-[16/10]" : "aspect-[3/4]"
                      }`}
                    >
                      <Image
                        src={img.src}
                        alt={t(img.alt as DictKey)}
                        fill
                        className="object-cover"
                        sizes={i === 0 ? "(max-width:1024px) 100vw, 50vw" : "25vw"}
                      />
                    </div>
                  ))}
                </div>
                <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
                  <span className="mb-2 text-[0.65rem] tracking-[0.18em] text-brass uppercase">
                    {t("jiva_class_power_day")}
                  </span>
                  <h3 className="font-display mb-3 text-3xl text-ink">{t("jiva_class_power_title")}</h3>
                  <p className="mb-5 leading-relaxed text-[var(--text-soft)]">
                    {t("jiva_class_power_desc")}
                  </p>
                  <p className="mb-3 text-sm font-medium text-ink">
                    {t("jiva_class_power_benefit_title")}
                  </p>
                  <ul className="mb-5 space-y-2.5">
                    {(["jiva_class_power_b1", "jiva_class_power_b2", "jiva_class_power_b3", "jiva_class_power_b4"] as DictKey[]).map(
                      (k) => (
                        <li key={k} className="flex gap-2.5 text-sm leading-relaxed text-[var(--text-soft)]">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-olive" aria-hidden />
                          {t(k)}
                        </li>
                      ),
                    )}
                  </ul>
                  <p className="text-sm text-ink">{t("jiva_class_power_meta")}</p>
                </div>
              </div>
            </article>
          </Reveal>

          {/* Calm */}
          <Reveal delay={0.06}>
            <article className="rounded-[1.5rem] border border-[var(--border-soft)] bg-[#fafaf8] p-6 sm:p-8 lg:p-10">
              <span className="mb-2 inline-block text-[0.65rem] tracking-[0.18em] text-brass uppercase">
                {t("jiva_class_saturday_day")}
              </span>
              <h3 className="font-display mb-3 text-3xl text-ink">{t("jiva_class_saturday_title")}</h3>
              <p className="mb-5 max-w-2xl leading-relaxed text-[var(--text-soft)]">
                {t("jiva_class_saturday_desc")}
              </p>
              <p className="mb-3 text-sm font-medium text-ink">
                {t("jiva_class_saturday_benefit_title")}
              </p>
              <ul className="mb-5 grid gap-2.5 sm:grid-cols-2">
                {(
                  [
                    "jiva_class_saturday_b1",
                    "jiva_class_saturday_b2",
                    "jiva_class_saturday_b3",
                    "jiva_class_saturday_b4",
                  ] as DictKey[]
                ).map((k) => (
                  <li key={k} className="flex gap-2.5 text-sm leading-relaxed text-[var(--text-soft)]">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-olive" aria-hidden />
                    {t(k)}
                  </li>
                ))}
              </ul>
              <p className="text-sm text-ink">{t("jiva_class_saturday_meta")}</p>
            </article>
          </Reveal>
        </div>
      </section>

      {/* FEEDBACK */}
      <section className="py-16 sm:py-20" aria-labelledby="haifa-feedback-title">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="mb-2 text-[0.65rem] tracking-[0.22em] text-brass uppercase">
              {t("jiva_feedback_kicker")}
            </p>
            <h2
              id="haifa-feedback-title"
              className="font-display mb-3 text-[clamp(1.75rem,3.5vw,2.5rem)] font-light"
            >
              {t("jiva_feedback_title")}
            </h2>
            <p className="mb-10 max-w-md text-[var(--text-soft)]">{t("jiva_feedback_lead")}</p>
          </Reveal>
          <div className="grid gap-5 md:grid-cols-3">
            {haifaFeedback.map((f, i) => (
              <Reveal key={f.quote} delay={i * 0.06}>
                <blockquote className="h-full rounded-[1.25rem] border border-[var(--border-soft)] bg-white/70 p-6">
                  <p className="font-display mb-5 text-lg leading-snug text-ink">
                    {t(f.quote as DictKey)}
                  </p>
                  <footer className="text-xs tracking-[0.06em] text-[var(--text-soft)]">
                    {t(f.name as DictKey)}
                  </footer>
                </blockquote>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section
        id="pricing"
        className="border-t border-[var(--border-soft)] py-16 sm:py-20"
        aria-labelledby="haifa-pricing-title"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="mb-2 text-[0.65rem] tracking-[0.22em] text-brass uppercase">
              {t("jiva_pricing_title")}
            </p>
            <h2
              id="haifa-pricing-title"
              className="font-display mb-10 text-[clamp(1.75rem,3.5vw,2.5rem)] font-light"
            >
              {t("jiva_pricing_greeting")}
            </h2>
          </Reveal>

          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.85fr] lg:gap-12">
            <div>
              <div className="mb-6 grid gap-4 sm:grid-cols-3">
                {haifaPlans.map((plan, i) => (
                  <Reveal key={plan.id} delay={i * 0.05}>
                    <article
                      className={`flex h-full flex-col rounded-[1.25rem] border p-5 ${
                        "featured" in plan && plan.featured
                          ? "border-brass/40 bg-[#fafaf8]"
                          : "border-[var(--border-soft)] bg-[#fafaf8]"
                      }`}
                    >
                      <p className="font-display mb-2 text-xl text-ink">
                        {t(plan.title as DictKey)}
                      </p>
                      <p className="font-display mb-2 text-3xl text-ink">{t(plan.price as DictKey)}</p>
                      {"note" in plan && plan.note && (
                        <p className="mb-4 text-xs text-[var(--text-soft)]">{t(plan.note as DictKey)}</p>
                      )}
                      <button
                        type="button"
                        onClick={() => openRegister(plan.id)}
                        className="mt-auto inline-flex min-h-11 items-center justify-center rounded-full bg-[#8b6b4a] px-5 text-[0.65rem] tracking-[0.12em] text-[#fafaf8] uppercase"
                      >
                        {t("jiva_card_register")}
                      </button>
                    </article>
                  </Reveal>
                ))}
              </div>

              <Reveal delay={0.1}>
                <div className="rounded-[1.25rem] border border-[var(--border-soft)] bg-white/70 p-6 sm:p-7">
                  <p className="mb-2 text-[0.65rem] tracking-[0.16em] text-brass uppercase">
                    {t("jiva_private_gift_badge")}
                  </p>
                  <p className="font-display mb-1 text-2xl text-ink">{t("jiva_private_title")}</p>
                  <p className="mb-4 text-[var(--text-soft)]">{t("jiva_private_subtitle")}</p>
                  <div className="mb-3 flex flex-wrap gap-3 text-sm text-ink">
                    <span>{t("jiva_private_price_1")}</span>
                    <span>{t("jiva_private_price_2")}</span>
                  </div>
                  <p className="mb-5 text-sm text-[var(--text-soft)]">{t("jiva_private_gift_note")}</p>
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => openRegister("private1")}
                      className="inline-flex min-h-11 items-center rounded-full bg-[#8b6b4a] px-5 text-[0.65rem] tracking-[0.1em] text-[#fafaf8] uppercase"
                    >
                      {t("jiva_private_btn_1")}
                    </button>
                    <button
                      type="button"
                      onClick={() => openRegister("private2")}
                      className="inline-flex min-h-11 items-center rounded-full bg-[#8b6b4a] px-5 text-[0.65rem] tracking-[0.1em] text-[#fafaf8] uppercase"
                    >
                      {t("jiva_private_btn_2")}
                    </button>
                    <button
                      type="button"
                      onClick={() => openRegister("gift")}
                      className="inline-flex min-h-11 items-center rounded-full border border-olive/35 px-5 text-[0.65rem] tracking-[0.1em] text-olive uppercase"
                    >
                      {t("jiva_private_btn_gift")}
                    </button>
                  </div>
                </div>
              </Reveal>
            </div>

            <aside>
              <Reveal>
                <div className="mb-4 rounded-[1.25rem] border border-[var(--border-soft)] bg-white/70 p-5">
                  <h4 className="mb-2 font-display text-lg text-ink">{t("jiva_payment_title")}</h4>
                  <p className="text-sm text-[var(--text-soft)]">{t("jiva_payment_methods")}</p>
                </div>
              </Reveal>
              <Reveal delay={0.05}>
                <div className="mb-4 rounded-[1.25rem] border border-[var(--border-soft)] bg-white/70 p-5">
                  <h4 className="mb-2 font-display text-lg text-ink">{t("jiva_policy_title")}</h4>
                  <p className="text-sm text-[var(--text-soft)]">{t("jiva_cancel_rule")}</p>
                </div>
              </Reveal>
              <Reveal delay={0.08}>
                <div className="mb-4 rounded-[1.25rem] border border-[var(--border-soft)] bg-white/70 p-5">
                  <h4 className="mb-3 font-display text-lg text-ink">{t("jiva_meeting_title")}</h4>
                  <ol className="space-y-4">
                    <li>
                      <p className="mb-2 text-sm text-ink">{t("jiva_schedule_slot1")}</p>
                      <a
                        href={WAZE_TUE}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs tracking-[0.08em] text-olive uppercase"
                        aria-label={t("jiva_waze_tue_aria")}
                      >
                        <WazeIcon />
                        {t("jiva_waze_btn")}
                      </a>
                    </li>
                    <li>
                      <p className="mb-2 text-sm text-ink">{t("jiva_schedule_slot2")}</p>
                      <a
                        href={WAZE_SAT}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs tracking-[0.08em] text-olive uppercase"
                        aria-label={t("jiva_waze_sat_aria")}
                      >
                        <WazeIcon />
                        {t("jiva_waze_btn")}
                      </a>
                    </li>
                  </ol>
                </div>
              </Reveal>
              <Reveal delay={0.1}>
                <div className="rounded-[1.25rem] bg-[#8b6b4a] p-6 text-[#fafaf8]">
                  <p className="mb-2 text-[0.65rem] tracking-[0.18em] text-white/70 uppercase">
                    {t("jiva_join_eyebrow")}
                  </p>
                  <p className="font-display mb-2 text-2xl">{t("jiva_join_title")}</p>
                  <p className="mb-5 text-sm text-white/80">{t("jiva_join_text")}</p>
                  <a
                    href={WA_GROUP_HAIFA}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#fafaf8] px-5 text-[0.65rem] tracking-[0.12em] text-[#8b6b4a] uppercase"
                  >
                    <WaIcon />
                    {t("jiva_join_btn")}
                  </a>
                </div>
              </Reveal>
            </aside>
          </div>
        </div>
      </section>

      <HaifaRegisterSheet open={sheetOpen} packageId={pkg} onClose={() => setSheetOpen(false)} />
    </main>
  );
}
