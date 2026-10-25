import Link from "next/link";
import type { ReactNode } from "react";
import { type Faq, getSettings, type SiteImage } from "@/lib/cms";
import { licenseLabel } from "@/lib/site";
import { BookingButton, PhoneLink } from "./cta";
import { Award, Calendar, Family, MapPin, Shield } from "./icons";
import { Photo } from "./photo";
import { ButtonLink, cn, Container, Eyebrow, Ornament } from "./ui";

/** Image-backed title block at the top of interior pages. */
export function PageHero({
  eyebrow,
  title,
  intro,
  image,
  crumbs,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  image?: SiteImage;
  crumbs?: { href: string; label: string }[];
  children?: ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-ink">
      <Photo
        image={image}
        sizes="100vw"
        priority
        className="-z-20 animate-hero-zoom opacity-55"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink via-ink/85 to-ink/30" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-32 bg-gradient-to-t from-ink/70 to-transparent" />
      <Container className="py-24 sm:py-32">
        {crumbs && (
          <nav aria-label="Breadcrumb" className="mb-8 animate-rise">
            <ol className="flex flex-wrap items-center gap-2 text-xs tracking-wide text-mist">
              <li>
                <Link href="/" className="hover:text-gold-light">
                  Home
                </Link>
              </li>
              {crumbs.map((c) => (
                <li key={c.href} className="flex items-center gap-2">
                  <span aria-hidden="true" className="text-gold/60">
                    /
                  </span>
                  <Link href={c.href} className="hover:text-gold-light">
                    {c.label}
                  </Link>
                </li>
              ))}
            </ol>
          </nav>
        )}
        <div className="max-w-3xl animate-rise [animation-delay:120ms]">
          <Eyebrow tone="dark">{eyebrow}</Eyebrow>
          <h1 className="mt-5 font-display text-5xl leading-[1.04] font-medium text-balance text-ivory sm:text-6xl lg:text-7xl">
            {title}
          </h1>
          {intro && (
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-pretty text-ivory/80">
              {intro}
            </p>
          )}
          {children}
        </div>
      </Container>
    </section>
  );
}

export async function TrustBar({ className }: { className?: string }) {
  const settings = await getSettings();
  const items = [
    {
      icon: Award,
      title: licenseLabel(settings).replace("AZ ", ""),
      body: "Licensed Arizona contractor",
    },
    settings.bondedAndInsured
      ? { icon: Shield, title: "Bonded & Insured", body: "For your protection" }
      : { icon: MapPin, title: settings.homeBase, body: "Locally based, serving all of AZ" },
    { icon: Family, title: "Family-Owned", body: "Locally owned & operated" },
    { icon: Calendar, title: "Free Estimates", body: "On-site, no obligation" },
  ];
  return (
    <div className={cn("border-y border-line-dark bg-ink-2", className)}>
      <Container>
        <ul className="grid grid-cols-2 lg:grid-cols-4">
          {items.map(({ icon: Icon, title, body }, i) => (
            <li
              key={title}
              className={cn(
                "flex items-center gap-3 py-6 sm:gap-4 sm:py-7 lg:justify-center",
                i % 2 === 1 && "pl-4 sm:pl-8",
                i > 0 && "lg:border-l lg:border-line-dark lg:pl-0",
                i < 2 && "border-b border-line-dark lg:border-b-0",
              )}
            >
              <Icon className="size-6 shrink-0 text-gold sm:size-8" />
              <div>
                <p className="font-display text-[1.05rem] leading-tight text-ivory sm:text-xl">{title}</p>
                <p className="mt-0.5 text-[0.7rem] leading-snug tracking-wide text-mist sm:text-xs">{body}</p>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </div>
  );
}

export function FaqList({ faqs, tone = "light" }: { faqs: Faq[]; tone?: "light" | "dark" }) {
  return (
    <div
      className={cn(
        "divide-y border-y",
        tone === "dark" ? "divide-line-dark border-line-dark" : "divide-stone border-stone",
      )}
    >
      {faqs.map((faq) => (
        <details key={faq.question} className="group py-6 [&_summary::-webkit-details-marker]:hidden">
          <summary
            className={cn(
              "flex cursor-pointer list-none items-start justify-between gap-6 font-display text-2xl leading-snug",
              tone === "dark" ? "text-ivory" : "text-text",
            )}
          >
            {faq.question}
            <span
              aria-hidden="true"
              className={cn(
                "mt-1.5 grid size-7 shrink-0 place-items-center rounded-full border text-lg leading-none transition-transform duration-300 group-open:rotate-45",
                tone === "dark" ? "border-gold/50 text-gold-light" : "border-bronze/40 text-bronze",
              )}
            >
              +
            </span>
          </summary>
          <p
            className={cn(
              "mt-4 max-w-3xl leading-relaxed",
              tone === "dark" ? "text-mist" : "text-muted",
            )}
          >
            {faq.answer}
          </p>
        </details>
      ))}
    </div>
  );
}

/** Closing call-to-action used at the bottom of most pages. */
export async function CtaBand({ title, body }: { title?: string; body?: string }) {
  const settings = await getSettings();
  return (
    <section className="relative isolate overflow-hidden bg-ink">
      <Photo image={settings.ctaImage} sizes="100vw" className="-z-20 opacity-30" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-ink/80 via-ink/70 to-ink/90" />
      <Container className="py-24 text-center sm:py-32">
        <Ornament />
        <h2 className="mx-auto mt-8 max-w-3xl font-display text-4xl leading-tight font-medium text-balance text-ivory sm:text-6xl">
          {title || settings.ctaTitle}
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-ivory/80">{body || settings.ctaBody}</p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <BookingButton />
          <ButtonLink href="/contact" variant="outline-gold">
            Send Us a Message
          </ButtonLink>
        </div>
        {settings.phone && (
          <p className="mt-8 text-sm text-mist">
            Prefer to talk? Call{" "}
            <PhoneLink showIcon={false} className="text-gold-light hover:text-ivory" />
          </p>
        )}
      </Container>
    </section>
  );
}

export function NumberedSteps({
  steps,
  tone = "light",
}: {
  steps: { title: string; summary: string }[];
  tone?: "light" | "dark";
}) {
  return (
    <ol className="grid gap-px sm:grid-cols-2 lg:grid-cols-5">
      {steps.map((step, i) => (
        <li
          key={step.title}
          className={cn(
            "relative border-t pt-6 lg:pr-6",
            tone === "dark" ? "border-gold/40" : "border-bronze/30",
          )}
        >
          <span
            className={cn(
              "font-display text-5xl leading-none",
              tone === "dark" ? "text-gold" : "text-gold-deep",
            )}
          >
            {String(i + 1).padStart(2, "0")}
          </span>
          <h3
            className={cn(
              "mt-4 font-display text-2xl",
              tone === "dark" ? "text-ivory" : "text-text",
            )}
          >
            {step.title}
          </h3>
          <p
            className={cn(
              "mt-3 pb-8 text-sm leading-relaxed",
              tone === "dark" ? "text-mist" : "text-muted",
            )}
          >
            {step.summary}
          </p>
        </li>
      ))}
    </ol>
  );
}
