"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/** Fraction of an element that must be visible before it animates in. */
const REVEAL_THRESHOLD = 0.12;

/**
 * Scroll-reveal for `.reveal` elements, without hurting first paint.
 *
 * Everything renders visible from the server. On mount, only elements
 * that start BELOW the fold get `.reveal-pending` (hidden, shifted down);
 * an IntersectionObserver removes it as each one scrolls into view, which
 * plays the fade-up transition. Content already on screen is never hidden,
 * so the hero, product photo and page headings paint immediately — hiding
 * them until hydration used to add ~1 s to LCP on mobile.
 *
 * Re-scans on every client-side navigation (pathname change). Skipped
 * entirely for prefers-reduced-motion.
 */
export function ScrollReveal(): null {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const els = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    if (els.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.remove("reveal-pending");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: REVEAL_THRESHOLD },
    );

    for (const el of els) {
      const belowFold = el.getBoundingClientRect().top >= window.innerHeight;
      if (belowFold) {
        el.classList.add("reveal-pending");
        observer.observe(el);
      }
    }

    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
