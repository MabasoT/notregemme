"use client";

import Link from "next/link";
import { whatsappOrderLink } from "@/lib/site-config";
import type { ColorKey, ColorOption } from "@/lib/products";

type ProductOrderProps = {
  productName: string;
  price: string;
  sizes: ReadonlyArray<string>;
  colors: ReadonlyArray<ColorOption>;
  collection: "homme" | "femme" | "unisex";
  /** Controlled colour state (lifted so the gallery can swap its photo). */
  selectedColorKey: ColorKey;
  onSelectColor: (key: ColorKey) => void;
  /** Controlled size state. */
  selectedSize: string | null;
  onSelectSize: (size: string) => void;
  /** Colours currently unavailable. */
  soldOutColors: ReadonlyArray<ColorKey>;
  /** Whole product sold out (disables ordering). */
  soldOut: boolean;
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
 * Interactive order block. Colour + size are controlled by the parent
 * <ProductView> so picking a colour also swaps the product photo. The
 * pre-filled WhatsApp message carries both choices so the brand can
 * confirm without a back-and-forth.
 */
export function ProductOrder({
  productName,
  price,
  sizes,
  colors,
  collection,
  selectedColorKey,
  onSelectColor,
  selectedSize,
  onSelectSize,
  soldOutColors,
  soldOut,
}: ProductOrderProps): React.ReactElement {
  const selectedColor =
    colors.find((c) => c.key === selectedColorKey)?.name ?? "";
  const isColorSoldOut = soldOutColors.includes(selectedColorKey);
  const canOrder = !soldOut && !isColorSoldOut && selectedSize !== null;

  const colorPart = selectedColor ? ` in ${selectedColor}` : "";
  const orderMessage = selectedSize
    ? `Hi! I'd like to order the ${productName}${colorPart} (Size ${selectedSize}) — ${price}.`
    : `Hi! I'd like to order the ${productName}${colorPart} — ${price}.`;
  const orderHref = whatsappOrderLink(orderMessage);

  return (
    <div className="flex flex-col gap-7">
      {colors.length > 0 ? (
        <div>
          <div
            className="mb-3 flex items-baseline gap-2 uppercase"
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "0.2em",
              color: "var(--color-fg-muted)",
            }}
          >
            <span>Colour</span>
            <span
              className="normal-case"
              style={{
                fontSize: 12,
                letterSpacing: "0.02em",
                color: "var(--color-fg)",
              }}
            >
              {selectedColor}
              {isColorSoldOut ? " — sold out" : ""}
            </span>
          </div>
          <div
            className="flex flex-wrap gap-3"
            role="group"
            aria-label="Select a colour"
          >
            {colors.map((color) => {
              const active = selectedColorKey === color.key;
              const colorSoldOut = soldOutColors.includes(color.key);
              return (
                <button
                  key={color.key}
                  type="button"
                  onClick={() => onSelectColor(color.key)}
                  aria-pressed={active}
                  aria-label={
                    colorSoldOut ? `${color.name} (sold out)` : color.name
                  }
                  title={colorSoldOut ? `${color.name} — sold out` : color.name}
                  className="relative flex h-9 w-9 items-center justify-center rounded-full transition-transform duration-200"
                  style={{
                    cursor: "pointer",
                    transform: active ? "scale(1.08)" : "scale(1)",
                    opacity: colorSoldOut ? 0.45 : 1,
                    boxShadow: active
                      ? "0 0 0 2px var(--color-bg), 0 0 0 4px var(--color-green)"
                      : "0 0 0 1px rgba(255,255,255,0.18)",
                  }}
                >
                  <span
                    aria-hidden="true"
                    className="h-full w-full rounded-full"
                    style={{
                      background: color.hex,
                      border: "1px solid rgba(255,255,255,0.12)",
                    }}
                  />
                  {colorSoldOut ? (
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute h-[1px] w-[120%] rotate-45"
                      style={{ background: "rgba(255,255,255,0.7)" }}
                    />
                  ) : null}
                </button>
              );
            })}
          </div>
        </div>
      ) : null}

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
                onClick={() => onSelectSize(size)}
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
            color: canOrder ? "var(--color-fg-muted)" : "var(--color-green)",
          }}
        >
          {soldOut
            ? "This piece is currently sold out — message us to join the waitlist."
            : isColorSoldOut
              ? `${selectedColor} is sold out. Pick another colour to continue.`
              : selectedSize
                ? `Selected: ${selectedColor}, size ${selectedSize}`
                : "Please select a size to continue."}
        </p>
      </div>

      <div className="flex flex-wrap gap-3 pt-2">
        <a
          href={orderHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-disabled={!canOrder}
          onClick={(e) => {
            if (!canOrder) {
              e.preventDefault();
              if (!selectedSize) onSelectSize("");
            }
          }}
          className="btn-primary"
          style={!canOrder ? { opacity: 0.55, cursor: "not-allowed" } : undefined}
        >
          {soldOut
            ? "Join the waitlist"
            : selectedSize && !isColorSoldOut
              ? `Order ${selectedColor} / ${selectedSize} via WhatsApp`
              : "Order via WhatsApp"}
        </a>
        <Link href={collectionHref[collection]} className="btn-ghost">
          Back to {collectionLabel[collection]}
        </Link>
      </div>
    </div>
  );
}
