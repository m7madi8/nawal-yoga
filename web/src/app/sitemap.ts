import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://nawalomar.com";
  const now = new Date();
  return [
    { url: base, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/practice`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/events`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/events/sound-healing`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/events/ice-bath`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/events/ice-bath-experience`, lastModified: now, changeFrequency: "monthly", priority: 0.65 },
    { url: `${base}/events/nature-chocolate`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/retreats`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/retreats/dahab`, lastModified: now, changeFrequency: "monthly", priority: 0.75 },
    { url: `${base}/register/ice-bath`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/register/mountain-voice`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
  ];
}
