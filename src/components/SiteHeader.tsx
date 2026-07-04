import Link from "next/link";

const navItems = [
  { href: "/", label: "Values" },
  { href: "/calculator/", label: "Calculator" },
  { href: "/tier-list/", label: "Tier List" },
  { href: "/rarity-list/", label: "Rarity" },
  { href: "/updates/", label: "Updates" },
];

export function SiteHeader() {
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
        {navItems.map((item) => (
          <Link key={item.href} href={item.href}>
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}

