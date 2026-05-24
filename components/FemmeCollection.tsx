import { collectionCopy } from "@/lib/content";
import { productsByCollection } from "@/lib/products";
import { CollectionHeader } from "./CollectionHeader";
import { OrderNotice } from "./OrderNotice";
import { ProductCard } from "./ProductCard";

/**
 * Femme section — asymmetric 3-column grid (1.4fr / 1fr / 1fr) on desktop.
 * The first card is the featured "Queen of Hearts" with a wider aspect.
 * The third card is the Femme Hoodie "Coming Soon" teaser.
 */
export function FemmeCollection(): React.ReactElement {
  const items = productsByCollection("femme");
  const [featured, second, coming] = items;

  return (
    <section
      id="femme"
      className="py-[clamp(80px,10vw,140px)]"
      style={{ background: "var(--color-bg-2)" }}
    >
      <div className="container-page">
        <CollectionHeader
          eyebrow={collectionCopy.femme.eyebrow}
          title={collectionCopy.femme.title}
          viewAllLabel={collectionCopy.femme.viewAll}
          viewAllHref="/femme"
        />
        <OrderNotice variant="femme" />
        <div
          className="grid gap-[clamp(16px,2vw,24px)]"
          style={{ gridTemplateColumns: "1.4fr 1fr 1fr" }}
        >
          {featured ? <ProductCard product={featured} revealDelay={1} aspectOverride="2/2.8" /> : null}
          {second ? <ProductCard product={second} revealDelay={2} /> : null}
          {coming ? <FemmeComingSoonCard /> : null}
        </div>

        <style>{`
          @media (max-width: 1024px) {
            #femme > div > div.grid { grid-template-columns: 1fr 1fr !important; }
            #femme > div > div.grid > :first-child { grid-column: span 2; }
          }
          @media (max-width: 768px) {
            #femme > div > div.grid { grid-template-columns: 1fr !important; }
            #femme > div > div.grid > :first-child { grid-column: span 1; }
          }
        `}</style>
      </div>
    </section>
  );
}

function FemmeComingSoonCard(): React.ReactElement {
  return (
    <div
      className="reveal reveal-delay-3 flex min-h-[380px] flex-col justify-end overflow-hidden rounded-card"
      style={{
        background:
          "linear-gradient(135deg, oklch(15% 0.06 25), oklch(10% 0.04 25))",
        borderRadius: "var(--radius-card)",
      }}
    >
      <div className="flex flex-1 flex-col justify-center gap-3 p-7">
        <p className="section-label" style={{ marginBottom: 4 }}>
          Coming Soon
        </p>
        <div
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "clamp(16px, 1.8vw, 22px)",
            fontWeight: 600,
            letterSpacing: "-0.02em",
          }}
        >
          Femme Hoodie
        </div>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "13px",
            color: "var(--color-fg-muted)",
            lineHeight: 1.6,
          }}
        >
          The counterpart to our debut Evolution piece. Arriving later in SS2026.
        </p>
      </div>
      <div
        aria-hidden="true"
        style={{
          height: "4px",
          background: "linear-gradient(90deg, var(--color-red), transparent)",
          margin: "0 28px 28px",
        }}
      />
    </div>
  );
}
