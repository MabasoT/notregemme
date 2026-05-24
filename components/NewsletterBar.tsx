"use client";

import { newsletterCopy } from "@/lib/content";

/**
 * Glass-tinted newsletter call-out. Sits inside <Footer> above the link
 * grid. Form action is currently a no-op (preventDefault) — wire it up
 * to your ESP / Apps Script when ready.
 */
export function NewsletterBar(): React.ReactElement {
  return (
    <div
      className="reveal mb-[60px] flex flex-wrap items-center justify-between gap-8 rounded-card backdrop-blur-md"
      style={{
        background:
          "linear-gradient(135deg, oklch(25% 0.10 128 / 0.2), oklch(20% 0.08 130 / 0.1))",
        border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: "var(--radius-card)",
        padding: "clamp(32px,4vw,52px) clamp(28px,4vw,52px)",
      }}
    >
      <div>
        <p className="section-label">{newsletterCopy.eyebrow}</p>
        <h2 className="section-title" style={{ fontSize: "clamp(24px, 3vw, 40px)" }}>
          {newsletterCopy.titleLines.map((line) => {
            if (line.includes(newsletterCopy.emphasisWord)) {
              const [before, after] = line.split(newsletterCopy.emphasisWord);
              return (
                <span key={line} className="block">
                  {before}
                  <em style={{ fontStyle: "normal", color: "var(--color-green)" }}>
                    {newsletterCopy.emphasisWord}
                  </em>
                  {after}
                </span>
              );
            }
            return (
              <span key={line} className="block">
                {line}
              </span>
            );
          })}
        </h2>
      </div>
      <form
        className="flex flex-wrap gap-3"
        action="#"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          type="email"
          required
          placeholder={newsletterCopy.placeholder}
          className="newsletter-input"
          aria-label="Email address"
        />
        <button type="submit" className="btn-primary">
          {newsletterCopy.cta}
        </button>
      </form>
    </div>
  );
}
