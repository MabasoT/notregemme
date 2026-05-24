import { marqueeWords } from "@/lib/content";

/**
 * Edge-to-edge marquee ticker — 28s linear infinite loop with ♦ gem
 * separators (CSS clip-path). Words are repeated server-side to fill
 * the visible viewport and the loop offset (-50%) gives a seamless wrap.
 */
export function Marquee(): React.ReactElement {
  const repeats = 4;
  const items = Array.from({ length: repeats }).flatMap((_, r) =>
    marqueeWords.map((word, i) => ({ word, key: `${r}-${i}` })),
  );

  return (
    <div
      className="overflow-hidden py-[18px]"
      style={{
        background: "var(--color-bg-2)",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div className="animate-marquee flex w-max whitespace-nowrap">
        {items.map(({ word, key }) => (
          <span
            key={key}
            className="flex items-center gap-[18px] px-9 uppercase"
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: "0.25em",
              color: "var(--color-fg-muted)",
            }}
          >
            <span
              aria-hidden="true"
              className="diamond-clip block h-2 w-2 shrink-0"
              style={{ background: "var(--color-green)" }}
            />
            {word}
          </span>
        ))}
      </div>
    </div>
  );
}
