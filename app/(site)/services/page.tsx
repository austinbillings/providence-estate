import type { Metadata } from "next";
import Link from "next/link";
import { Photo } from "@/components/photo";
import { CtaBand, PageHero } from "@/components/sections";
import { Container, SectionHeading, TextLink } from "@/components/ui";
import { getPage, getServices } from "@/lib/cms";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPage("servicesPage");
  return {
    title: "Residential Construction Services",
    description: page.seo?.description,
    alternates: { canonical: "/services" },
  };
}

export default async function ServicesPage() {
  const [page, services] = await Promise.all([getPage("servicesPage"), getServices()]);
  return (
    <>
      <PageHero {...page.hero} crumbs={[{ href: "/services", label: "Services" }]} />

      <section className="py-24 sm:py-32">
        <Container className="space-y-24 sm:space-y-32">
          {services.map((service, i) => (
            <article
              key={service.slug}
              className="grid items-center gap-10 lg:grid-cols-2 lg:gap-20"
            >
              <Link
                href={`/services/${service.slug}`}
                className={`group relative block aspect-[4/3] overflow-hidden ${i % 2 ? "lg:order-2" : ""}`}
                tabIndex={-1}
                aria-hidden="true"
              >
                <Photo
                  image={service.image}
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  className="transition-transform duration-700 ease-out-soft group-hover:scale-105"
                />
              </Link>
              <div>
                <p className="font-display text-5xl text-gold-deep">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <SectionHeading
                  eyebrow={service.name}
                  title={
                    <Link href={`/services/${service.slug}`} className="hover:text-bronze">
                      {service.headline}
                    </Link>
                  }
                  intro={service.intro}
                  className="mt-4"
                />
                <ul className="mt-8 grid gap-x-8 gap-y-2.5 text-sm text-muted sm:grid-cols-2">
                  {service.includes.slice(0, 6).map((item) => (
                    <li key={item} className="flex gap-3">
                      <span aria-hidden="true" className="mt-[0.45rem] size-1.5 shrink-0 rotate-45 bg-gold-deep" />
                      {item}
                    </li>
                  ))}
                </ul>
                <TextLink href={`/services/${service.slug}`} className="mt-10">
                  More on {service.name}
                </TextLink>
              </div>
            </article>
          ))}
        </Container>
      </section>

      <section className="bg-sand py-20">
        <Container className="text-center">
          <SectionHeading align="center" {...page.notListedHeading} />
          <TextLink href="/contact" className="mt-8">
            Tell Us About Your Project
          </TextLink>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
