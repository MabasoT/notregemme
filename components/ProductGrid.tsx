import type { Product } from "@/lib/products";
import { ProductCard } from "./ProductCard";

/** Stagger steps available as .reveal-delay-{1..4} in globals.css. */
const REVEAL_STEPS = 4;

/**
 * Responsive product grid (1 / 2 / 3 columns) with staggered reveal.
 *
 * @param products - products to render, in display order
 * @param priorityCount - leading cards whose images load eagerly (above the fold)
 */
export function ProductGrid({
  products,
  priorityCount = 0,
}: {
  products: ReadonlyArray<Product>;
  priorityCount?: number;
}): React.ReactElement {
  return (
    <div className="grid grid-cols-1 gap-[clamp(16px,2vw,24px)] sm:grid-cols-2 lg:grid-cols-3">
      {products.map((p, i) => (
        <ProductCard
          key={p.slug}
          product={p}
          priority={i < priorityCount}
          revealDelay={((i % REVEAL_STEPS) + 1) as 1 | 2 | 3 | 4}
        />
      ))}
    </div>
  );
}
