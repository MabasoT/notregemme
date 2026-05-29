"use client";

import { useState } from "react";
import { floatingActionsCopy, botCopy } from "@/lib/content";
import { whatsappOrderLink } from "@/lib/site-config";

type Msg = { from: "bot" | "user"; text: string };

const botKB: ReadonlyArray<{ keys: ReadonlyArray<string>; reply: string }> = [
  {
    keys: ["how do i order", "how to order", "order"],
    reply:
      "All orders are placed via WhatsApp! Tap the WhatsApp button or message us at +27 61 414 5878. Tell us which item, your size, and your delivery address. 🛍️",
  },
  {
    keys: ["ship", "courier", "delivery"],
    reply:
      "Yes! We courier nationwide across South Africa. 🇿🇦 Shipping costs and timelines are confirmed when you place your order on WhatsApp.",
  },
  {
    keys: ["collection", "homme", "femme", "drop"],
    reply:
      "SS2026 includes:\n• Homme — Barcode Tees + Evolution Hoodie\n• Femme — Queen & King of Hearts Tees\n\nMore drops coming in AW2026. 👀",
  },
  {
    keys: ["size", "sizing", "fit"],
    reply:
      "Sizes S – 3XL on most pieces. Our tees are oversized — we recommend sizing down if you prefer a fitted look. DM us for the full size guide. 📐",
  },
  {
    keys: ["price", "cost"],
    reply:
      "Tees from R850, hoodies from R1,450. Full pricing on each product card or WhatsApp us. 💳",
  },
  {
    keys: ["where", "based", "located"],
    reply: "Notre Gemme Studios is proudly South African 🇿🇦. We ship nationwide via courier.",
  },
  {
    keys: ["instagram", "ig", "social"],
    reply:
      "Follow @notregemme for the latest drops and behind-the-scenes content. 📸",
  },
  {
    keys: ["contact", "reach", "phone", "email"],
    reply:
      "Reach us on:\n• WhatsApp: +27 61 414 5878\n• Instagram: @notregemme\nWe typically respond within a few hours.",
  },
];

function botReply(input: string): string {
  const m = input.toLowerCase().trim();
  for (const entry of botKB) {
    if (entry.keys.some((k) => m.includes(k))) return entry.reply;
  }
  return "I'm not sure about that yet, but our team can help! 💬 WhatsApp us at +27 61 414 5878 and we'll get back to you. You can also follow @notregemme on Instagram.";
}

/**
 * Bottom-left floating actions:
 *  - WhatsApp link
 *  - Local "Notre Gemme Assistant" bot toggle with a keyword-matched
 *    knowledge base. Replies are static; replace `botReply` with a
 *    fetch() against your Google Apps Script webhook when ready.
 */
export function FloatingActions(): React.ReactElement {
  const [open, setOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<ReadonlyArray<Msg>>([
    { from: "bot", text: botCopy.greeting },
  ]);
  const [input, setInput] = useState<string>("");
  const [quickReplyShown, setQuickReplyShown] = useState<boolean>(true);

  const ask = (q: string): void => {
    setMessages((prev) => [...prev, { from: "user", text: q }]);
    setQuickReplyShown(false);
    window.setTimeout(() => {
      setMessages((prev) => [...prev, { from: "bot", text: botReply(q) }]);
    }, 500);
  };

  const send = (): void => {
    const v = input.trim();
    if (!v) return;
    setInput("");
    ask(v);
  };

  return (
    <>
      <div className="fixed bottom-7 left-7 z-[9996] flex flex-col items-start gap-3">
        <a
          href={whatsappOrderLink("Hi Notre Gemme! I'd like to place an order.")}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-2.5"
          style={{ textDecoration: "none" }}
        >
          <span
            className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-full text-2xl transition-transform duration-300 group-hover:scale-110"
            style={{
              background: "var(--color-whatsapp)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
              color: "#050505",
            }}
            aria-hidden="true"
          >
            <WhatsAppGlyph className="h-6 w-6" />
          </span>
          <span
            className="pointer-events-none -translate-x-2 rounded-pill px-3.5 py-1.5 uppercase opacity-0 transition-[opacity,transform] duration-200 group-hover:translate-x-0 group-hover:opacity-100"
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "0.12em",
              color: "var(--color-fg)",
              background: "rgba(15,15,15,0.9)",
              border: "1px solid rgba(255,255,255,0.08)",
              backdropFilter: "blur(8px)",
              whiteSpace: "nowrap",
            }}
          >
            {floatingActionsCopy.whatsappLabel}
          </span>
        </a>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="ng-bot"
          className="group flex items-center gap-2.5"
          style={{ background: "none", border: "none" }}
        >
          <span
            className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-full text-xl transition-transform duration-300 group-hover:scale-110"
            style={{
              background: "var(--color-bg-3)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "var(--color-green)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
            }}
            aria-hidden="true"
          >
            ✦
          </span>
          <span
            className="pointer-events-none -translate-x-2 rounded-pill px-3.5 py-1.5 uppercase opacity-0 transition-[opacity,transform] duration-200 group-hover:translate-x-0 group-hover:opacity-100"
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "0.12em",
              color: "var(--color-fg)",
              background: "rgba(15,15,15,0.9)",
              border: "1px solid rgba(255,255,255,0.08)",
              backdropFilter: "blur(8px)",
              whiteSpace: "nowrap",
            }}
          >
            {floatingActionsCopy.botLabel}
          </span>
        </button>
      </div>

      {open ? (
        <div
          id="ng-bot"
          role="dialog"
          aria-label={botCopy.poweredBy}
          className="fixed bottom-24 left-7 z-[9995] w-[320px] overflow-hidden rounded-[20px]"
          style={{
            background: "rgba(12,12,12,0.97)",
            border: "1px solid rgba(255,255,255,0.1)",
            boxShadow: "0 24px 80px rgba(0,0,0,0.6)",
            backdropFilter: "blur(20px)",
          }}
        >
          <div
            className="flex items-center gap-3 px-[18px] py-4"
            style={{
              background:
                "linear-gradient(135deg, oklch(20% 0.08 128 / 0.6), oklch(15% 0.05 128 / 0.3))",
              borderBottom: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            <span
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-base"
              style={{
                background: "var(--color-bg-3)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
              aria-hidden="true"
            >
              ✦
            </span>
            <div className="flex-1">
              <div
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: 13,
                  fontWeight: 600,
                  color: "var(--color-fg)",
                }}
              >
                {botCopy.poweredBy}
              </div>
              <div
                className="mt-0.5 flex items-center gap-1.5"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 11,
                  color: "var(--color-green)",
                }}
              >
                <span
                  className="animate-pulse-dot block h-1.5 w-1.5 rounded-full"
                  style={{ background: "var(--color-green)" }}
                  aria-hidden="true"
                />
                {botCopy.status}
              </div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              style={{
                background: "none",
                border: "none",
                color: "var(--color-fg-muted)",
                fontSize: 18,
                lineHeight: 1,
              }}
            >
              ✕
            </button>
          </div>

          <div className="flex max-h-[220px] flex-col gap-2.5 overflow-y-auto p-4">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`max-w-[85%] px-3.5 py-2.5 ${
                  m.from === "user" ? "self-end" : ""
                }`}
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 13,
                  lineHeight: 1.6,
                  color: "var(--color-fg)",
                  background:
                    m.from === "user"
                      ? "oklch(25% 0.08 128 / 0.4)"
                      : "rgba(255,255,255,0.05)",
                  borderRadius:
                    m.from === "user" ? "12px 12px 4px 12px" : "12px 12px 12px 4px",
                  whiteSpace: "pre-wrap",
                }}
              >
                {m.text}
              </div>
            ))}
          </div>

          {quickReplyShown ? (
            <div className="flex flex-wrap gap-2 px-4 pb-2.5">
              {botCopy.quickReplies.map((q) => (
                <button
                  key={q}
                  type="button"
                  onClick={() => ask(q)}
                  className="rounded-pill px-3 py-1.5 transition-[background,border-color]"
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontSize: 10,
                    fontWeight: 600,
                    letterSpacing: "0.1em",
                    color: "var(--color-green)",
                    border: "1px solid var(--color-green-dim)",
                    background: "none",
                  }}
                >
                  {q}
                </button>
              ))}
            </div>
          ) : null}

          <div
            className="flex gap-2 px-4 py-3"
            style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") send();
              }}
              placeholder={botCopy.placeholder}
              aria-label="Chat message"
              className="flex-1 rounded-pill px-4 py-2"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.08)",
                fontFamily: "var(--font-body)",
                fontSize: 12,
                color: "var(--color-fg)",
                outline: "none",
              }}
            />
            <button
              type="button"
              onClick={send}
              aria-label="Send message"
              className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-full transition-[background,transform] hover:scale-110"
              style={{
                background: "var(--color-green)",
                border: "none",
                fontSize: 14,
                color: "var(--color-bg)",
              }}
            >
              ➤
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}

function WhatsAppGlyph({ className }: { className?: string }): React.ReactElement {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M20.52 3.48A11.94 11.94 0 0 0 12.05 0C5.5 0 .2 5.3.2 11.83a11.7 11.7 0 0 0 1.59 5.91L0 24l6.42-1.68a11.85 11.85 0 0 0 5.64 1.43h.01c6.55 0 11.85-5.3 11.85-11.83a11.7 11.7 0 0 0-3.4-8.44Z" />
    </svg>
  );
}
