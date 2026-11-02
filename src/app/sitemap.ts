import type { MetadataRoute } from "next";
import { brainrots, isVerifiedTradeValue, lastUpdated } from "@/lib/data";
import { absoluteUrl } from "@/lib/seo";

const routes = [
  { path: "/", lastModified: lastUpdated },
  { path: "/calculator/", lastModified: lastUpdated },
  { path: "/tier-list/", lastModified: lastUpdated },
  { path: "/rarity-list/", lastModified: lastUpdated },
  { path: "/updates/", lastModified: lastUpdated },
  { path: "/trading-values/", lastModified: lastUpdated },
  { path: "/methodology/", lastModified: lastUpdated },
  { path: "/privacy/", lastModified: "2026-07-13" },
  ...brainrots.map((item) => ({
    path: `/brainrots/${item.slug}/`,
    lastModified: isVerifiedTradeValue(item)
      ? item.valueSourceCheckedAt || item.lastUpdated
      : item.lastUpdated,
  })),
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: absoluteUrl(route.path),
    lastModified: new Date(route.lastModified),
  }));
}
