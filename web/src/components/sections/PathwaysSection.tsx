"use client";

import Link from "next/link";
import Image from "next/image";
import { useI18n } from "@/lib/i18n/provider";
import { Reveal } from "@/components/animations/Reveal";
import { TextReveal } from "@/components/animations/TextReveal";

const pathways = [
  {
    href: "/practice",
    image: "/media/haifa/hero.jpg",
    tag: "path_haifa_tag" as const,
    title: "path_haifa_title" as const,
    desc: "path_haifa_desc" as const,
    cta: "path_haifa_cta" as const,
  },
  {
    href: "/events",
    image: "/media/events/sound-healing-01.jpg",
    tag: "path_events_tag" as const,
    title: "path_events_title" as const,
    desc: "path_events_desc" as const,
    cta: "path_events_cta" as const,
  },
  {
    href: "/retreats",
    image: "/media/dahab/cover.jpeg",
    tag: "path_retreats_tag" as const,
    title: "path_retreats_title" as const,
    desc: "path_retreats_desc" as const,
    cta: "path_retreats_cta" as const,
  },
];

export function PathwaysSection() {
  const { t, dir } = useI18n();

  return (
    <section id="pathways" className="bg-ink text-white">
      <div className="mx-auto max-w-[70rem] px-4 pt-[clamp(4.5rem,10vw,7rem)] pb-6 sm:px-6 lg:px-8">
        <Reveal>
          <p className="mb-3 text-[0.65rem] tracking-[0.28em] text-brass uppercase">
            {t("pathways_kicker")}
          </p>
        </Reveal>
        <TextReveal className="font-display mb-3 max-w-2xl text-[clamp(2rem,4.5vw,3.25rem)] font-light leading-tight text-white">
          {t("pathways_title")}
        </TextReveal>
        <Reveal delay={0.08}>
          <p className="mb-10 max-w-lg text-white/65 sm:mb-14">{t("pathways_lead")}</p>
        </Reveal>
      </div>

      <ul>
        {pathways.map((p, i) => (
          <li key={p.href}>
            <Reveal delay={i * 0.05}>
              <Link
                href={p.href}
                className="group relative flex min-h-[70svh] items-end overflow-hidden sm:min-h-[75svh]"
              >
                <Image
                  src={p.image}
                  alt=""
                  fill
                  className="object-cover transition duration-[1.4s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                  sizes="100vw"
                  priority={i === 0}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/35 to-ink/15" />
                <div className="relative z-10 mx-auto flex w-full max-w-[70rem] flex-col px-4 pb-12 pt-28 sm:px-6 sm:pb-16 lg:px-8">
                  <p className="mb-3 text-[0.65rem] tracking-[0.28em] text-brass uppercase">
                    {t(p.tag)}
                  </p>
                  <h3 className="font-display mb-4 max-w-xl text-[clamp(2.25rem,6vw,4rem)] font-light leading-[1.05] text-white">
                    {t(p.title)}
                  </h3>
                  <p className="mb-7 max-w-md text-[1.05rem] leading-relaxed text-white/75">
                    {t(p.desc)}
                  </p>
                  <span className="inline-flex w-fit items-center gap-2 border-b border-white/40 pb-1 text-[0.7rem] tracking-[0.16em] text-white uppercase transition group-hover:border-white group-hover:gap-3">
                    {t(p.cta)} {dir === "rtl" ? "←" : "→"}
                  </span>
                </div>
              </Link>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}
