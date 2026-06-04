/**
 * ──────────────────────────────────────────────────────────────────
 *  LIVE INVENTORY + SOCIAL PROOF  (the file you edit most often)
 * ──────────────────────────────────────────────────────────────────
 *  Everything here changes day-to-day: how many units are left, which
 *  colours have sold out, and the "X people bought this" social-proof
 *  line. Edit the `stock` map below by hand for now.
 *
 *  LATER — automatic updates from your Apps Script bot:
 *  Set NEXT_PUBLIC_STOCK_URL to your deployed Apps Script web-app URL.
 *  The site will fetch live numbers from it and override the static
 *  values below, with no code change. The bot only needs to return a
 *  JSON object keyed by product slug (see docs/STOCK-AND-SOCIAL-PROOF.md).
 *
 *  This file is plain data — safe to import from anywhere (the product
 *  page, the cards, and the bottom-left chatbot all read from it).
 * ──────────────────────────────────────────────────────────────────
 */
import type { ColorKey } from "./products";

export type ProductStock = {
  /** Units left across all colours. Drives "Only N left". */
  inStock: number;
  /** Hard sold-out flag — disables ordering regardless of inStock. */
  soldOut?: boolean;
  /** Colours currently unavailable — their swatch is disabled. */
  soldOutColors?: ReadonlyArray<ColorKey>;
  /** Social proof: how many people recently bought this. 0 / omit hides it. */
  boughtRecently?: number;
  /** Time window for the social-proof line, e.g. "yesterday", "this week". */
  boughtRecentlyWindow?: string;
};

/** At or below this count, the product page shows an urgency badge. */
export const LOW_STOCK_THRESHOLD = 10;

/**
 * When set (via env), the site fetches live stock JSON from your Apps
 * Script web app and merges it over the static values below.
 * Example: NEXT_PUBLIC_STOCK_URL=https://script.google.com/macros/s/XXX/exec
 */
export const STOCK_ENDPOINT = process.env.NEXT_PUBLIC_STOCK_URL ?? "";

/**
 * ── EDIT ME ──────────────────────────────────────────────────────
 * Keyed by product slug (see lib/products.ts). Any slug you omit is
 * treated as in stock with no badges. Set inStock: 0 OR soldOut: true
 * to mark a piece sold out.
 */
export const stock: Record<string, ProductStock> = {
  "ng-barcode-tee-i": {
    inStock: 7,
    boughtRecently: 5,
    boughtRecentlyWindow: "yesterday",
  },
  "ng-barcode-tee-ii": {
    inStock: 12,
    soldOutColors: ["brown"],
    boughtRecently: 3,
    boughtRecentlyWindow: "this week",
  },
  "evolution-hoodie": {
    inStock: 4,
    soldOutColors: ["cream"],
    boughtRecently: 8,
    boughtRecentlyWindow: "yesterday",
  },
  "queen-of-hearts-tee": {
    inStock: 9,
    boughtRecently: 4,
    boughtRecentlyWindow: "this week",
  },
  "king-of-hearts-tee": {
    inStock: 15,
  },
  "rooted-in-humanity": {
    inStock: 10,
    boughtRecently: 6,
    boughtRecentlyWindow: "this week",
  },
};

/** Static stock for a slug. Unknown slugs default to "available, no badges". */
export function getStock(slug: string): ProductStock {
  return stock[slug] ?? { inStock: 999 };
}

/** True when a piece cannot be ordered right now. */
export function isSoldOut(s: ProductStock): boolean {
  return s.soldOut === true || s.inStock <= 0;
}
