"use client";

import { useState } from "react";
import { PageHeader, Panel, FilterChips } from "@/admin/components/ui/PageChrome";
import { Badge } from "@/admin/components/ui/Badge";
import { AdminButton } from "@/admin/components/ui/AdminButton";
import { EmptyState } from "@/admin/components/ui/EmptyState";
import { Modal } from "@/admin/components/ui/Modal";
import { loadContent, saveContent } from "@/admin/lib/catalog";
import { formatDate } from "@/admin/lib/labels";
import type { ContentPage } from "@/admin/lib/types";

export function ContentPageView() {
  const [pages, setPages] = useState<ContentPage[]>(() => loadContent());
  const [filter, setFilter] = useState("all");
  const [editing, setEditing] = useState<ContentPage | null>(null);

  const visible =
    filter === "all" ? pages : pages.filter((p) => p.status === filter || p.kind === filter);

  function persist(next: ContentPage[]) {
    setPages(next);
    saveContent(next);
  }

  function saveEdit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!editing) return;
    const fd = new FormData(e.currentTarget);
    const updated: ContentPage = {
      ...editing,
      title: String(fd.get("title") || editing.title),
      note: String(fd.get("note") || editing.note),
      status: String(fd.get("status") || editing.status) as ContentPage["status"],
      updatedAt: new Date().toISOString(),
    };
    persist(pages.map((p) => (p.id === updated.id ? updated : p)));
    setEditing(null);
  }

  return (
    <div>
      <PageHeader
        title="Content"
        description="Homepage, retreat pages, galleries, testimonials, and coming-soon experiences."
      />

      <div className="mb-5">
        <FilterChips
          value={filter}
          onChange={setFilter}
          options={[
            { id: "all", label: "All" },
            { id: "published", label: "Published" },
            { id: "draft", label: "Drafts" },
            { id: "coming_soon", label: "Coming soon" },
            { id: "testimonial", label: "Testimonials" },
          ]}
        />
      </div>

      <Panel>
        {visible.length === 0 ? (
          <div className="p-5">
            <EmptyState title="No pages" description="Nothing matches this filter." />
          </div>
        ) : (
          visible.map((p) => (
            <div
              key={p.id}
              className="flex flex-col gap-3 border-b border-[var(--border-soft)] px-5 py-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="min-w-0">
                <div className="mb-1 flex flex-wrap items-center gap-2">
                  <h2 className="text-sm font-medium text-ink">{p.title}</h2>
                  <Badge tone={p.status === "published" ? "done" : "pending"}>
                    {p.status}
                  </Badge>
                  <Badge tone="neutral">{p.kind.replace("_", " ")}</Badge>
                </div>
                <p className="text-sm text-[var(--text-soft)]">{p.note}</p>
                <p className="mt-1 text-xs text-[var(--text-soft)]">
                  Updated {formatDate(p.updatedAt)}
                </p>
              </div>
              <AdminButton variant="secondary" size="sm" onClick={() => setEditing(p)}>
                Manage
              </AdminButton>
            </div>
          ))
        )}
      </Panel>

      <Modal open={Boolean(editing)} onClose={() => setEditing(null)} title="Content item">
        {editing && (
          <form onSubmit={saveEdit} className="space-y-4">
            <label className="block">
              <span className="mb-1 block text-xs text-[var(--text-soft)]">Title</span>
              <input
                name="title"
                defaultValue={editing.title}
                className="h-10 w-full rounded-xl border border-[var(--border-soft)] bg-white px-3 text-sm outline-none focus:border-olive/40"
              />
            </label>
            <label className="block">
              <span className="mb-1 block text-xs text-[var(--text-soft)]">Internal note</span>
              <textarea
                name="note"
                defaultValue={editing.note}
                rows={3}
                className="w-full rounded-xl border border-[var(--border-soft)] bg-white px-3 py-2 text-sm outline-none focus:border-olive/40"
              />
            </label>
            <label className="block">
              <span className="mb-1 block text-xs text-[var(--text-soft)]">Status</span>
              <select
                name="status"
                defaultValue={editing.status}
                className="h-10 w-full rounded-xl border border-[var(--border-soft)] bg-white px-3 text-sm"
              >
                <option value="published">Published</option>
                <option value="draft">Draft</option>
              </select>
            </label>
            <p className="rounded-xl bg-black/[0.03] px-3 py-2 text-xs text-[var(--text-soft)]">
              Live copy still lives in the site codebase. This panel tracks publishing intent and
              editorial notes until a full CMS is connected.
            </p>
            <div className="flex justify-end gap-2">
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
    </div>
  );
}
