# Stock, Sold-out Colours & Social Proof

This covers the inventory badges on product pages ("Only 4 left",
"Sold out"), the "🔥 5 people bought this yesterday" social-proof line,
which colours are disabled as sold out, and how to later wire a Google
Apps Script bot so all of this updates **automatically**.

There are **two layers**, and you only touch the first one day-to-day:

1. **`lib/stock.ts`** — the numbers you edit by hand (or that the bot
   overwrites). Stock counts, sold-out colours, social proof.
2. **`lib/products.ts`** — the product design itself: which colours a
   piece is *ever* offered in, and the per-colour photos.

---

## 1. Editing stock by hand (do this now)

Open **`lib/stock.ts`** and edit the `stock` map. It's keyed by the
product **slug** (from `lib/products.ts`).

```ts
export const stock = {
  "evolution-hoodie": {
    inStock: 4,                       // → shows "Only 4 left"
    soldOutColors: ["cream"],         // → Cream White swatch is disabled
    boughtRecently: 8,                // → "🔥 8 people bought this yesterday"
    boughtRecentlyWindow: "yesterday",
  },
  "queen-of-hearts-tee": {
    inStock: 9,
    boughtRecently: 4,
    boughtRecentlyWindow: "this week",
  },
};
```

| Field | What it does |
|---|---|
| `inStock` | Units left. At/below **10** the page shows the amber "Only N left" urgency badge. `0` = sold out. |
| `soldOut` | Force sold-out even if `inStock` > 0 (e.g. paused). |
| `soldOutColors` | List of colour keys (`white`, `black`, `grey`, `cream`, `brown`, `blue`, `purple`) whose swatch is greyed out + struck through. |
| `boughtRecently` | Number for the social-proof line. Omit or `0` to hide it. |
| `boughtRecentlyWindow` | The time phrase, e.g. `"yesterday"`, `"this week"`. |

> The urgency threshold (10) lives at the top of `lib/stock.ts` as
> `LOW_STOCK_THRESHOLD` — change it once to affect every product.

Any slug you **don't** list is treated as freely in stock with no badges.

---

## 2. Restricting colours & per-colour photos (product design)

These live in **`lib/products.ts`** on the product itself:

```ts
defineProduct({
  // ...
  type: "tee",
  colorKeys: ["white", "grey"],        // this tee is ONLY white + grey
  defaultColorKey: "white",            // pre-selected swatch
  colorImages: {                        // swap the photo when a colour is picked
    white: "/assets/queen-white.jpg",
    grey:  "/assets/queen-grey.jpg",
  },
});
```

- `colorKeys` = the colours a piece is **ever** sold in (design choice).
- `soldOutColors` (in `lib/stock.ts`) = colours **temporarily** out (stock).
- `colorImages` = when the shopper clicks a colour, the main photo
  swaps to that file. Drop the images in `public/assets/` first.
  Colours without an entry keep the default `image`.

---

## 3. Automatic updates from a Google Apps Script bot (later)

When you're ready to stop editing by hand, deploy this Apps Script web
app. The site fetches it on load and **overrides** the static values —
no redeploy needed. The bottom-left chatbot reads the same feed, so it
always quotes correct prices, colours and stock.

### Step 1 — Create the Sheet

New Google Sheet → a tab named **`Stock`** with these column headers in
row 1 (exactly):

```
slug | inStock | soldOut | soldOutColors | boughtRecently | boughtRecentlyWindow
```

Example rows:

| slug | inStock | soldOut | soldOutColors | boughtRecently | boughtRecentlyWindow |
|---|---|---|---|---|---|
| evolution-hoodie | 4 | | cream | 8 | yesterday |
| ng-barcode-tee-i | 7 | | | 5 | yesterday |
| ng-barcode-tee-ii | 0 | TRUE | | | |

- `soldOutColors` = comma-separated colour keys, e.g. `cream, black`.
- `soldOut` = `TRUE` to force sold out (leave blank otherwise).

### Step 2 — Add the script

**Extensions → Apps Script**, paste this, and set `SPREADSHEET_ID`:

```javascript
// ============================================================
//  Notre Gemme — Live Stock Feed (read-only)
//  Deploy as: Web App | Execute as: Me | Access: Anyone
// ============================================================
const SPREADSHEET_ID = "PASTE_YOUR_SPREADSHEET_ID_HERE";
const STOCK_SHEET = "Stock";

function doGet() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = ss.getSheetByName(STOCK_SHEET);
  const rows = sheet.getDataRange().getValues();
  const headers = rows.shift(); // first row = column names

  const out = {};
  rows.forEach(function (row) {
    const r = {};
    headers.forEach(function (h, i) { r[h] = row[i]; });
    if (!r.slug) return;

    const entry = { inStock: Number(r.inStock) || 0 };
    if (String(r.soldOut).toUpperCase() === "TRUE") entry.soldOut = true;
    if (r.soldOutColors) {
      entry.soldOutColors = String(r.soldOutColors)
        .split(",").map(function (s) { return s.trim().toLowerCase(); })
        .filter(Boolean);
    }
    if (Number(r.boughtRecently) > 0) {
      entry.boughtRecently = Number(r.boughtRecently);
      entry.boughtRecentlyWindow = r.boughtRecentlyWindow || "recently";
    }
    out[String(r.slug).trim()] = entry;
  });

  return ContentService
    .createTextOutput(JSON.stringify(out))
    .setMimeType(ContentService.MimeType.JSON);
}
```

### Step 3 — Deploy & connect

1. **Deploy → New deployment → Web app**, Execute as **Me**, Access
   **Anyone**. Copy the `/exec` URL.
2. Add it to the site's environment (Vercel project settings, or a
   local `.env.local`):

```
NEXT_PUBLIC_STOCK_URL=https://script.google.com/macros/s/XXXX/exec
```

3. Redeploy once. From then on, editing the Sheet updates the live site
   within a page load — no code changes.

> The site **degrades gracefully**: if the endpoint is unset or
> unreachable, it just uses the hand-edited numbers in `lib/stock.ts`.

### Test the feed

```bash
curl -L "https://script.google.com/macros/s/XXXX/exec"
# → {"evolution-hoodie":{"inStock":4,"soldOutColors":["cream"], ...}}
```

---

## How it reaches the page & the chatbot

- Product page → `components/ProductView.tsx` calls `useLiveStock(slug)`.
- Chatbot → `components/NotreGemmeChatbot.tsx` calls `useLiveStockMap()`.
- Both merge the bot feed over `lib/stock.ts` via `lib/live-stock.ts`.

You never edit those three files for normal updates — only `lib/stock.ts`
(by hand) or the Google Sheet (once the bot is connected).
