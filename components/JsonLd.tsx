/**
 * JsonLd — tiny helper that injects a <script type="application/ld+json">
 * block into the page <head>. Use it in any page or layout component.
 *
 * Usage:
 *   <JsonLd data={{ "@context": "https://schema.org", "@type": "Organization", ... }} />
 */
export function JsonLd({ data }: { data: Record<string, unknown> }): React.ReactElement {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
