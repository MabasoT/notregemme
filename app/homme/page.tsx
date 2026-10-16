import type { Metadata } from "next";
import { CollectionListing } from "@/components/CollectionListing";
import { collectionCopy, pageMeta } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";
import { productsByCollection } from "@/lib/products";

export const metadata: Metadata = pageMetadata("homme", "/homme");

/** Homme collection — every men's piece in the catalogue. */
export default function HommePage(): React.ReactElement {
  return (
    <CollectionListing
      {...collectionCopy.homme}
      path="/homme"
      schemaName={pageMeta.homme.title}
      schemaDescription={pageMeta.homme.description}
      products={productsByCollection("homme")}
      orderVariant="homme"
    />
  );
}
