"use client";

import { useRef } from "react";
import Link from "next/link";
import { useI18n } from "@/lib/i18n/provider";
import { NcReelPlayer } from "@/components/nature-chocolate/NcReelPlayer";
import { useNatureChocolateMotion } from "@/components/nature-chocolate/useNatureChocolateMotion";
import "./nature-chocolate.css";

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12l5 5L20 7" />
    </svg>
  );
}

const INCLUDES = [
  "events_nc_inc_1",
  "events_nc_inc_2",
  "events_nc_inc_3",
  "events_nc_inc_4",
  "events_nc_inc_5",
] as const;

const REELS = [
  "/media/events/nature-chocolate-reel-01.mp4",
  "/media/events/nature-chocolate-reel-02.mp4",
  "/media/events/la_chocolita-20260727-0001.mp4",
];

export function NatureChocolatePage() {
  const { t, dir, locale } = useI18n();
  const rootRef = useRef<HTMLDivElement>(null);
  useNatureChocolateMotion(rootRef, locale);

  return (
    <div ref={rootRef} className="nc-page nc-page--sold-out">
      <main className="nc-main">
        <section className="nc-hero" aria-labelledby="nc-hero-title">
          <div className="nc-hero__media" aria-hidden="true">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/media/events/nature-chocolate-hero.jpg"
              alt=""
              width={1600}
              height={1200}
              fetchPriority="high"
              decoding="async"
            />
          </div>
          <div className="nc-hero__overlay" aria-hidden="true" />

          <Link href="/events" className="nc-hero__back top-back-link" aria-label={t("back")}>
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

          <div className="nc-hero__inner">
            <div className="nc-hero__panel nc-hero__fade nc-hero__fade--1">
              <div className="nc-hero__labels">
                <span className="nc-hero__badge">{t("events_card_tag")}</span>
                <span className="nc-hero__sold">{t("events_nc_sold_out")}</span>
              </div>
              <h1 id="nc-hero-title" className="nc-hero__title">
                {t("events_nc_title")}
              </h1>
              <div className="nc-hero__divider" aria-hidden="true" />
              <div className="nc-hero__meta">
                <p className="nc-hero__meta-row nc-hero__meta-row--date">{t("events_nc_date")}</p>
                <p className="nc-hero__meta-row">{t("events_nc_time")}</p>
                <p className="nc-hero__meta-row">{t("events_nc_location")}</p>
              </div>
              <p className="nc-sold-note">{t("events_nc_sold_out_note")}</p>
              <button
                type="button"
                className="nc-hero__cta nc-cta--disabled"
                disabled
                aria-disabled="true"
                aria-label={t("events_nc_sold_out_aria")}
              >
                <span>{t("events_nc_sold_out_cta")}</span>
              </button>
            </div>
          </div>
        </section>

        <section className="nc-section nc-intro" aria-labelledby="nc-intro-title">
          <div className="nc-wrap">
            <div className="nc-intro__card">
              <p id="nc-intro-title" className="nc-intro__text">
                {t("events_nc_intro")}
              </p>
              <p className="nc-intro__note">{t("events_nc_intro_note")}</p>
            </div>
          </div>
        </section>

        <section className="nc-shots" aria-label={t("a11y_photos")}>
          <div className="nc-shots__grid nc-shots__grid--duo">
            <figure className="nc-shot">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/media/events/nature-chocolate-terrace.jpg"
                alt=""
                width={1600}
                height={1200}
                loading="lazy"
                decoding="async"
              />
            </figure>
            <figure className="nc-shot">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/media/events/nature-chocolate-dome.jpg"
                alt=""
                width={1600}
                height={1200}
                loading="lazy"
                decoding="async"
              />
            </figure>
          </div>
        </section>

        <section className="nc-section nc-program" aria-labelledby="nc-program-title">
          <div className="nc-wrap">
            <div className="nc-program__head">
              <p className="nc-kicker">{t("events_nc_program_kicker")}</p>
              <h2 id="nc-program-title" className="nc-section-title">
                {t("events_nc_program_title")}
              </h2>
            </div>

            <ol className="nc-timeline" role="list">
              <li className="nc-stop">
                <span className="nc-stop__dot" aria-hidden="true">
                  🧘‍♀️
                </span>
                <article className="nc-stop__card">
                  <h3 className="nc-stop__title">{t("events_nc_yoga_title")}</h3>
                  <p className="nc-stop__body">{t("events_nc_yoga_body")}</p>
                </article>
              </li>
              <li className="nc-stop">
                <span className="nc-stop__dot" aria-hidden="true">
                  🥐
                </span>
                <article className="nc-stop__card">
                  <h3 className="nc-stop__title">{t("events_nc_brunch_title")}</h3>
                  <p className="nc-stop__body">{t("events_nc_brunch_body")}</p>
                </article>
              </li>
            </ol>
          </div>
        </section>

        <section className="nc-reels" aria-label={t("a11y_reels")}>
          <div className="nc-reels__row">
            {REELS.map((src) => (
              <NcReelPlayer key={src} src={src} playLabel={t("a11y_play")} />
            ))}
          </div>
        </section>

        <section className="nc-section nc-program" aria-label={t("a11y_chocolate_music")}>
          <div className="nc-wrap">
            <ol className="nc-timeline" role="list" start={3}>
              <li className="nc-stop">
                <span className="nc-stop__dot" aria-hidden="true">
                  🍫
                </span>
                <article className="nc-stop__card">
                  <h3 className="nc-stop__title">{t("events_nc_choco_title")}</h3>
                  <p className="nc-stop__body" style={{ whiteSpace: "pre-line" }}>
                    {t("events_nc_choco_body")}
                  </p>
                  <a
                    className="nc-stop__link"
                    href="https://www.instagram.com/la_chocolita"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={t("events_nc_choco_ig_aria")}
                  >
                    <span>{t("events_nc_choco_ig")}</span>
                    <span aria-hidden="true">↗</span>
                  </a>
                </article>
              </li>
              <li className="nc-stop">
                <span className="nc-stop__dot" aria-hidden="true">
                  🎶
                </span>
                <article className="nc-stop__card">
                  <h3 className="nc-stop__title">{t("events_nc_music_title")}</h3>
                  <p className="nc-stop__body">{t("events_nc_music_body")}</p>
                </article>
              </li>
            </ol>
          </div>
        </section>

        <section className="nc-shots" aria-label={t("a11y_workshop_photos")}>
          <div className="nc-shots__grid nc-shots__grid--atelier">
            <figure className="nc-shot nc-shot--feature">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/media/events/nature-chocolate-workshop-01.jpg"
                alt=""
                width={1600}
                height={1200}
                loading="lazy"
                decoding="async"
              />
            </figure>
            <figure className="nc-shot nc-shot--portrait">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/media/events/nature-chocolate-workshop-02.jpg"
                alt=""
                width={1200}
                height={1600}
                loading="lazy"
                decoding="async"
              />
            </figure>
            <figure className="nc-shot">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/media/events/nature-chocolate-workshop-03.jpg"
                alt=""
                width={1600}
                height={1200}
                loading="lazy"
                decoding="async"
              />
            </figure>
            <figure className="nc-shot">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/media/events/nature-chocolate-workshop-04.jpg"
                alt=""
                width={1600}
                height={1200}
                loading="lazy"
                decoding="async"
              />
            </figure>
          </div>
        </section>

        <section className="nc-section nc-includes" aria-labelledby="nc-includes-title">
          <div className="nc-wrap">
            <div className="nc-includes__card">
              <p className="nc-kicker">{t("events_nc_includes_kicker")}</p>
              <h2 id="nc-includes-title" className="nc-section-title">
                {t("events_nc_includes_title")}
              </h2>
              <ul className="nc-includes__list" role="list">
                {INCLUDES.map((key) => (
                  <li key={key} className="nc-includes__item">
                    <span className="nc-includes__check" aria-hidden="true">
                      <CheckIcon />
                    </span>
                    <span>{t(key)}</span>
                  </li>
                ))}
              </ul>
              <p className="nc-includes__access">{t("events_nc_access")}</p>
            </div>
          </div>
        </section>

        <section className="nc-section nc-pricing" aria-labelledby="nc-pricing-title">
          <div className="nc-wrap">
            <div className="nc-pricing__head">
              <p className="nc-kicker">{t("events_nc_pricing_kicker")}</p>
              <h2 id="nc-pricing-title" className="nc-section-title">
                {t("events_nc_pricing_title")}
              </h2>
            </div>
            <div className="nc-pricing__grid">
              <article className="nc-price nc-price--featured">
                <p className="nc-price__label">{t("events_nc_price_member_label")}</p>
                <p className="nc-price__amount">{t("events_nc_price_member")}</p>
              </article>
              <article className="nc-price">
                <p className="nc-price__label">{t("events_nc_price_guest_label")}</p>
                <p className="nc-price__amount">{t("events_nc_price_guest")}</p>
              </article>
            </div>
          </div>
        </section>

        <section className="nc-cta" aria-labelledby="nc-cta-title">
          <div className="nc-cta__media" aria-hidden="true">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/media/events/nature-chocolate-dome.jpg"
              alt=""
              width={1600}
              height={1200}
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className="nc-cta__overlay" aria-hidden="true" />
          <div className="nc-cta__inner">
            <h2 id="nc-cta-title" className="nc-cta__title">
              {t("events_nc_title")}
            </h2>
            <p className="nc-cta__text">{t("events_nc_cta_text")}</p>
            <p className="nc-sold-note nc-sold-note--on-dark">{t("events_nc_sold_out_note")}</p>
            <button
              type="button"
              className="nc-cta__btn nc-cta--disabled"
              disabled
              aria-disabled="true"
              aria-label={t("events_nc_sold_out_aria")}
            >
              <span>{t("events_nc_sold_out_cta")}</span>
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
