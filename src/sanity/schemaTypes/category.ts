/* eslint-disable @typescript-eslint/no-explicit-any */
export default {
  name: "category",
  title: "Category",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "description",
      title: "Description",
      type: "text",
      rows: 2,
    },
    {
      name: "pillarTopic",
      title: "Is Pillar Topic Hub?",
      type: "boolean",
      description: "Mark if this category serves as a central hub for supporting posts.",
      initialValue: false,
    },
  ],
};
