# Action Plan (2026-10-04)

## Done
sameAs/knowsAbout, Service ItemList schema, robots metadata, twitter tags, llms.txt, security headers, clean build.

## Critical / High
1. Deploy the current source (live copy is stale).
2. Buy a custom domain; set NEXT_PUBLIC_SITE_URL in Vercel; add it to Search Console.
3. Create per-service and per-city pages (/services/dryer-vent-cleaning, /areas/bethesda-md, etc.) with unique copy, and add them to sitemap.ts. This is the biggest ranking lever; it also means removing the /services redirect.

## Medium
4. Claim and optimise Google Business Profile; add its URL and Yelp to SOCIAL_LINKS/sameAs.
5. Add real reviews and licence/insurance details on-page; only add aggregateRating if the reviews are real and visible.
6. Run PageSpeed Insights (mobile); trim Plus Jakarta Sans weights.

## Low
7. Add lastModified to the sitemap; verify empty-alt logos have accessible link names.
