import type { Metadata } from "next";
import PracticeClient from "./PracticeClient";
import { dictionaries } from "@/lib/i18n/dictionaries";

export const metadata: Metadata = {
  title: "Nawal Omar",
  description: dictionaries.en.jiva_page_body,
};

export default function Page() {
  return <PracticeClient />;
}
