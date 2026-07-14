import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { lastUpdated, minimumVerifiedTradeValues } from "@/lib/data";
import { absoluteUrl, createPageMetadata, siteName } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "How Steal a Brainrot Values Are Verified - Methodology",
  description:
    "Read how Steal a Brainrot item facts, community estimates, and USD marketplace asking prices are sourced, verified, rejected, and refreshed.",
  path: "/methodology/",
});

export default function MethodologyPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Steal a Brainrot value verification methodology",
          url: absoluteUrl("/methodology/"),
          description: metadata.description,
          dateModified: lastUpdated,
          isPartOf: {
            "@type": "WebSite",
            name: siteName,
            url: absoluteUrl("/"),
          },
        }}
      />
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
              name: "Methodology",
              item: absoluteUrl("/methodology/"),
            },
          ],
        }}
      />

      <section className="page-intro">
        <div>
          <p className="eyebrow">Method reviewed {lastUpdated}</p>
          <h1>How Steal a Brainrot values are verified</h1>
          <p>
            This fan-made tracker separates confirmed item facts, community
            estimates, official values, and verified marketplace asking prices
            so a source label never implies more certainty than its evidence.
          </p>
        </div>
        <div className="intro-link-stack">
          <Link href="/trading-values/">Trading value status</Link>
          <Link href="/updates/">Source-check log</Link>
        </div>
      </section>

      <section className="content-band">
        <div>
          <h2>Three different data states</h2>
          <p>
            A <strong>catalog fact</strong> confirms an item name, rarity,
            availability, in-game cost, or income from a labeled source. A
            <strong> community estimate</strong> is a published trade opinion
            that has not passed this site&apos;s verification rule. A
            <strong> verified marketplace asking price</strong> is a Default,
            USD value that passed exact item/M/s matching, two-source sampling,
            seller-count, spread, and freshness checks. It is not presented as
            an official value or completed-sale price.
          </p>
        </div>
        <div>
          <h2>Why TBD is intentional</h2>
          <p>
            TBD means the tracker does not have enough comparable evidence to
            publish either an official value or a verified market-price proxy.
            It does not mean the item has no value. The calculator and tier
            list remain blocked until at least
            {` ${minimumVerifiedTradeValues} `}
            items have verified values, because partial or mixed-unit data can
            produce confident-looking but misleading results.
          </p>
        </div>
      </section>

      <section className="source-section">
        <h2>Verification process</h2>
        <div className="source-grid">
          <article>
            <strong>1. Match the item</strong>
            <p>
              Names, aliases, rarity, and availability are compared so that
              similarly named Brainrots are not merged by mistake.
            </p>
          </article>
          <article>
            <strong>2. Compare independent sources</strong>
            <p>
              A value needs at least two independently maintained sources that
              describe the same item and the same type of value. Copies of one
              original list do not count as independent confirmation. Current
              marketplace records require at least three qualifying listings
              per source and three distinct Eldorado sellers.
            </p>
          </article>
          <article>
            <strong>3. Normalize the unit</strong>
            <p>
              Reference units, ranges, in-game cash, Robux, and trade ratios
              are not interchangeable. Values are compared only after their
              units and reference item are explicit and compatible.
            </p>
          </article>
          <article>
            <strong>4. Resolve conflicts</strong>
            <p>
              Marketplace medians may differ by no more than 15% relative to
              the lower median. Larger conflicts stay outside calculations
              instead of being averaged into a false consensus.
            </p>
          </article>
          <article>
            <strong>5. Record a check date</strong>
            <p>
              Accepted sources receive a check date. Fast-changing values are
              reviewed again when a game update or new source makes the prior
              comparison unreliable.
            </p>
          </article>
          <article>
            <strong>6. Keep calculations gated</strong>
            <p>
              Only official values or marketplace asking prices that pass all
              evidence checks enter the calculator and tier model. Single-source
              candidates remain excluded from totals and rankings.
            </p>
          </article>
        </div>
      </section>

      <section className="content-band">
        <div>
          <h2>Corrections and rejected values</h2>
          <p>
            A value is rejected when its source cannot be opened, its unit is
            undefined, the item match is ambiguous, or the available sources
            appear to repeat the same underlying list. When evidence changes,
            affected rows can return to TBD until they are reviewed again.
          </p>
          <a
            href="https://github.com/wuchong19930614/steal-brainrot-values/issues/new"
            target="_blank"
            rel="noopener noreferrer"
          >
            Report a source or data correction
          </a>
        </div>
        <div>
          <h2>Editorial responsibility</h2>
          <p>
            This site is maintained as an independent fan resource and is not
            affiliated with Roblox or the game&apos;s creators. Source labels,
            review dates, and visible limitations are part of the published
            record. Material catalog and verification changes are summarized
            in the dated update log.
          </p>
        </div>
      </section>
    </>
  );
}
