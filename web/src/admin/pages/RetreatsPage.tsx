"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { PageHeader, Panel } from "@/admin/components/ui/PageChrome";
import { Badge } from "@/admin/components/ui/Badge";
import { AdminButton } from "@/admin/components/ui/AdminButton";
import { EmptyState } from "@/admin/components/ui/EmptyState";
import { Modal } from "@/admin/components/ui/Modal";
import { useAdminData } from "@/admin/components/shell/AdminShell";
import { RequestRow } from "@/admin/components/requests/RequestRow";
import { RequestDetailModal } from "@/admin/components/requests/RequestDetailModal";
import { loadRetreats, saveRetreats } from "@/admin/lib/catalog";
import { RETREAT_SOURCES } from "@/admin/lib/labels";
import type { ManagedRetreat, RetreatRequest } from "@/admin/lib/types";

export function RetreatsPage() {
  const { rows, setStatus, remove } = useAdminData();
  const [retreats, setRetreats] = useState<ManagedRetreat[]>(() => loadRetreats());
  const [editing, setEditing] = useState<ManagedRetreat | null>(null);
  const [selected, setSelected] = useState<RetreatRequest | null>(null);
  const [busy, setBusy] = useState(false);

  const requests = useMemo(
    () => rows.filter((r) => RETREAT_SOURCES.includes(r.source)),
    [rows],
  );

  const withCounts = useMemo(() => {
    return retreats.map((ret) => {
      const enrolled = requests.filter((r) => {
        const s = r.source.toLowerCase();
        return s.includes(ret.id) || r.retreatType.toLowerCase().includes(ret.id);
      }).length;
      return { ...ret, enrolled: enrolled || ret.enrolled };
    });
  }, [retreats, requests]);

  function persist(next: ManagedRetreat[]) {
    setRetreats(next);
    saveRetreats(next);
  }

  function saveEdit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!editing) return;
    const fd = new FormData(e.currentTarget);
    const updated: ManagedRetreat = {
      ...editing,
      title: String(fd.get("title") || editing.title),
      location: String(fd.get("location") || editing.location),
      startDate: String(fd.get("startDate") || editing.startDate),
      endDate: String(fd.get("endDate") || editing.endDate),
      capacity: Number(fd.get("capacity") || editing.capacity),
      priceLabel: String(fd.get("priceLabel") || editing.priceLabel),
      status: String(fd.get("status") || editing.status) as ManagedRetreat["status"],
    };
    persist(retreats.map((r) => (r.id === updated.id ? updated : r)));
    setEditing(null);
  }

  function addRetreat() {
    const id = `retreat-${Date.now()}`;
    const draft: ManagedRetreat = {
      id,
      title: "New retreat",
      location: "",
      startDate: "",
      endDate: "",
      capacity: 12,
      enrolled: 0,
      status: "draft",
      cover: "/media/dahab/cover.jpeg",
      priceLabel: "",
    };
    persist([draft, ...retreats]);
    setEditing(draft);
  }

  return (
    <div>
      <PageHeader
        title="Retreats"
        description="Dates, capacity, and the women who want to join."
        actions={
          <AdminButton variant="primary" onClick={addRetreat}>
            New retreat
          </AdminButton>
        }
      />

      <div className="mb-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {withCounts.map((r) => (
          <article
            key={r.id}
            className="overflow-hidden rounded-2xl border border-[var(--border-soft)] bg-white"
          >
            <div className="relative aspect-[16/10] bg-stone">
              <Image src={r.cover} alt="" fill className="object-cover" sizes="400px" />
            </div>
            <div className="p-5">
              <div className="mb-2 flex items-start justify-between gap-2">
                <h2 className="font-display text-xl font-light text-ink">{r.title}</h2>
                <Badge
                  tone={
                    r.status === "open"
                      ? "olive"
                      : r.status === "full"
                        ? "alert"
                        : "neutral"
                  }
                >
                  {r.status.replace("_", " ")}
                </Badge>
              </div>
              <p className="text-sm text-[var(--text-soft)]">
                {r.location || "Location TBD"}
              </p>
              <p className="mt-1 text-sm text-[var(--text-soft)]">
                {r.startDate || "—"} → {r.endDate || "—"}
              </p>
              <div className="mt-4 flex items-end justify-between border-t border-[var(--border-soft)] pt-4">
                <div>
                  <p className="text-[0.65rem] tracking-[0.14em] text-[var(--text-soft)] uppercase">
                    Capacity
                  </p>
                  <p className="text-sm text-ink">
                    {r.enrolled} / {r.capacity}
                  </p>
                </div>
                <AdminButton variant="secondary" size="sm" onClick={() => setEditing(r)}>
                  Edit
                </AdminButton>
              </div>
            </div>
          </article>
        ))}
      </div>

      <Panel>
        <div className="border-b border-[var(--border-soft)] px-5 py-4">
          <h2 className="text-sm font-medium text-ink">Retreat reservations</h2>
        </div>
        {requests.length === 0 ? (
          <div className="p-5">
            <EmptyState
              title="No retreat bookings yet"
              description="Dahab, Zanzibar, and Wadi Rum requests will collect here."
            />
          </div>
        ) : (
          requests.map((r) => <RequestRow key={r.id} request={r} onOpen={setSelected} />)
        )}
      </Panel>

      <Modal open={Boolean(editing)} onClose={() => setEditing(null)} title="Edit retreat">
        {editing && (
          <form onSubmit={saveEdit} className="space-y-4">
            {(
              [
                ["title", "Title", editing.title],
                ["location", "Location", editing.location],
                ["startDate", "Start date", editing.startDate],
                ["endDate", "End date", editing.endDate],
                ["capacity", "Capacity", String(editing.capacity)],
                ["priceLabel", "Price label", editing.priceLabel],
              ] as const
            ).map(([name, label, value]) => (
              <label key={name} className="block">
                <span className="mb-1 block text-xs text-[var(--text-soft)]">{label}</span>
                <input
                  name={name}
                  defaultValue={value}
                  className="h-10 w-full rounded-xl border border-[var(--border-soft)] bg-white px-3 text-sm outline-none focus:border-olive/40"
                />
              </label>
            ))}
            <label className="block">
              <span className="mb-1 block text-xs text-[var(--text-soft)]">Status</span>
              <select
                name="status"
                defaultValue={editing.status}
                className="h-10 w-full rounded-xl border border-[var(--border-soft)] bg-white px-3 text-sm outline-none"
              >
                {["draft", "open", "full", "completed", "coming_soon"].map((s) => (
                  <option key={s} value={s}>
                    {s.replace("_", " ")}
                  </option>
                ))}
              </select>
            </label>
            <div className="flex justify-end gap-2 pt-2">
              <AdminButton variant="ghost" type="button" onClick={() => setEditing(null)}>
                Cancel
              </AdminButton>
              <AdminButton variant="primary" type="submit">
                Save
              </AdminButton>
            </div>
          </form>
        )}
      </Modal>

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
