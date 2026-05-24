import { CollectionHeader } from "@/components/CollectionHeader";
import { Hero } from "@/components/Hero";
import { ShippingStrip } from "@/components/ShippingStrip";
import { Marquee } from "@/components/Marquee";
import { BrandStory } from "@/components/BrandStory";
import { ProductCard } from "@/components/ProductCard";
import { BentoGrid } from "@/components/BentoGrid";
import { products } from "@/lib/products";

/**
 * Home — single-page brand experience: hero → shipping → marquee → story →
 * unified collection grid (all in-season products) → upcoming bento.
 *
 * The unified collection groups every shoppable piece into one responsive
 * 3-up grid. Coming-soon items are excluded; they live in /unisex and
 * the upcoming bento.
 */
export default function HomePage(): React.ReactElement {
  const liveProducts = products.filter((p) => p.comingSoon !== true);

  return (
    <>
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
          <CollectionHeader eyebrow="SS 2026" title="Collection" />
          <div className="grid grid-cols-1 gap-[clamp(16px,2vw,24px)] sm:grid-cols-2 lg:grid-cols-3">
            {liveProducts.map((p, i) => (
              <ProductCard
                key={p.slug}
                product={p}
                revealDelay={((i % 4) + 1) as 1 | 2 | 3 | 4}
              />
            ))}
          </div>
        </div>
      </section>

      <div className="divider-line" />
      <BentoGrid />
    </>
  );
}
