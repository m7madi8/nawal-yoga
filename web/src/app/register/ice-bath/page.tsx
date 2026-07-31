import type { Metadata } from "next";
import { IceBathForm } from "@/components/forms/IceBathForm";

export const metadata: Metadata = {
  title: "Nawal Omar",
  description: "Ice Bath health declaration form with Nawal Omar.",
};

export default function Page() {
  return <IceBathForm />;
}
