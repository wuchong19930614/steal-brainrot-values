import type { MetadataRoute } from "next";
import { lastUpdated } from "@/lib/data";
import { absoluteUrl } from "@/lib/seo";

const routes = [
  "/",
  "/calculator/",
  "/tier-list/",
  "/rarity-list/",
  "/updates/",
  "/trading-values/",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: absoluteUrl(route),
    lastModified: new Date(
      route === "/trading-values/" ? "2026-07-10" : lastUpdated,
    ),
    changeFrequency: route === "/" ? "daily" : "weekly",
    priority: route === "/" ? 1 : 0.8,
  }));
}
