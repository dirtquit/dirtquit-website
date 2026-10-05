import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { CITIES } from "../src/data/cities.ts";
import { CATEGORIES } from "../src/data/categories.ts";

const BASE_URL = "https://www.dirtquit.info";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.resolve(__dirname, "../public");
const sitemapPath = path.join(publicDir, "sitemap.xml");

interface SitemapEntry {
  url: string;
  changefreq: "daily" | "weekly" | "monthly";
  priority: number;
}

const entries: SitemapEntry[] = [];

// 1. Homepage
entries.push({
  url: `${BASE_URL}/`,
  changefreq: "weekly",
  priority: 1.0,
});

// 2. Service Locations Directory
entries.push({
  url: `${BASE_URL}/service-locations/`,
  changefreq: "weekly",
  priority: 0.8,
});

// 3. For each active live city in cities data
for (const city of CITIES) {
  if (!city.isLive) continue;

  // City Hub
  entries.push({
    url: `${BASE_URL}/${city.slug}/`,
    changefreq: "weekly",
    priority: 0.9,
  });

  // Category in City Pages
  for (const category of CATEGORIES) {
    entries.push({
      url: `${BASE_URL}/${city.slug}/${category.slug}/`,
      changefreq: "weekly",
      priority: 0.85,
    });
  }
}

const currentDate = new Date().toISOString().split("T")[0];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries
  .map(
    (e) => `  <url>
    <loc>${e.url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${e.changefreq}</changefreq>
    <priority>${e.priority.toFixed(2)}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>
`;

fs.writeFileSync(sitemapPath, xml, "utf-8");
console.log(`Generated sitemap with ${entries.length} URLs at ${sitemapPath}`);
