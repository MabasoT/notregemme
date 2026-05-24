import { orderNoticeCopy } from "@/lib/content";
import { whatsappOrderLink } from "@/lib/site-config";

type Props = {
  variant: "homme" | "femme";
};

/**
 * Inline banner above each collection grid reminding users that orders
 * route through WhatsApp. Pre-fills the WhatsApp message with collection
 * context so the brand sees which grid the click originated from.
 */
export function OrderNotice({ variant }: Props): React.ReactElement {
  const message =
    variant === "homme"
      ? "Hi Notre Gemme! I'd like to order from the Homme collection."
      : "Hi Notre Gemme! I'd like to order from the Femme collection.";

  return (
    <div
      className="reveal mb-8 flex flex-wrap items-center justify-between gap-5 rounded-card px-7 py-5"
      style={{
        background:
          "linear-gradient(135deg, oklch(18% 0.06 128 / 0.5), oklch(12% 0.04 130 / 0.3))",
        border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: "var(--radius-card)",
      }}
    >
      <div className="flex items-center gap-[14px]">
        <span
          aria-hidden="true"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-xl"
          style={{ background: "var(--color-whatsapp)" }}
        >
          💬
        </span>
        <div>
          <div
            className="font-semibold"
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "14px",
              color: "var(--color-fg)",
            }}
          >
            {orderNoticeCopy.body}
          </div>
          <div
            className="mt-[3px]"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "12px",
              color: "var(--color-fg-muted)",
            }}
          >
            {variant === "homme" ? orderNoticeCopy.homme : orderNoticeCopy.femme}
          </div>
        </div>
      </div>
      <a
        href={whatsappOrderLink(message)}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-whatsapp"
      >
        <span aria-hidden="true">💬</span>
        {orderNoticeCopy.cta}
      </a>
    </div>
  );
}
