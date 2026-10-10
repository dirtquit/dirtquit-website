import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { CITIES } from "../src/data/cities.ts";
import { CATEGORIES } from "../src/data/categories.ts";
import { BLOG_POSTS } from "../src/data/blogData.ts";

const BASE_URL = "https://www.dirtquit.info";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.resolve(__dirname, "../public");
const sitemapPath = path.join(publicDir, "sitemap.xml");

interface SitemapEntry {
  url: string;
  changefreq: "daily" | "weekly" | "monthly";
  priority: number;
  lastmod?: string;
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

// 3. Blog Knowledge Hub Index
entries.push({
  url: `${BASE_URL}/blog/`,
  changefreq: "daily",
  priority: 0.9,
});

// 4. Individual Blog Articles: published Sanity posts merged with local guides.
//    Noindex posts are left out so the sitemap never contradicts the page.
interface SitemapPost {
  slug: string;
  noIndex?: boolean | null;
  lastmod?: string | null;
}

async function fetchSanityPosts(): Promise<SitemapPost[]> {
  const projectId = process.env["SANITY_PROJECT_ID"] || "ltxt6lsd";
  const dataset = process.env["SANITY_DATASET"] || "production";
  const query = `*[_type == "post" && defined(slug.current) && !(_id in path("drafts.**"))]{
    "slug": slug.current, "noIndex": seo.noIndex, "lastmod": coalesce(updatedAt, publishedAt, _updatedAt)
  }`;
  try {
    const res = await fetch(
      `https://${projectId}.apicdn.sanity.io/v2024-03-01/data/query/${dataset}?query=${encodeURIComponent(query)}`,
    );
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = (await res.json()) as { result?: SitemapPost[] };
    return json.result ?? [];
  } catch (err) {
    console.warn("[sitemap] Could not reach Sanity, using local posts only:", err);
    return [];
  }
}

const blogPosts = new Map<string, SitemapPost>();
for (const post of BLOG_POSTS) {
  blogPosts.set(post.slug, {
    slug: post.slug,
    noIndex: post.seo?.noIndex ?? false,
    lastmod: post.updatedAt || post.publishedAt,
  });
}
for (const post of await fetchSanityPosts()) {
  blogPosts.set(post.slug, post);
}
for (const post of blogPosts.values()) {
  if (post.noIndex) continue;
  entries.push({
    url: `${BASE_URL}/blog/${post.slug}/`,
    changefreq: "weekly",
    priority: 0.85,
    ...(post.lastmod ? { lastmod: post.lastmod.split("T")[0] } : {}),
  });
}

// 5. For each active live city in cities data
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
    <lastmod>${e.lastmod || currentDate}</lastmod>
    <changefreq>${e.changefreq}</changefreq>
    <priority>${e.priority.toFixed(2)}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>
`;

fs.writeFileSync(sitemapPath, xml, "utf-8");
console.log(`Generated sitemap with ${entries.length} URLs at ${sitemapPath}`);
