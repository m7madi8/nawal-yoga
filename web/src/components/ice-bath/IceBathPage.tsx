"use client";

import { useRef } from "react";
import Link from "next/link";
import { useI18n } from "@/lib/i18n/provider";
import { waLink, type DictKey } from "@/lib/i18n/dictionaries";
import {
  WAZE_HOFIT,
  iceBathFor,
  iceBathIncludes,
  iceBathNot,
  iceBathProgram,
  iceBathWhy,
} from "@/lib/content/ice-bath";
import { useIceBathMotion } from "@/components/ice-bath/useIceBathMotion";
import "./ice-bath-event.css";

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12l5 5L20 7" />
    </svg>
  );
}

export function IceBathPage() {
  const { t, dir, locale } = useI18n();
  const rootRef = useRef<HTMLDivElement>(null);
  useIceBathMotion(rootRef, locale);

  const bookHref = waLink(t("events_ib_wa_msg"));

  return (
    <div ref={rootRef} className="ib-page">
      <main className="ib-main">
        {/* Hero */}
        <section className="ib-hero" aria-labelledby="ib-hero-title">
          <div className="ib-hero__media" aria-hidden="true">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="ib-hero__photo"
              src="/media/events/ice-bath/hero.jpg"
              alt={t("events_ib_hero_img_alt")}
              width={1600}
              height={1067}
              fetchPriority="high"
              decoding="async"
            />
          </div>
          <div className="ib-hero__atmosphere" aria-hidden="true" />
          <div className="ib-hero__scrim" aria-hidden="true" />

          <Link href="/events" className="ib-hero__back top-back-link" aria-label={t("back")}>
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={dir === "rtl" ? "M9 5l7 7-7 7" : "M15 19l-7-7 7-7"} />
            </svg>
            <span>{t("back")}</span>
          </Link>

          <div className="ib-hero__inner">
            <p className="ib-hero__brand ib-hero__fade ib-hero__fade--1">{t("brand")}</p>
            <h1 id="ib-hero-title" className="ib-hero__title ib-hero__fade ib-hero__fade--2">
              {t("events_ib_title")}
            </h1>
            <div className="ib-hero__divider ib-hero__fade ib-hero__fade--2" aria-hidden="true" />
            <div className="ib-hero__meta ib-hero__fade ib-hero__fade--3">
              <p className="ib-hero__meta-row ib-hero__meta-row--date">{t("events_ib_date")}</p>
              <p className="ib-hero__meta-row">{t("events_ib_time")}</p>
              <p className="ib-hero__meta-row">{t("events_ib_location")}</p>
            </div>
            <a
              href={bookHref}
              target="_blank"
              rel="noopener noreferrer"
              className="ib-hero__cta ib-hero__fade ib-hero__fade--3"
              aria-label={t("events_ib_cta_aria")}
            >
              <span>{t("events_ib_cta")}</span>
            </a>
            <Link
              href="/register/ice-bath"
              className="ib-hero__health ib-hero__fade ib-hero__fade--3"
              aria-label={t("events_ib_health_cta_aria")}
            >
              <span>{t("events_ib_health_cta")}</span>
            </Link>
          </div>
        </section>

        {/* Intro */}
        <section className="ib-section ib-intro" aria-labelledby="ib-intro-title">
          <div className="ib-wrap">
            <div className="ib-intro__inner">
              <h2 id="ib-intro-title" className="ib-intro__title">
                {t("events_ib_limited")}
              </h2>
              <p className="ib-intro__text">{t("events_ib_limited_body")}</p>
              <p className="ib-intro__venue">{t("events_ib_venue")}</p>
              <a className="ib-waze" href={WAZE_HOFIT} target="_blank" rel="noopener noreferrer">
                {t("events_ib_waze")}
              </a>
              <p className="ib-intro__guide">
                <Link href="/events/ice-bath-experience" className="ib-intro__guide-link">
                  {t("ibx_event_link")}
                </Link>
              </p>
            </div>
          </div>
        </section>

        {/* Program */}
        <section className="ib-section ib-program" aria-labelledby="ib-program-title">
          <div className="ib-wrap">
            <div className="ib-program__head">
              <p className="ib-kicker">{t("events_ib_program_kicker")}</p>
              <h2 id="ib-program-title" className="ib-section-title">
                {t("events_ib_program_title")}
              </h2>
            </div>

            <ol className="ib-timeline" role="list">
              <span className="ib-timeline__progress" aria-hidden="true" />
              {iceBathProgram.map((stop) => (
                <li key={stop.role} className="ib-stop">
                  <span className="ib-stop__marker" aria-hidden="true" />
                  <div className="ib-stop__row">
                    <div className={`ib-stop__media ib-stop__media--${stop.role}`}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={stop.image}
                        alt={t(stop.alt)}
                        width={1200}
                        height={900}
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <div className="ib-stop__content">
                      <p className="ib-stop__time">{t(stop.time)}</p>
                      <h3 className="ib-stop__title">{t(stop.title)}</h3>
                      <p className="ib-stop__body" style={{ whiteSpace: "pre-line" }}>
                        {t(stop.body)}
                      </p>
                      {stop.bullets.length > 0 && (
                        <ul className="ib-stop__list" role="list">
                          {stop.bullets.map((b) => (
                            <li key={b}>{t(b)}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Includes */}
        <section className="ib-section ib-includes" aria-labelledby="ib-includes-title">
          <div className="ib-wrap">
            <div className="ib-includes__head">
              <p className="ib-kicker">{t("events_ib_includes_kicker")}</p>
              <h2 id="ib-includes-title" className="ib-section-title">
                {t("events_ib_includes_title")}
              </h2>
            </div>
            <ul className="ib-includes__list" role="list">
              {iceBathIncludes.map((key) => (
                <li key={key} className="ib-includes__item">
                  <span className="ib-includes__check" aria-hidden="true">
                    <CheckIcon />
                  </span>
                  <span>{t(key)}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Dress */}
        <section className="ib-section ib-dress" aria-labelledby="ib-dress-title">
          <div className="ib-wrap">
            <p className="ib-kicker">{t("events_ib_dress_kicker")}</p>
            <h2 id="ib-dress-title" className="ib-section-title">
              {t("events_ib_dress_title")}
            </h2>
            <div className="ib-dress__options">
              <p className="ib-dress__option">{t("events_ib_dress_white")}</p>
              <p className="ib-dress__or">{t("events_ib_dress_or")}</p>
              <p className="ib-dress__option">{t("events_ib_dress_pink")}</p>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="ib-section ib-pricing" aria-labelledby="ib-pricing-title">
          <div className="ib-wrap">
            <div className="ib-pricing__head">
              <p className="ib-kicker">{t("events_ib_price_kicker")}</p>
              <h2 id="ib-pricing-title" className="ib-section-title">
                {t("events_ib_price_title")}
              </h2>
            </div>
            <div className="ib-pricing__grid">
              <article className="ib-price">
                <p className="ib-price__label">{t("events_ib_price_member_label")}</p>
                <p className="ib-price__amount">{t("events_ib_price_member")}</p>
              </article>
              <article className="ib-price">
                <p className="ib-price__label">{t("events_ib_price_guest_label")}</p>
                <p className="ib-price__amount">{t("events_ib_price_guest")}</p>
              </article>
            </div>
            <p className="ib-pricing__note">{t("events_ib_price_note")}</p>
          </div>
        </section>

        {/* Audience */}
        <section className="ib-section ib-audience" aria-labelledby="ib-for-title">
          <div className="ib-wrap">
            <div className="ib-audience__grid">
              <div className="ib-audience__block">
                <h2 id="ib-for-title" className="ib-audience__block-title">
                  {t("events_ib_for_title")}
                </h2>
                <ul className="ib-audience__list" role="list">
                  {iceBathFor.map((key) => (
                    <li key={key}>{t(key)}</li>
                  ))}
                </ul>
              </div>

              <div className="ib-audience__block ib-audience--caution">
                <h2 className="ib-audience__block-title">{t("events_ib_not_title")}</h2>
                <p className="ib-audience__lead">{t("events_ib_not_lead")}</p>
                <ul className="ib-audience__list" role="list">
                  {iceBathNot.map((key) => (
                    <li key={key}>{t(key)}</li>
                  ))}
                </ul>
                <p className="ib-audience__note">{t("events_ib_not_note")}</p>
                <p className="ib-audience__hint">{t("events_ib_health_hint")}</p>
                <Link
                  className="ib-health-btn"
                  href="/register/ice-bath"
                  aria-label={t("events_ib_health_cta_aria")}
                >
                  <span>{t("events_ib_health_cta")}</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Why */}
        <section className="ib-section ib-why" aria-labelledby="ib-why-title">
          <div className="ib-wrap">
            <div className="ib-why__head">
              <p className="ib-kicker">{t("events_ib_why_kicker")}</p>
              <h2 id="ib-why-title" className="ib-section-title">
                {t("events_ib_why_title")}
              </h2>
            </div>
            <ol className="ib-why__list" role="list">
              {iceBathWhy.map((item) => (
                <li key={item.title} className="ib-why__item">
                  <h3 className="ib-why__title">{t(item.title as DictKey)}</h3>
                  <p className="ib-why__body">{t(item.body as DictKey)}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Booking CTA */}
        <section className="ib-cta" aria-labelledby="ib-cta-title">
          <div className="ib-cta__media" aria-hidden="true">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="ib-cta__photo"
              src="/media/events/ice-bath/hero.jpg"
              alt=""
              width={1600}
              height={1067}
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className="ib-cta__inner">
            <h2 id="ib-cta-title" className="ib-cta__title">
              {t("events_ib_book_title")}
            </h2>
            <p className="ib-cta__text">{t("events_ib_book_body")}</p>
            <p className="ib-cta__note">{t("events_ib_book_note")}</p>
            <div className="ib-cta__actions">
              <a
                href={bookHref}
                target="_blank"
                rel="noopener noreferrer"
                className="ib-cta__btn"
                aria-label={t("events_ib_cta_aria")}
              >
                <span>{t("events_ib_cta")}</span>
              </a>
              <Link
                href="/register/ice-bath"
                className="ib-cta__btn ib-cta__btn--secondary"
                aria-label={t("events_ib_health_cta_aria")}
              >
                <span>{t("events_ib_health_cta")}</span>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
