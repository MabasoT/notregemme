import type { Metadata } from "next";
import { CollectionHeader } from "@/components/CollectionHeader";
import { OrderNotice } from "@/components/OrderNotice";
import { ProductCard } from "@/components/ProductCard";
import { collectionCopy } from "@/lib/content";
import { productsByCollection } from "@/lib/products";

export const metadata: Metadata = {
  title: "Homme — SS2026",
  description:
    "The Homme collection — barcode graphics on heavyweight cotton, built for the modern man. Notre Gemme Studios SS2026.",
};

/**
 * Homme collection page — full grid of every Homme product.
 */
export default function HommePage(): React.ReactElement {
  const items = productsByCollection("homme");
  return (
    <section className="pt-[140px] pb-[clamp(80px,10vw,140px)]">
      <div className="container-page">
        <CollectionHeader
          eyebrow={collectionCopy.homme.eyebrow}
          title={collectionCopy.homme.title}
        />
        <p
          className="section-body reveal mb-10 max-w-[640px]"
          style={{ marginTop: "-20px" }}
        >
          {collectionCopy.homme.description}
        </p>
        <OrderNotice variant="homme" />
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
