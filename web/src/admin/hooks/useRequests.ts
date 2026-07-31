"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { deleteRequest, fetchAllRequests, updateRequestStatus } from "@/admin/lib/api";
import type { RetreatRequest, RequestStatus, Student } from "@/admin/lib/types";
import {
  EVENT_BOOKING_SOURCES,
  MEDICAL_SOURCES,
  RETREAT_SOURCES,
  YOGA_SOURCES,
  phoneDigits,
  sourceLabel,
} from "@/admin/lib/labels";
import { loadStudentNotes } from "@/admin/lib/catalog";

function dayKey(d: Date) {
  return d.toISOString().slice(0, 10);
}

export function useRequests() {
  const [rows, setRows] = useState<RetreatRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const load = useCallback(async (soft = false) => {
    if (soft) setRefreshing(true);
    else setLoading(true);
    setError(null);
    try {
      const data = await fetchAllRequests();
      setRows(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not load data");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const setStatus = useCallback(async (id: string, status: RequestStatus) => {
    await updateRequestStatus(id, status);
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
  }, []);

  const remove = useCallback(async (id: string) => {
    await deleteRequest(id);
    setRows((prev) => prev.filter((r) => r.id !== id));
  }, []);

  const stats = useMemo(() => {
    const pending = rows.filter((r) => r.status === "pending").length;
    const inList = (list: readonly string[], s: string) => list.includes(s);
    const medical = rows.filter((r) => inList(MEDICAL_SOURCES, r.source));
    const retreats = rows.filter((r) => inList(RETREAT_SOURCES, r.source));
    const yoga = rows.filter((r) => inList(YOGA_SOURCES, r.source));
    const events = rows.filter((r) => inList(EVENT_BOOKING_SOURCES, r.source));

    const medicalPending = medical.filter((r) => r.status === "pending").length;
    const retreatPending = retreats.filter((r) => r.status === "pending").length;
    const yogaPending = yoga.filter((r) => r.status === "pending").length;
    const eventPending = events.filter((r) => r.status === "pending").length;

    const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
    const newThisWeek = rows.filter(
      (r) => new Date(r.submittedAt || r.createdAt).getTime() > weekAgo,
    ).length;

    const bySource: { source: string; label: string; total: number; pending: number }[] = [];
    const sourceMap = new Map<string, { total: number; pending: number }>();
    for (const r of rows) {
      const cur = sourceMap.get(r.source) || { total: 0, pending: 0 };
      cur.total += 1;
      if (r.status === "pending") cur.pending += 1;
      sourceMap.set(r.source, cur);
    }
    for (const [source, v] of sourceMap) {
      bySource.push({
        source,
        label: sourceLabel(source),
        total: v.total,
        pending: v.pending,
      });
    }
    bySource.sort((a, b) => b.total - a.total);

    const trend: { day: string; label: string; count: number }[] = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setHours(12, 0, 0, 0);
      d.setDate(d.getDate() - i);
      const key = dayKey(d);
      const count = rows.filter((r) => {
        const t = new Date(r.submittedAt || r.createdAt);
        return dayKey(t) === key;
      }).length;
      trend.push({
        day: key,
        label: new Intl.DateTimeFormat("en", { weekday: "short" }).format(d),
        count,
      });
    }

    return {
      total: rows.length,
      pending,
      completed: rows.length - pending,
      medicalTotal: medical.length,
      medicalPending,
      retreatTotal: retreats.length,
      retreatPending,
      yogaTotal: yoga.length,
      yogaPending,
      eventTotal: events.length,
      eventPending,
      newThisWeek,
      bySource,
      trend,
      trendMax: Math.max(1, ...trend.map((t) => t.count)),
    };
  }, [rows]);

  const students = useMemo(() => {
    const notes = typeof window !== "undefined" ? loadStudentNotes() : {};
    const map = new Map<string, Student>();
    for (const r of rows) {
      const key = phoneDigits(r.phone) || r.fullName.toLowerCase().trim();
      if (!key) continue;
      const existing = map.get(key);
      const when = r.submittedAt || r.createdAt;
      if (!existing) {
        map.set(key, {
          id: key,
          fullName: r.fullName || "Unknown",
          phone: r.phone,
          city: r.city,
          registrations: 1,
          lastSeen: when,
          sources: [r.source],
          notes: notes[key] || "",
        });
      } else {
        existing.registrations += 1;
        if (!existing.sources.includes(r.source)) existing.sources.push(r.source);
        if (new Date(when).getTime() > new Date(existing.lastSeen).getTime()) {
          existing.lastSeen = when;
          if (r.fullName) existing.fullName = r.fullName;
          if (r.city) existing.city = r.city;
        }
      }
    }
    return Array.from(map.values()).sort(
      (a, b) => new Date(b.lastSeen).getTime() - new Date(a.lastSeen).getTime(),
    );
  }, [rows]);

  return {
    rows,
    loading,
    error,
    refreshing,
    stats,
    students,
    reload: load,
    setStatus,
    remove,
  };
}
