export const WA_GROUP_HAIFA = "https://chat.whatsapp.com/GoHoJCDBm2vAs5SdcqUfta";
export const WAZE_TUE = "https://waze.com/ul/hsvbfsqt8d";
export const WAZE_SAT = "https://waze.com/ul/hsvbfemtc8";

export const haifaPowerGallery = [
  { src: "/media/haifa/sunset-01.jpg", alt: "jiva_power_photo_alt1", main: true },
  { src: "/media/haifa/pose-01.jpg", alt: "jiva_power_photo_alt3" },
  { src: "/media/haifa/pose-02.jpg", alt: "jiva_power_photo_alt4" },
  { src: "/media/haifa/pose-03.jpg", alt: "jiva_power_photo_alt5" },
  { src: "/media/haifa/sunset-02.jpeg", alt: "jiva_power_photo_alt2" },
] as const;

export const haifaPlans = [
  { id: "trial", title: "jiva_card_trial_title", price: "jiva_price_trial" },
  {
    id: "pack4",
    title: "jiva_card_pack4_title",
    price: "jiva_price_pack4",
    note: "jiva_pack4_notice",
    featured: true,
  },
  { id: "single", title: "jiva_card_single_title", price: "jiva_price_single" },
] as const;

export const haifaFeedback = [
  { quote: "jiva_feedback_1_quote", name: "jiva_feedback_1_name" },
  { quote: "jiva_feedback_2_quote", name: "jiva_feedback_2_name" },
  { quote: "jiva_feedback_3_quote", name: "jiva_feedback_3_name" },
] as const;
