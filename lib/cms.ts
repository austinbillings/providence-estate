import { createImageUrlBuilder } from "@sanity/image-url";
import { createClient } from "next-sanity";
import { cache } from "react";

/**
 * Content access. Everything owners edit in the Studio (/studio) is read
 * through here. Responses are cached and refreshed when the Sanity publish
 * webhook hits /api/revalidate, with a 60-second fallback.
 */

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2025-10-01",
  useCdn: false,
});

export const CONTENT_TAG = "sanity";

const imageUrl = createImageUrlBuilder(client);

export type SiteImage = {
  src: string;
  alt: string;
  /** CSS object-position, from the photo's hotspot. */
  position?: string;
};

type RawPhoto = {
  _type: "photo";
  alt?: string;
  asset?: { _ref: string };
  hotspot?: { x: number; y: number };
};

function toSiteImage(photo: RawPhoto): SiteImage {
  const { hotspot } = photo;
  return {
    src: imageUrl.image(photo).width(2400).auto("format").url(),
    alt: photo.alt ?? "",
    position: hotspot
      ? `${Math.round(hotspot.x * 100)}% ${Math.round(hotspot.y * 100)}%`
      : undefined,
  };
}

/** Swaps every Sanity photo in a response for a ready-to-render SiteImage. */
function resolvePhotos(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(resolvePhotos);
  if (value && typeof value === "object") {
    const obj = value as Record<string, unknown>;
    if (obj._type === "photo") return obj.asset ? toSiteImage(obj as RawPhoto) : undefined;
    return Object.fromEntries(Object.entries(obj).map(([k, v]) => [k, resolvePhotos(v)]));
  }
  return value;
}

async function query<T>(groq: string, params: Record<string, string> = {}): Promise<T> {
  const data = await client.fetch(groq, params, {
    next: { revalidate: 60, tags: [CONTENT_TAG] },
  });
  return resolvePhotos(data) as T;
}

/** Splits a multi-line text field into paragraphs on blank lines. */
export function paragraphs(text: string | undefined) {
  return (text ?? "")
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
}

// Shapes -------------------------------------------------------------------

export type Heading = { eyebrow?: string; title: string; intro?: string };
export type PageHero = { eyebrow: string; title: string; intro?: string; image: SiteImage };
export type Card = { title: string; body: string };
export type IconCard = Card & { icon: string };
export type Faq = { question: string; answer: string };
export type Seo = { description?: string };

export type Settings = {
  name: string;
  legalName: string;
  tagline: string;
  description: string;
  footerBlurb: string;
  owners: { name: string; firstName: string; title: string }[];
  rocLicense: string;
  homeBase: string;
  serviceAreaSummary: string;
  email: string;
  phone?: string;
  bookingUrl?: string;
  bondedAndInsured: boolean;
  workmanshipWarranty: boolean;
  ctaTitle: string;
  ctaBody: string;
  ctaImage: SiteImage;
};

export type Service = {
  slug: string;
  name: string;
  noun: string;
  summary: string;
  image: SiteImage;
  headline: string;
  intro: string;
  overviewTitle: string;
  overview: string;
  includesTitle: string;
  includes: string[];
  localTitle: string;
  localPoints: string[];
  seo?: Seo;
  faqs: Faq[];
};

export type ProcessStep = { title: string; summary: string; details: string[]; image?: SiteImage };
export type AreaGroup = { title: string; note?: string; cities: string[] };

export type Shared = {
  promises: IconCard[];
  processSteps: ProcessStep[];
  faqs: (Faq & { onHomepage?: boolean })[];
  serviceAreas: { primary: AreaGroup; metro: AreaGroup };
};

export type HomePage = {
  hero: { eyebrow: string; headline: string; headlineAccent: string; body: string; image: SiteImage };
  intro: { heading: Heading; body: string; image: SiteImage; quote?: string; quoteCaption?: string };
  servicesHeading: Heading;
  promisesHeading: Heading;
  processHeading: Heading;
  processImage: SiteImage;
  areaHeading: Heading;
  areaImage: SiteImage;
  faqHeading: Heading;
  seo?: Seo;
};

export type AboutPage = {
  hero: PageHero;
  storyHeading: Heading;
  storyLead?: string;
  storyBody: string;
  ownersHeading: Heading;
  ownersBody: string;
  ownersImage: SiteImage;
  valuesHeading: Heading;
  values: Card[];
  familyHeading: Heading;
  familyImage: SiteImage;
  promisesHeading: Heading;
  seo?: Seo;
};

export type ServicesPage = { hero: PageHero; notListedHeading: Heading; seo?: Seo };

export type ProcessPage = {
  hero: PageHero;
  commitmentsHeading: Heading;
  commitments: IconCard[];
  prepHeading: Heading;
  prep: string[];
  ctaTitle?: string;
  seo?: Seo;
};

export type ServiceAreasPage = {
  hero: PageHero;
  statewideHeading: Heading;
  localHeading: Heading;
  local: Card[];
  ctaTitle?: string;
  ctaBody?: string;
  seo?: Seo;
};

export type ContactPage = { hero: PageHero; formHeading: Heading; nextSteps: Card[]; seo?: Seo };

type PageTypes = {
  homePage: HomePage;
  aboutPage: AboutPage;
  servicesPage: ServicesPage;
  processPage: ProcessPage;
  serviceAreasPage: ServiceAreasPage;
  contactPage: ContactPage;
};

// Queries ------------------------------------------------------------------

const serviceFields = `..., "slug": slug.current, "includes": coalesce(includes, []), "localPoints": coalesce(localPoints, []), "faqs": coalesce(faqs, [])`;

export const getSettings = cache(() => query<Settings>(`*[_id == "settings"][0]`));

export const getServices = cache(() =>
  query<Service[]>(`*[_type == "service" && defined(slug.current)] | order(order asc, name asc) { ${serviceFields} }`),
);

export const getService = cache(async (slug: string) =>
  (await getServices()).find((s) => s.slug === slug),
);

export const getShared = cache(() =>
  query<Shared>(`{
    "promises": coalesce(*[_id == "promises"][0].items, []),
    "processSteps": coalesce(*[_id == "processSteps"][0].items[]{..., "details": coalesce(details, [])}, []),
    "faqs": coalesce(*[_id == "faqs"][0].items, []),
    "serviceAreas": *[_id == "serviceAreas"][0]{
      "primary": primary{..., "cities": coalesce(cities, [])},
      "metro": metro{..., "cities": coalesce(cities, [])}
    }
  }`),
);

export const getPage = cache(<K extends keyof PageTypes>(id: K) =>
  query<PageTypes[K]>(`*[_id == $id][0]`, { id }),
);
