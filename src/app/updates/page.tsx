import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { UpdateTimeline } from "@/components/UpdateTimeline";
import { lastUpdated } from "@/lib/data";
import { absoluteUrl, createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Steal a Brainrot Value Updates - Source Check Log",
  description:
    "Review the Steal a Brainrot source-check log, catalog additions, value verification decisions, and dated changes to the fan-made tracker.",
  path: "/updates/",
});

export default function UpdatesPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Values",
              item: absoluteUrl("/"),
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Updates",
              item: absoluteUrl("/updates/"),
            },
          ],
        }}
      />

      <section className="page-intro">
        <div>
          <p className="eyebrow">Updated {lastUpdated}</p>
          <h1>Steal a Brainrot value updates</h1>
          <p>
            Follow source checks, catalog additions, and value verification
            decisions from the source-tracked catalog.
          </p>
        </div>
        <div className="intro-link-stack">
          <Link
            href="/"
            data-analytics-event="related_tool_clicked"
            data-analytics-label="values"
            data-analytics-location="updates_intro"
          >
            Value list
          </Link>
          <Link
            href="/calculator/"
            data-analytics-event="related_tool_clicked"
            data-analytics-label="calculator"
            data-analytics-location="updates_intro"
          >
            Calculator
          </Link>
          <Link
            href="/trading-values/"
            data-analytics-event="related_tool_clicked"
            data-analytics-label="trading-values"
            data-analytics-location="updates_intro"
          >
            Trading values
          </Link>
        </div>
      </section>

      <UpdateTimeline />
    </>
  );
}
