import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";

const routes = [
  { path: "/", lastModified: "2026-07-13" },
  { path: "/calculator/", lastModified: "2026-07-13" },
  { path: "/tier-list/", lastModified: "2026-07-13" },
  { path: "/rarity-list/", lastModified: "2026-07-13" },
  { path: "/updates/", lastModified: "2026-07-13" },
  { path: "/trading-values/", lastModified: "2026-07-13" },
  { path: "/methodology/", lastModified: "2026-07-13" },
  { path: "/privacy/", lastModified: "2026-07-13" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: absoluteUrl(route.path),
    lastModified: new Date(route.lastModified),
  }));
}
