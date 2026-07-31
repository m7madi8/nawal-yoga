"use client";

import { PageHeader, Panel } from "@/admin/components/ui/PageChrome";
import { AdminButton } from "@/admin/components/ui/AdminButton";
import { useAdminAuth } from "@/admin/hooks/useAdminAuth";
import { useRouter } from "next/navigation";

export function SettingsPage() {
  const { username, logout } = useAdminAuth();
  const router = useRouter();

  return (
    <div>
      <PageHeader
        title="Settings"
        description="Workspace preferences for Nawal’s operations panel."
      />

      <div className="grid gap-4 lg:grid-cols-2">
        <Panel className="p-5">
          <h2 className="mb-1 text-sm font-medium text-ink">Account</h2>
          <p className="mb-4 text-sm text-[var(--text-soft)]">
            Signed in as <span className="text-ink">{username}</span>
          </p>
          <AdminButton
            variant="secondary"
            onClick={() => {
              logout();
              router.replace("/admin/login");
            }}
          >
            Sign out
          </AdminButton>
        </Panel>

        <Panel className="p-5">
          <h2 className="mb-1 text-sm font-medium text-ink">Data</h2>
          <p className="mb-4 text-sm text-[var(--text-soft)]">
            Registrations and medical forms sync from Supabase. Retreat / event / content drafts
            save in this browser until a full CMS is connected.
          </p>
          <p className="text-xs text-[var(--text-soft)]">
            Session key: yogaAdminSession · Compatible with the legacy admin login.
          </p>
        </Panel>

        <Panel className="p-5 lg:col-span-2">
          <h2 className="mb-1 text-sm font-medium text-ink">Daily workflow</h2>
          <ol className="mt-3 list-decimal space-y-2 ps-5 text-sm text-[var(--text-soft)]">
            <li>Open Overview — clear medical alerts first.</li>
            <li>Review Medical forms privately, mark reviewed, message if needed.</li>
            <li>Confirm retreat / class capacity and reply on WhatsApp.</li>
            <li>Add a private community note when something matters later.</li>
            <li>Keep Content drafts in sync with what is live on the site.</li>
          </ol>
        </Panel>
      </div>
    </div>
  );
}
