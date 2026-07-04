import type { BrainrotItem } from "@/lib/types";
import { getDemandLabel } from "@/lib/data";

type ItemPillsProps = {
  item: BrainrotItem;
};

export function ItemPills({ item }: ItemPillsProps) {
  return (
    <div className="pill-row" aria-label={`${item.name} attributes`}>
      <span className={`pill rarity rarity-${item.rarity.toLowerCase()}`}>
        {item.rarity}
      </span>
      <span className={`pill trend trend-${item.trend.toLowerCase()}`}>
        {item.trend}
      </span>
      <span className="pill demand">Demand {getDemandLabel(item.demand)}</span>
    </div>
  );
}

