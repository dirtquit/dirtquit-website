/**
 * Push the local guides in src/data/blogData.ts into Sanity, including the
 * full article body converted to Portable Text.
 *
 *   npm run sanity:seed            fill in missing fields only (safe, keeps Studio edits)
 *   npm run sanity:seed -- --force overwrite Sanity with the local version
 *
 * Needs SANITY_API_TOKEN (Editor rights) in .env.local. Never commit the token.
 */
import { BLOG_POSTS } from "../src/data/blogData.ts";
import type { BlogPost, ContentSection } from "../src/data/blogTypes.ts";

const projectId = process.env["SANITY_PROJECT_ID"] || "ltxt6lsd";
const dataset = process.env["SANITY_DATASET"] || "production";
const token = process.env["SANITY_API_TOKEN"];
const force = process.argv.includes("--force");

if (!token) {
  console.error("SANITY_API_TOKEN is not set. Add it to .env.local (see .env.example).");
  process.exit(1);
}

const categoryId = (slug: string) => `category-${slug}`;
const authorId = (slug: string) => `author-${slug}`;
const postId = (slug: string) => `post-${slug}`;

function textBlock(key: string, text: string, style = "normal", listItem?: string) {
  return {
    _type: "block",
    _key: key,
    style,
    ...(listItem ? { listItem, level: 1 } : {}),
    markDefs: [],
    children: [{ _type: "span", _key: `${key}s`, text, marks: [] }],
  };
}

function sectionToBlocks(section: ContentSection) {
  const k = section.id.replace(/[^a-zA-Z0-9]/g, "").slice(0, 20);
  const blocks: Record<string, unknown>[] = [textBlock(`${k}h2`, section.heading, "h2")];

  if (section.subheading) blocks.push(textBlock(`${k}h3`, section.subheading, "h3"));
  section.paragraphs.forEach((p, i) => blocks.push(textBlock(`${k}p${i}`, p)));
  section.bulletPoints?.forEach((b, i) =>
    blocks.push(textBlock(`${k}b${i}`, b, "normal", "bullet")),
  );

  if (section.calloutBox) {
    blocks.push({
      _type: "callout",
      _key: `${k}co`,
      tone: section.calloutBox.type,
      title: section.calloutBox.title,
      text: section.calloutBox.text,
    });
  }
  if (section.table) {
    blocks.push({
      _type: "comparisonTable",
      _key: `${k}tb`,
      headers: [...section.table.headers],
      rows: section.table.rows.map((r, i) => ({
        _type: "row",
        _key: `${k}r${i}`,
        cells: [r.parameter, r.diyApproach, r.dirtquitStandard, r.verdict],
      })),
    });
  }
  if (section.internalLink) {
    blocks.push({
      _type: "serviceLink",
      _key: `${k}sl`,
      anchor: section.internalLink.anchor,
      href: section.internalLink.href,
      ...(section.internalLink.badge ? { badge: section.internalLink.badge } : {}),
    });
  }
  return blocks;
}

function postFields(post: BlogPost) {
  return {
    title: post.title,
    slug: { _type: "slug", current: post.slug },
    excerpt: post.excerpt,
    category: { _type: "reference", _ref: categoryId(post.category.slug) },
    author: { _type: "reference", _ref: authorId(post.author.slug) },
    publishedAt: post.publishedAt,
    ...(post.updatedAt ? { updatedAt: post.updatedAt } : {}),
    readingTimeMinutes: post.readingTimeMinutes,
    quickAnswer: post.quickAnswer,
    keyTakeaways: post.keyTakeaways,
    body: post.sections.flatMap(sectionToBlocks),
    faqs: post.faqs.map((f, i) => ({
      _type: "object",
      _key: `faq${i}`,
      question: f.question,
      answer: f.answer,
    })),
    relatedPosts: post.relatedSlugs
      .filter((s) => BLOG_POSTS.some((p) => p.slug === s))
      .map((s, i) => ({ _type: "reference", _key: `rel${i}`, _ref: postId(s) })),
    ctaHeading: post.cta.heading,
    ctaDescription: post.cta.description,
    ctaText: post.cta.buttonText,
    ctaHref: post.cta.serviceHref,
    seo: {
      _type: "seoFields",
      ...(post.seo.seoTitle ? { seoTitle: post.seo.seoTitle } : {}),
      ...(post.seo.metaDescription ? { metaDescription: post.seo.metaDescription } : {}),
      ...(post.seo.primaryKeyword ? { primaryKeyword: post.seo.primaryKeyword } : {}),
      secondaryKeywords: post.seo.secondaryKeywords || [],
      schemaType: post.seo.schemaType || "BlogPosting",
      noIndex: post.seo.noIndex || false,
    },
  };
}

async function seed() {
  const mutations = BLOG_POSTS.flatMap((post) => {
    const _id = postId(post.slug);
    const fields = postFields(post);
    return [
      { createIfNotExists: { _id, _type: "post", ...fields } },
      { patch: { id: _id, [force ? "set" : "setIfMissing"]: fields } },
    ];
  });

  const res = await fetch(
    `https://${projectId}.api.sanity.io/v2024-03-01/data/mutate/${dataset}?returnIds=true`,
    {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({ mutations }),
    },
  );
  const data = (await res.json()) as { transactionId?: string; error?: unknown };
  if (!res.ok) {
    console.error("Seeding failed:", JSON.stringify(data, null, 2));
    process.exit(1);
  }
  console.log(
    `Seeded ${BLOG_POSTS.length} posts (${force ? "overwrite" : "fill missing"}), transaction ${data.transactionId}`,
  );
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
