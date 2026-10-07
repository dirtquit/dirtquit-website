/**
 * GROQ Queries for Sanity CMS
 * Tailored for Dirt Quit's Answer-First Content Model
 */

export const postsQuery = `*[_type == "post" && !(_id in path("drafts.**"))] | order(publishedAt desc) {
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
  seo {
    seoTitle,
    metaDescription,
    canonicalUrl,
    noIndex,
    "ogImage": ogImage.asset->url,
    primaryKeyword,
    secondaryKeywords,
    schemaType
  }
}`;

export const postBySlugQuery = `*[_type == "post" && slug.current == $slug && !(_id in path("drafts.**"))][0] {
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
  body,
  faqs[] {
    question,
    answer
  },
  "relatedPosts": relatedPosts[]-> {
    title,
    "slug": slug.current,
    excerpt,
    readingTimeMinutes,
    "category": category->{
      title,
      "slug": slug.current
    },
    "featuredImage": {
      "src": featuredImage.asset->url,
      "alt": featuredImage.alt
    }
  },
  searchIntent,
  targetAudience,
  ctaText,
  internalLinksToInclude,
  seo {
    seoTitle,
    metaDescription,
    canonicalUrl,
    noIndex,
    "ogImage": ogImage.asset->url,
    primaryKeyword,
    secondaryKeywords,
    schemaType
  }
}`;

export const postSlugsQuery = `*[_type == "post" && defined(slug.current) && !(_id in path("drafts.**"))][].slug.current`;

export const categoriesQuery = `*[_type == "category"] | order(title asc) {
  _id,
  title,
  "slug": slug.current,
  description,
  pillarTopic
}`;
