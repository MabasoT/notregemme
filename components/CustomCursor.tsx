"use client";

import { useEffect, useRef } from "react";

/** Ring easing per frame — lower trails further behind the pointer. */
const RING_LERP = 0.12;
/** Off-screen start so nothing flashes at (0,0) before the first move. */
const OFFSCREEN_PX = -100;

/**
 * Diamond-shaped custom cursor with a lerp-tracked outer ring.
 * - Inner: 12×12 acid green diamond, direct mouse follow.
 * - Outer ring: 36×36 diamond outline, lerp factor 0.12.
 * - Auto-expands on link/button hover (52×52, ring).
 * - Inner switches to fg colour + 16×16 on `.product-card` hover.
 * - Hidden on coarse pointers (touch) by CSS, not by skipping render —
 *   rendering differently on server and client breaks hydration.
 */
export function CustomCursor(): React.ReactElement {
  const innerRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const inner = innerRef.current;
    const ring = ringRef.current;
    if (!inner || !ring) return;

    let mx = OFFSCREEN_PX;
    let my = OFFSCREEN_PX;
    let rx = OFFSCREEN_PX;
    let ry = OFFSCREEN_PX;
    let raf = 0;

    const onMove = (e: MouseEvent): void => {
      mx = e.clientX;
      my = e.clientY;
    };

    const tick = (): void => {
      inner.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
      rx += (mx - rx) * RING_LERP;
      ry += (my - ry) * RING_LERP;
      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(tick);
    };

    document.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(tick);

    return () => {
      document.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div
        ref={innerRef}
        aria-hidden="true"
        className="cursor-layer diamond-clip pointer-events-none fixed left-0 top-0 z-[9999] h-3 w-3 will-change-transform"
        style={{
          background: "var(--color-green)",
          transition: "width 0.2s, height 0.2s, background 0.2s",
        }}
        data-cursor-inner
      />
      <div
        ref={ringRef}
        aria-hidden="true"
        className="cursor-layer diamond-clip pointer-events-none fixed left-0 top-0 z-[9998] h-9 w-9 will-change-transform"
        style={{
          border: "1px solid var(--color-green)",
          opacity: 0.4,
          transition:
            "width 0.35s cubic-bezier(0.23,1,0.32,1), height 0.35s cubic-bezier(0.23,1,0.32,1), opacity 0.2s",
        }}
        data-cursor-ring
      />
      <style>{`
        body:has(a:hover) [data-cursor-ring],
        body:has(button:hover) [data-cursor-ring] {
          width: 52px; height: 52px; opacity: 0.8;
        }
        body:has(.product-card:hover) [data-cursor-inner] {
          background: var(--color-fg) !important;
          width: 16px; height: 16px;
        }
      `}</style>
    </>
  );
}
