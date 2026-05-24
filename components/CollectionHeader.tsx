import Link from "next/link";

type Props = {
  eyebrow: string;
  title: string;
  viewAllLabel?: string;
  viewAllHref?: string;
};

/**
 * Header row shared by Homme/Femme/Upcoming sections — section label +
 * title on the left, optional "View All" arrow link on the right.
 */
export function CollectionHeader({
  eyebrow,
  title,
  viewAllLabel,
  viewAllHref,
}: Props): React.ReactElement {
  return (
    <div className="reveal mb-[clamp(40px,5vw,64px)] flex flex-wrap items-end justify-between gap-6">
      <div>
        <p className="section-label">{eyebrow}</p>
        <h2 className="section-title">{title}</h2>
      </div>
      {viewAllLabel && viewAllHref ? (
        <Link
          href={viewAllHref}
          className="group inline-flex items-center gap-2.5 whitespace-nowrap uppercase transition-colors"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "12px",
            letterSpacing: "0.15em",
            color: "var(--color-fg-muted)",
          }}
        >
          <span className="transition-colors group-hover:text-fg">{viewAllLabel}</span>
          <span
            aria-hidden="true"
            className="inline-block transition-transform group-hover:translate-x-1"
          >
            →
          </span>
        </Link>
      ) : null}
    </div>
  );
}
