import type { Metadata } from "next";
import { BookingButton, PhoneLink } from "@/components/cta";
import { Calendar, External, Mail, MapPin } from "@/components/icons";
import { PageHero } from "@/components/sections";
import { Container, Eyebrow } from "@/components/ui";
import { getPage, getServices, getSettings } from "@/lib/cms";
import { projectTypesFor } from "@/lib/inquiries";
import { credentialLine, site } from "@/lib/site";
import { ContactForm } from "./contact-form";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPage("contactPage");
  return {
    title: "Contact Us & Free Estimates",
    description: page.seo?.description,
    alternates: { canonical: "/contact" },
  };
}

export default async function ContactPage({ searchParams }: PageProps<"/contact">) {
  const [{ type }, page, settings, services] = await Promise.all([
    searchParams,
    getPage("contactPage"),
    getSettings(),
    getServices(),
  ]);
  const preselected = services.find((s) => s.slug === type)?.name;
  const { formHeading } = page;

  return (
    <>
      <PageHero {...page.hero} crumbs={[{ href: "/contact", label: "Contact" }]} />

      <section className="py-20 sm:py-28">
        <Container className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-7 xl:col-span-8">
            {formHeading.eyebrow && <Eyebrow>{formHeading.eyebrow}</Eyebrow>}
            <h2 className="mt-4 font-display text-4xl font-medium text-text sm:text-5xl">
              {formHeading.title}
            </h2>
            {formHeading.intro && <p className="mt-4 max-w-xl text-muted">{formHeading.intro}</p>}
            <div className="mt-10">
              <ContactForm
                projectTypes={projectTypesFor(services.map((s) => s.name))}
                defaultProjectType={preselected}
              />
            </div>
          </div>

          <aside className="space-y-8 lg:col-span-5 xl:col-span-4">
            {settings.bookingUrl && (
              <div className="bg-ink p-8 text-ivory">
                <Calendar className="size-8 text-gold" />
                <h2 className="mt-5 font-display text-3xl">Prefer to pick a time?</h2>
                <p className="mt-3 text-sm leading-relaxed text-mist">
                  Book your free consultation directly on our calendar.
                </p>
                <BookingButton className="mt-6 w-full" />
              </div>
            )}

            <div className="border border-stone bg-sand p-8">
              <h2 className="font-display text-3xl text-text">Reach us directly</h2>
              <ul className="mt-6 space-y-4 text-text">
                <li>
                  <a href={`mailto:${settings.email}`} className="flex items-center gap-3 [overflow-wrap:anywhere] hover:text-bronze">
                    <Mail className="size-5 shrink-0 text-gold-deep" />
                    {settings.email}
                  </a>
                </li>
                {settings.phone && (
                  <li>
                    <PhoneLink className="gap-3 hover:text-bronze [&_svg]:size-5 [&_svg]:text-gold-deep" />
                  </li>
                )}
                <li className="flex items-start gap-3">
                  <MapPin className="mt-0.5 size-5 shrink-0 text-gold-deep" />
                  <span>
                    {settings.homeBase}, Arizona
                    <span className="block text-sm text-muted">Serving all of Arizona</span>
                  </span>
                </li>
              </ul>
              <p className="mt-6 border-t border-stone pt-6 text-xs text-muted">
                {credentialLine(settings)}
                <a
                  href={site.rocVerifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 flex items-center gap-1.5 text-bronze hover:text-text"
                >
                  Verify with the AZ ROC <External className="size-3" />
                </a>
              </p>
            </div>

            <div className="p-2">
              <h2 className="eyebrow text-bronze">What happens next</h2>
              <ol className="mt-6 space-y-6">
                {page.nextSteps.map((step, i) => (
                  <li key={step.title} className="flex gap-5">
                    <span className="font-display text-3xl leading-none text-gold-deep">{i + 1}</span>
                    <div>
                      <h3 className="font-display text-xl text-text">{step.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-muted">{step.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </aside>
        </Container>
      </section>
    </>
  );
}
