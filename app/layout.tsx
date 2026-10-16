import type { Metadata, Viewport } from "next";
import { CustomCursor } from "@/components/CustomCursor";
import { Header } from "@/components/Header";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { NotreGemmeChatbot } from "@/components/NotreGemmeChatbot";
import { pageMeta } from "@/lib/content";
import { archivo, spaceGrotesk } from "@/lib/fonts";
import { organizationSchema } from "@/lib/schema";
import { SITE_URL, siteConfig } from "@/lib/site-config";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: pageMeta.home.title,
    template: `%s — ${siteConfig.brand.name}`,
  },
  description: pageMeta.home.description,
  applicationName: siteConfig.brand.name,
  keywords: [
    "Notre Gemme",
    "luxury streetwear South Africa",
    "South African streetwear brand",
    "heavyweight cotton hoodies",
    "oversized tees South Africa",
    "Tembisa fashion brand",
    "Black-owned clothing brand",
  ],
  authors: [{ name: siteConfig.brand.name, url: SITE_URL }],
  creator: siteConfig.brand.name,
  publisher: siteConfig.brand.name,
  openGraph: {
    type: "website",
    siteName: siteConfig.brand.name,
    locale: "en_ZA",
    url: "/",
    title: pageMeta.home.title,
    description: pageMeta.home.description,
  },
  twitter: {
    card: "summary_large_image",
    title: pageMeta.home.title,
    description: pageMeta.home.description,
  },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#050505",
  colorScheme: "dark",
};

/**
 * Root layout: self-hosted fonts, global chrome (header, footer, chatbot, cursor) and
 * the Organization JSON-LD every page inherits.
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  return (
    <html lang="en-ZA" className={`${spaceGrotesk.variable} ${archivo.variable}`}>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <JsonLd data={organizationSchema()} />
        <CustomCursor />
        <ScrollReveal />
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <NotreGemmeChatbot />
      </body>
    </html>
  );
}
