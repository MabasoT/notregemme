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
