import type { Metadata } from "next";
import { External } from "@/components/icons";
import { Photo } from "@/components/photo";
import { CtaBand, PageHero } from "@/components/sections";
import { Container, Eyebrow, Ornament, SectionHeading } from "@/components/ui";
import { getPage, getSettings, getShared, paragraphs } from "@/lib/cms";
import { licenseLabel, site } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPage("aboutPage");
  return {
    title: "About Us",
    description: page.seo?.description,
    alternates: { canonical: "/about" },
  };
}

const numerals = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII"];

export default async function AboutPage() {
  const [page, settings, { promises }] = await Promise.all([
    getPage("aboutPage"),
    getSettings(),
    getShared(),
  ]);

  const credentials = [
    { label: "AZ ROC License", value: licenseLabel(settings).replace("AZ ROC ", "") },
    { label: "Ownership", value: "Family-owned & operated" },
    settings.bondedAndInsured
      ? { label: "Protection", value: "Bonded & insured" }
      : { label: "Headquarters", value: `${settings.homeBase}, AZ` },
    { label: "Service Area", value: "All of Arizona" },
  ];

  return (
    <>
      <PageHero {...page.hero} crumbs={[{ href: "/about", label: "About" }]} />

      {/* Name / story */}
      <section className="py-24 sm:py-32">
        <Container className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading {...page.storyHeading} />
            <Ornament className="mt-10 justify-start" />
          </div>
          <div className="space-y-6 text-lg leading-relaxed text-muted lg:col-span-7">
            {page.storyLead && (
              <p className="font-display text-3xl leading-snug text-text">{page.storyLead}</p>
            )}
            {paragraphs(page.storyBody).map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </Container>
      </section>

      {/* Owners */}
      <section className="bg-ink py-24 sm:py-32">
        <Container className="grid items-center gap-16 lg:grid-cols-2 lg:gap-24">
          <div className="relative isolate">
            <div className="relative aspect-[4/5] overflow-hidden">
              <Photo image={page.ownersImage} sizes="(min-width: 1024px) 45vw, 100vw" />
            </div>
            <div className="absolute -right-5 -bottom-5 -z-10 hidden h-2/3 w-2/3 border border-gold/40 sm:block" />
          </div>
          <div>
            <SectionHeading tone="dark" {...page.ownersHeading} />
            <ul className="mt-8 grid gap-px overflow-hidden border border-line-dark bg-line-dark sm:grid-cols-2">
              {settings.owners.map((o) => (
                <li key={o.name} className="bg-ink-2 p-6">
                  <p className="font-display text-2xl text-ivory">{o.name}</p>
                  <p className="mt-1 text-xs tracking-[0.18em] text-gold uppercase">{o.title}</p>
                </li>
              ))}
            </ul>
            <div className="mt-8 space-y-5 text-lg leading-relaxed text-ivory/80">
              {paragraphs(page.ownersBody).map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <dl className="mt-12 grid grid-cols-2 gap-px overflow-hidden border border-line-dark bg-line-dark">
              {credentials.map((c) => (
                <div key={c.label} className="bg-ink-2 p-6">
                  <dt className="text-xs tracking-[0.18em] text-mist uppercase">{c.label}</dt>
                  <dd className="mt-2 font-display text-2xl text-gold-light">{c.value}</dd>
                </div>
              ))}
            </dl>
            <a
              href={site.rocVerifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 text-sm text-mist transition-colors hover:text-gold-light"
            >
              Look up our license on the Arizona ROC website
              <External className="size-3.5" />
            </a>
          </div>
        </Container>
      </section>

      {/* Values */}
      <section className="py-24 sm:py-32">
        <Container>
          <SectionHeading align="center" {...page.valuesHeading} />
          <ul className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {page.values.map((v, i) => (
              <li key={v.title} className="border-t border-bronze/30 pt-8">
                <span className="font-display text-lg text-gold-deep">{numerals[i] ?? i + 1}.</span>
                <h3 className="mt-3 font-display text-3xl text-text">{v.title}</h3>
                <p className="mt-4 leading-relaxed text-muted">{v.body}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Family */}
      <section className="relative isolate overflow-hidden bg-sand py-24 sm:py-32">
        <Container className="grid items-center gap-16 lg:grid-cols-2">
          <div>
            <SectionHeading {...page.familyHeading} />
          </div>
          <div className="relative aspect-[3/2] overflow-hidden">
            <Photo image={page.familyImage} sizes="(min-width: 1024px) 45vw, 100vw" />
          </div>
        </Container>
      </section>

      {/* Promises */}
      <section className="py-24 sm:py-32">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              {page.promisesHeading.eyebrow && <Eyebrow>{page.promisesHeading.eyebrow}</Eyebrow>}
              <h2 className="mt-4 font-display text-4xl leading-tight font-medium text-text sm:text-5xl">
                {page.promisesHeading.title}
              </h2>
            </div>
            <ul className="grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:col-span-8">
              {promises.map((p) => (
                <li key={p.title}>
                  <h3 className="flex items-center gap-3 font-display text-2xl text-text">
                    <span aria-hidden="true" className="size-2 rotate-45 bg-gold-deep" />
                    {p.title}
                  </h3>
                  <p className="mt-3 leading-relaxed text-muted">{p.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
