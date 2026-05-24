"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Mounts an IntersectionObserver that adds `.visible` to all `.reveal`
 * elements once they cross the 0.12 threshold.
 *
 * Re-scans on every client-side navigation (pathname change) so pages
 * mounted after the initial load still animate in. Without this, links
 * from the header would render their content invisible.
 *
 * If the user has prefers-reduced-motion, we skip observation and
 * unconditionally reveal everything immediately.
 */
export function ScrollReveal(): null {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const els = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    if (els.length === 0) return;

    if (reduced) {
      for (const el of els) el.classList.add("visible");
      return;
    }

    // Reveal anything already in the viewport at mount (covers above-the-fold
    // content on freshly-navigated pages) so users never see a blank page.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12 },
    );

    for (const el of els) {
      // Fast path: if it already intersects on mount, reveal synchronously.
      const rect = el.getBoundingClientRect();
      const inView =
        rect.top < window.innerHeight && rect.bottom > 0 && rect.left < window.innerWidth;
      if (inView) {
        el.classList.add("visible");
      } else {
        observer.observe(el);
      }
    }

    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
