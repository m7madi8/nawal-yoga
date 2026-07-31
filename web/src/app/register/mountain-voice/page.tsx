import type { Metadata } from "next";
import { MountainVoiceForm } from "@/components/forms/MountainVoiceForm";

export const metadata: Metadata = {
  title: "Nawal Omar",
  description: "Calm multi-step registration for Mountain Voice / Dahab retreat.",
};

export default function Page() {
  return <MountainVoiceForm />;
}
