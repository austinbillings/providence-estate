import type { Metadata } from "next";
import Link from "next/link";
import { ArizonaMap } from "@/components/arizona-map";
import { BookingButton } from "@/components/cta";
import { ContentIcon } from "@/components/content-icon";
import { Photo } from "@/components/photo";
import { CtaBand, FaqList, NumberedSteps, TrustBar } from "@/components/sections";
import {
  ButtonLink,
  Container,
  Eyebrow,
  Ornament,
  SectionHeading,
  TextLink,
} from "@/components/ui";
import { getPage, getServices, getShared, paragraphs } from "@/lib/cms";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPage("homePage");
  return {
    ...(page.seo?.description && { description: page.seo.description }),
    alternates: { canonical: "/" },
  };
}

export default async function HomePage() {
  const [page, services, { promises, processSteps, faqs, serviceAreas }] = await Promise.all([
    getPage("homePage"),
    getServices(),
    getShared(),
  ]);
  const { hero, intro } = page;

  return (
    <>
      {/* Hero */}
      <section className="relative isolate flex min-h-[calc(100svh-5rem)] items-center overflow-hidden bg-ink lg:min-h-[calc(100svh-7.5rem)]">
        <Photo
          image={hero.image}
          sizes="100vw"
          priority
          quality={85}
          className="-z-20 animate-hero-zoom"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink/95 via-ink/70 to-ink/10" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-1/3 bg-gradient-to-t from-ink/80 to-transparent" />

        <Container className="py-24">
          <div className="max-w-4xl">
            <Eyebrow tone="dark" className="animate-rise">
              {hero.eyebrow}
            </Eyebrow>
            <h1 className="mt-6 animate-rise font-display text-[3.4rem] leading-[0.98] font-medium text-ivory [animation-delay:120ms] sm:text-7xl xl:text-8xl">
              {hero.headline}
              <span className="block text-gold-light">{hero.headlineAccent}</span>
            </h1>
            <p className="mt-8 max-w-xl animate-rise text-lg leading-relaxed text-pretty text-ivory/85 [animation-delay:240ms] sm:text-xl">
              {hero.body}
            </p>
            <div className="mt-10 flex animate-rise flex-col gap-4 [animation-delay:360ms] sm:flex-row">
              <BookingButton />
              <ButtonLink href="/services" variant="outline-gold">
                See Our Services
              </ButtonLink>
            </div>
          </div>
        </Container>
      </section>

      <TrustBar />

      {/* Introduction */}
      <section className="py-24 sm:py-32">
        <Container className="grid items-center gap-16 lg:grid-cols-2 lg:gap-24">
          <div className="relative isolate order-2 lg:order-1">
            <div className="relative aspect-[4/5] overflow-hidden">
              <Photo image={intro.image} sizes="(min-width: 1024px) 40vw, 100vw" />
            </div>
            {intro.quote && (
              <div className="absolute -right-4 -bottom-8 hidden w-56 border border-stone bg-cream p-6 shadow-xl sm:block lg:-right-12">
                <Ornament rules={false} className="justify-start text-gold-deep" />
                <p className="mt-4 font-display text-2xl leading-snug text-text">
                  {intro.quote}
                </p>
                {intro.quoteCaption && (
                  <p className="mt-3 text-xs tracking-[0.2em] text-muted uppercase">
                    {intro.quoteCaption}
                  </p>
                )}
              </div>
            )}
            <div className="absolute -top-5 -left-5 -z-10 hidden h-2/3 w-2/3 border border-gold/50 sm:block" />
          </div>

          <div className="order-1 lg:order-2">
            <SectionHeading {...intro.heading} />
            <div className="mt-6 space-y-5 text-lg leading-relaxed text-muted">
              {paragraphs(intro.body).map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <div className="mt-10 flex flex-wrap items-center gap-8">
              <TextLink href="/about">Our Story</TextLink>
              <TextLink href="/process">How We Work</TextLink>
            </div>
          </div>
        </Container>
      </section>

      {/* Services */}
      <section className="bg-ink py-24 sm:py-32">
        <Container>
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <SectionHeading tone="dark" {...page.servicesHeading} />
            <TextLink href="/services" tone="dark" className="shrink-0">
              View All Services
            </TextLink>
          </div>

          <ul className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <li key={service.slug}>
                <Link
                  href={`/services/${service.slug}`}
                  className="group relative isolate flex aspect-[4/5] flex-col justify-end overflow-hidden border border-line-dark p-8 sm:aspect-[3/4]"
                >
                  <Photo
                    image={service.image}
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="-z-20 transition-transform duration-700 ease-out-soft group-hover:scale-105"
                  />
                  <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/75 to-ink/10 transition-colors duration-500 group-hover:via-ink/80" />
                  <h3 className="font-display text-3xl text-ivory">{service.name}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ivory/75">
                    {service.summary}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-2 text-[0.72rem] font-semibold tracking-[0.18em] text-gold-light uppercase">
                    Learn more
                    <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </span>
                  <span className="absolute inset-x-8 top-0 h-px origin-left scale-x-0 bg-gold-light transition-transform duration-500 group-hover:scale-x-100" />
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Promises */}
      <section className="bg-sand py-24 sm:py-32">
        <Container>
          <SectionHeading align="center" {...page.promisesHeading} />
          <ul className="mt-16 grid gap-px overflow-hidden border border-stone bg-stone sm:grid-cols-2 lg:grid-cols-3">
            {promises.map((promise) => (
              <li key={promise.title} className="bg-cream p-10">
                <ContentIcon name={promise.icon} className="size-9 text-gold-deep" />
                <h3 className="mt-6 font-display text-2xl text-text">{promise.title}</h3>
                <p className="mt-3 leading-relaxed text-muted">{promise.body}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Process */}
      <section className="py-24 sm:py-32">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <SectionHeading {...page.processHeading} />
              <TextLink href="/process" className="mt-8">
                See the Full Process
              </TextLink>
            </div>
            <div className="relative hidden aspect-[16/9] overflow-hidden lg:col-span-7 lg:block">
              <Photo image={page.processImage} sizes="(min-width: 1024px) 55vw, 100vw" />
            </div>
          </div>
          <div className="mt-16">
            <NumberedSteps steps={processSteps} />
          </div>
        </Container>
      </section>

      {/* Service area */}
      <section className="relative isolate overflow-hidden bg-ink py-24 sm:py-32">
        <Photo image={page.areaImage} sizes="100vw" className="-z-20 opacity-25" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink via-ink/90 to-ink/60" />
        <Container className="grid items-center gap-16 lg:grid-cols-2">
          <div>
            <SectionHeading tone="dark" {...page.areaHeading} />
            <ul className="mt-10 flex flex-wrap gap-2">
              {serviceAreas.primary.cities.map((city) => (
                <li
                  key={city}
                  className="border border-gold/30 px-3.5 py-1.5 text-sm text-ivory/85"
                >
                  {city}
                </li>
              ))}
            </ul>
            <TextLink href="/service-areas" tone="dark" className="mt-10">
              View Service Areas
            </TextLink>
          </div>
          <div className="mx-auto w-full max-w-sm lg:max-w-md">
            <ArizonaMap />
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="py-24 sm:py-32">
        <Container className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading {...page.faqHeading} />
            <TextLink href="/contact" className="mt-8">
              Ask a Question
            </TextLink>
          </div>
          <div className="lg:col-span-8">
            <FaqList faqs={faqs.filter((f) => f.onHomepage)} />
          </div>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
