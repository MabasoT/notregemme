# Notre Gemme Studios — SS2026

A production-ready e-commerce site for Notre Gemme Studios — a luxury minimalist
South African streetwear house. Built on Next.js 16 (App Router), React 19,
TypeScript 5 strict, and Tailwind CSS 4.

> "Humanity, Our Treasure."

## Stack

- **Framework** — Next.js 16.2.6 with the App Router and React 19
- **Type system** — TypeScript 5 strict, `noUncheckedIndexedAccess`, zero `any`
- **Styling** — Tailwind 4 (CSS-first `@theme` tokens in `app/globals.css`)
- **Fonts** — Space Grotesk (headings), Archivo (body) — Google Fonts via `<link>`
- **Security headers** — CSP, HSTS, X-Frame-Options, Permissions-Policy applied via `next.config.ts`

## Project structure

```
app/
  globals.css           Design-system tokens + base styles
  layout.tsx            Root layout: cursor, header, footer, floating actions
  page.tsx              Home — full single-page brand experience
  homme/                Homme collection grid
  femme/                Femme collection grid
  product/[slug]/       Product detail page (statically generated)
  about/                Brand story / philosophy / 1632
  contact/              Channel links
  not-found.tsx         404
components/             All UI components (cursor, hero, cards, etc.)
lib/
  site-config.ts        Brand metadata, contact, navigation
  content.ts            All user-facing copy (zero hardcoded strings in JSX)
  products.ts           Product catalogue
public/assets/          Drop product images here (see .gitkeep for filenames)
next.config.ts          Security headers
```

## Develop

```bash
npm install
npm run dev
# → http://localhost:3000
```

## Type-check & build

```bash
npm run typecheck    # strict TS, no emit
npm run build        # production build
npm start            # serve the production build
```

## Design system

All visual decisions are sourced from `design-system.md` (v1.0). Tokens live in
`app/globals.css` under `@theme`:

| Token | Value | Purpose |
|---|---|---|
| `--color-bg` | `#050505` | Page background |
| `--color-fg` | `#f0ebe2` | Primary text |
| `--color-green` | `oklch(68% 0.17 128)` | Acid green accent |
| `--color-red` | `oklch(42% 0.20 25)` | Crimson — launch badges |
| `--font-heading` | `Space Grotesk` | Display + product names |
| `--font-body` | `Archivo` | Body + nav |
| `--radius-card` | `20px` | Cards, bento cells |
| `--radius-pill` | `100px` | Buttons, tags |
| `--ease-spring` | `cubic-bezier(0.16,1,0.3,1)` | Default motion curve |

## Interaction layer

- **Custom cursor** — `components/CustomCursor.tsx`. Diamond clip-path,
  12×12 inner + 36×36 outer ring with lerp factor `0.12`. Auto-disabled on
  coarse pointers via `matchMedia('(pointer: coarse)')`.
- **Magnetic tilt** — `components/ProductCard.tsx`. Local `mousemove` handler,
  max ±10deg rotateX/Y, reset on `mouseleave` with a spring transition.
- **Scroll reveal** — `components/ScrollReveal.tsx`. Single
  `IntersectionObserver` (threshold `0.12`) toggles `.visible` on all
  `.reveal` elements; stagger via `.reveal-delay-{1..4}`.
- **Marquee** — `components/Marquee.tsx`. 28s linear infinite loop, ♦ gem
  separators via CSS `clip-path`.

## Orders

Every product card and order CTA links to a pre-filled WhatsApp deeplink
(`whatsappOrderLink()` in `lib/site-config.ts`). The brand confirms sizing,
pricing, and nationwide courier on WhatsApp.

## Credits

Built by **Mabaso Dev & AI – The Digital Alchemist** — [mabasodevai.co.za](https://mabasodevai.co.za)


---

## Changelog

### SS2026 — Patch 1 (2026-05-26)

#### Bug Fixes

**`fix: wrap base reset in @layer base to fix all Tailwind spacing utilities`**
_File: `app/globals.css`_

- **Root cause**: The universal selector CSS reset (`*, *::before, *::after { margin: 0; padding: 0 }`) was written as a top-level rule outside any `@layer` directive. In Tailwind CSS v4 (which uses cascade layers via `@layer utilities`), an unlayered rule has _higher_ cascade priority than any `@layer utilities` rule. This silently overrode every Tailwind spacing utility on every element in the app.
- **Symptom**: All sub-pages (Homme, Femme, Unisex, Contact, About) loaded with their content partially or fully hidden behind the fixed header because `pt-[140px]` had no effect. Section-to-section spacing (e.g. `py-[clamp(80px,10vw,140px)]`) was zero, making all sections run together. Card grid gaps and component interior padding (e.g. `px-7 py-6` on stat boxes and contact cards) were also absent.
- **Fix**: The reset block is now wrapped inside `@layer base { }`, placing it in the base layer and allowing `@layer utilities` to correctly override it.
- **Effect**: All Tailwind `pt-*`, `pb-*`, `py-*`, `px-*`, `mt-*`, `mb-*`, `my-*`, `mx-*`, `gap-*` utilities now apply as intended across the entire site.

**Pages fixed (header-overlap)**

| Page | Route | Fix |
|------|-------|-----|
| Homme collection | `/homme` | Content now starts 140 px below the fixed header |
| Femme collection | `/femme` | Content now starts 140 px below the fixed header |
| Unisex / Upcoming | `/unisex` | Content now starts 140 px below the fixed header |
| Contact | `/contact` | Content now starts 140 px below the fixed header |
| About / Story | `/about` | Content now starts 140 px below the fixed header |

**Components fixed (interior padding)**

| Component | Class fixed | Visual result |
|-----------|-------------|---------------|
| BrandStory stat boxes | `px-7 py-6` (28 px / 24 px) | Numbers and labels no longer touch box edges |
| Contact channel cards | `p-8` (32 px) | Channel name, note, and CTA have proper breathing room |
| Unisex countdown card | `p-10` (40 px) | Countdown and notify form correctly padded |
| Collection grids | `gap-[clamp(16px,2vw,24px)]` | Cards have correct gutters on all viewports |
| BentoGrid cells | `p-9` / `p-8` | Text and CTAs inside bento cells are no longer flush with edges |
| Newsletter bar | various `p-*` | Input field and subscribe button correctly padded |

**Section spacing fixed**

All `py-[clamp(80px,10vw,140px)]` section wrappers on the home page now produce 80–140 px of vertical breathing room, preventing sections from running into each other.

---

**`fix(ci): add enablement:true to configure-pages to fix Setup Pages failure`**
_File: `.github/workflows/pages.yml`_

- **Root cause**: The `actions/configure-pages@v5` action was failing with _"Get Pages site failed. Please verify that the repository has Pages enabled"_ because GitHub Pages had not been enabled for the repository via Settings.
- **Fix**: Added `enablement: true` to the `with:` block of the `Setup Pages` step. This instructs the action to programmatically enable GitHub Pages if it is not already active.
- **Note**: If Pages is later enabled manually via the repository Settings UI, the `enablement: true` parameter becomes a no-op and can be safely left in place or removed.
