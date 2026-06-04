/**
 * Product catalogue. Each product is referenced by slug.
 * Image paths point to /public — if the file isn't present, the
 * <ProductImage> component renders a brand-styled placeholder.
 *
 * ──────────────────────────────────────────────────────────────────
 *  HOW TO ADD A PRODUCT (no copy-paste card coding required)
 * ──────────────────────────────────────────────────────────────────
 *  Add one entry to the `catalogue` array below and pass it through
 *  `defineProduct({...})`. Set `type` to "hoodie" | "tee" | "cap" and
 *  the correct colour swatches + size run are filled in automatically.
 *  A product card, a detail page, sitemap entry, and structured data
 *  are all generated for you — nothing else to wire up.
 *
 *  Override anything per-product:
 *    colorKeys:      ["white", "black"]   // restrict / reorder colours
 *    defaultColorKey:"black"               // pre-selected swatch
 *    sizes:          ["S", "M", "L"]       // custom size run
 *
 *  See docs/EDITING-GUIDE.md for the full walkthrough.
 * ──────────────────────────────────────────────────────────────────
 */
import { whatsappOrderLink } from "./site-config";

export type Tag = "New" | "Launch" | "Signature" | "Coming Soon" | "Unisex";

/** Garment family. Drives the default colour palette + size run. */
export type ProductType = "hoodie" | "tee" | "cap";

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
 * What colours + sizes a product gets automatically based on its
 * `type`. Change these to update every product of that type at once.
 */
export const TYPE_DEFAULTS: Record<
  ProductType,
  { colors: ReadonlyArray<ColorKey>; defaultColor: ColorKey; sizes: ReadonlyArray<string> }
> = {
  hoodie: {
    colors: ["white", "black", "grey", "cream"],
    defaultColor: "white",
    sizes: ["S", "M", "L", "XL", "2XL"],
  },
  tee: {
    colors: ["white", "black", "grey", "brown"],
    defaultColor: "white",
    sizes: ["S", "M", "L", "XL", "2XL", "3XL"],
  },
  cap: {
    colors: ["white", "blue", "purple"],
    defaultColor: "white",
    sizes: ["One Size"],
  },
};

export type Product = {
  slug: string;
  name: string;
  subtitle: string;
  price: string;
  priceValue: number;
  collection: "homme" | "femme" | "unisex";
  /** Garment family — drives default colours & sizes. */
  type: ProductType;
  motif: "barcode" | "suits" | "heart";
  tag?: Tag;
  image: string;
  imageAlt: string;
  /** Optional secondary view (e.g. hoodie back). */
  imageBack?: string;
  imageBackAlt?: string;
  featured?: boolean;
  comingSoon?: boolean;
  /** Pre-built WhatsApp order link with item context. */
  orderHref: string;
  /** Long description for product detail page. */
  description: string;
  /** Selectable colours (resolved from COLORS). */
  colors: ReadonlyArray<ColorOption>;
  /** Pre-selected colour name. */
  defaultColor: string;
  /** Available sizes. */
  sizes: ReadonlyArray<string>;
  /** Material / construction details. */
  details: ReadonlyArray<string>;
};

/** The minimum a new product needs — everything else is derived. */
type ProductDraft = Omit<
  Product,
  "colors" | "defaultColor" | "sizes" | "orderHref"
> & {
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
 * in colours, default colour, sizes and the WhatsApp order link from
 * the garment `type`. This is what makes "add a product = add one
 * object" possible — no card markup to copy.
 */
function defineProduct(draft: ProductDraft): Product {
  const defaults = TYPE_DEFAULTS[draft.type];
  const colorKeys = draft.colorKeys ?? defaults.colors;
  const colors = colorKeys.map((k) => COLORS[k]);
  const defaultColorKey = draft.defaultColorKey ?? defaults.defaultColor;
  const sizes = draft.sizes ?? defaults.sizes;

  const { colorKeys: _ck, defaultColorKey: _dk, ...rest } = draft;
  return {
    ...rest,
    colors,
    defaultColor: COLORS[defaultColorKey].name,
    sizes,
    orderHref: draft.comingSoon
      ? whatsappOrderLink(`Hi! Please notify me when the ${draft.name} drops.`)
      : order(draft.name),
  };
}

export const products: ReadonlyArray<Product> = [
  defineProduct({
    slug: "ng-barcode-tee-i",
    name: "NG Barcode Tee I",
    subtitle: "Heavyweight Cotton",
    price: "R 500",
    priceValue: 500,
    collection: "homme",
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
      "240gsm heavyweight cotton",
      "Boxy oversized fit",
      "Screen-printed full back graphic",
      "Embroidered NG gem on left sleeve",
    ],
  }),
  defineProduct({
    slug: "ng-barcode-tee-ii",
    name: "NG Barcode Tee II",
    subtitle: "Heavyweight Cotton",
    price: "R 500",
    priceValue: 500,
    collection: "homme",
    type: "tee",
    motif: "barcode",
    image: "/assets/Product 2.jpg",
    imageAlt:
      "Notre Gemme Barcode Tee II — second iteration of the barcode graphic",
    description:
      "The second iteration of the barcode silhouette. Same heavyweight construction, restructured composition — the cart, the figure, the code, rearranged into a tighter compositional rhythm.",
    details: [
      "240gsm heavyweight cotton",
      "Boxy oversized fit",
      "Updated graphic layout with stat block",
      "Embroidered NG gem on left sleeve",
    ],
  }),
  defineProduct({
    slug: "evolution-hoodie",
    name: "Evolution Hoodie",
    subtitle: "Brushed Fleece",
    price: "R 800",
    priceValue: 800,
    collection: "homme",
    type: "hoodie",
    motif: "heart",
    tag: "Launch",
    image: "/assets/Hoodie front.png",
    imageAlt: "Notre Gemme Evolution Hoodie — front view, heather white fleece",
    imageBack: "/assets/Hoodie back.png",
    imageBackAlt:
      "Notre Gemme Evolution Hoodie — back view with circular 'Love Doesn't Vanish, It Evolves' graphic and anatomical heart",
    description:
      "Our debut hoodie. A circular composition — anatomical heart at centre, butterfly and rose flanking, 'Love doesn't vanish, it evolves' wrapping the form. Heavyweight brushed fleece interior, drop shoulder, kangaroo pocket.",
    details: [
      "400gsm brushed fleece interior",
      "Drop-shoulder oversized fit",
      "Discharge-print circular back graphic",
      "Tonal flat drawcords",
    ],
  }),
  defineProduct({
    slug: "queen-of-hearts-tee",
    name: "Queen of Hearts Tee",
    subtitle: "Heavyweight Cotton",
    price: "R 500",
    priceValue: 500,
    collection: "femme",
    type: "tee",
    motif: "suits",
    image: "",
    imageAlt:
      "Notre Gemme Queen of Hearts Tee — heavyweight cotton with playing-card suits motif",
    featured: true,
    description:
      "The Femme signature. Playing-card motifs reimagined for a softer cut and longer drape. The Queen sits at centre — sovereign, calm, untouchable.",
    sizes: ["XS", "S", "M", "L", "XL"],
    details: [
      "220gsm heavyweight cotton",
      "Cropped boxy fit with extended hem",
      "Discharge-print graphic for soft hand-feel",
      "Embroidered NG gem on left sleeve",
    ],
  }),
  defineProduct({
    slug: "king-of-hearts-tee",
    name: "King of Hearts Tee",
    subtitle: "Heavyweight Cotton",
    price: "R 500",
    priceValue: 500,
    collection: "femme",
    type: "tee",
    motif: "suits",
    image: "",
    imageAlt:
      "Notre Gemme King of Hearts Tee — companion to the Queen design",
    description:
      "Companion to the Queen. Same fabric, same construction, mirrored composition — the King answers the Queen across the deck.",
    sizes: ["XS", "S", "M", "L", "XL"],
    details: [
      "220gsm heavyweight cotton",
      "Cropped boxy fit with extended hem",
      "Discharge-print graphic for soft hand-feel",
      "Embroidered NG gem on left sleeve",
    ],
  }),
  defineProduct({
    slug: "femme-hoodie",
    name: "Femme Hoodie",
    subtitle: "Fleece — Coming SS2026",
    price: "—",
    priceValue: 0,
    collection: "femme",
    type: "hoodie",
    motif: "heart",
    tag: "Coming Soon",
    image: "",
    imageAlt: "Notre Gemme Femme Hoodie — coming soon teaser",
    comingSoon: true,
    description:
      "The counterpart to our debut Evolution piece. Arriving later in SS2026. Add your email to the notify list or message us on WhatsApp.",
    sizes: ["XS", "S", "M", "L", "XL"],
    details: [
      "Brushed fleece interior",
      "Cropped fit",
      "Tonal drawcords",
      "Embroidered NG gem",
    ],
  }),
  defineProduct({
    slug: "archive-piece",
    name: "The Archive Piece",
    subtitle: "Unisex — Coming AW2026",
    price: "—",
    priceValue: 0,
    collection: "unisex",
    type: "tee",
    motif: "barcode",
    tag: "Coming Soon",
    image: "/assets/Product 1.jpg",
    imageAlt:
      "The Archive Piece — unisex reinterpretation of the original barcode graphic",
    comingSoon: true,
    description:
      "A reinterpretation of the original SS2026 barcode graphic for the AW2026 season. Unisex cut, longer drape, deeper dye lot.",
    sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL"],
    details: [
      "260gsm heavyweight cotton",
      "Unisex oversized fit",
      "Reworked back graphic",
      "Tonal NG gem embroidery",
    ],
  }),
  defineProduct({
    slug: "evolution-ii",
    name: "Evolution II",
    subtitle: "Unisex — Coming AW2026",
    price: "—",
    priceValue: 0,
    collection: "unisex",
    type: "hoodie",
    motif: "heart",
    tag: "Coming Soon",
    image: "/assets/Hoodie back.png",
    imageAlt: "Evolution II — sequel to the Love Evolves heart motif",
    comingSoon: true,
    description:
      "The sequel to our love motif. Same circular composition, new central icon, deeper season palette. Unisex cut.",
    details: [
      "400gsm brushed fleece interior",
      "Unisex drop-shoulder fit",
      "Discharge-print circular back graphic",
      "Tonal flat drawcords",
    ],
  }),
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function productsByCollection(
  collection: "homme" | "femme" | "unisex",
): ReadonlyArray<Product> {
  return products.filter((p) => p.collection === collection);
}

export const upcomingProducts: ReadonlyArray<Product> = products.filter(
  (p) => p.comingSoon === true,
);
