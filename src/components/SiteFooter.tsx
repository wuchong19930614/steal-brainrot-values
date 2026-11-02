import Link from "next/link";
import { lastUpdated } from "@/lib/data";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div>
        <strong>Steal a Brainrot Values</strong>
        <p>
          Fan-made resource. Not affiliated with Roblox, Steal a Brainrot, or
          their creators. Public official sources checked did not publish trade
          values. Verified USD marketplace asking prices are labeled separately
          from official or player-to-player trade values.
        </p>
      </div>
      <div className="footer-links">
        <Link
          href="/"
          data-analytics-event="related_tool_clicked"
          data-analytics-label="values"
          data-analytics-location="footer_nav"
        >
          Values
        </Link>
        <Link
          href="/trading-values/"
          data-analytics-event="related_tool_clicked"
          data-analytics-label="trading-values"
          data-analytics-location="footer_nav"
        >
          Trading values
        </Link>
        <Link
          href="/calculator/"
          data-analytics-event="related_tool_clicked"
          data-analytics-label="calculator"
          data-analytics-location="footer_nav"
        >
          Calculator
        </Link>
        <Link
          href="/tier-list/"
          data-analytics-event="related_tool_clicked"
          data-analytics-label="tier-list"
          data-analytics-location="footer_nav"
        >
          Tier list
        </Link>
        <Link
          href="/rarity-list/"
          data-analytics-event="related_tool_clicked"
          data-analytics-label="rarity-list"
          data-analytics-location="footer_nav"
        >
          Rarity list
        </Link>
        <Link
          href="/updates/"
          data-analytics-event="related_tool_clicked"
          data-analytics-label="updates"
          data-analytics-location="footer_nav"
        >
          Updates
        </Link>
        <Link
          href="/methodology/"
          data-analytics-event="related_tool_clicked"
          data-analytics-label="methodology"
          data-analytics-location="footer_nav"
        >
          Methodology
        </Link>
        <Link href="/privacy/">Privacy</Link>
        <a
          href="https://github.com/wuchong19930614/steal-brainrot-values/issues/new"
          target="_blank"
          rel="noopener noreferrer"
        >
          Report a correction
        </a>
        <span>Updated {lastUpdated}</span>
      </div>
    </footer>
  );
}
