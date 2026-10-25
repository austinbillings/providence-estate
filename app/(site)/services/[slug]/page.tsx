import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BookingButton } from "@/components/cta";
import { Sun } from "@/components/icons";
import { Photo } from "@/components/photo";
import { CtaBand, FaqList, NumberedSteps, PageHero } from "@/components/sections";
import { ButtonLink, Container, Eyebrow, SectionHeading, TextLink } from "@/components/ui";
import { getPage, getService, getServices, getSettings, getShared, paragraphs } from "@/lib/cms";

export async function generateStaticParams() {
  return (await getServices()).map((s) => ({ slug: s.slug }));
}

// Services added in the Studio after a deploy render on first visit.
export const dynamicParams = true;

export async function generateMetadata({
  params,
}: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const [service, settings] = await Promise.all([getService(slug), getSettings()]);
  if (!service) return {};
  return {
    title: `${service.name} in Arizona`,
    description: service.seo?.description,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: {
      title: `${service.name} | ${settings.name}`,
      description: service.seo?.description,
      ...(service.image && {
        images: [{ url: `${service.image.src.split("?")[0]}?w=1200&h=630&fit=crop&auto=format`, width: 1200, height: 630 }],
      }),
    },
  };
}

export default async function ServicePage({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const [service, services, { processSteps }, areas] = await Promise.all([
    getService(slug),
    getServices(),
    getShared(),
    getPage("serviceAreasPage"),
  ]);
  if (!service) notFound();

  const others = services.filter((s) => s.slug !== service.slug);

  return (
    <>
      <PageHero
        eyebrow={service.name}
        title={service.headline}
        intro={service.intro}
        image={service.image}
        crumbs={[
          { href: "/services", label: "Services" },
          { href: `/services/${service.slug}`, label: service.name },
        ]}
      >
        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <BookingButton />
          <ButtonLink href={`/contact?type=${service.slug}`} variant="outline-gold">
            Ask a Question
          </ButtonLink>
        </div>
      </PageHero>

      {/* Overview + scope */}
      <section className="py-24 sm:py-32">
        <Container className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <SectionHeading eyebrow="Overview" title={service.overviewTitle} />
            <div className="mt-8 space-y-5 text-lg leading-relaxed text-muted">
              {paragraphs(service.overview).map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>
          <aside className="lg:col-span-5">
            <div className="border border-stone bg-sand p-8 sm:p-10">
              <Eyebrow>{service.includesTitle}</Eyebrow>
              <ul className="mt-6 space-y-4">
                {service.includes.map((item) => (
                  <li key={item} className="flex gap-4 text-text">
                    <span
                      aria-hidden="true"
                      className="mt-2 size-2 shrink-0 rotate-45 bg-gold-deep"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </Container>
      </section>

      {/* Arizona expertise (reuses the Service Areas banner photo) */}
      <section className="relative isolate overflow-hidden bg-ink py-24 sm:py-28">
        <Container className="grid items-center gap-14 lg:grid-cols-2">
          <div className="relative aspect-[4/3] overflow-hidden">
            <Photo image={areas.hero.image} sizes="(min-width: 1024px) 45vw, 100vw" />
          </div>
          <div>
            <SectionHeading tone="dark" eyebrow="Local Expertise" title={service.localTitle} />
            <ul className="mt-10 space-y-6">
              {service.localPoints.map((point) => (
                <li key={point} className="flex gap-5">
                  <Sun className="mt-0.5 size-6 shrink-0 text-gold" />
                  <p className="leading-relaxed text-ivory/85">{point}</p>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* Process */}
      <section className="bg-sand py-24 sm:py-32">
        <Container>
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <SectionHeading
              eyebrow="How It Works"
              title="How a project goes"
              intro="Every job follows the same five steps, so you know what's coming next and what it costs."
            />
            <TextLink href="/process" className="shrink-0">
              More on Our Process
            </TextLink>
          </div>
          <div className="mt-14">
            <NumberedSteps steps={processSteps} />
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="py-24 sm:py-32">
        <Container className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading eyebrow={service.name} title="Common questions" />
          </div>
          <div className="lg:col-span-8">
            <FaqList faqs={service.faqs} />
          </div>
        </Container>
      </section>

      {/* Related */}
      <section className="border-t border-stone pb-24 sm:pb-32">
        <Container>
          <Eyebrow className="pt-16">Other Services</Eyebrow>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {others.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/services/${s.slug}`}
                  className="group relative isolate flex aspect-[4/3] items-end overflow-hidden p-5 lg:aspect-[3/4]"
                >
                  <Photo
                    image={s.image}
                    sizes="(min-width: 1024px) 20vw, (min-width: 640px) 50vw, 100vw"
                    className="-z-20 transition-transform duration-700 ease-out-soft group-hover:scale-105"
                  />
                  <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink/90 via-ink/30 to-transparent" />
                  <span className="font-display text-xl leading-tight text-ivory">
                    {s.name}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <CtaBand title={`Ready to talk about your ${service.noun}?`} />
    </>
  );
}
