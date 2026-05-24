"use client";

import { upcomingCopy } from "@/lib/content";

/**
 * Tiny notify-me capture used inside the bento grid. Form action is a
 * no-op (preventDefault) — wire to your ESP / Apps Script when ready.
 */
export function NotifyForm(): React.ReactElement {
  const c = upcomingCopy.cards.notify;
  return (
    <form
      className="flex flex-wrap gap-2.5"
      onSubmit={(e) => e.preventDefault()}
      action="#"
    >
      <input
        type="email"
        required
        placeholder={c.placeholder}
        className="newsletter-input"
        style={{ flex: 1, minWidth: 160, fontSize: 13 }}
        aria-label="Email for drop notification"
      />
      <button className="btn-primary" type="submit" style={{ whiteSpace: "nowrap" }}>
        {c.cta}
      </button>
    </form>
  );
}
