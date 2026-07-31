"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Reveal } from "@/components/animations/Reveal";

type Item = { q: string; a: string };

export function FaqAccordion({ title, items }: { title: string; items: Item[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="bg-[#fafaf8] py-[clamp(3.5rem,8vw,5.5rem)]">
      <div className="mx-auto max-w-[40rem] px-4 sm:px-6">
        <Reveal>
          <h2 className="font-display mb-8 text-[clamp(1.75rem,3.5vw,2.5rem)] font-light text-ink">
            {title}
          </h2>
        </Reveal>
        <ul className="border-t border-[var(--border-soft)]">
          {items.map((item, i) => {
            const isOpen = open === i;
            return (
              <li key={item.q} className="border-b border-[var(--border-soft)]">
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-4 py-5 text-start"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : i)}
                >
                  <span className="font-display text-lg text-ink">{item.q}</span>
                  <span aria-hidden className="text-brass">
                    {isOpen ? "−" : "+"}
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="pb-5 text-[var(--text-soft)] leading-relaxed">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
