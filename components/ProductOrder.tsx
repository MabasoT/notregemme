"use client";

import { useState } from "react";
import Link from "next/link";
import { whatsappOrderLink } from "@/lib/site-config";

type ProductOrderProps = {
  productName: string;
  price: string;
  sizes: ReadonlyArray<string>;
  collection: "homme" | "femme" | "unisex";
};

const collectionLabel: Record<ProductOrderProps["collection"], string> = {
  homme: "Homme",
  femme: "Femme",
  unisex: "Unisex",
};

const collectionHref: Record<ProductOrderProps["collection"], string> = {
  homme: "/homme",
  femme: "/femme",
  unisex: "/unisex",
};

/**
 * Interactive order block. Lets the customer pick a size, then builds a
 * pre-filled WhatsApp message that already includes the chosen size so the
 * brand can confirm the order without a back-and-forth.
 */
export function ProductOrder({ productName, price, sizes, collection }: ProductOrderProps): React.ReactElement {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  const orderMessage = selectedSize
    ? `Hi! I'd like to order the ${productName} (Size ${selectedSize}) \u2014 ${price}.`
    : `Hi! I'd like to order the ${productName} \u2014 ${price}.`;
  const orderHref = whatsappOrderLink(orderMessage);

  return (
    <div className="flex flex-col gap-6">
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
          Select Size
        </div>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Select a size">
          {sizes.map((size) => {
            const active = selectedSize === size;
            return (
              <button
                key={size}
                type="button"
                onClick={() => setSelectedSize(size)}
                aria-pressed={active}
                className="rounded-pill px-5 py-2.5 uppercase transition-colors duration-200"
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: "0.15em",
                  cursor: "pointer",
                  color: active ? "var(--color-bg)" : "var(--color-fg)",
                  background: active ? "var(--color-green)" : "rgba(255,255,255,0.04)",
                  border: active ? "1px solid var(--color-green)" : "1px solid rgba(255,255,255,0.12)",
                  borderRadius: "var(--radius-pill)",
                }}
              >
                {size}
              </button>
            );
          })}
        </div>
        <p
          aria-live="polite"
          className="mt-3"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 13,
            color: selectedSize ? "var(--color-fg-muted)" : "var(--color-green)",
          }}
        >
          {selectedSize ? `Selected size: ${selectedSize}` : "Please select a size to continue."}
        </p>
      </div>

      <div className="flex flex-wrap gap-3 pt-2">
        <a
          href={orderHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-disabled={!selectedSize}
          onClick={(e) => {
            if (!selectedSize) {
              e.preventDefault();
              setSelectedSize(null);
            }
          }}
          className="btn-primary"
          style={!selectedSize ? { opacity: 0.55, cursor: "not-allowed" } : undefined}
        >
          {selectedSize ? `Order Size ${selectedSize} via WhatsApp` : "Order via WhatsApp"}
        </a>
        <Link href={collectionHref[collection]} className="btn-ghost">
          Back to {collectionLabel[collection]}
        </Link>
      </div>
    </div>
  );
}
