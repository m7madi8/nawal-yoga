import type { Metadata } from "next";
import { AppProviders } from "@/components/layout/AppProviders";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nawal Omar",
  description:
    "Nurse and yoga teacher Nawal Omar guides women in Haifa through Vinyasa, Yin, Hatha, meditation, day programs, and international retreats.",
  metadataBase: new URL("https://nawalomar.com"),
  icons: {
    icon: [{ url: "/media/brand/logo.png", type: "image/png" }],
    apple: [{ url: "/media/brand/logo.png", type: "image/png" }],
    shortcut: "/media/brand/logo.png",
  },
  openGraph: {
    title: "Nawal Omar",
    description: "A digital sanctuary for calm strength, practice, and retreat.",
    type: "website",
    locale: "ar_IL",
    alternateLocale: ["en_US"],
    images: [{ url: "/media/home/hero.jpg" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nawal Omar",
    description: "A digital sanctuary for calm strength, practice, and retreat.",
    images: ["/media/home/hero.jpg"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Runtime Google Fonts — avoids next/font build-time fetch in restricted networks */}
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,300;12..96,400;12..96,500;12..96,600;12..96,700&family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,400&family=Tajawal:wght@300;400;500;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
