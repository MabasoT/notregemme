import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

/**
 * Content Security Policy — whitelist only.
 *
 * 'unsafe-inline' on script-src is an accepted trade-off: the only inline
 * scripts are server-serialized JSON-LD and Next's own bootstrap — no user
 * input ever reaches them. 'unsafe-eval' is added in development only,
 * because React's dev tooling needs it; production never ships it.
 */
const CSP_DIRECTIVES = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com",
  "img-src 'self' data: blob: https:",
  // Optional live-stock / sign-up feeds run on Google Apps Script, which
  // answers via a 302 to script.googleusercontent.com — both are needed.
  "connect-src 'self' https://script.google.com https://script.googleusercontent.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join("; ");

const SECURITY_HEADERS = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // 2-year HSTS. Only served over HTTPS (Vercel enforces it on every domain).
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=()",
  },
  { key: "Content-Security-Policy", value: CSP_DIRECTIVES },
];

const config: NextConfig = {
  reactStrictMode: true,
  // Never advertise the stack in response headers.
  poweredByHeader: false,
  images: {
    // AVIF first (smallest), WebP fallback — next/image converts on Vercel.
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [{ source: "/(.*)", headers: SECURITY_HEADERS }];
  },
  async redirects() {
    // Legacy GitHub Pages paths and the old /shop links → canonical routes.
    return [
      { source: "/notregemme", destination: "/", permanent: true },
      { source: "/notregemme/:path*", destination: "/:path*", permanent: true },
      { source: "/shop", destination: "/collection", permanent: true },
    ];
  },
};

export default config;
