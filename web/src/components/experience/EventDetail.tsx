"use client";

import Link from "next/link";
import { useI18n } from "@/lib/i18n/provider";
import { waLink, type DictKey } from "@/lib/i18n/dictionaries";
import { eventsContent, type EventSlug } from "@/lib/content/events";
import { PageHero } from "@/components/experience/PageHero";
import { StoryStrip } from "@/components/experience/StoryStrip";
import { Timeline } from "@/components/experience/Timeline";
import { OfferList } from "@/components/experience/OfferList";
import { GalleryRail } from "@/components/experience/GalleryRail";
import { JoinSection } from "@/components/sections/JoinSection";

export function EventDetail({ slug }: { slug: EventSlug }) {
  const { t, dir } = useI18n();
  const event = eventsContent[slug];

  return (
    <>
      <PageHero
        image={event.hero}
        kicker={t("events_page_kicker")}
        meta={`${t(event.dateKey as DictKey)} · ${t(event.placeKey as DictKey)}`}
        title={t(event.titleKey as DictKey)}
        lead={t(event.leadKey as DictKey)}
        soldOut={event.soldOut}
        soldOutLabel={t("sold_out")}
        primaryCta={
          event.soldOut
            ? undefined
            : {
                href: waLink(t(event.ctaPrefillKey as DictKey)),
                label: t("book_now"),
                external: true,
              }
        }
        secondaryCta={
          event.healthFormHref
            ? { href: event.healthFormHref, label: t("health_form") }
            : undefined
        }
      />

      <div className="bg-[#fafaf8] px-4 pt-6 sm:px-6">
        <Link href="/events" className="inline-flex text-sm text-[var(--text-soft)]">
          {dir === "rtl" ? "→" : "←"} {t("ev_back")}
        </Link>
      </div>

      <StoryStrip
        kicker={t("ev_feel_kicker")}
        title={t(event.feelKey as DictKey)}
      />

      <Timeline
        title={t("ev_timeline_title")}
        items={event.timeline.map((row) => ({
          time: t(row.timeKey as DictKey),
          label: t(row.labelKey as DictKey),
        }))}
      />

      {!event.soldOut && (
        <OfferList
          title={t("ev_offer_title")}
          offers={event.offers.map((o) => ({
            label: t(o.labelKey as DictKey),
            price: t(o.priceKey as DictKey),
            action: (
              <a
                href={waLink(t(event.ctaPrefillKey as DictKey))}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center rounded-full bg-olive px-5 text-[0.65rem] tracking-[0.12em] text-[#fafaf8] uppercase"
              >
                {t("book_now")}
              </a>
            ),
          }))}
        />
      )}

      {event.healthFormHref && (
        <section className="border-y border-[var(--border-soft)] bg-[#fafaf8] py-14 text-center sm:py-16">
          <div className="mx-auto max-w-xl px-4">
            <p className="mb-3 text-[0.65rem] tracking-[0.28em] text-brass uppercase">
              {t("ev_hf_tag")}
            </p>
            <h2 className="font-display mb-3 text-[clamp(1.75rem,4vw,2.5rem)] font-light text-ink">
              {t("ev_hf_section_title")}
            </h2>
            <p className="mb-8 text-[var(--text-soft)]">{t("ev_hf_section_lead")}</p>
            <Link
              href={event.healthFormHref}
              className="inline-flex min-h-12 items-center rounded-full bg-olive px-7 text-[0.7rem] tracking-[0.12em] text-[#fafaf8] uppercase"
            >
              {t("ev_hf_cta")}
            </Link>
          </div>
        </section>
      )}

      <GalleryRail title={t("ev_gallery_title")} images={event.gallery} />
      <JoinSection />
    </>
  );
}
