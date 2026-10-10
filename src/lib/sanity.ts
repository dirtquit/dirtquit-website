import { getAllBlogPosts, getBlogPostBySlug, BLOG_CATEGORIES } from "@/data/blogData";
import type {
  BlogAuthor,
  BlogCategory,
  BlogFaqItem,
  BlogPost,
  BlogSeoFields,
} from "@/data/blogTypes";
import { readingTimeFromBody, tocFromBody, type PtBlock } from "./portableText";
import { postsQuery, postBySlugQuery } from "./queries";

/**
 * Sanity Project Configuration (project: ltxt6lsd).
 * The production dataset is public-read, so the site never needs a token.
 * SANITY_API_TOKEN is only used by scripts/ (seeding, migration).
 */
interface ImportMetaEnv {
  VITE_SANITY_PROJECT_ID?: string;
  VITE_SANITY_DATASET?: string;
}

const viteEnv =
  typeof import.meta !== "undefined"
    ? (import.meta as unknown as { env?: ImportMetaEnv }).env
    : undefined;

export const sanityConfig = {
  projectId:
    (typeof process !== "undefined" && process.env?.["SANITY_PROJECT_ID"]) ||
    viteEnv?.VITE_SANITY_PROJECT_ID ||
    "ltxt6lsd",
  dataset:
    (typeof process !== "undefined" && process.env?.["SANITY_DATASET"]) ||
    viteEnv?.VITE_SANITY_DATASET ||
    "production",
  apiVersion: "2024-03-01",
  useCdn: true,
};

export const isSanityConfigured = Boolean(sanityConfig.projectId);

const DEFAULT_IMAGE =
  "/src/assets/categories/apartment-cleaning/apartment-cleaning-bengaluru-hero.webp";

const DEFAULT_CTA: BlogPost["cta"] = {
  heading: "Professional Cleaning In Bengaluru",
  description: "Get spotless living with Dirt Quit certified teams.",
  buttonText: "Book Now",
  serviceHref: "/bengaluru/deep-cleaning/",
};

/** Run a GROQ query against the Sanity HTTP API. Returns undefined on any failure. */
export async function sanityFetch<T>(
  query: string,
  params: Record<string, string> = {},
): Promise<T | undefined> {
  if (!isSanityConfigured) return undefined;
  const host = sanityConfig.useCdn ? "apicdn.sanity.io" : "api.sanity.io";
  const search = new URLSearchParams({ query });
  for (const [key, value] of Object.entries(params)) {
    search.set(`$${key}`, JSON.stringify(value));
  }
  const url = `https://${sanityConfig.projectId}.${host}/v${sanityConfig.apiVersion}/data/query/${sanityConfig.dataset}?${search}`;
  try {
    const res = await fetch(url);
    if (!res.ok) {
      console.warn(`[Sanity] Query failed with ${res.status}`);
      return undefined;
    }
    const json = (await res.json()) as { result?: T };
    return json.result ?? undefined;
  } catch (err) {
    console.warn("[Sanity] Network error, falling back to local dataset:", err);
    return undefined;
  }
}

/** Shape returned by the GROQ queries. Everything may be missing on a half-filled draft. */
interface SanityPost {
  _id: string;
  title?: string;
  slug?: string;
  excerpt?: string;
  publishedAt?: string;
  updatedAt?: string;
  readingTimeMinutes?: number;
  category?: Partial<BlogCategory> | null;
  author?: (Partial<Omit<BlogAuthor, "avatar">> & { avatar?: string | null }) | null;
  featuredImage?: { src?: string | null; alt?: string | null; caption?: string | null };
  quickAnswer?: string;
  keyTakeaways?: string[] | null;
  relatedSlugs?: Array<string | null> | null;
  seo?: { [K in keyof BlogSeoFields]?: BlogSeoFields[K] | null } | null;
  body?: PtBlock[] | null;
  faqs?: BlogFaqItem[] | null;
  ctaHeading?: string | null;
  ctaDescription?: string | null;
  ctaText?: string | null;
  ctaHref?: string | null;
}

function compact<T extends object>(obj: T): { [K in keyof T]?: NonNullable<T[K]> } {
  return Object.fromEntries(
    Object.entries(obj).filter(([, v]) => v !== null && v !== undefined && v !== ""),
  ) as { [K in keyof T]?: NonNullable<T[K]> };
}

/**
 * Map a Sanity document onto the BlogPost shape the UI uses.
 * Sanity wins for every field it has; the local guide (same slug) fills any gaps.
 */
function toBlogPost(doc: SanityPost, fallback?: BlogPost): BlogPost | undefined {
  const slug = doc.slug || fallback?.slug;
  const title = doc.title || fallback?.title;
  if (!slug || !title) return undefined;

  const body = doc.body && doc.body.length > 0 ? doc.body : undefined;
  const category: BlogCategory = {
    ...(fallback?.category ?? BLOG_CATEGORIES[0]!),
    ...compact(doc.category ?? {}),
  };
  const fallbackAuthor = fallback?.author;
  const author: BlogAuthor = {
    name: "Dirt Quit Team",
    slug: "dirt-quit-team",
    role: "Cleaning Specialists",
    bio: "",
    ...fallbackAuthor,
    avatar: fallbackAuthor?.avatar || "/logo.png",
    ...compact(doc.author ?? {}),
  };
  const relatedSlugs = (doc.relatedSlugs ?? []).filter((s): s is string => Boolean(s));

  const post: BlogPost = {
    id: doc._id,
    title,
    slug,
    excerpt: doc.excerpt || fallback?.excerpt || "",
    category,
    author,
    publishedAt: doc.publishedAt || fallback?.publishedAt || new Date().toISOString(),
    readingTimeMinutes:
      doc.readingTimeMinutes ||
      (body ? readingTimeFromBody(body) : fallback?.readingTimeMinutes) ||
      5,
    featuredImage: doc.featuredImage?.src
      ? {
          src: doc.featuredImage.src,
          alt: doc.featuredImage.alt || title,
          ...(doc.featuredImage.caption ? { caption: doc.featuredImage.caption } : {}),
        }
      : fallback?.featuredImage || { src: DEFAULT_IMAGE, alt: title },
    quickAnswer: doc.quickAnswer || fallback?.quickAnswer || "",
    keyTakeaways: doc.keyTakeaways?.length ? doc.keyTakeaways : fallback?.keyTakeaways || [],
    tableOfContents: body ? tocFromBody(body) : fallback?.tableOfContents || [],
    sections: body ? [] : fallback?.sections || [],
    faqs: doc.faqs?.length ? doc.faqs : fallback?.faqs || [],
    relatedSlugs: relatedSlugs.length ? relatedSlugs : fallback?.relatedSlugs || [],
    cta: {
      ...(fallback?.cta ?? DEFAULT_CTA),
      ...compact({
        heading: doc.ctaHeading,
        description: doc.ctaDescription,
        buttonText: doc.ctaText,
        serviceHref: doc.ctaHref,
      }),
    },
    seo: { ...fallback?.seo, ...compact(doc.seo ?? {}) },
  };
  const updatedAt = doc.updatedAt || fallback?.updatedAt;
  if (updatedAt) post.updatedAt = updatedAt;
  if (body) post.body = body;
  return post;
}

/**
 * All published posts, newest first. Sanity posts are merged with the local
 * guides so nothing disappears if a post only exists in one place.
 */
export async function getPosts(): Promise<BlogPost[]> {
  const localPosts = getAllBlogPosts();
  const docs = await sanityFetch<SanityPost[]>(postsQuery);
  if (!docs || docs.length === 0) return localPosts;

  const fromSanity = docs
    .map((doc) =>
      toBlogPost(
        doc,
        localPosts.find((p) => p.slug === doc.slug),
      ),
    )
    .filter((p): p is BlogPost => Boolean(p));
  const sanitySlugs = new Set(fromSanity.map((p) => p.slug));
  const localOnly = localPosts.filter((p) => !sanitySlugs.has(p.slug));

  return [...fromSanity, ...localOnly].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
}

/** A single post with its full body. */
export async function getPostBySlug(slug: string): Promise<BlogPost | undefined> {
  const fallback = getBlogPostBySlug(slug);
  const doc = await sanityFetch<SanityPost>(postBySlugQuery, { slug });
  return doc ? toBlogPost(doc, fallback) : fallback;
}

export async function getPostsByCategory(categorySlug: string): Promise<BlogPost[]> {
  const allPosts = await getPosts();
  return allPosts.filter((p) => p.category.slug === categorySlug);
}

export async function getCategories(): Promise<BlogCategory[]> {
  return BLOG_CATEGORIES;
}

/**
 * Related posts for the topic cluster: hand-picked slugs first, then posts
 * from the same category, then the newest posts, up to `limit`.
 */
export function pickRelatedPosts(post: BlogPost, allPosts: BlogPost[], limit = 3): BlogPost[] {
  const others = allPosts.filter((p) => p.slug !== post.slug);
  const picked: BlogPost[] = [];
  const add = (p: BlogPost | undefined) => {
    if (p && picked.length < limit && !picked.some((x) => x.slug === p.slug)) picked.push(p);
  };
  post.relatedSlugs.forEach((s) => add(others.find((p) => p.slug === s)));
  others.filter((p) => p.category.slug === post.category.slug).forEach(add);
  others.forEach(add);
  return picked;
}
