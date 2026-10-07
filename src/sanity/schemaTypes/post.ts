/* eslint-disable @typescript-eslint/no-explicit-any */
export default {
  name: "post",
  title: "Blog Post",
  type: "document",
  groups: [
    { name: "content", title: "Editorial Content", default: true },
    { name: "answerFirst", title: "Answer-First & Takeaways" },
    { name: "seo", title: "SEO & Social" },
    { name: "editorGuidance", title: "Editor Guidance & Intent" },
  ],
  fields: [
    // Editorial Content
    {
      name: "title",
      title: "H1 Headline",
      type: "string",
      group: "content",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "slug",
      title: "URL Slug",
      type: "slug",
      group: "content",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "category" }],
      group: "content",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "author",
      title: "Author",
      type: "reference",
      to: [{ type: "author" }],
      group: "content",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "publishedAt",
      title: "Published Date",
      type: "datetime",
      group: "content",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "updatedAt",
      title: "Last Updated Date",
      type: "datetime",
      group: "content",
    },
    {
      name: "readingTimeMinutes",
      title: "Reading Time (Minutes)",
      type: "number",
      group: "content",
      initialValue: 5,
    },
    {
      name: "featuredImage",
      title: "Featured Cover Image",
      type: "image",
      group: "content",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Descriptive Alt Text",
          validation: (Rule: any) => Rule.required(),
        },
        {
          name: "caption",
          type: "string",
          title: "Caption",
        },
      ],
    },
    {
      name: "excerpt",
      title: "Introductory Excerpt / Lead",
      type: "text",
      rows: 3,
      group: "content",
      description: "Appears on listing cards and immediately after the title.",
    },

    // Answer-First & Key Takeaways
    {
      name: "quickAnswer",
      title: "Quick Direct Answer (2-4 sentences)",
      type: "text",
      rows: 4,
      group: "answerFirst",
      description: "Direct, front-loaded answer answering the search query above the fold.",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "keyTakeaways",
      title: "Key Takeaways (Bulleted Highlights)",
      type: "array",
      of: [{ type: "string" }],
      group: "answerFirst",
      description: "3-5 high-value scannable bullet points for instant reading.",
      validation: (Rule: any) => Rule.min(2).warning("Provide at least 2 key takeaways."),
    },

    // Rich Body Content
    {
      name: "body",
      title: "Article Body",
      type: "array",
      group: "content",
      of: [
        { type: "block" },
        {
          type: "image",
          fields: [
            {
              name: "alt",
              type: "string",
              title: "Alt Text",
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: "caption",
              type: "string",
              title: "Caption",
            },
          ],
        },
      ],
    },

    // FAQs
    {
      name: "faqs",
      title: "Frequently Asked Questions (FAQ Section)",
      type: "array",
      group: "content",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "question",
              title: "Question",
              type: "string",
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: "answer",
              title: "Answer",
              type: "text",
              rows: 3,
              validation: (Rule: any) => Rule.required(),
            },
          ],
        },
      ],
    },

    // Related Posts & Internal Links
    {
      name: "relatedPosts",
      title: "Related Topic Cluster Posts",
      type: "array",
      group: "content",
      of: [
        {
          type: "reference",
          to: [{ type: "post" }],
        },
      ],
    },

    // Editor Guidance
    {
      name: "searchIntent",
      title: "Search Intent",
      type: "string",
      group: "editorGuidance",
      options: {
        list: ["Informational", "Commercial Investigation", "Transactional", "Navigational"],
      },
    },
    {
      name: "targetAudience",
      title: "Target Audience",
      type: "string",
      group: "editorGuidance",
      description: "e.g., Bengaluru apartment owners, tenants preparing to vacate, villa residents",
    },
    {
      name: "ctaText",
      title: "Tailored CTA Text",
      type: "string",
      group: "editorGuidance",
      description: "e.g., Book Bengaluru Deep Cleaning Today",
    },
    {
      name: "internalLinksToInclude",
      title: "Target Internal Links to Include",
      type: "array",
      of: [{ type: "string" }],
      group: "editorGuidance",
      description: "e.g., ['/bengaluru/deep-cleaning/', '/bengaluru/kitchen-cleaning/']",
    },

    // SEO Object
    {
      name: "seo",
      title: "SEO Settings",
      type: "seoFields",
      group: "seo",
    },
  ],
};
