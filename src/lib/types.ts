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

export type ValueSourceType =
  | "official"
  | "verified-manual"
  | "community"
  | "unknown";

export type SourceReference = {
  label: string;
  url: string;
  checkedAt: string;
};

export type BrainrotItem = {
  id: string;
  name: string;
  slug: string;
  rarity: Rarity;
  value: number;
  valueSourceType: ValueSourceType;
  valueSourceLabel?: string;
  valueSourceUrl?: string;
  valueSourceCheckedAt?: string;
  demand: 1 | 2 | 3 | 4 | 5;
  trend: Trend;
  tier: Tier;
  obtainable: boolean;
  aliases: string[];
  notes: string;
  confidence: Confidence;
  sourceLabel: string;
  sourceUrl: string;
  additionalSources?: SourceReference[];
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

export type CommunityEstimateCandidate = {
  itemId: string;
  itemName: string;
  referenceValue: number;
  unitLabel: string;
  sourceLabel: string;
  sourceUrl: string;
  sourcePublishedAt: string;
  sourceCheckedAt: string;
  status: "Needs second source";
};
