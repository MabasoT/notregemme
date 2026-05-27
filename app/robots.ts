import type { MetadataRoute } from "next";

/**
 * Next.js robots.txt generator — auto-produces /robots.txt
 * Tells Google and other crawlers which pages to index
 * and where to find the sitemap.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://notregemmestudios.co.za/sitemap.xml",
  };
}
