"use client";

import { useMemo, useState } from "react";
import { ProductImage } from "./ProductImage";
import { ProductOrder } from "./ProductOrder";
import { useLiveStock } from "@/lib/live-stock";
import { LOW_STOCK_THRESHOLD, isSoldOut } from "@/lib/stock";
import type { ColorKey, Product } from "@/lib/products";

/**
 * Full interactive product block (image gallery + info + order). Owns
 * the selected colour so the photo swaps when a swatch is picked, and
 * overlays live stock / social-proof badges from lib/stock.ts (or the
 * Apps Script feed when configured).
 */
export function ProductView({ product }: { product: Product }): React.ReactElement {
  const liveStock = useLiveStock(product.slug);
  const soldOutColors = liveStock.soldOutColors ?? [];
  const productSoldOut = isSoldOut(liveStock);

  // Default to the configured swatch, unless it's sold out — then the
  // first available colour.
  const initialColor = useMemo<ColorKey>(() => {
    if (!soldOutColors.includes(product.defaultColorKey)) {
      return product.defaultColorKey;
    }
    const firstAvailable = product.colors.find(
      (c) => !soldOutColors.includes(c.key),
    );
    return firstAvailable?.key ?? product.defaultColorKey;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product]);

  const [selectedColorKey, setSelectedColorKey] = useState<ColorKey>(initialColor);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  // Swap the main photo to the per-colour image when one is provided.
  const currentImage = product.colorImages?.[selectedColorKey] ?? product.image;
  const currentImageAlt =
    product.colorImages?.[selectedColorKey] != null
      ? `${product.name} — ${
          product.colors.find((c) => c.key === selectedColorKey)?.name ?? ""
        }`
      : product.imageAlt;
  const fit: "cover" | "contain" = currentImage.toLowerCase().endsWith(".png")
    ? "contain"
    : "cover";

  const lowStock =
    !productSoldOut &&
    liveStock.inStock > 0 &&
    liveStock.inStock <= LOW_STOCK_THRESHOLD;

  return (
    <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
      <div className="reveal flex flex-col gap-4">
        <div
          className="rounded-card overflow-hidden"
          style={{ borderRadius: "var(--radius-card)" }}
        >
          <ProductImage
            src={currentImage}
            alt={currentImageAlt}
            motif={product.motif}
            aspect="3/4"
            fit={fit}
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

        {/* Stock + social proof badges */}
        {!product.comingSoon ? (
          <div className="flex flex-wrap items-center gap-2.5">
            <StockBadge soldOut={productSoldOut} low={lowStock} count={liveStock.inStock} />
            {liveStock.boughtRecently && liveStock.boughtRecently > 0 ? (
              <SocialProof
                count={liveStock.boughtRecently}
                window={liveStock.boughtRecentlyWindow ?? "recently"}
              />
            ) : null}
          </div>
        ) : null}

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

        {product.comingSoon ? (
          <a
            href={product.orderHref}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary w-fit"
          >
            Notify me when it drops
          </a>
        ) : (
          <ProductOrder
            productName={product.name}
            price={product.price}
            sizes={product.sizes}
            colors={product.colors}
            collection={product.collection}
            selectedColorKey={selectedColorKey}
            onSelectColor={setSelectedColorKey}
            selectedSize={selectedSize === "" ? null : selectedSize}
            onSelectSize={(s) => setSelectedSize(s)}
            soldOutColors={soldOutColors}
            soldOut={productSoldOut}
          />
        )}
      </div>
    </div>
  );
}

function StockBadge({
  soldOut,
  low,
  count,
}: {
  soldOut: boolean;
  low: boolean;
  count: number;
}): React.ReactElement {
  const label = soldOut
    ? "Sold out"
    : low
      ? `Only ${count} left`
      : "In stock";
  const color = soldOut
    ? "var(--color-red-bright)"
    : low
      ? "var(--color-gold)"
      : "var(--color-green)";
  return (
    <span
      className="inline-flex items-center gap-2 rounded-pill px-3 py-1.5 uppercase"
      style={{
        fontFamily: "var(--font-heading)",
        fontSize: 10,
        fontWeight: 600,
        letterSpacing: "0.15em",
        color,
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: "var(--radius-pill)",
      }}
    >
      <span
        aria-hidden="true"
        className={`inline-block h-2 w-2 rounded-full ${soldOut ? "" : "animate-pulse-dot"}`}
        style={{ background: color }}
      />
      {label}
    </span>
  );
}

function SocialProof({
  count,
  window,
}: {
  count: number;
  window: string;
}): React.ReactElement {
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-pill px-3 py-1.5"
      style={{
        fontFamily: "var(--font-body)",
        fontSize: 12,
        color: "var(--color-fg-muted)",
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "var(--radius-pill)",
      }}
    >
      <span aria-hidden="true">🔥</span>
      <span>
        <strong style={{ color: "var(--color-fg)" }}>{count} {count === 1 ? "person" : "people"}</strong>{" "}
        bought this {window}
      </span>
    </span>
  );
}
