# Notre Gemme — SS2026 Patch 3 (production launch)

Date: 2026-10-16

Brings the site up to the current Mabaso Dev & AI build standard
(CLAUDE.md + the Oct 2026 PageSpeed checklist) and moves hosting to Vercel.

## Content discrepancies fixed

| Issue | Fix |
|---|---|
| Barcode Tee I / II showed the **Queen / King of Hearts** photos; the real Queen / King products showed placeholders | Photos moved to the right products; Barcode Tees show the branded placeholder until their photos exist |
| Evolution Hoodie photos are grey, page pre-selected **Black** | Default colour set to Grey |
| Footer linked to `/shop` (404) and to "Caps", "Track Pants", "Size Guide", "Shipping & Returns" — none exist | Footer links point at real pages only; `/shop` 308-redirects to `/collection` |
| Footer and brand copy promised caps and track pants | Copy now says "hoodies and tees" (what is actually sold) |
| Unisex page titled "Upcoming AW2026", schema said PreOrder, but Rooted in Humanity is in stock at R 500 | Unisex is a normal collection page with the AW2026 teaser below it |
| Drop date 2026-09-01 had passed, countdown showed "Live Now" for an unreleased drop | Date cleared; countdown shows "Date announced soon" until a real date is set |
| Newsletter and "Notify me" forms said "You're subscribed" but sent nothing | Real `/api/subscribe` relay; with no backend configured the form offers WhatsApp instead of faking success |
| Story stat said 2 collections | 3 (Homme, Femme, Unisex) |
| Quote typo "vanishh" | Fixed — "Ves." kept, it is printed on the hoodie |
| Dead `FloatingActions` component held a wrong phone number and wrong prices (R850 / R1,450) | Deleted, with other unused components |
| "Notre Gemme Studios" in schema | Removed |
| Chatbot said fees are "confirmed at checkout" (there is no checkout) | Says fees are confirmed on WhatsApp |
| Femme meta mentioned "queens and kings" (King is in Homme) | Rewritten |

## SEO / GEO

- Titles were doubled by the template (e.g. "About | Notre Gemme — Notre Gemme") — every route now has one keyword-led title and a 140–160 char description from `lib/content.ts → pageMeta`.
- Every page has exactly one `<h1>` (collection, story and upcoming pages had none) and one `<main>` (two pages nested a second `<main>`).
- One canonical URL style (no trailing slash) across canonicals, sitemap and JSON-LD.
- Sitemap: includes product pages and `/about`, `/collection`; real `lastmod` instead of "now".
- robots.txt names GPTBot, ClaudeBot, PerplexityBot, Google-Extended and others; `/llms.txt` added (llmstxt.org format, generated from the catalogue).
- JSON-LD centralised in `lib/schema.ts`: Organization (full PostalAddress, real logo URL — the old one 404'd), WebSite, Product with stock-aware availability, CollectionPage, BreadcrumbList.
- 1200×630 PNG Open Graph image + favicon / Apple touch icon (there was none).

## Performance

- Static export dropped: `next/image` now serves AVIF/WebP. Hoodie PNGs trimmed and resized (3.0 MB / 1.2 MB originals → served as 17–54 KB AVIF at 828 px); the 20 px builder logo went from 1.3 MB to 40 KB.
- Images renamed to lowercase-hyphenated (`Product 1.jpg` → `queen-of-hearts-tee.jpg`).
- Above-the-fold images use `priority`; the rest lazy-load.

## Accessibility

- Muted text `#7a7570` failed WCAG AA (3.6–4.5:1) → `#8f8a84` (4.8–6:1 on every surface).
- Custom cursor no longer causes a hydration mismatch on touch devices.
- Closed mobile drawer is `inert` (links were focusable while hidden); Escape closes it.
- Skip-to-content link; footer Instagram preview opens on keyboard focus; chat log is a live region.
- Digital-footprint link's accessible name now matches its visible text (WCAG 2.5.3).

## Security

- Next.js 16.2.6 → 16.4.2 (critical advisory), React 19.3; production dependencies have 0 known vulnerabilities.
- CSP, HSTS, X-Frame-Options, nosniff, Referrer-Policy, Permissions-Policy now actually served (static export couldn't send headers).
- `/api/subscribe`: validation, honeypot, per-IP rate limit, upstream timeout, server-only URL.

## Tooling

- ESLint (Next core-web-vitals + TypeScript) — `next lint` no longer exists in Next 16.
- `scripts/security-check.sh` gate, run locally and in CI (`.github/workflows/ci.yml`).
- GitHub Pages workflow removed; Vercel deploys from Git. Old `/notregemme/*` Pages paths 308-redirect.

## Owner actions (not code)

1. **Confirm the stock and "bought recently" numbers in `lib/stock.ts` are real.** They are shown to shoppers as fact.
2. Supply photos for NG Barcode Tee I, NG Barcode Tee II and Rooted in Humanity.
3. Set the AW2026 drop date in `lib/site-config.ts → drop.nextDropDate` once confirmed.
4. Deploy `docs/subscribe-backend.gs` and set `SUBSCRIBE_SCRIPT_URL` in Vercel to start collecting emails.
5. Confirm `hello@notregemme.co.za` receives mail — it is published on the site and in schema.
