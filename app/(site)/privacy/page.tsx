import type { Metadata } from "next";
import { Container, Eyebrow } from "@/components/ui";
import { getSettings } from "@/lib/cms";
import { site } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  const { legalName } = await getSettings();
  return {
    title: "Privacy Policy",
    description: `How ${legalName} collects and uses information submitted through this website.`,
    alternates: { canonical: "/privacy" },
  };
}

export default async function PrivacyPage() {
  const settings = await getSettings();
  return (
    <section className="py-24 sm:py-32">
      <Container className="max-w-3xl">
        <Eyebrow>Legal</Eyebrow>
        <h1 className="mt-4 font-display text-5xl font-medium text-text sm:text-6xl">
          Privacy Policy
        </h1>
        <p className="mt-4 text-sm text-muted">Effective October 6, 2026</p>

        <div className="prose-page mt-10">
          <p>
            {settings.legalName} (&ldquo;Providence,&rdquo; &ldquo;we,&rdquo; or
            &ldquo;us&rdquo;) respects your privacy. This policy explains what
            information we collect through {site.url.replace("https://", "")} and
            how we use it.
          </p>

          <h2>Information we collect</h2>
          <p>
            When you contact us or request an estimate, we collect the details
            you choose to provide, such as your name, email address, phone
            number, project location, and information about your project.
          </p>
          <p>
            Like most websites, our hosting provider may automatically log basic
            technical information (such as your browser type, device, and IP
            address) to keep the site secure and running reliably.
          </p>

          <h2>How we use your information</h2>
          <ul>
            <li>To respond to your inquiry and schedule consultations</li>
            <li>To prepare estimates and proposals for your project</li>
            <li>To communicate with you about work we&apos;re performing for you</li>
            <li>To maintain the security and performance of our website</li>
          </ul>

          <h2>How we share information</h2>
          <p>
            We do not sell or rent your personal information. We share it only
            with service providers who help us operate our business and website
            (for example, website hosting and email services), and only as
            needed to provide those services, or when required by law.
          </p>

          <h2>Data retention</h2>
          <p>
            We keep inquiry and project information for as long as needed to
            respond to you, complete your project, and meet our legal, warranty,
            and record-keeping obligations.
          </p>

          <h2>Your choices</h2>
          <p>
            You may ask us to access, correct, or delete the personal
            information you&apos;ve shared with us by emailing{" "}
            <a href={`mailto:${settings.email}`}>{settings.email}</a>.
          </p>

          <h2>Children&apos;s privacy</h2>
          <p>
            This website is not directed to children under 13, and we do not
            knowingly collect information from them.
          </p>

          <h2>Changes to this policy</h2>
          <p>
            We may update this policy from time to time. The effective date
            above reflects the most recent version.
          </p>

          <h2>Contact us</h2>
          <p>
            Questions about this policy? Email us at{" "}
            <a href={`mailto:${settings.email}`}>{settings.email}</a>.
          </p>
        </div>
      </Container>
    </section>
  );
}
