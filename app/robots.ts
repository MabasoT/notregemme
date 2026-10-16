import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site-config";

/** AI crawlers explicitly allowed so the brand can be cited in AI answers. */
const AI_CRAWLERS = [
  "GPTBot",
  "OAI-SearchBot",
  "ClaudeBot",
  "anthropic-ai",
  "PerplexityBot",
  "Google-Extended",
  "CCBot",
] as const;

/**
 * /robots.txt — allow every crawler, name the major AI crawlers explicitly
 * (GEO strategy), keep API routes out of the index, and point at the sitemap.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: "/api/" },
      ...AI_CRAWLERS.map((userAgent) => ({ userAgent, allow: "/" })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
