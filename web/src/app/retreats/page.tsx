"use client";

import Link from "next/link";
import { useI18n } from "@/lib/i18n/provider";
import { Reveal } from "@/components/animations/Reveal";
import { JoinSection } from "@/components/sections/JoinSection";

const retreats = [
  {
    href: "/retreats/dahab",
    image: "/media/dahab/cover.jpeg",
    titleKey: "retreats_dahab_title" as const,
    descKey: "retreats_dahab_desc" as const,
  },
  {
    href: "/register/mountain-voice",
    image: "/media/dahab/mountain-voice.jpg",
    titleKey: "retreats_form_title" as const,
    descKey: "retreats_form_desc" as const,
  },
];

export default function RetreatsPage() {
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
              {t("retreats_page_kicker")}
            </p>
            <h1 className="font-display mb-4 text-[clamp(2.5rem,6vw,4rem)] text-ink">
              {t("retreats_page_title")}
            </h1>
            <p className="max-w-xl text-lg text-[var(--text-soft)]">{t("retreats_page_intro")}</p>
          </Reveal>
        </div>
      </section>

      <section className="bg-[#fafaf8] text-ink">
        <div className="mx-auto max-w-[70rem] px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <ul className="divide-y divide-[var(--border-soft)] border-y border-[var(--border-soft)]">
            {retreats.map((r, i) => (
              <li key={r.href}>
                <Reveal delay={i * 0.06}>
                  <Link
                    href={r.href}
                    className="group grid items-center gap-8 py-10 sm:gap-10 md:grid-cols-[1fr_minmax(200px,280px)] md:py-12 lg:grid-cols-[1fr_minmax(240px,320px)]"
                  >
                    <div className="order-2 md:order-1">
                      <p className="mb-3 text-[0.65rem] tracking-[0.22em] text-brass uppercase">
                        {t("nav_retreats")}
                      </p>
                      <h2 className="font-display mb-3 text-[clamp(1.75rem,3vw,2.5rem)] leading-tight text-ink">
                        {t(r.titleKey)}
                      </h2>
                      <p className="mb-5 max-w-md text-[0.95rem] leading-relaxed text-[var(--text-soft)]">
                        {t(r.descKey)}
                      </p>
                      <span className="inline-flex items-center gap-2 text-xs font-medium tracking-[0.14em] text-olive uppercase">
                        {t("view_details")} {dir === "rtl" ? "←" : "→"}
                      </span>
                    </div>
                    <div className="order-1 overflow-hidden bg-stone md:order-2">
                      <div className="aspect-[4/3] overflow-hidden md:aspect-[5/4]">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={r.image}
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
