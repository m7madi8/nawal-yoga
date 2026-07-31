"use client";

import { motion } from "framer-motion";

export function EmptyState({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-[var(--border-soft)] bg-white/50 px-6 py-16 text-center"
    >
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-olive/10 text-olive">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M4 19V5M4 19h16M8 15v-4M12 15V8M16 15v-6" strokeLinecap="round" />
        </svg>
      </div>
      <h3 className="mb-1 text-base font-medium text-ink">{title}</h3>
      <p className="mb-5 max-w-sm text-sm text-[var(--text-soft)]">{description}</p>
      {action}
    </motion.div>
  );
}
