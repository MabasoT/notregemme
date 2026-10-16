"use client";

import { useState, useRef, useEffect } from "react";
import { getBotReply } from "@/lib/chatbot";
import { chatbotCopy } from "@/lib/content";
import { whatsappOrderLink } from "@/lib/site-config";
import { useLiveStockMap } from "@/lib/live-stock";

type Message = {
  role: "bot" | "user";
  text: string;
};

/**
 * Floating chat assistant, bottom-LEFT so it never covers the order CTAs
 * on the right. Replies come from lib/chatbot.ts (no backend needed);
 * a WhatsApp button hands off to a human at any time.
 */
export function NotreGemmeChatbot(): React.ReactElement {
  const [open, setOpen] = useState(false);
  const stockMap = useLiveStockMap();
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "bot",
      text: chatbotCopy.greeting,
    },
  ]);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, open]);

  function handleSend(): void {
    const trimmed = input.trim();
    if (!trimmed) return;
    const userMsg: Message = { role: "user", text: trimmed };
    const botMsg: Message = { role: "bot", text: getBotReply(trimmed, stockMap) };
    setMessages((prev) => [...prev, userMsg, botMsg]);
    setInput("");
  }

  function handleKey(e: React.KeyboardEvent<HTMLInputElement>): void {
    if (e.key === "Enter") handleSend();
  }

  function renderText(text: string): React.ReactNode[] {
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
        type="button"
        aria-label={open ? chatbotCopy.closeLabel : chatbotCopy.openLabel}
        aria-expanded={open}
        aria-controls="ng-chat"
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
          id="ng-chat"
          role="dialog"
          aria-label={chatbotCopy.title}
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
                {chatbotCopy.title}
              </div>
              <div
                className="flex items-center gap-1"
                style={{ fontSize: 11, color: "var(--color-fg-muted, rgba(255,255,255,0.5))" }}
              >
                <span aria-hidden="true" className="inline-block h-2 w-2 rounded-full bg-[#25D366]" />
                {chatbotCopy.status}
              </div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label={chatbotCopy.closeLabel}
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
            role="log"
            aria-live="polite"
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
            {chatbotCopy.quickReplies.map((chip) => (
              <button
                key={chip}
                type="button"
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
              placeholder={chatbotCopy.placeholder}
              aria-label={chatbotCopy.inputLabel}
              className="flex-1 rounded-xl px-4 py-2 text-sm outline-none"
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "var(--color-fg, #fff)",
                fontFamily: "var(--font-body)",
              }}
            />
            <button
              type="button"
              onClick={handleSend}
              aria-label={chatbotCopy.sendLabel}
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
            href={whatsappOrderLink(chatbotCopy.whatsappMessage)}
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
            {chatbotCopy.whatsappCta}
          </a>
        </div>
      )}
    </>
  );
}
