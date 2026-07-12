import type { CommunityEstimateCandidate } from "@/lib/types";

type CommunityEstimateCandidatesProps = {
  candidates: CommunityEstimateCandidate[];
};

export function CommunityEstimateCandidates({
  candidates,
}: CommunityEstimateCandidatesProps) {
  return (
    <section className="tool-panel" aria-labelledby="community-estimates-title">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">Research queue</p>
          <h2 id="community-estimates-title">Community estimate candidates</h2>
        </div>
        <span className="result-count">{candidates.length} candidates</span>
      </div>
      <p>
        These are single-source community reference values, not verified trade
        values. Their source uses La Vacca Saturno Saturnita as its reference
        unit and was published on March 1, 2026. They are not used by the
        calculator or tier list.
      </p>
      <div className="table-wrap">
        <table className="status-table">
          <caption className="sr-only">
            Unverified community trade-value candidates
          </caption>
          <thead>
            <tr>
              <th scope="col">Item</th>
              <th scope="col">Reference value</th>
              <th scope="col">Unit</th>
              <th scope="col">Source</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {candidates.map((candidate) => (
              <tr key={candidate.itemId}>
                <th scope="row">{candidate.itemName}</th>
                <td>{candidate.referenceValue}</td>
                <td>{candidate.unitLabel}</td>
                <td>
                  <a
                    className="source-link"
                    href={candidate.sourceUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {candidate.sourceLabel}
                  </a>
                  <p>Published {candidate.sourcePublishedAt}</p>
                </td>
                <td>
                  <span className="pill trend-unknown">{candidate.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
