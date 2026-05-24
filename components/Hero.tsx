import { heroCopy } from "@/lib/content";
import { ProductImage } from "./ProductImage";

/**
 * Full-viewport hero. Floating product centerpiece, oversized GEMME background
 * type, vertical season code on the left edge, scroll-line hint bottom-right.
 */
export function Hero(): React.ReactElement {
  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden pb-20"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0"
        style={{ background: "var(--color-bg)" }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 70% at 70% 40%, oklch(25% 0.10 128 / 0.18) 0%, transparent 65%), radial-gradient(ellipse 40% 50% at 20% 80%, oklch(20% 0.08 25 / 0.12) 0%, transparent 60%), linear-gradient(180deg, transparent 40%, var(--color-bg) 100%)",
          }}
        />
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 z-0 -translate-x-1/2 -translate-y-1/2 select-none whitespace-nowrap font-bold leading-none"
        style={{
          fontFamily: "var(--font-heading)",
          fontSize: "clamp(120px, 20vw, 320px)",
          letterSpacing: "-0.02em",
          color: "rgba(255,255,255,0.025)",
        }}
      >
        {heroCopy.bgText}
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[var(--gutter)] top-1/2 z-[2] -translate-y-1/2 select-none uppercase"
        style={{
          writingMode: "vertical-rl",
          fontFamily: "var(--font-heading)",
          fontSize: "11px",
          letterSpacing: "0.3em",
          color: "rgba(255,255,255,0.15)",
        }}
      >
        {heroCopy.verticalCode}
      </div>

      <div
        className="animate-hero-float absolute left-1/2 top-1/2 z-[1] -translate-x-1/2 -translate-y-[52%]"
        style={{
          width: "clamp(280px, 38vw, 580px)",
          filter: "drop-shadow(0 40px 80px oklch(50% 0.15 128 / 0.3))",
        }}
      >
        <ProductImage
          src="/assets/img-02.jpg"
          alt="Notre Gemme flagship Evolution hoodie — featured SS2026 piece"
          motif="heart"
          aspect="3/4"
          className="rounded-[var(--radius-card)]"
        />
      </div>

      <div className="container-page relative z-[2]">
        <div className="grid grid-cols-1 items-end gap-10 md:grid-cols-2">
          <div>
            <p className="section-label">{heroCopy.eyebrow}</p>
            <h1
              className="text-balance font-bold"
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "clamp(52px, 8vw, 130px)",
                lineHeight: 0.92,
                letterSpacing: "-0.03em",
              }}
            >
              {heroCopy.headlineLines.map((line, i) => (
                <span key={line} className="block">
                  {i === heroCopy.headlineEmphasisIndex ? (
                    <em className="not-italic" style={{ color: "var(--color-green)" }}>
                      {line}
                    </em>
                  ) : (
                    line
                  )}
                </span>
              ))}
            </h1>
          </div>

          <div className="hidden flex-col items-start gap-7 pb-2 md:flex">
            <a
              href="#homme"
              className="glass-ghost inline-block rounded-pill px-9 py-[15px] text-[12px] font-semibold uppercase tracking-[0.15em] text-fg"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {heroCopy.ctaLabel}
            </a>
            <span className="flex items-center gap-2">
              <span
                aria-hidden="true"
                className="animate-pulse-dot block h-[6px] w-[6px] rounded-full"
                style={{ background: "var(--color-green)" }}
              />
              <span
                className="text-[11px] uppercase tracking-[0.15em] text-fg-muted"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {heroCopy.shippingNote}
              </span>
            </span>
          </div>
        </div>
      </div>

      <div
        className="absolute bottom-8 right-[var(--gutter)] z-[2] flex items-center gap-2.5 uppercase"
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "11px",
          letterSpacing: "0.2em",
          color: "var(--color-fg-muted)",
        }}
      >
        <span className="relative block h-px w-10 overflow-hidden" style={{ background: "var(--color-fg-muted)" }}>
          <span
            aria-hidden="true"
            className="animate-scroll-scan absolute top-0 h-full w-full"
            style={{ left: "-100%", background: "var(--color-green)" }}
          />
        </span>
        {heroCopy.scrollHint}
      </div>
    </section>
  );
}
