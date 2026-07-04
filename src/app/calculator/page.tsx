import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { TradeCalculator } from "@/components/TradeCalculator";
import { brainrots, lastUpdated } from "@/lib/data";
import { absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Steal a Brainrot Calculator - Check Fair Trades",
  description:
    "Compare Steal a Brainrot trades with a simple value calculator for fair, win, and loss trades.",
  alternates: {
    canonical: absoluteUrl("/calculator/"),
  },
};

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
          <Link href="/">Value list</Link>
          <Link href="/tier-list/">Tier list</Link>
        </div>
      </section>

      <TradeCalculator items={brainrots.filter((item) => item.value > 0)} />
    </>
  );
}
