import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { TierBoard } from "@/components/TierBoard";
import { lastUpdated } from "@/lib/data";
import { absoluteUrl, createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Steal a Brainrot Tier List - Default Market Price Tiers",
  description:
    "Compare ten Default Steal a Brainrot items by independently verified USD marketplace asking-price tiers.",
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
            This list ranks verified Default variants by source-balanced USD
            marketplace asking price. It does not claim an official or
            player-to-player trade value.
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
            S is $8+, A is $4–$7.99, B is $1–$3.99, C is $0.50–$0.99, and D is
            below $0.50. Only Default items that pass the two-source listing,
            seller-count, M/s-match, and 15% median-spread checks enter the
            board. Demand stays Unknown and does not affect tiers yet.
          </p>
        </div>
      </section>
    </>
  );
}
