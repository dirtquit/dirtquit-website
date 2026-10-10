/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Custom blocks that editors can drop into the article body.
 * Rendered on the site by src/components/blog/PortableTextBody.tsx.
 */

export const callout = {
  name: "callout",
  title: "Callout Box",
  type: "object",
  fields: [
    {
      name: "tone",
      title: "Tone",
      type: "string",
      options: {
        list: [
          { title: "Tip", value: "tip" },
          { title: "Warning", value: "warning" },
          { title: "Expert Note", value: "expert" },
        ],
        layout: "radio",
      },
      initialValue: "tip",
    },
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "text",
      title: "Text",
      type: "text",
      rows: 3,
      validation: (Rule: any) => Rule.required(),
    },
  ],
  preview: {
    select: { title: "title", subtitle: "tone" },
    prepare: ({ title, subtitle }: { title?: string; subtitle?: string }) => ({
      title: title || "Callout",
      subtitle: `Callout · ${subtitle || "tip"}`,
    }),
  },
};

export const comparisonTable = {
  name: "comparisonTable",
  title: "Comparison Table",
  type: "object",
  fields: [
    {
      name: "headers",
      title: "Column Headers",
      type: "array",
      of: [{ type: "string" }],
      validation: (Rule: any) => Rule.required().min(2),
    },
    {
      name: "rows",
      title: "Rows",
      type: "array",
      of: [
        {
          type: "object",
          name: "row",
          fields: [
            {
              name: "cells",
              title: "Cells (same order as headers)",
              type: "array",
              of: [{ type: "string" }],
            },
          ],
          preview: {
            select: { cells: "cells" },
            prepare: ({ cells }: { cells?: string[] }) => ({
              title: (cells || []).join(" · ") || "Row",
            }),
          },
        },
      ],
    },
  ],
  preview: {
    select: { headers: "headers" },
    prepare: ({ headers }: { headers?: string[] }) => ({
      title: (headers || []).join(" vs ") || "Comparison Table",
      subtitle: "Comparison Table",
    }),
  },
};

export const serviceLink = {
  name: "serviceLink",
  title: "Service Link Card (Internal Link)",
  type: "object",
  fields: [
    { name: "badge", title: "Badge", type: "string", description: "e.g. Recommended Service" },
    {
      name: "anchor",
      title: "Anchor Text",
      type: "string",
      description: "Descriptive, keyword-rich link text.",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "href",
      title: "Internal Path",
      type: "string",
      description: "e.g. /bengaluru/deep-cleaning/",
      validation: (Rule: any) =>
        Rule.required().custom((v?: string) =>
          !v || v.startsWith("/") ? true : "Use an internal path that starts with /",
        ),
    },
  ],
  preview: {
    select: { title: "anchor", subtitle: "href" },
  },
};
