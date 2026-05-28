"use client";

import { newsletterCopy } from "@/lib/content";
import { useState } from "react";

/**
 * Glass-tinted newsletter call-out. Sits inside <Footer> above the link
 * grid. Form action is currently a no-op (preventDefault) — wire it up
 * to your ESP / Apps Script when ready.
 */
export function NewsletterBar(): React.ReactElement {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail("");
  }

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
      {subscribed ? (
        <div
          className="flex items-center gap-3 rounded-pill px-6 py-4 text-center"
          style={{
            background: "rgba(110,203,62,0.12)",
            border: "1px solid rgba(110,203,62,0.25)",
            animation: "fadeInUp 0.4s ease both",
          }}
        >
          <span style={{ fontSize: "1.5rem" }}>🎉</span>
          <span
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(13px, 3vw, 15px)",
              letterSpacing: "0.05em",
              color: "var(--color-green)",
              fontWeight: 600,
            }}
          >
            You&rsquo;re subscribed. Welcome to the Gemme family.
          </span>
        </div>
      ) : (
        <form
          className="flex flex-wrap gap-3"
          action="#"
          onSubmit={handleSubmit}
        >
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={newsletterCopy.placeholder}
            className="newsletter-input"
            aria-label="Email address"
          />
          <button type="submit" className="btn-primary">
            {newsletterCopy.cta}
          </button>
        </form>
      )}
    </div>
  );
}
