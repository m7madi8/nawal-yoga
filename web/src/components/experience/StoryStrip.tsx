"use client";

import { Reveal } from "@/components/animations/Reveal";

type Props = {
  kicker?: string;
  title: string;
  text?: string;
  className?: string;
};

export function StoryStrip({ kicker, title, text, className }: Props) {
  return (
    <section className={`bg-[#fafaf8] py-[clamp(3.5rem,8vw,5.5rem)] ${className ?? ""}`}>
      <div className="mx-auto max-w-[40rem] px-4 text-center sm:px-6">
        <Reveal>
          {kicker && (
            <p className="mb-3 text-[0.65rem] tracking-[0.28em] text-brass uppercase">{kicker}</p>
          )}
          <h2 className="font-display text-[clamp(1.75rem,4vw,2.75rem)] font-light text-ink">
            {title}
          </h2>
          {text && <p className="mt-4 text-[var(--text-soft)] leading-relaxed">{text}</p>}
        </Reveal>
      </div>
    </section>
  );
}
