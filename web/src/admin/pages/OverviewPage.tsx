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
    if (stats.yogaPending > 0 || stats.eventPending > 0) {
      const n = stats.yogaPending + stats.eventPending;
      list.push({
        id: "cls",
        title: `${n} class / event booking${n > 1 ? "s" : ""} pending`,
        detail: "Haifa sessions and day gatherings.",
        href: "/admin/events",
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
      setSelected((s) =>
        s?.id === r.id
          ? { ...s, status: s.status === "completed" ? "pending" : "completed" }
          : s,
      );
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
        description="Statistics and what needs your attention — across retreats, classes, and medical forms."
      />

      {error && (
        <div className="mb-6 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800">
          {error}
        </div>
      )}

      <div className="mb-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatTile label="New this week" value={stats.newThisWeek} hint="Last 7 days" tone="olive" />
        <StatTile label="Pending review" value={stats.pending} hint="All channels" tone="alert" />
        <StatTile label="Reviewed" value={stats.completed} hint="Marked complete" />
        <StatTile label="Total submissions" value={stats.total} hint="Lifetime" />
      </div>

      <div className="mb-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <Link href="/admin/retreats" className="block transition hover:opacity-90">
          <StatTile
            label="Retreats"
            value={stats.retreatTotal}
            hint={`${stats.retreatPending} pending`}
            tone={stats.retreatPending ? "alert" : "default"}
          />
        </Link>
        <Link href="/admin/events" className="block transition hover:opacity-90">
          <StatTile
            label="Classes & events"
            value={stats.yogaTotal + stats.eventTotal}
            hint={`${stats.yogaPending + stats.eventPending} pending`}
            tone={stats.yogaPending + stats.eventPending ? "alert" : "default"}
          />
        </Link>
        <Link href="/admin/forms" className="block transition hover:opacity-90">
          <StatTile
            label="Medical forms"
            value={stats.medicalTotal}
            hint={`${stats.medicalPending} awaiting review`}
            tone={stats.medicalPending ? "alert" : "default"}
          />
        </Link>
        <Link href="/admin/students" className="block transition hover:opacity-90">
          <StatTile label="Community" value={stats.total} hint="Unique + repeat registrations" tone="olive" />
        </Link>
      </div>

      <div className="mb-8 grid gap-6 lg:grid-cols-5">
        <Panel className="lg:col-span-3 overflow-hidden">
          <div className="border-b border-[var(--border-soft)] px-5 py-4">
            <h2 className="text-sm font-medium text-ink">Activity · last 7 days</h2>
            <p className="mt-0.5 text-xs text-[var(--text-soft)]">New registrations per day</p>
          </div>
          <div className="flex h-44 items-end gap-2 px-5 py-5 sm:gap-3">
            {stats.trend.map((t) => {
              const h = Math.max(8, Math.round((t.count / stats.trendMax) * 100));
              return (
                <div key={t.day} className="flex min-w-0 flex-1 flex-col items-center gap-2">
                  <span className="text-[0.65rem] tabular-nums text-[var(--text-soft)]">
                    {t.count || ""}
                  </span>
                  <div className="flex w-full flex-1 items-end justify-center">
                    <div
                      className="w-full max-w-[2.25rem] rounded-t-md bg-olive/75 transition-all duration-500"
                      style={{ height: `${h}%` }}
                      title={`${t.label}: ${t.count}`}
                    />
                  </div>
                  <span className="text-[0.65rem] text-[var(--text-soft)]">{t.label}</span>
                </div>
              );
            })}
          </div>
        </Panel>

        <Panel className="lg:col-span-2 overflow-hidden">
          <div className="border-b border-[var(--border-soft)] px-5 py-4">
            <h2 className="text-sm font-medium text-ink">By type</h2>
            <p className="mt-0.5 text-xs text-[var(--text-soft)]">Share of all submissions</p>
          </div>
          {stats.bySource.length === 0 ? (
            <div className="px-5 py-8">
              <EmptyState title="No data yet" description="Breakdowns appear once forms arrive." />
            </div>
          ) : (
            <ul className="max-h-52 divide-y divide-[var(--border-soft)] overflow-y-auto">
              {stats.bySource.slice(0, 8).map((s) => {
                const pct = stats.total ? Math.round((s.total / stats.total) * 100) : 0;
                return (
                  <li key={s.source} className="px-5 py-3">
                    <div className="mb-1.5 flex items-center justify-between gap-2">
                      <p className="truncate text-sm text-ink">{s.label}</p>
                      <p className="shrink-0 text-xs tabular-nums text-[var(--text-soft)]">
                        {s.total}
                        {s.pending > 0 ? ` · ${s.pending} pending` : ""}
                      </p>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-black/[0.05]">
                      <div
                        className="h-full rounded-full bg-olive/65"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </Panel>
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
                    <Badge tone={r.status === "open" ? "olive" : "neutral"}>
                      {r.status.replace("_", " ")}
                    </Badge>
                  </div>
                </li>
              ))}
            {events.map((e) => (
              <li
                key={e.id}
                className="flex gap-3 border-b border-[var(--border-soft)] px-4 py-3 last:border-0"
              >
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
          <span className="text-xs text-[var(--text-soft)]">
            {stats.medicalTotal} medical · {stats.retreatTotal} retreat ·{" "}
            {stats.yogaTotal + stats.eventTotal} classes
          </span>
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
