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
      "Notre Gemme",
    ] as const;

export const storyCopy = {
      eyebrow: "Brand Story",
      titleLines: ["Love", "Evolves."],
      overlay: '"Love doesn\'t vanishh — it evolves. Ves."',
      imageAlt: "Humanity, Our Treasure — Notre Gemme brand emblem",
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
                        "Soft silhouettes, bold emotion. Designed for the woman who moves through the world with intention.",
      },
} as const;

export const navCopy = {
      brand: "Notre Gemme",
      links: [
          { label: "Shop", href: "/shop" },
          { label: "About", href: "/about" },
          { label: "Contact", href: "/contact" },
            ],
      cta: { label: "Shop Now", href: "/shop" },
} as const;

export const footerCopy = {
      brand: "Notre Gemme",
      tagline: "Humanity, our treasure.",
      links: [
          { label: "Shop", href: "/shop" },
          { label: "About", href: "/about" },
          { label: "Contact", href: "/contact" },
          { label: "Privacy", href: "/privacy" },
            ],
      social: [
          { platform: "Instagram", href: "https://www.instagram.com/notregemme" },
          { platform: "TikTok", href: "https://www.tiktok.com/@notregemme" },
          { platform: "WhatsApp", href: "https://wa.me/27752763672" },
            ],
      copyright: "© 2026 Notre Gemme. All rights reserved.",
} as const;

export const igPreviewCopy = {
      eyebrow: "Follow Along",
      handle: "@notregemme",
      subhandle: "Notre Gemme",
      cta: "View on Instagram",
      href: "https://www.instagram.com/notregemme",
} as const;

export const botCopy = {
      greeting: "Welcome to Notre Gemme",
      prompt: "How can we help you today?",
      placeholder: "Type a message...",
      send: "Send",
      close: "Close",
      poweredBy: "Notre Gemme Assistant",
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
      meta: {
              title: "Contact | Notre Gemme",
              description:
                        "Get in touch with Notre Gemme. We're here to help with orders, collaborations, and everything in between.",
      },
      eyebrow: "Contact",
      headline: "Get in Touch",
      subheadline:
              "We're a small team — every message is read personally. Reach out and we'll get back to you.",
      channels: [
          {
                    label: "WhatsApp",
                    value: "Chat with us",
                    href: "https://wa.me/27752763672",
                    icon: "whatsapp",
                    note: "Fastest reply — drop your size and we'll confirm stock.",
          },
          {
                    label: "Email",
                    value: "hello@notregemme.co.za",
                    href: "mailto:hello@notregemme.co.za",
                    icon: "email",
                    note: "Best for wholesale, press and detailed enquiries.",
          },
          {
                    label: "Instagram",
                    value: "@notregemme",
                    href: "https://www.instagram.com/notregemme",
                    icon: "instagram",
                    note: "See the latest drops, fits and behind-the-scenes.",
          },
            ],
      formHeadline: "Send a Message",
      fields: {
              name: { label: "Your Name", placeholder: "e.g. Lerato Dlamini" },
              email: { label: "Email Address", placeholder: "you@example.com" },
              subject: { label: "Subject", placeholder: "What's it about?" },
              message: { label: "Message", placeholder: "Tell us what's on your mind..." },
              submit: "Send Message",
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

export const floatingActionsCopy = {
  whatsappLabel: "Order via WhatsApp",
  botLabel: "Ask Notre Gemme",
} as const;