import type { Metadata } from "next";
import { BrandStory } from "@/components/BrandStory";
import { JsonLd } from "@/components/JsonLd";
import { pageMeta } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbSchema, webPageSchema } from "@/lib/schema";

export const metadata: Metadata = pageMetadata("story", "/story");

/**
 * /story — the brand story as a standalone, indexable page (the home page
 * shows the same section further down).
 */
export default function StoryPage(): React.ReactElement {
  return (
    <div className="pt-[100px]">
      <JsonLd data={webPageSchema("AboutPage", pageMeta.story.title, pageMeta.story.description, "/story")} />
      <JsonLd data={breadcrumbSchema([{ name: "Our Story", path: "/story" }])} />
      <BrandStory headingLevel="h1" />
    </div>
  );
}
