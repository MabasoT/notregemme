import { shippingStripCopy } from "@/lib/content";

/**
 * Thin horizontal strip beneath the hero — short status items separated
 * by hairline pipes. Tone controls the leading dot colour (green / red).
 */
export function ShippingStrip(): React.ReactElement {
  return (
    <div
      className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 py-4"
      style={{
        background: "var(--color-bg-3)",
        borderBottom: "1px solid rgba(255,255,255,0.04)",
        paddingLeft: "var(--gutter)",
        paddingRight: "var(--gutter)",
      }}
    >
      {shippingStripCopy.map((item, idx) => (
        <span key={item.label} className="flex items-center gap-2 last:after:hidden">
          <span
            aria-hidden="true"
            className="block h-1.5 w-1.5 rounded-full"
            style={{
              background:
                item.tone === "red" ? "var(--color-red)" : "var(--color-green)",
            }}
          />
          <span
            className="uppercase"
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: "0.18em",
              color: "var(--color-fg-muted)",
            }}
          >
            {item.label}
          </span>
          {idx < shippingStripCopy.length - 1 ? (
            <span aria-hidden="true" className="ml-6 text-white/20">
              |
            </span>
          ) : null}
        </span>
      ))}
    </div>
  );
}
