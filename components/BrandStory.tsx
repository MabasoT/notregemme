import { storyCopy } from "@/lib/content";
import { ProductImage } from "./ProductImage";

/**
 * Two-column brand story: image on the left with quote below it, title +
 * paragraphs + 2x2 stat grid on the right. Stacks to single column on
 * tablet and below.
 *
 * The brand quote sits directly below the hoodie image — not overlaid on it.
 */
export function BrandStory(): React.ReactElement {
  return (
    <section id="story" className="py-[clamp(80px,10vw,140px)]">
      <div className="container-page">
        <div className="grid grid-cols-1 items-start gap-[clamp(40px,6vw,100px)] md:grid-cols-2">

          {/* Left column — hoodie image + quote below */}
          <div className="flex flex-col">
            <div
              className="reveal relative overflow-hidden rounded-card"
              style={{ aspectRatio: "4/5" }}
            >
              <ProductImage
                src="/assets/Hoodie back.png"
                alt={storyCopy.imageAlt}
                motif="heart"
                aspect="4/5"
                fit="cover"
                className="h-full w-full"
              />
            </div>

            {/* Brand quote — placed directly below the hoodie image */}
            <div
              className="mt-6 px-1"
            >
              {/* Icon row — diamond + heart in brand green */}
              <div
                className="mb-3 flex items-center gap-2"
                aria-hidden="true"
                style={{ color: "var(--color-green)" }}
              >
                <span style={{ fontSize: 16 }}>&#x2666;</span>
                <span style={{ fontSize: 16 }}>&#x2665;</span>
                <span
                  style={{
                    display: "inline-block",
                    width: 28,
                    height: 1,
                    background: "var(--color-green)",
                    opacity: 0.6,
                  }}
                />
              </div>
              {/* Brand quote */}
              <p
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "clamp(15px, 1.6vw, 20px)",
                  fontWeight: 600,
                  fontStyle: "italic",
                  color: "var(--color-fg)",
                  letterSpacing: "-0.01em",
                  lineHeight: 1.35,
                }}
              >
                &ldquo;Love doesn&rsquo;t vanish &mdash; It Evolves. Ves.&rdquo;
              </p>
              {/* Sub-caption */}
              <p
                className="mt-2 flex items-center gap-1.5"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 11,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "var(--color-green)",
                  opacity: 0.8,
                }}
              >
                <span aria-hidden="true">&#x2666;</span>
                SS 2026
              </p>
            </div>
          </div>

          {/* Right column — story text + stat grid */}
          <div className="flex flex-col gap-7">
            <div className="reveal reveal-delay-1">
              <p className="section-label">{storyCopy.eyebrow}</p>
              <h2 className="section-title">
                {storyCopy.titleLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </h2>
            </div>
            {storyCopy.paragraphs.map((p, i) => (
              <p
                key={i}
                className={"section-body reveal reveal-delay-" + (i + 2)}
              >
                {p}
              </p>
            ))}
            <div className="reveal reveal-delay-4 mt-4 grid grid-cols-2 gap-5">
              {storyCopy.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="glass-card px-7 py-6"
                  style={{ borderRadius: "var(--radius-stat)" }}
                >
                  <div
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontSize: "clamp(28px, 3vw, 48px)",
                      fontWeight: 700,
                      letterSpacing: "-0.02em",
                      lineHeight: 1,
                      color: "var(--color-fg)",
                    }}
                  >
                    {stat.number}
                    <span style={{ color: "var(--color-green)" }}>{stat.accent}</span>
                    {stat.suffix}
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "12px",
                      letterSpacing: "0.1em",
                      color: "var(--color-fg-muted)",
                      marginTop: "4px",
                      textTransform: "uppercase",
                    }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
