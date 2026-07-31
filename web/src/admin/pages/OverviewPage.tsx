"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAdminData } from "@/admin/components/shell/AdminShell";
import { PageHeader, Panel, StatTile } from "@/admin/components/ui/PageChrome";
import { EmptyState } from "@/admin/components/ui/EmptyState";
import { Badge } from "@/admin/components/ui/Badge";
import { RequestRow } from "@/admin/components/requests/RequestRow";
import { RequestDetailModal } from "@/admin/components/requests/RequestDetailModal";
import { MEDICAL_SOURCES, RETREAT_SOURCES } from "@/admin/lib/labels";
import { loadRetreats, loadEvents } from "@/admin/lib/catalog";
import type { RetreatRequest } from "@/admin/lib/types";

export function OverviewPage() {
  const { rows, stats, loading, error, setStatus, remove } = useAdminData();
  const [selected, setSelected] = useState<RetreatRequest | null>(null);
  const [busy, setBusy] = useState(false);
  const retreats = useMemo(() => loadRetreats(), []);
  const events = useMemo(() => loadEvents().slice(0, 3), []);

  const recent = rows.slice(0, 8);
  const alerts = useMemo(() => {
    const list: { id: string; title: string; detail: string; href: string }[] = [];
    if (stats.medicalPending > 0) {
      list.push({
        id: "med",
        title: `${stats.medicalPending} medical form${stats.medicalPending > 1 ? "s" : ""} awaiting review`,
        detail: "Health disclosures need a quiet, careful look.",
        href: "/admin/forms",
      });
    }
    if (stats.retreatPending > 0) {
      list.push({
        id: "ret",
        title: `${stats.retreatPending} retreat reservation${stats.retreatPending > 1 ? "s" : ""} pending`,
        detail: "Confirm capacity and reply on WhatsApp.",
        href: "/admin/retreats",
      });
    }
    const openRetreat = retreats.find((r) => r.status === "open");
    if (openRetreat) {
      list.push({
        id: "up",
        title: `${openRetreat.title} is open`,
        detail: `${openRetreat.startDate} · ${openRetreat.location}`,
        href: "/admin/retreats",
      });
    }
    return list;
  }, [stats, retreats]);

  async function toggle(r: RetreatRequest) {
    setBusy(true);
    try {
      await setStatus(r.id, r.status === "completed" ? "pending" : "completed");
      setSelected((s) => (s?.id === r.id ? { ...s, status: s.status === "completed" ? "pending" : "completed" } : s));
    } finally {
      setBusy(false);
    }
  }

  async function del(r: RetreatRequest) {
    setBusy(true);
    try {
      await remove(r.id);
      setSelected(null);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      <PageHeader
        title="Good morning"
        description="A calm view of what needs your attention today."
      />

      {error && (
        <div className="mb-6 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800">
          {error}
        </div>
      )}

      <div className="mb-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatTile label="New this week" value={stats.newThisWeek} hint="All registrations" tone="olive" />
        <StatTile label="Pending review" value={stats.pending} hint="Across every channel" tone="alert" />
        <StatTile label="Medical forms" value={stats.medicalPending} hint="Privacy-sensitive" />
        <StatTile label="Community size" value={stats.total} hint="Total submissions" />
      </div>

      <div className="mb-8 grid gap-6 lg:grid-cols-5">
        <Panel className="lg:col-span-3">
          <div className="flex items-center justify-between border-b border-[var(--border-soft)] px-5 py-4">
            <h2 className="text-sm font-medium text-ink">Needs attention</h2>
            <Link href="/admin/forms" className="text-xs text-olive">
              Open forms
            </Link>
          </div>
          {alerts.length === 0 ? (
            <div className="px-5 py-10">
              <EmptyState
                title="All clear"
                description="No urgent items. Enjoy the quiet — or refresh if you're expecting new registrations."
              />
            </div>
          ) : (
            <ul>
              {alerts.map((a) => (
                <li key={a.id} className="border-b border-[var(--border-soft)] last:border-0">
                  <Link
                    href={a.href}
                    className="block px-5 py-4 transition hover:bg-black/[0.02]"
                  >
                    <p className="text-sm font-medium text-ink">{a.title}</p>
                    <p className="mt-0.5 text-xs text-[var(--text-soft)]">{a.detail}</p>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </Panel>

        <Panel className="lg:col-span-2">
          <div className="border-b border-[var(--border-soft)] px-5 py-4">
            <h2 className="text-sm font-medium text-ink">Upcoming experiences</h2>
          </div>
          <ul>
            {retreats
              .filter((r) => r.status === "open" || r.status === "coming_soon")
              .slice(0, 2)
              .map((r) => (
                <li key={r.id} className="flex gap-3 border-b border-[var(--border-soft)] px-4 py-3">
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-stone">
                    <Image src={r.cover} alt="" fill className="object-cover" sizes="56px" />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">{r.title}</p>
                    <p className="text-xs text-[var(--text-soft)]">
                      {r.startDate} · {r.location}
                    </p>
                    <Badge tone={r.status === "open" ? "olive" : "neutral"}>{r.status.replace("_", " ")}</Badge>
                  </div>
                </li>
              ))}
            {events.map((e) => (
              <li key={e.id} className="flex gap-3 border-b border-[var(--border-soft)] px-4 py-3 last:border-0">
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-stone">
                  <Image src={e.cover} alt="" fill className="object-cover" sizes="56px" />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{e.title}</p>
                  <p className="text-xs text-[var(--text-soft)]">
                    {e.date} · {e.place}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </Panel>
      </div>

      <Panel>
        <div className="flex items-center justify-between border-b border-[var(--border-soft)] px-5 py-4">
          <h2 className="text-sm font-medium text-ink">Recent activity</h2>
          <div className="flex gap-3 text-xs">
            <span className="text-[var(--text-soft)]">
              {rows.filter((r) => MEDICAL_SOURCES.includes(r.source)).length} medical ·{" "}
              {rows.filter((r) => RETREAT_SOURCES.includes(r.source)).length} retreat
            </span>
          </div>
        </div>
        {loading ? (
          <p className="px-5 py-10 text-sm text-[var(--text-soft)]">Loading registrations…</p>
        ) : recent.length === 0 ? (
          <div className="p-5">
            <EmptyState
              title="No registrations yet"
              description="When someone books a class, retreat, or submits a health form, it will appear here."
            />
          </div>
        ) : (
          <div>
            {recent.map((r) => (
              <RequestRow key={r.id} request={r} onOpen={setSelected} />
            ))}
            <div className="border-t border-[var(--border-soft)] px-5 py-4">
              <Link href="/admin/students" className="text-sm text-olive">
                View community →
              </Link>
            </div>
          </div>
        )}
      </Panel>

      <RequestDetailModal
        request={selected}
        onClose={() => setSelected(null)}
        onToggleStatus={toggle}
        onDelete={del}
        busy={busy}
      />
    </div>
  );
}
