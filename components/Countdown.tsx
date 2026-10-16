"use client";

import { useEffect, useState } from "react";
import { countdownCopy } from "@/lib/content";

const MS_PER_SECOND = 1_000;
const MS_PER_MINUTE = 60 * MS_PER_SECOND;
const MS_PER_HOUR = 60 * MS_PER_MINUTE;
const MS_PER_DAY = 24 * MS_PER_HOUR;

type Props = {
  /** ISO date of the drop. Empty or invalid → "Date announced soon". */
  targetIso: string;
};

type Remaining = { d: string; h: string; m: string; s: string; expired: boolean };

function computeRemaining(targetIso: string): Remaining {
  const target = targetIso ? new Date(targetIso).getTime() : Number.NaN;
  const diff = target - Date.now();
  // NaN (no date set) and past dates both mean "no live countdown".
  if (!(diff > 0)) return { d: "00", h: "00", m: "00", s: "00", expired: true };
  const d = Math.floor(diff / MS_PER_DAY);
  const h = Math.floor((diff % MS_PER_DAY) / MS_PER_HOUR);
  const m = Math.floor((diff % MS_PER_HOUR) / MS_PER_MINUTE);
  const s = Math.floor((diff % MS_PER_MINUTE) / MS_PER_SECOND);
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
 * starts ticking on the client to avoid a hydration mismatch. With no
 * date (or a past one) it shows the "announced soon" line instead of a
 * misleading zeroed timer or "Live Now".
 */
export function Countdown({ targetIso }: Props): React.ReactElement {
  const [r, setR] = useState<Remaining>({
    d: "--",
    h: "--",
    m: "--",
    s: "--",
    expired: false,
  });

  useEffect(() => {
    const tick = (): void => setR(computeRemaining(targetIso));
    // First tick runs on the next task (not during the effect) to avoid a
    // cascading render; the interval keeps it live after that.
    const first = window.setTimeout(tick, 0);
    const id = window.setInterval(tick, MS_PER_SECOND);
    return () => {
      window.clearTimeout(first);
      window.clearInterval(id);
    };
  }, [targetIso]);

  if (r.expired) {
    return (
      <div className="font-heading text-[clamp(18px,2vw,28px)] font-bold tracking-[-0.02em]">
        {countdownCopy.pending}
      </div>
    );
  }

  return (
    <div className="mt-5 flex items-start gap-4">
      <Unit num={r.d} label={countdownCopy.units.d} />
      <Sep />
      <Unit num={r.h} label={countdownCopy.units.h} />
      <Sep />
      <Unit num={r.m} label={countdownCopy.units.m} />
      <Sep />
      <Unit num={r.s} label={countdownCopy.units.s} />
    </div>
  );
}

function Unit({ num, label }: { num: string; label: string }): React.ReactElement {
  return (
    <div className="text-center">
      <div
        style={{
          fontFamily: "var(--font-heading)",
          fontSize: "clamp(28px, 3.5vw, 48px)",
          fontWeight: 700,
          letterSpacing: "-0.03em",
          lineHeight: 1,
          color: "var(--color-fg)",
        }}
      >
        {num}
      </div>
      <div
        className="uppercase"
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "10px",
          letterSpacing: "0.2em",
          color: "var(--color-fg-muted)",
          marginTop: "4px",
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
        fontFamily: "var(--font-heading)",
        fontSize: "32px",
        lineHeight: 1.4,
        color: "var(--color-fg-muted)",
      }}
    >
      :
    </span>
  );
}
