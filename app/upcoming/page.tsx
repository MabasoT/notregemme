import type { Metadata } from "next";
import { BentoGrid } from "@/components/BentoGrid";
import { JsonLd } from "@/components/JsonLd";
import { pageMeta } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbSchema, webPageSchema } from "@/lib/schema";

export const metadata: Metadata = pageMetadata("upcoming", "/upcoming");

/** /upcoming — AW2026 teasers, countdown and drop-alert sign-up. */
export default function UpcomingPage(): React.ReactElement {
  return (
    <div className="min-h-screen pt-[100px]">
      <JsonLd data={webPageSchema("WebPage", pageMeta.upcoming.title, pageMeta.upcoming.description, "/upcoming")} />
      <JsonLd data={breadcrumbSchema([{ name: "Upcoming", path: "/upcoming" }])} />
      <BentoGrid headingLevel="h1" />
    </div>
  );
}
