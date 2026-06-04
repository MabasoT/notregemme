/**
 * ══════════════════════════════════════════════════════════════════
 *  NOTRE GEMME — PRODUCT CATALOGUE
 * ══════════════════════════════════════════════════════════════════
 *  Collections (what the words mean):
 *    • HOMME  = Men's pieces        → shown on /homme
 *    • FEMME  = Women's pieces       → shown on /femme
 *    • UNISEX = For everyone         → shown on /unisex (auto "Unisex" tag)
 *
 *  ───── HOW TO ADD A PRODUCT (no coding a card) ─────
 *  Add ONE object under the right section below (HOMME / FEMME / UNISEX).
 *  That's it — the card, detail page, sitemap entry, colour swatches,
 *  sizes, fabric line and WhatsApp order link are all generated for you.
 *  Where you put it = where it shows up. No `collection` field to set.
 *
 *  Minimum needed:  slug, name, price, priceValue, type, motif, description.
 *  The photo is OPTIONAL — leave `image` off and a branded placeholder
 *  shows until you add the file to /public/assets and set `image`.
 *
 *  Handy overrides:
 *    colorKeys:       ["white"]                 // sell in these colours only
 *    defaultColorKey: "grey"                     // pre-selected swatch
 *    colorImages:     { black: "/assets/x.jpg" } // swap photo per colour
 *    sizes:           ["S","M","L"]              // custom size run
 *
 *  To REMOVE a product: delete its object. To hide temporarily: see
 *  stock (lib/stock.ts → soldOut). Full guide: docs/EDITING-GUIDE.md.
 * ══════════════════════════════════════════════════════════════════
 */
import { whatsappOrderLink } from "./site-config";

export type Tag = "New" | "Launch" | "Signature" | "Coming Soon" | "Unisex";

/** Garment family. Drives the default colour palette, size run + fabric. */
export type ProductType = "hoodie" | "tee" | "cap";

export type Collection = "homme" | "femme" | "unisex";

/** Keys into the master swatch table below. */
export type ColorKey =
  | "white"
  | "black"
  | "grey"
  | "cream"
  | "brown"
  | "blue"
  | "purple";

export type ColorOption = {
  key: ColorKey;
  /** Human-readable label shown to the customer + sent in the order. */
  name: string;
  /** Swatch fill. */
  hex: string;
};

/**
 * ── MASTER COLOUR TABLE ──────────────────────────────────────────
 * Single source of truth for every colour the brand offers. Tweak a
 * hex here and it updates every swatch across the whole site.
 */
export const COLORS: Record<ColorKey, ColorOption> = {
  white: { key: "white", name: "White", hex: "#f4f1ea" },
  black: { key: "black", name: "Black", hex: "#141414" },
  grey: { key: "grey", name: "Grey", hex: "#9a9a9a" },
  cream: { key: "cream", name: "Cream White", hex: "#e7dec9" },
  brown: { key: "brown", name: "Brown", hex: "#6b4a33" },
  blue: { key: "blue", name: "Blue", hex: "#2e4fa3" },
  purple: { key: "purple", name: "Purple", hex: "#6a3fa0" },
};

/**
 * ── PER-GARMENT DEFAULTS ─────────────────────────────────────────
 * What colours, sizes and fabric a product gets automatically based
 * on its `type`. Change these to update every product of that type.
 */
export const TYPE_DEFAULTS: Record<
  ProductType,
  {
    colors: ReadonlyArray<ColorKey>;
    defaultColor: ColorKey;
    sizes: ReadonlyArray<string>;
    /** Auto-added as the first line of `details`. */
    fabric: string;
  }
> = {
  hoodie: {
    colors: ["black", "grey", "cream"],
    defaultColor: "black",
    sizes: ["S", "M", "L", "XL", "2XL"],
    fabric: "430gsm 100% cotton",
  },
  tee: {
    colors: ["white", "black", "grey", "brown"],
    defaultColor: "white",
    sizes: ["S", "M", "L", "XL", "2XL", "3XL"],
    fabric: "300gsm 100% cotton",
  },
  cap: {
    colors: ["white", "blue", "purple"],
    defaultColor: "white",
    sizes: ["One Size"],
    fabric: "100% cotton twill",
  },
};

export type Product = {
  slug: string;
  name: string;
  subtitle: string;
  price: string;
  priceValue: number;
  collection: Collection;
  /** Garment family — drives default colours, sizes & fabric. */
  type: ProductType;
  motif: "barcode" | "suits" | "heart";
  tag?: Tag;
  image: string;
  imageAlt: string;
  /** Optional secondary view (e.g. hoodie back). */
  imageBack?: string;
  imageBackAlt?: string;
  /**
   * Optional per-colour photography. When the shopper selects a colour
   * with an entry here, the main image swaps to it. Colours without an
   * entry keep the default `image`.
   */
  colorImages?: Partial<Record<ColorKey, string>>;
  featured?: boolean;
  comingSoon?: boolean;
  /** Pre-built WhatsApp order link with item context. */
  orderHref: string;
  /** Long description for product detail page. */
  description: string;
  /** Selectable colours (resolved from COLORS). */
  colors: ReadonlyArray<ColorOption>;
  /** Pre-selected colour name (for display). */
  defaultColor: string;
  /** Pre-selected colour key. */
  defaultColorKey: ColorKey;
  /** Available sizes. */
  sizes: ReadonlyArray<string>;
  /** Material / construction details (fabric line auto-prepended). */
  details: ReadonlyArray<string>;
};

/** The minimum a new product needs — everything else is derived. */
type ProductDraft = Omit<
  Product,
  | "collection"
  | "colors"
  | "defaultColor"
  | "defaultColorKey"
  | "sizes"
  | "orderHref"
  | "image"
  | "imageAlt"
> & {
  /** Photo path under /public. Optional — omit for a branded placeholder. */
  image?: string;
  imageAlt?: string;
  /** Restrict / reorder the colours offered. Defaults to the type palette. */
  colorKeys?: ReadonlyArray<ColorKey>;
  /** Pre-selected swatch. Defaults to the type default. */
  defaultColorKey?: ColorKey;
  /** Custom size run. Defaults to the type size run. */
  sizes?: ReadonlyArray<string>;
};

function order(item: string): string {
  return whatsappOrderLink(`Hi! I'd like to order the ${item}.`);
}

/**
 * Factory that turns a lean draft into a fully-formed Product, filling
 * in colours, default colour, sizes, the fabric detail line, the
 * WhatsApp order link and — for unisex pieces — a "Unisex" tag.
 */
function defineProduct(draft: ProductDraft, collection: Collection): Product {
  const defaults = TYPE_DEFAULTS[draft.type];
  const colorKeys = draft.colorKeys ?? defaults.colors;
  const colors = colorKeys.map((k) => COLORS[k]);
  const defaultColorKey = draft.defaultColorKey ?? defaults.defaultColor;
  const sizes = draft.sizes ?? defaults.sizes;

  // Auto-prepend the fabric line unless the product already states it.
  const details = draft.details.some((d) => /gsm|cotton|fleece/i.test(d))
    ? draft.details
    : [defaults.fabric, ...draft.details];

  // Unisex pieces get a "Unisex" tag automatically (unless already tagged).
  const tag =
    draft.tag ?? (collection === "unisex" && !draft.comingSoon ? "Unisex" : undefined);

  const { colorKeys: _ck, defaultColorKey: _dk, ...rest } = draft;
  return {
    ...rest,
    collection,
    tag,
    image: draft.image ?? "",
    imageAlt: draft.imageAlt ?? draft.name,
    colors,
    defaultColor: COLORS[defaultColorKey].name,
    defaultColorKey,
    sizes,
    details,
    orderHref: draft.comingSoon
      ? whatsappOrderLink(`Hi! Please notify me when the ${draft.name} drops.`)
      : order(draft.name),
  };
}

/** Builds every product in a section, stamping the collection for you. */
function inCollection(
  collection: Collection,
  drafts: ReadonlyArray<ProductDraft>,
): ReadonlyArray<Product> {
  return drafts.map((d) => defineProduct(d, collection));
}

// ── HOMME · Men ────────────────────────────────────────────────────
const homme = inCollection("homme", [
  {
    slug: "ng-barcode-tee-i",
    name: "NG Barcode Tee I",
    subtitle: "Heavyweight Cotton",
    price: "R 500",
    priceValue: 500,
    type: "tee",
    motif: "barcode",
    tag: "New",
    image: "/assets/Product 1.jpg",
    imageAlt:
      "Notre Gemme Barcode Tee I — heavyweight cotton with navy and acid-green barcode graphic",
    featured: true,
    description:
      "The debut tee of SS2026. A full-back barcode graphic in deep navy and acid green, framing a hand-illustrated figure pushing a cart of currency — a reminder that humanity, not commerce, is the treasure.",
    details: [
      "Boxy oversized fit",
      "Screen-printed full back graphic",
      "Embroidered NG gem on left sleeve",
    ],
  },
  {
    slug: "ng-barcode-tee-ii",
    name: "NG Barcode Tee II",
    subtitle: "Heavyweight Cotton",
    price: "R 500",
    priceValue: 500,
    type: "tee",
    motif: "barcode",
    image: "/assets/Product 2.jpg",
    imageAlt:
      "Notre Gemme Barcode Tee II — second iteration of the barcode graphic",
    description:
      "The second iteration of the barcode silhouette. Same heavyweight construction, restructured composition — the cart, the figure, the code, rearranged into a tighter compositional rhythm.",
    details: [
      "Boxy oversized fit",
      "Updated graphic layout with stat block",
      "Embroidered NG gem on left sleeve",
    ],
  },
  {
    slug: "evolution-hoodie",
    name: "Evolution Hoodie",
    subtitle: "Heavyweight Cotton",
    price: "R 800",
    priceValue: 800,
    type: "hoodie",
    motif: "heart",
    tag: "Launch",
    image: "/assets/Hoodie front.png",
    imageAlt: "Notre Gemme Evolution Hoodie — front view",
    imageBack: "/assets/Hoodie back.png",
    imageBackAlt:
      "Notre Gemme Evolution Hoodie — back view with circular 'Love Doesn't Vanish, It Evolves' graphic and anatomical heart",
    description:
      "Our debut hoodie. A circular composition — anatomical heart at centre, butterfly and rose flanking, 'Love doesn't vanish, it evolves' wrapping the form. Heavyweight cotton, drop shoulder, kangaroo pocket.",
    details: [
      "Drop-shoulder oversized fit",
      "Discharge-print circular back graphic",
      "Tonal flat drawcords",
    ],
  },
  {
    slug: "king-of-hearts-tee",
    name: "King of Hearts Tee",
    subtitle: "Heavyweight Cotton — White",
    price: "R 500",
    priceValue: 500,
    type: "tee",
    motif: "suits",
    colorKeys: ["white"],
    // No photo yet — branded placeholder shows until you add `image`.
    imageAlt: "Notre Gemme King of Hearts Tee — white, playing-card suits motif",
    description:
      "The King. Playing-card motif on heavyweight white cotton — the masculine answer to the Queen across the deck.",
    sizes: ["S", "M", "L", "XL", "2XL"],
    details: [
      "Boxy fit",
      "Discharge-print graphic for soft hand-feel",
      "Embroidered NG gem on left sleeve",
    ],
  },
]);

// ── FEMME · Women ──────────────────────────────────────────────────
const femme = inCollection("femme", [
  {
    slug: "queen-of-hearts-tee",
    name: "Queen of Hearts Tee",
    subtitle: "Heavyweight Cotton — White",
    price: "R 500",
    priceValue: 500,
    type: "tee",
    motif: "suits",
    colorKeys: ["white"],
    featured: true,
    // No photo yet — branded placeholder shows until you add `image`.
    imageAlt: "Notre Gemme Queen of Hearts Tee — white, playing-card suits motif",
    description:
      "The Femme signature. Playing-card motif on heavyweight white cotton, cut for a softer drape. The Queen sits at centre — sovereign, calm, untouchable.",
    sizes: ["XS", "S", "M", "L", "XL"],
    details: [
      "Cropped boxy fit with extended hem",
      "Discharge-print graphic for soft hand-feel",
      "Embroidered NG gem on left sleeve",
    ],
  },
]);

// ── UNISEX · For everyone (auto-tagged "Unisex") ───────────────────
const unisex = inCollection("unisex", [
  {
    slug: "rooted-in-humanity",
    name: "Rooted in Humanity",
    subtitle: "Heavyweight Cotton — Grey",
    price: "R 500",
    priceValue: 500,
    type: "tee",
    motif: "heart",
    colorKeys: ["grey"],
    defaultColorKey: "grey",
    // No photo yet — branded placeholder shows until you add `image`.
    imageAlt: "Notre Gemme Rooted in Humanity tee — grey, unisex cut",
    description:
      "A unisex statement piece in heather grey. Rooted in our founding belief — humanity is the rarest gem of all. Worn by whoever the silhouette serves.",
    details: [
      "Unisex relaxed fit",
      "Discharge-print graphic for soft hand-feel",
      "Embroidered NG gem on left sleeve",
    ],
  },
]);

export const products: ReadonlyArray<Product> = [...homme, ...femme, ...unisex];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function productsByCollection(
  collection: Collection,
): ReadonlyArray<Product> {
  return products.filter((p) => p.collection === collection);
}

export const upcomingProducts: ReadonlyArray<Product> = products.filter(
  (p) => p.comingSoon === true,
);
