"use client";

import { Reveal } from "@/components/animations/Reveal";

type Quote = { text: string; name: string };

export function QuoteBlock({ title, quotes }: { title?: string; quotes: Quote[] }) {
  return (
    <section className="bg-[#fafaf8] py-[clamp(3.5rem,8vw,5.5rem)]">
      <div className="mx-auto max-w-[70rem] px-4 sm:px-6 lg:px-8">
        {title && (
          <Reveal>
            <h2 className="font-display mb-10 text-[clamp(1.75rem,3.5vw,2.5rem)] font-light text-ink">
              {title}
            </h2>
          </Reveal>
        )}
        <div className={`grid gap-8 ${quotes.length > 1 ? "md:grid-cols-3" : "max-w-2xl"}`}>
          {quotes.map((q, i) => (
            <Reveal key={q.name} delay={i * 0.06}>
              <blockquote>
                <p className="font-display text-lg leading-snug text-ink sm:text-xl">“{q.text}”</p>
                <cite className="mt-4 block text-xs not-italic tracking-[0.08em] text-[var(--text-soft)]">
                  {q.name}
                </cite>
              </blockquote>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
