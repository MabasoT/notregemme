import type { NextConfig } from "next";

/**
 * Static export config — produces a fully static `out/` directory so the
 * site can be hosted on GitHub Pages (or any static host).
 *
 * - `output: "export"` writes plain HTML/CSS/JS for every route
 * - `basePath: "/notregemme"` matches the GitHub Pages URL
 *   (https://<user>.github.io/notregemme/). If you set up a custom
 *   domain or move to the user/org root, drop this back to "".
 * - `trailingSlash: true` makes GitHub Pages happy (it serves /foo/
 *   as /foo/index.html cleanly without redirects)
 * - `images.unoptimized: true` is required for static export
 *
 * Note: `headers()` is NOT available with `output: "export"` — security
 * headers must be applied at the hosting layer instead. CSP / HSTS /
 * etc. are still in place when serving from Vercel; when serving from
 * GitHub Pages, GitHub applies its own baseline security headers.
 */
const isGithubPages = process.env.GITHUB_PAGES === "true";
const basePath = isGithubPages ? "/notregemme" : "";

const config: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  basePath: basePath || undefined,
  assetPrefix: basePath || undefined,
  env: {
    // Exposed so `asset()` in lib/site-config.ts can prefix /public paths
    // for hosts that serve the site under a sub-path (GitHub Pages).
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default config;
