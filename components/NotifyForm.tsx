"use client";

import { upcomingCopy } from "@/lib/content";

/**
 * Tiny notify-me capture used inside the bento grid. Stacks vertically
 * with a full-width button. Form action is a no-op (preventDefault) —
 * wire to your ESP / Apps Script when ready.
 */
export function NotifyForm(): React.ReactElement {
  const c = upcomingCopy.cards.notify;
  return (
    <form
      className="flex w-full flex-col gap-2.5"
      onSubmit={(e) => e.preventDefault()}
      action="#"
    >
      <input
        type="email"
        required
        placeholder={c.placeholder}
        className="newsletter-input w-full"
        aria-label="Email for drop notification"
      />
      <button className="btn-primary w-full" type="submit">
        {c.cta}
      </button>
    </form>
  );
}
