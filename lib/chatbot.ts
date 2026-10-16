/**
 * Rule-based brain for the Notre Gemme chat assistant. Runs entirely in
 * the browser — no backend, no API keys. Every answer is derived from
 * lib/products.ts + lib/stock.ts so it never contradicts the shop.
 */
import { liveProducts, products, type Product } from "./products";
import { LOW_STOCK_THRESHOLD, getStock, isSoldOut, type ProductStock } from "./stock";
import { siteConfig } from "./site-config";

export type StockMap = Record<string, ProductStock>;

const comingSoonProducts = products.filter((p) => p.comingSoon);

function stockFor(slug: string, map: StockMap): ProductStock {
  return map[slug] ?? getStock(slug);
}

function availabilityLabel(p: Product, map: StockMap): string {
  const s = stockFor(p.slug, map);
  if (isSoldOut(s)) return "Sold out";
  if (s.inStock <= LOW_STOCK_THRESHOLD) return `Only ${s.inStock} left`;
  return "In stock";
}

function coloursLine(p: Product, map: StockMap): string {
  const soldOut = stockFor(p.slug, map).soldOutColors ?? [];
  return p.colors
    .map((c) => (soldOut.includes(c.key) ? `${c.name} (sold out)` : c.name))
    .join(", ");
}

function describeProduct(p: Product, map: StockMap): string {
  const fabric = p.details.find((d) => /gsm|cotton|fleece/i.test(d));
  return (
    `**${p.name}** — **${p.price}** · ${availabilityLabel(p, map)}\n` +
    `Colours: ${coloursLine(p, map)}\n` +
    `Sizes: ${p.sizes.join(", ")}` +
    (fabric ? `\nFabric: ${fabric}` : "")
  );
}

function findProduct(q: string): Product | undefined {
  // direct slug/name word match first, then garment-type keyword
  const byName = products.find((p) =>
    q.includes(p.name.toLowerCase()) || q.includes(p.slug),
  );
  if (byName) return byName;
  if (/\bhoodie\b/.test(q)) return products.find((p) => p.type === "hoodie" && !p.comingSoon);
  if (/\bt[\-\s]?shirt|\btee\b/.test(q)) return products.find((p) => p.type === "tee" && !p.comingSoon);
  if (/\bcap\b/.test(q)) return products.find((p) => p.type === "cap" && !p.comingSoon);
  return undefined;
}

/**
 * Keyword intent matcher for the on-site assistant. Stock-aware: answers
 * come from the live catalogue + stock map, so prices, colours and
 * availability always match the product pages.
 *
 * @param input - the visitor's message
 * @param map - current stock map (static, or merged with the live feed)
 * @returns reply text; **double asterisks** mark bold spans
 */
export function getBotReply(input: string, map: StockMap): string {
  const q = input.toLowerCase().trim();

  if (/^(hi|hello|hey|sup|howzit|hola|yo)\b/.test(q)) {
    return "Hey! Welcome to Notre Gemme. I can help with prices, colours, what's in stock, sizing and orders. What are you after?";
  }

  // Colours / sold-out questions
  if (/\bcolou?rs?\b|\bsold ?out\b|\bavailable colou?rs?\b/.test(q)) {
    const p = findProduct(q);
    if (p) {
      const s = stockFor(p.slug, map);
      const sold = s.soldOutColors ?? [];
      const base = `**${p.name}** comes in: ${coloursLine(p, map)}.`;
      return sold.length > 0
        ? `${base}\nCurrently sold out: ${sold.map((k) => p.colors.find((c) => c.key === k)?.name ?? k).join(", ")}.`
        : `${base}\nAll colours are available right now.`;
    }
    return (
      "Here's what each piece comes in:\n\n" +
      liveProducts.map((p) => `- **${p.name}**: ${coloursLine(p, map)}`).join("\n")
    );
  }

  // Stock / how many left
  if (/\bstock\b|\bhow many\b|\bleft\b|\bin stock\b|\bsold\b/.test(q)) {
    const p = findProduct(q);
    if (p) return describeProduct(p, map);
    return (
      "Live availability:\n\n" +
      liveProducts.map((p) => `- **${p.name}** — ${availabilityLabel(p, map)}`).join("\n")
    );
  }

  if (/\b(price|prices|cost|how much|range|pricelist|price list)\b/.test(q)) {
    const p = findProduct(q);
    if (p) return describeProduct(p, map);
    return (
      "Current price list:\n\n" +
      liveProducts.map((p) => `- ${p.name} — **${p.price}** · ${availabilityLabel(p, map)}`).join("\n") +
      "\n\nAsk me about any piece for its colours and sizes."
    );
  }

  if (/\bfabric|\bmaterial|\bgsm|\bcotton|\bquality\b/.test(q)) {
    return "Our **Hoodies are 430gsm, 100% cotton** and our **T-Shirts are 300gsm, 100% cotton** — heavyweight, premium hand-feel. Ask me about a specific piece for full details.";
  }

  // Specific product mention (covers hoodie/tee/cap and named pieces)
  {
    const p = findProduct(q);
    if (p) return describeProduct(p, map);
  }

  if (/\bpre[\-\s]?order|\bcoming|\bupcoming|\bdrop\b/.test(q)) {
    if (comingSoonProducts.length === 0) return "Everything in the current drop is available now! Ask me about any piece.";
    return (
      "Coming soon / pre-order:\n\n" +
      comingSoonProducts.map((p) => `- **${p.name}** — ${p.subtitle}`).join("\n") +
      "\n\nMessage us on WhatsApp to reserve yours."
    );
  }

  if (/\bavailable|\bwhat.*sell|\bproduct|\bcatalogue|\bcatalog\b/.test(q)) {
    return (
      "**Available now:**\n" +
      liveProducts.map((p) => `- ${p.name} — **${p.price}** · ${availabilityLabel(p, map)}`).join("\n") +
      "\n\nAsk me about any item for colours, sizes or to place an order!"
    );
  }

  if (/\bsize|\bfit|\bfitting|\bmeasure|\bbook|\bbooking\b/.test(q)) {
    return "We offer **size fittings on special request**. Book a session via WhatsApp and we'll arrange a time for you to try on your preferred pieces before buying.";
  }

  if (/\border|\bbuy|\bpurchase|\bget one|\bwant one\b/.test(q)) {
    return "Ready to order? Open any product page to pick your **colour and size**, or hit the WhatsApp button below and we'll sort you out!";
  }

  if (/\bship|\bdeliver|\bpostage|\bcourier\b/.test(q)) {
    return "We courier nationwide across South Africa. Fees and timelines are confirmed on WhatsApp when you place your order.";
  }

  if (/\bcontact|\blocation|\bwhere|\baddress|\bphone|\bnumber\b/.test(q)) {
    return `You can reach us on WhatsApp (${siteConfig.contact.whatsapp}), Instagram (@${siteConfig.contact.instagram}) or email (${siteConfig.contact.email}). We're based in Tembisa, South Africa.`;
  }

  return "I'm not sure about that one yet! I can help with **prices**, **colours**, **what's in stock**, **sizing** and **orders**. Or reach us directly on WhatsApp.";
}
