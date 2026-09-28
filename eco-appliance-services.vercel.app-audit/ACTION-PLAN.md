# Action Plan: Eco Appliance Services

## Critical (now)
1. Decide the real production domain. Set `metadataBase` and `openGraph.url` in `app/layout.tsx` to it (currently the parked ecoapplianceservices.com). If you own that domain, point it at Vercel; if not, use the vercel.app URL until you buy one.
2. Add `app/robots.ts` (allow all, reference sitemap) and `app/sitemap.ts` (/, /services, /contact).
3. Give /services and /contact their own `metadata` (unique title, description, `alternates.canonical`), and set canonical on home.
4. Remove or substantiate `aggregateRating` (482 reviews). Only keep it if the reviews are real and visible on the site.

## High (week 1)
5. Fix the contradictory experience claim (15+ years vs `foundingDate` 2021).
6. Complete LocalBusiness schema: absolute `url`, `logo`, `image`, `address` (or service-area only), `sameAs` (GBP, Facebook, Yelp), cities in `areaServed`.
7. Create a 1200x630 branded OG image; use an absolute URL via the corrected `metadataBase`.
8. Show a real address/service area, licence and insurance info, and real reviews on the pages.

## Medium (month 1)
9. Add per-service pages (dryer vent cleaning, duct cleaning, refrigerator, washer, dishwasher, cooktop) and city/area pages with unique content.
10. Add FAQ and pricing-guidance sections.
11. Claim and optimise Google Business Profile; keep NAP identical to the site.
12. Run PageSpeed Insights (mobile), trim font weights, confirm LCP under 2.5s.

## Low / ongoing
13. Drop the `keywords` meta. Consider llms.txt. Set up Search Console and re-run this audit after the domain change.
