export type Rarity =
  | "Common"
  | "Rare"
  | "Epic"
  | "Legendary"
  | "Mythic"
  | "Secret"
  | "Limited"
  | "Unknown";

export type Trend = "Rising" | "Stable" | "Falling" | "Unstable" | "Unknown";

export type Tier = "S" | "A" | "B" | "C" | "D";

export type Confidence = "High" | "Medium" | "Low";

export type BrainrotItem = {
  id: string;
  name: string;
  slug: string;
  rarity: Rarity;
  value: number;
  demand: 1 | 2 | 3 | 4 | 5;
  trend: Trend;
  tier: Tier;
  obtainable: boolean;
  aliases: string[];
  notes: string;
  confidence: Confidence;
  sourceLabel: string;
  sourceUrl: string;
  lastUpdated: string;
};

export type ValueUpdate = {
  id: string;
  date: string;
  title: string;
  summary: string;
  changes: Array<{
    item: string;
    type: "Added" | "Increased" | "Decreased" | "Demand" | "Note";
    previousValue?: number;
    newValue?: number;
    note?: string;
  }>;
};
