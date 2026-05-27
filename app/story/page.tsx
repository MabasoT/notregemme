import type { Metadata } from "next";
import { BrandStory } from "@/components/BrandStory";

export const metadata: Metadata = {
  title: "Our Story — Notre Gemme Studios",
  description:
    "Notre Gemme was born from the belief that humanity is the rarest gem of all. Discover the story behind the brand — South African spirit, built different, made to endure.",
};

/**
 * Dedicated /story page — renders the full BrandStory section.
 * Having a real route (instead of /#story) allows Google to index
 * the brand story as a standalone page.
 */
export default function StoryPage(): React.ReactElement {
  return (
    <main className="pt-[100px]">
      <BrandStory />
    </main>
  );
}
