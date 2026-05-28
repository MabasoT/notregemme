import type { Metadata } from "next";
import { CollectionHeader } from "@/components/CollectionHeader";
import { Hero } from "@/components/Hero";
import { JsonLd } from "@/components/JsonLd";
import { ShippingStrip } from "@/components/ShippingStrip";
import { Marquee } from "@/components/Marquee";
import { BrandStory } from "@/components/BrandStory";
import { ProductCard } from "@/components/ProductCard";
import { BentoGrid } from "@/components/BentoGrid";
import { products } from "@/lib/products";

export const metadata: Metadata = {
  title: "Notre Gemme — Humanity, Our Treasure.",
  description:
    "Notre Gemme — luxury minimalist streetwear born in South Africa. SS2026 collection: Homme, Femme, and Unisex. Shop now.",
  alternates: {
    canonical: "https://notregemme.co.za/",
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Notre Gemme",
  url: "https://notregemme.co.za",
  logo: "https://notregemme.co.za/assets/logo.png",
  description:
    "Luxury minimalist streetwear from South Africa. Every piece is a translation of feeling into form.",
  address: {
    "@type": "PostalAddress",
    addressCountry: "ZA",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+27-75-276-3672",
    contactType: "customer service",
    areaServed: "ZA",
    availableLanguage: "English",
  },
  sameAs: [
    "https://www.instagram.com/notregemme",
    "https://www.tiktok.com/@notregemme",
    "https://www.instagram.com/notregemme",
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Notre Gemme",
  url: "https://notregemme.co.za",
};

/**
 * Home — single-page brand experience: hero → shipping → marquee → story →
 * unified collection grid (all in-season products) → upcoming bento.
 */
export default function HomePage(): React.ReactElement {
  const liveProducts = products.filter((p) => p.comingSoon !== true);

  return (
    <>
      <JsonLd data={organizationSchema} />
      <JsonLd data={websiteSchema} />
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
