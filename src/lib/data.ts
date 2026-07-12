import type {
  BrainrotItem,
  CommunityEstimateCandidate,
  Rarity,
  Tier,
  ValueUpdate,
} from "./types";

export const lastUpdated = "2026-07-12";

export const officialSources = [
  {
    label: "Official Steal A Brainrot site",
    url: "https://playsab.com/",
    note: "Official merch and DLC site for Steal A Brainrot.",
  },
  {
    label: "Official Roblox experience",
    url: "https://www.roblox.com/games/109983668079237/Steal-a-Brainrot",
    note: "Official Roblox game page. It does not publish public trade values.",
  },
];

const communityCatalogCrossCheck = {
  label: "Driffle all-Brainrots guide (community reference)",
  url: "https://driffle.com/blog/steal-a-brainrot-all-brainrots-list/",
  checkedAt: lastUpdated,
};

export const brainrots: BrainrotItem[] = [
  {
    id: "festive-67",
    name: "Festive 67",
    slug: "festive-67",
    rarity: "Limited",
    value: 0,
    valueSourceType: "unknown",
    demand: 1,
    trend: "Unknown",
    tier: "D",
    obtainable: false,
    aliases: ["67", "festive 67 plush", "67 plush"],
    notes:
      "Official site confirms Festive 67 as an emailed DLC plush and a festive makeover of the 67 character. No official trade value was published.",
    confidence: "High",
    sourceLabel: "Official Steal A Brainrot product data",
    sourceUrl: "https://playsab.com/products/festive-67-plush-emailed-dlc-preorder",
    lastUpdated,
  },
  {
    id: "boppin-bunny",
    name: "Boppin Bunny",
    slug: "boppin-bunny",
    rarity: "Limited",
    value: 0,
    valueSourceType: "unknown",
    demand: 1,
    trend: "Unknown",
    tier: "D",
    obtainable: false,
    aliases: ["bobbin bunny", "bunny plush", "boppin bunny plush"],
    notes:
      "Official site confirms Boppin Bunny as an emailed DLC plush and limited Easter edition. No official trade value was published.",
    confidence: "High",
    sourceLabel: "Official Steal A Brainrot product data",
    sourceUrl: "https://playsab.com/products/mp9301-emailed-dlc",
    lastUpdated,
  },
  {
    id: "noobini-pizzanini",
    name: "Noobini Pizzanini",
    slug: "noobini-pizzanini",
    rarity: "Common",
    value: 0,
    valueSourceType: "unknown",
    demand: 1,
    trend: "Unknown",
    tier: "D",
    obtainable: true,
    aliases: ["noobini"],
    notes:
      "Community catalog lists this as an obtainable Common Brainrot from the Red Carpet. Its listed in-game cost is $25 and base income is $1/s; this is not a trade value.",
    confidence: "Medium",
    sourceLabel: "Steal a Brainrot Wiki (community-maintained catalog)",
    sourceUrl: "https://stealabrainrot.fandom.com/wiki/Noobini_Pizzanini",
    additionalSources: [communityCatalogCrossCheck],
    lastUpdated,
  },
  {
    id: "lirili-larila",
    name: "Lirilì Larilà",
    slug: "lirili-larila",
    rarity: "Common",
    value: 0,
    valueSourceType: "unknown",
    demand: 1,
    trend: "Unknown",
    tier: "D",
    obtainable: true,
    aliases: ["lirili larila", "lirilì larilà"],
    notes:
      "Community catalog lists this as an obtainable Common Brainrot from the Red Carpet. Its listed in-game cost is $250 and base income is $3/s; this is not a trade value.",
    confidence: "Medium",
    sourceLabel: "Steal a Brainrot Wiki (community-maintained catalog)",
    sourceUrl: "https://stealabrainrot.fandom.com/wiki/Liril%C3%AC_Laril%C3%A0",
    additionalSources: [communityCatalogCrossCheck],
    lastUpdated,
  },
  {
    id: "tim-cheese",
    name: "Tim Cheese",
    slug: "tim-cheese",
    rarity: "Common",
    value: 0,
    valueSourceType: "unknown",
    demand: 1,
    trend: "Unknown",
    tier: "D",
    obtainable: true,
    aliases: ["tim"],
    notes:
      "Community catalog lists this as an obtainable Common Brainrot from the Red Carpet. Its listed in-game cost is $500 and base income is $5/s; this is not a trade value.",
    confidence: "Medium",
    sourceLabel: "Steal a Brainrot Wiki (community-maintained catalog)",
    sourceUrl: "https://stealabrainrot.fandom.com/wiki/Tim_Cheese",
    additionalSources: [communityCatalogCrossCheck],
    lastUpdated,
  },
  {
    id: "talpa-di-fero",
    name: "Talpa Di Fero",
    slug: "talpa-di-fero",
    rarity: "Common",
    value: 0,
    valueSourceType: "unknown",
    demand: 1,
    trend: "Unknown",
    tier: "D",
    obtainable: true,
    aliases: ["talpa"],
    notes:
      "Community catalog lists this as an obtainable Common Brainrot from the Red Carpet. Its listed in-game cost is $1K and base income is $9/s; this is not a trade value.",
    confidence: "Medium",
    sourceLabel: "Steal a Brainrot Wiki (community-maintained catalog)",
    sourceUrl: "https://stealabrainrot.fandom.com/wiki/Talpa_Di_Fero",
    additionalSources: [communityCatalogCrossCheck],
    lastUpdated,
  },
  {
    id: "svinina-bombardino",
    name: "Svinina Bombardino",
    slug: "svinina-bombardino",
    rarity: "Common",
    value: 0,
    valueSourceType: "unknown",
    demand: 1,
    trend: "Unknown",
    tier: "D",
    obtainable: true,
    aliases: ["svinina"],
    notes:
      "Community sources agree this is an obtainable Common Brainrot from the Red Carpet, but the listed in-game cost differs: $1.25K in the primary catalog and $1.2K in the newer cross-check. This row uses the newer $1.2K figure and a $10/s base income; this is not a trade value.",
    confidence: "Medium",
    sourceLabel: "Steal a Brainrot Wiki (community-maintained catalog)",
    sourceUrl: "https://stealabrainrot.fandom.com/wiki/Svinina_Bombardino",
    additionalSources: [communityCatalogCrossCheck],
    lastUpdated,
  },
  {
    id: "pipi-kiwi",
    name: "Pipi Kiwi",
    slug: "pipi-kiwi",
    rarity: "Common",
    value: 0,
    valueSourceType: "unknown",
    demand: 1,
    trend: "Unknown",
    tier: "D",
    obtainable: true,
    aliases: ["pipi"],
    notes:
      "Community catalog lists this as an obtainable Common Brainrot from the Red Carpet. Its listed in-game cost is $1.5K and base income is $13/s; this is not a trade value.",
    confidence: "Medium",
    sourceLabel: "Steal a Brainrot Wiki (community-maintained catalog)",
    sourceUrl: "https://stealabrainrot.fandom.com/wiki/Pipi_Kiwi",
    additionalSources: [communityCatalogCrossCheck],
    lastUpdated,
  },
  {
    id: "trippi-troppi",
    name: "Trippi Troppi",
    slug: "trippi-troppi",
    rarity: "Rare",
    value: 0,
    valueSourceType: "unknown",
    demand: 1,
    trend: "Unknown",
    tier: "D",
    obtainable: true,
    aliases: ["trippi"],
    notes:
      "Community catalog lists this as an obtainable Rare Brainrot from the Red Carpet. Its listed in-game cost is $2K and base income is $15/s; this is not a trade value.",
    confidence: "Medium",
    sourceLabel: "Steal a Brainrot Wiki (community-maintained catalog)",
    sourceUrl: "https://stealabrainrot.fandom.com/wiki/Trippi_Troppi",
    additionalSources: [communityCatalogCrossCheck],
    lastUpdated,
  },
  {
    id: "gangster-footera",
    name: "Gangster Footera",
    slug: "gangster-footera",
    rarity: "Rare",
    value: 0,
    valueSourceType: "unknown",
    demand: 1,
    trend: "Unknown",
    tier: "D",
    obtainable: true,
    aliases: ["gangster"],
    notes:
      "Community catalog lists this as an obtainable Rare Brainrot from the Red Carpet. Its listed in-game cost is $4K and base income is $30/s; this is not a trade value.",
    confidence: "Medium",
    sourceLabel: "Steal a Brainrot Wiki (community-maintained catalog)",
    sourceUrl: "https://stealabrainrot.fandom.com/wiki/Gangster_Footera",
    additionalSources: [communityCatalogCrossCheck],
    lastUpdated,
  },
  {
    id: "boneca-ambalabu",
    name: "Boneca Ambalabu",
    slug: "boneca-ambalabu",
    rarity: "Rare",
    value: 0,
    valueSourceType: "unknown",
    demand: 1,
    trend: "Unknown",
    tier: "D",
    obtainable: true,
    aliases: ["boneca"],
    notes:
      "Community catalog lists this as an obtainable Rare Brainrot from the Red Carpet. Its listed in-game cost is $5K and base income is $40/s; this is not a trade value.",
    confidence: "Medium",
    sourceLabel: "Steal a Brainrot Wiki (community-maintained catalog)",
    sourceUrl: "https://stealabrainrot.fandom.com/wiki/Boneca_Ambalabu",
    additionalSources: [communityCatalogCrossCheck],
    lastUpdated,
  },
  {
    id: "cacto-hipopotamo",
    name: "Cacto Hipopotamo",
    slug: "cacto-hipopotamo",
    rarity: "Rare",
    value: 0,
    valueSourceType: "unknown",
    demand: 1,
    trend: "Unknown",
    tier: "D",
    obtainable: true,
    aliases: ["cacto"],
    notes:
      "Community catalog lists this as an obtainable Rare Brainrot from the Red Carpet. Its listed in-game cost is $6.5K and base income is $50/s; this is not a trade value.",
    confidence: "Medium",
    sourceLabel: "Steal a Brainrot Wiki (community-maintained catalog)",
    sourceUrl: "https://stealabrainrot.fandom.com/wiki/Cacto_Hipopotamo",
    additionalSources: [communityCatalogCrossCheck],
    lastUpdated,
  },
];

// These are kept separate from `brainrots` values on purpose. They come from
// one third-party list in a different reference-unit system and must not power
// the calculator or tier ranking until independently corroborated.
export const communityEstimateCandidates: CommunityEstimateCandidate[] = [
  {
    itemId: "noobini-pizzanini",
    itemName: "Noobini Pizzanini",
    referenceValue: 0.01,
    unitLabel: "La Vacca reference units",
    sourceLabel: "Pro Game Guides community value list",
    sourceUrl:
      "https://progameguides.com/roblox/steal-a-brainrot-trading-value-list-roblox/",
    sourcePublishedAt: "2026-03-01",
    sourceCheckedAt: lastUpdated,
    status: "Needs second source",
  },
  {
    itemId: "lirili-larila",
    itemName: "Lirilì Larilà",
    referenceValue: 0.01,
    unitLabel: "La Vacca reference units",
    sourceLabel: "Pro Game Guides community value list",
    sourceUrl:
      "https://progameguides.com/roblox/steal-a-brainrot-trading-value-list-roblox/",
    sourcePublishedAt: "2026-03-01",
    sourceCheckedAt: lastUpdated,
    status: "Needs second source",
  },
  {
    itemId: "tim-cheese",
    itemName: "Tim Cheese",
    referenceValue: 0.01,
    unitLabel: "La Vacca reference units",
    sourceLabel: "Pro Game Guides community value list",
    sourceUrl:
      "https://progameguides.com/roblox/steal-a-brainrot-trading-value-list-roblox/",
    sourcePublishedAt: "2026-03-01",
    sourceCheckedAt: lastUpdated,
    status: "Needs second source",
  },
  {
    itemId: "talpa-di-fero",
    itemName: "Talpa Di Fero",
    referenceValue: 0.02,
    unitLabel: "La Vacca reference units",
    sourceLabel: "Pro Game Guides community value list",
    sourceUrl:
      "https://progameguides.com/roblox/steal-a-brainrot-trading-value-list-roblox/",
    sourcePublishedAt: "2026-03-01",
    sourceCheckedAt: lastUpdated,
    status: "Needs second source",
  },
  {
    itemId: "svinina-bombardino",
    itemName: "Svinina Bombardino",
    referenceValue: 0.02,
    unitLabel: "La Vacca reference units",
    sourceLabel: "Pro Game Guides community value list",
    sourceUrl:
      "https://progameguides.com/roblox/steal-a-brainrot-trading-value-list-roblox/",
    sourcePublishedAt: "2026-03-01",
    sourceCheckedAt: lastUpdated,
    status: "Needs second source",
  },
  {
    itemId: "pipi-kiwi",
    itemName: "Pipi Kiwi",
    referenceValue: 0.02,
    unitLabel: "La Vacca reference units",
    sourceLabel: "Pro Game Guides community value list",
    sourceUrl:
      "https://progameguides.com/roblox/steal-a-brainrot-trading-value-list-roblox/",
    sourcePublishedAt: "2026-03-01",
    sourceCheckedAt: lastUpdated,
    status: "Needs second source",
  },
  {
    itemId: "trippi-troppi",
    itemName: "Trippi Troppi",
    referenceValue: 0.02,
    unitLabel: "La Vacca reference units",
    sourceLabel: "Pro Game Guides community value list",
    sourceUrl:
      "https://progameguides.com/roblox/steal-a-brainrot-trading-value-list-roblox/",
    sourcePublishedAt: "2026-03-01",
    sourceCheckedAt: lastUpdated,
    status: "Needs second source",
  },
  {
    itemId: "gangster-footera",
    itemName: "Gangster Footera",
    referenceValue: 0.03,
    unitLabel: "La Vacca reference units",
    sourceLabel: "Pro Game Guides community value list",
    sourceUrl:
      "https://progameguides.com/roblox/steal-a-brainrot-trading-value-list-roblox/",
    sourcePublishedAt: "2026-03-01",
    sourceCheckedAt: lastUpdated,
    status: "Needs second source",
  },
  {
    itemId: "boneca-ambalabu",
    itemName: "Boneca Ambalabu",
    referenceValue: 0.03,
    unitLabel: "La Vacca reference units",
    sourceLabel: "Pro Game Guides community value list",
    sourceUrl:
      "https://progameguides.com/roblox/steal-a-brainrot-trading-value-list-roblox/",
    sourcePublishedAt: "2026-03-01",
    sourceCheckedAt: lastUpdated,
    status: "Needs second source",
  },
  {
    itemId: "cacto-hipopotamo",
    itemName: "Cacto Hipopotamo",
    referenceValue: 0.04,
    unitLabel: "La Vacca reference units",
    sourceLabel: "Pro Game Guides community value list",
    sourceUrl:
      "https://progameguides.com/roblox/steal-a-brainrot-trading-value-list-roblox/",
    sourcePublishedAt: "2026-03-01",
    sourceCheckedAt: lastUpdated,
    status: "Needs second source",
  },
];

export const updates: ValueUpdate[] = [
  {
    id: "community-catalog-baseline-2026-07-12",
    date: "2026-07-12",
    title: "Community catalog baseline added",
    summary:
      "Added ten commonly obtainable in-game Brainrots from a community-maintained catalog. Names, rarity, availability, in-game cost, and base income are source-labeled; trade values remain TBD.",
    changes: [
      {
        item: "In-game Brainrot catalog",
        type: "Added",
        note: "Added ten Brainrots with a primary community catalog and an independent community cross-check for item facts. Svinina Bombardino has a $1.25K/$1.2K source discrepancy; the row uses the newer $1.2K figure.",
      },
      {
        item: "Trade values",
        type: "Note",
        note: "Added a separate list of ten single-source community estimate candidates. None qualifies as a verified trade value or enables the calculator or tier ranking.",
      },
    ],
  },
  {
    id: "official-source-audit-2026-07-07",
    date: "2026-07-07",
    title: "Official source audit",
    summary:
      "Checked the official product feed and Roblox universe metadata. No additional official trade values were found, so tracked values remain TBD.",
    changes: [
      {
        item: "Official product feed",
        type: "Note",
        note: "Only Festive 67 and Boppin Bunny were confirmed as Steal A Brainrot emailed DLC products; package protection was excluded.",
      },
      {
        item: "Roblox universe metadata",
        type: "Note",
        note: "The official place maps to universe 7709344486; public badge data did not expose item-level value data.",
      },
      {
        item: "Trade values",
        type: "Note",
        note: "No official public trade value list was found in the audited sources.",
      },
    ],
  },
  {
    id: "official-source-only-reset",
    date: "2026-07-04",
    title: "Official-source-only reset",
    summary:
      "Removed unverified beta estimates. The official sources checked did not publish a public trade value list, so values are marked TBD.",
    changes: [
      {
        item: "Festive 67",
        type: "Added",
        note: "Confirmed from the official Steal A Brainrot merch/DLC site.",
      },
      {
        item: "Boppin Bunny",
        type: "Added",
        note: "Confirmed from the official Steal A Brainrot merch/DLC site.",
      },
      {
        item: "Trade values",
        type: "Note",
        note: "Official Roblox and Steal A Brainrot public pages did not publish item trade values.",
      },
    ],
  },
];

export const rarityOrder: Rarity[] = [
  "Limited",
  "Secret",
  "Mythic",
  "Legendary",
  "Epic",
  "Rare",
  "Common",
  "Unknown",
];

export const tierOrder: Tier[] = ["S", "A", "B", "C", "D"];

export function formatValue(value: number) {
  if (value <= 0) {
    return "TBD";
  }

  return new Intl.NumberFormat("en-US").format(value);
}

export const minimumVerifiedTradeValues = 10;

export function isVerifiedTradeValue(item: BrainrotItem) {
  return (
    item.value > 0 &&
    (item.valueSourceType === "official" ||
      item.valueSourceType === "verified-manual") &&
    Boolean(
      item.valueSourceLabel &&
        item.valueSourceUrl &&
        item.valueSourceCheckedAt,
    )
  );
}

export function getVerifiedTradeValueItems(
  sourceItems: BrainrotItem[] = brainrots,
) {
  return sourceItems.filter(isVerifiedTradeValue);
}

export function formatTradeValue(item: BrainrotItem) {
  return isVerifiedTradeValue(item) ? formatValue(item.value) : "TBD";
}

export function formatCount(value: number) {
  return new Intl.NumberFormat("en-US").format(value);
}

export function getDemandLabel(demand: BrainrotItem["demand"]) {
  const labels = {
    1: "Unknown",
    2: "Fair",
    3: "Good",
    4: "High",
    5: "Hot",
  } as const;

  return labels[demand];
}

export function getRarityGroups() {
  return rarityOrder
    .map((rarity) => ({
      rarity,
      items: brainrots.filter((item) => item.rarity === rarity),
    }))
    .filter((group) => group.items.length > 0);
}

export function getTierGroups(sourceItems: BrainrotItem[] = brainrots) {
  return tierOrder.map((tier) => ({
    tier,
    items: sourceItems
      .filter((item) => item.tier === tier)
      .sort((a, b) => b.value - a.value),
  }));
}

export function getTotalTrackedValue() {
  return getVerifiedTradeValueItems().reduce((sum, item) => sum + item.value, 0);
}
