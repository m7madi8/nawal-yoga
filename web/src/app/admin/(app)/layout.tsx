"use client";

import { AdminShell } from "@/admin/components/shell/AdminShell";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <AdminShell>{children}</AdminShell>;
}
