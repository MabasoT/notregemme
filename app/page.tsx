import { Hero } from "@/components/Hero";
import { ShippingStrip } from "@/components/ShippingStrip";
import { Marquee } from "@/components/Marquee";
import { BrandStory } from "@/components/BrandStory";
import { HommeCollection } from "@/components/HommeCollection";
import { FemmeCollection } from "@/components/FemmeCollection";
import { BentoGrid } from "@/components/BentoGrid";

/**
 * Home — the single-page brand experience. Order mirrors the original
 * index.html composition: hero → shipping → marquee → story → homme →
 * femme → upcoming bento.
 */
export default function HomePage(): React.ReactElement {
  return (
    <>
      <Hero />
      <ShippingStrip />
      <Marquee />
      <BrandStory />
      <div className="divider-line" />
      <HommeCollection />
      <div className="divider-line" />
      <FemmeCollection />
      <div className="divider-line" />
      <BentoGrid />
    </>
  );
}
