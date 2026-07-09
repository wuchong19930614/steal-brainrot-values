"use client";

import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import { trackEvent } from "@/lib/analytics";
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

const demandLevels: Array<BrainrotItem["demand"]> = [1, 2, 3, 4, 5];

const obtainableOptions = ["All", "Obtainable", "Unobtainable"] as const;
type ObtainableFilter = (typeof obtainableOptions)[number];

export function ValueTable({ items }: ValueTableProps) {
  const [query, setQuery] = useState("");
  const [rarity, setRarity] = useState<Rarity | "All">("All");
  const [trend, setTrend] = useState<Trend | "All">("All");
  const [demand, setDemand] = useState<BrainrotItem["demand"] | "All">("All");
  const [obtainable, setObtainable] = useState<ObtainableFilter>("All");
  const [sort, setSort] = useState<SortKey>("value");
  const hasTrackedSearch = useRef(false);

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
        const matchesDemand = demand === "All" || item.demand === demand;
        const matchesObtainable =
          obtainable === "All" ||
          (obtainable === "Obtainable" ? item.obtainable : !item.obtainable);

        return (
          matchesQuery &&
          matchesRarity &&
          matchesTrend &&
          matchesDemand &&
          matchesObtainable
        );
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
  }, [demand, items, obtainable, query, rarity, sort, trend]);

  function handleSearchChange(value: string) {
    const normalizedValue = value.trim();

    setQuery(value);

    if (normalizedValue.length === 0) {
      hasTrackedSearch.current = false;
      return;
    }

    if (normalizedValue.length >= 2 && !hasTrackedSearch.current) {
      hasTrackedSearch.current = true;
      trackEvent("item_search_used", {
        items_total: items.length,
        search_length: normalizedValue.length,
      });
    }
  }

  function trackFilter(filterName: string, filterValue: string | number) {
    trackEvent("filter_used", {
      filter_name: filterName,
      filter_value: String(filterValue),
    });
  }

  function resetFilters() {
    setQuery("");
    setRarity("All");
    setTrend("All");
    setDemand("All");
    setObtainable("All");
    setSort("value");
    hasTrackedSearch.current = false;
    trackFilter("all", "reset");
  }

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
            onChange={(event) => handleSearchChange(event.target.value)}
            placeholder="Brainrot name"
          />
        </label>
        <label>
          <span>Rarity</span>
          <select
            value={rarity}
            onChange={(event) => {
              setRarity(event.target.value as Rarity | "All");
              trackFilter("rarity", event.target.value);
            }}
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
            onChange={(event) => {
              setTrend(event.target.value as Trend | "All");
              trackFilter("trend", event.target.value);
            }}
          >
            {trends.map((trendOption) => (
              <option key={trendOption} value={trendOption}>
                {trendOption === "All" ? "All trends" : trendOption}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span>Demand</span>
          <select
            value={demand}
            onChange={(event) => {
              setDemand(
                event.target.value === "All"
                  ? "All"
                  : (Number(event.target.value) as BrainrotItem["demand"]),
              );
              trackFilter("demand", event.target.value);
            }}
          >
            <option value="All">All demand</option>
            {demandLevels.map((level) => (
              <option key={level} value={level}>
                {getDemandLabel(level)}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span>Obtainable</span>
          <select
            value={obtainable}
            onChange={(event) => {
              setObtainable(event.target.value as ObtainableFilter);
              trackFilter("obtainable", event.target.value);
            }}
          >
            {obtainableOptions.map((option) => (
              <option key={option} value={option}>
                {option === "All" ? "All items" : option}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span>Sort</span>
          <select
            value={sort}
            onChange={(event) => {
              setSort(event.target.value as SortKey);
              trackFilter("sort", event.target.value);
            }}
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
          <article
            className="value-row"
            key={item.id}
            id={item.slug}
            role="listitem"
          >
            <div className="item-main">
              <div className="token-mark" aria-hidden="true">
                {item.name.slice(0, 2).toUpperCase()}
              </div>
              <div>
                <h3>{item.name}</h3>
                <p>{item.notes}</p>
                <a
                  className="source-link"
                  href={item.sourceUrl}
                  rel="noreferrer"
                  target="_blank"
                  data-analytics-event="official_source_clicked"
                  data-analytics-label={item.slug}
                  data-analytics-location="value_table"
                >
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
        <div className="empty-state no-results">
          <strong>No matching Brainrots found.</strong>
          <p>
            This tracker only lists official-source items right now. Searched
            items that are not shown are still unverified, not hidden trade
            values.
          </p>
          <div className="empty-actions">
            <button type="button" onClick={resetFilters}>
              Reset filters
            </button>
            <Link
              href="/updates/"
              className="secondary-link"
              data-analytics-event="related_tool_clicked"
              data-analytics-label="updates"
              data-analytics-location="value_table_no_results"
            >
              Latest updates
            </Link>
          </div>
        </div>
      ) : null}
    </section>
  );
}
