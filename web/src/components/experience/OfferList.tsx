"use client";

import { Reveal } from "@/components/animations/Reveal";
import { clsx } from "clsx";

type Offer = { label: string; price: string; featured?: boolean; action?: React.ReactNode };

export function OfferList({
  title,
  lead,
  offers,
}: {
  title: string;
  lead?: string;
  offers: Offer[];
}) {
  return (
    <section className="bg-[#fafaf8] py-[clamp(3.5rem,8vw,5.5rem)]">
      <div className="mx-auto max-w-[40rem] px-4 sm:px-6">
        <Reveal>
          <h2 className="font-display mb-3 text-[clamp(1.75rem,3.5vw,2.5rem)] font-light text-ink">
            {title}
          </h2>
          {lead && <p className="mb-8 text-[var(--text-soft)]">{lead}</p>}
        </Reveal>
        <div className="divide-y divide-[var(--border-soft)] border-y border-[var(--border-soft)]">
          {offers.map((o, i) => (
            <Reveal key={o.label} delay={i * 0.05}>
              <div
                className={clsx(
                  "grid items-center gap-4 py-6 sm:grid-cols-[1.2fr_auto_auto]",
                  o.featured && "bg-ink/[0.03] px-4 sm:px-5",
                )}
              >
                <p className="font-display text-xl text-ink sm:text-2xl">{o.label}</p>
                <p className="font-display text-3xl text-ink">{o.price}</p>
                {o.action}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
