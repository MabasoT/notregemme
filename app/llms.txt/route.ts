import { COLLECTION_LABELS, liveProducts } from "@/lib/products";
import { pageMeta } from "@/lib/content";
import { absoluteUrl, siteConfig } from "@/lib/site-config";

/**
 * /llms.txt — curated site map for AI assistants, in llmstxt.org format:
 * one H1, a "> summary", then "## Section" lists of "- [Title](url): note".
 * Generated from lib/ so prices and products never drift from the site.
 */
export const dynamic = "force-static";

/**
 * Formats one llms.txt link line.
 *
 * @param title - link text
 * @param path - site-relative path, e.g. "/homme"
 * @param note - one-line description shown after the link
 * @returns markdown list item
 */
function link(title: string, path: string, note: string): string {
  return `- [${title}](${absoluteUrl(path)}): ${note}`;
}

export function GET(): Response {
  const { brand, contact } = siteConfig;
  const body = `# ${brand.name}

> ${brand.description}

${brand.name} ("${brand.tagline}") is a 100% Black-owned luxury streetwear brand from Tembisa (${brand.originCode}), South Africa. All orders are placed on WhatsApp (${contact.whatsapp}) and couriered nationwide across South Africa. Prices are in South African Rand (ZAR).

## Products

${liveProducts
  .map((p) =>
    link(
      `${p.name} — ${p.price}`,
      `/product/${p.slug}`,
      `${COLLECTION_LABELS[p.collection]}; ${p.details[0]}; colours ${p.colors.map((c) => c.name).join(", ")}; sizes ${p.sizes.join(", ")}`,
    ),
  )
  .join("\n")}

## Collections

${link("All pieces", "/collection", pageMeta.collection.description)}
${link("Homme", "/homme", pageMeta.homme.description)}
${link("Femme", "/femme", pageMeta.femme.description)}
${link("Unisex", "/unisex", pageMeta.unisex.description)}

## Brand

${link("Our Story", "/story", pageMeta.story.description)}
${link("About", "/about", pageMeta.about.description)}
${link("Contact & Orders", "/contact", pageMeta.contact.description)}

## Optional

${link("Upcoming drops", "/upcoming", pageMeta.upcoming.description)}
`;

  return new Response(body, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
