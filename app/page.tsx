import type { Metadata } from "next";
import { BentoGrid } from "@/components/BentoGrid";
import { BrandStory } from "@/components/BrandStory";
import { CollectionHeader } from "@/components/CollectionHeader";
import { Hero } from "@/components/Hero";
import { JsonLd } from "@/components/JsonLd";
import { Marquee } from "@/components/Marquee";
import { ProductGrid } from "@/components/ProductGrid";
import { ShippingStrip } from "@/components/ShippingStrip";
import { collectionCopy, pageMeta } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";
import { liveProducts } from "@/lib/products";
import { websiteSchema } from "@/lib/schema";

export const metadata: Metadata = {
  ...pageMetadata("home", "/"),
  // The home title already carries the brand — skip the layout template.
  title: { absolute: pageMeta.home.title },
};

/**
 * Home — single-page brand experience: hero → shipping → marquee → story →
 * full in-season collection grid → upcoming bento.
 */
export default function HomePage(): React.ReactElement {
  return (
    <>
      <JsonLd data={websiteSchema()} />
      <Hero />
      <ShippingStrip />
      <Marquee />
      <BrandStory />

      <div className="divider-line" />

      <section
        id="collection"
        className="py-[clamp(80px,10vw,140px)]"
        style={{ background: "var(--color-bg)" }}
      >
        <div className="container-page">
          <CollectionHeader
            eyebrow={collectionCopy.all.eyebrow}
            title={collectionCopy.all.title}
            viewAllLabel="View All"
            viewAllHref="/collection"
          />
          <ProductGrid products={liveProducts} />
        </div>
      </section>

      <div className="divider-line" />
      <BentoGrid />
    </>
  );
}
