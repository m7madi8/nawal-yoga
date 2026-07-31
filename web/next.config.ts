import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
  },
  poweredByHeader: false,
  async redirects() {
    return [
      // Legacy HTML → Next.js routes
      { source: "/index.html", destination: "/", permanent: true },
      { source: "/events.html", destination: "/events", permanent: true },
      { source: "/retreats.html", destination: "/retreats", permanent: true },
      { source: "/nawal.html", destination: "/", permanent: true },
      { source: "/retreat-dahab.html", destination: "/retreats/dahab", permanent: true },
      { source: "/retreats/dahab.html", destination: "/retreats/dahab", permanent: true },
      { source: "/mountain-voice-registration.html", destination: "/register/mountain-voice", permanent: true },
      { source: "/register/mountain-voice.html", destination: "/register/mountain-voice", permanent: true },
      { source: "/register/ice-bath.html", destination: "/register/ice-bath", permanent: true },
      { source: "/workshops/haifa.html", destination: "/practice", permanent: true },
      { source: "/workshops/jiva.html", destination: "/practice", permanent: true },
      { source: "/events/sound-healing.html", destination: "/events/sound-healing", permanent: true },
      { source: "/events/ice-bath.html", destination: "/events/ice-bath", permanent: true },
      { source: "/events/ice-bath-experience.html", destination: "/events/ice-bath-experience", permanent: true },
      { source: "/events/nature-chocolate.html", destination: "/events/nature-chocolate", permanent: true },
      { source: "/admin.html", destination: "/admin/login", permanent: true },
      { source: "/dashboard.html", destination: "/admin", permanent: true },
      { source: "/admin/index.html", destination: "/admin/login", permanent: true },
      { source: "/admin/dashboard.html", destination: "/admin", permanent: true },

      // Future retreats: old URLs → retreats hub until Next pages ship
      { source: "/Zanzibar.html", destination: "/retreats", permanent: true },
      { source: "/retreat.html", destination: "/retreats", permanent: true },
      { source: "/zanzibar-retreat-review-nw2606.html", destination: "/retreats", permanent: true },
      { source: "/retreats/zanzibar.html", destination: "/retreats", permanent: true },
      { source: "/retreat-wadi-rum.html", destination: "/retreats", permanent: true },
      { source: "/retreats/wadi-rum.html", destination: "/retreats", permanent: true },
      { source: "/wadi-rum-registration.html", destination: "/retreats", permanent: true },
      { source: "/register/wadi-rum.html", destination: "/retreats", permanent: true },
      { source: "/workshops/al-tira.html", destination: "/practice", permanent: true },
    ];
  },
};

export default nextConfig;
