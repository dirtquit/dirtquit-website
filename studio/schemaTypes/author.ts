/* eslint-disable @typescript-eslint/no-explicit-any */
export default {
  name: "author",
  title: "Author",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "role",
      title: "Role / Professional Title",
      type: "string",
      description: "e.g., Dirtquit Cleaning Operations Lead & Sanitation Specialist",
    },
    {
      name: "avatar",
      title: "Avatar Image",
      type: "image",
      options: {
        hotspot: true,
      },
    },
    {
      name: "bio",
      title: "Bio",
      type: "text",
      rows: 3,
      description: "Author bio demonstrating expertise and background.",
    },
    {
      name: "credentials",
      title: "Credentials / Badges",
      type: "array",
      of: [{ type: "string" }],
      description: "e.g., ['10+ Years Sanitation Experience', 'Certified Hygiene Inspector']",
    },
  ],
};
