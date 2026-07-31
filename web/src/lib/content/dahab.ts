export const DAHAB_TARGET = new Date("2026-08-19T00:00:00");
export const DAHAB_PROGRESS = 25;
export const DAHAB_HOTEL = "https://nourboutiquehotel.com";

export const dahabIncludes = [
  { title: "retreat_dahab_cv_inc1_title", desc: "retreat_dahab_cv_inc1_desc", icon: "stay" },
  { title: "retreat_dahab_cv_inc2_title", desc: "retreat_dahab_cv_inc2_desc", icon: "meals" },
  { title: "retreat_dahab_cv_inc3_title", desc: "retreat_dahab_cv_inc3_desc", icon: "yoga" },
  { title: "retreat_dahab_cv_inc4_title", desc: "retreat_dahab_cv_inc4_desc", icon: "sea" },
  { title: "retreat_dahab_cv_inc5_title", desc: "retreat_dahab_cv_inc5_desc", icon: "breath" },
  { title: "retreat_dahab_cv_inc6_title", desc: "retreat_dahab_cv_inc6_desc", icon: "circle" },
  { title: "retreat_dahab_cv_inc7_title", desc: "retreat_dahab_cv_inc7_desc", icon: "transport" },
  { title: "retreat_dahab_cv_inc8_title", desc: "retreat_dahab_cv_inc8_desc", icon: "ice" },
] as const;

export const dahabFaq = [
  { q: "retreat_dahab_faq_q1", a: "retreat_dahab_faq_a1" },
  { q: "retreat_dahab_faq_q2", a: "retreat_dahab_faq_a2" },
  { q: "retreat_dahab_faq_q3", a: "retreat_dahab_faq_a3" },
  { q: "retreat_dahab_faq_q4", a: "retreat_dahab_faq_a4" },
] as const;

export const dahabProgram = [
  {
    chip: "retreat_dahab26_d1_chip",
    title: "retreat_dahab26_d1_title",
    slots: ["retreat_dahab26_d1_s1", "retreat_dahab26_d1_s2"],
  },
  {
    chip: "retreat_dahab26_d2_chip",
    title: "retreat_dahab26_d2_title",
    slots: ["retreat_dahab26_d2_s1", "retreat_dahab26_d2_s3"],
  },
  {
    chip: "retreat_dahab26_d3_chip",
    title: "retreat_dahab26_d3_title",
    slots: ["retreat_dahab26_d3_s1", "retreat_dahab26_d3_s3"],
  },
  {
    chip: "retreat_dahab26_d4_chip",
    title: "retreat_dahab26_d4_title",
    slots: ["retreat_dahab26_d4_s1", "retreat_dahab26_d4_s3", "retreat_dahab26_d4_s4"],
  },
  {
    chip: "retreat_dahab26_d5_chip",
    title: "retreat_dahab26_d5_title",
    slots: ["retreat_dahab26_d5_s1"],
  },
] as const;

export const dahabGallery = [
  { src: "/media/dahab/gallery-01.jpg", alt: "retreat_dahab_gallery_alt2" },
  { src: "/media/dahab/gallery-02.jpg", alt: "retreat_dahab_gallery_alt3" },
  { src: "/media/dahab/gallery-03.jpg", alt: "retreat_dahab_gallery_alt4" },
  { src: "/media/dahab/gallery-04.jpg", alt: "retreat_dahab_gallery_alt5" },
  { src: "/media/dahab/gallery-05.jpg", alt: "retreat_dahab_gallery_alt6" },
  { src: "/media/dahab/gallery-06.jpg", alt: "retreat_dahab_gallery_alt7" },
] as const;

export const dahabTestimonials = [
  {
    name: "retreat_dahab_cv_t1_name",
    quote: "retreat_dahab_cv_t1_quote",
    photo: "/media/dahab/testimonial-samar.jpg",
  },
  { name: "retreat_dahab_cv_participant", quote: "retreat_dahab_cv_t2_quote" },
  { name: "retreat_dahab_cv_participant", quote: "retreat_dahab_cv_t3_quote" },
] as const;
