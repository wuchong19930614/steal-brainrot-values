import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { TierBoard } from "@/components/TierBoard";
import { lastUpdated } from "@/lib/data";
import { absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Steal a Brainrot Tier List - Best Brainrots Ranked",
  description:
    "See the best Brainrots ranked by value, demand, rarity, and trading strength in a fan-made tier list.",
  alternates: {
    canonical: absoluteUrl("/tier-list/"),
  },
};

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
          <Link href="/">Value list</Link>
          <Link href="/calculator/">Calculator</Link>
        </div>
      </section>

      <TierBoard />

      <section className="content-band single">
        <div>
          <h2>Tier methodology</h2>
          <p>
            S tier items combine high value and high demand. A tier items are
            strong trades with less heat. Lower tiers are still useful for
            balancing offers, but they are easier to replace.
          </p>
        </div>
      </section>
    </>
  );
}
