/**
 * Centralised site configuration.
 * Single source of truth for brand metadata, contact, navigation, social.
 */
export const siteConfig = {
    brand: {
          name: "Notre Gemme Studios",
          short: "Notre Gemme",
          tagline: "Humanity, Our Treasure.",
          season: "SS2026",
          seasonLong: "Spring/Summer 2026",
          nextSeason: "AW2026",
          country: "South Africa",
          countryCode: "ZA",
          founded: "1632",
          description:
                  "Luxury minimalist streetwear from South Africa. Every piece is a translation of feeling into form.",
    },
    contact: {
          whatsapp: "+27 75 276 3672",
          whatsappE164: "27752763672",
          instagram: "notregemme",
          instagramUrl: "https://www.instagram.com/notregemme?igsh=aHMzanh6aG1zbjF1",
          email: "hello@notregemmestudios.co.za",
    },
    built: {
          name: "Mabaso Dev & AI",
          short: "Mabaso Dev AI",
          tagline: "The Digital Alchemist",
          url: "https://mabasodevai.co.za",
          fullLine: "Digital footprint by Mabaso Dev AI – The Digital Alchemist",
    },
    drop: {
          nextDropDate: "2026-09-01T00:00:00",
    },
    nav: {
          left: [
            { label: "Home", href: "/" },
            { label: "Story", href: "/#story" },
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

/** Build a pre-filled WhatsApp deeplink. */
export function whatsappOrderLink(message: string): string {
    return `https://wa.me/${siteConfig.contact.whatsappE164}?text=${encodeURIComponent(message)}`;
}

/**
 * Asset URL helper. When the site is hosted under a sub-path (e.g.
 * GitHub Pages at /notregemme/), every absolute /asset path needs the
 * sub-path prepended. Pass any public-folder path here:
 *
 *   asset("/assets/logo.png") → "/notregemme/assets/logo.png" on GH Pages
 *   asset("/assets/logo.png") → "/assets/logo.png" on Vercel root
 *
 * Required because `next/image` with `unoptimized: true` skips Next's
 * built-in basePath rewriter on the rendered <img src>.
 */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function asset(path: string): string {
    if (!path) return path;
    if (path.startsWith("http://") || path.startsWith("https://")) return path;
    if (!path.startsWith("/")) return path;
    return `${BASE_PATH}${path}`;
}
