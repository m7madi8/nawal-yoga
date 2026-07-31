"use client";

import { AdminAuthProvider } from "@/admin/hooks/useAdminAuth";

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminAuthProvider>
      <div className="admin-root min-h-svh bg-[#fafaf8] font-sans antialiased">{children}</div>
    </AdminAuthProvider>
  );
}
