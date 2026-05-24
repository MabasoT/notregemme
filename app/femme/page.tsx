import type { Metadata } from "next";
import { CollectionHeader } from "@/components/CollectionHeader";
import { OrderNotice } from "@/components/OrderNotice";
import { ProductCard } from "@/components/ProductCard";
import { collectionCopy } from "@/lib/content";
import { productsByCollection } from "@/lib/products";

export const metadata: Metadata = {
  title: "Femme — SS2026",
  description:
    "The Femme collection — playing-card suits, structured silhouettes, queens and kings. Notre Gemme Studios SS2026.",
};

/**
 * Femme collection page — full grid of every Femme product.
 */
export default function FemmePage(): React.ReactElement {
  const items = productsByCollection("femme");
  return (
    <section className="pt-[140px] pb-[clamp(80px,10vw,140px)]" style={{ background: "var(--color-bg-2)" }}>
      <div className="container-page">
        <CollectionHeader
          eyebrow={collectionCopy.femme.eyebrow}
          title={collectionCopy.femme.title}
        />
        <p
          className="section-body reveal mb-10 max-w-[640px]"
          style={{ marginTop: "-20px" }}
        >
          {collectionCopy.femme.description}
        </p>
        <OrderNotice variant="femme" />
        <div className="grid grid-cols-1 gap-[clamp(16px,2vw,24px)] sm:grid-cols-2 lg:grid-cols-3">
          {items.map((p, i) => (
            <ProductCard
              key={p.slug}
              product={p}
              revealDelay={((i % 4) + 1) as 1 | 2 | 3 | 4}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
