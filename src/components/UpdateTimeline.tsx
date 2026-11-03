import Link from "next/link";
import { brainrots, formatValue, updates } from "@/lib/data";

const brainrotByName = new Map(
  brainrots.map((item) => [item.name.toLowerCase(), item]),
);

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
            {update.changes.map((change, index) => {
              const matchedItem = brainrotByName.get(
                change.item.trim().toLowerCase(),
              );

              return (
                <div className="change-row" key={`${update.id}-${index}`}>
                  <span className="pill demand">{change.type}</span>
                  <strong>
                    {matchedItem ? (
                      <Link
                        href={`/brainrots/${matchedItem.slug}/`}
                        data-analytics-event="related_tool_clicked"
                        data-analytics-label={matchedItem.slug}
                        data-analytics-location="update_timeline_item"
                      >
                        {change.item}
                      </Link>
                    ) : (
                      change.item
                    )}
                  </strong>
                  <span>
                    {typeof change.previousValue === "number"
                      ? `${formatValue(change.previousValue)} -> `
                      : ""}
                    {typeof change.newValue === "number"
                      ? `${formatValue(change.newValue)}${
                          change.note ? ` — ${change.note}` : ""
                        }`
                      : change.note}
                  </span>
                </div>
              );
            })}
          </div>
        </article>
      ))}
    </section>
  );
}
