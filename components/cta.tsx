"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { phoneHref } from "@/lib/site";
import { Phone } from "./icons";
import { useSettings } from "./settings-provider";
import { buttonClass, cn } from "./ui";

type Variant = Parameters<typeof buttonClass>[0];

/**
 * Primary "book a time" CTA. Opens the booking page once a booking link is set
 * in Business info; until then it routes to the contact page.
 */
export function BookingButton({
  variant = "gold",
  className,
  children = "Schedule a Free Estimate",
}: {
  variant?: Variant;
  className?: string;
  children?: ReactNode;
}) {
  const { bookingUrl } = useSettings();
  if (bookingUrl) {
    return (
      <a
        href={bookingUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={buttonClass(variant, className)}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href="/contact" className={buttonClass(variant, className)}>
      {children}
    </Link>
  );
}

/** Renders nothing until a phone number is set in Business info. */
export function PhoneLink({
  className,
  showIcon = true,
}: {
  className?: string;
  showIcon?: boolean;
}) {
  const { phone } = useSettings();
  if (!phone) return null;
  return (
    <a
      href={phoneHref(phone)}
      className={cn("inline-flex items-center gap-2", className)}
    >
      {showIcon && <Phone className="size-4" />}
      {phone}
    </a>
  );
}
