# Notre Gemme — Editing Guide

Everything you'll change often lives in **3 files** plus the **images
folder**. You almost never need to touch component code. This guide is
the map: "I want to change X → go here."

> Golden rule: products, colours, copy, contact details and brand
> tokens are all **data**. Edit the data, the site rebuilds the cards,
> pages, sitemap and structured-data automatically.

---

## 🗺️ Quick reference

| I want to… | Go to | 
|---|---|
| Add / edit / remove a product | `lib/products.ts` |
| **Change stock count / "Only N left"** | `lib/stock.ts` |
| **Mark a colour sold out** | `lib/stock.ts` → `soldOutColors` |
| **Set "X people bought this" social proof** | `lib/stock.ts` → `boughtRecently` |
| **Connect the auto stock bot (Apps Script)** | `docs/STOCK-AND-SOCIAL-PROOF.md` |
| Change which colours a hoodie / tee / cap offers | `lib/products.ts` → `TYPE_DEFAULTS` (all) or `colorKeys` (one product) |
| **Swap the photo per colour** | `lib/products.ts` → product's `colorImages` |
| Change the fabric / gsm per garment type | `lib/products.ts` → `TYPE_DEFAULTS` → `fabric` |
| Tweak a colour's exact shade | `lib/products.ts` → `COLORS` |
| Change a price | `lib/products.ts` (the product's `price` + `priceValue`) |
| Add a product photo | `public/assets/` (then reference it in `lib/products.ts`) |
| Change WhatsApp number / Instagram / email | `lib/site-config.ts` → `contact` |
| Change the top / footer menu links | `lib/site-config.ts` → `nav` |
| Change the next drop date / countdown | `lib/site-config.ts` → `drop.nextDropDate` |
| Change headlines, descriptions, section copy | `lib/content.ts` |
| What the bottom-left chatbot knows | auto — reads `lib/products.ts` + `lib/stock.ts` |
| Change brand colours / fonts / radii (site-wide) | `app/globals.css` → `@theme` |
| Swap the logo | `public/assets/logo notregemme.png` |

---

## 1. Add a product (the important one)

Open `lib/products.ts` and add **one object** to the `products` array,
wrapped in `defineProduct({...})`. That's it — a card, a detail page,
colour swatches, sizes, the WhatsApp order link, sitemap entry and
SEO data are all generated for you.

```ts
defineProduct({
  slug: "ng-cap-i",                 // URL: /product/ng-cap-i  (must be unique)
  name: "NG Logo Cap",
  subtitle: "Structured 6-Panel",
  price: "R 350",                   // what shoppers see
  priceValue: 350,                  // number used for SEO / schema
  collection: "unisex",             // "homme" | "femme" | "unisex"
  type: "cap",                      // "hoodie" | "tee" | "cap"  ← sets colours + sizes
  motif: "barcode",                 // "barcode" | "suits" | "heart" (placeholder art)
  image: "/assets/NG Cap.jpg",      // drop the file in public/assets first
  imageAlt: "Notre Gemme logo cap in white",
  description: "Short story about the piece, shown on the product page.",
  details: ["100% cotton twill", "Adjustable strap", "Embroidered NG gem"],
}),
```

Because `type: "cap"`, this product **automatically** offers White,
Blue and Purple, defaults to White, and uses the "One Size" run — you
wrote zero card code.

### Defaults per garment type

These come from `TYPE_DEFAULTS` in `lib/products.ts`:

| Type | Colours offered | Default | Sizes | Fabric (auto) |
|---|---|---|---|---|
| `hoodie` | White, Black, Grey, Cream White | White | S–2XL | 430gsm 100% cotton |
| `tee` | White, Black, Grey, Brown | White | S–3XL | 300gsm 100% cotton |
| `cap` | White, Blue, Purple | White | One Size | 100% cotton twill |

The fabric line is added to each product's details automatically — you
don't type it per product. Change it once in `TYPE_DEFAULTS`.

### Overriding the defaults for a single product

Add any of these optional fields to the `defineProduct({...})` object:

```ts
colorKeys: ["white", "black"],   // only offer these two, in this order
defaultColorKey: "black",         // pre-select Black instead of White
sizes: ["XS", "S", "M", "L", "XL"], // custom size run (e.g. femme cut)
```

### Coming-soon products

Set `comingSoon: true` and `tag: "Coming Soon"`. The order button turns
into a "notify me" WhatsApp link automatically, and the piece shows up
on `/unisex` and `/upcoming`.

### Remove a product

Delete its object from the array. The card and page disappear on the
next build.

---

## 2. Change colours

All colours live in **one table** — `COLORS` in `lib/products.ts`:

```ts
export const COLORS = {
  white:  { key: "white",  name: "White",       hex: "#f4f1ea" },
  black:  { key: "black",  name: "Black",       hex: "#141414" },
  grey:   { key: "grey",   name: "Grey",        hex: "#9a9a9a" },
  cream:  { key: "cream",  name: "Cream White", hex: "#e7dec9" },
  brown:  { key: "brown",  name: "Brown",       hex: "#6b4a33" },
  blue:   { key: "blue",   name: "Blue",        hex: "#2e4fa3" },
  purple: { key: "purple", name: "Purple",      hex: "#6a3fa0" },
};
```

- **Change a shade** → edit the `hex`. Every swatch on the site updates.
- **Rename a colour** (e.g. "Cream White" → "Bone") → edit `name`.
- **Add a brand-new colour** → add a row here, then list its key in
  `TYPE_DEFAULTS` or in a product's `colorKeys`.

To change which colours a whole garment family gets, edit
`TYPE_DEFAULTS` (same file) — e.g. add `"cream"` to the `tee` list and
every tee instantly offers Cream White.

The shopper picks a colour **and** a size on the product page; both are
baked into the pre-filled WhatsApp message, e.g.
*"I'd like to order the Evolution Hoodie in Black (Size L) — R 800."*

---

## 2b. Stock, sold-out colours & social proof

These change daily, so they live in their **own file**, `lib/stock.ts`,
keyed by product slug:

```ts
"evolution-hoodie": {
  inStock: 4,                 // → "Only 4 left" badge
  soldOutColors: ["cream"],   // → Cream White swatch disabled
  boughtRecently: 8,          // → "🔥 8 people bought this yesterday"
  boughtRecentlyWindow: "yesterday",
},
```

- `inStock: 0` (or `soldOut: true`) marks the whole piece sold out.
- Selecting a colour also **swaps the product photo** if you've set
  `colorImages` for it in `lib/products.ts`.
- The bottom-left **chatbot** reads this same file, so it always quotes
  correct stock, colours and what's sold out — no separate update.

When you're ready to automate it, a Google Apps Script bot can feed
these numbers live (the site falls back to this file if the bot is off).
Full walkthrough: **`docs/STOCK-AND-SOCIAL-PROOF.md`**.

---

## 3. Contact details, social, menu, drop date

All in `lib/site-config.ts`:

- `contact.whatsapp` / `contact.whatsappE164` — the WhatsApp number
  (E164 is digits only, no `+` or spaces — used to build wa.me links).
- `contact.instagram` / `instagramUrl`, `contact.email`.
- `nav.left` / `nav.right` — the header + footer menu items.
- `drop.nextDropDate` — ISO date powering the countdown timer.

---

## 4. Copy (headlines & descriptions)

`lib/content.ts` holds the user-facing text for collection pages and
sections (no strings are hardcoded in components). Edit the text there.

---

## 5. Brand look (colours, fonts, corners) — site-wide

`app/globals.css`, the `@theme` block at the top, holds the design
tokens: background/foreground colours, the signature green, fonts,
border radii. Changing a token here cascades everywhere.

> Note: the swatch colours in §2 are intentionally **separate** from
> these brand tokens — `COLORS` is "what the garment is dyed", `@theme`
> is "how the website looks".

---

## 6. Images & logo

- Product photos: drop files into `public/assets/`, then point a
  product's `image` (and optional `imageBack`) at `/assets/yourfile.jpg`.
- If a product has no photo yet, leave `image: ""` — a branded
  "Photography in progress" placeholder renders automatically.
- Logo: replace `public/assets/logo notregemme.png`. It's rendered in
  white across the site (header + footer) so a dark, transparent-PNG
  logo works best.

---

## 7. Publish your changes

```bash
npm run typecheck   # catch mistakes early
npm run build       # produces the static site
```

Commit and push — the deploy pipeline rebuilds the static site. No
server, no database; just data in, fast static pages out.
