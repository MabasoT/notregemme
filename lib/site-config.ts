/**
 * Centralised site configuration.
 * Single source of truth for brand metadata, contact, navigation and URLs.
 * Copy lives in lib/content.ts; products in lib/products.ts.
 */

/**
 * Canonical production origin, without a trailing slash. Overridable per
 * environment (e.g. a Vercel preview) via NEXT_PUBLIC_SITE_URL so canonical
 * tags, sitemap and JSON-LD always point at the domain being served.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://notregemme.co.za"
).replace(/\/+$/, "");

/**
 * Date the static page copy last changed. Drives sitemap <lastmod>.
 * Bump it when page content changes — never use `new Date()` per build,
 * or Google stops trusting the sitemap's lastmod values.
 */
export const CONTENT_UPDATED = "2026-10-16";

export const siteConfig = {
  brand: {
    name: "Notre Gemme",
    legalName: "Notre Gemme",
    short: "NG",
    tagline: "Humanity, Our Treasure.",
    season: "SS2026",
    seasonLong: "Spring/Summer 2026",
    nextSeason: "AW2026",
    country: "South Africa",
    countryCode: "ZA",
    /** Tembisa postal code — the brand's "founding code". */
    originCode: "1632",
    foundingYear: "2026",
    description:
      "Luxury minimalist streetwear from Tembisa, South Africa. Heavyweight cotton hoodies and tees — every piece a translation of feeling into form.",
  },
  address: {
    locality: "Tembisa",
    region: "Gauteng",
    postalCode: "1632",
    country: "ZA",
  },
  contact: {
    whatsapp: "+27 75 276 3672",
    whatsappE164: "27752763672",
    instagram: "notregemme",
    instagramUrl: "https://www.instagram.com/notregemme",
    email: "hello@notregemme.co.za",
  },
  built: {
    name: "Mabaso Dev & AI",
    tagline: "The Digital Alchemist",
    url: "https://mabasodevai.co.za",
  },
  drop: {
    /**
     * ISO date of the next drop (e.g. "2027-03-01T00:00:00+02:00").
     * Leave empty until the date is confirmed — the countdown then shows
     * "Date announced soon" instead of a fake timer.
     */
    nextDropDate: "",
  },
  nav: {
    left: [
      { label: "Home", href: "/" },
      { label: "Story", href: "/story" },
      { label: "Homme", href: "/homme" },
      { label: "Femme", href: "/femme" },
    ],
    right: [
      { label: "Unisex", href: "/unisex" },
      { label: "Upcoming", href: "/upcoming" },
      { label: "Contact", href: "/contact" },
    ],
  },
} as const;

/** Default WhatsApp greeting used by generic "Order" buttons. */
export const DEFAULT_ORDER_MESSAGE = "Hi Notre Gemme! I'd like to place an order.";

/**
 * Builds a pre-filled WhatsApp deeplink to the brand's order line.
 *
 * @param message - plain-text message to pre-fill (URL-encoded here)
 * @returns wa.me URL, e.g. "https://wa.me/2775…?text=Hi%21…"
 */
export function whatsappOrderLink(message: string): string {
  return `https://wa.me/${siteConfig.contact.whatsappE164}?text=${encodeURIComponent(message)}`;
}

/**
 * Turns a site-relative path into an absolute URL on the canonical origin.
 *
 * @param path - path starting with "/", e.g. "/homme"; "/" maps to the origin
 * @returns absolute URL, e.g. "https://notregemme.co.za/homme"
 */
export function absoluteUrl(path: string): string {
  if (path === "/" || path === "") return SITE_URL;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
