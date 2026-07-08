import Link from "next/link";
import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { ValueTable } from "@/components/ValueTable";
import {
  brainrots,
  formatValue,
  getTotalTrackedValue,
  officialSources,
  lastUpdated,
} from "@/lib/data";
import { absoluteUrl, siteDescription, siteName } from "@/lib/seo";

const faqs = [
  {
    question: "Are these values official?",
    answer:
      "No official trade values were found in the public sources checked. Values are marked TBD until verified data is added.",
  },
  {
    question: "Are Steal a Brainrot trading values available?",
    answer:
      "Public official sources checked so far do not publish a complete trading value list. Current trade values stay TBD until official or manually verified data is available.",
  },
  {
    question: "Why do some values change quickly?",
    answer:
      "Roblox game demand can move fast after updates, limited events, and creator videos. The updates page records major changes.",
  },
];

export const metadata: Metadata = {
  title: "Steal a Brainrot Values - Value List, Demand & Trade Prices",
  description:
    "Check official-source Steal a Brainrot items and see which trade values are still unpublished or awaiting verification.",
  alternates: {
    canonical: absoluteUrl("/"),
  },
  openGraph: {
    title: "Steal a Brainrot Values - Value List, Demand & Trade Prices",
    description:
      "Check official-source Steal a Brainrot items and see which trade values are still unpublished or awaiting verification.",
    url: absoluteUrl("/"),
  },
};

export default function HomePage() {
  const topItems = [...brainrots].sort((a, b) => b.value - a.value).slice(0, 3);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: siteName,
          url: absoluteUrl("/"),
          description: siteDescription,
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Steal a Brainrot values",
          itemListElement: brainrots.slice(0, 12).map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.name,
            url: absoluteUrl(`/#${item.slug}`),
            description:
              item.value > 0
                ? `${item.rarity} item with an official trade value of ${formatValue(
                    item.value,
                  )}.`
                : `${item.rarity} item. Official trade value not yet published.`,
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

      <section className="page-intro compact-intro">
        <div>
          <p className="eyebrow">Updated {lastUpdated}</p>
          <h1>Steal a Brainrot values</h1>
          <p>
            Track official-source Brainrot items and see which trade values are
            still unpublished.
          </p>
          <div className="intro-actions">
            <Link
              href="/calculator/"
              className="primary-link"
              data-analytics-event="related_tool_clicked"
              data-analytics-label="calculator"
              data-analytics-location="home_intro"
            >
              Trade calculator
            </Link>
            <Link
              href="/tier-list/"
              className="secondary-link"
              data-analytics-event="related_tool_clicked"
              data-analytics-label="tier-list"
              data-analytics-location="home_intro"
            >
              Tier list
            </Link>
          </div>
        </div>

        <aside className="snapshot" aria-label="Value snapshot">
          <div>
            <span>Official values</span>
            <strong>{formatValue(getTotalTrackedValue())}</strong>
          </div>
          <div>
            <span>Items</span>
            <strong>{brainrots.length}</strong>
          </div>
          <div>
            <span>Source status</span>
            <strong>{topItems[0]?.value ? "Verified" : "Values TBD"}</strong>
          </div>
          <div className="snapshot-bars" aria-hidden="true">
            {topItems.map((item, index) => (
              <span
                key={item.id}
                style={{ width: `${100 - index * 18}%` }}
              />
            ))}
          </div>
        </aside>
      </section>

      <ValueTable items={brainrots} />

      <section className="content-band">
        <div>
          <h2>Official value status</h2>
          <p>
            I checked the official Roblox experience and the official Steal A
            Brainrot site. They confirm the game and some merch/DLC items, but
            they do not publish a public trade value list.
          </p>
        </div>
        <div>
          <h2>Related tools</h2>
          <div className="link-grid">
            <Link
              href="/calculator/"
              data-analytics-event="related_tool_clicked"
              data-analytics-label="calculator"
              data-analytics-location="home_related_tools"
            >
              Steal a Brainrot calculator
            </Link>
            <Link
              href="/tier-list/"
              data-analytics-event="related_tool_clicked"
              data-analytics-label="tier-list"
              data-analytics-location="home_related_tools"
            >
              Best Brainrots tier list
            </Link>
            <Link
              href="/rarity-list/"
              data-analytics-event="related_tool_clicked"
              data-analytics-label="rarity-list"
              data-analytics-location="home_related_tools"
            >
              Brainrot rarity list
            </Link>
            <Link
              href="/updates/"
              data-analytics-event="related_tool_clicked"
              data-analytics-label="updates"
              data-analytics-location="home_related_tools"
            >
              Latest value updates
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
              data-analytics-location="official_sources"
            >
              <strong>{source.label}</strong>
              <span>{source.note}</span>
            </a>
          ))}
        </div>
      </section>

      <section className="faq-section">
        <h2>Steal a Brainrot values FAQ</h2>
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
