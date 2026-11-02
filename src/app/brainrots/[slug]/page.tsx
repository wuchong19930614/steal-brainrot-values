import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import {
  brainrots,
  formatMpsPerDollar,
  formatTradeValue,
  formatValue,
  getBrainrotBySlug,
  getCommunityCandidateForItem,
  getRelatedBrainrots,
  isVerifiedTradeValue,
} from "@/lib/data";
import {
  absoluteUrl,
  createFaqJsonLd,
  createPageMetadata,
} from "@/lib/seo";

interface BrainrotDetailPageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return brainrots.map((item) => ({
    slug: item.slug,
  }));
}

export async function generateMetadata({
  params,
}: BrainrotDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = getBrainrotBySlug(slug);

  if (!item) {
    return createPageMetadata({
      title: "Brainrot Not Found - Steal a Brainrot Values",
      description: "The requested Steal a Brainrot item could not be found.",
      path: "/rarity-list/",
    });
  }

  const hasVerifiedValue = isVerifiedTradeValue(item);
  const incomeText = item.baseIncomeText;
  const obtainabilityLabel = item.obtainable ? "Obtainable" : "Unobtainable";

  const title = hasVerifiedValue
    ? `${item.name} Value in Steal a Brainrot - ${formatValue(item.value)} USD & ${incomeText ?? "Default"} Stats`
    : incomeText
      ? `${item.name} Value & Rarity in Steal a Brainrot - ${item.rarity} (${incomeText})`
      : `${item.name} Value & Rarity in Steal a Brainrot - ${item.rarity} (${obtainabilityLabel})`;

  const description = hasVerifiedValue
    ? `Check ${item.name} value in Steal a Brainrot (SAB): verified ${formatValue(item.value)} Default USD marketplace asking price, ${incomeText ?? "Default"} base income, StarPets vs. Eldorado spread, and trade calculator link.`
    : incomeText
      ? `Check ${item.name} in Steal a Brainrot (SAB): ${item.rarity} rarity, ${incomeText} Default base income, source verification status, and why its USD trade value is currently TBD.`
      : `Check ${item.name} in Steal a Brainrot (SAB): ${item.rarity} rarity (${obtainabilityLabel.toLowerCase()}), source verification status, and why its USD trade value is currently TBD.`;

  return createPageMetadata({
    title,
    description,
    path: `/brainrots/${item.slug}/`,
  });
}

export default async function BrainrotDetailPage({
  params,
}: BrainrotDetailPageProps) {
  const { slug } = await params;
  const item = getBrainrotBySlug(slug);

  if (!item) {
    notFound();
  }

  const hasVerifiedValue = isVerifiedTradeValue(item);
  const candidate = getCommunityCandidateForItem(item.id);
  const relatedItems = getRelatedBrainrots(item, 6);
  const mpsPerDollar =
    hasVerifiedValue && item.baseIncomeMps
      ? formatMpsPerDollar(item.baseIncomeMps, item.value)
      : null;
  const obtainabilityLabel = item.obtainable ? "Obtainable" : "Unobtainable";

  const checkedAt = hasVerifiedValue
    ? item.valueSourceCheckedAt || item.lastUpdated
    : item.lastUpdated;

  const primarySourceUrl = hasVerifiedValue
    ? item.valueSourceUrl || item.sourceUrl
    : item.sourceUrl;
  const primarySourceLabel = hasVerifiedValue
    ? item.valueSourceLabel || item.sourceLabel
    : item.sourceLabel;
  const isOfficialPrimarySource =
    primarySourceUrl.includes("roblox.com") ||
    primarySourceUrl.includes("playsab.com");

  const faqs = [
    {
      question: `What is ${item.name} worth in Steal a Brainrot?`,
      answer: hasVerifiedValue
        ? `${item.name} currently has a verified Default marketplace asking price of ${formatValue(item.value)} USD (checked ${checkedAt}), calculated as the rounded mean across StarPets and Eldorado listings that match its ${item.baseIncomeText ?? "Default"} base income.`
        : `${item.name} is currently marked TBD for USD marketplace value. Official sources do not publish a trade value list, and this ${item.rarity} item has not passed the two-source Default marketplace liquidity and 15% spread checks.`,
    },
    {
      question: `What rarity and base income is ${item.name}?`,
      answer: `${item.name} is a ${item.rarity} Brainrot${
        item.baseIncomeText
          ? ` with a Default base income of ${item.baseIncomeText}`
          : ""
      }. ${item.notes}`,
    },
    {
      question: `Can I compare ${item.name} in the Steal a Brainrot trade calculator?`,
      answer: hasVerifiedValue
        ? `Yes. Because ${item.name} passes the two-source Default verification rule at ${formatValue(item.value)}, you can prefill it directly in the trade calculator to compare USD asking prices and total M/s income.`
        : `Not yet. Only Brainrots with two-source verified Default USD marketplace prices enter calculator totals. You can still compare verified Secret items in the calculator or review ${item.name}'s source status on the trading values page.`,
    },
  ];

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
              name: "Rarity List",
              item: absoluteUrl("/rarity-list/"),
            },
            {
              "@type": "ListItem",
              position: 3,
              name: item.name,
              item: absoluteUrl(`/brainrots/${item.slug}/`),
            },
          ],
        }}
      />
      <JsonLd data={createFaqJsonLd(faqs)} />

      <section className="page-intro compact-intro">
        <div>
          <p className="eyebrow">
            {item.rarity} Brainrot · {obtainabilityLabel} · Checked {checkedAt}
          </p>
          <h1>{item.name} value &amp; rarity in Steal a Brainrot</h1>
          <p>{item.notes}</p>
          <div className="intro-actions">
            {hasVerifiedValue ? (
              <Link
                href={`/calculator/?add=${item.slug}`}
                className="primary-link"
                data-analytics-event="related_tool_clicked"
                data-analytics-label={item.slug}
                data-analytics-location="brainrot_detail_intro"
              >
                Add {item.name} to calculator
              </Link>
            ) : (
              <Link
                href="/calculator/"
                className="primary-link"
                data-analytics-event="related_tool_clicked"
                data-analytics-label="calculator"
                data-analytics-location="brainrot_detail_intro"
              >
                Open trade calculator
              </Link>
            )}
            <Link
              href={`/trading-values/#${item.slug}`}
              className="secondary-link"
              data-analytics-event="related_tool_clicked"
              data-analytics-label="trading-values"
              data-analytics-location="brainrot_detail_intro"
            >
              View in trading values table
            </Link>
          </div>
        </div>

        <aside className="snapshot" aria-label={`${item.name} value snapshot`}>
          <div>
            <span>USD market asking price</span>
            <strong>{formatTradeValue(item)}</strong>
          </div>
          <div>
            <span>Rarity &amp; status</span>
            <strong>
              {item.rarity}
              {hasVerifiedValue ? ` · Tier ${item.tier}` : ""} ·{" "}
              {obtainabilityLabel}
            </strong>
          </div>
          <div>
            <span>Default base income</span>
            <strong>{item.baseIncomeText ?? "Not listed"}</strong>
          </div>
          {mpsPerDollar ? (
            <div>
              <span>Value efficiency</span>
              <strong>{mpsPerDollar}</strong>
            </div>
          ) : null}
        </aside>
      </section>

      <section className="tool-panel" aria-labelledby="item-evidence-heading">
        <div className="panel-heading">
          <div>
            <p className="eyebrow">Source verification</p>
            <h2 id="item-evidence-heading">
              {hasVerifiedValue
                ? `Two-source marketplace evidence for ${item.name}`
                : `Verification & price status for ${item.name}`}
            </h2>
          </div>
          <span
            className={`pill ${
              hasVerifiedValue ? "verified-value" : "trend-unknown"
            }`}
          >
            {hasVerifiedValue
              ? `Verified ${formatValue(item.value)}`
              : "USD Value: TBD"}
          </span>
        </div>

        {hasVerifiedValue && item.marketplaceEvidence ? (
          <div className="detail-evidence-stack">
            <div className="status-list">
              <div>
                <span>Variant &amp; base income</span>
                <strong>
                  {item.marketplaceEvidence.variant} ·{" "}
                  {item.marketplaceEvidence.baseIncomeMps}M/s
                </strong>
              </div>
              <div>
                <span>Two-source spread</span>
                <strong>
                  {item.marketplaceEvidence.sourcePriceSpreadPercent}% (max 15%)
                </strong>
              </div>
              <div>
                <span>Balanced USD asking price</span>
                <strong>{formatValue(item.value)}</strong>
              </div>
            </div>

            <div className="source-grid">
              {item.marketplaceEvidence.sources.map((source) => (
                <a
                  key={source.url}
                  href={source.url}
                  target="_blank"
                  rel="noreferrer"
                  data-analytics-event="community_source_clicked"
                  data-analytics-label={`${item.slug}:${source.label}`}
                  data-analytics-location="brainrot_detail_evidence"
                >
                  <strong>
                    {source.label}: {formatValue(source.askingPriceUsd)}
                  </strong>
                  <span>
                    {source.distinctSellers
                      ? `${source.listingCount} eligible Default listings across ${source.distinctSellers} sellers`
                      : `${source.listingCount} Default records checked`}{" "}
                    · Checked {checkedAt}
                  </span>
                </a>
              ))}
            </div>
          </div>
        ) : (
          <div className="detail-evidence-stack">
            {candidate ? (
              <>
                <div className="status-list">
                  <div>
                    <span>Community reference value</span>
                    <strong>
                      {candidate.referenceValue.toLocaleString("en-US")}{" "}
                      {candidate.unitLabel}
                    </strong>
                  </div>
                  <div>
                    <span>Verification status</span>
                    <strong>{candidate.status}</strong>
                  </div>
                  <div>
                    <span>Calculator status</span>
                    <strong>Excluded (TBD)</strong>
                  </div>
                </div>
                <p className="calculator-note">
                  This item has a single-source community reference estimate (in{" "}
                  {candidate.unitLabel}, not USD) checked on{" "}
                  {candidate.sourceCheckedAt}, and has not passed the two-source
                  Default USD marketplace liquidity and 15% spread rules.
                </p>
              </>
            ) : (
              <p className="calculator-note">
                {item.name} is verified in the catalog as a{" "}
                <strong>{item.rarity}</strong> Brainrot
                {item.baseIncomeText
                  ? ` with ${item.baseIncomeText} Default base income`
                  : ""}
                , but does not yet have a two-source Default USD marketplace
                asking price that meets the minimum liquidity and 15% spread
                rules.
              </p>
            )}
            <div className="source-grid">
              <a
                href={primarySourceUrl}
                target="_blank"
                rel="noreferrer"
                data-analytics-event={
                  isOfficialPrimarySource
                    ? "official_source_clicked"
                    : "community_source_clicked"
                }
                data-analytics-label={item.slug}
                data-analytics-location="brainrot_detail_sources"
              >
                <strong>{primarySourceLabel}</strong>
                <span>Primary catalog source · Checked {checkedAt}</span>
              </a>
              {item.additionalSources?.map((source) => (
                <a
                  key={source.url}
                  href={source.url}
                  target="_blank"
                  rel="noreferrer"
                  data-analytics-event="community_source_clicked"
                  data-analytics-label={`${item.slug}:${source.label}`}
                  data-analytics-location="brainrot_detail_sources"
                >
                  <strong>Cross-check: {source.label}</strong>
                  <span>Independent catalog cross-check</span>
                </a>
              ))}
              {candidate ? (
                <a
                  href={candidate.sourceUrl}
                  target="_blank"
                  rel="noreferrer"
                  data-analytics-event="community_source_clicked"
                  data-analytics-label={`${item.slug}:candidate`}
                  data-analytics-location="brainrot_detail_candidate"
                >
                  <strong>Candidate: {candidate.sourceLabel}</strong>
                  <span>
                    Published {candidate.sourcePublishedAt} · Checked{" "}
                    {candidate.sourceCheckedAt}
                  </span>
                </a>
              ) : null}
            </div>
          </div>
        )}
      </section>

      <section className="tool-panel" aria-labelledby="related-items-heading">
        <div className="panel-heading">
          <div>
            <p className="eyebrow">Compare similar items</p>
            <h2 id="related-items-heading">
              Related {item.rarity} &amp; comparable Brainrots
            </h2>
          </div>
          <Link
            href="/rarity-list/"
            className="source-link"
            data-analytics-event="related_tool_clicked"
            data-analytics-label="rarity-list"
            data-analytics-location="brainrot_detail_related"
          >
            Browse all {brainrots.length} Brainrots
          </Link>
        </div>

        <div className="value-list">
          {relatedItems.map((rel) => {
            const relVerified = isVerifiedTradeValue(rel);
            const relMpsPerDollar =
              relVerified && rel.baseIncomeMps
                ? formatMpsPerDollar(rel.baseIncomeMps, rel.value)
                : null;

            return (
              <article className="value-row" key={rel.id}>
                <div className="item-main">
                  <div className="token-mark" aria-hidden="true">
                    {rel.name
                      .split(" ")
                      .slice(0, 2)
                      .map((word) => word[0])
                      .join("")
                      .toUpperCase()}
                  </div>
                  <div>
                    <h3>
                      <Link
                        href={`/brainrots/${rel.slug}/`}
                        data-analytics-event="related_tool_clicked"
                        data-analytics-label={rel.slug}
                        data-analytics-location="brainrot_detail_related_item"
                      >
                        {rel.name}
                      </Link>
                    </h3>
                    <p>{rel.notes}</p>
                    {relVerified ? (
                      <div className="source-links">
                        <Link
                          className="source-link"
                          href={`/calculator/?add=${rel.slug}`}
                          data-analytics-event="related_tool_clicked"
                          data-analytics-label={rel.slug}
                          data-analytics-location="brainrot_detail_related_compare"
                        >
                          Compare in calculator
                        </Link>
                      </div>
                    ) : null}
                  </div>
                </div>

                <div className="item-meta">
                  <span
                    className={`pill rarity rarity-${rel.rarity.toLowerCase()}`}
                  >
                    {rel.rarity}
                  </span>
                  {rel.baseIncomeText ? (
                    <span className="pill demand">{rel.baseIncomeText}</span>
                  ) : null}
                  {relMpsPerDollar ? (
                    <span className="pill demand">{relMpsPerDollar}</span>
                  ) : null}
                </div>

                <div className="item-value">
                  <strong>{formatTradeValue(rel)}</strong>
                  <span>
                    {relVerified ? "Verified Default USD" : "Value TBD"}
                  </span>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="content-band">
        <div>
          <h2>How we verify {item.name}</h2>
          <p>
            Every positive USD figure on Steal a Brainrot Values requires two
            independent marketplace sources, an exact Default base income (M/s)
            match, at least three records per source, three distinct Eldorado
            sellers, and no more than 15% spread between sources.
          </p>
        </div>
        <div>
          <h2>Explore more tools</h2>
          <div className="link-grid">
            <Link
              href="/"
              data-analytics-event="related_tool_clicked"
              data-analytics-label="values"
              data-analytics-location="brainrot_detail_tools"
            >
              Full value list
            </Link>
            <Link
              href="/calculator/"
              data-analytics-event="related_tool_clicked"
              data-analytics-label="calculator"
              data-analytics-location="brainrot_detail_tools"
            >
              Trade calculator
            </Link>
            <Link
              href="/tier-list/"
              data-analytics-event="related_tool_clicked"
              data-analytics-label="tier-list"
              data-analytics-location="brainrot_detail_tools"
            >
              Market price tier list
            </Link>
            <Link
              href="/rarity-list/"
              data-analytics-event="related_tool_clicked"
              data-analytics-label="rarity-list"
              data-analytics-location="brainrot_detail_tools"
            >
              Rarity list
            </Link>
          </div>
        </div>
      </section>

      <section className="faq-section">
        <h2>{item.name} FAQ</h2>
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
