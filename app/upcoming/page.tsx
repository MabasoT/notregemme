import type { Metadata } from "next";
import { BentoGrid } from "@/components/BentoGrid";

export const metadata: Metadata = {
  title: "Upcoming — Notre Gemme SS2026",
  description:
    "Coming soon from Notre Gemme Studios. Discover what's dropping next in our AW2026 collection — sign up to be notified first.",
};

/**
 * Upcoming page — dedicated route at /upcoming.
 * Renders the BentoGrid section (countdown, teasers, notify form)
 * that was previously only accessible via the /#upcoming hash anchor.
 */
export default function UpcomingPage(): React.ReactElement {
  return (
    <main className="min-h-screen pt-[100px]">
      <BentoGrid />
    </main>
  );
}
