import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { RarityExplorer } from "@/components/RarityExplorer";
import { lastUpdated } from "@/lib/data";
import { absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Steal a Brainrot Rarity List - All Brainrots by Rarity",
  description:
    "Browse officially sourced Steal a Brainrot items by rarity and see which trade values are still unpublished.",
  alternates: {
    canonical: absoluteUrl("/rarity-list/"),
  },
};

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
            Compare Brainrots by rarity group and value range before checking a
            trade.
          </p>
        </div>
        <div className="intro-link-stack">
          <Link href="/">Value list</Link>
          <Link href="/calculator/">Calculator</Link>
        </div>
      </section>

      <RarityExplorer />
    </>
  );
}
