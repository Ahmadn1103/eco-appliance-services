# Eco Appliance Services: Project Notes

Marketing and booking site for an appliance repair business serving the DC / Maryland / Virginia (DMV) area.

## Stack
- Next.js 16 (App Router), React 19, Tailwind CSS 4, lucide-react, `qrcode` (client-side QR codes)
- Email: Resend (REST API, no SDK)
- Hosting: Vercel

> This Next.js version has breaking changes. Check `node_modules/next/dist/docs/` before changing framework-level code (see `AGENTS.md`).

## Live site
- Production: https://www.eco-applianceservices.com (apex redirects to www)
- Vercel project: `eco-appliance-services` (team `elegacys-projects`)
- Deploy: `vercel --prod` from the project root (not yet connected to git auto-deploy)
- **Do not deploy to production unless the owner asks.** Preview locally with `npm run dev`. The last production deploy is behind the local code (see "Not yet deployed" below).

## Structure
The site is a **single page** (`/`) with anchor navigation. `/services` and `/contact` were removed and redirect to `/#services` and `/#contact` (`next.config.ts`).

| Path | Purpose |
|---|---|
| `app/page.tsx` | Server component (metadata, canonical, FAQ JSON-LD). Renders inside `SiteShell`, in order: `Hero` (`#home`), `ServicesSection` (`#services`), `AboutSection` (`#about`), `WhyUs`, `ProcessSection` (`#process`), `ServiceAreaSection` (`#service-area`), `BrandsStrip`, `FAQSection` (`#faq`), `ContactSection` (`#contact`), `CtaBar` |
| `components/SiteShell.tsx` | Client wrapper: Navbar, `<main>` (no top padding, the hero runs under the floating header), Footer, BackToTop, BookingModal, SocialModal. `useSite()` exposes `openBooking(service?)` and `openSocial()` to any button |
| `components/Navbar.tsx` | Floating pill header, anchor links with an IntersectionObserver active state, mobile menu that drops down inside the pill, scroll-progress line, QR button (lg+) |
| `components/Hero.tsx` | Dark full-bleed hero; the technician photo sits in its own box below the header (`top-20`, 60% wide on desktop, faded left edge). Only eyebrow, H1, paragraph and two buttons (no form card over the face). ZIP checking lives in the Service Area section and the services panel |
| `components/ServicesSection.tsx` | Tile selector (`role="tablist"`) plus detail panel (gradient header, key fixes, ZIP checker, quick contact form keyed to the selected service). The Home Warranty tile shows a call panel instead of the form |
| `lib/services.ts` | Service data (lucide icons): 17 appliance / dryer-vent tiles plus House Duct Cleaning and Home Warranty. Drives the tiles (`note` is the symptom line under each name), the panel, `ContactForm` and `BookingModal` and `PanelBookingForm` service pickers, and the footer list (every non-`extra` service, in two columns). **Edit service content here only** |
| `lib/site.ts` | `SITE_URL` (from `NEXT_PUBLIC_SITE_URL`, falls back to the vercel.app URL), phone constants, nav link array (label + section id), service regions (Virginia 45 cities, Maryland 14, Washington DC 3), brands, `SOCIAL_LINKS` |
| `components/ZipChecker.tsx` | Reusable ZIP availability checker (hero, services panel, Service Area). Data: `lib/service-area-zips.ts` (ZIPs within 40 miles of Fredericksburg, Stafford, Manassas and Warrenton VA, list supplied by the owner; the old generator script is no longer in the repo, so edit the file directly). Logic: `lib/service-area.ts` (`checkZip` returns `in` / `out` / `invalid`) |
| `components/QrPanel.tsx`, `components/SocialModal.tsx` | Facebook / Instagram QR toggle, shown in the footer and in the header QR popup. Codes are generated client-side. URLs come from `SOCIAL_LINKS` in `lib/site.ts`; an empty entry shows "Link coming soon" instead of a fake code |
| `components/BrandIcons.tsx` | Inline Facebook and Instagram SVGs (lucide has no brand icons) |
| `components/BookingModal.tsx` | One-step "Schedule Dispatch" popup: service dropdown (from `lib/services.ts`, placeholder `Choose your service`), name, email (optional), phone, ZIP, brand and issue description. Sends only a ZIP, no street address, so `app/api/inquiries/route.ts` accepts ZIP-only requests when `source` is `Instant Booking Modal`; dispatch confirms the address by phone. Remounts on every open, so there is no reset logic |
| `components/PanelBookingForm.tsx` | Compact booking form (icon fields: name, phone, email, address with 5-digit ZIP, date, window, brand, issue) used in the Services panel (service fixed by the tile, title `Book Your {service}`) and in the Contact section (shows a `Choose your service` dropdown). POSTs to `/api/inquiries` |
| `components/Footer.tsx` | Light footer: brand, services list (deep links via `serviceHref` in `lib/service-link.ts`, `?service=<id>#services`, same-page clicks use the `SELECT_SERVICE_EVENT` window event that `ServicesSection` listens for), contact card, QR panel, legal strip |
| `components/WhyUs.tsx`, `ProcessSection.tsx`, `ServiceAreaSection.tsx`, `BrandsStrip.tsx`, `FAQSection.tsx`, `ContactSection.tsx`, `CtaBar.tsx`, `BackToTop.tsx` | Page sections and small helpers |
| `lib/faqs.ts` | FAQ content, shared by `FAQSection` and the FAQPage JSON-LD |
| `app/api/inquiries/route.ts` | Form handler: validates input and sends emails via Resend |
| `app/robots.ts`, `app/sitemap.ts` | robots.txt and sitemap.xml (sitemap has one entry, `/`) |
| `app/opengraph-image.tsx`, `app/twitter-image.tsx` | Generated 1200x630 social preview image |

Unused leftovers from the old multi-page site (not imported anywhere): `DMVCoverage.tsx`, `DiagnosticPlugin.tsx`, `FeaturedShowcase.tsx`, `WarrantyPartners.tsx`. Delete them or reuse them.

## Design system
Layout and style follow the one-page service-site guide (floating pill header, dark hero, very rounded cards, hairline borders, alternating section backgrounds). Colors and copy are the site's own.
- **Role tokens** live in `app/globals.css` (`:root` plus `@theme inline`): `primary`, `primary-strong`, `accent`, `ink`, `ink-soft`, `muted`, `surface`, `surface-alt`, `surface-tint`, `line` (border), `line-tint`, `success`, `warning`, `danger`, `star`, `on-primary`. They map to the existing emerald / teal / slate palette. Use token classes (`bg-primary`, `text-ink-soft`, `border-line`), not raw hex or Tailwind palette colors, except for the lighter emerald gradient on the dark hero.
- **Signature gradient** on every primary CTA: `bg-gradient-to-r from-primary via-primary to-accent`, with the `btn-cta` class (sheen on hover).
- **Motion classes** in `globals.css`: `pressable`, `pressable-icon`, `btn-cta`, `icon-btn`, `nav-chip`, `card-lift`, `menu-veil`, `menu-panel`, `header-dropdown`, `menu-item`, `panel-swap`. All are disabled under `prefers-reduced-motion`.
- **Font:** Plus Jakarta Sans (400 to 900) for everything, loaded from Google Fonts in `app/layout.tsx`.
- Anchor targets keep clear of the fixed header with `main [id] { scroll-margin-top: 7.5rem }`.

## How bookings work
1. Both forms POST JSON to `/api/inquiries`.
2. The server requires name, phone and street address (email is validated if given), then generates a ticket ID (`ECO-DMV-####`).
3. Emails go out through Resend:
   - **Business alert** to `BOOKING_TO_EMAIL`, with all details. Reply-To is the customer's email when given.
   - **Customer confirmation** to the address the customer entered, only when an email was provided. Reply-To is the business.
   - The `$89` diagnostic fee line is included in both.
4. The business alert decides success. If the customer confirmation fails, it is logged and the booking still succeeds.
5. On failure the form shows an error instead of a fake "confirmed" screen.

Nothing is stored in a database. The emails are the only record of a booking.

## Environment variables
Set in `.env` locally and in Vercel (Production). Never commit them. `.env*` is gitignored.

| Variable | Value / purpose |
|---|---|
| `RESEND_API_KEY` | Resend API key (rotate at resend.com/api-keys) |
| `BOOKING_FROM_EMAIL` | `Eco Appliance Services <bookings@eco-applianceservices.com>` (domain must be verified in Resend) |
| `BOOKING_TO_EMAIL` | Inbox that receives booking alerts (ecoapplianceservicesdmv@gmail.com) |

Changing a Vercel env var requires a redeploy to take effect.

## Email / DNS
- Sending domain `ecoappliancservices.com` (DNS at GoDaddy) is **verified in Resend**: DKIM (TXT) and SPF (CNAME `send` / `rsend`).
- Gmail addresses cannot be used as the sender. Only addresses on the verified domain.
- The domain is spelled without the "e" in "appliances". Keep this in mind if a differently spelled domain is later used for the website.

## Commands
```bash
npm run dev      # local dev at http://localhost:3000 (Next uses the next free port if it is taken)
npm run build    # production build
npm run lint
vercel --prod    # deploy
```

## SEO
Audit run 2026-09-28 (score 51/100 before fixes); reports are in `eco-appliance-services.vercel.app-audit/`.
- Done: per-page titles, descriptions and canonicals; robots.txt and sitemap.xml; generated OG image; LocalBusiness schema (no rating) plus FAQPage schema.
- Set `NEXT_PUBLIC_SITE_URL` in Vercel once the custom domain is connected, then redeploy.
- Domain decided: `eco-applianceservices.com` (canonical `www`). Verify it in Resend (DKIM/SPF DNS) and set `BOOKING_FROM_EMAIL` to `bookings@eco-applianceservices.com`. The previously verified Resend domain `ecoappliancservices.com` (typo) no longer matches.
- The business is a startup. Do not add experience claims ("15+ years", "since 2021"), ratings, review counts or testimonials until they are real and verifiable. The reviews section, "5-Star Google Rated" badge and footer star rating were removed for this reason. Re-add reviews (and `aggregateRating` schema) only from real Google reviews.

## Conventions
- Business phone is **(571) 462-1813** (`tel:5714621813`, constants in `lib/site.ts`). Form placeholders use a generic example number.
- Diagnostic fee is **$89**, credited 100% toward an approved repair. It is shown in the booking modal, both emails and the FAQ.
- No mobile sticky bottom bar: mobile actions (call, Book, menu) live in the navbar.
- Every "Book" button calls `openBooking()` from `useSite()`; do not add separate booking state to sections.
- The header must never sit on a bare white band: `<main>` has no top padding and the hero has its own top padding.
- Every button and link gets pointer cursor and focus styles from `app/globals.css`.
- FAQ items all start closed.
- Branded green scrollbar (page and scrollable panels) is defined in `app/globals.css`.
- Booking modal touch behaviour: it locks page scroll while open (`document.body.style.overflow`), uses `touch-pan-y` and `overflow-x-hidden` so fingers only scroll vertically, and skips the backdrop blur and pop-in animation on phones for smoother scrolling. `html, body` use `overflow-x: clip` in `app/globals.css` to stop sideways drift on touch devices.
- Service descriptions must never be clipped (no `line-clamp`).
- Social links: Instagram `https://www.instagram.com/ecoapplianceservicesdmv/`, Facebook `https://www.facebook.com/people/Eco-Appliance-Services-DMV/61594763108201/` (both in `SOCIAL_LINKS`).
- Branding: source logo is `assest/eco logo.jpeg`. `public/logo.jpeg` is the full lockup (used in schema/search), `public/logo-mark.png` is the cropped house-and-appliances emblem used in the header and footer. Favicons and app icons (`app/favicon.ico`, `app/icon.png`, `app/apple-icon.png`, and the files in `public/`) are generated from the emblem. Save icon PNGs and ICOs as RGBA or the Next build fails.

## Not yet deployed (local only)
The whole one-page redesign: new layout and styling, anchor navigation, the ZIP checker (hero, services panel, Service Area), the Facebook / Instagram QR codes, removal of the `/services` and `/contact` pages (now redirects), simplified contact form with required address, new logo and favicons. Run `vercel --prod` only when the owner asks.

## Open items
- [ ] Verify or reword remaining unverified claims: "master technician" / "Master Certified Field Pros", "Certified service" wording in the service cards, and the warranty-partner list. (The footer's licensed/insured/EPA lines were removed.)
- [ ] Add the Facebook and Instagram URLs to the `sameAs` list in the LocalBusiness schema (`app/layout.tsx`).
- [ ] Delete or reuse the unused old components (see Structure).
- [ ] Deploy the local-only changes when approved.
- [ ] Add a real address or service-area statement, licence and insurance details, an About section (the one-page design has none yet), and a Google Business Profile link (then add `sameAs` to the schema).
- [ ] Add per-service and per-city pages, then run PageSpeed Insights on mobile.
- [ ] Test a live booking end to end (business alert and customer confirmation). Check spam on first sends.
- [ ] Connect a custom domain for the website in Vercel (Settings, Domains) and update GoDaddy DNS.
- [ ] Commit the code to git and connect a GitHub repo for auto-deploys (currently only the initial commit exists).
- [ ] Optional: text (SMS) alert to the owner on each booking via Twilio.
- [ ] Optional: store bookings in a database or a Resend audience so they survive a missed email.
- [ ] Clean up existing lint issues (remaining lint warnings).
