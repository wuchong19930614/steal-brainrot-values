"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { trackEvent } from "@/lib/analytics";
import {
  formatTradeValue,
  isVerifiedTradeValue,
  rarityOrder,
} from "@/lib/data";
import type { BrainrotItem, Rarity, Tier } from "@/lib/types";

type ValueTableProps = {
  items: BrainrotItem[];
};

type SortKey = "value" | "value-asc" | "name" | "rarity" | "updated";
type StatusFilter = "All" | "Verified" | "TBD";
type TierFilter = "All" | Tier | "Unranked";

const obtainableOptions = ["All", "Obtainable", "Unobtainable"] as const;
type ObtainableFilter = (typeof obtainableOptions)[number];
const searchSettleDelayMs = 1000;

function getComparableValue(item: BrainrotItem) {
  return isVerifiedTradeValue(item) ? item.value : 0;
}

export function ValueTable({ items }: ValueTableProps) {
  const [query, setQuery] = useState("");
  const [rarity, setRarity] = useState<Rarity | "All">("All");
  const [status, setStatus] = useState<StatusFilter>("All");
  const [tierFilter, setTierFilter] = useState<TierFilter>("All");
  const [obtainable, setObtainable] = useState<ObtainableFilter>("All");
  const [sort, setSort] = useState<SortKey>("value");
  const searchTrackingTimer = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );
  const lastTrackedQuery = useRef("");
  const pendingSearch = useRef("");

  useEffect(() => {
    return () => {
      flushPendingSearch();
    };
  }, []);

  const availableTiers = useMemo(() => {
    const tierSet = new Set<Tier>();
    for (const item of items) {
      if (isVerifiedTradeValue(item)) {
        tierSet.add(item.tier);
      }
    }
    return (["S", "A", "B", "C", "D"] as Tier[]).filter((t) =>
      tierSet.has(t),
    );
  }, [items]);

  const filteredItems = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return items
      .filter((item) => {
        const verified = isVerifiedTradeValue(item);
        const matchesQuery =
          normalizedQuery.length === 0 ||
          item.name.toLowerCase().includes(normalizedQuery) ||
          item.aliases.some((alias) =>
            alias.toLowerCase().includes(normalizedQuery),
          );

        const matchesRarity = rarity === "All" || item.rarity === rarity;
        const matchesStatus =
          status === "All" ||
          (status === "Verified" ? verified : !verified);
        const matchesTier =
          tierFilter === "All" ||
          (tierFilter === "Unranked"
            ? !verified
            : verified && item.tier === tierFilter);
        const matchesObtainable =
          obtainable === "All" ||
          (obtainable === "Obtainable" ? item.obtainable : !item.obtainable);

        return (
          matchesQuery &&
          matchesRarity &&
          matchesStatus &&
          matchesTier &&
          matchesObtainable
        );
      })
      .sort((a, b) => {
        if (sort === "name") {
          return a.name.localeCompare(b.name);
        }

        if (sort === "value-asc") {
          const aVerified = isVerifiedTradeValue(a);
          const bVerified = isVerifiedTradeValue(b);
          if (aVerified !== bVerified) {
            return aVerified ? -1 : 1;
          }
          return a.value - b.value || a.name.localeCompare(b.name);
        }

        if (sort === "rarity") {
          return (
            rarityOrder.indexOf(a.rarity) - rarityOrder.indexOf(b.rarity) ||
            getComparableValue(b) - getComparableValue(a) ||
            a.name.localeCompare(b.name)
          );
        }

        if (sort === "updated") {
          return (
            b.lastUpdated.localeCompare(a.lastUpdated) ||
            getComparableValue(b) - getComparableValue(a) ||
            a.name.localeCompare(b.name)
          );
        }

        return (
          getComparableValue(b) - getComparableValue(a) ||
          a.name.localeCompare(b.name)
        );
      });
  }, [items, obtainable, query, rarity, sort, status, tierFilter]);

  function handleSearchChange(value: string) {
    const normalizedValue = value.trim().toLowerCase();

    setQuery(value);

    clearSearchTrackingTimer();
    pendingSearch.current = "";

    if (normalizedValue.length === 0) {
      lastTrackedQuery.current = "";
      return;
    }

    if (
      normalizedValue.length < 2 ||
      normalizedValue === lastTrackedQuery.current
    ) {
      return;
    }

    pendingSearch.current = normalizedValue;
    searchTrackingTimer.current = setTimeout(() => {
      trackSearch(normalizedValue);
      searchTrackingTimer.current = null;
    }, searchSettleDelayMs);
  }

  function clearSearchTrackingTimer() {
    if (!searchTrackingTimer.current) {
      return;
    }

    clearTimeout(searchTrackingTimer.current);
    searchTrackingTimer.current = null;
  }

  function trackSearch(value: string) {
    const normalizedValue = value.trim().toLowerCase();

    if (
      normalizedValue.length < 2 ||
      normalizedValue === lastTrackedQuery.current
    ) {
      return;
    }

    // Record once per distinct settled search term.
    lastTrackedQuery.current = normalizedValue;
    pendingSearch.current = "";
    trackEvent("item_search_used", {
      items_total: items.length,
      search_length: normalizedValue.length,
    });
  }

  function flushPendingSearch(value = pendingSearch.current) {
    clearSearchTrackingTimer();
    trackSearch(value);
  }

  function trackFilter(filterName: string, filterValue: string | number) {
    trackEvent("filter_used", {
      filter_name: filterName,
      filter_value: String(filterValue),
    });
  }

  function resetFilters() {
    flushPendingSearch(query);

    setQuery("");
    setRarity("All");
    setStatus("All");
    setTierFilter("All");
    setObtainable("All");
    setSort("value");
    lastTrackedQuery.current = "";
    pendingSearch.current = "";
    trackFilter("all", "reset");
  }

  return (
    <section className="tool-panel" aria-labelledby="values-table-title">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">Source-tracked catalog</p>
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
            onBlur={(event) => flushPendingSearch(event.currentTarget.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                flushPendingSearch(event.currentTarget.value);
              }
            }}
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
          <span>Value status</span>
          <select
            value={status}
            onChange={(event) => {
              setStatus(event.target.value as StatusFilter);
              trackFilter("status", event.target.value);
            }}
          >
            <option value="All">All statuses</option>
            <option value="Verified">Verified USD</option>
            <option value="TBD">TBD only</option>
          </select>
        </label>
        <label>
          <span>Price tier</span>
          <select
            value={tierFilter}
            onChange={(event) => {
              setTierFilter(event.target.value as TierFilter);
              trackFilter("tier", event.target.value);
            }}
          >
            <option value="All">All tiers</option>
            {availableTiers.map((tierOption) => (
              <option key={tierOption} value={tierOption}>
                Tier {tierOption}
              </option>
            ))}
            <option value="Unranked">Unranked (TBD)</option>
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
            <option value="value-asc">Lowest verified value</option>
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
                <h3>
                  <Link
                    href={`/brainrots/${item.slug}/`}
                    data-analytics-event="related_tool_clicked"
                    data-analytics-label={item.slug}
                    data-analytics-location="value_table_item"
                  >
                    {item.name}
                  </Link>
                </h3>
                <p>{item.notes}</p>
                <div className="source-links">
                  {isVerifiedTradeValue(item) ? (
                    <Link
                      className="source-link"
                      href={`/calculator/?add=${item.slug}`}
                      data-analytics-event="related_tool_clicked"
                      data-analytics-label={item.slug}
                      data-analytics-location="value_table_compare"
                    >
                      Compare in calculator
                    </Link>
                  ) : null}
                  <a
                    className="source-link"
                    href={item.sourceUrl}
                    rel="noreferrer"
                    target="_blank"
                    data-analytics-event={
                      item.sourceUrl.includes("roblox.com") ||
                      item.sourceUrl.includes("playsab.com")
                        ? "official_source_clicked"
                        : "community_source_clicked"
                    }
                    data-analytics-label={item.slug}
                    data-analytics-location="value_table"
                  >
                    {item.sourceLabel}
                  </a>
                  {item.additionalSources?.map((source) => (
                    <a
                      className="source-link"
                      href={source.url}
                      key={source.url}
                      rel="noreferrer"
                      target="_blank"
                      data-analytics-event="community_source_clicked"
                      data-analytics-label={`${item.slug}:${source.label}`}
                      data-analytics-location="value_table_cross_check"
                    >
                      Cross-check: {source.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
            <div className="item-meta">
              <span className={`pill rarity rarity-${item.rarity.toLowerCase()}`}>
                {item.rarity}
              </span>
              {item.baseIncomeText ? (
                <span className="pill demand">{item.baseIncomeText}</span>
              ) : null}
              <span
                className={`pill ${
                  isVerifiedTradeValue(item) ? "verified-value" : "trend-unknown"
                }`}
              >
                {isVerifiedTradeValue(item) ? `Tier ${item.tier}` : "Unranked"}
              </span>
              <span className="pill demand">
                {item.obtainable ? "Obtainable" : "Unobtainable"}
              </span>
            </div>
            <div className="item-value">
              <strong>{formatTradeValue(item)}</strong>
              <span>
                {item.valueSourceType === "verified-marketplace"
                  ? "Default marketplace asking price"
                  : "trade value status"}
              </span>
            </div>
          </article>
        ))}
      </div>

      {filteredItems.length === 0 ? (
        <div className="empty-state no-results">
          <strong>No matching Brainrots found.</strong>
          <p>
            This tracker lists official and clearly labeled community-catalog
            items. Searched items that are not shown are still unverified, not
            hidden trade values.
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
