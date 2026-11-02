import type {
  BrainrotItem,
  CommunityEstimateCandidate,
  Rarity,
  Tier,
  ValueUpdate,
} from "./types";

export const lastUpdated = "2026-11-02";
const catalogLastUpdated = "2026-07-19";

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
  checkedAt: catalogLastUpdated,
};

const starPetsMarketplaceUrl = "https://starpets.gg/steal-brainrot";

function eldoradoOfferSearchUrl(itemName: string) {
  const query = new URLSearchParams({
    searchQuery: itemName,
  });

  return `https://www.eldorado.gg/steal-a-brainrot-brainrots/i/259?${query.toString()}`;
}

function tierForMarketplacePrice(value: number): Tier {
  if (value >= 8) return "S";
  if (value >= 4) return "A";
  if (value >= 1) return "B";
  if (value >= 0.5) return "C";
  return "D";
}

const marketplaceSnapshotRows = [
  {
    name: "La Sahur Combinasion",
    baseIncomeMps: 2,
    starPetsCount: 7,
    starPetsPriceUsd: 1.48,
    eldoradoCount: 11,
    eldoradoSellers: 9,
    eldoradoMedianUsd: 1.5,
    spreadPercent: 1.4,
    consensusUsd: 1.49,
  },
  {
    name: "Rosey and Teddy",
    baseIncomeMps: 165,
    starPetsCount: 38,
    starPetsPriceUsd: 7.74,
    eldoradoCount: 14,
    eldoradoSellers: 12,
    eldoradoMedianUsd: 7.52,
    spreadPercent: 2.9,
    consensusUsd: 7.63,
  },
  {
    name: "Ketupat Bros",
    baseIncomeMps: 145,
    starPetsCount: 53,
    starPetsPriceUsd: 10.67,
    eldoradoCount: 11,
    eldoradoSellers: 11,
    eldoradoMedianUsd: 10.99,
    spreadPercent: 3,
    consensusUsd: 10.83,
  },
  {
    name: "Globa Steppa",
    baseIncomeMps: 27.5,
    starPetsCount: 9,
    starPetsPriceUsd: 1.87,
    eldoradoCount: 16,
    eldoradoSellers: 16,
    eldoradoMedianUsd: 1.99,
    spreadPercent: 6.4,
    consensusUsd: 1.93,
  },
  {
    name: "Brunito Marsito",
    baseIncomeMps: 3.5,
    starPetsCount: 5,
    starPetsPriceUsd: 1.07,
    eldoradoCount: 9,
    eldoradoSellers: 9,
    eldoradoMedianUsd: 1,
    spreadPercent: 7,
    consensusUsd: 1.04,
  },
  {
    name: "Duggy Bros",
    baseIncomeMps: 90,
    starPetsCount: 46,
    starPetsPriceUsd: 9.34,
    eldoradoCount: 4,
    eldoradoSellers: 4,
    eldoradoMedianUsd: 10.25,
    spreadPercent: 9.7,
    consensusUsd: 9.79,
  },
  {
    name: "La Spooky Grande",
    baseIncomeMps: 24.5,
    starPetsCount: 5,
    starPetsPriceUsd: 1.07,
    eldoradoCount: 6,
    eldoradoSellers: 6,
    eldoradoMedianUsd: 1.195,
    spreadPercent: 11.7,
    consensusUsd: 1.13,
  },
  {
    name: "Cloverat Clapat",
    baseIncomeMps: 60,
    starPetsCount: 13,
    starPetsPriceUsd: 2.67,
    eldoradoCount: 9,
    eldoradoSellers: 9,
    eldoradoMedianUsd: 2.99,
    spreadPercent: 12,
    consensusUsd: 2.83,
  },
  {
    name: "Eviledon",
    baseIncomeMps: 31.5,
    starPetsCount: 4,
    starPetsPriceUsd: 0.94,
    eldoradoCount: 15,
    eldoradoSellers: 15,
    eldoradoMedianUsd: 0.82,
    spreadPercent: 14.6,
    consensusUsd: 0.88,
  },
  {
    name: "Spooky and Pumpky",
    baseIncomeMps: 80,
    starPetsCount: 17,
    starPetsPriceUsd: 3.5,
    eldoradoCount: 12,
    eldoradoSellers: 12,
    eldoradoMedianUsd: 3.05,
    spreadPercent: 14.8,
    consensusUsd: 3.27,
  },
] as const;

const marketplaceValueItems: BrainrotItem[] = marketplaceSnapshotRows.map(
  (row) => {
    const slug = row.name.toLowerCase().replaceAll(" ", "-");
    const eldoradoUrl = eldoradoOfferSearchUrl(row.name);

    return {
      id: slug,
      name: row.name,
      slug,
      rarity: "Secret",
      value: row.consensusUsd,
      valueSourceType: "verified-marketplace",
      valueSourceLabel:
        "StarPets current catalog price + Eldorado Default listing median",
      valueSourceUrl: starPetsMarketplaceUrl,
      valueSourceCheckedAt: lastUpdated,
      demand: 1,
      trend: "Unknown",
      tier: tierForMarketplacePrice(row.consensusUsd),
      obtainable: true,
      aliases: [row.name.toLowerCase()],
      notes: `Default variant with ${row.baseIncomeMps}M/s base income. The ${formatMarketplacePrice(row.consensusUsd)} figure is a source-balanced active marketplace asking price, not an official or player-to-player trade value.`,
      baseIncomeText: `${row.baseIncomeMps}M/s`,
      baseIncomeMps: row.baseIncomeMps,
      confidence: "Medium",
      sourceLabel: "StarPets Steal a Brainrot marketplace",
      sourceUrl: starPetsMarketplaceUrl,
      additionalSources: [
        {
          label: "Eldorado exact-item offer search",
          url: eldoradoUrl,
          checkedAt: lastUpdated,
        },
      ],
      marketplaceEvidence: {
        metric: "marketplace-asking-price",
        currency: "USD",
        variant: "Default",
        baseIncomeMps: row.baseIncomeMps,
        consensusUsd: row.consensusUsd,
        sourcePriceSpreadPercent: row.spreadPercent,
        sources: [
          {
            label: "StarPets",
            url: starPetsMarketplaceUrl,
            listingCount: row.starPetsCount,
            askingPriceUsd: row.starPetsPriceUsd,
            pricingMethod: "current-catalog-price",
          },
          {
            label: "Eldorado",
            url: eldoradoUrl,
            listingCount: row.eldoradoCount,
            askingPriceUsd: row.eldoradoMedianUsd,
            pricingMethod: "median-listing-price",
            distinctSellers: row.eldoradoSellers,
          },
        ],
      },
      lastUpdated,
    };
  },
);

export function formatMarketplacePrice(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

const catalogCrossCheckRows: Array<{
  name: string;
  rarity: Rarity;
  aliases: string[];
  notes: string;
}> = [
  {
    name: "Popcuru and Fizzuru",
    rarity: "Secret",
    aliases: ["popcuru and fizuru", "popcuru", "fizzuru", "fizuru"],
    notes:
      "StarPets and Eldorado confirm Popcuru and Fizzuru as an obtainable Secret Brainrot with 170M/s Default base income. StarPets currently has no Default inventory while Eldorado lists 347 offers starting at $1.29, so the trade value remains TBD.",
  },
  {
    name: "Bumbatron",
    rarity: "Secret",
    aliases: ["bumbatron sab"],
    notes:
      "Eldorado confirms Bumbatron as a Secret Brainrot with 172.5M/s Default base income across 86 active offers (starting at $5.98, Default median around $6.80). StarPets has not yet indexed Default listings for a two-source comparison, so the trade value remains TBD.",
  },
  {
    name: "Las Sis",
    rarity: "Secret",
    aliases: ["las sis"],
    notes:
      "StarPets and Eldorado confirm Las Sis as a Secret Brainrot with 17.5M/s Default base income. Current StarPets Default catalog price ($0.95) and eligible Eldorado Default listing median ($0.50) differ by 90%, exceeding the 15% verification rule, so the value remains TBD.",
  },
  {
    name: "Quackini Snackini",
    rarity: "Secret",
    aliases: ["quackini"],
    notes:
      "StarPets and Eldorado confirm Quackini Snackini as a Secret Brainrot with 65M/s Default base income. Current StarPets Default catalog price ($4.28) and eligible Eldorado Default listing median ($3.65) differ by 17.4%, just above the 15% threshold, so the value remains TBD.",
  },
  {
    name: "Reinito Sleighito",
    rarity: "Secret",
    aliases: ["reinito"],
    notes:
      "StarPets and Eldorado confirm Reinito Sleighito as a Secret Brainrot with 140M/s Default base income. Current StarPets Default catalog price ($4.26) and eligible Eldorado Default listing median ($3.50) differ by 21.7%, exceeding the 15% spread cap, so the value remains TBD.",
  },
  {
    name: "Gobblino Uniciclino",
    rarity: "Secret",
    aliases: ["gobblino"],
    notes:
      "StarPets and Eldorado confirm Gobblino Uniciclino as a Secret Brainrot with 27.5M/s Default base income. Current StarPets Default catalog price ($0.75) and eligible Eldorado Default listing median ($1.00) differ by 33.3%, so the value remains TBD.",
  },
  {
    name: "Nacho Spyder",
    rarity: "Secret",
    aliases: ["nacho"],
    notes:
      "StarPets and Eldorado confirm Nacho Spyder as a Secret Brainrot with 50M/s Default base income. StarPets lists Default at $0.80, while the price-sorted Eldorado Default 50M/s sample has fewer than three distinct sellers, so the value remains TBD.",
  },
  {
    name: "Garama and Madundung",
    rarity: "Secret",
    aliases: ["garama", "madundung", "candy garama"],
    notes:
      "StarPets and Eldorado confirm Garama and Madundung as a Secret Brainrot with 50M/s Default base income (and 200M/s for the Candy mutation). Current Default source prices ($1.20 on StarPets vs. $1.55 Eldorado Default median) exceed the 15% spread cap, so the value remains TBD.",
  },
  {
    name: "Celularcini Viciosini",
    rarity: "Secret",
    aliases: ["celularcini"],
    notes:
      "StarPets and Eldorado confirm Celularcini Viciosini as a Secret Brainrot with 22.5M/s Default base income. StarPets currently has no Default inventory while Eldorado lists 73 offers starting at $1.90, so the value remains TBD.",
  },
  {
    name: "Los Fruits",
    rarity: "Secret",
    aliases: ["los fruits"],
    notes:
      "StarPets and Eldorado confirm Los Fruits as a Secret Brainrot with 23M/s Default base income. Current StarPets Default catalog price ($2.14) and eligible Eldorado Default listing median ($0.45) diverge beyond the 15% spread rule, so the value remains TBD.",
  },
  {
    name: "Capitano Gullini",
    rarity: "Secret",
    aliases: ["gullini"],
    notes:
      "StarPets and Eldorado confirm Capitano Gullini as a Secret Brainrot with 22M/s Default base income. StarPets currently has no Default inventory while Eldorado lists 105 offers starting at $0.20, so the value remains TBD.",
  },
  {
    name: "Los Mobilis",
    rarity: "Secret",
    aliases: ["mobilis"],
    notes:
      "StarPets and Eldorado confirm Los Mobilis as a Secret Brainrot with 22M/s Default base income. Current StarPets Default catalog price ($2.71) and eligible Eldorado Default listing median ($0.50) diverge beyond the 15% spread rule, so the value remains TBD.",
  },
  {
    name: "Spinny Hammy",
    rarity: "Secret",
    aliases: ["hammy"],
    notes:
      "StarPets and Eldorado confirm Spinny Hammy as a Secret Brainrot with 17M/s Default base income. StarPets currently has no Default inventory while Eldorado lists 68 offers starting at $0.50, so the value remains TBD.",
  },
  {
    name: "Jolly Jolly Sahur",
    rarity: "Secret",
    aliases: ["jolly sahur"],
    notes:
      "StarPets and Eldorado confirm Jolly Jolly Sahur as a Secret Brainrot with 45M/s Default base income. Current StarPets Default catalog price ($2.31) and eligible Eldorado Default listing median ($1.40) differ by 65%, so the value remains TBD.",
  },
  {
    name: "Money Money Bros",
    rarity: "Secret",
    aliases: ["money bros"],
    notes:
      "StarPets and Eldorado confirm Money Money Bros as a Secret Brainrot with 47M/s Default base income. Current StarPets Default catalog price ($2.63) and eligible Eldorado Default listing median ($1.70) differ by 54.7%, so the value remains TBD.",
  },
  {
    name: "Los Candies",
    rarity: "Secret",
    aliases: ["candies"],
    notes:
      "StarPets and Eldorado confirm Los Candies as a Secret Brainrot with 23M/s Default base income. Returned to TBD on 2026-11-02 because StarPets currently has no Default inventory in stock.",
  },
  {
    name: "Los Cupids",
    rarity: "Secret",
    aliases: ["cupids"],
    notes:
      "StarPets and Eldorado confirm Los Cupids as a Secret Brainrot with 30M/s Default base income. Returned to TBD on 2026-11-02 because StarPets currently has no Default inventory in stock.",
  },
  {
    name: "Bearito Cabinito",
    rarity: "Secret",
    aliases: ["bearito"],
    notes:
      "StarPets and Eldorado confirm Bearito Cabinito as a Secret Brainrot with 72.5M/s Default base income. Returned to TBD on 2026-11-02 after StarPets ($3.87) and Eldorado Default median ($3.21) widened to a 20.6% spread.",
  },
  {
    name: "Fortunu and Cashuru",
    rarity: "Secret",
    aliases: ["fortunu", "cashuru"],
    notes:
      "StarPets and Eldorado confirm Fortunu and Cashuru as a Secret Brainrot with 130M/s Default base income. Returned to TBD on 2026-11-02 after StarPets ($6.66) and Eldorado Default median ($4.19) widened to a 58.9% spread.",
  },
  {
    name: "La Ginger Sekolah",
    rarity: "Secret",
    aliases: ["ginger sekolah"],
    notes:
      "StarPets and Eldorado confirm La Ginger Sekolah as a Secret Brainrot with 75M/s Default base income. Returned to TBD on 2026-11-02 after StarPets ($1.18) and Eldorado Default median ($0.99) widened to a 19.2% spread.",
  },
  {
    name: "Orcaledon",
    rarity: "Secret",
    aliases: ["orcaledon"],
    notes:
      "StarPets and Eldorado confirm Orcaledon as a Secret Brainrot with 40M/s Default base income. Returned to TBD on 2026-11-02 after StarPets ($0.87) and price-sorted Eldorado Default median ($0.745) widened to a 16.8% spread.",
  },
  {
    name: "Hydra Dragon Cannelloni",
    rarity: "Secret",
    aliases: ["hydra dragon", "cannelloni"],
    notes:
      "StarPets and Eldorado confirm Hydra Dragon Cannelloni as a Secret Brainrot with 300M/s Default base income. Returned to TBD on 2026-11-02 after StarPets ($35.97) and Eldorado Default median ($18.80) diverged beyond 15%.",
  },
  {
    name: "Foxini Lanternini",
    rarity: "Secret",
    aliases: ["foxini"],
    notes:
      "StarPets and Eldorado confirm Foxini Lanternini as a Secret Brainrot with 115M/s Default base income. Returned to TBD on 2026-11-02 after StarPets ($7.72) and Eldorado Default median ($5.63) widened to a 37.1% spread.",
  },
  {
    name: "Ginger Gerat",
    rarity: "Secret",
    aliases: ["gerat"],
    notes:
      "StarPets and Eldorado confirm Ginger Gerat as a Secret Brainrot with 75M/s Default base income. Returned to TBD on 2026-11-02 after StarPets ($29.34) and price-sorted Eldorado Default median ($24.50) widened to a 19.8% spread.",
  },
  {
    name: "Bombardiro Crocodilo",
    rarity: "Mythic",
    aliases: ["bombardiro", "crocodilo"],
    notes:
      "StarPets and Eldorado confirm Bombardiro Crocodilo as an obtainable Mythic Brainrot with $2.5K/s Default base income. Low-denomination listings ($0.05–$0.11) reflect minimum marketplace fees rather than a two-source consensus price, so trade value remains TBD.",
  },
  {
    name: "Bombombini Gusini",
    rarity: "Mythic",
    aliases: ["bombombini", "gusini"],
    notes:
      "StarPets and Eldorado confirm Bombombini Gusini as an obtainable Mythic Brainrot with $5K/s Default base income. Trade value remains TBD because sub-$0.10 listings do not meet the three-record depth and spread rules.",
  },
  {
    name: "Te Te Te Sahur",
    rarity: "Mythic",
    aliases: ["te te te"],
    notes:
      "StarPets and Eldorado confirm Te Te Te Sahur as an obtainable Mythic Brainrot with $9.5K/s Default base income. Trade value remains TBD because Default listings fail the three-record depth and 15% spread rules.",
  },
  {
    name: "Glorbo Fruttodrillo",
    rarity: "Legendary",
    aliases: ["glorbo", "fruttodrillo"],
    notes:
      "StarPets and Eldorado confirm Glorbo Fruttodrillo as an obtainable Legendary Brainrot with $750/s Default base income. Trade value remains TBD because Default marketplace listings do not meet the three-record depth and 15% spread thresholds.",
  },
  {
    name: "Quackula",
    rarity: "Legendary",
    aliases: ["quackula"],
    notes:
      "StarPets and Eldorado confirm Quackula as a Legendary Brainrot with $1.2K/s Default base income. Current StarPets Default catalog price ($2.67) and Eldorado listings starting at $0.20 diverge beyond 15%, so trade value remains TBD.",
  },
  {
    name: "Wombo Rollo",
    rarity: "Epic",
    aliases: ["wombo"],
    notes:
      "StarPets and Eldorado confirm Wombo Rollo as an Epic Brainrot with $275/s Default base income. Current StarPets Default catalog price ($2.60) and Eldorado listings starting at $0.50 diverge beyond 15%, so trade value remains TBD.",
  },
];

function extractBaseIncomeFields(notes: string): {
  baseIncomeText?: string;
  baseIncomeMps?: number;
} {
  const anchoredMatch = notes.match(
    /\$?(\d+(?:\.\d+)?[KM]?\/s)\s+Default base income/i,
  );
  const fallbackMatch = anchoredMatch ?? notes.match(/\$?(\d+(?:\.\d+)?[KM]?\/s)/);
  if (!fallbackMatch) {
    return {};
  }

  const baseIncomeText = fallbackMatch[1];
  if (baseIncomeText.endsWith("M/s")) {
    const parsedMps = Number.parseFloat(baseIncomeText);
    if (Number.isFinite(parsedMps)) {
      return { baseIncomeText, baseIncomeMps: parsedMps };
    }
  }

  return { baseIncomeText };
}

const catalogCrossCheckItems: BrainrotItem[] = catalogCrossCheckRows.map(
  (row) => {
    const slug = row.name.toLowerCase().replaceAll(" ", "-");
    return {
      id: slug,
      name: row.name,
      slug,
      rarity: row.rarity,
      value: 0,
      valueSourceType: "unknown",
      demand: 1,
      trend: "Unknown",
      tier: "D",
      obtainable: true,
      aliases: Array.from(new Set([row.name.toLowerCase(), ...row.aliases])),
      notes: row.notes,
      ...extractBaseIncomeFields(row.notes),
      confidence: "Medium",
      sourceLabel: "StarPets Steal a Brainrot marketplace",
      sourceUrl: starPetsMarketplaceUrl,
      additionalSources: [
        {
          label: "Eldorado exact-item offer search",
          url: eldoradoOfferSearchUrl(row.name),
          checkedAt: lastUpdated,
        },
      ],
      lastUpdated,
    };
  },
);

export const brainrots: BrainrotItem[] = [
  ...marketplaceValueItems,
  ...catalogCrossCheckItems,
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
    lastUpdated: catalogLastUpdated,
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
    lastUpdated: catalogLastUpdated,
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
    baseIncomeText: "1/s",
    confidence: "Medium",
    sourceLabel: "Steal a Brainrot Wiki (community-maintained catalog)",
    sourceUrl: "https://stealabrainrot.fandom.com/wiki/Noobini_Pizzanini",
    additionalSources: [communityCatalogCrossCheck],
    lastUpdated: catalogLastUpdated,
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
    baseIncomeText: "3/s",
    confidence: "Medium",
    sourceLabel: "Steal a Brainrot Wiki (community-maintained catalog)",
    sourceUrl: "https://stealabrainrot.fandom.com/wiki/Liril%C3%AC_Laril%C3%A0",
    additionalSources: [communityCatalogCrossCheck],
    lastUpdated: catalogLastUpdated,
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
    baseIncomeText: "5/s",
    confidence: "Medium",
    sourceLabel: "Steal a Brainrot Wiki (community-maintained catalog)",
    sourceUrl: "https://stealabrainrot.fandom.com/wiki/Tim_Cheese",
    additionalSources: [communityCatalogCrossCheck],
    lastUpdated: catalogLastUpdated,
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
    baseIncomeText: "9/s",
    confidence: "Medium",
    sourceLabel: "Steal a Brainrot Wiki (community-maintained catalog)",
    sourceUrl: "https://stealabrainrot.fandom.com/wiki/Talpa_Di_Fero",
    additionalSources: [communityCatalogCrossCheck],
    lastUpdated: catalogLastUpdated,
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
    baseIncomeText: "10/s",
    confidence: "Medium",
    sourceLabel: "Steal a Brainrot Wiki (community-maintained catalog)",
    sourceUrl: "https://stealabrainrot.fandom.com/wiki/Svinina_Bombardino",
    additionalSources: [communityCatalogCrossCheck],
    lastUpdated: catalogLastUpdated,
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
    baseIncomeText: "13/s",
    confidence: "Medium",
    sourceLabel: "Steal a Brainrot Wiki (community-maintained catalog)",
    sourceUrl: "https://stealabrainrot.fandom.com/wiki/Pipi_Kiwi",
    additionalSources: [communityCatalogCrossCheck],
    lastUpdated: catalogLastUpdated,
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
    baseIncomeText: "15/s",
    confidence: "Medium",
    sourceLabel: "Steal a Brainrot Wiki (community-maintained catalog)",
    sourceUrl: "https://stealabrainrot.fandom.com/wiki/Trippi_Troppi",
    additionalSources: [communityCatalogCrossCheck],
    lastUpdated: catalogLastUpdated,
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
    baseIncomeText: "30/s",
    confidence: "Medium",
    sourceLabel: "Steal a Brainrot Wiki (community-maintained catalog)",
    sourceUrl: "https://stealabrainrot.fandom.com/wiki/Gangster_Footera",
    additionalSources: [communityCatalogCrossCheck],
    lastUpdated: catalogLastUpdated,
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
    baseIncomeText: "40/s",
    confidence: "Medium",
    sourceLabel: "Steal a Brainrot Wiki (community-maintained catalog)",
    sourceUrl: "https://stealabrainrot.fandom.com/wiki/Boneca_Ambalabu",
    additionalSources: [communityCatalogCrossCheck],
    lastUpdated: catalogLastUpdated,
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
    baseIncomeText: "50/s",
    confidence: "Medium",
    sourceLabel: "Steal a Brainrot Wiki (community-maintained catalog)",
    sourceUrl: "https://stealabrainrot.fandom.com/wiki/Cacto_Hipopotamo",
    additionalSources: [communityCatalogCrossCheck],
    lastUpdated: catalogLastUpdated,
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
    sourceCheckedAt: catalogLastUpdated,
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
    sourceCheckedAt: catalogLastUpdated,
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
    sourceCheckedAt: catalogLastUpdated,
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
    sourceCheckedAt: catalogLastUpdated,
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
    sourceCheckedAt: catalogLastUpdated,
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
    sourceCheckedAt: catalogLastUpdated,
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
    sourceCheckedAt: catalogLastUpdated,
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
    sourceCheckedAt: catalogLastUpdated,
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
    sourceCheckedAt: catalogLastUpdated,
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
    sourceCheckedAt: catalogLastUpdated,
    status: "Needs second source",
  },
];

export const updates: ValueUpdate[] = [
  {
    id: "verified-marketplace-snapshot-2026-11-02",
    date: "2026-11-02",
    title: "Default marketplace prices refreshed and catalog expanded",
    summary:
      "Rechecked the calculator set against current StarPets catalog inventory and eligible Eldorado listings, and expanded the tracked Brainrot catalog across Secret, Mythic, Legendary, and Epic tiers.",
    changes: [
      {
        item: "Globa Steppa",
        type: "Decreased",
        previousValue: 5.79,
        newValue: 1.93,
        note: "Current StarPets catalog price ($1.87) and the eligible Eldorado listing median ($1.99) remain within 6.4%.",
      },
      {
        item: "Calculator set",
        type: "Note",
        note: "Added La Sahur Combinasion, Rosey and Teddy, Ketupat Bros, Brunito Marsito, Duggy Bros, La Spooky Grande, Cloverat Clapat, Eviledon, and Spooky and Pumpky. Returned Los Candies, Los Cupids, Bearito Cabinito, Fortunu and Cashuru, La Ginger Sekolah, Orcaledon, Hydra Dragon Cannelloni, Foxini Lanternini, and Ginger Gerat to TBD after current inventory or 15% spread checks failed.",
      },
      {
        item: "Tracked Brainrot catalog",
        type: "Added",
        note: "Added 30 source-checked Secret, Mythic, Legendary, and Epic Brainrots—including Popcuru and Fizzuru, Bumbatron, Las Sis, Quackini Snackini, Reinito Sleighito, Gobblino Uniciclino, Nacho Spyder, Garama and Madundung, and Glorbo Fruttodrillo—with Default base income and verification status notes.",
      },
      {
        item: "Evidence method",
        type: "Note",
        note: "All ten calculator-enabled rows have at least three StarPets records, three eligible Eldorado listings, three distinct Eldorado sellers, an exact Default/M/s match, and no more than 15% source spread.",
      },
    ],
  },
  {
    id: "verified-marketplace-snapshot-2026-08-02",
    date: "2026-08-02",
    title: "Default marketplace prices refreshed",
    summary:
      "Rechecked the calculator set against current StarPets catalog inventory and eligible Eldorado listings. Globa Steppa still qualified, while nine stale rows were replaced with stronger current matches.",
    changes: [
      {
        item: "Globa Steppa",
        type: "Decreased",
        previousValue: 7.54,
        newValue: 5.79,
        note: "Current StarPets catalog price and the eligible Eldorado listing median are within 7.2%.",
      },
      {
        item: "Calculator set",
        type: "Note",
        note: "Added Los Candies, Los Cupids, Bearito Cabinito, Fortunu and Cashuru, La Ginger Sekolah, Orcaledon, Hydra Dragon Cannelloni, Foxini Lanternini, and Ginger Gerat. Removed La Extinct Grande, La Supreme Combinasion, Rico Dinero, Celestial Pegasus, Los Burritos, Cooki and Milki, Eviledon, Los Fruits, and Cerberus because current inventory or source-spread rules failed.",
      },
      {
        item: "USD marketplace asking prices",
        type: "Note",
        note: "All ten published rows have at least three StarPets listings, three eligible Eldorado listings, three distinct Eldorado sellers, an exact Default/M/s match, and no more than 15% source spread.",
      },
      {
        item: "Evidence method",
        type: "Note",
        note: "Eldorado medians use eligible price-sorted listings after excluding mutation, income, item-name, and extra-payment conflicts. Consensus prices remain the rounded mean of the two source prices.",
      },
    ],
  },
  {
    id: "verified-marketplace-snapshot-2026-07-26",
    date: "2026-07-26",
    title: "Default marketplace prices refreshed",
    summary:
      "Rechecked the calculator set against current StarPets catalog inventory and eligible Eldorado listings. Four items still qualified and six were replaced after failing the current evidence rules.",
    changes: [
      {
        item: "Globa Steppa",
        type: "Increased",
        previousValue: 7.04,
        newValue: 7.54,
        note: "Current StarPets catalog price and the eligible Eldorado listing median remain within 1.1%.",
      },
      {
        item: "La Extinct Grande",
        type: "Decreased",
        previousValue: 1.52,
        newValue: 0.86,
        note: "Retained after an exact Default/23.5M/s check with 9.1% source spread.",
      },
      {
        item: "La Supreme Combinasion",
        type: "Decreased",
        previousValue: 57.98,
        newValue: 55.42,
        note: "Retained after an exact Default/200M/s check with 9.7% source spread.",
      },
      {
        item: "Rico Dinero",
        type: "Decreased",
        previousValue: 19.52,
        newValue: 17.66,
        note: "Retained after an exact Default/42.5M/s check with 3.9% source spread.",
      },
      {
        item: "Calculator set",
        type: "Note",
        note: "Added Celestial Pegasus, Los Burritos, Cooki and Milki, Eviledon, Los Fruits, and Cerberus. Removed Berryno, Los Puggies, La Grande Combinasion, Ketupat Bros, Reinito Sleighito, and Chicleteira Noelteira because current inventory or source-spread rules failed.",
      },
      {
        item: "Evidence method",
        type: "Note",
        note: "The source comparison now labels StarPets as a current catalog asking price and Eldorado as the median of eligible price-sorted listings. Extra-payment offers and titles that contradict the Default mutation are excluded.",
      },
    ],
  },
  {
    id: "verified-marketplace-snapshot-2026-07-19",
    date: "2026-07-19",
    title: "Default marketplace prices refreshed",
    summary:
      "Rechecked the full ten-item calculator set against current StarPets and Eldorado listings. Three previous items still qualified, and seven were replaced after failing the current evidence rules.",
    changes: [
      {
        item: "USD marketplace asking prices",
        type: "Note",
        note: "Refreshed all ten source-balanced prices. Every retained item still has at least three listings per source, at least three distinct Eldorado sellers, an exact Default/M/s match, and no more than 15% median spread.",
      },
      {
        item: "Previous snapshot",
        type: "Note",
        note: "Removed five items whose source medians diverged beyond 15% and two items with no current StarPets Default inventory. Added seven qualifying replacements.",
      },
      {
        item: "Calculator guidance",
        type: "Note",
        note: "Clarified the empty offer state so users are told to select an item and use Add instead of seeing a dead-end message.",
      },
    ],
  },
  {
    id: "verified-marketplace-snapshot-2026-07-14",
    date: "2026-07-14",
    title: "Ten Default marketplace prices verified",
    summary:
      "Enabled the calculator and asking-price tier list with ten Default items cross-checked across independent StarPets and Eldorado listings.",
    changes: [
      {
        item: "USD marketplace asking prices",
        type: "Added",
        note: "Added ten source-balanced USD asking prices. Each item has at least three listings per source, at least three distinct Eldorado sellers, an exact Default/M/s match, and no more than 15% median spread.",
      },
      {
        item: "Calculator and tier list",
        type: "Note",
        note: "Calculations and tiers are explicitly labeled as marketplace asking-price comparisons, not official or player-to-player trade values.",
      },
    ],
  },
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
];

export const tierOrder: Tier[] = ["S", "A", "B", "C", "D"];

export function formatValue(value: number) {
  if (value <= 0) {
    return "TBD";
  }

  return formatMarketplacePrice(value);
}

export const minimumVerifiedTradeValues = 10;

export function isVerifiedTradeValue(item: BrainrotItem) {
  const hasRequiredSourceFields = Boolean(
    item.valueSourceLabel &&
      item.valueSourceUrl &&
      item.valueSourceCheckedAt,
  );

  if (item.valueSourceType === "verified-marketplace") {
    const evidence = item.marketplaceEvidence;

    return Boolean(
      item.value > 0 &&
        hasRequiredSourceFields &&
        evidence &&
        evidence.metric === "marketplace-asking-price" &&
        evidence.currency === "USD" &&
        evidence.variant === "Default" &&
        evidence.consensusUsd === item.value &&
        evidence.sourcePriceSpreadPercent <= 15 &&
        evidence.sources.length >= 2 &&
        evidence.sources.every((source) => source.listingCount >= 3) &&
        evidence.sources.every(
          (source) =>
            source.distinctSellers === undefined || source.distinctSellers >= 3,
        ),
    );
  }

  return (
    item.value > 0 &&
    (item.valueSourceType === "official" ||
      item.valueSourceType === "verified-manual") &&
    hasRequiredSourceFields
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

export function getRarityGroups() {
  return rarityOrder
    .map((rarity) => ({
      rarity,
      items: brainrots.filter((item) => item.rarity === rarity),
    }))
    .filter((group) => group.items.length > 0);
}

export function getTierGroups(
  sourceItems: BrainrotItem[] = getVerifiedTradeValueItems(),
) {
  const verifiedOnly = sourceItems.filter(isVerifiedTradeValue);
  return tierOrder.map((tier) => ({
    tier,
    items: verifiedOnly
      .filter((item) => item.tier === tier)
      .sort((a, b) => b.value - a.value),
  }));
}

export function getTotalTrackedValue() {
  const totalCents = getVerifiedTradeValueItems().reduce(
    (sum, item) => sum + Math.round(item.value * 100),
    0,
  );
  return totalCents / 100;
}

export function formatMpsPerDollar(baseIncomeMps: number, valueUsd: number) {
  if (valueUsd <= 0 || baseIncomeMps <= 0) {
    return "TBD";
  }
  const ratio = baseIncomeMps / valueUsd;
  return `${ratio.toFixed(1)}M/s per $1`;
}

export function getBrainrotBySlug(slug: string) {
  return brainrots.find((item) => item.slug === slug);
}

export function getRelatedBrainrots(item: BrainrotItem, limit = 6) {
  const sameRarity = brainrots.filter(
    (candidate) =>
      candidate.slug !== item.slug && candidate.rarity === item.rarity,
  );
  const sortedSameRarity = [...sameRarity].sort((a, b) => {
    const aVal = isVerifiedTradeValue(a) ? a.value : 0;
    const bVal = isVerifiedTradeValue(b) ? b.value : 0;
    return bVal - aVal || a.name.localeCompare(b.name);
  });

  if (sortedSameRarity.length >= limit) {
    return sortedSameRarity.slice(0, limit);
  }

  const fallbackVerified = getVerifiedTradeValueItems()
    .filter(
      (candidate) =>
        candidate.slug !== item.slug &&
        !sortedSameRarity.some((existing) => existing.slug === candidate.slug),
    )
    .sort((a, b) => b.value - a.value);

  return [...sortedSameRarity, ...fallbackVerified].slice(0, limit);
}

export function getCommunityCandidateForItem(itemId: string) {
  return communityEstimateCandidates.find(
    (candidate) => candidate.itemId === itemId,
  );
}
