import { collectionCopy } from "@/lib/content";
import { productsByCollection } from "@/lib/products";
import { CollectionHeader } from "./CollectionHeader";
import { OrderNotice } from "./OrderNotice";
import { ProductCard } from "./ProductCard";

/**
 * Homme section — 3-column product grid on desktop, 2-col tablet, 1-col mobile.
 * Pulls products tagged `collection: "homme"` from the catalogue.
 */
export function HommeCollection(): React.ReactElement {
  const items = productsByCollection("homme");
  return (
    <section
      id="homme"
      className="py-[clamp(80px,10vw,140px)]"
      style={{ background: "var(--color-bg)" }}
    >
      <div className="container-page">
        <CollectionHeader
          eyebrow={collectionCopy.homme.eyebrow}
          title={collectionCopy.homme.title}
          viewAllLabel={collectionCopy.homme.viewAll}
          viewAllHref="/homme"
        />
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
