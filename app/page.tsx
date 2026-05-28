import type { Metadata } from "next";
import { CollectionHeader } from "@/components/CollectionHeader";
import { Hero } from "@/components/Hero";
import { JsonLd } from "@/components/JsonLd";
import { ShippingStrip } from "@/components/ShippingStrip";
import { Marquee } from "@/components/Marquee";
import { BrandStory } from "@/components/BrandStory";
import { ProductCard } from "@/components/ProductCard";
import { BentoGrid } from "@/components/BentoGrid";
import { products } from "@/lib/products";

export const metadata: Metadata = {
  title: "Notre Gemme — Humanity, Our Treasure.",
  description:
    "Notre Gemme — luxury minimalist streetwear born in South Africa. SS2026 collection: Homme, Femme, and Unisex pieces designed to endure.",
  alternates: {
    canonical: "https://notregemme.co.za/",
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Notre Gemme",
  url: "https://notregemme.co.za",
  logo: "https://notregemme.co.za/assets/logo.png",
  description:
    "Luxury minimalist streetwear from South Africa. Every piece is a translation of feeling into form.",
  address: {
    "@type": "PostalAddress",
    addressCountry: "ZA",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+27-75-276-3672",
    contactType: "customer service",
