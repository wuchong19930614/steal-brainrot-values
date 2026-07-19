import Link from "next/link";
import { CommunityEstimateCandidates } from "@/components/CommunityEstimateCandidates";
import { JsonLd } from "@/components/JsonLd";
import {
  brainrots,
  communityEstimateCandidates,
  formatValue,
  getVerifiedTradeValueItems,
  isVerifiedTradeValue,
  lastUpdated,
  minimumVerifiedTradeValues,
  officialSources,
} from "@/lib/data";
import { absoluteUrl, createPageMetadata } from "@/lib/seo";

const faqs = [
  {
    question: "Are Steal a Brainrot trading values official?",
    answer:
      "No. Official sources checked do not publish a complete trade value list. This page separately labels cross-checked USD marketplace asking prices so they are not mistaken for official values.",
  },
  {
    question: "Why are the trade values marked TBD?",
    answer:
      "TBD means an item does not yet have either an official value or a marketplace price that passed the two-source Default/M/s verification rule.",
  },
  {
    question: "When will the trade calculator turn on?",
    answer:
      `The calculator turns on when at least ${minimumVerifiedTradeValues} unit-compatible prices pass the two-source rule. The current ten-item Default snapshot meets that threshold.`,
  },
  {
    question: "Do community estimates turn on the calculator?",
    answer:
      "No. A single-source community estimate remains a research candidate. It cannot enter calculator totals or price tiers without a compatible second source and fresh review.",
  },
];

export const metadata = createPageMetadata({
  title: "Steal a Brainrot Trading Values & USD Market Prices",
  description:
    "Review Steal a Brainrot trading-value status and ten independently cross-checked Default marketplace asking prices in USD.",
  path: "/trading-values/",
});

export default function TradingValuesPage() {
  const verifiedValueItems = getVerifiedTradeValueItems();

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Values",
              item: absoluteUrl("/"),
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Trading Values",
              item: absoluteUrl("/trading-values/"),
            },
          ],
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Steal a Brainrot trading value status",
          numberOfItems: brainrots.length,
          itemListElement: brainrots.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.name,
            url: absoluteUrl(`/trading-values/#${item.slug}`),
            description:
              isVerifiedTradeValue(item)
                ? `Verified Default marketplace asking price: ${formatValue(item.value)}.`
                : "Item source is listed. Trade value is not publicly published.",
          })),
        }}
      />
      <section className="page-intro">
        <div>
          <p className="eyebrow">Last checked {lastUpdated}</p>
          <h1>Steal a Brainrot trading values</h1>
          <p>
            Check independently cross-checked Default marketplace prices,
            source dates, and which unverified trade estimates remain TBD.
          </p>
        </div>
        <div className="intro-link-stack">
          <Link
            href="/"
            data-analytics-event="related_tool_clicked"
            data-analytics-label="values"
            data-analytics-location="trading_values_intro"
          >
            Value list
          </Link>
          <Link
            href="/calculator/"
            data-analytics-event="related_tool_clicked"
            data-analytics-label="calculator"
            data-analytics-location="trading_values_intro"
          >
            Trade calculator
          </Link>
        </div>
      </section>

      <section className="content-band">
        <div>
          <h2>Current trading value status</h2>
          <p>
            Official sources still do not publish a complete trade value list.
            Ten Default items now have separately labeled USD marketplace
            asking prices verified across StarPets and Eldorado.
          </p>
        </div>
        <div>
          <h2>Calculator rule</h2>
          <p>
            Price comparison requires at least {minimumVerifiedTradeValues}{" "}
            independently verified, unit-compatible records. The current
            verified-price count is {verifiedValueItems.length}.
          </p>
        </div>
      </section>

      <CommunityEstimateCandidates candidates={communityEstimateCandidates} />

      <section className="tool-panel" aria-labelledby="trading-status-title">
        <div className="panel-heading">
          <div>
            <p className="eyebrow">Source-backed status</p>
            <h2 id="trading-status-title">Tracked trading value status</h2>
          </div>
          <span className="result-count">{brainrots.length} items</span>
        </div>
        <div className="table-wrap">
          <table className="status-table">
            <caption className="sr-only">
              Steal a Brainrot items with trade value and source status
            </caption>
            <thead>
              <tr>
                <th scope="col">Item</th>
                <th scope="col">Rarity</th>
                <th scope="col">Value / asking price</th>
                <th scope="col">Source status</th>
                <th scope="col">Last checked</th>
              </tr>
            </thead>
            <tbody>
              {brainrots.map((item) => {
                const hasVerifiedValue = isVerifiedTradeValue(item);
                const sourceLabel = hasVerifiedValue
                  ? item.valueSourceLabel || item.sourceLabel
                  : item.sourceLabel;
                const sourceUrl = hasVerifiedValue
                  ? item.valueSourceUrl || item.sourceUrl
                  : item.sourceUrl;
                const checkedAt = hasVerifiedValue
                  ? item.valueSourceCheckedAt || item.lastUpdated
                  : item.lastUpdated;

                return (
                  <tr id={item.slug} key={item.id}>
                    <th scope="row">{item.name}</th>
                    <td>
                      <span
                        className={`pill rarity rarity-${item.rarity.toLowerCase()}`}
                      >
                        {item.rarity}
                      </span>
                    </td>
                    <td>
                      <span
                        className={`pill ${
                          hasVerifiedValue ? "verified-value" : "trend-unknown"
                        }`}
                      >
                        {hasVerifiedValue ? formatValue(item.value) : "TBD"}
                      </span>
                    </td>
                    <td>
                      <a
                        className="source-link"
                        href={sourceUrl}
                        target="_blank"
                        rel="noreferrer"
                        data-analytics-event="official_source_clicked"
                        data-analytics-label={item.slug}
                        data-analytics-location="trading_values_status"
                      >
                        {sourceLabel}
                      </a>
                      <p>
                        {hasVerifiedValue
                          ? "Cross-checked Default marketplace asking price."
                          : "Item confirmed; public trade value not published."}
                      </p>
                    </td>
                    <td>{checkedAt}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      <section className="content-band">
        <div>
          <h2>How a value becomes verified</h2>
          <p>
            A calculator-ready price needs two independent sources, a Default
            variant and exact M/s match, at least three listings per source,
            three distinct Eldorado sellers, no more than 15% median spread,
            and a fresh review. It remains labeled as an asking price—not a
            completed sale or official trade value.
          </p>
          <Link
            href="/methodology/"
            data-analytics-event="related_tool_clicked"
            data-analytics-label="methodology"
            data-analytics-location="trading_values_methodology"
          >
            Read the verification methodology
          </Link>
        </div>
        <div>
          <h2>Related trade tools</h2>
          <div className="link-grid">
            <Link
              href="/"
              data-analytics-event="related_tool_clicked"
              data-analytics-label="values"
              data-analytics-location="trading_values_related_tools"
            >
              Value list
            </Link>
            <Link
              href="/calculator/"
              data-analytics-event="related_tool_clicked"
              data-analytics-label="calculator"
              data-analytics-location="trading_values_related_tools"
            >
              Trade calculator
            </Link>
            <Link
              href="/rarity-list/"
              data-analytics-event="related_tool_clicked"
              data-analytics-label="rarity-list"
              data-analytics-location="trading_values_related_tools"
            >
              Rarity list
            </Link>
            <Link
              href="/updates/"
              data-analytics-event="related_tool_clicked"
              data-analytics-label="updates"
              data-analytics-location="trading_values_related_tools"
            >
              Latest updates
            </Link>
          </div>
        </div>
      </section>

      <section className="source-section">
        <h2>Official sources checked</h2>
        <div className="source-grid">
          {officialSources.map((source) => (
            <a
              key={source.url}
              href={source.url}
              target="_blank"
              rel="noreferrer"
              data-analytics-event="official_source_clicked"
              data-analytics-label={source.label}
              data-analytics-location="trading_values_sources"
            >
              <strong>{source.label}</strong>
              <span>{source.note}</span>
            </a>
          ))}
        </div>
      </section>

      <section className="faq-section">
        <h2>Trading values FAQ</h2>
        {faqs.map((faq) => (
          <details key={faq.question}>
            <summary>{faq.question}</summary>
            <p>{faq.answer}</p>
          </details>
        ))}
      </section>
    </>
  );
}
