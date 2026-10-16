import { createRateLimiter } from "@/lib/rate-limit";
import { isValidEmail } from "@/lib/validation";
import { SITE_URL } from "@/lib/site-config";
import { SIGNUP_LISTS, type SignupList, type SubscribeResponse } from "@/lib/subscribe";

/**
 * /api/subscribe — server-side relay for the newsletter and drop-alert forms.
 *
 * Forwards { email, list } to a Google Apps Script web app that appends
 * the address to a Google Sheet (docs/subscribe-backend.gs). The script
 * URL is server-only, so it never reaches the browser bundle.
 *
 * Spam prevention: honeypot field ("company") + per-IP rate limit.
 * When SUBSCRIBE_SCRIPT_URL is unset the route answers 503, and the form
 * offers a WhatsApp fallback instead of pretending the sign-up worked.
 */

export const runtime = "nodejs";

/** Apps Script web-app /exec URL. Server-only — never NEXT_PUBLIC_. */
const SCRIPT_URL = process.env.SUBSCRIBE_SCRIPT_URL ?? "";

/** Apps Script can be slow on a cold start; cap the wait. */
const UPSTREAM_TIMEOUT_MS = 8_000;

/** Sign-ups allowed per IP inside one window. */
const MAX_SUBMISSIONS_PER_WINDOW = 5;

/** Rate-limit window: 15 minutes. */
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1_000;


const limiter = createRateLimiter({
  windowMs: RATE_LIMIT_WINDOW_MS,
  maxRequests: MAX_SUBMISSIONS_PER_WINDOW,
});

/** Validated request body. */
interface SubscribePayload {
  email: string;
  list: SignupList;
  /** Honeypot — real users leave this empty; bots fill it. */
  company: string;
}

function json(body: SubscribeResponse, status: number): Response {
  return Response.json(body, { status });
}

/**
 * Client IP from proxy headers (Cloudflare first, then Vercel).
 *
 * @param request - incoming request
 * @returns IP string, or "unknown" (all unknowns share one bucket)
 */
function getClientIp(request: Request): string {
  return (
    request.headers.get("cf-connecting-ip") ??
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown"
  );
}

/**
 * Narrows an unknown JSON body into a SubscribePayload.
 *
 * @param data - parsed JSON of unknown shape
 * @returns the typed payload, or a message describing the first problem
 */
function parsePayload(data: unknown): SubscribePayload | string {
  if (typeof data !== "object" || data === null) return "Invalid request body.";
  const d = data as Record<string, unknown>;
  const email = typeof d.email === "string" ? d.email.trim() : "";
  const list = SIGNUP_LISTS.find((l) => l === d.list) ?? "newsletter";
  const company = typeof d.company === "string" ? d.company.trim() : "";
  if (!isValidEmail(email)) return "Please enter a valid email address.";
  return { email, list, company };
}

export async function POST(request: Request): Promise<Response> {
  if (!limiter.check(getClientIp(request)).allowed) {
    return json({ ok: false, error: "Too many attempts. Please try again in a few minutes." }, 429);
  }

  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return json({ ok: false, error: "Invalid request body." }, 400);
  }

  const parsed = parsePayload(raw);
  if (typeof parsed === "string") return json({ ok: false, error: parsed }, 400);

  // Honeypot tripped: report success so bots learn nothing, store nothing.
  if (parsed.company.length > 0) return json({ ok: true }, 200);

  if (!SCRIPT_URL) {
    return json({ ok: false, unavailable: true }, 503);
  }

  try {
    const res = await fetch(SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: parsed.email, list: parsed.list, site: SITE_URL }),
      signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS),
    });
    if (!res.ok) throw new Error(`Apps Script responded ${res.status}`);
    return json({ ok: true }, 200);
  } catch (error) {
    console.error("[api/subscribe]", error);
    return json({ ok: false, unavailable: true }, 502);
  }
}
