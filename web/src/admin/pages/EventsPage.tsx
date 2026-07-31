"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { PageHeader, Panel, FilterChips } from "@/admin/components/ui/PageChrome";
import { Badge } from "@/admin/components/ui/Badge";
import { AdminButton } from "@/admin/components/ui/AdminButton";
import { EmptyState } from "@/admin/components/ui/EmptyState";
import { Modal } from "@/admin/components/ui/Modal";
import { useAdminData } from "@/admin/components/shell/AdminShell";
import { RequestRow } from "@/admin/components/requests/RequestRow";
import { RequestDetailModal } from "@/admin/components/requests/RequestDetailModal";
import { loadEvents, saveEvents } from "@/admin/lib/catalog";
import { YOGA_SOURCES } from "@/admin/lib/labels";
import type { ManagedEvent, RetreatRequest } from "@/admin/lib/types";

export function EventsPage() {
  const { rows, setStatus, remove } = useAdminData();
  const [events, setEvents] = useState<ManagedEvent[]>(() => loadEvents());
  const [filter, setFilter] = useState("all");
  const [editing, setEditing] = useState<ManagedEvent | null>(null);
  const [selected, setSelected] = useState<RetreatRequest | null>(null);
  const [busy, setBusy] = useState(false);

  const classRequests = useMemo(
    () => rows.filter((r) => YOGA_SOURCES.includes(r.source)),
    [rows],
  );

  const visible = useMemo(() => {
    if (filter === "all") return events;
    return events.filter((e) => e.type === filter);
  }, [events, filter]);

  function persist(next: ManagedEvent[]) {
    setEvents(next);
    saveEvents(next);
  }

  function saveEdit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!editing) return;
    const fd = new FormData(e.currentTarget);
    const updated: ManagedEvent = {
      ...editing,
      title: String(fd.get("title") || editing.title),
      date: String(fd.get("date") || editing.date),
      place: String(fd.get("place") || editing.place),
      capacity: Number(fd.get("capacity") || editing.capacity),
      type: String(fd.get("type") || editing.type) as ManagedEvent["type"],
      status: String(fd.get("status") || editing.status) as ManagedEvent["status"],
    };
    persist(events.map((x) => (x.id === updated.id ? updated : x)));
    setEditing(null);
  }

  return (
    <div>
      <PageHeader
        title="Events & sessions"
        description="Day gatherings, workshops, and the weekly Haifa rhythm."
        actions={
          <AdminButton
            variant="primary"
            onClick={() => {
              const draft: ManagedEvent = {
                id: `event-${Date.now()}`,
                title: "New gathering",
                type: "day",
                date: "",
                place: "Haifa",
                capacity: 20,
                registered: 0,
                status: "draft",
                cover: "/media/events/sound-healing-01.jpg",
              };
              persist([draft, ...events]);
              setEditing(draft);
            }}
          >
            New event
          </AdminButton>
        }
      />

      <div className="mb-5">
        <FilterChips
          value={filter}
          onChange={setFilter}
          options={[
            { id: "all", label: "All" },
            { id: "day", label: "Day events" },
            { id: "session", label: "Yoga sessions" },
            { id: "workshop", label: "Workshops" },
            { id: "conference", label: "Conferences" },
          ]}
        />
      </div>

      <div className="mb-8 grid gap-3">
        {visible.map((e) => (
          <article
            key={e.id}
            className="grid grid-cols-[5.5rem_1fr_auto] items-center gap-4 rounded-2xl border border-[var(--border-soft)] bg-white p-3 sm:grid-cols-[7rem_1fr_auto] sm:gap-5 sm:p-4"
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-stone">
              <Image src={e.cover} alt="" fill className="object-cover" sizes="112px" />
            </div>
            <div className="min-w-0">
              <div className="mb-1 flex flex-wrap items-center gap-2">
                <h2 className="truncate font-display text-lg font-light text-ink sm:text-xl">
                  {e.title}
                </h2>
                <Badge tone={e.status === "sold_out" ? "alert" : e.status === "open" ? "olive" : "neutral"}>
                  {e.status.replace("_", " ")}
                </Badge>
              </div>
              <p className="text-sm text-[var(--text-soft)]">
                {e.date} · {e.place}
              </p>
              <p className="mt-1 text-xs text-[var(--text-soft)] capitalize">
                {e.type} · capacity {e.capacity}
              </p>
            </div>
            <AdminButton variant="secondary" size="sm" onClick={() => setEditing(e)}>
              Edit
            </AdminButton>
          </article>
        ))}
        {visible.length === 0 && (
          <EmptyState title="Nothing here" description="Try another filter or create a new event." />
        )}
      </div>

      <Panel>
        <div className="border-b border-[var(--border-soft)] px-5 py-4">
          <h2 className="text-sm font-medium text-ink">Class registrations</h2>
        </div>
        {classRequests.length === 0 ? (
          <div className="p-5">
            <EmptyState
              title="No class requests"
              description="Haifa yoga registrations will appear in this list."
            />
          </div>
        ) : (
          classRequests.map((r) => <RequestRow key={r.id} request={r} onOpen={setSelected} />)
        )}
      </Panel>

      <Modal open={Boolean(editing)} onClose={() => setEditing(null)} title="Edit event">
        {editing && (
          <form onSubmit={saveEdit} className="space-y-4">
            {(
              [
                ["title", "Title", editing.title],
                ["date", "Date", editing.date],
                ["place", "Place", editing.place],
                ["capacity", "Capacity", String(editing.capacity)],
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
              <span className="mb-1 block text-xs text-[var(--text-soft)]">Type</span>
              <select
                name="type"
                defaultValue={editing.type}
                className="h-10 w-full rounded-xl border border-[var(--border-soft)] bg-white px-3 text-sm"
              >
                {["day", "session", "workshop", "conference"].map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="mb-1 block text-xs text-[var(--text-soft)]">Status</span>
              <select
                name="status"
                defaultValue={editing.status}
                className="h-10 w-full rounded-xl border border-[var(--border-soft)] bg-white px-3 text-sm"
              >
                {["draft", "open", "sold_out", "completed"].map((s) => (
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
