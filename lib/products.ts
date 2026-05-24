/**
 * Product catalogue. Each product is referenced by slug.
 * Image paths point to /public — if the file isn't present, the
 * <ProductImage> component renders a brand-styled placeholder.
 */
import { whatsappOrderLink } from "./site-config";

export type Tag = "New" | "Launch" | "Signature" | "Coming Soon" | "Unisex";

export type Product = {
  slug: string;
  name: string;
  subtitle: string;
  price: string;
  priceValue: number;
  collection: "homme" | "femme" | "unisex";
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
  /** Available sizes. */
  sizes: ReadonlyArray<string>;
  /** Material / construction details. */
  details: ReadonlyArray<string>;
};

function order(item: string): string {
  return whatsappOrderLink(`Hi! I'd like to order the ${item}.`);
}

export const products: ReadonlyArray<Product> = [
  {
    slug: "ng-barcode-tee-i",
    name: "NG Barcode Tee I",
    subtitle: "Heavyweight Cotton — Cream",
    price: "R 850",
    priceValue: 850,
    collection: "homme",
    motif: "barcode",
    tag: "New",
    image: "/assets/Product 1.jpg",
    imageAlt: "Notre Gemme Barcode Tee I — cream heavyweight cotton with navy and acid-green barcode graphic",
    featured: true,
    orderHref: order("NG Barcode Tee I"),
    description:
      "The debut tee of SS2026. A full-back barcode graphic in deep navy and acid green, framing a hand-illustrated figure pushing a cart of currency — a reminder that humanity, not commerce, is the treasure.",
    sizes: ["S", "M", "L", "XL", "2XL", "3XL"],
    details: [
      "240gsm heavyweight cotton",
      "Boxy oversized fit",
      "Screen-printed full back graphic",
      "Embroidered NG gem on left sleeve",
    ],
  },
  {
    slug: "ng-barcode-tee-ii",
    name: "NG Barcode Tee II",
    subtitle: "Heavyweight Cotton — Cream",
    price: "R 850",
    priceValue: 850,
    collection: "homme",
    motif: "barcode",
    image: "/assets/Product 2.jpg",
    imageAlt: "Notre Gemme Barcode Tee II — second iteration of the barcode graphic in cream",
    orderHref: order("NG Barcode Tee II"),
    description:
      "The second iteration of the barcode silhouette. Same heavyweight construction, restructured composition — the cart, the figure, the code, rearranged into a tighter compositional rhythm.",
    sizes: ["S", "M", "L", "XL", "2XL", "3XL"],
    details: [
      "240gsm heavyweight cotton",
      "Boxy oversized fit",
      "Updated graphic layout with stat block",
      "Embroidered NG gem on left sleeve",
    ],
  },
  {
    slug: "evolution-hoodie",
    name: "Evolution Hoodie",
    subtitle: "Fleece — Heather White",
    price: "R 1 450",
    priceValue: 1450,
    collection: "homme",
    motif: "heart",
    tag: "Launch",
    image: "/assets/Hoodie front.png",
    imageAlt: "Notre Gemme Evolution Hoodie — front view, heather white fleece",
    imageBack: "/assets/Hoodie back.png",
    imageBackAlt: "Notre Gemme Evolution Hoodie — back view with circular 'Love Doesn't Vanish, It Evolves' graphic and anatomical heart",
    orderHref: order("Evolution Hoodie"),
    description:
      "Our debut hoodie. A circular composition — anatomical heart at centre, butterfly and rose flanking, 'Love doesn't vanish, it evolves' wrapping the form. Heavyweight brushed fleece interior, drop shoulder, kangaroo pocket.",
    sizes: ["S", "M", "L", "XL", "2XL"],
    details: [
      "400gsm brushed fleece interior",
      "Drop-shoulder oversized fit",
      "Discharge-print circular back graphic",
      "Tonal flat drawcords",
    ],
  },
  {
    slug: "queen-of-hearts-tee",
    name: "Queen of Hearts Tee",
    subtitle: "Heavyweight Cotton — White",
    price: "R 900",
    priceValue: 900,
    collection: "femme",
    motif: "suits",
    tag: "Signature",
    image: "/assets/img-01.jpg",
    imageAlt: "Notre Gemme Queen of Hearts Tee — white heavyweight cotton with playing-card suits motif",
    featured: true,
    orderHref: order("Queen of Hearts Tee"),
    description:
      "The Femme signature. Playing-card motifs reimagined for a softer cut and longer drape. The Queen sits at centre — sovereign, calm, untouchable.",
    sizes: ["XS", "S", "M", "L", "XL"],
    details: [
      "220gsm heavyweight cotton",
      "Cropped boxy fit with extended hem",
      "Discharge-print graphic for soft hand-feel",
      "Embroidered NG gem on left sleeve",
    ],
  },
  {
    slug: "king-of-hearts-tee",
    name: "King of Hearts Tee",
    subtitle: "Heavyweight Cotton — White",
    price: "R 900",
    priceValue: 900,
    collection: "femme",
    motif: "suits",
    image: "/assets/img-04.jpg",
    imageAlt: "Notre Gemme King of Hearts Tee — white heavyweight cotton, companion to the Queen design",
    orderHref: order("King of Hearts Tee"),
    description:
      "Companion to the Queen. Same fabric, same construction, mirrored composition — the King answers the Queen across the deck.",
    sizes: ["XS", "S", "M", "L", "XL"],
    details: [
      "220gsm heavyweight cotton",
      "Cropped boxy fit with extended hem",
      "Discharge-print graphic for soft hand-feel",
      "Embroidered NG gem on left sleeve",
    ],
  },
  {
    slug: "femme-hoodie",
    name: "Femme Hoodie",
    subtitle: "Fleece — Coming SS2026",
    price: "—",
    priceValue: 0,
    collection: "femme",
    motif: "heart",
    tag: "Coming Soon",
    image: "/assets/img-03.jpg",
    imageAlt: "Notre Gemme Femme Hoodie — coming soon teaser",
    comingSoon: true,
    orderHref: whatsappOrderLink("Hi! Please notify me when the Femme Hoodie drops."),
    description:
      "The counterpart to our debut Evolution piece. Arriving later in SS2026. Add your email to the notify list or message us on WhatsApp.",
    sizes: ["XS", "S", "M", "L", "XL"],
    details: ["Brushed fleece interior", "Cropped fit", "Tonal drawcords", "Embroidered NG gem"],
  },
  {
    slug: "archive-piece",
    name: "The Archive Piece",
    subtitle: "Unisex — Coming AW2026",
    price: "—",
    priceValue: 0,
    collection: "unisex",
    motif: "barcode",
    tag: "Coming Soon",
    image: "/assets/Product 1.jpg",
    imageAlt: "The Archive Piece — unisex reinterpretation of the original barcode graphic",
    comingSoon: true,
    orderHref: whatsappOrderLink("Hi! Please notify me when The Archive Piece drops."),
    description:
      "A reinterpretation of the original SS2026 barcode graphic for the AW2026 season. Unisex cut, longer drape, deeper dye lot.",
    sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL"],
    details: [
      "260gsm heavyweight cotton",
      "Unisex oversized fit",
      "Reworked back graphic",
      "Tonal NG gem embroidery",
    ],
  },
  {
    slug: "evolution-ii",
    name: "Evolution II",
    subtitle: "Unisex — Coming AW2026",
    price: "—",
    priceValue: 0,
    collection: "unisex",
    motif: "heart",
    tag: "Coming Soon",
    image: "/assets/Hoodie back.png",
    imageAlt: "Evolution II — sequel to the Love Evolves heart motif",
    comingSoon: true,
    orderHref: whatsappOrderLink("Hi! Please notify me when Evolution II drops."),
    description:
      "The sequel to our love motif. Same circular composition, new central icon, deeper season palette. Unisex cut.",
    sizes: ["S", "M", "L", "XL", "2XL"],
    details: [
      "400gsm brushed fleece interior",
      "Unisex drop-shoulder fit",
      "Discharge-print circular back graphic",
      "Tonal flat drawcords",
    ],
  },
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
