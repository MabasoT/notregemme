import Link from "next/link";

/**
 * 404 — minimal, brand-tonal.
 */
export default function NotFound(): React.ReactElement {
  return (
    <section className="flex min-h-[80vh] items-center pt-[140px]">
      <div className="container-page text-center">
        <p className="section-label justify-center">404 — Lost in the void</p>
        <h1 className="section-title">
          This page is <em>not</em> a gem.
        </h1>
        <p className="section-body mt-7 mx-auto max-w-[480px]">
          The page you're looking for doesn't exist — or perhaps it's still being
          crafted. Try heading back to the home page.
        </p>
        <div className="mt-10 flex justify-center gap-3">
          <Link href="/" className="btn-primary">
            Back to Home
          </Link>
          <Link href="/homme" className="btn-ghost">
            Browse Homme
          </Link>
        </div>
      </div>
    </section>
  );
}
