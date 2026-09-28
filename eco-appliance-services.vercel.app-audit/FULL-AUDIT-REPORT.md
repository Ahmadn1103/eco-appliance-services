# SEO Audit: Eco Appliance Services
Audited: https://eco-appliance-services.vercel.app (live deployment) plus local source, 2026-09-28
Business type: Local service business (service-area, DC / MD / VA), HVAC + appliance repair
Scope: 3 pages (/, /services, /contact). Inline audit, no subagents, no CWV/field data, no Google API data.

## SEO Health Score: 51 / 100

| Category | Weight | Score |
|---|---|---|
| Technical SEO | 22% | 55 |
| Content Quality | 23% | 55 |
| On-Page SEO | 20% | 40 |
| Schema | 10% | 55 |
| Performance (not measured, estimate) | 10% | 60 |
| AI Search Readiness | 10% | 35 |
| Images | 5% | 70 |

## Top critical issues
1. **Canonical domain points to a site you do not control.** `metadataBase` and `og:url` in `app/layout.tsx` use `https://ecoapplianceservices.com`, which currently serves a "This website is for sale" parked page. All og:image/twitter:image URLs on the live site resolve there, so social previews are broken.
2. **No robots.txt and no sitemap.xml** (both 404).
3. **Every page has the same title and meta description** (only the root layout defines metadata). /services and /contact are indistinguishable to search engines.
4. **No canonical tags on any page.** Combined with the .vercel.app hostname, this risks duplicate/wrong-host indexing.
5. **Unverified review data in schema:** `aggregateRating` 5.0 / 482 reviews is hard-coded. If it does not match real, visible reviews, it violates Google's structured data policy (manual action risk).

## Technical SEO
Works: HTTPS with HSTS preload, 200 responses, server-rendered HTML (content visible without JS), viewport set, single H1 per page, real 404s.
Issues:
- High: no robots.txt / sitemap.xml. Add `app/robots.ts` and `app/sitemap.ts`.
- High: wrong canonical host (see above); no `alternates.canonical`.
- Medium: live site is on a `*.vercel.app` subdomain. A custom domain is needed for local SEO trust and NAP consistency.
- Low: icons declared in layout duplicate the file-based `app/icon.png`/`apple-icon.png`; live HTML shows `/logo.jpeg` as apple-touch-icon.

## On-Page SEO
- High: identical `<title>` on all 3 pages, identical description. Title is 61 chars (slightly long).
- Medium: no page targets city/service keywords (e.g. "Dryer Vent Cleaning Washington DC"). Heading structure itself is fine (1 H1 per page).
- Medium: `keywords` meta is ignored by Google; harmless but remove clutter.
- Medium: internal links only go to /services and /contact; no per-service pages.
- Note: live copy says "15+ years of master technician experience" while schema says `foundingDate: 2021`. Contradictory (about 5 years).
- Note: the live deployment's description differs from the local `layout.tsx` (live includes "15+ years"), so the deployed build is not identical to local source.

## Content Quality / E-E-A-T
- Only 3 pages; thin for a service business competing across three jurisdictions.
- No About page. Check the rendered pages for a visible address, licence/insurance numbers, technician names and real customer reviews; none were found in the audited HTML.
- No FAQ, pricing guidance, or service-area pages (DC, each MD/VA county/city).

## Schema
Present: `HVACBusiness` JSON-LD on all pages (via layout).
Issues:
- High: unverifiable `aggregateRating` (see above).
- Medium: missing `url`, `address` (or a clear service-area-only setup), `sameAs`, `logo`; `image` is a relative path (`/logo.jpeg`); use an absolute URL.
- Medium: `areaServed` uses whole states as AdministrativeArea; list cities/counties actually served.
- Low: add `Service` / `OfferCatalog` per service, and FAQ content if you add an FAQ section.

## Performance (not measured)
No Lighthouse/CrUX run. Observations only: `hero-technician.jpg` is 780 KB in `/public` (served through next/image, so likely optimised, but verify LCP), and two Google Fonts families with 6-7 weights each load via a render-blocking stylesheet. Run PageSpeed Insights on mobile to confirm.

## Images
Works: all `<img>` have alt text; next/image used with srcset and lazy loading.
Issues: OG image is an 800x600 logo (not a 1200x630 branded card) and is broken due to the wrong host.

## AI Search Readiness
- No llms.txt (optional, not used by Google Search).
- No robots.txt at all, so AI crawlers are allowed by default with no explicit policy.
- Little quotable, factual content (pricing ranges, service times, coverage list, FAQs). Entity signals weak: no sameAs, no GBP link, no reviews on site.

## Not assessed
Google Business Profile, citations/NAP across directories, backlinks, live SERP rankings, CrUX field data, screenshots/mobile rendering. These need a real domain and API access (Google/DataForSEO/Moz credentials were not configured).
