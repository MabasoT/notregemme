"use client";

import Link from "next/link";
import { useRef } from "react";
import type { Product } from "@/lib/products";
import { ProductImage } from "./ProductImage";

type Props = {
  product: Product;
  revealDelay?: 1 | 2 | 3 | 4;
  /** First card in the Femme grid uses a wider image aspect. */
  aspectOverride?: string;
};

/**
 * Glassmorphism product card with 3D magnetic tilt (±10deg max) and a
 * quick-add WhatsApp pill that slides in from below on hover.
 *
 * Magnetic tilt is implemented locally with mousemove on the card; reset
 * uses a spring transition. Skipped on touch devices (no hover trigger).
 */
export function ProductCard({ product, revealDelay, aspectOverride }: Props): React.ReactElement {
  const ref = useRef<HTMLDivElement | null>(null);

  const onMove = (e: React.MouseEvent<HTMLDivElement>): void => {
    const card = ref.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 10;
    card.style.transform = `translateY(-6px) rotateX(${-y}deg) rotateY(${x}deg)`;
    card.style.perspective = "800px";
  };

  const onLeave = (): void => {
    const card = ref.current;
    if (!card) return;
    card.style.transform = "";
  };

  const delayClass = revealDelay ? `reveal-delay-${revealDelay}` : "";
  const isLaunch = product.tag === "Launch";

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`product-card reveal ${delayClass} relative overflow-hidden rounded-card`}
      style={{
        background: "var(--color-bg-2)",
        borderRadius: "var(--radius-card)",
      }}
    >
      {product.tag ? (
        <span
          className="absolute left-4 top-4 z-10 inline-block rounded-pill px-3 py-[5px] uppercase"
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "10px",
            fontWeight: 600,
            letterSpacing: "0.15em",
            color: "var(--color-bg)",
            background: isLaunch ? "var(--color-red-bright)" : "var(--color-green)",
            borderRadius: "var(--radius-pill)",
          }}
        >
          {product.tag}
        </span>
      ) : null}

      <Link
        href={`/product/${product.slug}`}
        className="group block"
        aria-label={`View ${product.name}`}
      >
        <div className="relative overflow-hidden" style={{ aspectRatio: aspectOverride ?? (product.featured ? "2/3" : "3/4") }}>
          <ProductImage
            src={product.image}
            alt={product.imageAlt}
            motif={product.motif}
            aspect={aspectOverride ?? (product.featured ? "2/3" : "3/4")}
            fit={product.image.toLowerCase().endsWith(".png") ? "contain" : "cover"}
            className="h-full w-full transition-transform duration-700 group-hover:scale-[1.07]"
          />
          <div
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{
              background: "linear-gradient(transparent 50%, rgba(5,5,5,0.7) 100%)",
            }}
          />
        </div>
      </Link>

      <a
        href={product.orderHref}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute bottom-[88px] left-1/2 z-10 -translate-x-1/2 translate-y-2 rounded-pill px-6 py-2.5 uppercase opacity-0 transition-[opacity,transform] duration-300 group-hover:opacity-100 group-hover:translate-y-0 group-[.product-card:hover]:opacity-100 group-[.product-card:hover]:translate-y-0"
        style={{
          fontFamily: "var(--font-heading)",
          fontSize: "11px",
          fontWeight: 600,
          letterSpacing: "0.2em",
          color: "var(--color-bg)",
          background: "var(--color-fg)",
          borderRadius: "var(--radius-pill)",
          whiteSpace: "nowrap",
        }}
        data-quick-add
      >
        {product.comingSoon ? "Notify on WhatsApp" : "Order via WhatsApp"}
      </a>

      <div className="flex items-start justify-between px-5 pb-5 pt-[18px]">
        <div>
          <div
            className="font-semibold"
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(14px, 1.2vw, 16px)",
              letterSpacing: "-0.01em",
            }}
          >
            {product.name}
          </div>
          <div
            className="mt-[3px]"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "12px",
              color: "var(--color-fg-muted)",
              letterSpacing: "0.05em",
            }}
          >
            {product.subtitle}
          </div>
        </div>
        <div
          className="font-semibold"
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "16px",
            color: "var(--color-fg)",
          }}
        >
          {product.price}
        </div>
      </div>

      <style jsx>{`
        .product-card:hover [data-quick-add] {
          opacity: 1;
          transform: translateX(-50%) translateY(0);
        }
        [data-quick-add] {
          transform: translateX(-50%) translateY(8px);
        }
      `}</style>
    </div>
  );
}
