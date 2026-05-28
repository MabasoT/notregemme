import type { Metadata } from "next";
import { CollectionHeader } from "@/components/CollectionHeader";
import { JsonLd } from "@/components/JsonLd";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/lib/products";

export const metadata: Metadata = {
  title: "SS2026 Collection — Notre Gemme",
  description:
    "Shop the full Notre Gemme SS2026 collection. Heavyweight cotton tees, evolution hoodies, and more — luxury minimalist streetwear from South Africa.",
  alternates: {
    canonical: "https://notregemme.co.za/collection/",
  },
};

const collectionSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "SS2026 Collection — Notre Gemme",
  description:
    "The full Notre Gemme SS2026 collection: Homme, Femme, and Unisex pieces — heavyweight cotton, luxury minimalist streetwear from South Africa.",
  url: "https://notregemme.co.za/collection/",
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://notregemme.co.za/" },
      { "@type": "ListItem", position: 2, name: "Collection", item: "https://notregemme.co.za/collection/" },
    ],
  },
};

/**
 * /collection — dedicated page for the full SS2026 collection grid.
 * Linked from the "Shop Collection" CTA on the hero.
 */
export default function CollectionPage(): React.ReactElement {
  const liveProducts = products.filter((p) => p.comingSoon !== true);

  return (
    <section className="pt-[140px] pb-[clamp(80px,10vw,140px)]">
      <JsonLd data={collectionSchema} />
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
  );
}
