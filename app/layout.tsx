import type { Metadata, Viewport } from "next";
import { CustomCursor } from "@/components/CustomCursor";
import { Header } from "@/components/Header";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Footer } from "@/components/Footer";
import { NotreGemmeChatbot } from "@/components/NotreGemmeChatbot";
import { siteConfig } from "@/lib/site-config";
import "./globals.css";

export const metadata: Metadata = {
    metadataBase: new URL("https://notregemme.co.za"),
    title: {
      default: siteConfig.brand.name + " — " + siteConfig.brand.tagline,
          template: "%s — " + siteConfig.brand.name,
    },
    description: siteConfig.brand.description,
    keywords: [
          "Notre Gemme",
          "South Africa",
          "streetwear",
          "fashion",
          "Tembisa",
          "Femme",
          "Barcode tee",
          "Evolution hoodie",
        ],
    authors: [{ name: siteConfig.brand.name }],
    creator: siteConfig.brand.name,
    openGraph: {
          type: "website",
          title: siteConfig.brand.name + " — " + siteConfig.brand.tagline,
          description: siteConfig.brand.description,
          siteName: siteConfig.brand.name,
          locale: "en_ZA",
    },
    twitter: {
          card: "summary_large_image",
          title: siteConfig.brand.name + " — " + siteConfig.brand.tagline,
          description: siteConfig.brand.description,
    },
    robots: { index: true, follow: true },
};

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    themeColor: "#050505",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}): React.ReactElement {
    return (
          <html lang="en">
                <head>
                        <link rel="preconnect" href="https://fonts.googleapis.com" />
                        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
                        <link
                                    rel="stylesheet"
                                    href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Archivo:ital,wght@0,100..900;1,100..900&display=swap"
                                  />
                </head>
                <body>
                        <CustomCursor />
                        <ScrollReveal />
                        <Header />
                        <main>{children}</main>
                        <Footer />
                        <NotreGemmeChatbot />
                </body>
          </html>html>
        );
}</html>
