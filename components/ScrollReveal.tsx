"use client";

import { useEffect } from "react";

/**
 * Mounts a single IntersectionObserver that adds `.visible` to all `.reveal`
 * elements once they cross the 0.12 threshold. Unobserves each element after.
 */
export function ScrollReveal(): null {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const els = document.querySelectorAll<HTMLElement>(".reveal");
    if (els.length === 0) return;

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

    for (const el of Array.from(els)) observer.observe(el);

    return () => observer.disconnect();
  }, []);

  return null;
}
