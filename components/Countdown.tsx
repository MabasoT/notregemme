"use client";

import { useEffect, useState } from "react";

type Props = {
  targetIso: string;
};

type Remaining = { d: string; h: string; m: string; s: string; expired: boolean };

function computeRemaining(targetIso: string): Remaining {
  const target = new Date(targetIso).getTime();
  const diff = target - Date.now();
  if (diff <= 0) return { d: "00", h: "00", m: "00", s: "00", expired: true };
  const d = Math.floor(diff / 864e5);
  const h = Math.floor((diff % 864e5) / 36e5);
  const m = Math.floor((diff % 36e5) / 6e4);
  const s = Math.floor((diff % 6e4) / 1e3);
  return {
    d: String(d).padStart(2, "0"),
    h: String(h).padStart(2, "0"),
    m: String(m).padStart(2, "0"),
    s: String(s).padStart(2, "0"),
    expired: false,
  };
}

/**
 * Live countdown to the next drop. Renders dashes server-side, then
 * starts ticking on the client to avoid a hydration mismatch.
 */
export function Countdown({ targetIso }: Props): React.ReactElement {
  const [r, setR] = useState<Remaining>({ d: "--", h: "--", m: "--", s: "--", expired: false });

  useEffect(() => {
    setR(computeRemaining(targetIso));
    const id = window.setInterval(() => setR(computeRemaining(targetIso)), 1000);
    return () => window.clearInterval(id);
  }, [targetIso]);

  if (r.expired) {
    return (
      <div
        className="font-bold"
        style={{
          fontFamily: "var(--font-heading)",
          fontSize: "clamp(18px, 2vw, 28px)",
          letterSpacing: "-0.02em",
        }}
      >
        Live Now ♦
      </div>
    );
  }

  return (
    <div className="mt-3 flex items-start" style={{ gap: "16px" }}>
      <Unit num={r.d} label="Days" />
      <Sep />
      <Unit num={r.h} label="Hrs" />
      <Sep />
      <Unit num={r.m} label="Min" />
      <Sep />
      <Unit num={r.s} label="Sec" />
    </div>
  );
}

function Unit({ num, label }: { num: string; label: string }): React.ReactElement {
  return (
    <div className="text-center">
      <div
        style={{
          fontFamily: "var(--font-heading)",
          fontSize: "clamp(28px, 3vw, 42px)",
          fontWeight: 700,
          letterSpacing: "-0.03em",
          lineHeight: 1,
          color: "var(--color-fg)",
        }}
      >
        {num}
      </div>
      <div
        style={{
          fontSize: "9px",
          letterSpacing: "0.12em",
          color: "var(--color-fg-muted)",
          fontFamily: "var(--font-heading)",
          fontWeight: 500,
          marginTop: "5px",
          textTransform: "uppercase",
        }}
      >
        {label}
      </div>
    </div>
  );
}

function Sep(): React.ReactElement {
  return (
    <span
      aria-hidden="true"
      style={{
        display: "block",
        alignSelf: "flex-start",
        paddingTop: "2px",
        fontSize: "clamp(20px, 2.5vw, 32px)",
        fontWeight: 300,
        lineHeight: 1,
        color: "rgba(240, 235, 226, 0.25)",
      }}
    >
      :
    </span>
  );
}
