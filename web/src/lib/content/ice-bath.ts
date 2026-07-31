import type { DictKey } from "@/lib/i18n/dictionaries";

export const WAZE_HOFIT =
  "https://waze.com/ul?q=%D7%91%D7%A8%D7%99%D7%9B%D7%AA%20%D7%97%D7%95%D7%A4%D7%99%D7%AA%D7%A7%D7%99%D7%9F";

export const iceBathProgram = [
  {
    role: "arrival",
    image: "/media/events/ice-bath/arrival.jpg",
    alt: "events_ib_img_arrival_alt" as DictKey,
    time: "events_ib_p1_time" as DictKey,
    title: "events_ib_p1_title" as DictKey,
    body: "events_ib_p1_body" as DictKey,
    bullets: [] as DictKey[],
  },
  {
    role: "breath",
    image: "/media/events/ice-bath/yoga-breath.jpg",
    alt: "events_ib_img_yoga_alt" as DictKey,
    time: "events_ib_p2_time" as DictKey,
    title: "events_ib_p2_title" as DictKey,
    body: "events_ib_p2_body" as DictKey,
    bullets: ["events_ib_p2_b1", "events_ib_p2_b2"] as DictKey[],
  },
  {
    role: "ice",
    image: "/media/events/ice-bath/ice-bath.jpg",
    alt: "events_ib_img_ice_alt" as DictKey,
    time: "events_ib_p3_time" as DictKey,
    title: "events_ib_p3_title" as DictKey,
    body: "events_ib_p3_body" as DictKey,
    bullets: [
      "events_ib_p3_b1",
      "events_ib_p3_b2",
      "events_ib_p3_b3",
      "events_ib_p3_b4",
      "events_ib_p3_b5",
    ] as DictKey[],
  },
  {
    role: "sauna",
    image: "/media/events/ice-bath/sauna.jpg",
    alt: "events_ib_img_sauna_alt" as DictKey,
    time: "events_ib_p4_time" as DictKey,
    title: "events_ib_p4_title" as DictKey,
    body: "events_ib_p4_body" as DictKey,
    bullets: [
      "events_ib_p4_b1",
      "events_ib_p4_b2",
      "events_ib_p4_b3",
      "events_ib_p4_b4",
    ] as DictKey[],
  },
  {
    role: "lunch",
    image: "/media/events/ice-bath/lunch.jpg",
    alt: "events_ib_img_lunch_alt" as DictKey,
    time: "events_ib_p5_time" as DictKey,
    title: "events_ib_p5_title" as DictKey,
    body: "events_ib_p5_body" as DictKey,
    bullets: [] as DictKey[],
  },
  {
    role: "flower",
    image: "/media/events/ice-bath/flower-crown.jpg",
    alt: "events_ib_img_flower_alt" as DictKey,
    time: "events_ib_p6_time" as DictKey,
    title: "events_ib_p6_title" as DictKey,
    body: "events_ib_p6_body" as DictKey,
    bullets: [] as DictKey[],
  },
] as const;

export const iceBathIncludes = [
  "events_ib_inc_1",
  "events_ib_inc_2",
  "events_ib_inc_3",
  "events_ib_inc_4",
  "events_ib_inc_5",
  "events_ib_inc_6",
  "events_ib_inc_7",
  "events_ib_inc_8",
  "events_ib_inc_9",
  "events_ib_inc_10",
] as const satisfies readonly DictKey[];

export const iceBathFor = [
  "events_ib_for_1",
  "events_ib_for_2",
  "events_ib_for_3",
  "events_ib_for_4",
  "events_ib_for_5",
] as const satisfies readonly DictKey[];

export const iceBathNot = [
  "events_ib_not_1",
  "events_ib_not_2",
  "events_ib_not_3",
  "events_ib_not_4",
  "events_ib_not_5",
  "events_ib_not_6",
  "events_ib_not_7",
  "events_ib_not_8",
] as const satisfies readonly DictKey[];

export const iceBathWhy = [
  { title: "events_ib_why_1_title", body: "events_ib_why_1_body" },
  { title: "events_ib_why_2_title", body: "events_ib_why_2_body" },
  { title: "events_ib_why_3_title", body: "events_ib_why_3_body" },
  { title: "events_ib_why_4_title", body: "events_ib_why_4_body" },
  { title: "events_ib_why_5_title", body: "events_ib_why_5_body" },
] as const satisfies readonly { title: DictKey; body: DictKey }[];
