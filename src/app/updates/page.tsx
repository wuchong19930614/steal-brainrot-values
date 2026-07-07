import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { UpdateTimeline } from "@/components/UpdateTimeline";
import { lastUpdated } from "@/lib/data";
import { absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Steal a Brainrot Value Updates - Latest Changes",
  description:
    "Track the latest Steal a Brainrot value changes, added Brainrots, demand shifts, and trading updates.",
  alternates: {
    canonical: absoluteUrl("/updates/"),
  },
  openGraph: {
    title: "Steal a Brainrot Value Updates - Latest Changes",
    description:
      "Track the latest Steal a Brainrot value changes, added Brainrots, demand shifts, and trading updates.",
    url: absoluteUrl("/updates/"),
  },
};

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
            Follow value changes, new tracked items, and demand shifts from the
            official-source tracker.
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
        </div>
      </section>

      <UpdateTimeline />
    </>
  );
}
