import type { Metadata } from "next";
import { DahabPage } from "@/components/experience/DahabPage";
import { dictionaries } from "@/lib/i18n/dictionaries";

export const metadata: Metadata = {
  title: "Nawal Omar",
  description: dictionaries.en.retreat_dahab_meta_desc,
};

export default function Page() {
  return <DahabPage />;
}
