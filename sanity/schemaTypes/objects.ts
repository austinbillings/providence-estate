import { defineArrayMember, defineField, defineType } from "sanity";

/** Icons the site can draw; keys match components in components/icons.tsx. */
export const iconOptions = [
  { title: "Document", value: "document" },
  { title: "Family", value: "family" },
  { title: "Chat", value: "chat" },
  { title: "Home", value: "home" },
  { title: "Shield", value: "shield" },
  { title: "Award", value: "award" },
  { title: "Calendar", value: "calendar" },
  { title: "Map pin", value: "mapPin" },
  { title: "Sun", value: "sun" },
  { title: "Broom", value: "broom" },
  { title: "Check", value: "check" },
];

export const photo = defineType({
  name: "photo",
  title: "Photo",
  type: "image",
  description: "Drag the hotspot circle onto the subject so it stays in frame on every screen size.",
  options: { hotspot: true },
  fields: [
    defineField({
      name: "alt",
      title: "Description",
      type: "string",
      description: "What's in the photo, for screen readers and search engines.",
      validation: (r) => r.required(),
    }),
  ],
  validation: (r) => r.required(),
});

export const heading = defineType({
  name: "heading",
  title: "Section heading",
  type: "object",
  options: { collapsible: true, collapsed: false },
  fields: [
    defineField({ name: "eyebrow", title: "Small label", type: "string" }),
    defineField({ name: "title", type: "string", validation: (r) => r.required().max(90) }),
    defineField({ name: "intro", title: "Subtitle", type: "text", rows: 3 }),
  ],
});

export const pageHero = defineType({
  name: "pageHero",
  title: "Page banner",
  type: "object",
  options: { collapsible: true, collapsed: false },
  fields: [
    defineField({ name: "eyebrow", title: "Small label", type: "string", validation: (r) => r.required() }),
    defineField({ name: "title", type: "string", validation: (r) => r.required().max(70) }),
    defineField({ name: "intro", title: "Intro", type: "text", rows: 3 }),
    defineField({ name: "image", type: "photo" }),
  ],
});

export const card = defineType({
  name: "card",
  title: "Block",
  type: "object",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "body", type: "text", rows: 3, validation: (r) => r.required() }),
  ],
});

export const iconCard = defineType({
  name: "iconCard",
  title: "Block with icon",
  type: "object",
  fields: [
    defineField({
      name: "icon",
      type: "string",
      options: { list: iconOptions },
      validation: (r) => r.required(),
    }),
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "body", type: "text", rows: 3, validation: (r) => r.required() }),
  ],
  preview: { select: { title: "title", subtitle: "body" } },
});

export const faq = defineType({
  name: "faq",
  title: "Question",
  type: "object",
  fields: [
    defineField({ name: "question", type: "string", validation: (r) => r.required() }),
    defineField({ name: "answer", type: "text", rows: 4, validation: (r) => r.required() }),
  ],
  preview: { select: { title: "question", subtitle: "answer" } },
});

export const seo = defineType({
  name: "seo",
  title: "Search engines",
  type: "object",
  options: { collapsible: true, collapsed: true },
  fields: [
    defineField({
      name: "description",
      type: "text",
      rows: 2,
      description: "The summary Google shows under the page title. Aim for 120–160 characters.",
      validation: (r) => r.max(200),
    }),
  ],
});

export const stringList = (name: string, title: string) =>
  defineField({ name, title, type: "array", of: [defineArrayMember({ type: "string" })] });

export const objects = [photo, heading, pageHero, card, iconCard, faq, seo];
