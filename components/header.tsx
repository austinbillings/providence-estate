"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { phoneHref } from "@/lib/site";
import { BookingButton, PhoneLink } from "./cta";
import { ChevronDown, Close, Mail, MapPin, Menu } from "./icons";
import { useSettings } from "./settings-provider";
import { cn, Container } from "./ui";
import monogram from "@/public/brand/monogram.png";

const nav = [
  { href: "/services", label: "Services" },
  { href: "/process", label: "Our Process" },
  { href: "/about", label: "About" },
  { href: "/service-areas", label: "Service Areas" },
  { href: "/contact", label: "Contact" },
];

export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn("flex items-center gap-3", className)}>
      <Image src={monogram} alt="" className="h-11 w-auto" priority />
      <span className="flex flex-col leading-none">
        <span className="font-brand text-[1.15rem] tracking-[0.2em] text-gold-light">
          PROVIDENCE
        </span>
        <span className="mt-1.5 font-brand text-[0.6rem] tracking-[0.42em] text-gold/90">
          ESTATE BUILDERS
        </span>
      </span>
    </span>
  );
}

export function Header() {
  const pathname = usePathname();
  const site = useSettings();
  const { services, credentialLine } = site;
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      <a
        href="#main"
        className="sr-only z-[60] bg-gold-light px-4 py-2 text-ink focus:not-sr-only focus:fixed focus:top-2 focus:left-2"
      >
        Skip to content
      </a>

      {/* Utility bar */}
      <div className="hidden border-b border-line-dark bg-ink text-[0.72rem] tracking-wide text-mist lg:block">
        <Container className="flex h-10 items-center justify-between">
          <p className="flex items-center gap-2">
            <MapPin className="size-3.5 text-gold" />
            {site.serviceAreaSummary}
          </p>
          <div className="flex items-center gap-6">
            <span>{credentialLine}</span>
            <a
              href={`mailto:${site.email}`}
              className="flex items-center gap-2 transition-colors hover:text-gold-light"
            >
              <Mail className="size-3.5 text-gold" />
              {site.email}
            </a>
            <PhoneLink className="transition-colors hover:text-gold-light [&_svg]:text-gold" />
          </div>
        </Container>
      </div>

      <header
        className={cn(
          "sticky top-0 z-50 border-b transition-[background-color,border-color,box-shadow] duration-300",
          scrolled
            ? "border-line-dark bg-ink/95 shadow-[0_8px_30px_rgb(0_0_0/0.35)] backdrop-blur-md"
            : "border-transparent bg-ink",
        )}
      >
        <Container className="flex h-20 items-center justify-between gap-6">
          <Link
            href="/"
            aria-label={`${site.name} — home`}
            onClick={() => setOpen(false)}
          >
            <Wordmark />
          </Link>

          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-6 xl:gap-9">
              {nav.map((item) =>
                item.href === "/services" ? (
                  <li key={item.href} className="group relative">
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center gap-1.5 py-7 text-[0.74rem] font-semibold tracking-[0.12em] whitespace-nowrap uppercase transition-colors hover:text-gold-light xl:text-[0.78rem] xl:tracking-[0.16em]",
                        isActive(item.href) ? "text-gold-light" : "text-ivory/85",
                      )}
                    >
                      {item.label}
                      <ChevronDown className="size-3.5 transition-transform duration-300 group-focus-within:rotate-180 group-hover:rotate-180" />
                    </Link>
                    <div className="invisible absolute top-full left-1/2 w-72 -translate-x-1/2 translate-y-2 opacity-0 transition-all duration-300 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                      <ul className="border border-line-dark border-t-gold bg-ink-2 py-3 shadow-2xl">
                        {services.map((service) => (
                          <li key={service.slug}>
                            <Link
                              href={`/services/${service.slug}`}
                              className="block px-6 py-2.5 text-sm text-ivory/85 transition-colors hover:bg-ink-3 hover:text-gold-light"
                            >
                              {service.name}
                            </Link>
                          </li>
                        ))}
                        <li className="mx-6 mt-2 border-t border-line-dark pt-3">
                          <Link
                            href="/services"
                            className="block py-1 text-xs font-semibold tracking-[0.16em] text-gold-light uppercase hover:text-ivory"
                          >
                            All services →
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </li>
                ) : (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={isActive(item.href) ? "page" : undefined}
                      className={cn(
                        "py-7 text-[0.74rem] font-semibold tracking-[0.12em] whitespace-nowrap uppercase transition-colors hover:text-gold-light xl:text-[0.78rem] xl:tracking-[0.16em]",
                        isActive(item.href) ? "text-gold-light" : "text-ivory/85",
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </nav>

          <div className="hidden lg:block">
            <BookingButton className="px-5 py-3 text-[0.72rem] whitespace-nowrap">
              Free Estimate
            </BookingButton>
          </div>

          <button
            type="button"
            className="-mr-2 p-2 text-gold-light lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <Close className="size-7" /> : <Menu className="size-7" />}
          </button>
        </Container>

      </header>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        hidden={!open}
        className="fixed inset-x-0 top-20 bottom-0 z-40 overflow-y-auto border-t border-line-dark bg-ink lg:hidden"
      >
        <Container className="flex min-h-full flex-col py-8">
          <nav aria-label="Mobile">
            <ul className="divide-y divide-line-dark">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "block py-4 font-display text-3xl",
                      isActive(item.href) ? "text-gold-light" : "text-ivory",
                    )}
                  >
                    {item.label}
                  </Link>
                  {item.href === "/services" && (
                    <ul className="grid grid-cols-2 gap-x-4 gap-y-2 pb-5">
                      {services.map((service) => (
                        <li key={service.slug}>
                          <Link
                            href={`/services/${service.slug}`}
                            onClick={() => setOpen(false)}
                            className="text-sm text-mist hover:text-gold-light"
                          >
                            {service.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </nav>
          <div className="mt-auto space-y-4 pt-10">
            <BookingButton className="w-full" />
            <div className="flex flex-col items-center gap-3 pt-2 text-sm text-mist">
              <a href={`mailto:${site.email}`} className="hover:text-gold-light">
                {site.email}
              </a>
              {site.phone && (
                <a href={phoneHref(site.phone)} className="hover:text-gold-light">
                  {site.phone}
                </a>
              )}
              <p className="text-xs text-mist/70">{credentialLine}</p>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}
