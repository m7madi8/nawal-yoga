"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useI18n } from "@/lib/i18n/provider";
import { WA_NUMBER, type DictKey } from "@/lib/i18n/dictionaries";
import {
  DAHAB_HOTEL,
  dahabFaq,
  dahabGallery,
  dahabIncludes,
  dahabProgram,
  dahabTestimonials,
} from "@/lib/content/dahab";
import { Reveal } from "@/components/animations/Reveal";
import { DahabIncIcon } from "@/components/dahab/DahabIncIcon";
import { DahabCountdown } from "@/components/dahab/DahabCountdown";
import { DahabBookModal } from "@/components/dahab/DahabBookModal";

export function DahabPage() {
  const { t, dir } = useI18n();
  const [openDay, setOpenDay] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [bookOpen, setBookOpen] = useState(false);
  const [bookSuccess, setBookSuccess] = useState(false);
  const [proofIndex, setProofIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setProofIndex((p) => (p + 1) % dahabTestimonials.length);
    }, 4500);
    return () => window.clearInterval(id);
  }, []);

  const proof = dahabTestimonials[proofIndex];

  return (
    <main className="bg-[#fafaf8] text-ink">
      <section className="overflow-hidden pt-8 pb-16 sm:pt-10 sm:pb-20" aria-labelledby="dahab-page-title">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Link href="/retreats" className="mb-8 inline-flex items-center gap-2 text-sm text-[var(--text-soft)]">
            <span aria-hidden>{dir === "rtl" ? "→" : "←"}</span>
            {t("back")}
          </Link>

          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
            <Reveal>
              <div>
                <span className="mb-4 inline-flex rounded-full border border-brass/35 px-3 py-1 text-[0.65rem] tracking-[0.16em] text-brass uppercase">
                  {t("retreat_dahab_cv_badge")}
                </span>
                <h1
                  id="dahab-page-title"
                  className="font-display mb-5 text-[clamp(2.25rem,5vw,3.75rem)] font-light leading-[1.1] text-ink"
                >
                  {t("retreat_dahab_page_title")}
                </h1>

                <div
                  className="mb-5 flex items-start gap-3"
                  aria-label={t("retreat_dahab_hero_dates_aria")}
                >
                  <span className="mt-1 text-brass" aria-hidden>
                    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.6">
                      <rect x="3" y="4" width="18" height="18" rx="2" />
                      <path d="M16 2v4M8 2v4M3 10h18" />
                    </svg>
                  </span>
                  <div>
                    <p className="font-display text-2xl text-ink sm:text-3xl">
                      {t("retreat_dahab_hero_dates_range")}
                    </p>
                    <p className="text-sm text-[var(--text-soft)]">
                      {t("retreat_dahab_hero_dates_month")}
                      <span className="mx-1.5" aria-hidden>
                        ·
                      </span>
                      {t("retreat_dahab_hero_dates_place")}
                    </p>
                  </div>
                </div>

                <p className="mb-6 max-w-md text-[1.05rem] leading-relaxed text-[var(--text-soft)]">
                  {t("retreat_dahab_cv_subtitle")}
                </p>

                <div className="mb-6 space-y-1.5">
                  <p className="text-sm text-[var(--text-soft)] line-through decoration-brass/50">
                    {t("retreat_dahab26_price_early")}
                  </p>
                  <p className="font-display text-xl text-ink">{t("retreat_dahab26_price_regular")}</p>
                </div>

                <div className="mb-5 flex flex-wrap gap-3">
                  <a
                    href="#dahab-booking"
                    className="inline-flex min-h-12 items-center rounded-full bg-[#8b6b4a] px-7 text-[0.7rem] tracking-[0.12em] text-[#fafaf8] uppercase"
                  >
                    {t("retreat_dahab_cv_btn_register")}
                  </a>
                  <a
                    href="#dahab-program"
                    className="inline-flex min-h-12 items-center rounded-full border border-olive/30 px-6 text-[0.7rem] tracking-[0.12em] text-olive uppercase"
                  >
                    {t("retreat_dahab_cv_btn_program")}
                  </a>
                </div>
                <p className="text-xs tracking-[0.04em] text-[var(--text-soft)]">
                  {t("retreat_dahab_cv_trust")}
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <figure className="mx-auto w-full max-w-md lg:ms-auto">
                <div className="relative mx-auto aspect-square w-[min(100%,28rem)] overflow-hidden rounded-full bg-stone shadow-[0_20px_60px_rgba(44,41,37,0.12)]">
                  <Image
                    src="/media/home/trainer.jpg"
                    alt={t("retreat_dahab_trainer1_name")}
                    fill
                    priority
                    className="object-cover"
                    sizes="(max-width: 1024px) 90vw, 28rem"
                  />
                </div>
              </figure>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="border-t border-[var(--border-soft)] py-16 sm:py-20" aria-labelledby="dahab-includes">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2
              id="dahab-includes"
              className="font-display mb-2 text-center text-[clamp(1.75rem,3.5vw,2.5rem)] font-light"
            >
              {t("retreat_dahab_cv_includes_title")}
            </h2>
            <p className="mb-10 text-center text-[var(--text-soft)]">
              {t("retreat_dahab_cv_includes_sub")}
            </p>
          </Reveal>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {dahabIncludes.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.04}>
                <article className="text-center sm:text-start">
                  <DahabIncIcon name={item.icon} className="mx-auto mb-3 h-7 w-7 text-brass sm:mx-0" />
                  <h3 className="font-display mb-1.5 text-lg text-ink">{t(item.title as DictKey)}</h3>
                  <p className="text-sm leading-relaxed text-[var(--text-soft)]">
                    {t(item.desc as DictKey)}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20" aria-labelledby="dahab-soul-heading">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <Reveal>
            <div className="mb-14 text-center">
              <h2
                id="dahab-soul-heading"
                className="font-display mb-4 text-[clamp(1.75rem,3.5vw,2.5rem)] font-light"
              >
                {t("retreat_dahab_expect_title")}
              </h2>
              <p className="mx-auto mb-4 max-w-xl text-lg leading-relaxed text-[var(--text-soft)]">
                {t("retreat_dahab_soul_invite")}
              </p>
              <p className="text-[0.7rem] tracking-[0.18em] text-brass uppercase">
                {t("retreat_dahab_spots_count")}
              </p>
            </div>
          </Reveal>

          <Reveal>
            <h3 className="font-display mb-4 text-xl text-ink">{t("retreat_dahab_faq_title")}</h3>
            <ul className="mb-12 border-t border-[var(--border-soft)]">
              {dahabFaq.map((item, i) => {
                const isOpen = openFaq === i;
                return (
                  <li key={item.q} className="border-b border-[var(--border-soft)]">
                    <button
                      type="button"
                      className="flex w-full items-center justify-between gap-4 py-4 text-start"
                      aria-expanded={isOpen}
                      onClick={() => setOpenFaq(isOpen ? null : i)}
                    >
                      <span className="font-display text-lg text-ink">{t(item.q as DictKey)}</span>
                      <span className="text-brass" aria-hidden>
                        {isOpen ? "−" : "+"}
                      </span>
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          <p className="pb-4 leading-relaxed text-[var(--text-soft)]">
                            {t(item.a as DictKey)}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </li>
                );
              })}
            </ul>
          </Reveal>

          <Reveal>
            <div className="rounded-2xl border border-[var(--border-soft)] bg-white/60 p-6 sm:p-8">
              <h3 className="font-display mb-4 text-xl text-ink">{t("retreat_dahab_cancel_title")}</h3>
              <ul className="mb-5 list-disc space-y-2 ps-5 text-[var(--text-soft)]">
                <li>{t("retreat_dahab_payment_deposit")}</li>
                <li>{t("retreat_dahab_payment_balance")}</li>
              </ul>
              <h4 className="mb-3 text-sm tracking-[0.12em] text-brass uppercase">
                {t("retreat_dahab_cancel_subtitle")}
              </h4>
              <ul className="mb-4 list-disc space-y-2 ps-5 text-[var(--text-soft)]">
                <li>{t("retreat_dahab_cancel_1")}</li>
                <li>{t("retreat_dahab_cancel_2")}</li>
                <li>{t("retreat_dahab_cancel_3")}</li>
                <li>{t("retreat_dahab_cancel_4")}</li>
              </ul>
              <p className="text-sm italic text-[var(--text-soft)]">{t("retreat_dahab_cancel_note")}</p>
            </div>
          </Reveal>
        </div>
      </section>

      <section
        className="border-t border-[var(--border-soft)] py-16 sm:py-20"
        aria-labelledby="dahab-program-heading"
      >
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <Reveal>
            <header className="mb-8 text-center">
              <h2
                id="dahab-program-heading"
                className="font-display mb-2 text-[clamp(1.75rem,3.5vw,2.5rem)] font-light"
              >
                {t("retreat_dahab_program_title")}
              </h2>
              <p className="text-[var(--text-soft)]">{t("retreat_dahab26_place_short")}</p>
              <a
                href={DAHAB_HOTEL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex text-sm text-olive"
              >
                {t("retreat_dahab26_hotel_link")}
              </a>
            </header>
          </Reveal>

          <div id="dahab-program" className="mb-16 border-t border-[var(--border-soft)]">
            {dahabProgram.map((day, i) => {
              const isOpen = openDay === i;
              return (
                <Reveal key={day.chip} delay={i * 0.04}>
                  <div className="border-b border-[var(--border-soft)]">
                    <button
                      type="button"
                      className="flex w-full items-center justify-between gap-4 py-5 text-start"
                      aria-expanded={isOpen}
                      onClick={() => setOpenDay(isOpen ? -1 : i)}
                    >
                      <span>
                        <span className="mb-1 block text-[0.65rem] tracking-[0.16em] text-brass uppercase">
                          {t(day.chip as DictKey)}
                        </span>
                        <span className="font-display text-xl text-ink sm:text-2xl">
                          {t(day.title as DictKey)}
                        </span>
                      </span>
                      <span
                        className={`text-brass transition-transform ${isOpen ? "rotate-45" : ""}`}
                        aria-hidden
                      >
                        +
                      </span>
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="space-y-3 pb-5">
                            {day.slots.map((slot) => (
                              <p key={slot} className="leading-relaxed text-[var(--text-soft)]">
                                {t(slot as DictKey)}
                              </p>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </Reveal>
              );
            })}
          </div>

          <Reveal>
            <h2 className="font-display mb-6 text-center text-[clamp(1.75rem,3.5vw,2.5rem)] font-light">
              {t("retreat_dahab_gallery_title")}
            </h2>
          </Reveal>
          <div className="grid grid-cols-2 gap-2 sm:gap-3 md:grid-cols-3">
            {dahabGallery.map((img, i) => (
              <Reveal key={img.src} delay={i * 0.04}>
                <figure
                  className={`relative overflow-hidden rounded-xl bg-stone ${
                    i === 0 || i === 3 ? "aspect-[4/5]" : "aspect-[4/3]"
                  }`}
                >
                  <Image
                    src={img.src}
                    alt={t(img.alt as DictKey)}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 33vw"
                  />
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <DahabCountdown />

      <section id="dahab-booking" className="py-16 sm:py-20" aria-labelledby="dahab-cv-final-heading">
        <div className="mx-auto max-w-xl px-4 text-center sm:px-6">
          <Reveal>
            <h2
              id="dahab-cv-final-heading"
              className="font-display mb-4 text-[clamp(1.85rem,4vw,2.75rem)] font-light"
            >
              {t("retreat_dahab_cv_final_h2")}
            </h2>
            <p className="mb-8 leading-relaxed text-[var(--text-soft)]">{t("retreat_dahab_cv_final_p")}</p>

            <div className="mb-6 rounded-2xl border border-[var(--border-soft)] bg-white/70 px-6 py-7 text-start">
              <p className="mb-3 text-[0.65rem] tracking-[0.16em] text-brass uppercase">
                {t("retreat_dahab_cv_final_price_label")}
              </p>
              <p className="mb-1 text-sm text-[var(--text-soft)] line-through">
                {t("retreat_dahab26_price_early")}
              </p>
              <p className="font-display mb-3 text-2xl text-ink">{t("retreat_dahab26_price_regular")}</p>
              <p className="mb-5 text-sm text-[var(--text-soft)]">
                {t("retreat_dahab_cv_final_price_note")}
              </p>
              <ul className="space-y-2 text-sm text-ink">
                <li>• {t("retreat_dahab_cv_final_b1")}</li>
                <li>• {t("retreat_dahab_cv_final_b2")}</li>
                <li>• {t("retreat_dahab_cv_final_b3")}</li>
              </ul>
            </div>

            <button
              type="button"
              onClick={() => setBookOpen(true)}
              className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-[#8b6b4a] px-7 text-[0.7rem] tracking-[0.12em] text-[#fafaf8] uppercase sm:w-auto sm:min-w-[16rem]"
            >
              {t("retreat_dahab_cv_final_btn")}
            </button>

            {bookSuccess && <p className="mt-4 text-olive">{t("retreat_form_success")}</p>}

            <a
              href={`https://wa.me/${WA_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 text-sm text-olive"
            >
              {t("retreat_dahab_cv_final_whatsapp")}
            </a>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-[var(--border-soft)] py-16 sm:py-20" aria-label={t("a11y_testimonials")}>
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <Reveal>
            <p className="mb-8 text-center text-[0.65rem] tracking-[0.22em] text-brass uppercase">
              {t("retreat_dahab_cv_proof_label")}
            </p>
          </Reveal>
          <div className="relative min-h-[12rem]">
            <AnimatePresence mode="wait">
              <motion.article
                key={proofIndex}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="mx-auto max-w-lg text-center"
              >
                <div className="mb-4 flex items-center justify-center gap-3">
                  {"photo" in proof && proof.photo ? (
                    <Image
                      src={proof.photo}
                      alt={t(proof.name as DictKey)}
                      width={44}
                      height={44}
                      className="rounded-full object-cover"
                    />
                  ) : (
                    <span
                      className="inline-block h-11 w-11 rounded-full bg-gradient-to-br from-brass/40 to-olive/30"
                      aria-hidden
                    />
                  )}
                  <p className="text-sm text-ink">{t(proof.name as DictKey)}</p>
                </div>
                <p className="font-display text-lg leading-snug text-ink sm:text-xl">
                  “{t(proof.quote as DictKey)}”
                </p>
                <p className="mt-3 text-brass" aria-label={t("a11y_5_stars")}>
                  ★★★★★
                </p>
              </motion.article>
            </AnimatePresence>
            <div className="mt-6 flex justify-center gap-2">
              {dahabTestimonials.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Testimonial ${i + 1}`}
                  onClick={() => setProofIndex(i)}
                  className={`h-1.5 rounded-full transition-all ${
                    i === proofIndex ? "w-6 bg-olive" : "w-1.5 bg-olive/25"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <DahabBookModal
        open={bookOpen}
        onClose={() => setBookOpen(false)}
        onSuccess={() => {
          setBookSuccess(true);
          window.setTimeout(() => setBookSuccess(false), 3500);
        }}
      />
    </main>
  );
}
