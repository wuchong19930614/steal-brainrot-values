"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { trackEvent } from "@/lib/analytics";
import {
  brainrots,
  formatMpsPerDollar,
  formatValue,
  getTierGroups,
  getVerifiedTradeValueItems,
} from "@/lib/data";

type SortKey = "value" | "value-asc" | "income" | "value-efficiency" | "name";

const sortOptions: Array<{ key: SortKey; label: string }> = [
  { key: "value", label: "Highest price" },
  { key: "value-asc", label: "Lowest price" },
  { key: "income", label: "Highest base income (M/s)" },
  { key: "value-efficiency", label: "Best M/s per $1" },
  { key: "name", label: "Name A-Z" },
];

export function TierBoard() {
  const [sort, setSort] = useState<SortKey>("value");

  const rankedItems = useMemo(
    () => getVerifiedTradeValueItems(brainrots),
    [],
  );

  const groups = useMemo(
    () =>
      getTierGroups(rankedItems)
        .map((group) => ({
          tier: group.tier,
          items: [...group.items].sort((a, b) => {
            if (sort === "value-asc") {
              return a.value - b.value || a.name.localeCompare(b.name);
            }

            if (sort === "income") {
              const incomeDiff =
                (b.baseIncomeMps ?? 0) - (a.baseIncomeMps ?? 0);
              return incomeDiff || b.value - a.value;
            }

            if (sort === "value-efficiency") {
              const aRatio = a.value > 0 ? (a.baseIncomeMps ?? 0) / a.value : 0;
              const bRatio = b.value > 0 ? (b.baseIncomeMps ?? 0) / b.value : 0;
              return bRatio - aRatio || b.value - a.value;
            }

            if (sort === "name") {
              return a.name.localeCompare(b.name);
            }

            return b.value - a.value || a.name.localeCompare(b.name);
          }),
        }))
        .filter((group) => group.items.length > 0),
    [rankedItems, sort],
  );

  if (rankedItems.length === 0) {
    return (
      <section className="tier-board empty-tier-board" aria-label="Steal a Brainrot tier list">
        <div className="empty-state">
          The tier list needs independently cross-checked, unit-compatible
          marketplace prices before items can be ranked.
        </div>
      </section>
    );
  }

  return (
    <section className="tier-board" aria-label="Steal a Brainrot tier list">
      <div className="tier-board-toolbar">
        <p>
          Relative tiers use the current Default marketplace asking price in
          USD. Click any item to inspect its two-source verification record.
        </p>
        <label>
          <span>Sort within tier</span>
          <select
            value={sort}
            onChange={(event) => {
              const nextSort = event.target.value as SortKey;
              setSort(nextSort);
              trackEvent("filter_used", {
                filter_name: "tier_sort",
                filter_value: nextSort,
              });
            }}
          >
            {sortOptions.map((option) => (
              <option key={option.key} value={option.key}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </div>
      {groups.map((group) => (
        <div className="tier-row" key={group.tier}>
          <div className={`tier-label tier-${group.tier.toLowerCase()}`}>
            {group.tier}
          </div>
          <div className="tier-items">
            {group.items.map((item) => {
              const mps = item.baseIncomeMps ?? 0;
              return (
                <Link
                  href={`/brainrots/${item.slug}/`}
                  className="tier-item"
                  key={item.id}
                  data-analytics-event="related_tool_clicked"
                  data-analytics-label={item.slug}
                  data-analytics-location="tier_board_item"
                >
                  <strong>{item.name}</strong>
                  <span>{formatValue(item.value)}</span>
                  <small>
                    {mps > 0
                      ? `${mps}M/s · ${formatMpsPerDollar(mps, item.value)}`
                      : `${item.rarity} Default`}
                  </small>
                </Link>
              );
            })}
          </div>
        </div>
      ))}
    </section>
  );
}
