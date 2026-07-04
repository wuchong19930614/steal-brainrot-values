import { formatValue, updates } from "@/lib/data";

export function UpdateTimeline() {
  return (
    <section className="update-timeline" aria-label="Value update timeline">
      {updates.map((update) => (
        <article className="update-card" key={update.id}>
          <div className="update-heading">
            <time dateTime={update.date}>{update.date}</time>
            <h2>{update.title}</h2>
            <p>{update.summary}</p>
          </div>
          <div className="change-list">
            {update.changes.map((change, index) => (
              <div className="change-row" key={`${update.id}-${index}`}>
                <span className="pill demand">{change.type}</span>
                <strong>{change.item}</strong>
                <span>
                  {typeof change.previousValue === "number"
                    ? `${formatValue(change.previousValue)} -> `
                    : ""}
                  {typeof change.newValue === "number"
                    ? formatValue(change.newValue)
                    : change.note}
                </span>
              </div>
            ))}
          </div>
        </article>
      ))}
    </section>
  );
}
