import { defineArrayMember, defineField, defineType } from "sanity";
import { stringList } from "./objects";

export const service = defineType({
  name: "service",
  title: "Service",
  type: "document",
  groups: [
    { name: "basics", title: "Basics", default: true },
    { name: "page", title: "Page" },
    { name: "faqs", title: "Questions" },
  ],
  fields: [
    defineField({ name: "name", type: "string", group: "basics", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      title: "Web address",
      type: "slug",
      group: "basics",
      description: "providenceestate.com/services/… Don't change this once the page is live: old links and Google results would break.",
      options: { source: "name" },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "order",
      title: "Position",
      type: "number",
      group: "basics",
      description: "Services are listed from lowest to highest number.",
      initialValue: 100,
    }),
    defineField({
      name: "noun",
      title: "Short noun",
      type: "string",
      group: "basics",
      description: "Completes “Ready to talk about your ___?”, e.g. “new kitchen”.",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "summary",
      type: "text",
      rows: 2,
      group: "basics",
      description: "One or two sentences for service cards.",
      validation: (r) => r.required().max(160),
    }),
    defineField({ name: "image", title: "Photo", type: "photo", group: "basics" }),

    defineField({ name: "headline", type: "string", group: "page", validation: (r) => r.required().max(70) }),
    defineField({ name: "intro", type: "text", rows: 3, group: "page", validation: (r) => r.required() }),
    defineField({ name: "overviewTitle", title: "Overview title", type: "string", group: "page", validation: (r) => r.required() }),
    defineField({
      name: "overview",
      type: "text",
      rows: 8,
      group: "page",
      description: "Leave a blank line between paragraphs.",
      validation: (r) => r.required(),
    }),
    defineField({ name: "includesTitle", title: "Checklist title", type: "string", group: "page", validation: (r) => r.required() }),
    { ...stringList("includes", "Checklist"), group: "page" },
    defineField({ name: "localTitle", title: "Local expertise title", type: "string", group: "page", validation: (r) => r.required() }),
    { ...stringList("localPoints", "Local expertise points"), group: "page" },
    defineField({ name: "seo", type: "seo", group: "page" }),

    defineField({ name: "faqs", title: "Questions", type: "array", group: "faqs", of: [defineArrayMember({ type: "faq" })] }),
  ],
  orderings: [{ title: "Position", name: "order", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "name", subtitle: "summary", media: "image" } },
});
