import type { Metadata } from "next";
import { aboutPage, storyCopy } from "@/lib/content";
import { ProductImage } from "@/components/ProductImage";

export const metadata: Metadata = {
  title: "About | Notre Gemme",
  description:
    "Notre Gemme means 'Our Gem.' A fashion and art brand born in South Africa, Tembisa 1632 — built on emotion, memory, and real human experience.",
};

/**
 * About page — brand philosophy and the 1632 code.
 */
export default function AboutPage(): React.ReactElement {
  return (
    <article className="pt-[140px] pb-[clamp(80px,10vw,140px)]">
      <div className="container-page">
        <header className="reveal mb-16 max-w-[820px]">
          <p className="section-label">{aboutPage.eyebrow}</p>
          <h1 className="section-title whitespace-pre-line">{aboutPage.title}</h1>
          <p className="section-body mt-7">{aboutPage.intro}</p>
        </header>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          <div className="reveal reveal-delay-1">
            <div
              className="rounded-card overflow-hidden"
              style={{ borderRadius: "var(--radius-card)" }}
            >
              <ProductImage
                src="/assets/Hoodie back.png"
                alt={storyCopy.imageAlt}
                motif="heart"
                aspect="4/5"
                fit="cover"
              />
            </div>
          </div>

          <div className="flex flex-col gap-12">
            {aboutPage.sections.map((s, i) => (
              <section
                key={s.anchor}
                id={s.anchor}
                className={`reveal reveal-delay-${Math.min(i + 1, 4)}`}
              >
                <h2
                  className="font-bold"
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontSize: "clamp(24px, 3vw, 40px)",
                    letterSpacing: "-0.02em",
                    lineHeight: 1.1,
                  }}
                >
                  {s.heading}
                </h2>
                <p className="section-body mt-5">{s.body}</p>
              </section>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
