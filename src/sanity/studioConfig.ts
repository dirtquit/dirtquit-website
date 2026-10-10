import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./schemaTypes";

/**
 * Embedded Sanity Studio served at dirtquit.com/studio.
 * Only loaded in the browser by src/routes/studio, never in the public site bundle.
 * Editors sign in with their Sanity account; access is managed in sanity.io/manage.
 */
export default defineConfig({
  name: "default",
  title: "Dirt Quit Blog",
  basePath: "/studio",
  projectId: "ltxt6lsd",
  dataset: "production",
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            S.documentTypeListItem("post").title("Blog Posts"),
            S.divider(),
            S.documentTypeListItem("category").title("Categories"),
            S.documentTypeListItem("author").title("Authors"),
          ]),
    }),
  ],
  schema: {
    types: schemaTypes,
  },
});
