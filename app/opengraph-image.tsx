import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site-config";
import { ASSETS, LOGO_SIZE } from "@/lib/assets";

/**
 * Site-wide 1200×630 PNG Open Graph image, generated once at build time.
 * Social apps don't render SVG previews, so this must be a raster file.
 * Product pages override it with their own photo.
 */
export const alt = `${siteConfig.brand.name} — ${siteConfig.brand.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const BG = "#050505";
const FG = "#f0ebe2";
const ACCENT = "#8fbf3a";
const LOGO_RENDER_WIDTH = 420;

export default async function OpengraphImage(): Promise<ImageResponse> {
  const logo = await readFile(join(process.cwd(), "public", ASSETS.logoWhite));
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: BG,
          color: FG,
        }}
      >
        <img
          src={logoSrc}
          width={LOGO_RENDER_WIDTH}
          height={Math.round((LOGO_RENDER_WIDTH * LOGO_SIZE.height) / LOGO_SIZE.width)}
          alt=""
        />
        <div style={{ marginTop: 36, fontSize: 52, fontWeight: 700, letterSpacing: -1 }}>
          {siteConfig.brand.tagline}
        </div>
        <div
          style={{
            marginTop: 18,
            fontSize: 24,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: ACCENT,
          }}
        >
          {`Luxury streetwear · ${siteConfig.brand.season} · South Africa`}
        </div>
      </div>
    ),
    size,
  );
}
