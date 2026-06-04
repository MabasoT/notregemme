"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import type { Product } from "@/lib/products";
import { ProductImage } from "./ProductImage";

type Props = {
  product: Product;
  revealDelay?: 1 | 2 | 3 | 4;
  /** Override aspect ratio (e.g. the wide featured cell in Femme grid). */
  aspectOverride?: string;
};

/**
 * Glassmorphism product card with 3D magnetic tilt (±10deg max) and an
 * order/notify pill that slides up over the bottom of the image on hover.
 * PNG sources auto-render with object-fit: contain so transparent-bg
 * product photos don't get cropped.
 */
export function ProductCard({
  product,
  revealDelay,
  aspectOverride,
}: Props): React.ReactElement {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [hovered, setHovered] = useState<boolean>(false);

  const onMove = (e: React.MouseEvent<HTMLDivElement>): void => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 10;
    card.style.setProperty("--tilt-x", `${x}deg`);
    card.style.setProperty("--tilt-y", `${-y}deg`);
  };

  const onLeave = (): void => {
    setHovered(false);
    const card = cardRef.current;
    if (!card) return;
    card.style.setProperty("--tilt-x", "0deg");
    card.style.setProperty("--tilt-y", "0deg");
  };

  const onEnter = (): void => setHovered(true);

  const delayClass = revealDelay ? `reveal-delay-${revealDelay}` : "";
  const isLaunch = product.tag === "Launch";
  const isComing = product.comingSoon === true;
  const aspect = aspectOverride ?? (product.featured ? "2/3" : "3/4");
  const fit: "cover" | "contain" = product.image.toLowerCase().endsWith(".png")
    ? "contain"
    : "cover";

  return (
    <div
      ref={cardRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onMouseEnter={onEnter}
      className={`product-card reveal ${delayClass} relative flex flex-col overflow-hidden`}
      style={{
        background: "var(--color-bg-2)",
        borderRadius: "var(--radius-card)",
        perspective: "900px",
        transformStyle: "preserve-3d",
        transform: `translateY(${
          hovered ? "-8px" : "0"
        }) rotateX(var(--tilt-y, 0deg)) rotateY(var(--tilt-x, 0deg))`,
        transition:
          "transform 0.5s cubic-bezier(0.16,1,0.3,1), border-color 0.3s, box-shadow 0.3s",
        boxShadow: hovered
          /* Hover: lift shadow + subtle acid-green brand glow (easy on the eye, aids navigation) */
          ? "0 30px 60px -20px rgba(0,0,0,0.7), 0 0 0 1px rgba(110,203,62,0.3), 0 0 28px -4px rgba(110,203,62,0.18)"
          /* Default: quiet depth shadow */
          : "0 8px 24px -12px rgba(0,0,0,0.5)",
        border: hovered ? "1px solid rgba(110,203,62,0.35)" : "1px solid rgba(255,255,255,0.05)",
        willChange: "transform"
      }}
    >
      {product.tag ? (
        <span
          className="absolute left-4 top-4 z-20 inline-block rounded-pill px-3 py-[5px] uppercase"
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: 10,
            fontWeight: 600,
            letterSpacing: "0.15em",
            color: "var(--color-bg)",
            background: isLaunch
              ? "var(--color-red-bright)"
              : isComing
                ? "rgba(255,255,255,0.85)"
                : "var(--color-green)",
            borderRadius: "var(--radius-pill)",
          }}
        >
          {product.tag}
        </span>
      ) : null}

      <Link
        href={`/product/${product.slug}`}
        aria-label={`View ${product.name}`}
        className="relative block overflow-hidden"
        style={{ aspectRatio: "3/4" }}
      >
        <div
          className="absolute inset-0 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{ transform: hovered ? "scale(1.06)" : "scale(1)" }}
        >
          <ProductImage
            src={product.image}
            alt={product.imageAlt}
            motif={product.motif}
            aspect={aspect}
            fit={fit}
            className="h-full w-full"
          />
        </div>
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 transition-opacity duration-300"
          style={{
            background:
              "linear-gradient(transparent 45%, rgba(5,5,5,0.55) 80%, rgba(5,5,5,0.9) 100%)",
            opacity: hovered ? 1 : 0,
          }}
        />
      </Link>

      <div
        className="flex items-start justify-between gap-4"
        style={{ padding: "18px 20px 20px" }}
      >
        <div className="min-w-0 flex-1">
          <Link
            href={`/product/${product.slug}`}
            className="block font-semibold leading-snug transition-colors hover:text-green"
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(14px, 3.5vw, 16px)",
              letterSpacing: "-0.01em",
              color: "var(--color-fg)",
              textDecoration: "none",
              wordBreak: "break-word",
            }}
          >
            {product.name}
          </Link>
          <div
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "12px",
              color: "var(--color-fg-muted)",
              letterSpacing: "0.05em",
              marginTop: "3px",
              lineHeight: 1.5,
              wordBreak: "break-word",
            }}
          >
            {product.subtitle}
          </div>
          {product.colors.length > 0 ? (
            <div
              className="mt-3 flex items-center gap-1.5"
              aria-label={`Available in ${product.colors.map((c) => c.name).join(", ")}`}
            >
              {product.colors.map((color) => (
                <span
                  key={color.key}
                  aria-hidden="true"
                  title={color.name}
                  className="inline-block h-3 w-3 rounded-full"
                  style={{
                    background: color.hex,
                    boxShadow: "0 0 0 1px rgba(255,255,255,0.18)",
                  }}
                />
              ))}
            </div>
          ) : null}
        </div>
        <div
          className="shrink-0 self-start whitespace-nowrap font-semibold"
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "16px",
            color: "var(--color-fg)",
          }}
        >
          {product.price}
        </div>
      </div>
    </div>
  );
}
