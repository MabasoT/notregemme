/**
 * All user-facing copy lives here.
 * Components render — they never author. Change a line here, not in JSX.
 */
import { siteConfig, whatsappOrderLink, DEFAULT_ORDER_MESSAGE } from "./site-config";

/** Title + meta description for one route. */
export interface PageMeta {
  /** Page title before the " — Notre Gemme" template suffix (≤ 45 chars). */
  title: string;
  /** Meta description, 140–160 characters. */
  description: string;
}

/**
 * SEO metadata per route. Titles lead with the primary keyword; the root
 * layout appends " — Notre Gemme" via the title template.
 */
export const pageMeta = {
  home: {
    title: "Notre Gemme — Luxury Streetwear South Africa",
    description:
      "Luxury minimalist streetwear from Tembisa, South Africa. Shop the SS2026 heavyweight cotton hoodies and tees — Homme, Femme and Unisex. Order on WhatsApp.",
  },
  collection: {
    title: "SS2026 Streetwear Collection",
    description:
      "Shop the full Notre Gemme SS2026 collection: heavyweight cotton tees and hoodies, designed in South Africa. Order on WhatsApp with nationwide courier.",
  },
  homme: {
    title: "Homme — Men's Streetwear SS2026",
    description:
      "Notre Gemme Homme: barcode tees, King of Hearts and the Evolution hoodie in heavyweight cotton. Men's luxury streetwear from South Africa, SS2026.",
  },
  femme: {
    title: "Femme — Women's Streetwear SS2026",
    description:
      "Notre Gemme Femme: the Queen of Hearts tee and soft, intentional silhouettes in heavyweight cotton. Women's luxury streetwear from South Africa, SS2026.",
  },
  unisex: {
    title: "Unisex Streetwear — SS2026",
    description:
      "Notre Gemme Unisex: heavyweight cotton pieces cut for everyone, starting with the Rooted in Humanity tee. Luxury streetwear from Tembisa, South Africa.",
  },
  upcoming: {
    title: "Upcoming Drops — AW2026",
    description:
      "See what's next from Notre Gemme. AW2026 previews, design sketches and early drop alerts for South Africa's luxury minimalist streetwear house.",
  },
  story: {
    title: "Our Story — Humanity, Our Treasure",
    description:
      "Notre Gemme was born in Tembisa from the belief that humanity is the rarest gem of all. Read the story behind South Africa's luxury streetwear house.",
  },
  about: {
    title: "About Us — Tembisa 1632, South Africa",
    description:
      "Notre Gemme means 'Our Gem'. A 100% Black-owned fashion and art brand from Tembisa 1632, South Africa, built on emotion, memory and human experience.",
  },
  contact: {
    title: "Contact & Orders",
    description:
      "Contact Notre Gemme on WhatsApp, Instagram or email for orders, sizing and collaborations. Luxury streetwear from South Africa, couriered nationwide.",
  },
} as const satisfies Record<string, PageMeta>;

export const heroCopy = {
  eyebrow: "Luxury Streetwear — Est. 2026 — South Africa",
  headlineLines: ["Humanity,", "Our", "Treasure."],
  headlineEmphasisIndex: 1,
  ctaLabel: "Shop Collection",
  secondaryCtaLabel: "Our Story",
  shippingNote: "Nationwide courier · ZA",
  scrollHint: "Scroll",
  verticalCode: "001 — SS2026 — ZA",
  bgText: "GEMME",
} as const;

export const shippingStripCopy = [
  { label: "Orders via WhatsApp Only", tone: "green" },
  { label: "Nationwide Courier Available", tone: "green" },
  { label: "SS2026 — Live Now", tone: "red" },
] as const;

export const marqueeWords = [
  "Humanity, Our Treasure",
  "Built Different",
  "Made to Endure",
  "Rooted in Values",
  "Love Evolves",
  "SS 2026",
  "South Africa",
  "Notre Gemme",
] as const;

export const storyCopy = {
  eyebrow: "Brand Story",
  titleLines: ["Love", "Evolves."],
  /** Matches the print on the Evolution hoodie — "Ves." is intentional. */
  quote: "Love doesn’t vanish — it evolves. Ves.",
  quoteCaption: "SS 2026",
  imageAlt: "Notre Gemme Evolution hoodie back print — anatomical heart with 'Love doesn't vanish, it evolves'",
  paragraphs: [
    "Notre Gemme was born from the belief that humanity is the rarest gem of all. Every piece we create is a translation of feeling into form — a wearable memory, a statement of identity, a quiet act of love for who you are and who you're becoming.",
    "We are not just a clothing brand. We are a testimony to the South African spirit — resilient, bold, deeply human. Built different. Made to endure.",
  ],
  stats: [
    { number: "1", accent: "6", suffix: "32", label: "Founding Code" },
    { number: "SS", accent: "'", suffix: "26", label: "Debut Season" },
    { number: "3", accent: "♦", suffix: "", label: "Collections" },
    { number: "ZA", accent: "+", suffix: "", label: "Origin" },
  ],
} as const;

export const collectionCopy = {
  all: {
    eyebrow: "SS 2026",
    title: "Collection",
    description:
      "Every SS2026 piece in one place — heavyweight cotton tees and hoodies across Homme, Femme and Unisex.",
  },
  homme: {
    eyebrow: "SS 2026",
    title: "Homme",
    description:
      "The barcode collection. Heavyweight cotton, intentional graphics, built for the modern man.",
  },
  femme: {
    eyebrow: "SS 2026",
    title: "Femme",
    description:
      "Soft silhouettes, bold emotion. Designed for the woman who moves through the world with intention.",
  },
  unisex: {
    eyebrow: "SS 2026",
    title: "Unisex",
    description:
      "Pieces designed without a side of the line — worn by whoever the silhouette serves.",
  },
} as const;

export const relatedCopy = {
  title: "You may also like",
} as const;

export const unisexTeaserCopy = {
  eyebrow: "What's Next — AW 2026",
  title: "More unisex pieces are coming.",
  countdownLabel: "Next drop",
  notifyLabel: "Be First",
  archiveEyebrow: "Archive Access",
  archiveTitleBefore: "The next chapter ",
  archiveTitleEmphasis: "is being",
  archiveTitleAfter: " crafted.",
  archiveBody:
    "Subscribers get the first look at every unisex drop — sketch previews, fabric swatches, fit shots. Message us on WhatsApp to reserve a piece before it lands.",
  archiveImageAlt: "Notre Gemme Evolution hoodie — preview of the next unisex silhouette",
  primaryCta: "Request Access",
  secondaryCta: "See Upcoming",
} as const;

export const footerCopy = {
  giantGem: "NG.",
  brandLines: [
    "Premium heavyweight hoodies and tees.",
    "Designed in South Africa. Built to endure.",
  ],
  columns: [
    {
      title: "Shop",
      links: [
        { label: "All Pieces", href: "/collection" },
        { label: "Homme", href: "/homme" },
        { label: "Femme", href: "/femme" },
        { label: "Unisex", href: "/unisex" },
        { label: "Upcoming", href: "/upcoming" },
      ],
    },
    {
      title: "Brand",
      links: [
        { label: "About", href: "/about" },
        { label: "Our Story", href: "/story" },
        { label: "Contact", href: "/contact" },
      ],
    },
  ],
  followTitle: "Order & Follow",
  instagramLabel: `@${siteConfig.contact.instagram}`,
  whatsappLabel: "Order via WhatsApp",
  madeIn: "Designed & made in South Africa",
  copyrightHolder: siteConfig.brand.legalName,
  builtByPrefix: "Built by",
} as const;

export const igPreviewCopy = {
  handle: `@${siteConfig.contact.instagram}`,
  subhandle: siteConfig.brand.name,
  cta: "View on Instagram",
} as const;

export const aboutPage = {
  eyebrow: "About",
  title: "Notre Gemme",
  intro:
    "Notre Gemme means 'Our Gem.' Because people are the real treasure. Born in South Africa, Tembisa 1632 — a fashion and art brand built on emotion, memory, and real human experience. The brand speaks to love, growth, and identity — the things we carry, even when life changes.",
  sections: [
    {
      anchor: "our-gem",
      heading: "Our Gem",
      body: "Notre Gemme means 'Our Gem.' Because people are the real treasure. Every piece turns feeling into form — simple, intentional, and meaningful.",
    },
    {
      anchor: "love-evolves",
      heading: "Love Evolves",
      body: "At its core is one belief: Love doesn't vanish. It evolves. Inspired by the inner child, relationships, and everyday life — the things we carry, even when life changes.",
    },
    {
      anchor: "our-heritage",
      heading: "Our Heritage",
      body: "Notre Gemme is a 100% Black-owned, B-BBEE compliant South African brand, committed to ethical creativity and cultural contribution. Born in Tembisa 1632.",
    },
  ],
} as const;

export const contactPage = {
  eyebrow: "Contact",
  headline: "Get in Touch",
  subheadline:
    "We're a small team — every message is read personally. WhatsApp is the fastest way to order; we usually reply within a few hours.",
  openLabel: "Open",
  channels: [
    {
      label: "WhatsApp",
      value: siteConfig.contact.whatsapp,
      href: whatsappOrderLink(DEFAULT_ORDER_MESSAGE),
      note: "Fastest reply — send the piece, colour and size and we'll confirm stock.",
    },
    {
      label: "Email",
      value: siteConfig.contact.email,
      href: `mailto:${siteConfig.contact.email}`,
      note: "Best for wholesale, press and detailed enquiries.",
    },
    {
      label: "Instagram",
      value: `@${siteConfig.contact.instagram}`,
      href: siteConfig.contact.instagramUrl,
      note: "See the latest drops, fits and behind-the-scenes.",
    },
  ],
} as const;

export const orderNoticeCopy = {
  body: "Orders processed via WhatsApp",
  cta: "Order Now",
  variants: {
    homme: {
      note: "See something you love? Message us to order. We courier nationwide across South Africa.",
      message: "Hi Notre Gemme! I'd like to order from the Homme collection.",
    },
    femme: {
      note: "Tap to order any piece. Nationwide courier available across South Africa.",
      message: "Hi Notre Gemme! I'd like to order from the Femme collection.",
    },
    unisex: {
      note: "Cut for everyone. Message us to order — nationwide courier across South Africa.",
      message: "Hi Notre Gemme! I'd like to order from the Unisex collection.",
    },
  },
} as const;

export const upcomingCopy = {
  eyebrow: "What's Next",
  title: "Upcoming",
  hero: {
    tag: "Season 02 — AW2026",
    titleLines: ["Something", "new is", "forming."],
    description:
      "The second chapter of Notre Gemme is being crafted. Rooted in memory, translated into form.",
    countdownLabel: "Drops in",
  },
  cards: {
    archive: {
      tag: "Design Sketch",
      title: "The Archive Piece",
      description: "A reinterpretation of the original barcode graphic.",
      badge: "Coming Soon",
    },
    sketch1: { label: "design_sketch_03.fig", badge: "AW26" },
    sketch2: { label: "collab_untitled.fig" },
    evolutionII: {
      tag: "New Graphic",
      title: "Evolution II",
      description: "The sequel to our love motif.",
      badge: "Coming Soon",
    },
    notify: {
      tag: "Be First",
      titleLines: ["Get notified", "on drop day."],
    },
    sketch3: { label: "accessories_drop.fig" },
  },
} as const;

export const countdownCopy = {
  units: { d: "Days", h: "Hrs", m: "Min", s: "Sec" },
  /** Shown when no drop date is set or the date has passed. */
  pending: "Date announced soon ♦",
} as const;

export const newsletterCopy = {
  eyebrow: "Stay in the loop",
  titleLines: ["Join the", "Gemme family."],
  emphasisWord: "Gemme",
} as const;

/** Copy for the shared email sign-up form (newsletter + drop alerts). */
export const signupCopy = {
  placeholder: "Enter your email",
  emailLabel: "Email address",
  submit: { newsletter: "Subscribe", drop: "Notify Me" },
  sending: "Sending…",
  success: {
    newsletter: "You're in. Welcome to the Gemme family.",
    drop: "You're on the list — we'll email you on drop day.",
  },
  invalidEmail: "Please enter a valid email address.",
  genericError: "Something went wrong. Please try again.",
  unavailable: "Email sign-ups open soon.",
  whatsappFallback: "Join the list on WhatsApp",
  whatsappMessage: (email: string): string =>
    `Hi Notre Gemme! Please add me to your drop list: ${email}`,
} as const;

export const productCopy = {
  details: "Details",
  notifyCta: "Notify me when it drops",
  colourLabel: "Colour",
  sizeLabel: "Select Size",
  photoPending: "Photography in progress",
} as const;

export const notFoundCopy = {
  eyebrow: "404 — Lost in the void",
  titleBefore: "This page is ",
  titleEmphasis: "not",
  titleAfter: " a gem.",
  body: "The page you're looking for doesn't exist — or perhaps it's still being crafted. Try heading back to the home page.",
  primaryCta: "Back to Home",
  secondaryCta: "Shop the Collection",
} as const;

export const chatbotCopy = {
  title: "Notre Gemme Assistant",
  status: "Online",
  greeting:
    "Hi there! I'm the Notre Gemme assistant. Ask me about prices, colours, what's in stock, sizing or how to order.",
  placeholder: "Ask about prices, sizes...",
  inputLabel: "Type your message",
  sendLabel: "Send message",
  openLabel: "Open Notre Gemme chat assistant",
  closeLabel: "Close chat",
  quickReplies: ["Prices", "Colours", "Stock", "Sizing"],
  whatsappCta: "Chat directly on WhatsApp",
  whatsappMessage: "Hi Notre Gemme! I have a question about your products.",
} as const;
