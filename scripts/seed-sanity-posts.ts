import { BLOG_POSTS } from "../src/data/blogData.ts";

const token =
  process.env["SANITY_API_TOKEN"] ||
  "skK5PB2DOsMOdSsTscfl4uBZ2ARexMvSFPI6v4sWdssBHob72WrK4iukLrAdlKAQ3d6YvCqLIWM6e7VlNM2wkcLifMyvVHytgHr2dyTWdISH5qD80C9agztBKhdk5S91EKBncqe1KiuzByHJJzpCoh5nhJGzZSwdFicxiqJyYTWXehODPAEk";

const categoryMap: Record<string, string> = {
  "deep-cleaning": "category-deep-cleaning",
  "kitchen-cleaning": "category-kitchen-cleaning",
  "sofa-cleaning": "category-sofa-cleaning",
  "move-in-cleaning": "category-move-in-cleaning",
  "bathroom-cleaning": "category-bathroom-cleaning",
};

const authorMap: Record<string, string> = {
  "arun-kumar": "author-arun-kumar",
  "priya-sundaram": "author-priya-sundaram",
};

async function seed() {
  const mutations = BLOG_POSTS.map((post) => {
    return {
      createOrReplace: {
        _id: `post-${post.slug}`,
        _type: "post",
        title: post.title,
        slug: { _type: "slug", current: post.slug },
        excerpt: post.excerpt,
        category: {
          _type: "reference",
          _ref: categoryMap[post.category.slug] || "category-deep-cleaning",
        },
        author: {
          _type: "reference",
          _ref: authorMap[post.author.slug] || "author-arun-kumar",
        },
        publishedAt: post.publishedAt,
        updatedAt: post.updatedAt,
        readingTimeMinutes: post.readingTimeMinutes,
        quickAnswer: post.quickAnswer,
        keyTakeaways: post.keyTakeaways,
        faqs: post.faqs.map((f) => ({
          _key: Math.random().toString(36).substring(2, 9),
          question: f.question,
          answer: f.answer,
        })),
        seo: {
          _type: "seoFields",
          seoTitle: post.seo.seoTitle,
          metaDescription: post.seo.metaDescription,
          primaryKeyword: post.seo.primaryKeyword,
          secondaryKeywords: post.seo.secondaryKeywords,
          schemaType: post.seo.schemaType || "BlogPosting",
          noIndex: post.seo.noIndex || false,
        },
      },
    };
  });

  const res = await fetch("https://ltxt6lsd.api.sanity.io/v2024-03-01/data/mutate/production", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ mutations }),
  });

  const data = await res.json();
  console.log("Seeded posts result:", JSON.stringify(data));
}

seed().catch(console.error);
