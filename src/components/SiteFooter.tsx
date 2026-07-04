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
          values. Values are estimates and may change at any time.
        </p>
      </div>
      <div className="footer-links">
        <Link href="/">Values</Link>
        <Link href="/calculator/">Calculator</Link>
        <Link href="/updates/">Updates</Link>
        <span>Updated {lastUpdated}</span>
      </div>
    </footer>
  );
}
