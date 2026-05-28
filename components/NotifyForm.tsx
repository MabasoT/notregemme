"use client";

import { upcomingCopy } from "@/lib/content";
import { useState } from "react";

/**
 * Tiny notify-me capture used inside the bento grid. Stacks vertically
 * with a full-width button. Form action is a no-op (preventDefault) —
 * wire to your ESP / Apps Script when ready.
 */
export function NotifyForm(): React.ReactElement {
  const c = upcomingCopy.cards.notify;
  const [email, setEmail] = useState("");
  const [notified, setNotified] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setNotified(true);
    setEmail("");
  }

  return (
    <>
    {notified ? (
      <div
        className="flex items-center justify-center gap-2 rounded-pill px-5 py-4 text-center"
        style={{
          background: "rgba(110,203,62,0.1)",
          border: "1px solid rgba(110,203,62,0.25)",
          animation: "fadeInUp 0.4s ease both",
        }}
      >
        <span style={{ fontSize: "1.2rem" }}>💎</span>
        <span
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "clamp(12px, 3vw, 14px)",
            letterSpacing: "0.05em",
            color: "var(--color-green)",
            fontWeight: 600,
          }}
        >
          You will be notified ✅
        </span>
        <span style={{ fontSize: "1.2rem" }}>💎</span>
      </div>
    ) : (
      <form
        className="flex w-full flex-col gap-2.5"
        onSubmit={handleSubmit}
        action="#"
      >
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={c.placeholder}
          className="newsletter-input w-full"
          aria-label="Email for drop notification"
        />
        <button className="btn-primary w-full" type="submit">
          {c.cta}
        </button>
      </form>
    )}
    </>
  );
}
