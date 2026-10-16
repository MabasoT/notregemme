import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { ProductGrid } from "@/components/ProductGrid";
import { ProductView } from "@/components/ProductView";
import { relatedCopy } from "@/lib/content";
import { DEFAULT_OG_IMAGE } from "@/lib/metadata";
import {
  COLLECTION_LABELS,
  getProductBySlug,
  products,
  productsByCollection,
} from "@/lib/products";
import { breadcrumbSchema, productSchema } from "@/lib/schema";
import { siteConfig } from "@/lib/site-config";

type Params = { slug: string };

/** How many same-collection pieces to suggest under the product. */
const RELATED_COUNT = 3;

/** Characters of the product description used as meta description. */
const META_DESCRIPTION_MAX = 155;

export function generateStaticParams(): Array<Params> {
  return products.map((p) => ({ slug: p.slug }));
}

// Only catalogue slugs exist — anything else is a real 404.
export const dynamicParams = false;

/**
 * Trims a description to the meta-description budget on a word boundary.
 *
 * @param text - full product description
 * @returns text of at most META_DESCRIPTION_MAX characters
 */
function toMetaDescription(text: string): string {
  if (text.length <= META_DESCRIPTION_MAX) return text;
  const cut = text.slice(0, META_DESCRIPTION_MAX - 1);
  return `${cut.slice(0, cut.lastIndexOf(" "))}…`;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};

  const path = `/product/${product.slug}`;
  const title = `${product.name} — ${COLLECTION_LABELS[product.collection]} ${siteConfig.brand.season}`;
  const description = toMetaDescription(
    `${product.name}, ${product.price}. ${product.description}`,
  );
  // Without photography, fall back to the site-wide OG image.
  const image = product.image ? { url: product.image, alt: product.imageAlt } : DEFAULT_OG_IMAGE;

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: siteConfig.brand.name,
      locale: "en_ZA",
      url: path,
      title: `${product.name} — ${siteConfig.brand.name}`,
      description,
      images: [image],
    },
    twitter: { card: "summary_large_image", title, description, images: [image.url] },
  };
}

/**
 * Product detail page. Two-column layout on desktop: image (sticky) on
 * the left, info + colour/size pickers + WhatsApp order CTA on the right.
 */
export default async function ProductPage({
  params,
}: {
  params: Promise<Params>;
}): Promise<React.ReactElement> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const collectionName = COLLECTION_LABELS[product.collection];
  const related = productsByCollection(product.collection)
    .filter((p) => p.slug !== product.slug)
    .slice(0, RELATED_COUNT);

  return (
    <article className="pt-[140px] pb-[clamp(80px,10vw,140px)]">
      <JsonLd data={productSchema(product)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: collectionName, path: `/${product.collection}` },
          { name: product.name, path: `/product/${product.slug}` },
        ])}
      />
      <div className="container-page">
        <nav
          className="reveal mb-10 text-xs uppercase tracking-[0.15em] text-fg-muted"
          style={{ fontFamily: "var(--font-body)" }}
          aria-label="Breadcrumb"
        >
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href="/" className="hover:text-fg">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href={`/${product.collection}`} className="hover:text-fg">
                {collectionName}
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-fg">
              {product.name}
            </li>
          </ol>
        </nav>

        <ProductView product={product} />

        {related.length > 0 ? (
          <section className="mt-[clamp(80px,10vw,140px)]" aria-labelledby="related-title">
            <div className="reveal mb-10">
              <h2
                id="related-title"
                className="section-title"
                style={{ fontSize: "clamp(32px, 4vw, 56px)" }}
              >
                {relatedCopy.title}
              </h2>
            </div>
            <ProductGrid products={related} />
          </section>
        ) : null}
      </div>
    </article>
  );
}
