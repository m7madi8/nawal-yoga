export type EventSlug = "sound-healing" | "ice-bath" | "nature-chocolate";

export type EventContent = {
  slug: EventSlug;
  soldOut: boolean;
  hero: string;
  gallery: string[];
  dateKey: string;
  placeKey: string;
  titleKey: string;
  leadKey: string;
  feelKey: string;
  timeline: { timeKey: string; labelKey: string }[];
  offers: { labelKey: string; priceKey: string }[];
  ctaPrefillKey: string;
  healthFormHref?: string;
};

export const eventsContent: Record<EventSlug, EventContent> = {
  "sound-healing": {
    slug: "sound-healing",
    soldOut: false,
    hero: "/media/events/sound-healing-01.jpg",
    gallery: [
      "/media/events/sound-healing-01.jpg",
      "/media/events/sound-healing-02.jpg",
      "/media/events/sound-healing-03.jpg",
      "/media/events/sound-healing-04.jpg",
      "/media/events/sound-healing-05.jpg",
    ],
    dateKey: "ev_sh_date",
    placeKey: "ev_sh_place",
    titleKey: "ev_sh_title",
    leadKey: "ev_sh_lead",
    feelKey: "ev_sh_feel",
    timeline: [
      { timeKey: "ev_sh_t1", labelKey: "ev_sh_l1" },
      { timeKey: "ev_sh_t2", labelKey: "ev_sh_l2" },
      { timeKey: "ev_sh_t3", labelKey: "ev_sh_l3" },
    ],
    offers: [
      { labelKey: "ev_member", priceKey: "ev_sh_price_m" },
      { labelKey: "ev_guest", priceKey: "ev_sh_price_g" },
    ],
    ctaPrefillKey: "ev_sh_wa",
  },
  "ice-bath": {
    slug: "ice-bath",
    soldOut: false,
    hero: "/media/events/ice-bath/hero.jpg",
    gallery: [
      "/media/events/ice-bath/hero.jpg",
      "/media/events/ice-bath/yoga-breath.jpg",
      "/media/events/ice-bath/sauna.jpg",
      "/media/events/ice-bath/ice-bath.jpg",
      "/media/events/ice-bath/lunch.jpg",
      "/media/events/ice-bath/closing-moment.jpg",
    ],
    dateKey: "ev_ib_date",
    placeKey: "ev_ib_place",
    titleKey: "ev_ib_title",
    leadKey: "ev_ib_lead",
    feelKey: "ev_ib_feel",
    timeline: [
      { timeKey: "ev_ib_t1", labelKey: "ev_ib_l1" },
      { timeKey: "ev_ib_t2", labelKey: "ev_ib_l2" },
      { timeKey: "ev_ib_t3", labelKey: "ev_ib_l3" },
      { timeKey: "ev_ib_t4", labelKey: "ev_ib_l4" },
    ],
    offers: [
      { labelKey: "ev_member", priceKey: "ev_ib_price_m" },
      { labelKey: "ev_guest", priceKey: "ev_ib_price_g" },
    ],
    ctaPrefillKey: "ev_ib_wa",
    healthFormHref: "/register/ice-bath",
  },
  "nature-chocolate": {
    slug: "nature-chocolate",
    soldOut: true,
    hero: "/media/events/nature-chocolate-hero.jpg",
    gallery: [
      "/media/events/nature-chocolate-hero.jpg",
      "/media/events/nature-chocolate-dome.jpg",
      "/media/events/nature-chocolate-terrace.jpg",
      "/media/events/nature-chocolate-workshop-01.jpg",
      "/media/events/nature-chocolate-workshop-02.jpg",
    ],
    dateKey: "ev_nc_date",
    placeKey: "ev_nc_place",
    titleKey: "ev_nc_title",
    leadKey: "ev_nc_lead",
    feelKey: "ev_nc_feel",
    timeline: [
      { timeKey: "ev_nc_t1", labelKey: "ev_nc_l1" },
      { timeKey: "ev_nc_t2", labelKey: "ev_nc_l2" },
      { timeKey: "ev_nc_t3", labelKey: "ev_nc_l3" },
    ],
    offers: [
      { labelKey: "ev_member", priceKey: "ev_nc_price_m" },
      { labelKey: "ev_guest", priceKey: "ev_nc_price_g" },
    ],
    ctaPrefillKey: "ev_nc_wa",
  },
};

export const eventSlugs = Object.keys(eventsContent) as EventSlug[];
