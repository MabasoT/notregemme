import type { MetadataRoute } from "next";
import { products } from "@/lib/products";
import { CONTENT_UPDATED, absoluteUrl } from "@/lib/site-config";

type Frequency = MetadataRoute.Sitemap[number]["changeFrequency"];

/** Static routes with crawl hints, highest priority first. */
const STATIC_ROUTES: ReadonlyArray<{
  path: string;
  changeFrequency: Frequency;
  priority: number;
}> = [
  { path: "/", changeFrequency: "weekly", priority: 1.0 },
  { path: "/collection", changeFrequency: "weekly", priority: 0.9 },
  { path: "/homme", changeFrequency: "weekly", priority: 0.9 },
  { path: "/femme", changeFrequency: "weekly", priority: 0.9 },
  { path: "/unisex", changeFrequency: "weekly", priority: 0.9 },
  { path: "/upcoming", changeFrequency: "weekly", priority: 0.7 },
  { path: "/story", changeFrequency: "monthly", priority: 0.7 },
  { path: "/about", changeFrequency: "monthly", priority: 0.7 },
  { path: "/contact", changeFrequency: "monthly", priority: 0.6 },
];

/**
 * /sitemap.xml — every canonical 200 URL, including each product page.
 * lastModified is the truthful CONTENT_UPDATED date, never "now".
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date(CONTENT_UPDATED);
  return [
    ...STATIC_ROUTES.map((route) => ({
      url: absoluteUrl(route.path),
      lastModified,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })),
    ...products.map((product) => ({
      url: absoluteUrl(`/product/${product.slug}`),
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];
}
