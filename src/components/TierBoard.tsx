"use client";

import { useMemo, useState } from "react";
import {
  brainrots,
  formatValue,
  getDemandLabel,
  getTierGroups,
  rarityOrder,
} from "@/lib/data";

type SortKey = "value" | "demand" | "rarity";

const sortOptions: Array<{ key: SortKey; label: string }> = [
  { key: "value", label: "Highest value" },
  { key: "demand", label: "Highest demand" },
  { key: "rarity", label: "Rarity" },
];

export function TierBoard() {
  const [sort, setSort] = useState<SortKey>("value");

  const rankedItems = useMemo(
    () => brainrots.filter((item) => item.value > 0),
    [],
  );

  const groups = useMemo(
    () =>
      getTierGroups(rankedItems).map((group) => ({
        tier: group.tier,
        items: [...group.items].sort((a, b) => {
          if (sort === "demand") {
            return b.demand - a.demand || b.value - a.value;
          }

          if (sort === "rarity") {
            return (
              rarityOrder.indexOf(a.rarity) - rarityOrder.indexOf(b.rarity) ||
              b.value - a.value
            );
          }

          return b.value - a.value;
        }),
      })),
    [rankedItems, sort],
  );

  if (rankedItems.length === 0) {
    return (
      <section className="tier-board empty-tier-board" aria-label="Steal a Brainrot tier list">
        <div className="empty-state">
          Official public sources do not currently publish Steal a Brainrot
          trade values, so the tier list is disabled until verified values are
          added.
        </div>
      </section>
    );
  }

  return (
    <section className="tier-board" aria-label="Steal a Brainrot tier list">
      <div className="tier-board-toolbar">
        <label>
          <span>Sort within tier</span>
          <select
            value={sort}
            onChange={(event) => setSort(event.target.value as SortKey)}
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
            {group.items.map((item) => (
              <article className="tier-item" key={item.id}>
                <strong>{item.name}</strong>
                <span>{formatValue(item.value)}</span>
                <small>Demand {getDemandLabel(item.demand)}</small>
              </article>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
