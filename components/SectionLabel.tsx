/**
 * Small uppercase eyebrow label with a leading hairline dash.
 * Used as the section meta-tag throughout the site.
 */
export function SectionLabel({ children }: { children: React.ReactNode }): React.ReactElement {
  return (
    <p
      className="mb-5 flex items-center gap-3 uppercase"
      style={{
        fontFamily: "var(--font-body)",
        fontSize: "11px",
        letterSpacing: "0.3em",
        color: "var(--color-green)",
      }}
    >
      <span
        aria-hidden="true"
        className="inline-block h-px w-6"
        style={{ background: "var(--color-green)" }}
      />
      {children}
    </p>
  );
}
