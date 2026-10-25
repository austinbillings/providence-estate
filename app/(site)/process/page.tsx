import type { Metadata } from "next";
import { ContentIcon } from "@/components/content-icon";
import { Photo } from "@/components/photo";
import { CtaBand, PageHero } from "@/components/sections";
import { Container, SectionHeading } from "@/components/ui";
import { getPage, getShared } from "@/lib/cms";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPage("processPage");
  return {
    title: "Our Process",
    description: page.seo?.description,
    alternates: { canonical: "/process" },
  };
}

export default async function ProcessPage() {
  const [page, { processSteps }] = await Promise.all([getPage("processPage"), getShared()]);
  return (
    <>
      <PageHero {...page.hero} crumbs={[{ href: "/process", label: "Our Process" }]} />

      <section className="py-24 sm:py-32">
        <Container>
          <ol className="space-y-24 sm:space-y-32">
            {processSteps.map((step, i) => (
              <li key={step.title} className="grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
                <div className={`relative aspect-[3/2] overflow-hidden ${i % 2 ? "lg:order-2" : ""}`}>
                  <Photo image={step.image} sizes="(min-width: 1024px) 45vw, 100vw" />
                </div>
                <div>
                  <div className="flex items-baseline gap-5">
                    <span className="font-display text-7xl leading-none text-gold-deep">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="eyebrow text-bronze">Step {i + 1} of {processSteps.length}</span>
                  </div>
                  <h2 className="mt-6 font-display text-4xl font-medium text-text sm:text-5xl">
                    {step.title}
                  </h2>
                  <p className="mt-5 text-lg leading-relaxed text-muted">{step.summary}</p>
                  <ul className="mt-8 space-y-3 border-t border-stone pt-8">
                    {step.details.map((d) => (
                      <li key={d} className="flex gap-4 text-text">
                        <span aria-hidden="true" className="mt-2 size-2 shrink-0 rotate-45 bg-gold-deep" />
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="bg-ink py-24 sm:py-32">
        <Container>
          <SectionHeading tone="dark" align="center" {...page.commitmentsHeading} />
          <ul className="mt-16 grid gap-px overflow-hidden border border-line-dark bg-line-dark sm:grid-cols-2 lg:grid-cols-4">
            {page.commitments.map(({ icon, title, body }) => (
              <li key={title} className="bg-ink-2 p-8">
                <ContentIcon name={icon} className="size-8 text-gold" />
                <h3 className="mt-6 font-display text-2xl text-ivory">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-mist">{body}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="py-24 sm:py-32">
        <Container className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading {...page.prepHeading} />
          </div>
          <ul className="divide-y divide-stone border-y border-stone lg:col-span-7">
            {page.prep.map((item, i) => (
              <li key={item} className="flex gap-6 py-5">
                <span className="font-display text-2xl leading-none text-gold-deep">{i + 1}</span>
                <span className="text-lg text-text">{item}</span>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <CtaBand title={page.ctaTitle} />
    </>
  );
}
