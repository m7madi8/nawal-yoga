"use client";

import { useMemo, useState } from "react";
import { PageHeader, Panel, FilterChips } from "@/admin/components/ui/PageChrome";
import { SearchInput } from "@/admin/components/ui/SearchInput";
import { Badge } from "@/admin/components/ui/Badge";
import { EmptyState } from "@/admin/components/ui/EmptyState";
import { Modal } from "@/admin/components/ui/Modal";
import { AdminButton } from "@/admin/components/ui/AdminButton";
import { useAdminData } from "@/admin/components/shell/AdminShell";
import { formatDate, sourceLabel, waHref } from "@/admin/lib/labels";
import { saveStudentNote } from "@/admin/lib/catalog";
import type { Student } from "@/admin/lib/types";

export function StudentsPage() {
  const { students, rows } = useAdminData();
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState("all");
  const [active, setActive] = useState<Student | null>(null);
  const [note, setNote] = useState("");

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    return students.filter((s) => {
      if (filter === "repeat" && s.registrations < 2) return false;
      if (filter === "new" && s.registrations !== 1) return false;
      if (!query) return true;
      return (
        s.fullName.toLowerCase().includes(query) ||
        s.phone.includes(query) ||
        s.city.toLowerCase().includes(query)
      );
    });
  }, [students, q, filter]);

  const history = useMemo(() => {
    if (!active) return [];
    return rows.filter(
      (r) =>
        r.phone.replace(/\D/g, "") === active.id ||
        r.fullName.toLowerCase().trim() === active.fullName.toLowerCase().trim(),
    );
  }, [active, rows]);

  return (
    <div>
      <PageHeader
        title="Community"
        description="Women who have practiced, registered, or shared a health form with you."
      />

      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <SearchInput
          value={q}
          onChange={setQ}
          placeholder="Search by name, phone, city…"
          className="sm:max-w-sm"
        />
        <FilterChips
          value={filter}
          onChange={setFilter}
          options={[
            { id: "all", label: `All (${students.length})` },
            { id: "new", label: "First time" },
            { id: "repeat", label: "Returning" },
          ]}
        />
      </div>

      <Panel>
        {filtered.length === 0 ? (
          <div className="p-5">
            <EmptyState
              title="No one matches"
              description="Try a different search, or wait for the next registration."
            />
          </div>
        ) : (
          filtered.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => {
                setActive(s);
                setNote(s.notes || "");
              }}
              className="grid w-full grid-cols-[1fr_auto] gap-3 border-b border-[var(--border-soft)] px-4 py-3.5 text-start transition hover:bg-black/[0.02] sm:grid-cols-[1.2fr_1fr_auto_auto]"
            >
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-ink">{s.fullName}</p>
                <p className="truncate text-xs text-[var(--text-soft)]">{s.phone || "—"}</p>
              </div>
              <p className="hidden truncate text-sm text-[var(--text-soft)] sm:block">
                {s.city || "—"}
              </p>
              <Badge tone="olive">{s.registrations}×</Badge>
              <p className="hidden text-xs text-[var(--text-soft)] sm:block">
                {formatDate(s.lastSeen)}
              </p>
            </button>
          ))
        )}
      </Panel>

      <Modal
        open={Boolean(active)}
        onClose={() => setActive(null)}
        title={active?.fullName || "Student"}
        wide
      >
        {active && (
          <div className="space-y-6">
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-xl bg-black/[0.02] p-3">
                <p className="text-[0.65rem] tracking-[0.14em] text-[var(--text-soft)] uppercase">
                  Phone
                </p>
                <p className="mt-1 text-sm">{active.phone || "—"}</p>
              </div>
              <div className="rounded-xl bg-black/[0.02] p-3">
                <p className="text-[0.65rem] tracking-[0.14em] text-[var(--text-soft)] uppercase">
                  City
                </p>
                <p className="mt-1 text-sm">{active.city || "—"}</p>
              </div>
              <div className="rounded-xl bg-black/[0.02] p-3">
                <p className="text-[0.65rem] tracking-[0.14em] text-[var(--text-soft)] uppercase">
                  Registrations
                </p>
                <p className="mt-1 text-sm">{active.registrations}</p>
              </div>
            </div>

            <div>
              <p className="mb-2 text-xs text-[var(--text-soft)]">Experiences</p>
              <div className="flex flex-wrap gap-1.5">
                {active.sources.map((s) => (
                  <Badge key={s} tone="brass">
                    {sourceLabel(s)}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <p className="mb-2 text-sm font-medium text-ink">Private notes</p>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={3}
                placeholder="Preferences, injuries to remember, soft reminders…"
                className="w-full rounded-xl border border-[var(--border-soft)] bg-white px-3 py-2 text-sm outline-none focus:border-olive/40"
              />
              <div className="mt-2 flex flex-wrap gap-2">
                <AdminButton
                  variant="primary"
                  size="sm"
                  onClick={() => {
                    saveStudentNote(active.id, note);
                    setActive({ ...active, notes: note });
                  }}
                >
                  Save note
                </AdminButton>
                {active.phone && (
                  <AdminButton
                    variant="secondary"
                    size="sm"
                    onClick={() =>
                      window.open(waHref(active.phone), "_blank", "noopener,noreferrer")
                    }
                  >
                    WhatsApp
                  </AdminButton>
                )}
              </div>
            </div>

            <div>
              <p className="mb-2 text-sm font-medium text-ink">History</p>
              <ul className="divide-y divide-[var(--border-soft)] rounded-xl border border-[var(--border-soft)]">
                {history.map((h) => (
                  <li key={h.id} className="flex items-center justify-between gap-3 px-4 py-3">
                    <div>
                      <p className="text-sm text-ink">{sourceLabel(h.source)}</p>
                      <p className="text-xs text-[var(--text-soft)]">
                        {formatDate(h.submittedAt || h.createdAt)}
                      </p>
                    </div>
                    <Badge tone={h.status === "completed" ? "done" : "pending"}>
                      {h.status}
                    </Badge>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
