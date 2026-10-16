/**
 * Schema.org JSON-LD builders. Every page's structured data comes from
 * here so URLs, brand names and offers can never drift between pages.
 * Output is serialized server-side by <JsonLd> — never pass user input.
 */
import { COLLECTION_LABELS, type Product } from "./products";
import { getStock, isSoldOut } from "./stock";
import { SITE_URL, absoluteUrl, siteConfig } from "./site-config";

/** Loose JSON-LD node; schema.org shapes are too varied to type fully. */
export type JsonLdNode = Record<string, unknown>;

/** One crumb in a BreadcrumbList, as a site-relative path. */
export interface Crumb {
  name: string;
  path: string;
}

const LOGO_URL = absoluteUrl("/assets/logo-notregemme.png");
const OG_IMAGE_URL = absoluteUrl("/opengraph-image");

const POSTAL_ADDRESS: JsonLdNode = {
  "@type": "PostalAddress",
  addressLocality: siteConfig.address.locality,
  addressRegion: siteConfig.address.region,
  postalCode: siteConfig.address.postalCode,
  addressCountry: siteConfig.address.country,
};

/**
 * Organization JSON-LD for the brand. Rendered once in the root layout so
 * every page carries the entity Google and AI answer engines cite.
 *
 * @returns schema.org Organization node
 */
export function organizationSchema(): JsonLdNode {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: siteConfig.brand.name,
    legalName: siteConfig.brand.legalName,
    url: SITE_URL,
    logo: LOGO_URL,
    image: OG_IMAGE_URL,
    slogan: siteConfig.brand.tagline,
    description: siteConfig.brand.description,
    address: POSTAL_ADDRESS,
    email: siteConfig.contact.email,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: siteConfig.contact.whatsapp,
      email: siteConfig.contact.email,
      contactType: "customer service",
      areaServed: siteConfig.brand.countryCode,
      availableLanguage: "English",
    },
    sameAs: [siteConfig.contact.instagramUrl],
  };
}

/**
 * WebSite JSON-LD for the home page.
 *
 * @returns schema.org WebSite node linked to the Organization
 */
export function websiteSchema(): JsonLdNode {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: siteConfig.brand.name,
    url: SITE_URL,
    inLanguage: "en-ZA",
    publisher: { "@id": `${SITE_URL}/#organization` },
  };
}

/**
 * BreadcrumbList JSON-LD. "Home" is prepended automatically.
 *
 * @param crumbs - trail after Home, e.g. [{ name: "Homme", path: "/homme" }]
 * @returns schema.org BreadcrumbList node
 */
export function breadcrumbSchema(crumbs: ReadonlyArray<Crumb>): JsonLdNode {
  const trail = [{ name: "Home", path: "/" }, ...crumbs];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  };
}

/**
 * Absolute image URL for a product, falling back to the brand OG image
 * while photography is pending (Google requires an image on Product).
 */
function productImageUrl(product: Product): string {
  return product.image ? absoluteUrl(product.image) : OG_IMAGE_URL;
}

/** Offer availability derived from the live catalogue + stock data. */
function availability(product: Product): string {
  if (product.comingSoon) return "https://schema.org/PreOrder";
  return isSoldOut(getStock(product.slug))
    ? "https://schema.org/OutOfStock"
    : "https://schema.org/InStock";
}

/**
 * Product JSON-LD with a ZAR Offer — the key signal for Google Shopping
 * surfaces and AI shopping answers.
 *
 * @param product - catalogue entry from lib/products.ts
 * @param withContext - false when nested inside another node
 * @returns schema.org Product node
 */
export function productSchema(product: Product, withContext = true): JsonLdNode {
  const url = absoluteUrl(`/product/${product.slug}`);
  return {
    ...(withContext ? { "@context": "https://schema.org" } : {}),
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: productImageUrl(product),
    sku: product.slug,
    url,
    brand: { "@type": "Brand", name: siteConfig.brand.name },
    category: `${COLLECTION_LABELS[product.collection]} streetwear`,
    color: product.colors.map((c) => c.name).join(", "),
    material: product.details[0],
    offers: {
      "@type": "Offer",
      url,
      priceCurrency: "ZAR",
      price: product.priceValue,
      availability: availability(product),
      itemCondition: "https://schema.org/NewCondition",
      seller: { "@id": `${SITE_URL}/#organization` },
      shippingDetails: {
        "@type": "OfferShippingDetails",
        shippingDestination: {
          "@type": "DefinedRegion",
          addressCountry: siteConfig.brand.countryCode,
        },
      },
    },
  };
}

/**
 * CollectionPage JSON-LD listing the products on a collection route.
 *
 * @param opts.name - page name, e.g. "Homme Collection"
 * @param opts.description - one-sentence summary of the collection
 * @param opts.path - site-relative path of the page, e.g. "/homme"
 * @param opts.products - products shown on the page
 * @returns schema.org CollectionPage node with an ItemList of Products
 */
export function collectionPageSchema(opts: {
  name: string;
  description: string;
  path: string;
  products: ReadonlyArray<Product>;
}): JsonLdNode {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: opts.name,
    description: opts.description,
    url: absoluteUrl(opts.path),
    isPartOf: { "@id": `${SITE_URL}/#website` },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: opts.products.length,
      itemListElement: opts.products.map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: productSchema(p, false),
      })),
    },
  };
}

/**
 * Generic WebPage-family JSON-LD (AboutPage, ContactPage, WebPage).
 *
 * @param type - schema.org page type
 * @param name - page title
 * @param description - page summary
 * @param path - site-relative path
 * @returns schema.org page node
 */
export function webPageSchema(
  type: "WebPage" | "AboutPage" | "ContactPage",
  name: string,
  description: string,
  path: string,
): JsonLdNode {
  return {
    "@context": "https://schema.org",
    "@type": type,
    name,
    description,
    url: absoluteUrl(path),
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": `${SITE_URL}/#organization` },
  };
}
