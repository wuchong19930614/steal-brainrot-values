import { formatValue, getRarityGroups } from "@/lib/data";

export function RarityExplorer() {
  const groups = getRarityGroups();

  return (
    <section className="rarity-grid" aria-label="Steal a Brainrot rarity list">
      {groups.map((group) => {
        const values = group.items
          .map((item) => item.value)
          .filter((value) => value > 0);
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
                  <span>{item.name}</span>
                  <strong>{formatValue(item.value)}</strong>
                </li>
              ))}
            </ul>
          </article>
        );
      })}
    </section>
  );
}
