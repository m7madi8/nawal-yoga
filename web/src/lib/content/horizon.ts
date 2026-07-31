import type { DictKey } from "@/lib/i18n/dictionaries";

export type HorizonItem = {
  id: string;
  status: DictKey;
  title: DictKey;
  desc: DictKey;
  /** WhatsApp prefill key — omit for soft closing line */
  waKey?: DictKey;
  cta?: DictKey;
};

export const horizonItems: HorizonItem[] = [
  {
    id: "mats",
    status: "horizon_mats_status",
    title: "horizon_mats_title",
    desc: "horizon_mats_desc",
    waKey: "horizon_mats_wa",
    cta: "horizon_interest_cta",
  },
  {
    id: "conference",
    status: "horizon_conf_status",
    title: "horizon_conf_title",
    desc: "horizon_conf_desc",
    waKey: "horizon_conf_wa",
    cta: "horizon_interest_cta",
  },
  {
    id: "pregnancy",
    status: "horizon_preg_status",
    title: "horizon_preg_title",
    desc: "horizon_preg_desc",
    waKey: "horizon_preg_wa",
    cta: "horizon_interest_cta",
  },
  {
    id: "more",
    status: "horizon_more_status",
    title: "horizon_more_title",
    desc: "horizon_more_desc",
  },
];
