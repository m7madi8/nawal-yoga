import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { eventSlugs, eventsContent, type EventSlug } from "@/lib/content/events";
import { dictionaries } from "@/lib/i18n/dictionaries";
import { EventDetail } from "@/components/experience/EventDetail";
import { IceBathPage } from "@/components/ice-bath/IceBathPage";
import { NatureChocolatePage } from "@/components/nature-chocolate/NatureChocolatePage";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return eventSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  if (slug === "ice-bath") {
    return {
      title: "Nawal Omar",
      description: dictionaries.en.events_ib_meta_desc,
    };
  }
  if (slug === "nature-chocolate") {
    return {
      title: "Nawal Omar",
      description: dictionaries.en.events_nc_meta_desc,
    };
  }
  const event = eventsContent[slug as EventSlug];
  if (!event) return { title: "Nawal Omar" };
  const lead = dictionaries.en[event.leadKey as keyof typeof dictionaries.en] as string;
  return {
    title: "Nawal Omar",
    description: lead,
  };
}

export default async function EventPage({ params }: Props) {
  const { slug } = await params;
  if (!eventSlugs.includes(slug as EventSlug)) notFound();
  if (slug === "ice-bath") return <IceBathPage />;
  if (slug === "nature-chocolate") return <NatureChocolatePage />;
  return <EventDetail slug={slug as EventSlug} />;
}
