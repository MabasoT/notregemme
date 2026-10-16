import type { Metadata } from "next";
import { CollectionListing } from "@/components/CollectionListing";
import { collectionCopy, pageMeta } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";
import { liveProducts } from "@/lib/products";

export const metadata: Metadata = pageMetadata("collection", "/collection");

/** /collection — every SS2026 piece across Homme, Femme and Unisex. */
export default function CollectionPage(): React.ReactElement {
  return (
    <CollectionListing
      {...collectionCopy.all}
      path="/collection"
      schemaName={pageMeta.collection.title}
      schemaDescription={pageMeta.collection.description}
      products={liveProducts}
    />
  );
}
