import { getServices, getSettings, getShared } from "./cms";
import { site } from "./site";

/** schema.org data so search engines understand the business. */
export async function businessJsonLd() {
  const [settings, services, { serviceAreas }] = await Promise.all([
    getSettings(),
    getServices(),
    getShared(),
  ]);
  return {
    "@context": "https://schema.org",
    "@type": "GeneralContractor",
    "@id": `${site.url}/#business`,
    name: settings.name,
    legalName: settings.legalName,
    slogan: settings.tagline,
    description: settings.description,
    url: site.url,
    logo: `${site.url}/brand/logo-full.png`,
    image: `${site.url}/opengraph-image.jpg`,
    email: settings.email,
    ...(settings.phone ? { telephone: settings.phone } : {}),
    founder: settings.owners.map((o) => ({ "@type": "Person", name: o.name, jobTitle: o.title })),
    areaServed: [
      { "@type": "State", name: "Arizona" },
      ...[...serviceAreas.primary.cities, ...serviceAreas.metro.cities].map((city) => ({
        "@type": "City",
        name: `${city}, AZ`,
      })),
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Residential construction services",
      itemListElement: services.map((s) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: s.name, url: `${site.url}/services/${s.slug}` },
      })),
    },
  };
}

export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // JSON-LD must be inlined; `<` is escaped below so content can't close the tag.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
