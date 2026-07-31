"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useI18n } from "@/lib/i18n/provider";
import { useSoundHealingMotion } from "@/components/sound-healing/useSoundHealingMotion";
import "./sound-healing.css";

const WAZE = "https://waze.com/ul/hsvbf54u3j";
const WA = "https://wa.me/972522496366";

const GALLERY = [
  {
    src: "/media/events/sound-healing-01.jpg",
    altKey: "events_sh_gallery_alt1" as const,
  },
  {
    src: "/media/events/sound-healing-03.jpg",
    altKey: "events_sh_gallery_alt5" as const,
  },
  {
    src: "/media/events/sound-healing-02.jpg",
    altKey: "events_sh_gallery_alt2" as const,
  },
  {
    src: "/media/events/sound-healing-04.jpg",
    altKey: "events_sh_gallery_alt3" as const,
  },
  {
    src: "/media/events/sound-healing-05.jpg",
    altKey: "events_sh_gallery_alt4" as const,
  },
];

export function SoundHealingPage() {
  const { t, dir } = useI18n();
  const rootRef = useRef<HTMLDivElement>(null);
  useSoundHealingMotion(rootRef);
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);
  const [readMoreOpen, setReadMoreOpen] = useState(false);

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
    };
    document.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [lightbox]);

  return (
    <div ref={rootRef} className="event-sh-page antialiased">
      <main className="event-sh-main">
        <section className="event-sh-hero">
          <div className="event-sh-hero-inner">
            <Link href="/events" className="event-sh-back top-back-link" aria-label={t("back")}>
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={dir === "rtl" ? "M9 5l7 7-7 7" : "M15 19l-7-7 7-7"}
                />
              </svg>
              <span>{t("back")}</span>
            </Link>

            <div className="event-sh-hero-grid">
              <div className="event-sh-hero-copy">
                <span data-sh-hero className="event-sh-badge">
                  {t("events_card_tag")}
                </span>
                <h1 data-sh-hero className="event-sh-title">
                  {t("events_sh_title")}
                </h1>
                <p data-sh-hero className="event-sh-tagline">
                  {t("events_sh_invite")}
                </p>

                <div data-sh-hero className="event-sh-meta">
                  <div className="event-sh-meta-card">
                    <span className="event-sh-meta-label">{t("events_sh_meta_date")}</span>
                    <span className="event-sh-meta-value">{t("events_sh_date")}</span>
                  </div>
                  <div className="event-sh-meta-card">
                    <span className="event-sh-meta-label">{t("events_sh_meta_time")}</span>
                    <span className="event-sh-meta-value">{t("events_sh_time")}</span>
                  </div>
                  <div className="event-sh-meta-card event-sh-meta-card--wide">
                    <span className="event-sh-meta-label">{t("events_sh_meta_place")}</span>
                    <span className="event-sh-meta-value">{t("events_sh_location")}</span>
                  </div>
                </div>
              </div>

              <figure data-sh-hero className="event-sh-hero-visual">
                <Image
                  src="/media/events/sound-healing-01.jpg"
                  alt={t("events_sh_hero_img_alt")}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 900px) 90vw, 42vw"
                />
              </figure>
            </div>
          </div>
        </section>

        <section className="event-sh-body">
          <div className="event-sh-body-inner">
            <div className="event-sh-layout">
              <div data-sh-reveal className="event-sh-main-col">
                <div className="event-sh-gallery-block" aria-labelledby="event-gallery-heading">
                  <div className="event-sh-section-head">
                    <p className="event-sh-kicker">{t("events_sh_gallery_kicker")}</p>
                    <h2 id="event-gallery-heading" className="event-sh-section-title">
                      {t("events_sh_gallery_title")}
                    </h2>
                    <p className="event-sh-gallery-hint">{t("events_sh_gallery_hint")}</p>
                  </div>
                  <div className="event-sh-gallery" id="event-sh-gallery">
                    {GALLERY.map((item) => {
                      const alt = t(item.altKey);
                      return (
                        <button
                          key={item.src + item.altKey}
                          type="button"
                          data-sh-cell
                          className="event-sh-gallery-cell"
                          aria-label={alt}
                          onClick={() => setLightbox({ src: item.src, alt })}
                        >
                          <Image
                            src={item.src}
                            alt={alt}
                            fill
                            className="object-cover"
                            sizes="(max-width: 640px) 45vw, 280px"
                          />
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              <aside data-sh-reveal className="event-sh-panel">
                <p className="event-sh-greeting">{t("events_sh_greeting")}</p>

                <div className="event-sh-audience">
                  <span className="event-sh-audience-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6">
                      <circle cx="9" cy="8" r="3" />
                      <circle cx="16" cy="9" r="2.5" />
                      <path d="M4 19c0-3 2.5-5 5-5s5 2 5 5M13 19c0-2.2 1.8-4 4-4" />
                    </svg>
                  </span>
                  <p>{t("events_sh_audience")}</p>
                </div>

                <div className="event-sh-pricing">
                  <p className="event-sh-kicker">{t("events_sh_pricing_label")}</p>
                  <div className="event-sh-price-grid">
                    <div className="event-sh-price-card">
                      <span className="event-sh-price-amount">{t("events_sh_price_member_amount")}</span>
                      <span className="event-sh-price-desc">{t("events_sh_price_member_label")}</span>
                    </div>
                    <div className="event-sh-price-card event-sh-price-card--accent">
                      <span className="event-sh-price-amount">{t("events_sh_price_guest_amount")}</span>
                      <span className="event-sh-price-desc">{t("events_sh_price_guest_label")}</span>
                    </div>
                  </div>
                  <p className="event-sh-includes">{t("events_sh_includes")}</p>
                </div>

                <span className="event-sh-limited">{t("events_sh_limited")}</span>

                <div className="event-sh-register">
                  <p className="event-sh-register-note">{t("events_sh_register_note")}</p>
                  <p className="event-sh-booking-notice">{t("events_sh_booking_notice")}</p>
                  <div className="event-sh-actions">
                    <a
                      href={WA}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="event-sh-btn event-sh-btn--primary"
                      aria-label={t("events_sh_register_aria")}
                    >
                      <svg className="h-5 w-5 shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                      <span>{t("events_sh_register_btn")}</span>
                    </a>
                    <a
                      href={WAZE}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="event-sh-btn event-sh-btn--ghost"
                      aria-label={t("events_sh_waze_aria")}
                    >
                      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                        <path d="M12 21s7-5.2 7-11a7 7 0 10-14 0c0 5.8 7 11 7 11z" />
                        <circle cx="12" cy="10" r="2.5" />
                      </svg>
                      <span>{t("events_sh_waze_btn")}</span>
                    </a>
                  </div>
                </div>
              </aside>
            </div>

            <details
              data-sh-reveal
              className="event-sh-readmore"
              open={readMoreOpen}
              onToggle={(e) => setReadMoreOpen((e.target as HTMLDetailsElement).open)}
            >
              <summary className="event-sh-readmore-summary">{t("events_sh_readmore_summary")}</summary>
              <article className="event-sh-content event-sh-content--readmore">
                <div className="event-sh-intro">
                  <p>{t("events_sh_intro_1")}</p>
                  <p>{t("events_sh_intro_2")}</p>
                  <p>{t("events_sh_intro_3")}</p>
                </div>

                <hr className="event-sh-divider" aria-hidden="true" />

                <section className="event-sh-content-section">
                  <h2 className="event-sh-content-title">{t("events_sh_for_whom_title")}</h2>
                  <p>{t("events_sh_for_whom_intro")}</p>
                  <ul className="event-sh-list">
                    <li>{t("events_sh_for_whom_1")}</li>
                    <li>{t("events_sh_for_whom_2")}</li>
                    <li>{t("events_sh_for_whom_3")}</li>
                    <li>{t("events_sh_for_whom_4")}</li>
                    <li>{t("events_sh_for_whom_5")}</li>
                  </ul>
                </section>

                <hr className="event-sh-divider" aria-hidden="true" />

                <section className="event-sh-content-section">
                  <h2 className="event-sh-content-title">{t("events_sh_after_title")}</h2>
                  <p>{t("events_sh_after_intro")}</p>
                  <ul className="event-sh-list">
                    <li>{t("events_sh_after_1")}</li>
                    <li>{t("events_sh_after_2")}</li>
                    <li>{t("events_sh_after_3")}</li>
                    <li>{t("events_sh_after_4")}</li>
                    <li>{t("events_sh_after_5")}</li>
                  </ul>
                </section>

                <hr className="event-sh-divider" aria-hidden="true" />

                <section className="event-sh-content-section">
                  <h2 className="event-sh-content-title">{t("events_sh_philosophy_title")}</h2>
                  <p>{t("events_sh_philosophy_1")}</p>
                  <p>{t("events_sh_philosophy_2")}</p>
                  <p>{t("events_sh_philosophy_3")}</p>
                </section>
              </article>
            </details>
          </div>
        </section>
      </main>

      <AnimatePresence>
        {lightbox && (
          <motion.div
            className="event-sh-lightbox"
            role="dialog"
            aria-modal
            aria-label="Photo preview"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => {
              if (e.target === e.currentTarget) setLightbox(null);
            }}
          >
            <button
              type="button"
              className="event-sh-lightbox-close"
              aria-label={t("close")}
              onClick={() => setLightbox(null)}
            >
              ×
            </button>
            <motion.img
              className="event-sh-lightbox-img"
              src={lightbox.src}
              alt={lightbox.alt}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
