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
          values. Trade values stay marked TBD until official or manually
          verified data is available.
        </p>
      </div>
      <div className="footer-links">
        <Link href="/">Values</Link>
        <Link href="/calculator/">Calculator</Link>
        <Link href="/trading-values/">Trading values</Link>
        <Link href="/updates/">Updates</Link>
        <Link href="/methodology/">Methodology</Link>
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
