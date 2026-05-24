import type { Metadata } from "next";
import { contactPage } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Reach Notre Gemme Studios via WhatsApp, Instagram, or email. We typically respond within a few hours.",
};

/**
 * Contact page — direct links to each channel with usage hints.
 */
export default function ContactPage(): React.ReactElement {
  return (
    <article className="pt-[140px] pb-[clamp(80px,10vw,140px)]">
      <div className="container-page">
        <header className="reveal mb-16 max-w-[820px]">
          <p className="section-label">{contactPage.eyebrow}</p>
          <h1 className="section-title">{contactPage.title}</h1>
          <p className="section-body mt-7">{contactPage.intro}</p>
        </header>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          {contactPage.channels.map((c, i) => (
            <a
              key={c.label}
              href={c.href}
              target={c.href.startsWith("mailto:") ? undefined : "_blank"}
              rel={c.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
              className={`glass-card reveal reveal-delay-${Math.min(i + 1, 4)} group block rounded-card p-8 transition-[transform,border-color] hover:translate-y-[-4px]`}
              style={{ borderRadius: "var(--radius-card)" }}
            >
              <div
                className="mb-3 uppercase"
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: "0.2em",
                  color: "var(--color-green)",
                }}
              >
                {c.label}
              </div>
              <div
                className="font-bold"
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "clamp(20px, 2.4vw, 28px)",
                  letterSpacing: "-0.01em",
                  color: "var(--color-fg)",
                }}
              >
                {c.value}
              </div>
              <p
                className="mt-3"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 13,
                  color: "var(--color-fg-muted)",
                  lineHeight: 1.6,
                }}
              >
                {c.note}
              </p>
              <span
                className="mt-6 inline-flex items-center gap-2 uppercase transition-transform group-hover:translate-x-1"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 11,
                  letterSpacing: "0.18em",
                  color: "var(--color-fg-muted)",
                }}
              >
                Open <span aria-hidden="true">→</span>
              </span>
            </a>
          ))}
        </div>
      </div>
    </article>
  );
}
