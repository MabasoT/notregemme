import Image from "next/image";
import Link from "next/link";
import { footerCopy, igPreviewCopy } from "@/lib/content";
import { ASSETS, LOGO_SIZE } from "@/lib/assets";
import { DEFAULT_ORDER_MESSAGE, siteConfig, whatsappOrderLink } from "@/lib/site-config";
import { NewsletterBar } from "./NewsletterBar";

/**
 * Footer with:
 * - Newsletter call-out card
 * - Giant ghost "NG." display gem
 * - Link grid (brand, shop, brand pages, order & follow)
 * - IG hover preview card
 * - Copyright line + "Built by Mabaso Dev & AI" digital footprint
 */
export function Footer(): React.ReactElement {
  const year = new Date().getFullYear();
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
          data-text={footerCopy.giantGem}
          className="ghost-text mb-10 select-none font-bold leading-[0.85]"
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "clamp(80px, 14vw, 200px)",
            letterSpacing: "-0.04em",
            color: "rgba(255,255,255,0.03)",
          }}
          aria-hidden="true"
        />

        <div className="mb-[60px] grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr]">
          <div>
            {/* Footer logo — clicking takes user back to the home page */}
            <Link href="/" className="inline-flex items-center">
              <Image
                src={ASSETS.logoWhite}
                alt={`${siteConfig.brand.name} — home`}
                width={LOGO_SIZE.width}
                height={LOGO_SIZE.height}
                className="h-[64px] w-auto object-contain"
              />
            </Link>
            <p
              className="mt-5 max-w-[300px]"
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
            Copyright &copy; {year} {footerCopy.copyrightHolder}. All rights reserved.
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
          <DigitalFootprint />
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
          className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-[10px]"
          aria-hidden="true"
        >
          <Image
            src={ASSETS.iconInstagram}
            alt=""
            width={32}
            height={32}
            className="h-8 w-8 object-cover"
          />
        </span>
        <span>{footerCopy.instagramLabel}</span>
      </a>

      <div
        className="pointer-events-none absolute bottom-[calc(100%+12px)] left-0 z-[200] w-[240px] translate-y-2 rounded-2xl p-4 opacity-0 transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:translate-y-0 group-focus-within:opacity-100"
        style={{
          background: "rgba(15,15,15,0.97)",
          border: "1px solid rgba(255,255,255,0.1)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
        }}
      >
        <div className="mb-3 flex items-center gap-3">
          <span
            className="relative flex h-[52px] w-[52px] shrink-0 items-center justify-center overflow-hidden rounded-full"
            style={{
              background:
                "linear-gradient(#0f0f0f, #0f0f0f) padding-box, linear-gradient(135deg, #f09433, #dc2743, #bc1888) border-box",
              border: "2px solid transparent",
            }}
          >
            <Image
              src={ASSETS.logoWhite}
              alt=""
              width={LOGO_SIZE.width}
              height={LOGO_SIZE.height}
              className="h-9 w-9 object-contain"
            />
          </span>
          <div>
            <div
              className="flex items-center gap-1"
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: 13,
                fontWeight: 600,
                color: "var(--color-fg)",
              }}
            >
              {igPreviewCopy.handle}
              <span aria-hidden="true" style={{ color: "var(--color-green)", fontSize: 11 }}>
                &#x2736;
              </span>
            </div>
            <div
              className="mt-0.5"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 11,
                color: "var(--color-fg-muted)",
              }}
            >
              {igPreviewCopy.subhandle}
            </div>
          </div>
        </div>

        <div className="mb-3 grid grid-cols-3 gap-[3px] overflow-hidden rounded-lg">
          <span
            className="placeholder-art relative block aspect-square overflow-hidden"
            aria-hidden="true"
          >
            <Image
              src={ASSETS.queenOfHeartsTee}
              alt=""
              fill
              sizes="80px"
              className="object-cover"
            />
          </span>
          <span
            className="placeholder-art relative block aspect-square overflow-hidden"
            aria-hidden="true"
          >
            <Image
              src={ASSETS.hoodieBack}
              alt=""
              fill
              sizes="80px"
              className="object-contain"
            />
          </span>
          <span
            className="placeholder-art relative block aspect-square overflow-hidden"
            aria-hidden="true"
          >
            <Image
              src={ASSETS.kingOfHeartsTee}
              alt=""
              fill
              sizes="80px"
              className="object-cover"
            />
          </span>
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
          {igPreviewCopy.cta}
        </a>
      </div>
    </div>
  );
}

/** WhatsApp link — icon + "WhatsApp Orders" label (matching Instagram row style). */
function WhatsAppLink(): React.ReactElement {
  return (
    <div className="group relative inline-flex">
      <a
        href={whatsappOrderLink(DEFAULT_ORDER_MESSAGE)}
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
          className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full"
          aria-hidden="true"
        >
          <Image
            src={ASSETS.iconWhatsapp}
            alt=""
            width={32}
            height={32}
            className="h-8 w-8 object-cover"
          />
        </span>
        <span>{footerCopy.whatsappLabel}</span>
      </a>
    </div>
  );
}

/**
 * Digital footprint — required on every Mabaso Dev & AI client site.
 * Do not remove: it credits the builder and links back to the agency.
 */
function DigitalFootprint(): React.ReactElement {
  return (
    <a
      href={siteConfig.built.url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 rounded-pill px-4 py-2 transition-[border-color,background,transform] duration-200 hover:scale-[1.02]"
      style={{
        border: "1px solid rgba(255,255,255,0.08)",
        background: "rgba(255,255,255,0.03)",
        borderRadius: "var(--radius-pill)",
        textDecoration: "none",
        fontFamily: "var(--font-body)",
        fontSize: 11,
        letterSpacing: "0.06em",
        color: "var(--color-fg-muted)",
      }}
    >
      <Image
        src={ASSETS.builderLogo}
        alt=""
        width={20}
        height={20}
        className="h-5 w-5 rounded-md object-contain"
      />
      <span>
        {footerCopy.builtByPrefix}{" "}
        <span className="font-semibold" style={{ color: "var(--color-gold)" }}>
          {siteConfig.built.name} &ndash; {siteConfig.built.tagline}
        </span>
      </span>
    </a>
  );
}
