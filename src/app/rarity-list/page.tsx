import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { RarityExplorer } from "@/components/RarityExplorer";
import {
  brainrots,
  formatTradeValue,
  getRarityGroups,
  lastUpdated,
} from "@/lib/data";
import { absoluteUrl, createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Steal a Brainrot Rarity List - Tracked Brainrots",
  description:
    "Browse source-labeled Steal a Brainrot items across Limited, Secret, Mythic, Legendary, Epic, Rare, and Common tiers with verified USD market prices.",
  path: "/rarity-list/",
});

export default function RarityListPage() {
  const rarityGroups = getRarityGroups();
  const orderedRarityItems = rarityGroups.flatMap((group) => group.items);

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
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Steal a Brainrot rarity list",
          numberOfItems: orderedRarityItems.length,
          itemListElement: orderedRarityItems.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: `${item.name} (${item.rarity})`,
            url: absoluteUrl(`/trading-values/#${item.slug}`),
            description: `${item.rarity} Brainrot (${formatTradeValue(item)}). ${item.notes}`,
          })),
        }}
      />

      <section className="page-intro">
        <div>
          <p className="eyebrow">Updated {lastUpdated}</p>
          <h1>Steal a Brainrot rarity list</h1>
          <p>
            Browse {brainrots.length} tracked Brainrots across{" "}
            {rarityGroups.length} rarity groups, then open each item to review
            its Default base income, source, and marketplace asking-price
            status.
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

      <section className="content-band">
        <div>
          <h2>How rarity relates to market value</h2>
          <p>
            In-game rarity tiers range from Common, Rare, Epic, Legendary, and
            Mythic up to Secret and Limited DLC releases. Only Secret Default
            items currently meet the two-source liquidity and 15% spread rules
            required for verified USD marketplace asking prices; lower-tier
            in-game cash costs and single-source listings remain labeled TBD.
          </p>
        </div>
        <div>
          <h2>Compare verified items</h2>
          <div className="link-grid">
            <Link
              href="/calculator/"
              data-analytics-event="related_tool_clicked"
              data-analytics-label="calculator"
              data-analytics-location="rarity_related_tools"
            >
              Trade calculator
            </Link>
            <Link
              href="/tier-list/"
              data-analytics-event="related_tool_clicked"
              data-analytics-label="tier-list"
              data-analytics-location="rarity_related_tools"
            >
              Market price tier list
            </Link>
            <Link
              href="/trading-values/"
              data-analytics-event="related_tool_clicked"
              data-analytics-label="trading-values"
              data-analytics-location="rarity_related_tools"
            >
              Trading value status
            </Link>
            <Link
              href="/methodology/"
              data-analytics-event="related_tool_clicked"
              data-analytics-label="methodology"
              data-analytics-location="rarity_related_tools"
            >
              Verification methodology
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
