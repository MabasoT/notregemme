import localFont from "next/font/local";

/**
 * Self-hosted brand fonts (latin variable woff2, see assets/fonts/).
 *
 * next/font/local preloads each file, serves it from our own domain and
 * generates size-adjusted Arial fallbacks, so text paints immediately
 * with no layout shift. This replaced the Google Fonts <link>, which was
 * a render-blocking third-party request costing ~1 s of FCP on mobile.
 * The exposed CSS variables feed the @theme font tokens in globals.css.
 */
export const spaceGrotesk = localFont({
  src: "../assets/fonts/space-grotesk-variable.woff2",
  weight: "400 700",
  style: "normal",
  display: "swap",
  variable: "--font-space-grotesk",
  fallback: ["Arial", "sans-serif"],
  adjustFontFallback: "Arial",
});

export const archivo = localFont({
  src: "../assets/fonts/archivo-variable.woff2",
  weight: "400 700",
  style: "normal",
  display: "swap",
  variable: "--font-archivo",
  fallback: ["Arial", "sans-serif"],
  adjustFontFallback: "Arial",
});
