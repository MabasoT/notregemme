import type { Metadata } from "next";
import { CollectionHeader } from "@/components/CollectionHeader";
import { JsonLd } from "@/components/JsonLd";
import { OrderNotice } from "@/components/OrderNotice";
import { ProductCard } from "@/components/ProductCard";
import { collectionCopy } from "@/lib/content";
import { productsByCollection } from "@/lib/products";

export const metadata: Metadata = {
  title: "Femme Collection — SS2026",
  description:
    "Shop the Notre Gemme Femme collection. Playing-card suits, structured silhouettes, queens and kings. SS2026 — South Africa.",
  alternates: {
    canonical: "https://notregemme.co.za/femme/",
  },
};

/**
 * Femme collection page — full grid of every Femme product.
 */
export default function FemmePage(): React.ReactElement {
  const items = productsByCollection("femme");

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Femme Collection — SS2026",
    description:
      "Notre Gemme Femme collection: playing-card suits, structured silhouettes, queens and kings.",
    url: "https://notregemme.co.za/femme/",
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://notregemme.co.za/" },
        { "@type": "ListItem", position: 2, name: "Femme", item: "https://notregemme.co.za/femme/" },
      ],
    },
    hasPart: items.map((p) => ({
      "@type": "Product",
      name: p.name,
      description: p.description,
      image: p.image ? `https://notregemme.co.za${p.image}` : undefined,
      brand: { "@type": "Brand", name: "Notre Gemme" },
      offers: {
        "@type": "Offer",
        priceCurrency: "ZAR",
        price: p.priceValue > 0 ? p.priceValue : undefined,
        availability: p.comingSoon
          ? "https://schema.org/PreOrder"
          : "https://schema.org/InStock",
        url: `https://notregemme.co.za/femme/`,
      },
    })),
  };

  return (
    <section className="pt-[140px] pb-[clamp(80px,10vw,140px)]" style={{ background: "var(--color-bg-2)" }}>
      <JsonLd data={collectionSchema} />
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
