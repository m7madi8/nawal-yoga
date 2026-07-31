"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { deleteRequest, fetchAllRequests, updateRequestStatus } from "@/admin/lib/api";
import type { RetreatRequest, RequestStatus } from "@/admin/lib/types";
import { MEDICAL_SOURCES, RETREAT_SOURCES, YOGA_SOURCES, phoneDigits } from "@/admin/lib/labels";
import type { Student } from "@/admin/lib/types";
import { loadStudentNotes } from "@/admin/lib/catalog";

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
    const medicalPending = rows.filter(
      (r) => r.status === "pending" && MEDICAL_SOURCES.includes(r.source),
    ).length;
    const retreatPending = rows.filter(
      (r) => r.status === "pending" && RETREAT_SOURCES.includes(r.source),
    ).length;
    const yogaPending = rows.filter(
      (r) => r.status === "pending" && YOGA_SOURCES.includes(r.source),
    ).length;
    const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
    const newThisWeek = rows.filter((r) => new Date(r.submittedAt || r.createdAt).getTime() > weekAgo)
      .length;
    return {
      total: rows.length,
      pending,
      medicalPending,
      retreatPending,
      yogaPending,
      newThisWeek,
      completed: rows.length - pending,
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
