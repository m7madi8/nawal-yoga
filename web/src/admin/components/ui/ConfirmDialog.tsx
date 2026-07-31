"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { AdminButton } from "@/admin/components/ui/AdminButton";

export function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel = "Delete",
  cancelLabel = "Cancel",
  busy,
  onConfirm,
  onCancel,
}: {
  open: boolean;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  busy?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !busy) onCancel();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, busy, onCancel]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            type="button"
            aria-label="Close"
            className="absolute inset-0 bg-ink/45 backdrop-blur-[2px]"
            disabled={busy}
            onClick={() => {
              if (!busy) onCancel();
            }}
          />
          <motion.div
            role="alertdialog"
            aria-modal
            aria-labelledby="confirm-title"
            aria-describedby="confirm-desc"
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 w-full max-w-sm rounded-2xl border border-[var(--border-soft)] bg-[#fafaf8] p-6 shadow-2xl"
          >
            <h3 id="confirm-title" className="font-display text-xl font-light text-ink">
              {title}
            </h3>
            <p id="confirm-desc" className="mt-2 text-sm leading-relaxed text-[var(--text-soft)]">
              {description}
            </p>
            <div className="mt-6 flex flex-wrap justify-end gap-2">
              <AdminButton variant="ghost" disabled={busy} onClick={onCancel}>
                {cancelLabel}
              </AdminButton>
              <AdminButton variant="danger" disabled={busy} onClick={onConfirm}>
                {busy ? "Deleting…" : confirmLabel}
              </AdminButton>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
