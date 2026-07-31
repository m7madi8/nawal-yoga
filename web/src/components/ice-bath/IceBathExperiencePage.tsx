"use client";

import Link from "next/link";
import { useI18n } from "@/lib/i18n/provider";
import { waLink } from "@/lib/i18n/dictionaries";
import { Reveal } from "@/components/animations/Reveal";
import "./ice-bath-experience.css";

export function IceBathExperiencePage() {
  const { t, dir } = useI18n();
  const bookHref = waLink(t("events_ib_wa_msg"));

  return (
    <div className="ibx-page">
      <main className="ibx-main">
        <section className="ibx-hero" aria-labelledby="ibx-hero-title">
          <div className="ibx-hero__media" aria-hidden="true">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="ibx-hero__photo"
              src="/media/events/ice-bath/yoga-breath.jpg"
              alt=""
              width={1200}
              height={1400}
              fetchPriority="high"
              decoding="async"
            />
          </div>
          <div className="ibx-hero__scrim" aria-hidden="true" />
          <Link href="/events/ice-bath" className="ibx-hero__back top-back-link" aria-label={t("back")}>
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={dir === "rtl" ? "M9 5l7 7-7 7" : "M15 19l-7-7 7-7"} />
            </svg>
            <span>{t("back")}</span>
          </Link>
          <div className="ibx-hero__inner">
            <Reveal>
              <p className="ibx-hero__brand">{t("brand")}</p>
              <h1 id="ibx-hero-title" className="ibx-hero__title">
                {t("ibx_hero_title")}
              </h1>
              <p className="ibx-hero__lead">{t("ibx_hero_lead")}</p>
              <Link href="/events/ice-bath" className="ibx-hero__cta">
                {t("ibx_hero_cta")}
              </Link>
            </Reveal>
          </div>
        </section>

        <section className="ibx-section ibx-voice" aria-labelledby="ibx-voice-title">
          <div className="ibx-wrap ibx-voice__grid">
            <Reveal>
              <figure className="ibx-voice__portrait">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/media/brand/nawal-avatar.jpeg"
                  alt={t("ibx_nawal_img_alt")}
                  width={640}
                  height={800}
                  loading="lazy"
                  decoding="async"
                />
              </figure>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="ibx-voice__copy">
                <p className="ibx-kicker">{t("ibx_voice_kicker")}</p>
                <h2 id="ibx-voice-title" className="ibx-title">
                  {t("ibx_voice_title")}
                </h2>
                <p className="ibx-prose">{t("ibx_voice_p1")}</p>
                <p className="ibx-prose">{t("ibx_voice_p2")}</p>
                <p className="ibx-prose ibx-prose--emphasis">{t("ibx_voice_p3")}</p>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="ibx-section ibx-stages" aria-labelledby="ibx-stages-title">
          <div className="ibx-wrap">
            <Reveal>
              <div className="ibx-section-head">
                <p className="ibx-kicker">{t("ibx_stages_kicker")}</p>
                <h2 id="ibx-stages-title" className="ibx-title">
                  {t("ibx_stages_title")}
                </h2>
                <p className="ibx-lead">{t("ibx_stages_lead")}</p>
              </div>
            </Reveal>
            <ol className="ibx-stages__list" role="list">
              {(
                [
                  ["01", "ibx_stage1_title", "ibx_stage1_body"],
                  ["02", "ibx_stage2_title", "ibx_stage2_body"],
                  ["03", "ibx_stage3_title", "ibx_stage3_body"],
                ] as const
              ).map(([num, title, body], i) => (
                <Reveal key={num} delay={i * 0.06}>
                  <li className="ibx-stage">
                    <span className="ibx-stage__num" aria-hidden="true">
                      {num}
                    </span>
                    <h3 className="ibx-stage__title">{t(title)}</h3>
                    <p className="ibx-stage__body">{t(body)}</p>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>

        <section className="ibx-section ibx-body" aria-labelledby="ibx-body-title">
          <div className="ibx-wrap ibx-split">
            <Reveal>
              <div>
                <p className="ibx-kicker">{t("ibx_body_kicker")}</p>
                <h2 id="ibx-body-title" className="ibx-title">
                  {t("ibx_body_title")}
                </h2>
                <p className="ibx-prose">{t("ibx_body_p1")}</p>
                <p className="ibx-prose">{t("ibx_body_p2")}</p>
                <p className="ibx-quote">{t("ibx_body_quote")}</p>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="ibx-note">
                <h3 className="ibx-note__title">{t("ibx_body_note_title")}</h3>
                <ul className="ibx-note__list" role="list">
                  {(["ibx_body_b1", "ibx_body_b2", "ibx_body_b3", "ibx_body_b4"] as const).map((k) => (
                    <li key={k}>{t(k)}</li>
                  ))}
                </ul>
                <p className="ibx-note__foot">{t("ibx_body_note_foot")}</p>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="ibx-section ibx-cold" aria-labelledby="ibx-cold-title">
          <div className="ibx-wrap">
            <Reveal>
              <div className="ibx-section-head">
                <p className="ibx-kicker">{t("ibx_cold_kicker")}</p>
                <h2 id="ibx-cold-title" className="ibx-title">
                  {t("ibx_cold_title")}
                </h2>
                <p className="ibx-lead">{t("ibx_cold_lead")}</p>
              </div>
            </Reveal>
            <div className="ibx-cold__flow">
              {(
                [
                  ["ibx_cold1_title", "ibx_cold1_body"],
                  ["ibx_cold2_title", "ibx_cold2_body"],
                  ["ibx_cold3_title", "ibx_cold3_body"],
                ] as const
              ).map(([title, body], i) => (
                <Reveal key={title} delay={i * 0.06}>
                  <article className="ibx-cold__step">
                    <h3>{t(title)}</h3>
                    <p>{t(body)}</p>
                  </article>
                </Reveal>
              ))}
            </div>
            <Reveal>
              <aside className="ibx-rule" role="note">
                <p>{t("ibx_cold_rule")}</p>
              </aside>
            </Reveal>
          </div>
        </section>

        <section className="ibx-section ibx-honest" aria-labelledby="ibx-honest-title">
          <div className="ibx-wrap ibx-honest__grid">
            <Reveal>
              <div>
                <p className="ibx-kicker">{t("ibx_honest_kicker")}</p>
                <h2 id="ibx-honest-title" className="ibx-title">
                  {t("ibx_honest_title")}
                </h2>
                <p className="ibx-prose">{t("ibx_honest_p1")}</p>
                <p className="ibx-prose">{t("ibx_honest_p2")}</p>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="ibx-limits">
                <h3 className="ibx-limits__title">{t("ibx_limits_title")}</h3>
                <ul className="ibx-limits__list" role="list">
                  {(
                    [
                      "ibx_limits_1",
                      "ibx_limits_2",
                      "ibx_limits_3",
                      "ibx_limits_4",
                      "ibx_limits_5",
                      "ibx_limits_6",
                      "ibx_limits_7",
                      "ibx_limits_8",
                    ] as const
                  ).map((k) => (
                    <li key={k}>{t(k)}</li>
                  ))}
                </ul>
                <Link href="/register/ice-bath" className="ibx-text-link">
                  {t("ibx_limits_cta")}
                </Link>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="ibx-section ibx-close" aria-labelledby="ibx-close-title">
          <div className="ibx-wrap ibx-close__inner">
            <Reveal>
              <h2 id="ibx-close-title" className="ibx-close__title">
                {t("ibx_close_title")}
              </h2>
              <p className="ibx-close__quote">{t("ibx_close_quote")}</p>
              <div className="ibx-close__actions">
                <Link href="/events/ice-bath" className="ibx-btn">
                  {t("ibx_close_cta_event")}
                </Link>
                <a href={bookHref} target="_blank" rel="noopener noreferrer" className="ibx-btn ibx-btn--ghost">
                  {t("events_ib_cta")}
                </a>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
    </div>
  );
}
