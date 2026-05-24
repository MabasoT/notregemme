"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { siteConfig, whatsappOrderLink } from "@/lib/site-config";

/**
 * Fixed top header. Logo center, nav left/right, WhatsApp pill CTA right.
 * Adds glass blur after 60px of scroll. Mobile breakpoint replaces nav
 * links with a full-screen overlay toggled by the hamburger button.
 */
export function Header(): React.ReactElement {
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);

  useEffect(() => {
    const onScroll = (): void => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const close = (): void => setMobileOpen(false);

  return (
    <header
      className="fixed inset-x-0 top-0 z-[100] grid grid-cols-[1fr_auto_1fr] items-center gap-5 py-5 transition-[background,backdrop-filter] duration-[400ms]"
      style={{
        paddingLeft: "var(--gutter)",
        paddingRight: "var(--gutter)",
        background: scrolled ? "rgba(5,5,5,0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.04)" : "1px solid transparent",
      }}
    >
      <nav
        className={`flex items-center justify-start gap-7 max-md:fixed max-md:inset-0 max-md:z-[200] max-md:flex-col max-md:justify-center max-md:gap-7 max-md:bg-[rgba(5,5,5,0.97)] max-md:backdrop-blur-2xl ${
          mobileOpen ? "max-md:flex" : "max-md:hidden"
        }`}
        aria-label="Primary"
      >
        {siteConfig.nav.left.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={close}
            className="text-[11px] uppercase tracking-[0.18em] text-fg-muted transition-colors hover:text-fg max-md:text-lg"
            style={{ fontFamily: "var(--font-body)" }}
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <Link href="/" onClick={close} aria-label={siteConfig.brand.name} className="flex items-center justify-center">
        <LogoMark />
      </Link>

      <nav
        className={`flex items-center justify-end gap-6 max-md:fixed max-md:inset-0 max-md:z-[200] max-md:flex-col max-md:justify-center max-md:gap-7 max-md:bg-[rgba(5,5,5,0.97)] max-md:backdrop-blur-2xl ${
          mobileOpen ? "max-md:flex" : "max-md:hidden"
        }`}
        aria-label="Secondary"
      >
        {siteConfig.nav.right.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={close}
            className="text-[11px] uppercase tracking-[0.18em] text-fg-muted transition-colors hover:text-fg max-md:text-lg"
            style={{ fontFamily: "var(--font-body)" }}
          >
            {link.label}
          </Link>
        ))}
        <a
          href={whatsappOrderLink("Hi Notre Gemme! I'd like to place an order.")}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-[7px] rounded-pill px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.12em] transition-[background,transform] duration-200 hover:scale-[1.04]"
          style={{
            fontFamily: "var(--font-heading)",
            background: "var(--color-whatsapp)",
            color: "#050505",
          }}
        >
          <WhatsAppGlyph className="h-4 w-4" />
          Order
        </a>
      </nav>

      <button
        type="button"
        aria-label={mobileOpen ? "Close menu" : "Open menu"}
        aria-expanded={mobileOpen}
        onClick={() => setMobileOpen((v) => !v)}
        className="absolute right-[var(--gutter)] z-[201] hidden text-2xl text-fg max-md:block"
        style={{ background: "none", border: "none" }}
      >
        {mobileOpen ? "✕" : "☰"}
      </button>
    </header>
  );
}

function LogoMark(): React.ReactElement {
  return (
    <span className="flex items-center gap-3" style={{ fontFamily: "var(--font-heading)" }}>
      <span
        aria-hidden="true"
        className="diamond-clip block h-[18px] w-[18px]"
        style={{ background: "var(--color-green)" }}
      />
      <span className="flex flex-col leading-none">
        <span className="text-[15px] font-bold uppercase tracking-[0.14em] text-fg">
          NOTRE GEMME
        </span>
        <span className="text-[9px] font-medium uppercase tracking-[0.45em] text-fg-muted">
          ✦ Studios
        </span>
      </span>
    </span>
  );
}

function WhatsAppGlyph({ className }: { className?: string }): React.ReactElement {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
      fill="currentColor"
    >
      <path d="M20.52 3.48A11.94 11.94 0 0 0 12.05 0C5.5 0 .2 5.3.2 11.83a11.7 11.7 0 0 0 1.59 5.91L0 24l6.42-1.68a11.85 11.85 0 0 0 5.64 1.43h.01c6.55 0 11.85-5.3 11.85-11.83a11.7 11.7 0 0 0-3.4-8.44ZM12.07 21.7a9.85 9.85 0 0 1-5.03-1.38l-.36-.21-3.81 1 1.02-3.71-.23-.38a9.86 9.86 0 1 1 18.31-5.18 9.86 9.86 0 0 1-9.9 9.86Zm5.4-7.39c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.95 1.16-.18.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.47a8.96 8.96 0 0 1-1.66-2.06c-.17-.3 0-.45.13-.6.13-.13.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51l-.57-.01a1.1 1.1 0 0 0-.8.37c-.27.3-1.04 1.02-1.04 2.49 0 1.47 1.07 2.89 1.22 3.09.15.2 2.1 3.21 5.08 4.5.71.3 1.26.49 1.69.63.71.23 1.35.2 1.86.12.57-.08 1.75-.71 2-1.4.25-.7.25-1.29.17-1.4-.07-.12-.27-.2-.57-.35Z" />
    </svg>
  );
}
