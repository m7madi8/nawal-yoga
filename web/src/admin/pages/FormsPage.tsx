"use client";

import { useMemo, useState } from "react";
import { PageHeader, Panel, FilterChips, StatTile } from "@/admin/components/ui/PageChrome";
import { SearchInput } from "@/admin/components/ui/SearchInput";
import { EmptyState } from "@/admin/components/ui/EmptyState";
import { useAdminData } from "@/admin/components/shell/AdminShell";
import { RequestRow } from "@/admin/components/requests/RequestRow";
import { RequestDetailModal } from "@/admin/components/requests/RequestDetailModal";
import { MEDICAL_SOURCES } from "@/admin/lib/labels";
import type { RetreatRequest } from "@/admin/lib/types";

export function FormsPage() {
  const { rows, stats, setStatus, remove, loading } = useAdminData();
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState("pending");
  const [kind, setKind] = useState("all");
  const [selected, setSelected] = useState<RetreatRequest | null>(null);
  const [busy, setBusy] = useState(false);

  const medical = useMemo(
    () => rows.filter((r) => MEDICAL_SOURCES.includes(r.source)),
    [rows],
  );

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    return medical.filter((r) => {
      if (filter !== "all" && r.status !== filter) return false;
      if (kind === "mountain" && !r.source.includes("mountain")) return false;
      if (kind === "ice" && r.source !== "ice-bath-health") return false;
      if (!query) return true;
      return (
        r.fullName.toLowerCase().includes(query) ||
        r.phone.includes(query) ||
        r.healthStatus.toLowerCase().includes(query)
      );
    });
  }, [medical, q, filter, kind]);

  return (
    <div>
      <PageHeader
        title="Medical forms"
        description="Handle health disclosures with care. Open one record at a time; avoid shared screens."
      />

      <div className="mb-6 rounded-2xl border border-amber-200/70 bg-amber-50/40 px-5 py-4 text-sm text-amber-950/80">
        Private by design — health answers are only visible inside the detail view. Prefer reviewing alone.
      </div>

      <div className="mb-6 grid gap-3 sm:grid-cols-3">
        <StatTile label="Awaiting review" value={stats.medicalPending} tone="alert" />
        <StatTile label="Total medical" value={medical.length} />
        <StatTile
          label="Ice bath forms"
          value={medical.filter((r) => r.source === "ice-bath-health").length}
        />
      </div>

      <div className="mb-5 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <SearchInput
          value={q}
          onChange={setQ}
          placeholder="Search name or phone…"
          className="lg:max-w-sm"
        />
        <div className="flex flex-col gap-2 sm:flex-row">
          <FilterChips
            value={filter}
            onChange={setFilter}
            options={[
              { id: "pending", label: "Pending" },
              { id: "completed", label: "Reviewed" },
              { id: "all", label: "All" },
            ]}
          />
          <FilterChips
            value={kind}
            onChange={setKind}
            options={[
              { id: "all", label: "All forms" },
              { id: "mountain", label: "Mountain Voice" },
              { id: "ice", label: "Ice Bath" },
            ]}
          />
        </div>
      </div>

      <Panel>
        {loading ? (
          <p className="px-5 py-10 text-sm text-[var(--text-soft)]">Loading securely…</p>
        ) : filtered.length === 0 ? (
          <div className="p-5">
            <EmptyState
              title="No forms in this view"
              description="When a health form is submitted, it will wait here for your review."
            />
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
