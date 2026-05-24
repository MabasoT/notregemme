import Link from "next/link";
import { footerCopy, igPreviewCopy, waPreviewCopy } from "@/lib/content";
import { siteConfig, whatsappOrderLink } from "@/lib/site-config";
import { NewsletterBar } from "./NewsletterBar";

/**
 * Footer with:
 *  - Newsletter call-out card
 *  - Giant ghost "NG." display gem
 *  - 4-column link grid (brand, collections, brand, socials)
 *  - IG / WhatsApp hover preview cards
 *  - "Built by Mabaso Dev & AI" pill with logo hover-preview
 */
export function Footer(): React.ReactElement {
  return (
    <footer
      id="footer"
      className="pb-10 pt-[clamp(60px,8vw,100px)]"
      style={{
        background: "var(--color-bg-2)",
        borderTop: "1px solid rgba(255,255,255,0.05)",
      }}
    >
      <div className="container-page">
        <NewsletterBar />

        <div
          className="mb-10 select-none font-bold leading-[0.85]"
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "clamp(80px, 14vw, 200px)",
            letterSpacing: "-0.04em",
            color: "rgba(255,255,255,0.03)",
          }}
          aria-hidden="true"
        >
          {footerCopy.giantGem}
        </div>

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] mb-[60px]">
          <div>
            <Link href="/" className="inline-flex items-center gap-3" aria-label={siteConfig.brand.name}>
              <span
                aria-hidden="true"
                className="diamond-clip block h-5 w-5"
                style={{ background: "var(--color-green)" }}
              />
              <span style={{ fontFamily: "var(--font-heading)" }}>
                <span className="block text-base font-bold uppercase tracking-[0.14em] text-fg">
                  Notre Gemme
                </span>
                <span
                  className="block text-[9px] font-medium uppercase tracking-[0.45em]"
                  style={{ color: "var(--color-fg-muted)" }}
                >
                  ✦ Studios
                </span>
              </span>
            </Link>
            <p
              className="mt-4 max-w-[280px]"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "14px",
                color: "var(--color-fg-muted)",
                lineHeight: 1.75,
              }}
            >
              {footerCopy.brandLines.map((l) => (
                <span key={l} className="block">
                  {l}
                </span>
              ))}
            </p>
          </div>

          {footerCopy.columns.map((col) => (
            <div key={col.title}>
              <div
                className="mb-5 uppercase"
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "12px",
                  fontWeight: 600,
                  letterSpacing: "0.15em",
                  color: "var(--color-fg)",
                }}
              >
                {col.title}
              </div>
              <ul className="flex flex-col gap-3">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="transition-colors hover:text-fg"
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "14px",
                        color: "var(--color-fg-muted)",
                        textDecoration: "none",
                      }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <div
              className="mb-5 uppercase"
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "12px",
                fontWeight: 600,
                letterSpacing: "0.15em",
                color: "var(--color-fg)",
              }}
            >
              {footerCopy.followTitle}
            </div>
            <div className="mt-1 flex flex-col gap-4">
              <InstagramLink />
              <WhatsAppLink />
            </div>
          </div>
        </div>

        <div
          className="flex flex-wrap items-center justify-between gap-3 pt-7"
          style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
        >
          <span
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "12px",
              color: "var(--color-fg-muted)",
              letterSpacing: "0.05em",
            }}
          >
            {footerCopy.copyright}
          </span>
          <span
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "12px",
              color: "var(--color-fg-muted)",
              letterSpacing: "0.05em",
            }}
          >
            {footerCopy.madeIn}
          </span>
          <BuiltByMabaso />
        </div>
      </div>
    </footer>
  );
}

function InstagramLink(): React.ReactElement {
  return (
    <div className="group relative inline-flex">
      <a
        href={siteConfig.contact.instagramUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 transition-colors hover:text-fg"
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "14px",
          color: "var(--color-fg-muted)",
          textDecoration: "none",
        }}
      >
        <span
          className="flex h-8 w-8 items-center justify-center rounded-[10px] text-white"
          style={{
            background: "linear-gradient(135deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)",
          }}
          aria-hidden="true"
        >
          <InstagramGlyph className="h-4 w-4" />
        </span>
        <span>{footerCopy.instagramLabel}</span>
      </a>
      <div
        className="pointer-events-none absolute bottom-[calc(100%+14px)] left-1/2 z-[200] w-[220px] -translate-x-1/2 translate-y-2 rounded-2xl p-4 opacity-0 transition-[opacity,transform] duration-300 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100"
        style={{
          background: "rgba(15,15,15,0.97)",
          border: "1px solid rgba(255,255,255,0.1)",
          backdropFilter: "blur(20px)",
          boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
        }}
      >
        <div className="mb-2.5 flex items-center gap-3">
          <span
            className="block h-[52px] w-[52px] shrink-0 overflow-hidden rounded-full"
            style={{
              background:
                "linear-gradient(#0f0f0f, #0f0f0f) padding-box, linear-gradient(135deg, #f09433, #dc2743, #bc1888) border-box",
              border: "2px solid transparent",
            }}
          >
            <span
              aria-hidden="true"
              className="diamond-clip mx-auto mt-3 block h-6 w-6"
              style={{ background: "var(--color-green)" }}
            />
          </span>
          <div>
            <div
              style={{ fontFamily: "var(--font-heading)", fontSize: 13, fontWeight: 600, color: "var(--color-fg)" }}
            >
              {igPreviewCopy.handle}
            </div>
            <div
              className="mt-0.5"
              style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "var(--color-fg-muted)" }}
            >
              {igPreviewCopy.subhandle}
            </div>
          </div>
        </div>
        <div className="mb-2.5 grid grid-cols-3 gap-[3px] overflow-hidden rounded-lg">
          <span
            aria-hidden="true"
            className="placeholder-art aspect-square"
          />
          <span aria-hidden="true" className="placeholder-art aspect-square" />
          <span aria-hidden="true" className="placeholder-art aspect-square" />
        </div>
        <a
          href={siteConfig.contact.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block rounded-lg p-2.5 text-center uppercase text-white"
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: "0.15em",
            background: "linear-gradient(135deg, #f09433, #dc2743, #bc1888)",
            textDecoration: "none",
          }}
        >
          {igPreviewCopy.followCta}
        </a>
      </div>
    </div>
  );
}

function WhatsAppLink(): React.ReactElement {
  return (
    <div className="group relative inline-flex">
      <a
        href={whatsappOrderLink("Hi Notre Gemme! I'd like to place an order.")}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 transition-colors hover:text-fg"
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "14px",
          color: "var(--color-fg-muted)",
          textDecoration: "none",
        }}
      >
        <span
          className="flex h-8 w-8 items-center justify-center rounded-[10px] text-[#050505]"
          style={{ background: "var(--color-whatsapp)" }}
          aria-hidden="true"
        >
          <WhatsAppGlyph className="h-4 w-4" />
        </span>
        <span>{footerCopy.whatsappLabel}</span>
      </a>
      <div
        className="pointer-events-none absolute bottom-[calc(100%+14px)] left-1/2 z-[200] w-[220px] -translate-x-1/2 translate-y-2 rounded-2xl p-4 opacity-0 transition-[opacity,transform] duration-300 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100"
        style={{
          background: "rgba(15,15,15,0.97)",
          border: "1px solid rgba(255,255,255,0.1)",
          backdropFilter: "blur(20px)",
          boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
        }}
      >
        <div
          className="mb-3 rounded-[12px_12px_12px_4px] px-3.5 py-2.5"
          style={{
            background: "rgba(37,211,102,0.08)",
            border: "1px solid rgba(37,211,102,0.2)",
            fontFamily: "var(--font-body)",
            fontSize: 12,
            color: "var(--color-fg-muted)",
            lineHeight: 1.6,
          }}
        >
          👋 {waPreviewCopy.message}
          <br />
          <strong style={{ color: "var(--color-fg)" }}>{waPreviewCopy.emphasis}</strong>
          {waPreviewCopy.rest}
          <strong style={{ color: "var(--color-fg)" }}>{waPreviewCopy.emphasis2}</strong>
          {waPreviewCopy.tail}
        </div>
        <a
          href={whatsappOrderLink("Hi Notre Gemme! I'd like to place an order.")}
          target="_blank"
          rel="noopener noreferrer"
          className="block rounded-lg p-2.5 text-center uppercase"
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: "0.15em",
            color: "#050505",
            background: "var(--color-whatsapp)",
            textDecoration: "none",
          }}
        >
          {waPreviewCopy.cta}
        </a>
      </div>
    </div>
  );
}

function BuiltByMabaso(): React.ReactElement {
  return (
    <div className="group relative">
      <a
        href={siteConfig.built.url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 rounded-pill px-3.5 py-1.5 transition-[border-color,background]"
        style={{
          border: "1px solid rgba(255,255,255,0.07)",
          background: "rgba(255,255,255,0.03)",
          borderRadius: "var(--radius-pill)",
          textDecoration: "none",
        }}
        aria-label={siteConfig.built.fullLine}
        title={siteConfig.built.fullLine}
      >
        <span
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 11,
            color: "var(--color-fg-muted)",
            letterSpacing: "0.05em",
          }}
        >
          Built by
        </span>
        <span
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: "0.1em",
            color: "var(--color-gold)",
          }}
        >
          {siteConfig.built.name}
        </span>
        <span
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 10,
            color: "var(--color-fg-muted)",
            letterSpacing: "0.05em",
          }}
        >
          – {siteConfig.built.tagline}
        </span>
      </a>
      <div
        className="pointer-events-none absolute bottom-[calc(100%+12px)] right-0 z-50 w-[180px] translate-y-2 rounded-2xl p-4 text-center opacity-0 transition-[opacity,transform] duration-300 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100"
        style={{
          background: "rgba(12,12,12,0.97)",
          border: "1px solid rgba(255,255,255,0.1)",
          backdropFilter: "blur(20px)",
          boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
        }}
      >
        <MabasoLogo />
        <div
          className="mt-2"
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: 11,
            fontWeight: 600,
            color: "var(--color-fg)",
            letterSpacing: "0.05em",
          }}
        >
          {siteConfig.built.name}
        </div>
        <div
          className="mt-0.5"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 10,
            color: "var(--color-fg-muted)",
          }}
        >
          mabasodevai.co.za
        </div>
      </div>
    </div>
  );
}

function MabasoLogo(): React.ReactElement {
  return (
    <svg
      viewBox="0 0 100 100"
      className="mx-auto block h-20 w-20"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="md-glass" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#5fdcff" />
          <stop offset="100%" stopColor="#1a6fa5" />
        </linearGradient>
        <linearGradient id="md-gold" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#f8d572" />
          <stop offset="100%" stopColor="#b8842a" />
        </linearGradient>
      </defs>
      <rect
        x="14"
        y="10"
        width="72"
        height="72"
        rx="14"
        fill="url(#md-glass)"
        opacity="0.55"
        stroke="url(#md-gold)"
        strokeWidth="2"
      />
      <path
        d="M28 70 L42 48 L52 60 L66 38 L78 28 L72 38 L78 36"
        fill="none"
        stroke="url(#md-gold)"
        strokeWidth="6"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <rect x="14" y="82" width="72" height="14" rx="3" fill="#1a1a1a" />
      <text
        x="50"
        y="93"
        textAnchor="middle"
        fontFamily="var(--font-heading)"
        fontSize="8"
        fontWeight="700"
        fill="url(#md-gold)"
        letterSpacing="0.5"
      >
        Mabaso Dev &amp; AI
      </text>
    </svg>
  );
}

function InstagramGlyph({ className }: { className?: string }): React.ReactElement {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M12 2.2c3.2 0 3.6 0 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.26.07 1.64.07 4.85s0 3.6-.07 4.85c-.05 1.17-.25 1.8-.41 2.23a3.7 3.7 0 0 1-.9 1.38c-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.26.06-1.64.07-4.85.07s-3.6 0-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.2 15.6 2.2 15.22 2.2 12s0-3.6.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.4 2.2 8.78 2.2 12 2.2Zm0 1.8c-3.16 0-3.53 0-4.77.07-1.07.05-1.65.23-2.04.38a3 3 0 0 0-1.06.69 3 3 0 0 0-.69 1.06c-.15.39-.33.97-.38 2.04C3 8.47 3 8.84 3 12s0 3.53.07 4.77c.05 1.07.23 1.65.38 2.04.16.45.39.78.69 1.06.28.3.61.53 1.06.69.39.15.97.33 2.04.38C8.47 21 8.84 21 12 21s3.53 0 4.77-.07c1.07-.05 1.65-.23 2.04-.38a3 3 0 0 0 1.06-.69 3 3 0 0 0 .69-1.06c.15-.39.33-.97.38-2.04.06-1.24.07-1.61.07-4.77s0-3.53-.07-4.77c-.05-1.07-.23-1.65-.38-2.04a3 3 0 0 0-.69-1.06 3 3 0 0 0-1.06-.69c-.39-.15-.97-.33-2.04-.38C15.53 4 15.16 4 12 4Zm0 3a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 1.8a3.2 3.2 0 1 0 0 6.4 3.2 3.2 0 0 0 0-6.4Zm5.3-2.3a1.15 1.15 0 1 1 0 2.3 1.15 1.15 0 0 1 0-2.3Z" />
    </svg>
  );
}

function WhatsAppGlyph({ className }: { className?: string }): React.ReactElement {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M20.52 3.48A11.94 11.94 0 0 0 12.05 0C5.5 0 .2 5.3.2 11.83a11.7 11.7 0 0 0 1.59 5.91L0 24l6.42-1.68a11.85 11.85 0 0 0 5.64 1.43h.01c6.55 0 11.85-5.3 11.85-11.83a11.7 11.7 0 0 0-3.4-8.44Z" />
    </svg>
  );
}
