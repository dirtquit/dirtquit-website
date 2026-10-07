import { MetadataRoute } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.dirtquit.info";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/blog/`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/service-locations/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  // Dynamic Sanity posts query
  // Exclude any posts with noIndex === true to keep crawl signals pristine
  let postRoutes: MetadataRoute.Sitemap = [];
  try {
    const { getPosts } = await import("../lib/sanity");
    const posts = await getPosts();
    postRoutes = posts
      .filter((post) => !post.seo?.noIndex)
      .map((post) => ({
        url: `${BASE_URL}/blog/${post.slug}/`,
        lastModified: new Date(post.updatedAt || post.publishedAt),
        changeFrequency: "weekly",
        priority: 0.85,
      }));
  } catch (err) {
    console.error("Failed to generate blog routes for sitemap:", err);
  }

  return [...staticRoutes, ...postRoutes];
}
