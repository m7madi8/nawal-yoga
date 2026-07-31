"use client";

import { useState } from "react";
import { Badge } from "@/admin/components/ui/Badge";
import { AdminButton } from "@/admin/components/ui/AdminButton";
import { Modal } from "@/admin/components/ui/Modal";
import { ConfirmDialog } from "@/admin/components/ui/ConfirmDialog";
import { formatDate, sourceLabel, waHref } from "@/admin/lib/labels";
import type { RetreatRequest } from "@/admin/lib/types";

function Field({ label, value }: { label: string; value?: string }) {
  if (!value) return null;
  return (
    <div className="border-b border-[var(--border-soft)] py-3 last:border-0">
      <p className="mb-1 text-[0.65rem] tracking-[0.14em] text-[var(--text-soft)] uppercase">
        {label}
      </p>
      <p className="whitespace-pre-wrap text-sm leading-relaxed text-ink">{value}</p>
    </div>
  );
}

export function RequestDetailModal({
  request,
  onClose,
  onToggleStatus,
  onDelete,
  busy,
}: {
  request: RetreatRequest | null;
  onClose: () => void;
  onToggleStatus: (r: RetreatRequest) => void;
  onDelete: (r: RetreatRequest) => void;
  busy?: boolean;
}) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const r = request;

  return (
    <>
      <Modal
        open={Boolean(r)}
        onClose={() => {
          if (!busy) {
            setConfirmOpen(false);
            onClose();
          }
        }}
        title={r ? r.fullName || "Registration" : ""}
        wide
      >
        {r && (
          <div>
            <div className="mb-5 flex flex-wrap items-center gap-2">
              <Badge tone={r.status === "completed" ? "done" : "pending"}>
                {r.status === "completed" ? "Reviewed" : "Needs review"}
              </Badge>
              <Badge tone="brass">{sourceLabel(r.source)}</Badge>
              <span className="text-xs text-[var(--text-soft)]">
                {formatDate(r.submittedAt || r.createdAt)}
              </span>
            </div>

            <div className="mb-6 rounded-xl bg-black/[0.02] px-4">
              <Field label="Full name" value={r.fullName} />
              <Field label="Phone" value={r.phone} />
              <Field label="City" value={r.city} />
              <Field label="Age" value={r.age} />
              <Field label="Package / type" value={r.retreatType} />
              <Field label="Reason" value={r.reason} />
              <Field label="Expectation / notes" value={r.expectation} />
              <Field label="Experience" value={r.yogaExperience} />
              <Field label="Health status" value={r.healthStatus} />
              <Field label="Health details" value={r.healthDetails} />
              <Field
                label="Activities"
                value={r.activities?.length ? r.activities.join(", ") : ""}
              />
              <Field label="Free note" value={r.freeNote} />
            </div>

            <div className="flex flex-wrap gap-2">
              <AdminButton
                variant="primary"
                disabled={busy}
                onClick={() => onToggleStatus(r)}
              >
                Mark as {r.status === "completed" ? "pending" : "reviewed"}
              </AdminButton>
              {r.phone && (
                <AdminButton
                  variant="secondary"
                  onClick={() => window.open(waHref(r.phone), "_blank", "noopener,noreferrer")}
                >
                  WhatsApp
                </AdminButton>
              )}
              <AdminButton
                variant="danger"
                disabled={busy}
                onClick={() => setConfirmOpen(true)}
              >
                Delete
              </AdminButton>
            </div>
          </div>
        )}
      </Modal>

      <ConfirmDialog
        open={confirmOpen && Boolean(r)}
        title="Delete registration?"
        description={
          r
            ? `This will permanently remove ${r.fullName || "this registration"}. This action cannot be undone.`
            : ""
        }
        confirmLabel="Delete permanently"
        cancelLabel="Keep it"
        busy={busy}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={() => {
          if (!r) return;
          onDelete(r);
          setConfirmOpen(false);
        }}
      />
    </>
  );
}
