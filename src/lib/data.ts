import type {
  BrainrotItem,
  CommunityEstimateCandidate,
  Rarity,
  Tier,
  ValueUpdate,
} from "./types";

export const lastUpdated = "2026-08-02";
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
    gameId: "259",
    category: "CustomItem",
    pageIndex: "1",
    pageSize: "20",
    searchQuery: itemName,
    useOfferAttributeSearch: "true",
    offerSortingCriterion: "Price",
    isAscending: "true",
  });

  return `https://www.eldorado.gg/api/v1/item-management/offers?${query.toString()}`;
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
    name: "Los Candies",
    baseIncomeMps: 23,
    starPetsCount: 5,
    starPetsPriceUsd: 1,
    eldoradoCount: 10,
    eldoradoSellers: 10,
    eldoradoMedianUsd: 0.995,
    spreadPercent: 0.5,
    consensusUsd: 1,
  },
  {
    name: "Los Cupids",
    baseIncomeMps: 30,
    starPetsCount: 5,
    starPetsPriceUsd: 1,
    eldoradoCount: 8,
    eldoradoSellers: 8,
    eldoradoMedianUsd: 0.98,
    spreadPercent: 2,
    consensusUsd: 0.99,
  },
  {
    name: "Bearito Cabinito",
    baseIncomeMps: 72.5,
    starPetsCount: 38,
    starPetsPriceUsd: 7.73,
    eldoradoCount: 8,
    eldoradoSellers: 8,
    eldoradoMedianUsd: 7.99,
    spreadPercent: 3.4,
    consensusUsd: 7.86,
  },
  {
    name: "Fortunu and Cashuru",
    baseIncomeMps: 130,
    starPetsCount: 72,
    starPetsPriceUsd: 14.4,
    eldoradoCount: 11,
    eldoradoSellers: 11,
    eldoradoMedianUsd: 14.99,
    spreadPercent: 4.1,
    consensusUsd: 14.7,
  },
  {
    name: "La Ginger Sekolah",
    baseIncomeMps: 75,
    starPetsCount: 6,
    starPetsPriceUsd: 1.33,
    eldoradoCount: 8,
    eldoradoSellers: 8,
    eldoradoMedianUsd: 1.27,
    spreadPercent: 4.7,
    consensusUsd: 1.3,
  },
  {
    name: "Orcaledon",
    baseIncomeMps: 40,
    starPetsCount: 6,
    starPetsPriceUsd: 1.32,
    eldoradoCount: 12,
    eldoradoSellers: 12,
    eldoradoMedianUsd: 1.25,
    spreadPercent: 5.6,
    consensusUsd: 1.29,
  },
  {
    name: "Hydra Dragon Cannelloni",
    baseIncomeMps: 300,
    starPetsCount: 133,
    starPetsPriceUsd: 26.6,
    eldoradoCount: 12,
    eldoradoSellers: 12,
    eldoradoMedianUsd: 25.15,
    spreadPercent: 5.8,
    consensusUsd: 25.88,
  },
  {
    name: "Globa Steppa",
    baseIncomeMps: 27.5,
    starPetsCount: 27,
    starPetsPriceUsd: 5.59,
    eldoradoCount: 16,
    eldoradoSellers: 15,
    eldoradoMedianUsd: 5.995,
    spreadPercent: 7.2,
    consensusUsd: 5.79,
  },
  {
    name: "Foxini Lanternini",
    baseIncomeMps: 115,
    starPetsCount: 46,
    starPetsPriceUsd: 9.32,
    eldoradoCount: 6,
    eldoradoSellers: 6,
    eldoradoMedianUsd: 8.6,
    spreadPercent: 8.4,
    consensusUsd: 8.96,
  },
  {
    name: "Ginger Gerat",
    baseIncomeMps: 75,
    starPetsCount: 249,
    starPetsPriceUsd: 49.91,
    eldoradoCount: 10,
    eldoradoSellers: 10,
    eldoradoMedianUsd: 46,
    spreadPercent: 8.5,
    consensusUsd: 47.96,
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

export const brainrots: BrainrotItem[] = [
  ...marketplaceValueItems,
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
  "Unknown",
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
