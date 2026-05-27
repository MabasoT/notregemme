import type { Metadata } from "next";
import { CollectionHeader } from "@/components/CollectionHeader";
import { JsonLd } from "@/components/JsonLd";
import { OrderNotice } from "@/components/OrderNotice";
import { ProductCard } from "@/components/ProductCard";
import { collectionCopy } from "@/lib/content";
import { productsByCollection } from "@/lib/products";

export const metadata: Metadata = {
  title: "Homme Collection — SS2026",
  description:
    "Shop the Notre Gemme Homme collection. Barcode tees and heavyweight hoodies built for the modern man. SS2026 — South Africa.",
  alternates: {
    canonical: "https://notregemmestudios.co.za/homme/",
  },
};

/**
 * Homme collection page — full grid of every Homme product.
 */
export default function HommePage(): React.ReactElement {
  const items = productsByCollection("homme");

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Homme Collection — SS2026",
    description:
      "Notre Gemme Studios Homme collection: barcode graphics on heavyweight cotton, built for the modern man.",
    url: "https://notregemmestudios.co.za/homme/",
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://notregemmestudios.co.za/" },
        { "@type": "ListItem", position: 2, name: "Homme", item: "https://notregemmestudios.co.za/homme/" },
      ],
    },
    hasPart: items.map((p) => ({
      "@type": "Product",
      name: p.name,
      description: p.description,
      image: p.image ? `https://notregemmestudios.co.za${p.image}` : undefined,
      brand: { "@type": "Brand", name: "Notre Gemme Studios" },
      offers: {
        "@type": "Offer",
        priceCurrency: "ZAR",
        price: p.priceValue > 0 ? p.priceValue : undefined,
        availability: p.comingSoon
          ? "https://schema.org/PreOrder"
          : "https://schema.org/InStock",
        url: `https://notregemmestudios.co.za/homme/`,
      },
    })),
  };

  return (
    <section className="pt-[140px] pb-[clamp(80px,10vw,140px)]">
      <JsonLd data={collectionSchema} />
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
