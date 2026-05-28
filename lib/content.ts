/**
 * All user-facing copy lives here.
 * Zero hardcoded strings in JSX — components consume from this module.
 */

export const heroCopy = {
  eyebrow: "Est. 2026 — South Africa",
  headlineLines: ["Humanity,", "Our", "Treasure."],
  headlineEmphasisIndex: 1,
  ctaLabel: "Shop Collection",
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
  "Notre Gemme Studios",
] as const;

export const storyCopy = {
  eyebrow: "Brand Story",
  titleLines: ["Love", "Evolves."],
  overlay: '"Love doesn\'t vanishh — it evolves. Yes."',
  imageAlt: "Love Evolves — Notre Gemme brand emblem",
  paragraphs: [
    "Notre Gemme was born from the belief that humanity is the rarest gem of all. Every piece we create is a translation of feeling into form — a wearable memory, a statement of identity, a quiet act of love for who you are and who you're becoming.",
    "We are not just a clothing brand. We are a testimony to the South African spirit — resilient, bold, deeply human. Built different. Made to endure.",
  ],
  stats: [
    { number: "1", accent: "6", suffix: "32", label: "Founding Code" },
    { number: "SS", accent: "'", suffix: "26", label: "Debut Season" },
    { number: "2", accent: "♦", suffix: "", label: "Collections" },
    { number: "ZA", accent: "+", suffix: "", label: "Origin" },
  ],
} as const;

export const collectionCopy = {
  homme: {
    eyebrow: "SS 2026",
    title: "Homme",
    viewAll: "View All Homme",
    description:
      "The barcode collection. Heavyweight cotton, intentional graphics, built for the modern man.",
  },
  femme: {
    eyebrow: "SS 2026",
    title: "Femme",
    viewAll: "View All Femme",
    description:
      "Playing-card suits, soft drape, structured silhouettes. Queens and kings in equal measure.",
  },
} as const;

export const orderNoticeCopy = {
  body: "Orders processed via WhatsApp",
  homme: "See something you love? Message us to order. We courier nationwide across South Africa.",
  femme: "Tap to order any piece. Nationwide courier available across South Africa.",
  cta: "Order Now",
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
      placeholder: "your@email.com",
      cta: "Notify Me",
    },
    sketch3: { label: "accessories_drop.fig" },
  },
} as const;

export const newsletterCopy = {
  eyebrow: "Stay in the loop",
  titleLines: ["Join the", "Gemme family."],
  emphasisWord: "Gemme",
  placeholder: "Enter your email",
  cta: "Subscribe",
} as const;

export const footerCopy = {
  brandLines: [
    "Humanity, Our Treasure.",
    "Rooted in values. Driven by purpose.",
    "Built different. Made to endure.",
  ],
  giantGem: "NG.",
  columns: [
    {
      title: "Collections",
      links: [
        { label: "Homme SS26", href: "/homme" },
        { label: "Femme SS26", href: "/femme" },
        { label: "Upcoming", href: "/#upcoming" },
        { label: "Archive", href: "/about#archive" },
      ],
    },
    {
      title: "Brand",
      links: [
        { label: "Our Story", href: "/about" },
        { label: "Philosophy", href: "/about#philosophy" },
        { label: "1632", href: "/about#code" },
        { label: "Contact", href: "/contact" },
      ],
    },
  ],
  followTitle: "Follow & Connect",
  instagramLabel: "@notregemme",
  whatsappLabel: "WhatsApp Orders",
  copyright: "© 2026 Notre Gemme Studios. All rights reserved.",
  madeIn: "Made in South Africa ♦",
} as const;

export const igPreviewCopy = {
  handle: "notregemme",
  subhandle: "Notre Gemme Studios",
  followCta: "Follow Us ✦",
} as const;

export const waPreviewCopy = {
  message: "Hi! Ready to order?",
  emphasis: "Message us on WhatsApp",
  rest: "to place your order. We courier ",
  emphasis2: "nationwide",
  tail: " across South Africa.",
  cta: "Start Order →",
} as const;

export const floatingActionsCopy = {
  whatsappLabel: "Order via WhatsApp",
  botLabel: "Ask Notre Gemme",
} as const;

export const botCopy = {
  name: "Notre Gemme Assistant",
  status: "Online",
  greeting:
    "Hey 👋 Welcome to Notre Gemme Studios. I can help you with collections, sizing, ordering, and shipping. What would you like to know?",
  placeholder: "Ask anything…",
  quickReplies: [
    "How do I order?",
    "Do you ship nationwide?",
    "Tell me about the collections",
    "What sizes are available?",
  ],
} as const;

export const aboutPage = {
  eyebrow: "About",
  title: "We Are\nNotre Gemme.",
  intro:
    "A luxury minimalist house from South Africa. Every garment is a quiet rebellion — against fast fashion, against forgettable design, against the idea that streetwear can't be reverent.",
  sections: [
    {
      heading: "Philosophy",
      anchor: "philosophy",
      body: "Luxury minimalist. Every element earns its place. The void is not empty — it is intentional. We design from absence first, then we add what is essential and nothing more.",
    },
    {
      heading: "The 1632 Code",
      anchor: "code",
      body: "1632 is our founding cipher — a year, a number, a quiet signature. It appears on labels, in barcodes, beneath logos. It is the proof we existed before this season, and the promise we will outlast it.",
    },
    {
      heading: "Made for the Bold",
      anchor: "archive",
      body: "Homme wears the barcode — industrial, geometric, masculine. Femme wears the playing-card suits — playful, royal, defiant. Both wear the gem.",
    },
  ],
} as const;

export const contactPage = {
  eyebrow: "Contact",
  title: "Let's Talk.",
  intro:
    "All orders, sizing questions, collaborations, and press enquiries go through the channels below. We typically respond within a few hours during South African business hours.",
  channels: [
    {
      label: "WhatsApp",
      value: "+27 61 414 5878",
      href: "https://wa.me/27614145878",
      note: "Orders, sizing, courier tracking.",
    },
    {
      label: "Instagram",
      value: "@notregemme",
      href: "https://www.instagram.com/notregemme?igsh=aHMzanh6aG1zbjF1",
      note: "Drops, behind-the-scenes, archive.",
    },
    {
      label: "Email",
      value: "hello@notregemme.co.za",
      href: "mailto:hello@notregemme.co.za",
      note: "Press, partnerships, wholesale.",
    },
  ],
} as const;
