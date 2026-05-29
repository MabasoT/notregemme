# Notre Gemme — SS2026 Patch 2

Date: 2026-05-29

This patch adds in-flow size selection on product pages, deepens SEO/GEO
structured data, and documents the deployment model (GitHub Pages only).

## 1. Size selection attached to WhatsApp orders

New file: `components/ProductOrder.tsx` (client component).

- The product detail page previously rendered sizes as static, non-clickable
  pills and the "Order via WhatsApp" link carried no size context.
- `ProductOrder` is now a client component that lets the customer tap a size.
  The selected size is highlighted (acid-green) and is injected into the
  pre-filled WhatsApp message via `whatsappOrderLink()`, e.g.
  `Hi! I'd like to order the NG Barcode Tee I (Size L) — R 500.`
- Until a size is chosen the CTA is visually disabled and a polite, aria-live
  prompt asks the customer to select a size. This removes the back-and-forth
  of confirming sizing over chat and improves conversion.

Edited: `app/product/[slug]/page.tsx`

- Removed the old static sizes block.
- Renders `<ProductOrder productName price sizes collection />` in the right
  column, directly under the product details.

## 2. SEO / GEO structured data and metadata

Goal: rank on Google and be citable by AI search (GEO/AEO) from day one for a
premium hoodies, t-shirts, caps and track pants store.

Edited: `app/product/[slug]/page.tsx`

- Added Product JSON-LD (`@type: Product`) with name, description, image, sku,
  brand, category, and an `Offer` (priceCurrency ZAR, price, availability
  InStock / PreOrder, NewCondition, seller). This is the key signal for Google
  rich results, Shopping surfaces, and AI answer engines.
- Added BreadcrumbList JSON-LD matching the on-page breadcrumb.
- `generateMetadata` now emits a canonical URL and Open Graph tags
  (type, title, description, url, image with alt) per product.

Edited: `app/layout.tsx`

- Added `openGraph.url` to the site-wide Open Graph block.

Already present and retained: site-wide title template, description, keywords,
authors/creator, Open Graph, Twitter `summary_large_image`, robots
index/follow, themeColor and viewport; home-page Organization + WebSite
JSON-LD and canonical.

Methodology reference: SEO work follows the public Claude SEO skill
(github.com/AgriciDaniel/claude-seo) — JSON-LD as the preferred Schema.org
format, Product/Offer/BreadcrumbList/Organization/WebSite types, GEO = SEO
(indexation-first, self-contained citable copy), and Core Web Vitals
awareness (LCP/INP/CLS).

## 3. Responsiveness, premium look, links

UI/UX review followed the ui-ux-pro-max-skill checklist
(github.com/nextlevelbuilder/ui-ux-pro-max-skill).

- `ProductOrder` uses `flex flex-wrap` so size pills and CTAs wrap cleanly on
  narrow screens; tap targets use generous padding (`px-5 py-2.5`).
- Existing layout already uses fluid `clamp()` spacing and `sm:`/`lg:`
  breakpoints; Patch 1 fixed the Tailwind v4 layer reset that had broken
  responsive spacing.
- No new external links were introduced; the WhatsApp deep link is built from
  `siteConfig.contact.whatsappE164`.

## 4. Deployment

- This project deploys via GitHub Pages using `.github/workflows/pages.yml`.
- Vercel is intentionally NOT used. New projects deploy to GitHub by default
  unless explicitly configured otherwise.
