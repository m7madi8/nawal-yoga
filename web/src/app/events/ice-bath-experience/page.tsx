import type { Metadata } from "next";
import { dictionaries } from "@/lib/i18n/dictionaries";
import { IceBathExperiencePage } from "@/components/ice-bath/IceBathExperiencePage";

export const metadata: Metadata = {
  title: "Nawal Omar",
  description: dictionaries.en.ibx_meta_desc,
};

export default function Page() {
  return <IceBathExperiencePage />;
}
