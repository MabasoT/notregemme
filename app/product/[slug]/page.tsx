import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ProductImage } from "@/components/ProductImage";
import { getProductBySlug, products, productsByCollection } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";

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
    title: `${product.name} — ${product.collection === "homme" ? "Homme" : "Femme"} SS2026`,
    description: product.description,
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

  return (
    <article className="pt-[140px]">
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
          <Link
            href={product.collection === "homme" ? "/homme" : "/femme"}
            className="hover:text-fg"
          >
            {product.collection === "homme" ? "Homme" : "Femme"}
          </Link>
          <span aria-hidden="true">/</span>
          <span style={{ color: "var(--color-fg)" }}>{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
          <div className="reveal flex flex-col gap-4">
            <div
              className="rounded-card overflow-hidden"
              style={{ borderRadius: "var(--radius-card)" }}
            >
              <ProductImage
                src={product.image}
                alt={product.imageAlt}
                motif={product.motif}
                aspect="3/4"
                fit={product.image.toLowerCase().endsWith(".png") ? "contain" : "cover"}
              />
            </div>
            {product.imageBack ? (
              <div
                className="rounded-card overflow-hidden"
                style={{ borderRadius: "var(--radius-card)" }}
              >
                <ProductImage
                  src={product.imageBack}
                  alt={product.imageBackAlt ?? product.imageAlt}
                  motif={product.motif}
                  aspect="3/4"
                  fit="contain"
                />
              </div>
            ) : null}
          </div>

          <div className="reveal reveal-delay-1 flex flex-col gap-7 lg:sticky lg:top-32 lg:self-start">
            {product.tag ? (
              <span
                className="inline-block w-fit rounded-pill px-3 py-[5px] uppercase"
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: 10,
                  fontWeight: 600,
                  letterSpacing: "0.15em",
                  color: "var(--color-bg)",
                  background:
                    product.tag === "Launch"
                      ? "var(--color-red-bright)"
                      : "var(--color-green)",
                  borderRadius: "var(--radius-pill)",
                }}
              >
                {product.tag}
              </span>
            ) : null}

            <div>
              <h1
                className="font-bold"
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "clamp(32px, 4vw, 56px)",
                  letterSpacing: "-0.02em",
                  lineHeight: 1,
                }}
              >
                {product.name}
              </h1>
              <p
                className="mt-3"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 14,
                  color: "var(--color-fg-muted)",
                  letterSpacing: "0.05em",
                }}
              >
                {product.subtitle}
              </p>
            </div>

            <div
              className="font-semibold"
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "clamp(28px, 3vw, 40px)",
                color: "var(--color-fg)",
                letterSpacing: "-0.02em",
              }}
            >
              {product.price}
            </div>

            <p className="section-body">{product.description}</p>

            <div>
              <div
                className="mb-3 uppercase"
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: "0.2em",
                  color: "var(--color-fg-muted)",
                }}
              >
                Sizes
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <span
                    key={size}
                    className="rounded-pill px-4 py-2 uppercase"
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontSize: 11,
                      fontWeight: 600,
                      letterSpacing: "0.15em",
                      color: "var(--color-fg)",
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      borderRadius: "var(--radius-pill)",
                    }}
                  >
                    {size}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <div
                className="mb-3 uppercase"
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: "0.2em",
                  color: "var(--color-fg-muted)",
                }}
              >
                Details
              </div>
              <ul className="flex flex-col gap-2">
                {product.details.map((d) => (
                  <li
                    key={d}
                    className="flex items-start gap-2.5"
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: 14,
                      color: "var(--color-fg-muted)",
                    }}
                  >
                    <span
                      aria-hidden="true"
                      className="diamond-clip mt-1.5 inline-block h-1.5 w-1.5 shrink-0"
                      style={{ background: "var(--color-green)" }}
                    />
                    {d}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href={product.orderHref}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                Order via WhatsApp
              </a>
              <Link
                href={product.collection === "homme" ? "/homme" : "/femme"}
                className="btn-ghost"
              >
                Back to {product.collection === "homme" ? "Homme" : "Femme"}
              </Link>
            </div>
          </div>
        </div>

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
