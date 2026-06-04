import type { Metadata } from "next";
import Link from "next/link";
import { CollectionHeader } from "@/components/CollectionHeader";
import { Countdown } from "@/components/Countdown";
import { JsonLd } from "@/components/JsonLd";
import { NotifyForm } from "@/components/NotifyForm";
import { ProductCard } from "@/components/ProductCard";
import { ProductImage } from "@/components/ProductImage";
import { productsByCollection } from "@/lib/products";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Unisex — Upcoming AW2026",
  description:
    "Notre Gemme Unisex — pieces designed without a side of the line. Worn by whoever the silhouette serves. AW2026 upcoming drops, South Africa.",
  alternates: {
    canonical: "https://notregemme.co.za/unisex/",
  },
};

/**
 * Unisex page — surfaces every product currently flagged as coming soon
 * alongside a countdown to the next AW2026 drop.
 */
export default function UnisexPage(): React.ReactElement {
  const unisexItems = productsByCollection("unisex");
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Unisex — Upcoming AW2026",
    description:
      "Notre Gemme Studios Unisex collection: upcoming pieces designed without a side of the line, worn by whoever the silhouette serves.",
    url: "https://notregemme.co.za/unisex/",
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://notregemme.co.za/" },
        { "@type": "ListItem", position: 2, name: "Unisex", item: "https://notregemme.co.za/unisex/" },
      ],
    },
    hasPart: unisexItems.map((p) => ({
      "@type": "Product",
      name: p.name,
      description: p.description,
      image: p.image ? `https://notregemme.co.za${p.image}` : undefined,
      brand: { "@type": "Brand", name: "Notre Gemme" },
      offers: {
        "@type": "Offer",
        priceCurrency: "ZAR",
        availability: "https://schema.org/PreOrder",
        url: "https://notregemme.co.za/unisex/",
      },
    })),
  };

  return (
    <article className="pt-[140px] pb-[clamp(80px,10vw,140px)]">
      <JsonLd data={collectionSchema} />
      <div className="container-page">
        <CollectionHeader
          eyebrow="What's Next — AW 2026"
          title="Unisex"
        />
        <p
          className="section-body reveal mb-12 max-w-[640px]"
          style={{ marginTop: "-20px" }}
        >
          The upcoming chapter. Pieces designed without a side of the line —
          worn by whoever the silhouette serves. Add your email to be first
          when these drop, or message us on WhatsApp to reserve.
        </p>

        <div
          className="glass-card reveal mb-14 flex flex-wrap items-center justify-between gap-8 rounded-card p-10"
          style={{ borderRadius: "var(--radius-card)" }}
        >
          <div>
            <p
              className="mb-3 uppercase"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 11,
                letterSpacing: "0.3em",
                color: "var(--color-green)",
              }}
            >
              Drops in
            </p>
            <Countdown targetIso={siteConfig.drop.nextDropDate} />
          </div>
          <div className="min-w-[280px] max-w-[420px] flex-1">
            <p
              className="mb-3 uppercase"
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.2em",
                color: "var(--color-fg-muted)",
              }}
            >
              Be First
            </p>
            <NotifyForm />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-[clamp(16px,2vw,24px)] sm:grid-cols-2 lg:grid-cols-3">
          {unisexItems.map((p, i) => (
            <ProductCard
              key={p.slug}
              product={p}
              revealDelay={((i % 4) + 1) as 1 | 2 | 3 | 4}
            />
          ))}
        </div>

        <section
          className="mt-[clamp(80px,10vw,140px)] grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16"
          aria-labelledby="archive-teaser"
        >
          <div
            className="reveal relative overflow-hidden rounded-card"
            style={{ aspectRatio: "4/5", borderRadius: "var(--radius-card)" }}
          >
            <ProductImage
              src="/assets/Hoodie front.png"
              alt="Unisex teaser — upcoming silhouette preview"
              motif="heart"
              aspect="4/5"
              fit="contain"
              className="h-full w-full"
            />
          </div>
          <div className="reveal reveal-delay-1 flex flex-col justify-center gap-6">
            <p className="section-label">Archive Access</p>
            <h2 id="archive-teaser" className="section-title">
              The next chapter <em>is being</em> crafted.
            </h2>
            <p className="section-body">
              Subscribers get the first look at every unisex drop — sketch
              previews, fabric swatches, fit shots. No middle ground. No
              public release until the archive opens.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link href="/contact" className="btn-primary">
                Request Access
              </Link>
              <Link href="/upcoming" className="btn-ghost">
                See Sketches
              </Link>
            </div>
          </div>
        </section>
      </div>
    </article>
  );
}
