import Image from "next/image";
import Link from "next/link";
import { footerCopy, igPreviewCopy } from "@/lib/content";
import { asset, siteConfig, whatsappOrderLink } from "@/lib/site-config";
import { NewsletterBar } from "./NewsletterBar";

/**
 * Footer with:
 * - Newsletter call-out card
 * - Giant ghost "NG." display gem
 * - 4-column link grid (brand, collections, brand, socials)
 * - IG / WhatsApp hover preview cards
 * - "Digital footprint by Mabaso Dev AI" pill linking to mabasodevai.co.za
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
                        </div>div>
                
                        <div className="mb-[60px] grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr]">
                                  <div>
                                              <Link
                                                              href="/"
                                                              className="inline-flex items-center"
                                                              aria-label={siteConfig.brand.name}
                                                            >
                                                            <Image
                                                                              src={asset("/assets/logo notregemme.png")}
                                                                              alt={siteConfig.brand.name}
                                                                              width={200}
                                                                              height={112}
                                                                              className="h-[64px] w-auto object-contain brightness-0 invert"
                                                                            />
                                              </Link>Link>
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
                                                                              </span>span>
                                                                            ))}
                                              </p>p>
                                  </div>div>
                        
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
                                            </div>div>
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
                                                                      </Link>Link>
                                                  </li>li>
                                                ))}
                                            </ul>ul>
                              </div>div>
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
                                              </div>div>
                                              <div className="mt-1 flex flex-col gap-4">
                                                            <InstagramLink />
                                                            <WhatsAppLink />
                                              </div>div>
                                  </div>div>
                        </div>div>
                
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
                                  </span>span>
                                  <span
                                                style={{
                                                                fontFamily: "var(--font-body)",
                                                                fontSize: "12px",
                                                                color: "var(--color-fg-muted)",
                                                                letterSpacing: "0.05em",
                                                }}
                                              >
                                    {footerCopy.madeIn}
                                  </span>span>
                                  <DigitalFootprint />
                        </div>div>
                </div>div>
          </footer>footer>
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
                          {/* Use the uploaded Instagram brand icon */}
                                  <Image
                                                src={asset("/assets/icon-instagram.png")}
                                                alt="Instagram"
                                                width={32}
                                                height={32}
                                                className="h-8 w-8 object-cover"
                                              />
                        </span>span>
                        <span>{footerCopy.instagramLabel}</span>span>
                </a>a>
          
                <div
                          className="pointer-events-none absolute bottom-[calc(100%+12px)] left-0 z-[200] w-[240px] translate-y-2 rounded-2xl p-4 opacity-0 transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100"
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
                                                              src={asset("/assets/logo notregemme.png")}
                                                              alt=""
                                                              width={52}
                                                              height={52}
                                                              className="h-9 w-9 object-contain brightness-0 invert"
                                                              aria-hidden="true"
                                                            />
                                  </span>span>
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
                                                                            ✦
                                                            </span>span>
                                              </div>div>
                                              <div
                                                              className="mt-0.5"
                                                              style={{
                                                                                fontFamily: "var(--font-body)",
                                                                                fontSize: 11,
                                                                                color: "var(--color-fg-muted)",
                                                              }}
                                                            >
                                                {igPreviewCopy.subhandle}
                                              </div>div>
                                  </div>div>
                        </div>div>
                
                        <div className="mb-3 grid grid-cols-3 gap-[3px] overflow-hidden rounded-lg">
                                  <span
                                                className="placeholder-art relative block aspect-square overflow-hidden"
                                                aria-hidden="true"
                                              >
                                              <Image
                                                              src={asset("/assets/Product 1.jpg")}
                                                              alt=""
                                                              fill
                                                              sizes="80px"
                                                              className="object-cover"
                                                              unoptimized
                                                            />
                                  </span>span>
                                  <span
                                                className="placeholder-art relative block aspect-square overflow-hidden"
                                                aria-hidden="true"
                                              >
                                              <Image
                                                              src={asset("/assets/Hoodie back.png")}
                                                              alt=""
                                                              fill
                                                              sizes="80px"
                                                              className="object-contain"
                                                              unoptimized
                                                            />
                                  </span>span>
                                  <span
                                                className="placeholder-art relative block aspect-square overflow-hidden"
                                                aria-hidden="true"
                                              >
                                              <Image
                                                              src={asset("/assets/Product 2.jpg")}
                                                              alt=""
                                                              fill
                                                              sizes="80px"
                                                              className="object-cover"
                                                              unoptimized
                                                            />
                                  </span>span>
                        </div>div>
                
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
                                                  background:
                                                                  "linear-gradient(135deg, #f09433, #dc2743, #bc1888)",
                                                  textDecoration: "none",
                                    }}
                                  >
                          {igPreviewCopy.followCta}
                        </a>a>
                </div>div>
          </div>div>
        );
}

/** Icon-only WhatsApp link — single icon, no duplicate label. */
function WhatsAppLink(): React.ReactElement {
    return (
          <div className="group relative inline-flex">
                <a
                          href={whatsappOrderLink(
                                      "Hi Notre Gemme! I'd like to place an order.",
                                    )}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Order on WhatsApp"
                          className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full transition-opacity hover:opacity-80"
                        >
                  {/* WhatsApp brand icon — icon only, no text label */}
                        <Image
                                    src={asset("/assets/icon-whatsapp.png")}
                                    alt="WhatsApp"
                                    width={32}
                                    height={32}
                                    className="h-8 w-8 object-cover"
                                  />
                </a>a>
          </div>div>
        );
}

/**
 * "Digital footprint by Mabaso Dev AI" credit pill. Hover reveals a small
  * preview card with a typography-only monogram (gold gradient on dark)
   * — keeping it clean rather than approximating the brand logo, since
    * the actual Mabaso brand mark isn't bundled in this repo.
     */
function DigitalFootprint(): React.ReactElement {
    return (
          <div className="group relative">
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
                          }}
                          aria-label={`Digital footprint by ${siteConfig.built.name}`}
                        >
                  {/* Small Mabaso Dev AI logo in the credit pill */}
                        <Image
                                    src={asset("/assets/logo-mabasodevai.png")}
                                    alt=""
                                    width={20}
                                    height={20}
                                    aria-hidden="true"
                                    className="h-5 w-5 rounded-md object-contain"
                                  />
                        <span
                                    style={{
                                                  fontFamily: "var(--font-body)",
                                                  fontSize: 11,
                                                  color: "var(--color-fg-muted)",
                                                  letterSpacing: "0.08em",
                                    }}
                                  >
                                  Digital footprint by
                        </span>span>
                        <span
                                    style={{
                                                  fontFamily: "var(--font-heading)",
                                                  fontSize: 11,
                                                  fontWeight: 600,
                                                  letterSpacing: "0.12em",
                                                  color: "var(--color-gold)",
                                                  textTransform: "uppercase",
                                    }}
                                  >
                          {siteConfig.built.short}
                        </span>span>
                </a>a>
          
                <div
                          className="pointer-events-none absolute bottom-[calc(100%+10px)] right-0 z-50 w-[200px] translate-y-2 rounded-2xl p-4 text-center opacity-0 transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100"
                          style={{
                                      background: "rgba(12,12,12,0.97)",
                                      border: "1px solid rgba(255,255,255,0.1)",
                                      backdropFilter: "blur(20px)",
                                      WebkitBackdropFilter: "blur(20px)",
                                      boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
                          }}
                        >
                  {/* Mabaso Dev AI company logo — uploaded to public/assets */}
                        <Image
                                    src={asset("/assets/logo-mabasodevai.png")}
                                    alt="Mabaso Dev AI"
                                    width={80}
                                    height={80}
                                    className="h-[72px] w-[72px] rounded-[12px] object-contain"
                                  />
                        <div
                                    className="mt-3"
                                    style={{
                                                  fontFamily: "var(--font-heading)",
                                                  fontSize: 12,
                                                  fontWeight: 700,
                                                  color: "var(--color-fg)",
                                                  letterSpacing: "0.05em",
                                    }}
                                  >
                          {siteConfig.built.name}
                        </div>div>
                        <div
                                    className="mt-1"
                                    style={{
                                                  fontFamily: "var(--font-body)",
                                                  fontSize: 10,
                                                  color: "var(--color-fg-muted)",
                                                  letterSpacing: "0.05em",
                                    }}
                                  >
                          {siteConfig.built.tagline}
                        </div>div>
                        <div
                                    className="mt-2"
                                    style={{
                                                  fontFamily: "var(--font-heading)",
                                                  fontSize: 9,
                                                  color: "var(--color-gold)",
                                                  letterSpacing: "0.18em",
                                                  textTransform: "uppercase",
                                    }}
                                  >
                                  mabasodevai.co.za ↗
                        </div>div>
                </div>div>
          </div>div>
        );
}

function InstagramGlyph({
    className,
}: {
    className?: string;
}): React.ReactElement {
    return (
          <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                  className={className}
                >
                <path d="M12 2.2c3.2 0 3.6 0 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.26.07 1.64.07 4.85s0 3.6-.07 4.85c-.05 1.17-.25 1.8-.41 2.23a3.7 3.7 0 0 1-.9 1.38c-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.26.06-1.64.07-4.85.07s-3.6 0-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.2 15.6 2.2 15.22 2.2 12s0-3.6.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.4 2.2 8.78 2.2 12 2.2Zm0 5.8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm5.3-.5a1.15 1.15 0 1 1 0 2.3 1.15 1.15 0 0 1 0-2.3ZM12 9.6a2.4 2.4 0 1 1 0 4.8 2.4 2.4 0 0 1 0-4.8Z" />
          </svg>svg>
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
                  fill="currentColor"
                  aria-hidden="true"
                  className={className}
                >
                <path d="M20.52 3.48A11.94 11.94 0 0 0 12.05 0C5.5 0 .2 5.3.2 11.83a11.7 11.7 0 0 0 1.59 5.91L0 24l6.42-1.68a11.85 11.85 0 0 0 5.64 1.43h.01c6.55 0 11.85-5.3 11.85-11.83a11.7 11.7 0 0 0-3.4-8.44ZM12.07 21.7a9.85 9.85 0 0 1-5.03-1.38l-.36-.21-3.81 1 1.02-3.71-.23-.38a9.86 9.86 0 1 1 18.31-5.18 9.86 9.86 0 0 1-9.9 9.86Z" />
          </svg>svg>
        );
}</footer>
