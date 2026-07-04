import { brainrots, formatValue, getDemandLabel, getTierGroups } from "@/lib/data";

export function TierBoard() {
  const rankedItems = brainrots.filter((item) => item.value > 0);
  const groups = getTierGroups(rankedItems);

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
