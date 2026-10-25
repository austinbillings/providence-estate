"use client";

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes, singletonTypes } from "./sanity/schemaTypes";
import { structure } from "./sanity/structure";

const singletonActions = new Set(["publish", "discardChanges", "restore"]);

export default defineConfig({
  name: "providence",
  title: "Providence Estate Builders",
  basePath: "/studio",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  plugins: [structureTool({ structure })],
  schema: {
    types: schemaTypes,
    templates: (templates) => templates.filter(({ schemaType }) => !singletonTypes.has(schemaType)),
  },
  document: {
    actions: (actions, { schemaType }) =>
      singletonTypes.has(schemaType)
        ? actions.filter(({ action }) => action && singletonActions.has(action))
        : actions,
  },
});
