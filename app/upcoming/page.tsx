import type { Metadata } from "next";
import { BentoGrid } from "@/components/BentoGrid";
import { JsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Upcoming Drops — Notre Gemme AW2026",
  description:
    "Discover what's dropping next from Notre Gemme Studios. AW2026 collection previews, countdown, and early notification sign-up. South Africa.",
  alternates: {
    canonical: "https://notregemmestudios.co.za/upcoming/",
  },
};

const upcomingSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Upcoming Drops — Notre Gemme AW2026",
  description:
    "Notre Gemme Studios upcoming AW2026 collection — sign up to be notified first when new pieces drop.",
  url: "https://notregemmestudios.co.za/upcoming/",
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://notregemmestudios.co.za/" },
      { "@type": "ListItem", position: 2, name: "Upcoming", item: "https://notregemmestudios.co.za/upcoming/" },
    ],
  },
};

/**
 * Upcoming page — dedicated route at /upcoming.
 * Renders the BentoGrid section (countdown, teasers, notify form).
 */
export default function UpcomingPage(): React.ReactElement {
  return (
    <main className="min-h-screen pt-[100px]">
      <JsonLd data={upcomingSchema} />
      <BentoGrid />
    </main>
  );
}
