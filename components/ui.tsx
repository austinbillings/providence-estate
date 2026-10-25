import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

export function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export function Container({
  className,
  ...props
}: ComponentProps<"div">) {
  return (
    <div
      className={cn("mx-auto w-full max-w-7xl px-5 sm:px-8", className)}
      {...props}
    />
  );
}

/** The four-diamond cluster from the logo, flanked by fine rules. */
export function Ornament({
  className,
  rules = true,
}: {
  className?: string;
  rules?: boolean;
}) {
  return (
    <div
      className={cn("flex items-center justify-center gap-3 text-gold", className)}
      aria-hidden="true"
    >
      {rules && <span className="h-px w-12 bg-current opacity-60" />}
      <svg viewBox="0 0 20 20" className="size-3.5 fill-current">
        <path d="M10 1.5 13 4.5 10 7.5 7 4.5zM10 12.5l3 3-3 3-3-3zM4.5 7l3 3-3 3-3-3zM15.5 7l3 3-3 3-3-3z" />
      </svg>
      {rules && <span className="h-px w-12 bg-current opacity-60" />}
    </div>
  );
}

export function Eyebrow({
  children,
  tone = "light",
  className,
}: {
  children: ReactNode;
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <p
      className={cn(
        "eyebrow",
        tone === "dark" ? "text-gold-light" : "text-bronze",
        className,
      )}
    >
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  tone = "light",
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  tone?: "light" | "dark";
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && <Eyebrow tone={tone}>{eyebrow}</Eyebrow>}
      <h2
        className={cn(
          "mt-4 font-display text-4xl leading-[1.08] font-medium text-balance sm:text-5xl",
          tone === "dark" ? "text-ivory" : "text-text",
        )}
      >
        {title}
      </h2>
      {intro && (
        <p
          className={cn(
            "mt-5 text-lg leading-relaxed text-pretty",
            tone === "dark" ? "text-mist" : "text-muted",
          )}
        >
          {intro}
        </p>
      )}
    </div>
  );
}

type ButtonVariant = "gold" | "outline-gold" | "outline-dark" | "dark";

const buttonStyles: Record<ButtonVariant, string> = {
  gold: "bg-gold-light text-ink hover:bg-ivory border border-gold-light hover:border-ivory",
  "outline-gold":
    "border border-gold/70 text-gold-light hover:bg-gold-light hover:text-ink hover:border-gold-light",
  "outline-dark":
    "border border-text/30 text-text hover:bg-text hover:text-cream hover:border-text",
  dark: "bg-ink text-ivory border border-ink hover:bg-ink-3 hover:border-ink-3",
};

export function buttonClass(variant: ButtonVariant = "gold", className?: string) {
  return cn(
    "inline-flex items-center justify-center gap-2.5 px-7 py-3.5 text-[0.8rem] font-semibold tracking-[0.18em] uppercase transition-colors duration-300",
    buttonStyles[variant],
    className,
  );
}

export function ButtonLink({
  href,
  variant = "gold",
  className,
  children,
  ...props
}: ComponentProps<typeof Link> & { variant?: ButtonVariant }) {
  return (
    <Link href={href} className={buttonClass(variant, className)} {...props}>
      {children}
    </Link>
  );
}

export function TextLink({
  href,
  children,
  tone = "light",
  className,
}: {
  href: string;
  children: ReactNode;
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center gap-2 text-[0.8rem] font-semibold tracking-[0.18em] uppercase",
        tone === "dark" ? "text-gold-light" : "text-bronze",
        className,
      )}
    >
      {children}
      <span
        aria-hidden="true"
        className="transition-transform duration-300 group-hover:translate-x-1"
      >
        →
      </span>
    </Link>
  );
}
