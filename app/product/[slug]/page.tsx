import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getProductBySlug, products, productsByCollection } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import { ProductView } from "@/components/ProductView";
import { JsonLd } from "@/components/JsonLd";
import { siteConfig } from "@/lib/site-config";

type Params = { slug: string };

export function generateStaticParams(): Array<Params> {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Product Not Found" };
  return {
    title: `${product.name} — ${product.collection === "homme" ? "Homme" : product.collection === "femme" ? "Femme" : "Unisex"} SS2026`,
    description: product.description,
    alternates: { canonical: `https://notregemme.co.za/product/${product.slug}` },
    openGraph: {
      type: "website",
      title: `${product.name} — ${siteConfig.brand.name}`,
      description: product.description,
      url: `https://notregemme.co.za/product/${product.slug}`,
      images: [{ url: `https://notregemme.co.za${product.image}`, alt: product.imageAlt }],
    },
  };
}

/**
 * Product detail page. Two-column layout on desktop: image (sticky) on
 * the left, info + sizes + WhatsApp order CTA on the right.
 */
export default async function ProductPage({
  params,
}: {
  params: Promise<Params>;
}): Promise<React.ReactElement> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const related = productsByCollection(product.collection)
    .filter((p) => p.slug !== product.slug)
    .slice(0, 3);

  const productUrl = `https://notregemme.co.za/product/${product.slug}`;
  const productImage = `https://notregemme.co.za${product.image}`;
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: productImage,
    sku: product.slug,
    brand: { "@type": "Brand", name: siteConfig.brand.name },
    category: product.collection === "homme" ? "Men's Streetwear" : product.collection === "femme" ? "Women's Streetwear" : "Unisex Streetwear",
    offers: {
      "@type": "Offer",
      url: productUrl,
      priceCurrency: "ZAR",
      price: product.priceValue,
      availability: product.comingSoon ? "https://schema.org/PreOrder" : "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
      seller: { "@type": "Organization", name: siteConfig.brand.name },
    },
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://notregemme.co.za/" },
      {
        "@type": "ListItem",
        position: 2,
        name: product.collection === "homme" ? "Homme" : product.collection === "femme" ? "Femme" : "Unisex",
        item: `https://notregemme.co.za/${product.collection}`,
      },
      { "@type": "ListItem", position: 3, name: product.name, item: productUrl },
    ],
  };


  return (
    <article className="pt-[140px]">
      <JsonLd data={productSchema} />
      <JsonLd data={breadcrumbSchema} />
      <div className="container-page">
        <nav
          className="reveal mb-10 flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.15em]"
          style={{ color: "var(--color-fg-muted)", fontFamily: "var(--font-body)" }}
          aria-label="Breadcrumb"
        >
          <Link href="/" className="hover:text-fg">
            Home
          </Link>
          <span aria-hidden="true">/</span>
          <Link href={`/${product.collection}`} className="hover:text-fg">
            {product.collection === "homme"
              ? "Homme"
              : product.collection === "femme"
                ? "Femme"
                : "Unisex"}
          </Link>
          <span aria-hidden="true">/</span>
          <span style={{ color: "var(--color-fg)" }}>{product.name}</span>
        </nav>

        <ProductView product={product} />

        {related.length > 0 ? (
          <section className="mt-[clamp(80px,10vw,140px)]">
            <CollectionHeaderInline title="You may also like" />
            <div className="grid grid-cols-1 gap-[clamp(16px,2vw,24px)] sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p, i) => (
                <ProductCard
                  key={p.slug}
                  product={p}
                  revealDelay={((i % 4) + 1) as 1 | 2 | 3 | 4}
                />
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </article>
  );
}

function CollectionHeaderInline({ title }: { title: string }): React.ReactElement {
  return (
    <div className="reveal mb-10 flex items-end justify-between gap-6">
      <h2 className="section-title" style={{ fontSize: "clamp(32px, 4vw, 56px)" }}>
        {title}
      </h2>
    </div>
  );
}
