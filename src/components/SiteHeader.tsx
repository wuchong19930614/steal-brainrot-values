"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "Values", analyticsLabel: "values" },
  { href: "/calculator/", label: "Calculator", analyticsLabel: "calculator" },
  { href: "/tier-list/", label: "Tier List", analyticsLabel: "tier-list" },
  { href: "/rarity-list/", label: "Rarity", analyticsLabel: "rarity-list" },
  { href: "/updates/", label: "Updates", analyticsLabel: "updates" },
];

function normalizePath(path: string) {
  return path === "/" ? path : path.replace(/\/$/, "");
}

export function SiteHeader() {
  const pathname = usePathname();
  const currentPath = normalizePath(pathname);

  return (
    <header className="site-header">
      <Link className="brand" href="/" aria-label="Steal a Brainrot Values home">
        <span className="brand-mark">SBV</span>
        <span>
          <strong>Steal a Brainrot Values</strong>
          <small>Fan value tracker</small>
        </span>
      </Link>
      <nav className="site-nav" aria-label="Primary navigation">
        {navItems.map((item) => {
          const isCurrent = normalizePath(item.href) === currentPath;

          if (isCurrent) {
            return (
              <span key={item.href} aria-current="page" className="current-nav-item">
                {item.label}
              </span>
            );
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              data-analytics-event="related_tool_clicked"
              data-analytics-label={item.analyticsLabel}
              data-analytics-location="header_nav"
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
