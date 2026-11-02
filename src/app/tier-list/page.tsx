import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { TierBoard } from "@/components/TierBoard";
import {
  formatValue,
  getVerifiedTradeValueItems,
  lastUpdated,
} from "@/lib/data";
import { absoluteUrl, createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Steal a Brainrot Tier List - Best Brainrots Ranked by Price & M/s",
  description:
    "See the best Default Steal a Brainrot items ranked from S to D tier by verified USD marketplace asking price, Default M/s base income, and value per dollar.",
  path: "/tier-list/",
});

export default function TierListPage() {
  const rankedItems = [...getVerifiedTradeValueItems()].sort(
    (a, b) => b.value - a.value,
  );

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
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Steal a Brainrot Default market price tier list",
          numberOfItems: rankedItems.length,
          itemListElement: rankedItems.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: `${item.name} (Tier ${item.tier})`,
            url: absoluteUrl(`/brainrots/${item.slug}/`),
            description: `Tier ${item.tier} Default Secret Brainrot (${formatValue(item.value)}). ${item.notes}`,
          })),
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
            href="/calculator/"
            data-analytics-event="related_tool_clicked"
            data-analytics-label="calculator"
            data-analytics-location="tier_intro"
          >
            Calculator
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

      <section className="content-band">
        <div>
          <h2>Ranking method</h2>
          <p>
            S is $8+, A is $4–$7.99, B is $1–$3.99, C is $0.50–$0.99, and D is
            below $0.50. Only Default items that pass the two-source listing,
            seller-count, M/s-match, and 15% source-price-spread checks enter the
            board. Demand stays Unknown and does not affect tiers yet.
          </p>
        </div>
        <div>
          <h2>Related trade tools</h2>
          <div className="link-grid">
            <Link
              href="/calculator/"
              data-analytics-event="related_tool_clicked"
              data-analytics-label="calculator"
              data-analytics-location="tier_related_tools"
            >
              Trade calculator
            </Link>
            <Link
              href="/rarity-list/"
              data-analytics-event="related_tool_clicked"
              data-analytics-label="rarity-list"
              data-analytics-location="tier_related_tools"
            >
              Rarity list
            </Link>
            <Link
              href="/trading-values/"
              data-analytics-event="related_tool_clicked"
              data-analytics-label="trading-values"
              data-analytics-location="tier_related_tools"
            >
              Trading value status
            </Link>
            <Link
              href="/methodology/"
              data-analytics-event="related_tool_clicked"
              data-analytics-label="methodology"
              data-analytics-location="tier_related_tools"
            >
              Verification methodology
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
