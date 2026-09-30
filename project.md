# Eco Appliance Services: Project Notes

Marketing and booking site for an appliance repair business serving the DC / Maryland / Virginia (DMV) area.

## Stack
- Next.js 16 (App Router), React 19, Tailwind CSS 4, lucide-react
- Email: Resend (REST API, no SDK)
- Hosting: Vercel

> This Next.js version has breaking changes. Check `node_modules/next/dist/docs/` before changing framework-level code (see `AGENTS.md`).

## Live site
- Production: https://eco-appliance-services.vercel.app
- Vercel project: `eco-appliance-services` (team `elegacys-projects`)
- Deploy: `vercel --prod` from the project root (not yet connected to git auto-deploy)
- **Do not deploy to production unless the owner asks.** Preview locally with `npm run dev`. The last production deploy is behind the local code (see "Not yet deployed" below).

## Structure
| Path | Purpose |
|---|---|
| `app/page.tsx` | **Single page** (server component, metadata + FAQ JSON-LD). Sections in order: Hero (`#home`), Services (`#services`), Why Us, Process (`#process`), Service Area (`#service-area`), FAQ (`#faq`), Contact (`#contact`), CTA bar. `/services` and `/contact` redirect to `/#services` and `/#contact` (see `next.config.ts`) |
| `components/SiteShell.tsx` | Client wrapper: Navbar, `<main>`, Footer, BookingModal, SocialModal (QR). `useSite()` exposes `openBooking(service?)` and `openSocial()` to any button |
| `components/ZipChecker.tsx` | Reusable ZIP availability checker (hero, services panel, service area). Data: `lib/service-area-zips.ts` (generated, 40 mi from DC, do not edit by hand), logic: `lib/service-area.ts` |
| `components/QrPanel.tsx` | Call / Facebook / Instagram QR toggle (footer and social modal), generated client-side with `qrcode`. Set the real URLs in `SOCIAL_LINKS` in `lib/site.ts`; empty ones show "Link coming soon" |
| `lib/services.ts` | Service data (lucide icons). `serviceGroups` (appliances, then dryer vent, then duct cleaning) drives the services section, hero picker and footer links; `applianceCategories` is the "Appliances We Service" listing; `bookableServices` feeds the booking popup and quick contact form. Edit service content here only |
| `app/api/inquiries/route.ts` | Form handler: validates input and sends emails via Resend |
| `components/ServicesSection.tsx` | Services section: appliance repair card, appliance categories + brands, home warranty band, then dryer vent and duct cleaning cards, each with Book and Call buttons. Brand list lives in `lib/site.ts` |
| `components/BookingModal.tsx` | 2-step booking flow (choose service and arrival window, then address and contact) |
| `components/ContactForm.tsx` | Quick contact form: tap-to-pick service and time, then name, phone, email, ZIP and required street address. Date and notes are optional and collapsed |
| `components/Footer.tsx` | Footer with a green "book today" CTA band, icon link columns and a back-to-top button |
| `components/*` | Navbar, Hero, sections |
| `lib/site.ts` | `SITE_URL` (from `NEXT_PUBLIC_SITE_URL`, falls back to the vercel.app URL), used for canonicals, sitemap, robots and schema |
| `lib/faqs.ts` | FAQ content, shared by `FAQSection` and the FAQPage JSON-LD on the home page |
| `app/robots.ts`, `app/sitemap.ts` | robots.txt and sitemap.xml |
| `app/opengraph-image.tsx`, `app/twitter-image.tsx` | Generated 1200x630 social preview image |

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
| `BOOKING_FROM_EMAIL` | `Eco Appliance Services <bookings@ecoappliancservices.com>` |
| `BOOKING_TO_EMAIL` | Inbox that receives booking alerts (ecoapplianceservicesdmv@gmail.com) |

Changing a Vercel env var requires a redeploy to take effect.

## Email / DNS
- Sending domain `ecoappliancservices.com` (DNS at GoDaddy) is **verified in Resend**: DKIM (TXT) and SPF (CNAME `send` / `rsend`).
- Gmail addresses cannot be used as the sender. Only addresses on the verified domain.
- The domain is spelled without the "e" in "appliances". Keep this in mind if a differently spelled domain is later used for the website.

## Commands
```bash
npm run dev      # local dev at http://localhost:3000
npm run build    # production build
npm run lint
vercel --prod    # deploy
```

## SEO
Audit run 2026-09-28 (score 51/100 before fixes); reports are in `eco-appliance-services.vercel.app-audit/`.
- Done: per-page titles, descriptions and canonicals; robots.txt and sitemap.xml; generated OG image; HomeAndConstructionBusiness schema (no rating) plus FAQPage schema.
- Set `NEXT_PUBLIC_SITE_URL` in Vercel once the custom domain is connected, then redeploy.
- `ecoapplianceservices.com` (with the "e") is a for-sale parked page, not ours. The Resend domain is `ecoappliancservices.com` (no "e"); confirm which one is the real website domain.
- The business is a startup. Do not add experience claims ("15+ years", "since 2021"), ratings, review counts or testimonials until they are real and verifiable. The reviews section, "5-Star Google Rated" badge and footer star rating were removed for this reason. Re-add reviews (and `aggregateRating` schema) only from real Google reviews.

## Conventions
- Business phone is **(571) 462-1813** (`tel:5714621813`). Form placeholders use a generic example number.
- Diagnostic fee is **$89**, credited 100% toward an approved repair. It is shown in the booking modal, both emails and the FAQ.
- No mobile sticky bottom bar: mobile actions (call, Book, menu) live in the navbar.
- Every button and link gets pointer cursor, press and focus styles from `app/globals.css`.
- Hero service pills and the brands strip are decorative (auto-scrolling, not clickable). The hero row pauses on touch and respects reduced motion.
- FAQ items all start closed.
- Branded green scrollbar (page and scrollable panels) is defined in `app/globals.css`.
- Mobile: hero leads with the photo; sections use tighter padding; the booking modal is capped to the screen height with a scrolling body.
- Booking modal touch behaviour: it locks page scroll while open (`document.body.style.overflow`), uses `touch-pan-y` and `overflow-x-hidden` so fingers only scroll vertically, and skips the backdrop blur and pop-in animation on phones for smoother scrolling. `html, body` use `overflow-x: clip` in `app/globals.css` to stop sideways drift on touch devices.
- Desktop header phone button uses the same light green look as the mobile call button.
- Service descriptions must never be clipped (no `line-clamp`).
- Branding: source logo is `assest/eco logo.jpeg`. `public/logo.jpeg` is the full lockup (used in schema/search), `public/logo-mark.png` is the cropped house-and-appliances emblem used in the header and footer circles. Favicons and app icons (`app/favicon.ico`, `app/icon.png`, `app/apple-icon.png`, and the files in `public/`) are generated from the emblem. Save icon PNGs and ICOs as RGBA or the Next build fails.

## Not yet deployed (local only)
Home/Services page share `ServiceCards`; simplified contact form with required address; redesigned footer; green header phone button; compact Services page header on mobile; new coverage card on the Contact page; brands marquee; green selected tile in the estimator; smoother vertical-only scrolling in the booking modal on mobile; new logo and favicons. Run `vercel --prod` only when the owner asks.

## Open items
- [ ] Verify or reword remaining unverified claims: "master technician" / "Master Certified Field Pros", "Certified service" wording in the service cards, and the warranty-partner list. (The footer's licensed/insured/EPA lines were removed.)
- [ ] Decide on icons: service cards use emoji, the booking modal and hero use lucide icons. Pick one set for consistency.
- [ ] Deploy the local-only changes when approved.
- [ ] Add a real address or service-area statement, licence and insurance details, an About page, and a Google Business Profile link (then add `sameAs` to the schema).
- [ ] Add per-service and per-city pages, then run PageSpeed Insights on mobile.
- [ ] Test a live booking end to end (business alert and customer confirmation). Check spam on first sends.
- [ ] Connect a custom domain for the website in Vercel (Settings, Domains) and update GoDaddy DNS.
- [ ] Commit the code to git and connect a GitHub repo for auto-deploys (currently only the initial commit exists).
- [ ] Optional: text (SMS) alert to the owner on each booking via Twilio.
- [ ] Optional: store bookings in a database or a Resend audience so they survive a missed email.
- [ ] Clean up existing lint issues (unused imports in `BookingModal.tsx` / `ContactForm.tsx`, a set-state-in-effect error in `BookingModal.tsx`).
- [ ] The booking modal has `customNotes` and `warrantyClaimNumber` state with no input fields yet, so those values are always empty.
