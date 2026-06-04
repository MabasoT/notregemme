"use client";

import { useState, useRef, useEffect } from "react";
import { siteConfig, whatsappOrderLink } from "@/lib/site-config";
import { products, type Product } from "@/lib/products";
import { isSoldOut, type ProductStock } from "@/lib/stock";
import { useLiveStockMap } from "@/lib/live-stock";

type Message = {
  role: "bot" | "user";
  text: string;
};

type StockMap = Record<string, ProductStock>;

// ---------------------------------------------------------------------------
// Knowledge helpers — everything is derived from lib/products.ts +
// lib/stock.ts so the assistant always knows the real catalogue, the
// colours offered, what's sold out and how many units are left.
// ---------------------------------------------------------------------------
const liveProducts = products.filter((p) => !p.comingSoon);
const comingSoonProducts = products.filter((p) => p.comingSoon);

function stockFor(slug: string, map: StockMap): ProductStock {
  return map[slug] ?? { inStock: 999 };
}

function availabilityLabel(p: Product, map: StockMap): string {
  const s = stockFor(p.slug, map);
  if (isSoldOut(s)) return "Sold out";
  if (s.inStock <= 10) return `Only ${s.inStock} left`;
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

// ---------------------------------------------------------------------------
// Intent matcher (stock-aware)
// ---------------------------------------------------------------------------
function getBotReply(input: string, map: StockMap): string {
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
    return "We deliver across South Africa. Fees and timelines are confirmed at checkout — reach out on WhatsApp for details!";
  }

  if (/\bcontact|\blocation|\bwhere|\baddress|\bphone|\bnumber\b/.test(q)) {
    return "You can reach us on WhatsApp or Instagram — we're based in South Africa.";
  }

  return "I'm not sure about that one yet! I can help with **prices**, **colours**, **what's in stock**, **sizing** and **orders**. Or reach us directly on WhatsApp.";
}

// ---------------------------------------------------------------------------
// Component — floats bottom-LEFT so it never covers main content on the right
// ---------------------------------------------------------------------------
export function NotreGemmeChatbot(): React.ReactElement {
  const [open, setOpen] = useState(false);
  const stockMap = useLiveStockMap();
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "bot",
      text: "Hi there! I'm the Notre Gemme assistant. Ask me about prices, colours, what's in stock, sizing or place an order!",
    },
  ]);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, open]);

  function handleSend() {
    const trimmed = input.trim();
    if (!trimmed) return;
    const userMsg: Message = { role: "user", text: trimmed };
    const botMsg: Message = { role: "bot", text: getBotReply(trimmed, stockMap) };
    setMessages((prev) => [...prev, userMsg, botMsg]);
    setInput("");
  }

  function handleKey(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") handleSend();
  }

  function renderText(text: string) {
    const parts = text.split(/\*\*(.+?)\*\*/g);
    return parts.map((part, i) =>
      i % 2 === 1
        ? <strong key={i}>{part}</strong>
        : <span key={i}>{part}</span>
    );
  }

  return (
    <>
      {/* Floating toggle button — bottom-LEFT corner */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close chat" : "Open Notre Gemme chat assistant"}
        className="fixed bottom-6 left-6 z-[9999] flex h-14 w-14 items-center justify-center rounded-full shadow-2xl transition-transform duration-200 hover:scale-105 active:scale-95 sm:bottom-8 sm:left-8"
        style={{
          background: "linear-gradient(135deg, #25D366, #128C7E)",
          boxShadow: "0 4px 24px rgba(37,211,102,0.45)",
        }}
      >
        {open ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2.5} strokeLinecap="round" className="h-6 w-6" aria-hidden="true">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="white" className="h-7 w-7" aria-hidden="true">
            <path d="M20 2H4a2 2 0 0 0-2 2v18l4-4h14a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2Z" />
          </svg>
        )}
      </button>

      {/* Chat window — opens ABOVE the toggle button on the LEFT side */}
      {open && (
        <div
          role="dialog"
          aria-label="Notre Gemme Chat Assistant"
          className="fixed bottom-24 left-4 z-[9998] flex w-[calc(100vw-2rem)] max-w-[380px] flex-col overflow-hidden rounded-2xl shadow-2xl sm:bottom-28 sm:left-8"
          style={{
            background: "var(--color-bg-2, #0f0f0f)",
            border: "1px solid rgba(255,255,255,0.1)",
            maxHeight: "min(75vh, 600px)",
          }}
        >
          {/* Header */}
          <div
            className="flex items-center gap-3 px-4 py-3"
            style={{
              background: "rgba(37,211,102,0.12)",
              borderBottom: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            <span
              className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full"
              style={{ background: "linear-gradient(135deg, #25D366, #128C7E)" }}
            >
              <svg viewBox="0 0 24 24" fill="white" className="h-5 w-5" aria-hidden="true">
                <path d="M20 2H4a2 2 0 0 0-2 2v18l4-4h14a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2Z" />
              </svg>
            </span>
            <div>
              <div
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: 13,
                  fontWeight: 700,
                  color: "var(--color-fg, #fff)",
                  letterSpacing: "0.04em",
                }}
              >
                Notre Gemme Assistant
              </div>
              <div
                className="flex items-center gap-1"
                style={{ fontSize: 11, color: "var(--color-fg-muted, rgba(255,255,255,0.5))" }}
              >
                <span className="inline-block h-2 w-2 rounded-full bg-[#25D366]" />
                Online
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="ml-auto rounded-lg p-1 opacity-60 transition-opacity hover:opacity-100"
              style={{ color: "var(--color-fg, #fff)" }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" className="h-4 w-4" aria-hidden="true">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div
            className="flex flex-1 flex-col gap-3 overflow-y-auto px-4 py-4"
            style={{ minHeight: 0 }}
          >
            {messages.map((msg, i) => (
              <div
                key={i}
                className={"flex " + (msg.role === "user" ? "justify-end" : "justify-start")}
              >
                <div
                  className="max-w-[82%] rounded-2xl px-3 py-2 text-sm leading-relaxed whitespace-pre-line"
                  style={
                    msg.role === "bot"
                      ? {
                          background: "rgba(255,255,255,0.06)",
                          color: "var(--color-fg, #fff)",
                          borderRadius: "4px 18px 18px 18px",
                        }
                      : {
                          background: "linear-gradient(135deg, #25D366, #128C7E)",
                          color: "#fff",
                          borderRadius: "18px 18px 4px 18px",
                        }
                  }
                >
                  {renderText(msg.text)}
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Quick chips */}
          <div
            className="flex flex-wrap gap-2 px-4 py-2"
            style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
          >
            {["Prices", "Colours", "Stock", "Sizing"].map((chip) => (
              <button
                key={chip}
                onClick={() => {
                  const reply = getBotReply(chip, stockMap);
                  setMessages((prev) => [
                    ...prev,
                    { role: "user", text: chip },
                    { role: "bot", text: reply },
                  ]);
                  setInput("");
                }}
                className="shrink-0 rounded-full px-3 py-1 text-xs font-medium transition-colors"
                style={{
                  background: "rgba(37,211,102,0.12)",
                  border: "1px solid rgba(37,211,102,0.3)",
                  color: "#25D366",
                  fontFamily: "var(--font-body)",
                  cursor: "pointer",
                }}
              >
                {chip}
              </button>
            ))}
          </div>

          {/* Input */}
          <div
            className="flex items-center gap-2 px-3 py-3"
            style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Ask about prices, sizes..."
              aria-label="Type your message"
              className="flex-1 rounded-xl px-4 py-2 text-sm outline-none"
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "var(--color-fg, #fff)",
                fontFamily: "var(--font-body)",
              }}
            />
            <button
              onClick={handleSend}
              aria-label="Send message"
              disabled={!input.trim()}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-opacity disabled:opacity-30"
              style={{ background: "linear-gradient(135deg, #25D366, #128C7E)" }}
            >
              <svg viewBox="0 0 24 24" fill="white" className="h-4 w-4" aria-hidden="true">
                <path d="M22 2 11 13M22 2 15 22l-4-9-9-4 20-7Z" />
              </svg>
            </button>
          </div>

          {/* WhatsApp CTA */}
          <a
            href={whatsappOrderLink("Hi Notre Gemme! I have a question about your products.")}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 py-3 text-xs font-medium transition-opacity hover:opacity-90"
            style={{
              background: "linear-gradient(135deg, #25D366, #128C7E)",
              color: "#fff",
              textDecoration: "none",
              fontFamily: "var(--font-body)",
            }}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
              <path d="M20.52 3.48A11.94 11.94 0 0 0 12.05 0C5.5 0 .2 5.3.2 11.83a11.7 11.7 0 0 0 1.59 5.91L0 24l6.42-1.68a11.85 11.85 0 0 0 5.64 1.43h.01c6.55 0 11.85-5.3 11.85-11.83a11.7 11.7 0 0 0-3.4-8.44Z" />
            </svg>
            Chat directly on WhatsApp
          </a>
        </div>
      )}
    </>
  );
    }
