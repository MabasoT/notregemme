import type { Metadata } from "next";
import { BrandStory } from "@/components/BrandStory";
import { JsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Our Story — Notre Gemme",
  description:
    "Notre Gemme was born from the belief that humanity is the rarest gem of all. Discover the story behind the brand — South African spirit, built different, made to endure.",
  alternates: {
    canonical: "https://notregemme.co.za/story/",
  },
};

const aboutSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "Our Story — Notre Gemme",
  description:
    "Notre Gemme was born from the belief that humanity is the rarest gem of all. Every piece we create is a translation of feeling into form.",
  url: "https://notregemme.co.za/story/",
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://notregemme.co.za/" },
      { "@type": "ListItem", position: 2, name: "Our Story", item: "https://notregemme.co.za/story/" },
    ],
  },
};

/**
 * Dedicated /story page — renders the full BrandStory section.
 * Having a real route (instead of /#story) allows Google to index
 * the brand story as a standalone page.
 */
export default function StoryPage(): React.ReactElement {
  return (
    <main className="pt-[100px]">
      <JsonLd data={aboutSchema} />
      <BrandStory />
    </main>
  );
}
