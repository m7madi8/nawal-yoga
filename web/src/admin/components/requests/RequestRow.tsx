"use client";

import { Badge } from "@/admin/components/ui/Badge";
import { relativeTime, sourceLabel } from "@/admin/lib/labels";
import type { RetreatRequest } from "@/admin/lib/types";

export function RequestRow({
  request,
  onOpen,
}: {
  request: RetreatRequest;
  onOpen: (r: RetreatRequest) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onOpen(request)}
      className="grid w-full grid-cols-[1fr_auto] items-center gap-3 border-b border-[var(--border-soft)] px-4 py-3.5 text-start transition hover:bg-black/[0.02] sm:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_auto_auto]"
    >
      <div className="min-w-0">
        <p className="truncate text-sm font-medium text-ink">{request.fullName || "Unnamed"}</p>
        <p className="truncate text-xs text-[var(--text-soft)]">{request.phone || "No phone"}</p>
      </div>
      <p className="hidden truncate text-sm text-[var(--text-soft)] sm:block">
        {sourceLabel(request.source)}
      </p>
      <Badge tone={request.status === "completed" ? "done" : "pending"}>
        {request.status === "completed" ? "Reviewed" : "Pending"}
      </Badge>
      <p className="hidden text-xs text-[var(--text-soft)] sm:block">
        {relativeTime(request.submittedAt || request.createdAt)}
      </p>
    </button>
  );
}
