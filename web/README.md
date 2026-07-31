# Nawal Omar — Next.js Sanctuary

Premium digital experience rebuilt with Next.js App Router.

## Analysis (Phase 1)

### Keep
- Brand voice: nurse + yoga teacher + women’s guide
- Offerings: Haifa weekly practice, events, international retreats
- Conversion model: WhatsApp-first
- Real testimonials (Lina, Rana, Maya)
- Bilingual EN/AR with RTL
- Authentic photography/video under `public/media`

### Remove
- Generic card grids and cream/terracotta template feel
- Dead dashboard leftovers
- Fragmented “explore” CTAs without booking intent
- Inter/Playfair AI-wellness typography stack

### Improve
- Component architecture & reusable motion language
- Homepage storytelling arc (breath → guide → philosophy → pathways → voices → join)
- Mobile-first narrative (story always visible)
- Clear primary conversion on every surface

### New experience
A cinematic **digital sanctuary** — calm strength, presence before booking.

## Stack
- Next.js 15 (App Router) · TypeScript · Tailwind CSS v4
- Framer Motion · GSAP + ScrollTrigger · Lenis

## Develop

```bash
cd web
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Production build

```bash
cd web
npm run build
npm start
```

Deploy the `web/` directory as the Next.js app root (Vercel: set Root Directory to `web`).

## Structure

```
src/
  app/                 # routes + SEO (sitemap, robots)
  components/
    layout/            # Header, Footer, providers, smooth scroll
    sections/          # Homepage & shared narrative sections
    experience/        # Shared retreat/event page primitives
    animations/        # MagneticButton, Reveal
    ui/                # Container and primitives
  admin/               # Admin dashboard UI + data layer
  lib/i18n/            # dictionaries + provider
  lib/content/         # page content modules
```

## Future content

Zanzibar, Wadi Rum, and Al-Tira are intentionally inactive. Their HTML, media, and admin `coming_soon` seeds are preserved — see `../legacy/README.md`. Do not delete them.
