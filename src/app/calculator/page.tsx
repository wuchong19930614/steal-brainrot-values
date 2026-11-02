import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { TradeCalculator } from "@/components/TradeCalculator";
import { brainrots, lastUpdated } from "@/lib/data";
import { absoluteUrl, createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Steal a Brainrot Calculator - Compare USD Market Prices",
  description:
    "Compare source-verified Default Steal a Brainrot marketplace asking prices in USD across two offers.",
  path: "/calculator/",
});

export default function CalculatorPage() {
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
              name: "Calculator",
              item: absoluteUrl("/calculator/"),
            },
          ],
        }}
      />

      <section className="page-intro">
        <div>
          <p className="eyebrow">Updated {lastUpdated}</p>
          <h1>Steal a Brainrot calculator</h1>
          <p>
            Compare two groups of Default Brainrots using source-balanced USD
            asking prices from StarPets and Eldorado. Results are market-price
            comparisons, not official trade-value guarantees.
          </p>
        </div>
        <div className="intro-link-stack">
          <Link
            href="/trading-values/"
            data-analytics-event="related_tool_clicked"
            data-analytics-label="trading-values"
            data-analytics-location="calculator_intro"
          >
            Review price evidence
          </Link>
          <Link
            href="/"
            data-analytics-event="related_tool_clicked"
            data-analytics-label="values"
            data-analytics-location="calculator_intro"
          >
            Value list
          </Link>
        </div>
      </section>

      <TradeCalculator items={brainrots} />

      <section className="content-band">
        <div>
          <h2>How calculator prices work</h2>
          <p>
            Each selectable item uses the rounded mean of its current StarPets
            Default catalog price and eligible Eldorado Default listing median
            when both sources have at least three records, three distinct
            Eldorado sellers, an exact base M/s match, and no more than 15%
            spread. Unverified or single-source items stay excluded.
          </p>
        </div>
        <div>
          <h2>Related trade tools</h2>
          <div className="link-grid">
            <Link
              href="/tier-list/"
              data-analytics-event="related_tool_clicked"
              data-analytics-label="tier-list"
              data-analytics-location="calculator_related_tools"
            >
              Market price tier list
            </Link>
            <Link
              href="/rarity-list/"
              data-analytics-event="related_tool_clicked"
              data-analytics-label="rarity-list"
              data-analytics-location="calculator_related_tools"
            >
              Brainrot rarity list
            </Link>
            <Link
              href="/trading-values/"
              data-analytics-event="related_tool_clicked"
              data-analytics-label="trading-values"
              data-analytics-location="calculator_related_tools"
            >
              Trading value status
            </Link>
            <Link
              href="/methodology/"
              data-analytics-event="related_tool_clicked"
              data-analytics-label="methodology"
              data-analytics-location="calculator_related_tools"
            >
              Verification methodology
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
