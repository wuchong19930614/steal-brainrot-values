import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";

const routes = ["/", "/calculator/", "/tier-list/", "/rarity-list/", "/updates/"];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: absoluteUrl(route),
    lastModified: new Date("2026-07-04"),
    changeFrequency: route === "/" ? "daily" : "weekly",
    priority: route === "/" ? 1 : 0.8,
  }));
}

