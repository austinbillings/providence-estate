import { defineArrayMember, defineField, defineType } from "sanity";

export const settings = defineType({
  name: "settings",
  title: "Business info",
  type: "document",
  groups: [
    { name: "business", title: "Business", default: true },
    { name: "contact", title: "Contact" },
    { name: "claims", title: "Claims" },
    { name: "cta", title: "Closing banner" },
  ],
  fields: [
    defineField({ name: "name", type: "string", group: "business", validation: (r) => r.required() }),
    defineField({ name: "legalName", title: "Legal name", type: "string", group: "business", validation: (r) => r.required() }),
    defineField({ name: "tagline", type: "string", group: "business", validation: (r) => r.required() }),
    defineField({
      name: "description",
      title: "Short description",
      type: "text",
      rows: 3,
      group: "business",
      description: "Used by search engines and link previews when a page doesn't have its own.",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "footerBlurb",
      title: "Footer blurb",
      type: "text",
      rows: 2,
      group: "business",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "owners",
      type: "array",
      group: "business",
      of: [
        defineArrayMember({
          type: "object",
          name: "owner",
          fields: [
            defineField({ name: "name", title: "Full name", type: "string", validation: (r) => r.required() }),
            defineField({ name: "firstName", title: "First name", type: "string", validation: (r) => r.required() }),
            defineField({ name: "title", type: "string", validation: (r) => r.required() }),
          ],
          preview: { select: { title: "name", subtitle: "title" } },
        }),
      ],
      validation: (r) => r.required().min(1),
    }),
    defineField({ name: "rocLicense", title: "AZ ROC license number", type: "string", group: "business", validation: (r) => r.required() }),
    defineField({ name: "homeBase", title: "Home base", type: "string", group: "business", validation: (r) => r.required() }),
    defineField({
      name: "serviceAreaSummary",
      title: "Service area line",
      type: "string",
      group: "business",
      description: "Shown in the top bar, e.g. “Based in the Northwest Valley, serving all of Arizona”.",
      validation: (r) => r.required(),
    }),

    defineField({ name: "email", type: "string", group: "contact", validation: (r) => r.required().email() }),
    defineField({
      name: "phone",
      type: "string",
      group: "contact",
      description: "e.g. (623) 555-0123. Leave empty to hide every phone link on the site.",
    }),
    defineField({
      name: "bookingUrl",
      title: "Booking link",
      type: "url",
      group: "contact",
      description: "Online scheduling page. Leave empty and the “Schedule” buttons go to the contact page.",
    }),

    defineField({
      name: "bondedAndInsured",
      title: "Bonded & insured",
      type: "boolean",
      group: "claims",
      description: "Shows “Bonded & Insured” in the top bar, trust bar, footer, and About page. Only turn on once confirmed.",
      initialValue: false,
    }),
    defineField({
      name: "workmanshipWarranty",
      title: "Workmanship warranty",
      type: "boolean",
      group: "claims",
      description: "Turn on only if every job comes with a written workmanship warranty.",
      initialValue: false,
    }),

    defineField({ name: "ctaTitle", title: "Title", type: "string", group: "cta", validation: (r) => r.required() }),
    defineField({ name: "ctaBody", title: "Text", type: "text", rows: 3, group: "cta", validation: (r) => r.required() }),
    defineField({ name: "ctaImage", title: "Background photo", type: "photo", group: "cta" }),
  ],
  preview: { prepare: () => ({ title: "Business info" }) },
});
