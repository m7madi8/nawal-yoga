"use client";

import Link from "next/link";
import { useI18n } from "@/lib/i18n/provider";
import { Reveal } from "@/components/animations/Reveal";
import { JoinSection } from "@/components/sections/JoinSection";

const events = [
  {
    href: "/events/nature-chocolate",
    image: "/media/events/nature-chocolate-hero.jpg",
    titleKey: "events_nc_title" as const,
    metaKey: "events_nc_card_desc" as const,
    tagKey: "events_nc_sold_out" as const,
    ctaKey: "view_details" as const,
    soldOut: true,
  },
  {
    href: "/events/sound-healing",
    image: "/media/events/sound-healing-01.jpg",
    titleKey: "ev_sh_title" as const,
    metaKey: "ev_sh_date" as const,
    tagKey: "nav_events" as const,
    ctaKey: "view_details" as const,
    soldOut: false,
  },
  {
    href: "/events/ice-bath",
    image: "/media/events/ice-bath/hero.jpg",
    titleKey: "ev_ib_title" as const,
    metaKey: "ev_ib_date" as const,
    tagKey: "nav_events" as const,
    ctaKey: "view_details" as const,
    soldOut: false,
  },
  {
    href: "/register/ice-bath",
    image: "/media/events/ice-bath/health-form.jpg",
    titleKey: "ev_hf_title" as const,
    metaKey: "ev_hf_desc" as const,
    tagKey: "ev_hf_tag" as const,
    ctaKey: "ev_hf_cta" as const,
    soldOut: false,
  },
];

export default function EventsPage() {
  const { t, dir } = useI18n();

  return (
    <>
      <section className="border-b border-[var(--border-soft)] bg-[#fafaf8] py-16 sm:py-20">
        <div className="mx-auto max-w-[70rem] px-4 sm:px-6 lg:px-8">
          <Link href="/#pathways" className="mb-8 inline-flex text-sm text-[var(--text-soft)]">
            {dir === "rtl" ? "→" : "←"} {t("back")}
          </Link>
          <Reveal>
            <p className="mb-3 text-[0.6875rem] tracking-[0.28em] text-brass uppercase">
              {t("events_page_kicker")}
            </p>
            <h1 className="font-display mb-4 text-[clamp(2.5rem,6vw,4rem)] text-ink">
              {t("events_page_title")}
            </h1>
            <p className="max-w-xl text-lg text-[var(--text-soft)]">{t("events_page_intro")}</p>
          </Reveal>
        </div>
      </section>

      <section className="bg-[#fafaf8] text-ink">
        <div className="mx-auto max-w-[70rem] px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <p className="mb-8 text-[0.6875rem] tracking-[0.28em] text-brass uppercase">
            {t("events_upcoming")}
          </p>
          <ul className="divide-y divide-[var(--border-soft)] border-y border-[var(--border-soft)]">
            {events.map((event, i) => (
              <li key={event.href}>
                <Reveal delay={i * 0.06}>
                  <Link
                    href={event.href}
                    className={`group grid items-center gap-8 py-10 sm:gap-10 md:grid-cols-[1fr_minmax(200px,280px)] md:py-12 lg:grid-cols-[1fr_minmax(240px,320px)] ${
                      event.soldOut ? "opacity-70" : ""
                    }`}
                  >
                    <div className="order-2 md:order-1">
                      <p className="mb-3 text-[0.65rem] tracking-[0.22em] text-brass uppercase">
                        {event.soldOut ? t("sold_out") : t(event.tagKey)}
                      </p>
                      <h2 className="font-display mb-3 text-[clamp(1.75rem,3vw,2.5rem)] leading-tight text-ink">
                        {t(event.titleKey)}
                      </h2>
                      <p className="mb-5 text-[0.95rem] text-[var(--text-soft)]">{t(event.metaKey)}</p>
                      <span className="inline-flex items-center gap-2 text-xs font-medium tracking-[0.14em] text-olive uppercase">
                        {t(event.ctaKey)} {dir === "rtl" ? "←" : "→"}
                      </span>
                    </div>
                    <div className="order-1 overflow-hidden bg-stone md:order-2">
                      <div className="aspect-[4/3] overflow-hidden md:aspect-[5/4]">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={event.image}
                          alt=""
                          className="h-full w-full object-cover transition duration-[1.1s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                          loading="lazy"
                        />
                      </div>
                    </div>
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <JoinSection />
    </>
  );
}
