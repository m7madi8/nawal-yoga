"use client";

import Link from "next/link";
import Image from "next/image";
import { clsx } from "clsx";
import { Reveal } from "@/components/animations/Reveal";

type Cta = { href: string; label: string; external?: boolean };

type Props = {
  image: string;
  kicker?: string;
  title: string;
  lead?: string;
  meta?: string;
  primaryCta?: Cta;
  secondaryCta?: Cta;
  tall?: boolean;
  soldOut?: boolean;
  soldOutLabel?: string;
};

export function PageHero({
  image,
  kicker,
  title,
  lead,
  meta,
  primaryCta,
  secondaryCta,
  tall = true,
  soldOut,
  soldOutLabel,
}: Props) {
  return (
    <section
      className={clsx(
        "relative overflow-hidden bg-ink text-white",
        tall ? "min-h-[75svh]" : "min-h-[60svh]",
      )}
    >
      <Image src={image} alt="" fill priority className="object-cover" sizes="100vw" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/35 to-ink/25" />
      <div className="relative z-10 mx-auto flex min-h-[inherit] max-w-[70rem] flex-col justify-end px-4 pb-14 pt-28 sm:px-6 lg:px-8">
        <Reveal>
          {kicker && (
            <p className="mb-3 text-[0.65rem] tracking-[0.28em] text-brass uppercase">{kicker}</p>
          )}
          {meta && <p className="mb-3 text-sm text-white/70">{meta}</p>}
          <h1 className="font-display mb-4 max-w-3xl text-[clamp(2.4rem,6vw,4.5rem)] font-light leading-[1.05]">
            {title}
          </h1>
          {lead && <p className="mb-8 max-w-xl text-base text-white/75 sm:text-lg">{lead}</p>}
          <div className="flex flex-wrap items-center gap-3">
            {soldOut ? (
              <span className="inline-flex min-h-12 items-center rounded-full border border-white/30 px-6 text-[0.7rem] tracking-[0.14em] uppercase">
                {soldOutLabel}
              </span>
            ) : (
              primaryCta &&
              (primaryCta.external ? (
                <a
                  href={primaryCta.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-12 items-center rounded-full bg-[#fafaf8] px-7 text-[0.7rem] tracking-[0.12em] text-olive uppercase"
                >
                  {primaryCta.label}
                </a>
              ) : (
                <Link
                  href={primaryCta.href}
                  className="inline-flex min-h-12 items-center rounded-full bg-[#fafaf8] px-7 text-[0.7rem] tracking-[0.12em] text-olive uppercase"
                >
                  {primaryCta.label}
                </Link>
              ))
            )}
            {secondaryCta &&
              (secondaryCta.external ? (
                <a
                  href={secondaryCta.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-12 items-center rounded-full border border-white/35 px-6 text-[0.7rem] tracking-[0.12em] text-white/85 uppercase"
                >
                  {secondaryCta.label}
                </a>
              ) : (
                <Link
                  href={secondaryCta.href}
                  className="inline-flex min-h-12 items-center rounded-full border border-white/35 px-6 text-[0.7rem] tracking-[0.12em] text-white/85 uppercase"
                >
                  {secondaryCta.label}
                </Link>
              ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
