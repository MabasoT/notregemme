import type { MetadataRoute } from "next";

// Required for Next.js static export (output: "export") — tells the
// static export pipeline that this route is pre-renderable at build time.
export const dynamic = "force-static";

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
