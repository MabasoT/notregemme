import type { Metadata } from "next";
import { pageMeta } from "./content";
import { siteConfig } from "./site-config";

type PageKey = keyof typeof pageMeta;

/**
 * Site-wide 1200×630 OG image (app/opengraph-image.tsx). Listed explicitly
 * because a route that sets its own openGraph loses the inherited image.
 */
export const DEFAULT_OG_IMAGE = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: `${siteConfig.brand.name} — ${siteConfig.brand.tagline}`,
} as const;

/**
 * Builds complete route metadata (title, description, canonical, Open
 * Graph, Twitter) from lib/content.ts. Next replaces — not merges — a
 * parent's openGraph object, so every route must send the full set.
 *
 * @param key - entry in pageMeta, e.g. "homme"
 * @param path - canonical site-relative path, e.g. "/homme"
 * @returns Metadata for the route's `export const metadata`
 * @example
 *   export const metadata = pageMetadata("homme", "/homme");
 */
export function pageMetadata(key: PageKey, path: string): Metadata {
  const { title, description } = pageMeta[key];
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: siteConfig.brand.name,
      locale: "en_ZA",
      url: path,
      title,
      description,
      images: [DEFAULT_OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [DEFAULT_OG_IMAGE.url],
    },
  };
}
