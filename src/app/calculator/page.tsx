import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { TradeCalculator } from "@/components/TradeCalculator";
import { brainrots, lastUpdated } from "@/lib/data";
import { absoluteUrl, createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Steal a Brainrot Calculator - Verification Status",
  description:
    "Check Steal a Brainrot calculator availability, review source-labeled value candidates, and see why trade results remain blocked until values are verified.",
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
            The calculator will turn on after official or manually verified
            trade values are added to the data source.
          </p>
        </div>
        <div className="intro-link-stack">
          <Link
            href="/trading-values/"
            data-analytics-event="related_tool_clicked"
            data-analytics-label="trading-values"
            data-analytics-location="calculator_intro"
          >
            Review value candidates
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
    </>
  );
}
