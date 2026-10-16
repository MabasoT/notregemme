/**
 * Shared contract + browser client for /api/subscribe.
 * Server route and form import the same types so they can't drift.
 */

/** Lists a visitor can join. */
export const SIGNUP_LISTS = ["newsletter", "drop"] as const;
export type SignupList = (typeof SIGNUP_LISTS)[number];

/** JSON body every /api/subscribe response shares. */
export interface SubscribeResponse {
  ok: boolean;
  error?: string;
  /** True when no backend is configured or it failed — show WhatsApp fallback. */
  unavailable?: boolean;
}

/** Client-side cap so a hung request can't freeze the form. */
const REQUEST_TIMEOUT_MS = 10_000;

/**
 * Submits an email to /api/subscribe. Never throws.
 *
 * @param email - address the visitor typed
 * @param list - which list to join
 * @param company - honeypot value (empty for real visitors)
 * @returns parsed response; network failures map to { ok: false, unavailable: true }
 */
export async function submitSignup(
  email: string,
  list: SignupList,
  company: string,
): Promise<SubscribeResponse> {
  try {
    const res = await fetch("/api/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, list, company }),
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    });
    return (await res.json()) as SubscribeResponse;
  } catch {
    return { ok: false, unavailable: true };
  }
}
