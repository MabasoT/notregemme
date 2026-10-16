/**
 * Shared image paths under /public. Rename or swap a file here and every
 * component that shows it updates. Product photos live in lib/products.ts.
 */
export const ASSETS = {
  logo: "/assets/logo-notregemme.png",
  /** White-on-transparent variant for dark surfaces (OG image, header). */
  logoWhite: "/assets/logo-notregemme-white.png",
  heroBackground: "/assets/hero-background.webp",
  hoodieFront: "/assets/evolution-hoodie-front.png",
  hoodieBack: "/assets/evolution-hoodie-back.png",
  queenOfHeartsTee: "/assets/queen-of-hearts-tee.jpg",
  kingOfHeartsTee: "/assets/king-of-hearts-tee.jpg",
  iconInstagram: "/assets/icon-instagram.webp",
  iconWhatsapp: "/assets/icon-whatsapp.webp",
  builderLogo: "/assets/logo-mabasodevai.png",
} as const;

/** Intrinsic size of the brand logo PNG (needed by next/image). */
export const LOGO_SIZE = { width: 200, height: 112 } as const;
