"use client";

import { useMemo, useState } from "react";
import { formatValue, getDemandLabel, rarityOrder } from "@/lib/data";
import type { BrainrotItem, Rarity, Trend } from "@/lib/types";

type ValueTableProps = {
  items: BrainrotItem[];
};

type SortKey = "value" | "name" | "demand" | "rarity" | "updated";

const trends: Array<Trend | "All"> = [
  "All",
  "Rising",
  "Stable",
  "Falling",
  "Unstable",
  "Unknown",
];

export function ValueTable({ items }: ValueTableProps) {
  const [query, setQuery] = useState("");
  const [rarity, setRarity] = useState<Rarity | "All">("All");
  const [trend, setTrend] = useState<Trend | "All">("All");
  const [sort, setSort] = useState<SortKey>("value");

  const filteredItems = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return items
      .filter((item) => {
        const matchesQuery =
          normalizedQuery.length === 0 ||
          item.name.toLowerCase().includes(normalizedQuery) ||
          item.aliases.some((alias) =>
            alias.toLowerCase().includes(normalizedQuery),
          );

        const matchesRarity = rarity === "All" || item.rarity === rarity;
        const matchesTrend = trend === "All" || item.trend === trend;

        return matchesQuery && matchesRarity && matchesTrend;
      })
      .sort((a, b) => {
        if (sort === "name") {
          return a.name.localeCompare(b.name);
        }

        if (sort === "demand") {
          return b.demand - a.demand || b.value - a.value;
        }

        if (sort === "rarity") {
          return (
            rarityOrder.indexOf(a.rarity) - rarityOrder.indexOf(b.rarity) ||
            b.value - a.value
          );
        }

        if (sort === "updated") {
          return b.lastUpdated.localeCompare(a.lastUpdated);
        }

        return b.value - a.value;
      });
  }, [items, query, rarity, sort, trend]);

  return (
    <section className="tool-panel" aria-labelledby="values-table-title">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">Official-source tracker</p>
          <h2 id="values-table-title">Steal a Brainrot values</h2>
        </div>
        <span className="result-count">{filteredItems.length} items</span>
      </div>

      <div className="toolbar" aria-label="Value table filters">
        <label>
          <span>Search</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Brainrot name"
          />
        </label>
        <label>
          <span>Rarity</span>
          <select
            value={rarity}
            onChange={(event) => setRarity(event.target.value as Rarity | "All")}
          >
            <option value="All">All rarities</option>
            {rarityOrder.map((rarityOption) => (
              <option key={rarityOption} value={rarityOption}>
                {rarityOption}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span>Trend</span>
          <select
            value={trend}
            onChange={(event) => setTrend(event.target.value as Trend | "All")}
          >
            {trends.map((trendOption) => (
              <option key={trendOption} value={trendOption}>
                {trendOption === "All" ? "All trends" : trendOption}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span>Sort</span>
          <select
            value={sort}
            onChange={(event) => setSort(event.target.value as SortKey)}
          >
            <option value="value">Highest value</option>
            <option value="demand">Highest demand</option>
            <option value="rarity">Rarity</option>
            <option value="updated">Newest update</option>
            <option value="name">Name A-Z</option>
          </select>
        </label>
      </div>

      <div className="value-list" role="list">
        {filteredItems.map((item) => (
          <article className="value-row" key={item.id} role="listitem">
            <div className="item-main">
              <div className="token-mark" aria-hidden="true">
                {item.name.slice(0, 2).toUpperCase()}
              </div>
              <div>
                <h3>{item.name}</h3>
                <p>{item.notes}</p>
                <a className="source-link" href={item.sourceUrl} rel="noreferrer" target="_blank">
                  {item.sourceLabel}
                </a>
              </div>
            </div>
            <div className="item-meta">
              <span className={`pill rarity rarity-${item.rarity.toLowerCase()}`}>
                {item.rarity}
              </span>
              <span className={`pill trend trend-${item.trend.toLowerCase()}`}>
                {item.trend}
              </span>
              <span className="pill demand">
                Demand {getDemandLabel(item.demand)}
              </span>
            </div>
            <div className="item-value">
              <strong>{formatValue(item.value)}</strong>
              <span>official value</span>
            </div>
          </article>
        ))}
      </div>

      {filteredItems.length === 0 ? (
        <div className="empty-state">No matching Brainrots found.</div>
      ) : null}
    </section>
  );
}
