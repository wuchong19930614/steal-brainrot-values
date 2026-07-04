import type { BrainrotItem, Rarity, Tier, ValueUpdate } from "./types";

export const lastUpdated = "2026-07-04";

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

export const brainrots: BrainrotItem[] = [
  {
    id: "festive-67",
    name: "Festive 67",
    slug: "festive-67",
    rarity: "Limited",
    value: 0,
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
];

export const updates: ValueUpdate[] = [
  {
    id: "official-source-only-reset",
    date: lastUpdated,
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
  return brainrots.reduce((sum, item) => sum + item.value, 0);
}
