# Notre Gemme — SS2026

The e-commerce site for **Notre Gemme**, a luxury minimalist streetwear house
from Tembisa, South Africa. Orders are placed on WhatsApp; the site is the
catalogue, the story and the order funnel.

> "Humanity, Our Treasure."

**Live:** https://notregemme.co.za (Vercel)

## Stack

| Layer | Tool |
|---|---|
| Framework | Next.js 16 (App Router), React 19 |
| Language | TypeScript 5, strict + `noUncheckedIndexedAccess`, zero `any` |
| Styling | Tailwind CSS 4 (CSS-first `@theme` tokens in `app/globals.css`) |
| Fonts | Space Grotesk + Archivo via Google Fonts `<link>` |
| Images | `next/image` — AVIF/WebP served by Vercel |
| Hosting | Vercel (Git integration: `main` → production, branches → previews) |
| Forms | `/api/subscribe` → Google Apps Script → Google Sheet (zero cost) |

## Project structure

```
app/
  layout.tsx              Root layout, metadata defaults, Organization JSON-LD
  page.tsx                Home
  collection/ homme/ femme/ unisex/   Collection pages (shared CollectionListing)
  product/[slug]/         Product detail (statically generated, Product JSON-LD)
  story/ about/ contact/ upcoming/
  api/subscribe/          Newsletter + drop-alert relay (rate-limited, honeypot)
  sitemap.ts robots.ts llms.txt/ opengraph-image.tsx icon.png apple-icon.png
components/               UI components (render only — no copy, no config)
lib/
  site-config.ts          Brand, contact, nav, SITE_URL, drop date
  content.ts              Every user-facing string + per-page SEO (pageMeta)
  products.ts             Product catalogue
  stock.ts / live-stock.ts  Stock + social proof (optional live Apps Script feed)
  schema.ts               JSON-LD builders
  metadata.ts             Route metadata helper
  assets.ts               Shared image paths
  chatbot.ts              Chat assistant answers (derived from products + stock)
docs/                     Editing guide, stock feed, sign-up backend (.gs)
scripts/security-check.sh Pre-deploy gate (also runs in CI)
```

Non-developers: start with **[docs/EDITING-GUIDE.md](docs/EDITING-GUIDE.md)**.

## Develop

```bash
npm install
cp .env.example .env.local   # optional — every variable has a safe default
npm run dev                  # http://localhost:3000
```

## Quality gate

```bash
npm run security:check
```

Runs, in order: no `any`, no `console.log` in UI code, safe `target="_blank"`
links, secret scan, `.env` not tracked, dependency audit (high for production
deps, critical for all), ESLint, type-check, production build. The same gate
runs in GitHub Actions (`.github/workflows/ci.yml`) on every push and PR.

## Environment variables

| Variable | Scope | Required | Purpose |
|---|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | public | no (defaults to `https://notregemme.co.za`) | Canonical origin for SEO tags, sitemap, JSON-LD |
| `NEXT_PUBLIC_STOCK_URL` | public | no | Live stock JSON from Apps Script (`docs/STOCK-AND-SOCIAL-PROOF.md`) |
| `SUBSCRIBE_SCRIPT_URL` | server | no | Sign-up backend (`docs/subscribe-backend.gs`). Unset → forms offer WhatsApp |

## Deploy (Vercel)

Vercel's GitHub integration deploys automatically:

- push / merge to `main` → **production** (notregemme.co.za)
- any other branch or PR → **preview URL**

Custom domain: Vercel → Project → Settings → Domains → add
`notregemme.co.za` and `www.notregemme.co.za` (www → apex, 308). Point DNS
at Vercel as the dashboard instructs. If Cloudflare proxies the domain, set
SSL to **Full (Strict)** and do **not** add a second www redirect there.

Post-deploy checks:

```bash
curl -sI https://notregemme.co.za | grep -iE "strict-transport|content-security|x-frame"
curl -s https://notregemme.co.za/robots.txt
curl -s https://notregemme.co.za/llms.txt | head
```

Then submit `https://notregemme.co.za/sitemap.xml` in Google Search Console.

## Security

CSP (whitelist), HSTS (2 years, preload), `X-Frame-Options: DENY`,
`nosniff`, strict referrer policy and a locked-down Permissions-Policy are set
in `next.config.ts`. `/api/subscribe` validates input, rate-limits per IP,
uses a honeypot, and keeps its upstream URL server-side.

## Credits

Built by **Mabaso Dev & AI – The Digital Alchemist** — [mabasodevai.co.za](https://mabasodevai.co.za)

Change history: [docs/CHANGES-SS2026-PATCH3.md](docs/CHANGES-SS2026-PATCH3.md)
(Patch 1 and 2 notes are in git history and `docs/CHANGES-SS2026-PATCH2.md`).
