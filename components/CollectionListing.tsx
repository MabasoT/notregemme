import type { Collection, Product } from "@/lib/products";
import { breadcrumbSchema, collectionPageSchema } from "@/lib/schema";
import { CollectionHeader } from "./CollectionHeader";
import { JsonLd } from "./JsonLd";
import { OrderNotice } from "./OrderNotice";
import { ProductGrid } from "./ProductGrid";

/** Cards on the first row load eagerly — they are above the fold. */
const ABOVE_FOLD_CARDS = 3;

interface CollectionListingProps {
  eyebrow: string;
  title: string;
  description: string;
  /** Site-relative route, e.g. "/homme" — used for schema + breadcrumbs. */
  path: string;
  /** Schema/meta name, e.g. "Homme — Men's Streetwear SS2026". */
  schemaName: string;
  /** One-sentence summary for the CollectionPage schema. */
  schemaDescription: string;
  products: ReadonlyArray<Product>;
  /** Shows the WhatsApp order banner pre-filled for this collection. */
  orderVariant?: Collection;
  /** Extra content rendered under the grid (e.g. upcoming teaser). */
  children?: React.ReactNode;
}

/**
 * Full collection page body: h1 header, intro, WhatsApp order banner,
 * product grid, plus CollectionPage + BreadcrumbList JSON-LD.
 */
export function CollectionListing({
  eyebrow,
  title,
  description,
  path,
  schemaName,
  schemaDescription,
  products,
  orderVariant,
  children,
}: CollectionListingProps): React.ReactElement {
  return (
    <section className="pt-[140px] pb-[clamp(80px,10vw,140px)]">
      <JsonLd
        data={collectionPageSchema({
          name: schemaName,
          description: schemaDescription,
          path,
          products,
        })}
      />
      <JsonLd data={breadcrumbSchema([{ name: title, path }])} />
      <div className="container-page">
        <CollectionHeader eyebrow={eyebrow} title={title} as="h1" />
        <p className="section-body reveal -mt-5 mb-10 max-w-[640px]">{description}</p>
        {orderVariant ? <OrderNotice variant={orderVariant} /> : null}
        <ProductGrid products={products} priorityCount={ABOVE_FOLD_CARDS} />
        {children}
      </div>
    </section>
  );
}
