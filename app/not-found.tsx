import type { Metadata } from "next";
import Link from "next/link";
import { notFoundCopy as c } from "@/lib/content";

export const metadata: Metadata = {
  title: "Page Not Found",
  robots: { index: false, follow: true },
};

/**
 * 404 — minimal, brand-tonal.
 */
export default function NotFound(): React.ReactElement {
  return (
    <section className="flex min-h-[80vh] items-center pt-[140px]">
      <div className="container-page text-center">
        <p className="section-label justify-center">{c.eyebrow}</p>
        <h1 className="section-title">
          {c.titleBefore}
          <em>{c.titleEmphasis}</em>
          {c.titleAfter}
        </h1>
        <p className="section-body mx-auto mt-7 max-w-[480px]">{c.body}</p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link href="/" className="btn-primary">
            {c.primaryCta}
          </Link>
          <Link href="/collection" className="btn-ghost">
            {c.secondaryCta}
          </Link>
        </div>
      </div>
    </section>
  );
}
