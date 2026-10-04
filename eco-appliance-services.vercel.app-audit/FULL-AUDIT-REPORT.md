# SEO Audit: eco-appliance-services.vercel.app (2026-10-04)

Business type: Local service business (service-area, no storefront). Single-page Next.js site. Audited inline: the live homepage plus the local source, which is ahead of the deployed version.

**Health score: 71 / 100**

| Category | Score |
|---|---|
| Technical | 78 |
| Content | 68 |
| On-page | 80 |
| Schema | 72 (was 60 before this session's fixes) |
| Performance | not measured (no field data) |
| AI readiness | 70 |
| Images | 75 |

## What works
Valid canonical, title and meta description; complete OG/Twitter tags with a 1200x630 generated image; robots.txt and sitemap.xml; HSTS; LocalBusiness and FAQPage JSON-LD; one H1 with a sensible heading hierarchy; lang attribute; manifest.

## Findings
- **High: one indexable URL.** Everything lives at `/`, so there are no landing pages for "dryer vent cleaning Bethesda" style queries. Largest ranking ceiling.
- **High: on a vercel.app domain.** Weak brand and trust signal and no domain authority. Buy a custom domain and set `NEXT_PUBLIC_SITE_URL`.
- **Medium: no address or Google Business Profile link in schema.** Service-area businesses may omit the address, but `sameAs` should include GBP and Yelp.
- **Medium: 3 images with empty alt** (logo emblems in the navbar and footer). Acceptable if the parent link has an accessible name; verify.
- **Medium: deployed site is stale.** Live copy still says "HVAC", while the source has removed it. Redeploy.
- **Low: no llms.txt, no security headers beyond HSTS.**
- **Low: sitemap has one URL with no lastModified.**

## Fixed this session
- LocalBusiness `sameAs` (Facebook, Instagram) and `knowsAbout`
- ItemList of Service schema tied to the business `@id`
- Explicit `robots` metadata with max-snippet and max-image-preview
- Twitter title and description
- `public/llms.txt`
- Security headers (nosniff, frame, referrer, permissions policy)
- `npm run build` passes
