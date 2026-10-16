import { newsletterCopy } from "@/lib/content";
import { SignupForm } from "./SignupForm";

/**
 * Glass-tinted newsletter call-out inside <Footer>, above the link grid.
 * The form itself (states, backend, fallback) lives in <SignupForm>.
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
            const [before, after] = line.split(newsletterCopy.emphasisWord);
            return (
              <span key={line} className="block">
                {after === undefined ? (
                  line
                ) : (
                  <>
                    {before}
                    <em>{newsletterCopy.emphasisWord}</em>
                    {after}
                  </>
                )}
              </span>
            );
          })}
        </h2>
      </div>
      <SignupForm list="newsletter" layout="row" />
    </div>
  );
}
