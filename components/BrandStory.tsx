import { storyCopy } from "@/lib/content";
import { ProductImage } from "./ProductImage";

/**
 * Two-column brand story: image with quote overlay on the left, title +
 * paragraphs + 2×2 stat grid on the right. Stacks to single column on
 * tablet and below.
 */
export function BrandStory(): React.ReactElement {
  return (
    <section id="story" className="py-[clamp(80px,10vw,140px)]">
      <div className="container-page">
        <div className="grid grid-cols-1 items-center gap-[clamp(40px,6vw,100px)] md:grid-cols-2">
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
            <div
              className="absolute inset-x-0 bottom-0 p-8 italic"
              style={{
                background: "linear-gradient(transparent, rgba(5,5,5,0.9))",
                fontFamily: "var(--font-heading)",
                fontSize: "clamp(14px, 1.8vw, 22px)",
                fontWeight: 600,
                color: "var(--color-fg)",
                letterSpacing: "-0.01em",
              }}
            >
              {storyCopy.overlay}
            </div>
          </div>

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
                className={`section-body reveal reveal-delay-${i + 2}`}
              >
                {p}
              </p>
            ))}
            <div className="reveal reveal-delay-4 mt-2 grid grid-cols-2 gap-5">
              {storyCopy.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="glass-card rounded-stat px-6 py-5"
                  style={{ borderRadius: "var(--radius-stat)" }}
                >
                  <div
                    className="font-bold"
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontSize: "clamp(28px, 3vw, 48px)",
                      letterSpacing: "-0.02em",
                      color: "var(--color-fg)",
                    }}
                  >
                    {stat.number}
                    <span style={{ color: "var(--color-green)" }}>{stat.accent}</span>
                    {stat.suffix}
                  </div>
                  <div
                    className="mt-1 uppercase"
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "12px",
                      letterSpacing: "0.1em",
                      color: "var(--color-fg-muted)",
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
