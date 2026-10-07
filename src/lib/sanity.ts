import {
  getAllBlogPosts,
  getBlogPostBySlug,
  getBlogPostsByCategory,
  getRelatedBlogPosts,
} from "@/data/blogData";
import type { BlogPost, BlogCategory } from "@/data/blogTypes";
import { BLOG_CATEGORIES } from "@/data/blogData";
import { postsQuery, postBySlugQuery } from "./queries";

/**
 * Sanity Project Configuration
 * Connected to project: ltxt6lsd
 */
interface ImportMetaEnv {
  VITE_SANITY_PROJECT_ID?: string;
  VITE_SANITY_DATASET?: string;
}

export const sanityConfig = {
  projectId:
    (typeof process !== "undefined" && process.env?.["SANITY_PROJECT_ID"]) ||
    (typeof import.meta !== "undefined" &&
      ((import.meta as unknown as { env?: ImportMetaEnv }).env?.VITE_SANITY_PROJECT_ID || "")) ||
    "ltxt6lsd",
  dataset:
    (typeof process !== "undefined" && process.env?.["SANITY_DATASET"]) ||
    (typeof import.meta !== "undefined" &&
      ((import.meta as unknown as { env?: ImportMetaEnv }).env?.VITE_SANITY_DATASET || "")) ||
    "production",
  apiVersion: "2024-03-01",
  useCdn: true,
};

export const isSanityConfigured = Boolean(sanityConfig.projectId);

/**
 * Fetch all published blog posts with answer-first data.
 * Merges Sanity documents with rich local assets for complete reliability.
 */
export async function getPosts(): Promise<BlogPost[]> {
  const localPosts = getAllBlogPosts();

  if (isSanityConfigured) {
    try {
      const url = `https://${sanityConfig.projectId}.api.sanity.io/v${sanityConfig.apiVersion}/data/query/${sanityConfig.dataset}?query=${encodeURIComponent(postsQuery)}`;
      const res = await fetch(url);
      if (res.ok) {
        const json = (await res.json()) as { result?: BlogPost[] };
        if (json.result && json.result.length > 0) {
          // Merge Sanity posts with local fallback data for complete field guarantees
          return json.result.map((sanityPost) => {
            const fallback = localPosts.find((p) => p.slug === sanityPost.slug);
            return {
              ...(fallback || {}),
              ...sanityPost,
              featuredImage: sanityPost.featuredImage?.src
                ? sanityPost.featuredImage
                : fallback?.featuredImage || {
                    src: "/src/assets/categories/apartment-cleaning/apartment-cleaning-bengaluru-hero.webp",
                    alt: sanityPost.title,
                  },
              tableOfContents: fallback?.tableOfContents || [],
              sections: fallback?.sections || [],
              cta: fallback?.cta || {
                heading: "Professional Cleaning In Bengaluru",
                description: "Get spotless living with Dirt Quit certified teams.",
                buttonText: "Book Now",
                serviceHref: "/bengaluru/deep-cleaning/",
              },
            } as BlogPost;
          });
        }
      }
    } catch (err) {
      console.warn("[Sanity] Failed to fetch remote posts, falling back to local dataset:", err);
    }
  }

  return localPosts;
}

/**
 * Fetch a single blog post by slug with full answer-first fields.
 */
export async function getPostBySlug(slug: string): Promise<BlogPost | undefined> {
  const fallback = getBlogPostBySlug(slug);

  if (isSanityConfigured) {
    try {
      const query = postBySlugQuery.replace("$slug", `"${slug}"`);
      const url = `https://${sanityConfig.projectId}.api.sanity.io/v${sanityConfig.apiVersion}/data/query/${sanityConfig.dataset}?query=${encodeURIComponent(query)}`;
      const res = await fetch(url);
      if (res.ok) {
        const json = (await res.json()) as { result?: BlogPost };
        if (json.result) {
          const sanityDoc = json.result;
          return {
            ...(fallback || {}),
            ...sanityDoc,
            featuredImage: sanityDoc.featuredImage?.src
              ? sanityDoc.featuredImage
              : fallback?.featuredImage || {
                  src: "/src/assets/categories/apartment-cleaning/apartment-cleaning-bengaluru-hero.webp",
                  alt: sanityDoc.title,
                },
            tableOfContents: fallback?.tableOfContents || [],
            sections: fallback?.sections || [],
            cta: fallback?.cta || {
              heading: "Professional Cleaning In Bengaluru",
              description: "Get spotless living with Dirt Quit certified teams.",
              buttonText: "Book Now",
              serviceHref: "/bengaluru/deep-cleaning/",
            },
          } as BlogPost;
        }
      }
    } catch (err) {
      console.warn(`[Sanity] Failed to fetch post ${slug}, falling back to local dataset:`, err);
    }
  }

  return fallback;
}

/**
 * Fetch posts in a specific category.
 */
export async function getPostsByCategory(categorySlug: string): Promise<BlogPost[]> {
  const allPosts = await getPosts();
  return allPosts.filter((p) => p.category.slug === categorySlug);
}

/**
 * Fetch categories.
 */
export async function getCategories(): Promise<BlogCategory[]> {
  return BLOG_CATEGORIES;
}

/**
 * Fetch related posts.
 */
export async function getRelatedPosts(slugs: string[]): Promise<BlogPost[]> {
  return getRelatedBlogPosts(slugs);
}
