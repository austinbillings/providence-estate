import { defineArrayMember, defineField, defineType } from "sanity";
import { stringList } from "./objects";

export const promises = defineType({
  name: "promises",
  title: "Promises",
  type: "document",
  description: "Shown on the homepage and the About page.",
  fields: [
    defineField({ name: "items", title: "Promises", type: "array", of: [defineArrayMember({ type: "iconCard" })] }),
  ],
  preview: { prepare: () => ({ title: "Promises" }) },
});

export const processSteps = defineType({
  name: "processSteps",
  title: "Process steps",
  type: "document",
  description: "Shown on the homepage, the Process page, and every service page.",
  fields: [
    defineField({
      name: "items",
      title: "Steps",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "step",
          fields: [
            defineField({ name: "title", type: "string", validation: (r) => r.required() }),
            defineField({ name: "summary", type: "text", rows: 3, validation: (r) => r.required() }),
            stringList("details", "Details"),
            defineField({ name: "image", type: "photo", description: "Shown on the Process page." }),
          ],
          preview: { select: { title: "title", subtitle: "summary", media: "image" } },
        }),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "Process steps" }) },
});

export const faqs = defineType({
  name: "faqs",
  title: "General questions",
  type: "document",
  fields: [
    defineField({
      name: "items",
      title: "Questions",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "generalFaq",
          fields: [
            defineField({ name: "question", type: "string", validation: (r) => r.required() }),
            defineField({ name: "answer", type: "text", rows: 4, validation: (r) => r.required() }),
            defineField({ name: "onHomepage", title: "Show on homepage", type: "boolean", initialValue: true }),
          ],
          preview: { select: { title: "question", subtitle: "answer" } },
        }),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "General questions" }) },
});

const areaGroup = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: "object",
    fields: [
      defineField({ name: "title", type: "string", validation: (r) => r.required() }),
      defineField({ name: "note", title: "Label", type: "string" }),
      stringList("cities", "Cities"),
    ],
  });

export const serviceAreas = defineType({
  name: "serviceAreas",
  title: "Service areas",
  type: "document",
  fields: [areaGroup("primary", "Primary area"), areaGroup("metro", "Also serving")],
  preview: { prepare: () => ({ title: "Service areas" }) },
});
