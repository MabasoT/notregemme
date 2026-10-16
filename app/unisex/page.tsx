import type { Metadata } from "next";
import Link from "next/link";
import { CollectionListing } from "@/components/CollectionListing";
import { Countdown } from "@/components/Countdown";
import { ProductImage } from "@/components/ProductImage";
import { SignupForm } from "@/components/SignupForm";
import { ASSETS } from "@/lib/assets";
import { collectionCopy, pageMeta, unisexTeaserCopy as t } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";
import { productsByCollection } from "@/lib/products";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = pageMetadata("unisex", "/unisex");

/**
 * Unisex collection — live unisex pieces first, then a teaser for the
 * next unisex drop (countdown, drop-alert sign-up, archive access).
 */
export default function UnisexPage(): React.ReactElement {
  return (
    <CollectionListing
      {...collectionCopy.unisex}
      path="/unisex"
      schemaName={pageMeta.unisex.title}
      schemaDescription={pageMeta.unisex.description}
      products={productsByCollection("unisex")}
      orderVariant="unisex"
    >
      <section
        className="mt-[clamp(80px,10vw,140px)]"
        aria-labelledby="unisex-next"
      >
        <p className="section-label reveal">{t.eyebrow}</p>
        <h2 id="unisex-next" className="section-title reveal mb-10" style={{ fontSize: "clamp(32px, 4vw, 56px)" }}>
          {t.title}
        </h2>
        <div
          className="glass-card reveal flex flex-wrap items-center justify-between gap-8 rounded-card p-10"
          style={{ borderRadius: "var(--radius-card)" }}
        >
          <div>
            <p className="mb-3 text-[11px] uppercase tracking-[0.3em] text-green">{t.countdownLabel}</p>
            <Countdown targetIso={siteConfig.drop.nextDropDate} />
          </div>
          <div className="w-full max-w-[420px] flex-1 sm:min-w-[280px]">
            <p className="mb-3 font-heading text-[11px] font-semibold uppercase tracking-[0.2em] text-fg-muted">
              {t.notifyLabel}
            </p>
            <SignupForm list="drop" layout="stack" />
          </div>
        </div>
      </section>

      <section
        className="mt-[clamp(80px,10vw,140px)] grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16"
        aria-labelledby="archive-teaser"
      >
        <div
          className="reveal relative overflow-hidden rounded-card"
          style={{ aspectRatio: "4/5", borderRadius: "var(--radius-card)" }}
        >
          <ProductImage
            src={ASSETS.hoodieFront}
            alt={t.archiveImageAlt}
            motif="heart"
            aspect="4/5"
            fit="contain"
            className="h-full w-full"
          />
        </div>
        <div className="reveal reveal-delay-1 flex flex-col justify-center gap-6">
          <p className="section-label">{t.archiveEyebrow}</p>
          <h2 id="archive-teaser" className="section-title">
            {t.archiveTitleBefore}
            <em>{t.archiveTitleEmphasis}</em>
            {t.archiveTitleAfter}
          </h2>
          <p className="section-body">{t.archiveBody}</p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Link href="/contact" className="btn-primary">
              {t.primaryCta}
            </Link>
            <Link href="/upcoming" className="btn-ghost">
              {t.secondaryCta}
            </Link>
          </div>
        </div>
      </section>
    </CollectionListing>
  );
}
