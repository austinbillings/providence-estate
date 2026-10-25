import { defineArrayMember, defineField, defineType, type FieldDefinition } from "sanity";
import { stringList } from "./objects";

const hero = defineField({ name: "hero", title: "Page banner", type: "pageHero" });
const seo = defineField({ name: "seo", type: "seo" });
const heading = (name: string, title: string) => defineField({ name, title, type: "heading" });
const paragraphs = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: "text",
    rows: 6,
    description: "Leave a blank line between paragraphs.",
    validation: (r) => r.required(),
  });

function page(name: string, title: string, fields: FieldDefinition[]) {
  return defineType({
    name,
    title,
    type: "document",
    fields,
    preview: { prepare: () => ({ title }) },
  });
}

export const homePage = page("homePage", "Homepage", [
  defineField({
    name: "hero",
    title: "Top banner",
    type: "object",
    options: { collapsible: true, collapsed: false },
    fields: [
      defineField({ name: "eyebrow", title: "Small label", type: "string", validation: (r) => r.required() }),
      defineField({ name: "headline", type: "string", validation: (r) => r.required().max(40) }),
      defineField({
        name: "headlineAccent",
        title: "Headline, gold line",
        type: "string",
        validation: (r) => r.required().max(40),
      }),
      defineField({ name: "body", type: "text", rows: 4, validation: (r) => r.required() }),
      defineField({ name: "image", type: "photo" }),
    ],
  }),
  defineField({
    name: "intro",
    title: "Who we are",
    type: "object",
    options: { collapsible: true, collapsed: true },
    fields: [
      heading("heading", "Heading"),
      paragraphs("body", "Text"),
      defineField({ name: "image", type: "photo" }),
      defineField({ name: "quote", title: "Photo card quote", type: "string" }),
      defineField({ name: "quoteCaption", title: "Photo card caption", type: "string" }),
    ],
  }),
  heading("servicesHeading", "Services section"),
  heading("promisesHeading", "Promises section"),
  heading("processHeading", "Process section"),
  defineField({ name: "processImage", title: "Process section photo", type: "photo" }),
  heading("areaHeading", "Service area section"),
  defineField({ name: "areaImage", title: "Service area background photo", type: "photo" }),
  heading("faqHeading", "Questions section"),
  seo,
]);

export const aboutPage = page("aboutPage", "About page", [
  hero,
  heading("storyHeading", "Our name: heading"),
  defineField({ name: "storyLead", title: "Our name: large opening line", type: "text", rows: 2 }),
  paragraphs("storyBody", "Our name: text"),
  heading("ownersHeading", "Owners: heading"),
  paragraphs("ownersBody", "Owners: text"),
  defineField({ name: "ownersImage", title: "Owners: photo", type: "photo" }),
  heading("valuesHeading", "Values: heading"),
  defineField({ name: "values", type: "array", of: [defineArrayMember({ type: "card" })] }),
  heading("familyHeading", "Family: heading"),
  defineField({ name: "familyImage", title: "Family: photo", type: "photo" }),
  heading("promisesHeading", "Promises: heading"),
  seo,
]);

export const servicesPage = page("servicesPage", "Services page", [
  hero,
  heading("notListedHeading", "“Not listed?” section"),
  seo,
]);

export const processPage = page("processPage", "Process page", [
  hero,
  heading("commitmentsHeading", "Commitments: heading"),
  defineField({ name: "commitments", type: "array", of: [defineArrayMember({ type: "iconCard" })] }),
  heading("prepHeading", "Getting ready: heading"),
  stringList("prep", "Getting ready: checklist"),
  defineField({ name: "ctaTitle", title: "Closing banner title", type: "string" }),
  seo,
]);

export const serviceAreasPage = page("serviceAreasPage", "Service areas page", [
  hero,
  heading("statewideHeading", "Statewide: heading"),
  heading("localHeading", "Local know-how: heading"),
  defineField({ name: "local", title: "Local know-how", type: "array", of: [defineArrayMember({ type: "card" })] }),
  defineField({ name: "ctaTitle", title: "Closing banner title", type: "string" }),
  defineField({ name: "ctaBody", title: "Closing banner text", type: "text", rows: 3 }),
  seo,
]);

export const contactPage = page("contactPage", "Contact page", [
  hero,
  heading("formHeading", "Form heading"),
  defineField({ name: "nextSteps", title: "What happens next", type: "array", of: [defineArrayMember({ type: "card" })] }),
  seo,
]);

export const pages = [homePage, aboutPage, servicesPage, processPage, serviceAreasPage, contactPage];
