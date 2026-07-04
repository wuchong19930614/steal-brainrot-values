# PRD: Steal a Brainrot Values

Version: 0.1
Date: 2026-07-04
Status: Draft

## 1. Background


This project is a lightweight SEO tool site for the keyword cluster around **"steal a brainrot values"**.

Research summary:

- Primary keyword: `steal a brainrot values`
- Semrush US data: 2,900 monthly search volume, KD 16, CPC $0.12, competition 0.01, results 127
- Google Trends US, last 3 months: interest was near 0 for most of the period, then rose in the final two periods from 50 to 100
- Related low-competition keywords:
  - `steal a brainrot calculator`: volume 720, KD 7
  - `steal a brainrot value list`: volume 880, KD 10
  - `steal a brainrot tier list`: volume 1,300, KD 17
  - `steal a brainrot rarity list`: volume 260, KD 16
  - `best brainrot in steal a brainrot`: volume 8,100, KD 27

Official data note:

- Public official sources checked on 2026-07-04 include the official Roblox experience and the official Steal A Brainrot merch/DLC site.
- These sources confirm the game and some official merch/DLC items, but they do not publish a public trade value list.
- Until verified value data is available, the product must mark official trade values as `TBD` instead of displaying unverified estimates as facts.

The product should be built as a small, fast, low-cost SEO site. It should not depend on paid APIs, LLM calls, user accounts, or complex backend infrastructure.

## 2. Product Positioning

Steal a Brainrot Values is a fan-made value list and trade helper for Roblox Steal a Brainrot players.

The site helps players answer these questions quickly:

- What is this Brainrot worth?
- Is this trade fair?
- Which Brainrots are high demand?
- Which Brainrots are rare, rising, falling, or stable?
- What are the best Brainrots right now?

The first version should feel like a useful tool, not a blog or landing page.

## 3. Goals

Primary goals:

- Launch an MVP quickly and get indexed.
- Target the low-competition keyword cluster around `steal a brainrot values`.
- Provide a useful value table, calculator, tier list, rarity list, and update log.
- Keep development and maintenance costs low.
- Validate search demand through Google Search Console within 2-4 weeks.

Secondary goals:

- Build a reusable template for future Roblox value/calculator sites.
- Create pages that can be updated frequently without engineering work.
- Improve retention with search, filters, sorting, and internal linking.

## 4. Non-Goals

The MVP will not include:

- User accounts
- User-submitted trades
- Live marketplace pricing
- Paid APIs
- LLM-generated answers
- Real-time scraping
- Complex community features
- A mobile app
- Login with Roblox
- Any claim of official affiliation with Roblox or the game creator

## 5. Target Users

Primary users:

- Roblox Steal a Brainrot players who trade items and need quick value checks.
- Younger players searching from mobile devices.
- Players comparing offers before accepting a trade.

Secondary users:

- Content creators looking for quick value references.
- Parents or casual users trying to understand item values.
- SEO visitors searching for specific Brainrot names.

## 6. MVP Information Architecture

The MVP should include 5 main pages.

### 6.1 Home / Values Page

Path:

- `/`

Primary keyword:

- `steal a brainrot values`

Secondary keywords:

- `steal a brainrot value list`
- `steal a brainrot values list`
- `steal a brainrot trade values`

Purpose:

- Main value table and site entry point.

Required modules:

- Searchable Brainrot value table
- Filters for rarity, demand, trend, and obtainable status
- Sort by value, demand, rarity, and update date
- Quick links to calculator, tier list, rarity list, and updates
- Short FAQ section
- Last updated timestamp

### 6.2 Calculator Page

Path:

- `/calculator/`

Primary keyword:

- `steal a brainrot calculator`

Purpose:

- Help players compare two trade offers.

Required modules:

- Add Brainrots to "Your Offer"
- Add Brainrots to "Their Offer"
- Show total estimated value for both sides
- Show trade result: Win, Fair, Small Loss, Big Loss
- Allow item quantity adjustment
- Use the same value data as the main value table
- Link back to relevant item rows/pages

### 6.3 Tier List Page

Path:

- `/tier-list/`

Primary keywords:

- `steal a brainrot tier list`
- `best brainrot in steal a brainrot`

Purpose:

- Rank Brainrots by overall value, demand, rarity, and usefulness.

Required modules:

- S/A/B/C/D tier sections
- Short explanation for each tier
- Sort/filter toggle for value-based, demand-based, and rarity-based rankings
- Internal links to value table and calculator

### 6.4 Rarity List Page

Path:

- `/rarity-list/`

Primary keyword:

- `steal a brainrot rarity list`

Purpose:

- Organize Brainrots by rarity and help users understand scarcity.

Required modules:

- Rarity groups
- Count of Brainrots per rarity
- Value range per rarity
- Links to calculator and value table

### 6.5 Updates Page

Path:

- `/updates/`

Primary keywords:

- `steal a brainrot value changes`
- `steal a brainrot update values`

Purpose:

- Provide freshness signals for users and search engines.

Required modules:

- Chronological changelog
- Added Brainrots
- Removed Brainrots
- Value increases
- Value decreases
- Demand changes
- Last updated timestamp

## 7. Optional Post-MVP Pages

Create only after MVP pages are indexed or Search Console shows impressions.

Optional pages:

- `/brainrots/[slug]/`: individual Brainrot detail pages
- `/best-brainrots/`: dedicated page for best Brainrots
- `/value-list/`: only if Search Console shows enough separate demand; otherwise keep this intent on `/`
- `/trading-guide/`: basic guide to reading values and avoiding bad trades

Avoid creating too many thin pages before there is enough data.

## 8. Data Model

The MVP can use a local JSON, YAML, CSV, or TypeScript data file.

Suggested fields:

```ts
type BrainrotItem = {
  id: string;
  name: string;
  slug: string;
  rarity: "Common" | "Rare" | "Epic" | "Legendary" | "Mythic" | "Secret" | "Limited" | "Unknown";
  value: number;
  demand: 1 | 2 | 3 | 4 | 5;
  trend: "Rising" | "Stable" | "Falling" | "Unstable" | "Unknown";
  obtainable: boolean;
  imageUrl?: string;
  aliases?: string[];
  notes?: string;
  lastUpdated: string;
};
```

Data requirements:

- One canonical value source file should power all pages.
- Every item must have a `lastUpdated` value.
- Unknown or uncertain values should be labeled clearly.
- The site should not present estimated values as official prices.

## 9. Functional Requirements

### 9.1 Global Requirements

- Site must be fast on mobile.
- Core content must render without client-only loading delays.
- Navigation must include Values, Calculator, Tier List, Rarity List, and Updates.
- Every page must show a clear last updated date.
- Every page must include internal links to at least 2 other relevant pages.
- No login or account creation.

### 9.2 Value Table

Requirements:

- Search by Brainrot name and aliases.
- Filter by rarity.
- Filter by demand.
- Filter by trend.
- Sort by value, demand, rarity, and last updated date.
- Highlight rising and falling values visually.
- Show empty state when no results match.
- Table must be usable on mobile.

### 9.3 Trade Calculator

Requirements:

- Users can search and add items to both sides of a trade.
- Users can remove items.
- Users can change quantities.
- Calculator shows total value for each side.
- Calculator shows absolute and percentage difference.
- Calculator shows a simple verdict:
  - Big Win
  - Small Win
  - Fair
  - Small Loss
  - Big Loss
- Calculator must work fully in the browser.

Suggested verdict rules:

- Difference within 5%: Fair
- User side ahead by 5-20%: Small Win
- User side ahead by more than 20%: Big Win
- User side behind by 5-20%: Small Loss
- User side behind by more than 20%: Big Loss

### 9.4 Tier List

Requirements:

- Display items grouped by tier.
- Tier assignment should be derived from value, demand, rarity, and editorial override when needed.
- Each item should link back to the values table or future detail page.
- Page should include a short methodology section.

### 9.5 Updates

Requirements:

- Show the latest update at the top.
- Group changes by date.
- Show previous value and new value when available.
- Include a short summary of the update.
- This page should be easy to update manually.

## 10. SEO Requirements

### 10.1 Page Titles

Recommended title tags:

- Home: `Steal a Brainrot Values - Value List, Demand & Trade Prices`
- Calculator: `Steal a Brainrot Calculator - Check Fair Trades`
- Tier List: `Steal a Brainrot Tier List - Best Brainrots Ranked`
- Rarity List: `Steal a Brainrot Rarity List - All Brainrots by Rarity`
- Updates: `Steal a Brainrot Value Updates - Latest Changes`

### 10.2 Meta Descriptions

Each page should have a unique meta description under 160 characters.

Examples:

- Home: `Check the latest Steal a Brainrot values, demand, rarity, and trade prices in a searchable value list.`
- Calculator: `Compare Steal a Brainrot trades with a simple value calculator for fair, win, and loss trades.`

### 10.3 Content Rules

- Do not create generic filler paragraphs.
- Put the tool or table near the top of the page.
- Add short explanatory copy only where it helps users understand the data.
- Use the exact keyword naturally in H1 or H2.
- Avoid keyword stuffing.
- Each page should answer one distinct search intent.

### 10.4 Structured Data

Recommended schema:

- `WebSite` on all pages
- `BreadcrumbList` on all non-home pages
- `FAQPage` only where real FAQs are present
- `ItemList` for value table, tier list, and rarity list where appropriate

### 10.5 Indexing

Required:

- Generate `sitemap.xml`
- Generate `robots.txt`
- Add canonical URLs
- Avoid noindex on MVP pages
- Submit sitemap in Google Search Console after launch

## 11. UX Requirements

The site should feel like a compact utility, not a marketing landing page.

Design principles:

- Mobile-first
- Fast to scan
- Dense but readable
- Clear table controls
- No oversized hero section
- No decorative content that pushes the tool below the fold
- Use clear badges for rarity, demand, and trend
- Keep color usage meaningful, not ornamental

Expected first viewport:

- Site name
- Short navigation
- H1
- Search input
- Core value table or calculator visible immediately

## 12. Monetization

MVP monetization should be light.

Initial phase:

- No ads until pages get meaningful traffic.
- Prioritize speed, indexing, and engagement.

Post-validation:

- Add display ads only after Search Console shows stable impressions/clicks.
- Avoid ad placement that blocks table usage.
- Recommended first ad locations:
  - One below the first screen
  - One after the table or calculator
  - One in long-form supporting sections

Expected revenue from the primary keyword alone is low. The business value comes from ranking the keyword cluster, not a single page.

## 13. Analytics And Validation

Required tracking:

- Google Search Console
- Basic web analytics

Key metrics:

- Indexed pages
- Impressions by query
- Clicks by query
- CTR by page
- Average position by query
- Top searched item names
- Calculator usage events
- Table filter/search usage

Validation timeline:

- Week 1: launch and submit sitemap
- Week 2: check indexing and early impressions
- Week 3-4: identify pages and queries gaining traction
- After Week 4: expand only pages with impressions or clear user demand

Success criteria for MVP:

- All 5 MVP pages indexed.
- At least 100 total Search Console impressions within 2-4 weeks.
- At least 3 keyword queries appearing in Search Console.
- Users interact with table search/filter or calculator.

## 14. Content Maintenance

Recommended update cadence:

- First week after launch: update data daily if possible.
- Weeks 2-4: update 2-3 times per week.
- After validation: update weekly or after major game changes.

Every update should include:

- Data file changes
- Updates page entry
- Updated `lastUpdated` timestamp
- Quick check that calculator and table still work

## 15. Legal And Trust Notes

Required disclaimer:

`Steal a Brainrot Values is a fan-made resource and is not affiliated with Roblox, Steal a Brainrot, or their creators. Values are estimates and may change at any time.`

Trust requirements:

- Do not claim values are official.
- Do not encourage scams, exploits, hacks, or unauthorized trading.
- Avoid using copyrighted assets unless usage is allowed.
- Prefer simple placeholders or user-created/fair-use-safe assets if image rights are unclear.

## 16. MVP Milestones

### Milestone 1: Foundation

- Create project structure.
- Add shared data file.
- Add layout, navigation, sitemap, robots, and metadata.

### Milestone 2: Core Pages

- Build Values page.
- Build Calculator page.
- Build Tier List page.
- Build Rarity List page.
- Build Updates page.

### Milestone 3: SEO And QA

- Add page titles and descriptions.
- Add structured data.
- Verify mobile layout.
- Verify all internal links.
- Verify no client-side blank states for core content.

### Milestone 4: Launch

- Deploy.
- Submit sitemap to Google Search Console.
- Record baseline query and page metrics.

## 17. Acceptance Criteria

The MVP is ready to launch when:

- Values table loads with real seed data.
- Search, filters, and sorting work.
- Calculator can compare both sides of a trade.
- Tier list and rarity list render from the same data source.
- Updates page has at least one initial changelog entry.
- All 5 pages have unique titles and meta descriptions.
- Sitemap and robots files are available.
- Site is usable on mobile.
- No paid API is required.
- No LLM API is required.
- Pages are crawlable and not blocked from indexing.

## 18. Recommended MVP Scope

Build the small tool cluster immediately, not a single page.

Recommended first release:

- `/`
- `/calculator/`
- `/tier-list/`
- `/rarity-list/`
- `/updates/`

Do not build individual item pages until Search Console shows enough impressions for item-name queries.
