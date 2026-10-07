/* eslint-disable @typescript-eslint/no-explicit-any */
export default {
  name: "seoFields",
  title: "SEO & Social Metadata",
  type: "object",
  fields: [
    {
      name: "seoTitle",
      title: "SEO Title",
      type: "string",
      description: "Ideal length: 50-60 characters. Appears in search results.",
      validation: (Rule: any) =>
        Rule.max(70).warning("Longer than 70 characters may be truncated."),
    },
    {
      name: "metaDescription",
      title: "Meta Description",
      type: "text",
      rows: 3,
      description: "Ideal length: 140-160 characters. Concise summary of the page.",
      validation: (Rule: any) =>
        Rule.max(165).warning("Longer than 165 characters may be truncated."),
    },
    {
      name: "canonicalUrl",
      title: "Canonical URL",
      type: "url",
      description: "Leave empty to default to the current post canonical address.",
    },
    {
      name: "noIndex",
      title: "Noindex Toggle",
      type: "boolean",
      description: "Toggle on to exclude this page from search engine indexation.",
      initialValue: false,
    },
    {
      name: "ogImage",
      title: "Social Share / Open Graph Image",
      type: "image",
      options: {
        hotspot: true,
      },
    },
    {
      name: "primaryKeyword",
      title: "Primary Target Keyword",
      type: "string",
      description: "Main search query targeting this article.",
    },
    {
      name: "secondaryKeywords",
      title: "Secondary Keywords",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
    },
    {
      name: "schemaType",
      title: "Schema.org Article Type",
      type: "string",
      options: {
        list: [
          { title: "BlogPosting (Default)", value: "BlogPosting" },
          { title: "Article", value: "Article" },
          { title: "TechArticle", value: "TechArticle" },
        ],
      },
      initialValue: "BlogPosting",
    },
  ],
};
