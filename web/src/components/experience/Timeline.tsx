"use client";

import { Reveal } from "@/components/animations/Reveal";

type Item = { time: string; label: string };

export function Timeline({ title, items }: { title?: string; items: Item[] }) {
  return (
    <section className="bg-[#fafaf8] py-[clamp(3.5rem,8vw,5.5rem)]">
      <div className="mx-auto max-w-[40rem] px-4 sm:px-6">
        {title && (
          <Reveal>
            <h2 className="font-display mb-8 text-center text-[clamp(1.75rem,3.5vw,2.5rem)] font-light text-ink">
              {title}
            </h2>
          </Reveal>
        )}
        <ul className="space-y-0 border-t border-[var(--border-soft)]">
          {items.map((item, i) => (
            <Reveal key={`${item.time}-${i}`} delay={i * 0.05}>
              <li className="grid grid-cols-[7rem_1fr] gap-4 border-b border-[var(--border-soft)] py-5 sm:grid-cols-[9rem_1fr]">
                <span className="text-[0.7rem] tracking-[0.12em] text-brass uppercase">
                  {item.time}
                </span>
                <span className="text-ink">{item.label}</span>
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
