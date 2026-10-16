import type { Metadata } from "next";
import { CollectionListing } from "@/components/CollectionListing";
import { collectionCopy, pageMeta } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";
import { productsByCollection } from "@/lib/products";

export const metadata: Metadata = pageMetadata("femme", "/femme");

/** Femme collection — every women's piece in the catalogue. */
export default function FemmePage(): React.ReactElement {
  return (
    <CollectionListing
      {...collectionCopy.femme}
      path="/femme"
      schemaName={pageMeta.femme.title}
      schemaDescription={pageMeta.femme.description}
      products={productsByCollection("femme")}
      orderVariant="femme"
    />
  );
}
