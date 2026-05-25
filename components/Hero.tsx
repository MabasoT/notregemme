import { heroCopy } from "@/lib/content";
import { asset } from "@/lib/site-config";

/**
 * Full-viewport hero. Cinematic background using Background.png with a
 * heavy darkening overlay (the source is intentionally small, so we
 * upscale + blur it as an ambient texture rather than a literal photo).
 * Floating product centerpiece, oversized GEMME background type, vertical
 * season code on the left edge, scroll-line hint bottom-right.
 */
export function Hero(): React.ReactElement {
  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden pb-24 pt-32"
    >
      {/* Background image layer — upscaled + blurred to act as ambient texture */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0"
        style={{ background: "var(--color-bg)" }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url('${asset("/assets/Background.png")}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            filter: "blur(2px) brightness(0.6) saturate(1.1)",
            transform: "scale(1.05)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 70% at 70% 30%, oklch(28% 0.12 128 / 0.35) 0%, transparent 65%), radial-gradient(ellipse 40% 50% at 20% 80%, oklch(22% 0.10 25 / 0.25) 0%, transparent 60%), linear-gradient(180deg, rgba(5,5,5,0.55) 0%, rgba(5,5,5,0.65) 40%, var(--color-bg) 100%)",
          }}
        />
      </div>

      {/* Oversized ghost wordmark */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 z-0 -translate-x-1/2 -translate-y-1/2 select-none whitespace-nowrap font-bold leading-none"
        style={{
          fontFamily: "var(--font-heading)",
          fontSize: "clamp(140px, 22vw, 380px)",
          letterSpacing: "-0.02em",
          color: "rgba(255,255,255,0.03)",
        }}
      >
        {heroCopy.bgText}
      </div>

      {/* Vertical season code, left edge */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[var(--gutter)] top-1/2 z-[2] hidden -translate-y-1/2 select-none uppercase md:block"
        style={{
          writingMode: "vertical-rl",
          fontFamily: "var(--font-heading)",
          fontSize: "11px",
          letterSpacing: "0.3em",
          color: "rgba(255,255,255,0.2)",
        }}
      >
        {heroCopy.verticalCode}
      </div>

      <div className="container-page relative z-[3]">
        <div className="grid grid-cols-1 items-end gap-10 md:grid-cols-2">
          <div>
            <p className="section-label">{heroCopy.eyebrow}</p>
            <h1
              className="text-balance font-bold"
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "clamp(58px, 9vw, 150px)",
                lineHeight: 0.9,
                letterSpacing: "-0.035em",
              }}
            >
              {heroCopy.headlineLines.map((line, i) => (
                <span key={line} className="block">
                  {i === heroCopy.headlineEmphasisIndex ? (
                    <em
                      className="not-italic"
                      style={{ color: "var(--color-green)" }}
                    >
                      {line}
                    </em>
                  ) : (
                    line
                  )}
                </span>
              ))}
            </h1>
          </div>

          <div className="flex flex-col items-start gap-5 pb-2 md:gap-7">
            <div className="flex flex-wrap items-center gap-3">
              <a href="#collection" className="btn-primary">
                {heroCopy.ctaLabel}
              </a>
              <a href="#story" className="btn-ghost">
                Our Story
              </a>
            </div>
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
        className="absolute bottom-8 right-[var(--gutter)] z-[3] hidden items-center gap-2.5 uppercase md:flex"
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "11px",
          letterSpacing: "0.2em",
          color: "var(--color-fg-muted)",
        }}
      >
        <span
          className="relative block h-px w-10 overflow-hidden"
          style={{ background: "var(--color-fg-muted)" }}
        >
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
