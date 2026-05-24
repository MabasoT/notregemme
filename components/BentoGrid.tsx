import { upcomingCopy } from "@/lib/content";
import { siteConfig } from "@/lib/site-config";
import { CollectionHeader } from "./CollectionHeader";
import { Countdown } from "./Countdown";
import { NotifyForm } from "./NotifyForm";
import { ProductImage } from "./ProductImage";

/**
 * Upcoming bento section — 12-column CSS grid with named span cells.
 * Mix of: countdown teaser, blurred image teasers, sketch placeholders,
 * and a "notify me" newsletter capture.
 */
export function BentoGrid(): React.ReactElement {
  const c = upcomingCopy.cards;

  return (
    <section
      id="upcoming"
      className="py-[clamp(80px,10vw,140px)]"
      style={{ background: "var(--color-bg)" }}
    >
      <div className="container-page">
        <CollectionHeader eyebrow={upcomingCopy.eyebrow} title={upcomingCopy.title} />

        <div className="bento-grid">
          {/* 1 — Hero countdown teaser */}
          <div className="bento-card bento-1 reveal reveal-delay-1">
            <div className="flex h-full flex-col justify-between p-8">
              <div>
                <BentoTag>
                  <span
                    aria-hidden="true"
                    className="diamond-clip block h-2 w-2"
                    style={{ background: "var(--color-green)" }}
                  />
                  {upcomingCopy.hero.tag}
                </BentoTag>
                <div
                  className="font-bold"
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontSize: "clamp(28px, 3.5vw, 52px)",
                    letterSpacing: "-0.02em",
                    lineHeight: 1.15,
                  }}
                >
                  {upcomingCopy.hero.titleLines.map((l) => (
                    <span key={l} className="block">
                      {l}
                    </span>
                  ))}
                </div>
                <p className="mt-4 max-w-[360px] font-body text-[13px] leading-[1.65] text-fg-muted">
                  {upcomingCopy.hero.description}
                </p>
              </div>
              <div>
                <div className="mb-3 font-heading text-[10px] font-medium uppercase tracking-[0.15em] text-fg-muted">
                  {upcomingCopy.hero.countdownLabel}
                </div>
                <Countdown targetIso={siteConfig.drop.nextDropDate} />
              </div>
            </div>
          </div>

          {/* 2 — Blurred Archive teaser */}
          <div className="bento-card bento-2 reveal reveal-delay-2 relative">
            <div className="absolute inset-0">
              <ProductImage
                src="/assets/Product 1.jpg"
                alt=""
                motif="barcode"
                aspect="16/9"
                className="h-full w-full opacity-90"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0"
                style={{
                  backdropFilter: "blur(12px) brightness(0.4)",
                  WebkitBackdropFilter: "blur(12px) brightness(0.4)",
                  transition: "backdrop-filter 0.4s, -webkit-backdrop-filter 0.4s",
                }}
                data-bento-blur
              />
            </div>
            <div className="bento-overlay">
              <BentoTag>
                <span
                  aria-hidden="true"
                  className="diamond-clip block h-2 w-2"
                  style={{ background: "var(--color-green)" }}
                />
                {c.archive.tag}
              </BentoTag>
              <BentoTitle>{c.archive.title}</BentoTitle>
              <BentoDesc>{c.archive.description}</BentoDesc>
            </div>
            <ComingSoonBadge label={c.archive.badge} corner />
          </div>

          {/* 3 — Sketch 1 */}
          <div className="bento-card bento-3 reveal reveal-delay-3">
            <SketchPlaceholder shape="circle" label={c.sketch1.label} />
            <ComingSoonBadge label={c.sketch1.badge} />
          </div>

          {/* 4 — Sketch 2 */}
          <div className="bento-card bento-4 reveal reveal-delay-4">
            <SketchPlaceholder shape="square" label={c.sketch2.label} />
          </div>

          {/* 5 — Blurred Evolution II teaser */}
          <div className="bento-card bento-5 reveal reveal-delay-1 relative">
            <div className="absolute inset-0">
              <ProductImage
                src="/assets/Hoodie back.png"
                alt=""
                motif="heart"
                aspect="16/9"
                className="h-full w-full opacity-90"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0"
                style={{
                  backdropFilter: "blur(12px) brightness(0.4)",
                  WebkitBackdropFilter: "blur(12px) brightness(0.4)",
                }}
              />
            </div>
            <div className="bento-overlay">
              <BentoTag>
                <span
                  aria-hidden="true"
                  className="diamond-clip block h-2 w-2"
                  style={{ background: "var(--color-red)" }}
                />
                {c.evolutionII.tag}
              </BentoTag>
              <BentoTitle>{c.evolutionII.title}</BentoTitle>
              <BentoDesc>{c.evolutionII.description}</BentoDesc>
            </div>
            <ComingSoonBadge label={c.evolutionII.badge} corner />
          </div>

          {/* 6 — Notify capture */}
          <div
            className="bento-card bento-6 reveal reveal-delay-2 flex flex-col justify-between gap-5 p-7"
            style={{
              background: "linear-gradient(135deg, oklch(15% 0.08 128 / 0.3), transparent)",
            }}
          >
            <BentoTag>{c.notify.tag}</BentoTag>
            <div className="font-heading text-[clamp(18px,2.2vw,26px)] font-bold leading-[1.15] tracking-[-0.02em]">
              {c.notify.titleLines.map((l) => (
                <span key={l} className="block">
                  {l}
                </span>
              ))}
            </div>
            <NotifyForm />
          </div>

          {/* 7 — Sketch 3 (accessories) */}
          <div className="bento-card bento-7 reveal reveal-delay-3">
            <SketchPlaceholder shape="triad" label={c.sketch3.label} />
          </div>
        </div>
      </div>

      <style>{`
        .bento-grid {
          display: grid;
          grid-template-columns: repeat(12, 1fr);
          gap: clamp(12px, 1.5vw, 20px);
        }
        .bento-card {
          background: var(--color-bg-3);
          border: 1px solid rgba(255,255,255,0.05);
          border-radius: var(--radius-card);
          overflow: hidden;
          position: relative;
        }
        .bento-1 { grid-column: span 5; grid-row: span 2; min-height: 460px; }
        .bento-2 { grid-column: span 7; min-height: 220px; }
        .bento-3 { grid-column: span 4; min-height: 220px; }
        .bento-4 { grid-column: span 3; min-height: 220px; }
        .bento-5 { grid-column: span 5; min-height: 220px; }
        .bento-6 { grid-column: span 4; min-height: 220px; }
        .bento-7 { grid-column: span 3; min-height: 220px; }
        .bento-overlay {
          position: absolute; inset: 0;
          display: flex; flex-direction: column; justify-content: flex-end;
          padding: 28px;
        }
        @media (max-width: 1024px) {
          .bento-1 { grid-column: span 12; min-height: 320px; }
          .bento-2 { grid-column: span 6; }
          .bento-3 { grid-column: span 6; }
          .bento-4 { grid-column: span 4; }
          .bento-5 { grid-column: span 8; }
          .bento-6 { grid-column: span 6; }
          .bento-7 { grid-column: span 6; }
        }
        @media (max-width: 768px) {
          .bento-1, .bento-2, .bento-3, .bento-4, .bento-5, .bento-6, .bento-7 {
            grid-column: span 12; min-height: 200px;
          }
          .bento-1 { min-height: 280px; }
        }
      `}</style>
    </section>
  );
}

function BentoTag({ children }: { children: React.ReactNode }): React.ReactElement {
  return (
    <span
      className="mb-3.5 inline-flex w-fit items-center gap-2 rounded-pill px-3.5 py-1.5 uppercase"
      style={{
        fontFamily: "var(--font-heading)",
        fontSize: "10px",
        fontWeight: 600,
        letterSpacing: "0.2em",
        color: "var(--color-green)",
        background: "rgba(0,0,0,0.5)",
        border: "1px solid rgba(255,255,255,0.08)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        borderRadius: "var(--radius-pill)",
      }}
    >
      {children}
    </span>
  );
}

function BentoTitle({ children }: { children: React.ReactNode }): React.ReactElement {
  return (
    <div
      className="font-bold"
      style={{
        fontFamily: "var(--font-heading)",
        fontSize: "clamp(18px, 2vw, 28px)",
        letterSpacing: "-0.02em",
        lineHeight: 1.15,
      }}
    >
      {children}
    </div>
  );
}

function BentoDesc({ children }: { children: React.ReactNode }): React.ReactElement {
  return (
    <p
      className="mt-2"
      style={{
        fontFamily: "var(--font-body)",
        fontSize: "13px",
        color: "var(--color-fg-muted)",
        lineHeight: 1.6,
      }}
    >
      {children}
    </p>
  );
}

function ComingSoonBadge({ label, corner }: { label: string; corner?: boolean }): React.ReactElement {
  return (
    <div
      className={
        corner
          ? "absolute right-6 top-6"
          : "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center"
      }
    >
      <span
        className="animate-pulse-border inline-block rounded-pill px-6 py-2.5 uppercase"
        style={{
          fontFamily: "var(--font-heading)",
          fontSize: "clamp(12px, 1.5vw, 16px)",
          fontWeight: 600,
          letterSpacing: "0.25em",
          color: "var(--color-green)",
          border: "1px solid var(--color-green-dim)",
          background: "rgba(0,0,0,0.4)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          borderRadius: "var(--radius-pill)",
        }}
      >
        {label}
      </span>
    </div>
  );
}

function SketchPlaceholder({
  shape,
  label,
}: {
  shape: "circle" | "square" | "triad";
  label: string;
}): React.ReactElement {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 p-7 text-center">
      {shape === "circle" ? (
        <div
          className="h-20 w-20 rounded-full"
          style={{ border: "1px solid rgba(255,255,255,0.08)" }}
        />
      ) : shape === "square" ? (
        <div
          className="h-[60px] w-[60px]"
          style={{
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "var(--radius-card)",
          }}
        />
      ) : (
        <div className="flex justify-center gap-2">
          <div
            className="h-6 w-6 rounded"
            style={{ background: "rgba(255,255,255,0.04)" }}
          />
          <div
            className="h-6 w-6 rounded"
            style={{ background: "rgba(255,255,255,0.04)" }}
          />
          <div
            className="h-6 w-6 rounded"
            style={{ background: "rgba(255,255,255,0.04)" }}
          />
        </div>
      )}
      <div className="flex w-[80%] max-w-[200px] flex-col gap-2.5">
        <div
          className="h-px"
          style={{ background: "rgba(255,255,255,0.08)", width: "70%" }}
        />
        <div
          className="h-px"
          style={{ background: "rgba(255,255,255,0.08)", width: "90%" }}
        />
        <div
          className="h-px"
          style={{ background: "rgba(255,255,255,0.08)", width: "55%" }}
        />
      </div>
      <div
        className="text-center"
        style={{
          fontFamily: "'Courier New', monospace",
          fontSize: "10px",
          color: "rgba(255,255,255,0.35)",
          letterSpacing: "0.06em",
        }}
      >
        {label}
      </div>
    </div>
  );
}
