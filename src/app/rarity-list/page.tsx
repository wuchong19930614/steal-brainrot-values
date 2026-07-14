import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { RarityExplorer } from "@/components/RarityExplorer";
import { lastUpdated } from "@/lib/data";
import { absoluteUrl, createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Steal a Brainrot Rarity List - Tracked Brainrots",
  description:
    "Browse source-labeled Steal a Brainrot items by rarity and compare verified Default marketplace asking prices in USD.",
  path: "/rarity-list/",
});

export default function RarityListPage() {
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
              name: "Rarity List",
              item: absoluteUrl("/rarity-list/"),
            },
          ],
        }}
      />

      <section className="page-intro">
        <div>
          <p className="eyebrow">Updated {lastUpdated}</p>
          <h1>Steal a Brainrot rarity list</h1>
          <p>
            Browse tracked Brainrots by rarity group, then open each item to
            review its source and marketplace asking-price status.
          </p>
        </div>
        <div className="intro-link-stack">
          <Link
            href="/"
            data-analytics-event="related_tool_clicked"
            data-analytics-label="values"
            data-analytics-location="rarity_intro"
          >
            Value list
          </Link>
          <Link
            href="/trading-values/"
            data-analytics-event="related_tool_clicked"
            data-analytics-label="trading-values"
            data-analytics-location="rarity_intro"
          >
            Trading values
          </Link>
        </div>
      </section>

      <RarityExplorer />
    </>
  );
}
