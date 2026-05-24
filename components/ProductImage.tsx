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
 * Image with graceful brand-styled placeholder fallback. If the asset
 * at /public/{src} is missing or fails to load, a motif-aware SVG
 * placeholder is rendered instead. Containers preserve the supplied
 * aspect ratio so layout never collapses.
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

  return (
    <div
      className={`placeholder-art relative overflow-hidden ${className}`}
      style={{ aspectRatio: aspect }}
    >
      {!failed ? (
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
        <MotifMark motif={motif} />
      )}
    </div>
  );
}

function MotifMark({ motif }: { motif: Motif }): React.ReactElement {
  if (motif === "barcode") {
    return (
      <svg
        viewBox="0 0 200 280"
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
        preserveAspectRatio="xMidYMid meet"
      >
        <g fill="var(--color-fg-muted)" opacity="0.35">
          {Array.from({ length: 22 }).map((_, i) => {
            const w = 1.5 + (i % 4);
            return (
              <rect
                key={i}
                x={40 + i * 6}
                y={100}
                width={w}
                height={80}
              />
            );
          })}
        </g>
        <text
          x="100"
          y="60"
          textAnchor="middle"
          fontFamily="var(--font-heading)"
          fontSize="22"
          fontWeight="700"
          letterSpacing="2"
          fill="var(--color-fg-muted)"
          opacity="0.6"
        >
          NOTRE
        </text>
        <text
          x="100"
          y="220"
          textAnchor="middle"
          fontFamily="var(--font-heading)"
          fontSize="14"
          fontWeight="600"
          letterSpacing="3"
          fill="var(--color-green)"
          opacity="0.55"
        >
          GEMME
        </text>
        <text
          x="100"
          y="250"
          textAnchor="middle"
          fontFamily="var(--font-body)"
          fontSize="9"
          letterSpacing="4"
          fill="var(--color-fg-muted)"
          opacity="0.45"
        >
          0 0 4 3 2 0 0 1 6 3 2
        </text>
      </svg>
    );
  }
  if (motif === "suits") {
    return (
      <svg
        viewBox="0 0 200 280"
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
        preserveAspectRatio="xMidYMid meet"
      >
        <g fill="var(--color-fg-muted)" opacity="0.5">
          <text x="60" y="120" fontSize="48" textAnchor="middle">
            ♥
          </text>
          <text x="140" y="120" fontSize="48" textAnchor="middle">
            ♦
          </text>
          <text x="60" y="200" fontSize="48" textAnchor="middle">
            ♣
          </text>
          <text x="140" y="200" fontSize="48" textAnchor="middle">
            ♠
          </text>
        </g>
        <text
          x="100"
          y="60"
          textAnchor="middle"
          fontFamily="var(--font-heading)"
          fontSize="14"
          fontWeight="600"
          letterSpacing="4"
          fill="var(--color-green)"
          opacity="0.55"
        >
          FEMME
        </text>
      </svg>
    );
  }
  return (
    <svg
      viewBox="0 0 200 280"
      className="absolute inset-0 h-full w-full"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid meet"
    >
      <g fill="none" stroke="var(--color-green)" strokeWidth="1.2" opacity="0.55">
        <path d="M100 165 C75 130, 50 145, 60 175 C70 205, 100 220, 100 220 C100 220, 130 205, 140 175 C150 145, 125 130, 100 165 Z" />
        <circle cx="100" cy="120" r="42" />
      </g>
      <text
        x="100"
        y="60"
        textAnchor="middle"
        fontFamily="var(--font-heading)"
        fontSize="12"
        fontWeight="600"
        letterSpacing="4"
        fill="var(--color-fg-muted)"
        opacity="0.6"
      >
        LOVE EVOLVES
      </text>
    </svg>
  );
}
