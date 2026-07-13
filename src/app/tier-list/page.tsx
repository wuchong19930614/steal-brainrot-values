import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { TierBoard } from "@/components/TierBoard";
import { lastUpdated } from "@/lib/data";
import { absoluteUrl, createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Steal a Brainrot Tier List - Ranking Status & Method",
  description:
    "Review the Steal a Brainrot tier-list method, current ranking status, and the verified-value requirement used before any Brainrot receives a tier.",
  path: "/tier-list/",
});

export default function TierListPage() {
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
              name: "Tier List",
              item: absoluteUrl("/tier-list/"),
            },
          ],
        }}
      />

      <section className="page-intro">
        <div>
          <p className="eyebrow">Updated {lastUpdated}</p>
          <h1>Steal a Brainrot tier list</h1>
          <p>
            This page only ranks items when official or manually verified values
            exist. Current official sources do not publish a full value list.
          </p>
        </div>
        <div className="intro-link-stack">
          <Link
            href="/"
            data-analytics-event="related_tool_clicked"
            data-analytics-label="values"
            data-analytics-location="tier_intro"
          >
            Value list
          </Link>
          <Link
            href="/trading-values/"
            data-analytics-event="related_tool_clicked"
            data-analytics-label="trading-values"
            data-analytics-location="tier_intro"
          >
            Trading values
          </Link>
        </div>
      </section>

      <TierBoard />

      <section className="content-band single">
        <div>
          <h2>Ranking method</h2>
          <p>
            The tier list only ranks items with verified trade values. When it
            is enabled, tiers combine comparable value and demand evidence;
            items with missing or conflicting evidence remain unranked rather
            than receiving a guessed tier.
          </p>
        </div>
      </section>
    </>
  );
}
