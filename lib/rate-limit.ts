/**
 * In-memory sliding-window rate limiter for serverless API routes.
 *
 * Tracks request timestamps per key (typically client IP) and rejects
 * requests that exceed the configured threshold within the window.
 * State lives in the module scope of each serverless instance — it is
 * NOT shared across Vercel edge instances, so this is a per-instance
 * safety net. The primary rate limit lives in Cloudflare WAF rules.
 *
 * Stale entries are pruned on every check to prevent memory growth.
 *
 * @example
 *   const limiter = createRateLimiter({ windowMs: 60_000, maxRequests: 5 });
 *   const result  = limiter.check(clientIp);
 *   if (!result.allowed) return new Response("Too many requests", { status: 429 });
 */

/** Configuration for a rate limiter instance. */
interface RateLimiterConfig {
  /** Sliding window size in milliseconds. */
  windowMs: number;
  /** Maximum requests allowed within the window. */
  maxRequests: number;
}

/** Result of a rate-limit check. */
interface RateLimitResult {
  /** Whether the request is allowed through. */
  allowed: boolean;
  /** Remaining requests in the current window (0 when blocked). */
  remaining: number;
  /** Unix-ms timestamp when the oldest tracked request expires. */
  resetAt: number;
}

/**
 * Creates a sliding-window rate limiter backed by an in-memory Map.
 *
 * @param config - window size and request cap
 * @returns object with a `check(key)` method
 */
/** Map size at which stale keys are pruned, to bound memory per instance. */
const PRUNE_AT_KEYS = 10_000;

/** A rate limiter instance. */
export interface RateLimiter {
  check(key: string): RateLimitResult;
}

export function createRateLimiter(config: RateLimiterConfig): RateLimiter {
  const { windowMs, maxRequests } = config;
  const hits = new Map<string, number[]>();

  return {
    /**
     * Records a hit for `key` and returns whether the request is allowed.
     *
     * @param key - unique identifier, typically the client IP address
     * @returns rate-limit result with remaining count and reset time
     */
    check(key: string): RateLimitResult {
      const now = Date.now();
      const windowStart = now - windowMs;

      const timestamps = (hits.get(key) ?? []).filter((t) => t > windowStart);

      if (timestamps.length >= maxRequests) {
        hits.set(key, timestamps);
        return {
          allowed: false,
          remaining: 0,
          resetAt: (timestamps[0] ?? now) + windowMs,
        };
      }

      timestamps.push(now);
      hits.set(key, timestamps);

      // Drop keys idle for 2× the window so memory can't grow without bound.
      if (hits.size > PRUNE_AT_KEYS) {
        const pruneThreshold = now - windowMs * 2;
        for (const [k, ts] of hits) {
          if (ts.every((t) => t < pruneThreshold)) hits.delete(k);
        }
      }

      return {
        allowed: true,
        remaining: maxRequests - timestamps.length,
        resetAt: (timestamps[0] ?? now) + windowMs,
      };
    },
  };
}
