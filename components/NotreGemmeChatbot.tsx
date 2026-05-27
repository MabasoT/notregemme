"use client";

import { useState, useRef, useEffect } from "react";
import { asset, siteConfig, whatsappOrderLink } from "@/lib/site-config";

// ---------------------------------------------------------------------------
// Product catalogue & chatbot knowledge base
// ---------------------------------------------------------------------------
const PRODUCTS = [
  { name: "Hoodie", price: 800, preOrder: false, notes: "Available now" },
  { name: "T-Shirt", price: 500, preOrder: false, notes: "Available now" },
  { name: "Cap (standard)", price: 150, preOrder: false, notes: "Available now" },
  { name: "Cap (premium)", price: 200, preOrder: false, notes: "Available now" },
  { name: "Track Pants", price: null, preOrder: true, notes: "Pre-order — contact us for pricing" },
];

type Message = {
  role: "bot" | "user";
  text: string;
};

// ---------------------------------------------------------------------------
// Simple intent matcher
// ---------------------------------------------------------------------------
function getBotReply(input: string): string {
  const q = input.toLowerCase().trim();

  if (/^(hi|hello|hey|sup|howzit|hola|yo)\b/.test(q)) {
    return "Hey! Welcome to Notre Gemme I'm here to help you with prices, available products, pre-orders and size fittings. What can I do for you?";
  }

  if (/\b(price|prices|cost|how much|range|pricelist|price list)\b/.test(q)) {
    return formatPriceList();
  }

  if (/\bhoodie\b/.test(q)) {
    return "Our Hoodies are **R800** and are available now. Want to order? I can connect you straight to WhatsApp";
  }

  if (/\bt[\-\s]?shirt\b/.test(q)) {
    return "T-Shirts are **R500** and available now. Would you like to place an order or need a size fitting?";
  }

  if (/\bcap\b/.test(q)) {
    return "We have two cap options:\n- Standard cap — **R150**\n- Premium cap — **R200**\nBoth are available now. Need one?";
  }

  if (/\btrack\s*pant|\btracksuit|\bpant\b/.test(q)) {
    return "Track Pants are currently available for **pre-order** Drop us a WhatsApp to lock yours in!";
  }

  if (/\bpre[\-\s]?order\b/.test(q)) {
    return "Currently, **Track Pants** are available for pre-order. Contact us on WhatsApp to place yours and we'll confirm sizing and pricing.";
  }

  if (/\bavailable|\bstock|\bwhat.*sell|\bproduct|\bcatalogue|\bcatalog\b/.test(q)) {
    return formatAvailableProducts();
  }

  if (/\bsize|\bfit|\bfitting|\bmeasure|\bbook|\bbooking\b/.test(q)) {
    return "We offer **size fittings on special request** Just book a session with us via WhatsApp and we'll arrange a convenient time for you to try on your preferred items before purchasing.";
  }

  if (/\border|\bbuy|\bpurchase|\bget one|\bwant one\b/.test(q)) {
    return "Ready to order? Hit the WhatsApp button below or message us on Instagram. We'll sort you out with the right size and style!";
  }

  if (/\bship|\bdeliver|\bpostage|\bcourier\b/.test(q)) {
    return "We offer delivery across South Africa. Delivery fees and timelines are confirmed at checkout. Reach out on WhatsApp for details!";
  }

  if (/\bcontact|\blocation|\bwhere|\baddress|\bphone|\bnumber\b/.test(q)) {
    return "You can reach us on WhatsApp or Instagram. We're based in South Africa";
  }

  return "I'm not sure about that — but I'm still learning! For now I can help with **prices**, **available products**, **pre-orders**, and **size bookings**. Or you can reach us directly on WhatsApp.";
}

function formatPriceList(): string {
  const lines = PRODUCTS.map((p) => {
    const priceStr = p.price ? "R" + p.price : "TBC (pre-order)";
    const tag = p.preOrder ? " Pre-order" : " In stock";
    return "- " + p.name + " — **" + priceStr + "**" + tag;
  });
  return "Here's our current price list:\n\n" + lines.join("\n") + "\n\nMore products and prices will be added over time. Book a size fitting on request!";
}

function formatAvailableProducts(): string {
  const inStock = PRODUCTS.filter((p) => !p.preOrder).map((p) => p.name);
  const preOrder = PRODUCTS.filter((p) => p.preOrder).map((p) => p.name);
  return "**Available now:** " + inStock.join(", ") + "\n**Pre-order:** " + preOrder.join(", ") + "\n\nAsk me about any item for pricing or to place an order!";
}

// ---------------------------------------------------------------------------
// Component — floats bottom-LEFT so it never covers main content on the right
// ---------------------------------------------------------------------------
export function NotreGemmeChatbot(): React.ReactElement {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "bot",
      text: "Hi there! I'm the Notre Gemme assistant. Ask me about prices, available items, pre-orders or book a size fitting!",
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
    const botMsg: Message = { role: "bot", text: getBotReply(trimmed) };
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
            {["Prices", "Available", "Pre-order", "Sizing"].map((chip) => (
              <button
                key={chip}
                onClick={() => {
                  const reply = getBotReply(chip);
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
