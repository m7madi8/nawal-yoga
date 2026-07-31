"use client";

import { useMemo, useState } from "react";
import { Panel, FilterChips, StatTile } from "@/admin/components/ui/PageChrome";
import { SearchInput } from "@/admin/components/ui/SearchInput";
import { EmptyState } from "@/admin/components/ui/EmptyState";
import { RequestRow } from "@/admin/components/requests/RequestRow";
import { RequestDetailModal } from "@/admin/components/requests/RequestDetailModal";
import { useAdminData } from "@/admin/components/shell/AdminShell";
import { sourceLabel } from "@/admin/lib/labels";
import type { RetreatRequest } from "@/admin/lib/types";

export type BoardFilterOption = { id: string; label: string; sources?: string[] };

type Props = {
  title: string;
  sources: string[];
  sourceFilters?: BoardFilterOption[];
  emptyTitle?: string;
  emptyDescription?: string;
};

export function RequestsBoard({
  title,
  sources,
  sourceFilters,
  emptyTitle = "No requests in this view",
  emptyDescription = "Nothing matches the current filters.",
}: Props) {
  const { rows, setStatus, remove, loading } = useAdminData();
  const [q, setQ] = useState("");
  const [status, setStatusFilter] = useState("pending");
  const [sourceId, setSourceId] = useState("all");
  const [selected, setSelected] = useState<RetreatRequest | null>(null);
  const [busy, setBusy] = useState(false);

  const pool = useMemo(
    () => rows.filter((r) => sources.includes(r.source)),
    [rows, sources],
  );

  const activeSources = useMemo(() => {
    if (sourceId === "all") return sources;
    const opt = sourceFilters?.find((f) => f.id === sourceId);
    return opt?.sources?.length ? opt.sources : sources;
  }, [sourceId, sourceFilters, sources]);

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    return pool.filter((r) => {
      if (!activeSources.includes(r.source)) return false;
      if (status !== "all" && r.status !== status) return false;
      if (!query) return true;
      return (
        r.fullName.toLowerCase().includes(query) ||
        r.phone.includes(query) ||
        r.city.toLowerCase().includes(query) ||
        sourceLabel(r.source).toLowerCase().includes(query) ||
        r.retreatType.toLowerCase().includes(query)
      );
    });
  }, [pool, activeSources, status, q]);

  const pending = pool.filter((r) => r.status === "pending").length;
  const completed = pool.filter((r) => r.status === "completed").length;

  const bySource = useMemo(() => {
    const map = new Map<string, number>();
    for (const r of pool) {
      map.set(r.source, (map.get(r.source) || 0) + 1);
    }
    return Array.from(map.entries()).sort((a, b) => b[1] - a[1]);
  }, [pool]);

  return (
    <div>
      <div className="mb-6 grid gap-3 sm:grid-cols-3">
        <StatTile label="Pending" value={pending} tone="alert" hint={title} />
        <StatTile label="Reviewed" value={completed} hint={title} />
        <StatTile label="Total" value={pool.length} tone="olive" hint={title} />
      </div>

      {bySource.length > 0 && (
        <Panel className="mb-6 overflow-hidden">
          <div className="border-b border-[var(--border-soft)] px-5 py-3">
            <h3 className="text-xs font-medium tracking-wide text-[var(--text-soft)] uppercase">
              By type
            </h3>
          </div>
          <ul className="divide-y divide-[var(--border-soft)]">
            {bySource.map(([src, count]) => {
              const pct = pool.length ? Math.round((count / pool.length) * 100) : 0;
              return (
                <li key={src} className="flex items-center gap-4 px-5 py-3">
                  <div className="min-w-0 flex-1">
                    <div className="mb-1.5 flex items-center justify-between gap-3">
                      <p className="truncate text-sm text-ink">{sourceLabel(src)}</p>
                      <p className="shrink-0 text-xs text-[var(--text-soft)]">
                        {count} · {pct}%
                      </p>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-black/[0.05]">
                      <div
                        className="h-full rounded-full bg-olive/70 transition-all duration-500"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </Panel>
      )}

      <div className="mb-5 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <SearchInput
          value={q}
          onChange={setQ}
          placeholder="Search name, phone, type…"
          className="lg:max-w-sm"
        />
        <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
          <FilterChips
            value={status}
            onChange={setStatusFilter}
            options={[
              { id: "pending", label: `Pending (${pending})` },
              { id: "completed", label: `Reviewed (${completed})` },
              { id: "all", label: `All (${pool.length})` },
            ]}
          />
          {sourceFilters && sourceFilters.length > 0 && (
            <FilterChips
              value={sourceId}
              onChange={setSourceId}
              options={[{ id: "all", label: "All types" }, ...sourceFilters.map((f) => ({ id: f.id, label: f.label }))]}
            />
          )}
        </div>
      </div>

      <Panel>
        <div className="flex items-center justify-between border-b border-[var(--border-soft)] px-5 py-3">
          <h2 className="text-sm font-medium text-ink">{title}</h2>
          <span className="text-xs text-[var(--text-soft)]">{filtered.length} shown</span>
        </div>
        {loading ? (
          <p className="px-5 py-10 text-sm text-[var(--text-soft)]">Loading…</p>
        ) : filtered.length === 0 ? (
          <div className="p-5">
            <EmptyState title={emptyTitle} description={emptyDescription} />
          </div>
        ) : (
          filtered.map((r) => <RequestRow key={r.id} request={r} onOpen={setSelected} />)
        )}
      </Panel>

      <RequestDetailModal
        request={selected}
        onClose={() => setSelected(null)}
        onToggleStatus={async (r) => {
          setBusy(true);
          try {
            await setStatus(r.id, r.status === "completed" ? "pending" : "completed");
            setSelected((s) =>
              s?.id === r.id
                ? { ...s, status: s.status === "completed" ? "pending" : "completed" }
                : s,
            );
          } finally {
            setBusy(false);
          }
        }}
        onDelete={async (r) => {
          setBusy(true);
          try {
            await remove(r.id);
            setSelected(null);
          } finally {
            setBusy(false);
          }
        }}
        busy={busy}
      />
    </div>
  );
}
