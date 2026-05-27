import type { MetadataRoute } from "next";

/**
 * Next.js sitemap generator — auto-produces /sitemap.xml
 * Google uses this to discover and crawl all pages.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://notregemmestudios.co.za";

  return [
    {
      url: baseUrl + "/",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: baseUrl + "/story/",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: baseUrl + "/homme/",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: baseUrl + "/femme/",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: baseUrl + "/unisex/",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: baseUrl + "/upcoming/",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: baseUrl + "/contact/",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];
}
