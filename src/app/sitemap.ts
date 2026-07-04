import type { MetadataRoute } from "next";
import { lastUpdated } from "@/lib/data";
import { absoluteUrl } from "@/lib/seo";

const routes = ["/", "/calculator/", "/tier-list/", "/rarity-list/", "/updates/"];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date(lastUpdated);

  return routes.map((route) => ({
    url: absoluteUrl(route),
    lastModified,
    changeFrequency: route === "/" ? "daily" : "weekly",
    priority: route === "/" ? 1 : 0.8,
  }));
}

