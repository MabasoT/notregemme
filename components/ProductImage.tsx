"use client";

import Image from "next/image";
import { useState } from "react";

type Motif = "barcode" | "suits" | "heart";

type Props = {
  src: string;
  alt: string;
  motif: Motif;
  aspect?: string;
  className?: string;
  fit?: "cover" | "contain";
};

/**
 * Image with a clean branded fallback. If the asset at /public/{src}
 * is missing or fails to load, a "Photography in progress" placeholder
 * renders instead — dark gradient, faint Notre Gemme logo silhouette,
 * a subtle motif glyph drawn as SVG paths (no copyable text content,
 * no leaking alt text). Container preserves the supplied aspect ratio
 * so layout never collapses.
 */
export function ProductImage({
  src,
  alt,
  motif,
  aspect = "3/4",
  className = "",
  fit = "cover",
}: Props): React.ReactElement {
  const [failed, setFailed] = useState<boolean>(false);
  // Empty src is the explicit "no photo yet" sentinel used in lib/products.ts.
  // Skip rendering the <Image> entirely so the placeholder is server-rendered
  // and there's no flash-of-broken-image while the client realises the
  // request 404'd.
  const missing = src.trim() === "";
  const showFallback = missing || failed;

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{
        aspectRatio: aspect,
        background:
          "radial-gradient(ellipse 65% 75% at 50% 35%, oklch(18% 0.05 128 / 0.45) 0%, transparent 70%), linear-gradient(180deg, #0e0e0e, #050505)",
      }}
    >
      {!showFallback ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1400px) 50vw, 700px"
          className="block h-full w-full"
          style={{ objectFit: fit, objectPosition: "center top" }}
          onError={() => setFailed(true)}
          priority={false}
          unoptimized
        />
      ) : (
        <BrandedFallback motif={motif} alt={alt} />
      )}
    </div>
  );
}

/**
 * Branded "photography in progress" placeholder.
 * - aria-hidden on every visual element (the parent <img> alt handles a11y)
 * - all motif glyphs drawn with <path>, no <text> so nothing copies into
 *   selections or screen-reader text outputs
 * - sr-only span carries the description for assistive tech
 */
function BrandedFallback({
  motif,
  alt,
}: {
  motif: Motif;
  alt: string;
}): React.ReactElement {
  return (
    <>
      <span className="sr-only">{alt}</span>
      <div
        aria-hidden="true"
        className="absolute inset-0 flex flex-col items-center justify-center"
      >
        {/* Brand logo silhouette — faint */}
        <Image
          src="/assets/logo notregemme.png"
          alt=""
          width={200}
          height={112}
          className="h-[60px] w-auto select-none object-contain brightness-0 invert opacity-[0.22]"
          aria-hidden="true"
          unoptimized
        />

        {/* Motif glyph — pure paths, no text */}
        <div className="mt-6 opacity-60">
          <MotifGlyph motif={motif} />
        </div>

        {/* Status pill */}
        <div
          className="mt-7 rounded-pill border border-white/10 px-3 py-1 uppercase"
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "9px",
            letterSpacing: "0.22em",
            color: "var(--color-fg-muted)",
            background: "rgba(255,255,255,0.03)",
            backdropFilter: "blur(4px)",
          }}
        >
          Photography in progress
        </div>
      </div>

      {/* Soft vignette */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 100% 100% at 50% 100%, rgba(0,0,0,0.45) 0%, transparent 60%)",
        }}
      />
    </>
  );
}

/**
 * Motif glyphs drawn as SVG paths only — no <text> elements, so the
 * suits / barcode / heart symbols don't end up in copy buffers or
 * screen-reader output.
 */
function MotifGlyph({ motif }: { motif: Motif }): React.ReactElement {
  if (motif === "barcode") {
    return (
      <svg
        width="68"
        height="22"
        viewBox="0 0 68 22"
        fill="var(--color-green)"
        aria-hidden="true"
      >
        {Array.from({ length: 14 }).map((_, i) => {
          const w = 1 + (i % 3) * 0.6;
          return (
            <rect key={i} x={i * 5} y={0} width={w} height={22} opacity={0.85} />
          );
        })}
      </svg>
    );
  }
  if (motif === "suits") {
    // Path-drawn diamond + heart icons. Stroke only — looks like a brand mark.
    return (
      <svg
        width="68"
        height="26"
        viewBox="0 0 68 26"
        fill="none"
        stroke="var(--color-green)"
        strokeWidth="1.4"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        {/* diamond */}
        <path d="M14 2 L26 13 L14 24 L2 13 Z" />
        {/* heart */}
        <path d="M40 8 C 36 4, 30 4, 30 10 C 30 16, 40 23, 40 23 C 40 23, 50 16, 50 10 C 50 4, 44 4, 40 8 Z" />
        {/* small dot accent */}
        <circle cx="63" cy="13" r="2" fill="var(--color-green)" stroke="none" />
      </svg>
    );
  }
  // heart motif
  return (
    <svg
      width="50"
      height="44"
      viewBox="0 0 50 44"
      fill="none"
      stroke="var(--color-green)"
      strokeWidth="1.4"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M25 12 C 19 4, 6 6, 6 18 C 6 30, 25 40, 25 40 C 25 40, 44 30, 44 18 C 44 6, 31 4, 25 12 Z" />
      <circle cx="25" cy="22" r="3.5" fill="var(--color-green)" stroke="none" />
    </svg>
  );
}
