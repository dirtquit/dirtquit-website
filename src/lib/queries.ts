/**
 * GROQ Queries for Sanity CMS
 * Tailored for Dirt Quit's Answer-First Content Model
 */

const published = `_type == "post" && defined(slug.current) && !(_id in path("drafts.**"))`;

const cardFields = `
  _id,
  title,
  "slug": slug.current,
  excerpt,
  publishedAt,
  updatedAt,
  readingTimeMinutes,
  "category": category->{
    title,
    "slug": slug.current,
    description,
    pillarTopic
  },
  "author": author->{
    name,
    "slug": slug.current,
    role,
    bio,
    credentials,
    "avatar": avatar.asset->url
  },
  "featuredImage": {
    "src": featuredImage.asset->url,
    "alt": featuredImage.alt,
    "caption": featuredImage.caption
  },
  quickAnswer,
  keyTakeaways,
  "relatedSlugs": relatedPosts[]->slug.current,
  seo {
    seoTitle,
    metaDescription,
    canonicalUrl,
    noIndex,
    "ogImage": ogImage.asset->url,
    primaryKeyword,
    secondaryKeywords,
    schemaType
  }`;

export const postsQuery = `*[${published}] | order(publishedAt desc) {${cardFields}
}`;

/** Use with the `$slug` query parameter. */
export const postBySlugQuery = `*[${published} && slug.current == $slug][0] {${cardFields},
  body[] {
    ...,
    _type == "image" => { "url": asset->url }
  },
  faqs[] {
    question,
    answer
  },
  ctaHeading,
  ctaDescription,
  ctaText,
  ctaHref,
  searchIntent,
  targetAudience,
  internalLinksToInclude
}`;

/** Lightweight list for the sitemap. */
export const sitemapPostsQuery = `*[${published}] {
  "slug": slug.current,
  "noIndex": seo.noIndex,
  "lastmod": coalesce(updatedAt, publishedAt, _updatedAt)
}`;

export const categoriesQuery = `*[_type == "category"] | order(title asc) {
  _id,
  title,
  "slug": slug.current,
  description,
  pillarTopic
}`;
