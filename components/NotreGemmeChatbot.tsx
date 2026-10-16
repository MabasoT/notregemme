"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { chatbotCopy } from "@/lib/content";

// The panel (and the catalogue/stock logic behind it) is a separate chunk,
// fetched only when the visitor first opens the chat.
const ChatPanel = dynamic(() => import("./ChatPanel").then((m) => m.ChatPanel), {
  ssr: false,
});

/**
 * Floating chat assistant, bottom-LEFT so it never covers the order CTAs
 * on the right. Only the button ships with the page; the panel loads on
 * first tap. Replies come from lib/chatbot.ts (no backend needed) and a
 * WhatsApp button hands off to a human at any time.
 */
export function NotreGemmeChatbot(): React.ReactElement {
  const [open, setOpen] = useState(false);
  // Mount the panel on first open, then keep it mounted so history survives.
  const [opened, setOpened] = useState(false);

  return (
    <>
      {/* Floating toggle button — bottom-LEFT corner */}
      <button
        onClick={() => {
          setOpened(true);
          setOpen((v) => !v);
        }}
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

      {opened ? <ChatPanel open={open} onClose={() => setOpen(false)} /> : null}
    </>
  );
}
