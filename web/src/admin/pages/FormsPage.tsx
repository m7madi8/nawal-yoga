"use client";

import { PageHeader } from "@/admin/components/ui/PageChrome";
import { RequestsBoard } from "@/admin/components/requests/RequestsBoard";
import { MEDICAL_SOURCES } from "@/admin/lib/labels";

export function FormsPage() {
  return (
    <div>
      <PageHeader
        title="Medical forms"
        description="Handle health disclosures with care. Filter by form type and review status — open one record at a time."
      />

      <div className="mb-6 rounded-2xl border border-amber-200/70 bg-amber-50/40 px-5 py-4 text-sm text-amber-950/80">
        Private by design — health answers are only visible inside the detail view. Prefer reviewing alone.
      </div>

      <RequestsBoard
        title="Health submissions"
        sources={[...MEDICAL_SOURCES]}
        sourceFilters={[
          {
            id: "mountain",
            label: "Mountain Voice",
            sources: ["mountain-voice", "mountain-voice-registration"],
          },
          { id: "ice", label: "Ice Bath health", sources: ["ice-bath-health"] },
        ]}
        emptyTitle="No forms in this view"
        emptyDescription="When a health form is submitted, it will wait here for your review."
      />
    </div>
  );
}
