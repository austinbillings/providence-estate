import Image from "next/image";
import Link from "next/link";
import { getServices, getSettings } from "@/lib/cms";
import { licenseLabel, site } from "@/lib/site";
import { BookingButton, PhoneLink } from "./cta";
import { Mail, MapPin } from "./icons";
import { Container, Ornament } from "./ui";
import logo from "@/public/brand/logo-full.png";

const company = [
  { href: "/about", label: "About Us" },
  { href: "/process", label: "Our Process" },
  { href: "/service-areas", label: "Service Areas" },
  { href: "/contact", label: "Contact" },
];

export async function Footer() {
  const [settings, services] = await Promise.all([getSettings(), getServices()]);
  const year = new Date().getFullYear();
  return (
    <footer className="bg-ink text-mist">
      <Container className="grid grid-cols-2 gap-x-8 gap-y-14 py-20 lg:grid-cols-12 lg:gap-10">
        <div className="col-span-2 lg:col-span-4">
          <Link href="/" aria-label={`${settings.name} — home`} className="inline-block">
            <Image src={logo} alt={settings.name} className="h-auto w-64" />
          </Link>
          <p className="mt-8 max-w-sm text-sm leading-relaxed">{settings.footerBlurb}</p>
          <BookingButton variant="outline-gold" className="mt-8">
            Get a Free Estimate
          </BookingButton>
        </div>

        <nav aria-label="Services" className="lg:col-span-3 lg:col-start-5">
          <h2 className="eyebrow text-gold-light">Services</h2>
          <ul className="mt-6 space-y-3 text-sm">
            {services.map((s) => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}`} className="transition-colors hover:text-gold-light">
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Company" className="lg:col-span-2">
          <h2 className="eyebrow text-gold-light">Company</h2>
          <ul className="mt-6 space-y-3 text-sm">
            {company.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="transition-colors hover:text-gold-light">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="col-span-2 lg:col-span-3">
          <h2 className="eyebrow text-gold-light">Get in Touch</h2>
          <ul className="mt-6 space-y-4 text-sm">
            <li>
              <a
                href={`mailto:${settings.email}`}
                className="flex items-start gap-3 [overflow-wrap:anywhere] transition-colors hover:text-gold-light"
              >
                <Mail className="mt-0.5 size-4 shrink-0 text-gold" />
                {settings.email}
              </a>
            </li>
            {settings.phone && (
              <li>
                <PhoneLink className="gap-3 transition-colors hover:text-gold-light [&_svg]:text-gold" />
              </li>
            )}
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 size-4 shrink-0 text-gold" />
              <span>
                {settings.homeBase}, Arizona
                <span className="block text-xs text-mist/70">
                  Serving Phoenix and all of Arizona
                </span>
              </span>
            </li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-line-dark">
        <Container className="flex flex-col items-center gap-4 py-8 text-xs md:flex-row md:justify-between">
          <p>
            © {year} {settings.legalName}. All rights reserved.
          </p>
          <Ornament rules={false} className="hidden md:flex" />
          <p className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
            <a
              href={site.rocVerifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-gold-light"
            >
              Licensed {licenseLabel(settings)}
            </a>
            {settings.bondedAndInsured && <span>Bonded &amp; Insured</span>}
            <Link href="/privacy" className="transition-colors hover:text-gold-light">
              Privacy
            </Link>
          </p>
        </Container>
      </div>
    </footer>
  );
}
