"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { asset, siteConfig, whatsappOrderLink } from "@/lib/site-config";

/**
 * Fixed top header. Logo center, nav left/right, WhatsApp pill CTA right.
 * Adds glass blur after 60px of scroll. Mobile breakpoint replaces nav
 * links with a full-screen overlay toggled by the hamburger button.
 *
 * Clicking the logo while on the home route smooth-scrolls to top
 * instead of triggering a no-op navigation. It also clears any hash
 * fragment so the URL always shows clean "/" when on the home page.
 */
export function Header(): React.ReactElement {
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const onScroll = (): void => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while mobile menu is open
  useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const close = (): void => setMobileOpen(false);

  const onLogoClick = (e: React.MouseEvent<HTMLAnchorElement>): void => {
    close();
    if (pathname === "/") {
      e.preventDefault();
      // Clear any hash fragment so URL always shows clean "/"
      history.replaceState(null, "", window.location.pathname);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Hash-aware navigation for in-page anchors (/, /#story etc.)
  const onAnchorClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ): void => {
    close();

    // Home link: always navigate to "/" and clear any existing hash
    if (href === "/") {
      if (pathname === "/") {
        e.preventDefault();
        history.replaceState(null, "", window.location.pathname);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      // Otherwise let Next.js handle the navigation to "/"
      return;
    }

    if (!href.includes("#")) return;
    const [path, hash] = href.split("#");
    if (path && path !== "" && path !== pathname) {
      // Cross-page hash — let Next handle navigation, scroll fires on landing
      return;
    }
    if (!hash) return;
    e.preventDefault();
    const el = document.getElementById(hash);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      history.replaceState(null, "", `#${hash}`);
    } else {
      router.push(href);
    }
  };

  return (
    <>
      <header
        className="fixed inset-x-0 top-0 z-[100] grid grid-cols-[1fr_auto_1fr] items-center gap-4 py-4 transition-[background,backdrop-filter,padding] duration-[400ms]"
        style={{
          paddingLeft: "var(--gutter)",
          paddingRight: "var(--gutter)",
          background: scrolled ? "rgba(5,5,5,0.85)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled
            ? "1px solid rgba(255,255,255,0.04)"
            : "1px solid transparent",
        }}
      >
        <nav
          className="hidden items-center justify-start gap-7 md:flex"
          aria-label="Primary"
        >
          {siteConfig.nav.left.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={(e) => onAnchorClick(e, link.href)}
              className="text-[11px] uppercase tracking-[0.18em] text-fg-muted transition-colors hover:text-fg"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/"
          onClick={onLogoClick}
          aria-label={siteConfig.brand.name}
          className="relative z-[101] flex items-center justify-center"
        >
          <Image
            src={asset("/assets/logo notregemme.png")}
            alt={siteConfig.brand.name}
            width={200}
            height={112}
            priority
            className="h-[56px] w-auto select-none object-contain brightness-0 invert transition-transform duration-200 hover:scale-[1.04]"
            style={{ filter: "brightness(0) invert(1) drop-shadow(0 4px 12px rgba(0,0,0,0.4))" }}
          />
        </Link>

        <nav
          className="hidden items-center justify-end gap-6 md:flex"
          aria-label="Secondary"
        >
          {siteConfig.nav.right.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={(e) => onAnchorClick(e, link.href)}
              className="text-[11px] uppercase tracking-[0.18em] text-fg-muted transition-colors hover:text-fg"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {link.label}
            </Link>
          ))}
          <a
            href={whatsappOrderLink(
              "Hi Notre Gemme! I'd like to place an order.",
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="nav-order-btn"
          >
            Order
          </a>
        </nav>

        <button
          type="button"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
          onClick={() => setMobileOpen((v) => !v)}
          className="absolute right-[var(--gutter)] z-[201] flex h-10 w-10 items-center justify-center rounded-full text-2xl text-fg md:hidden"
          style={{
            background: mobileOpen
              ? "rgba(255,255,255,0.08)"
              : "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          {mobileOpen ? "✕" : "☰"}
        </button>
      </header>

      {/* Mobile overlay nav — single drawer, both left + right links */}
      <div
        id="mobile-nav"
        className={`fixed inset-0 z-[200] flex flex-col items-center justify-center gap-7 transition-[opacity,transform] duration-[400ms] md:hidden ${
          mobileOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none -translate-y-2 opacity-0"
        }`}
        style={{
          background: "rgba(5,5,5,0.97)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
        }}
        aria-hidden={!mobileOpen}
      >
        {[...siteConfig.nav.left, ...siteConfig.nav.right].map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={(e) => onAnchorClick(e, link.href)}
            className="text-lg uppercase tracking-[0.18em] text-fg transition-colors hover:text-green"
            style={{ fontFamily: "var(--font-body)" }}
          >
            {link.label}
          </Link>
        ))}
        <a
          href={whatsappOrderLink(
            "Hi Notre Gemme! I'd like to place an order.",
          )}
          target="_blank"
          rel="noopener noreferrer"
          onClick={close}
          className="mt-4 inline-flex items-center gap-2 rounded-pill px-7 py-3 text-sm font-semibold uppercase tracking-[0.15em]"
          style={{
            fontFamily: "var(--font-heading)",
            background: "var(--color-whatsapp)",
            color: "#050505",
          }}
        >
          <WhatsAppGlyph className="h-5 w-5" />
          Order via WhatsApp
        </a>
      </div>
    </>
  );
}

function WhatsAppGlyph({
  className,
}: {
  className?: string;
}): React.ReactElement {
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
