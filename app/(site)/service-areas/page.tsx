import type { Metadata } from "next";
import { ArizonaMap } from "@/components/arizona-map";
import { MapPin } from "@/components/icons";
import { CtaBand, PageHero } from "@/components/sections";
import { Container, Eyebrow, SectionHeading, TextLink } from "@/components/ui";
import { type AreaGroup, getPage, getShared } from "@/lib/cms";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPage("serviceAreasPage");
  return {
    title: "Service Areas",
    description: page.seo?.description,
    alternates: { canonical: "/service-areas" },
  };
}

function CityList({ title, note, cities }: AreaGroup) {
  return (
    <div className="border border-stone bg-cream p-8 sm:p-10">
      <div className="flex items-baseline justify-between gap-4">
        <h2 className="font-display text-3xl text-text">{title}</h2>
        {note && <Eyebrow className="shrink-0">{note}</Eyebrow>}
      </div>
      <ul className="mt-8 grid grid-cols-2 gap-x-6 gap-y-3">
        {cities.map((city) => (
          <li key={city} className="flex items-center gap-3 text-text">
            <MapPin className="size-4 shrink-0 text-gold-deep" />
            {city}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default async function ServiceAreasPage() {
  const [page, { serviceAreas }] = await Promise.all([getPage("serviceAreasPage"), getShared()]);
  return (
    <>
      <PageHero {...page.hero} crumbs={[{ href: "/service-areas", label: "Service Areas" }]} />

      <section className="bg-sand py-24 sm:py-32">
        <Container className="grid items-start gap-8 lg:grid-cols-2">
          <CityList {...serviceAreas.primary} />
          <CityList {...serviceAreas.metro} />
        </Container>
      </section>

      <section className="bg-ink py-24 sm:py-32">
        <Container className="grid items-center gap-16 lg:grid-cols-2">
          <div className="mx-auto w-full max-w-md">
            <ArizonaMap />
          </div>
          <div>
            <SectionHeading tone="dark" {...page.statewideHeading} />
            <TextLink href="/contact" tone="dark" className="mt-10">
              Tell Us Where
            </TextLink>
          </div>
        </Container>
      </section>

      <section className="py-24 sm:py-32">
        <Container>
          <SectionHeading {...page.localHeading} />
          <ul className="mt-14 grid gap-10 md:grid-cols-3">
            {page.local.map((item) => (
              <li key={item.title} className="border-t border-bronze/30 pt-8">
                <h3 className="font-display text-2xl text-text">{item.title}</h3>
                <p className="mt-3 leading-relaxed text-muted">{item.body}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <CtaBand title={page.ctaTitle} body={page.ctaBody} />
    </>
  );
}
