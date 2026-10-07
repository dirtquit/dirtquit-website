import type { BlogPost, BlogFaqItem, BlogAuthor } from "@/data/blogTypes";
import { PHONE_DISPLAY } from "./dirtquit";

export const SITE_URL = "https://www.dirtquit.info";

/**
 * Generate Schema.org BreadcrumbList structured data
 */
export function generateBreadcrumbSchema(
  items: Array<{ name: string; url?: string }>,
  baseUrl: string = SITE_URL,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => {
      const entry: Record<string, unknown> = {
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
      };
      if (item.url) {
        entry["item"] = item.url.startsWith("http") ? item.url : `${baseUrl}${item.url}`;
      }
      return entry;
    }),
  };
}

/**
 * Generate Schema.org BlogPosting or Article structured data with nested Person & Publisher
 */
export function generateArticleSchema(post: BlogPost, baseUrl: string = SITE_URL) {
  const canonical = post.seo.canonicalUrl || `${baseUrl}/blog/${post.slug}/`;
  const image = post.featuredImage.src.startsWith("http")
    ? post.featuredImage.src
    : `${baseUrl}${post.featuredImage.src}`;

  return {
    "@context": "https://schema.org",
    "@type": post.seo.schemaType || "BlogPosting",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonical,
    },
    headline: post.title,
    description: post.seo.metaDescription || post.excerpt,
    image: [image],
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    author: {
      "@type": "Person",
      name: post.author.name,
      jobTitle: post.author.role,
      description: post.author.bio,
      image: post.author.avatar.startsWith("http")
        ? post.author.avatar
        : `${baseUrl}${post.author.avatar}`,
      knowsAbout: post.author.credentials || ["Home Cleaning", "Sanitization", "Hygiene Auditing"],
    },
    publisher: {
      "@type": "Organization",
      name: "Dirt Quit",
      url: baseUrl,
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/logo.png`,
      },
      contactPoint: {
        "@type": "ContactPoint",
        telephone: PHONE_DISPLAY,
        contactType: "customer service",
      },
    },
    articleSection: post.category.title,
    keywords: [
      post.seo.primaryKeyword,
      ...(post.seo.secondaryKeywords || []),
      "Bengaluru",
      "Home Cleaning",
    ]
      .filter(Boolean)
      .join(", "),
  };
}

/**
 * Generate Schema.org FAQPage structured data (strictly when real FAQs exist)
 */
export function generateFaqSchema(faqs: BlogFaqItem[]) {
  if (!faqs || faqs.length === 0) return null;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

/**
 * Generate Schema.org CollectionPage / Blog for listing pages
 */
export function generateBlogIndexSchema(posts: BlogPost[], baseUrl: string = SITE_URL) {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Dirt Quit Cleaning Knowledge Hub",
    description:
      "Expert, answer-first guides on home deep cleaning, apartment sanitization, stain removal, and pest prevention in Bengaluru.",
    url: `${baseUrl}/blog/`,
    publisher: {
      "@type": "Organization",
      name: "Dirt Quit",
      url: baseUrl,
      logo: `${baseUrl}/logo.png`,
    },
    blogPost: posts.slice(0, 10).map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      url: `${baseUrl}/blog/${p.slug}/`,
      datePublished: p.publishedAt,
      author: {
        "@type": "Person",
        name: p.author.name,
      },
    })),
  };
}
