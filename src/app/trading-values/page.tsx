import type { Metadata } from "next";
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
import { absoluteUrl } from "@/lib/seo";

const faqs = [
  {
    question: "Are Steal a Brainrot trading values official?",
    answer:
      "The public official sources checked do not publish a complete trade value list. Each value stays TBD until an official or manually verified source is available.",
  },
  {
    question: "Why are the trade values marked TBD?",
    answer:
      "The current sources confirm some game-related DLC items, but they do not state a trade price or a complete trading value. An official item source alone is not enough to assign a value.",
  },
  {
    question: "When will the trade calculator turn on?",
    answer:
      `The calculator stays blocked until the tracker has at least ${minimumVerifiedTradeValues} official or manually verified trade values with a source and check date. It does not use guessed values for trade math.`,
  },
  {
    question: "Do community estimates turn on the calculator?",
    answer:
      "No. A single-source community estimate is displayed only as a research candidate. It needs a compatible second source and a fresh review before it can become a verified trade value.",
  },
];

export const metadata: Metadata = {
  title: "Steal a Brainrot Trading Values - Trade Value Status",
  description:
    "Check Steal a Brainrot trading value status, verified sources, and which Brainrot trade values are still unpublished or awaiting verification.",
  alternates: {
    canonical: absoluteUrl("/trading-values/"),
  },
  openGraph: {
    title: "Steal a Brainrot Trading Values - Trade Value Status",
    description:
      "Check Steal a Brainrot trading value status, verified sources, and which Brainrot trade values are still unpublished or awaiting verification.",
    url: absoluteUrl("/trading-values/"),
  },
};

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
                ? `Verified trade value: ${formatValue(item.value)}.`
                : "Item source is listed. Trade value is not publicly published.",
          })),
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.answer,
            },
          })),
        }}
      />

      <section className="page-intro">
        <div>
          <p className="eyebrow">Last checked {lastUpdated}</p>
          <h1>Steal a Brainrot trading values</h1>
          <p>
            Check which trade values have a reliable source, which items are
            source-labeled, and why unverified values stay TBD.
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
            Public official sources confirm the game and some DLC items, but
            they do not publish a complete trading value list. This page tracks
            that distinction instead of turning item names into guessed prices.
          </p>
        </div>
        <div>
          <h2>Calculator rule</h2>
          <p>
            Trade math remains disabled until at least {minimumVerifiedTradeValues} values have an
            official or manually verified source. The current verified-value
            count is {verifiedValueItems.length}.
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
                <th scope="col">Trade value</th>
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
                          ? "Verified trade value source."
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
            A verified value needs a published source, a clear item match, and
            a check date. Fan-made estimates can only appear when their source,
            confidence, and update date are labeled separately.
          </p>
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
