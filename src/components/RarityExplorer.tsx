import Link from "next/link";
import {
  formatTradeValue,
  formatValue,
  getRarityGroups,
  isVerifiedTradeValue,
} from "@/lib/data";

export function RarityExplorer() {
  const groups = getRarityGroups();

  return (
    <section className="rarity-grid" aria-label="Steal a Brainrot rarity list">
      {groups.map((group) => {
        const values = group.items
          .filter(isVerifiedTradeValue)
          .map((item) => item.value)
        const min = values.length ? Math.min(...values) : 0;
        const max = values.length ? Math.max(...values) : 0;

        return (
          <article className="rarity-card" key={group.rarity}>
            <div className="rarity-card-heading">
              <h2>{group.rarity}</h2>
              <span>{group.items.length} tracked</span>
            </div>
            <p>
              Range: <strong>{formatValue(min)}</strong> to{" "}
              <strong>{formatValue(max)}</strong>
            </p>
            <ul>
              {group.items.map((item) => (
                <li key={item.id}>
                  <Link
                    href={`/trading-values/#${item.slug}`}
                    data-analytics-event="related_tool_clicked"
                    data-analytics-label={item.slug}
                    data-analytics-location="rarity_item"
                  >
                    {item.name}
                  </Link>
                  <strong>{formatTradeValue(item)}</strong>
                </li>
              ))}
            </ul>
          </article>
        );
      })}
    </section>
  );
}
