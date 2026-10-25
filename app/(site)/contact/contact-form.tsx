"use client";

import Link from "next/link";
import { useActionState, useEffect, useRef, type ReactNode } from "react";
import { Mail } from "@/components/icons";
import { buttonClass, cn, Ornament } from "@/components/ui";
import { useSettings } from "@/components/settings-provider";
import { budgets, referralSources, timelines } from "@/lib/inquiries";
import { type Field, type InquiryState, submitInquiry } from "./actions";

const initialState: InquiryState = { status: "idle", attempt: 0 };

const fieldOrder: Field[] = ["name", "email", "phone", "location", "projectType", "message"];

const inputClass =
  "mt-2 block w-full border border-stone bg-cream px-4 py-3.5 text-text placeholder:text-muted/60 transition-colors focus:border-gold-deep focus:bg-white focus:ring-1 focus:ring-gold-deep focus:outline-none aria-[invalid=true]:border-red-700";

function FieldShell({
  id,
  label,
  optional,
  error,
  className,
  children,
}: {
  id: Field;
  label: string;
  optional?: boolean;
  error?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="flex items-baseline justify-between text-xs font-semibold tracking-[0.14em] text-text uppercase">
        {label}
        {optional && <span className="font-normal tracking-normal text-muted normal-case">Optional</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-2 text-sm text-red-800">
          {error}
        </p>
      )}
    </div>
  );
}

function Select({
  id,
  options,
  placeholder,
  defaultValue,
  error,
  required,
}: {
  id: Field;
  options: string[];
  placeholder: string;
  defaultValue?: string;
  error?: string;
  required?: boolean;
}) {
  return (
    <div className="relative">
      <select
        id={id}
        name={id}
        required={required}
        defaultValue={defaultValue ?? ""}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(inputClass, "appearance-none pr-10")}
      >
        <option value="" disabled={required}>
          {placeholder}
        </option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      <span aria-hidden="true" className="pointer-events-none absolute right-4 bottom-4 text-xs text-bronze">
        ▼
      </span>
    </div>
  );
}

export function ContactForm({
  projectTypes,
  defaultProjectType,
}: {
  projectTypes: string[];
  defaultProjectType?: string;
}) {
  const site = useSettings();
  const [state, formAction, pending] = useActionState(submitInquiry, initialState);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (state.status === "invalid" && state.errors) {
      const first = fieldOrder.find((f) => state.errors?.[f]);
      if (first) document.getElementById(first)?.focus();
    }
    if (state.status === "sent" || state.status === "fallback") {
      panelRef.current?.focus();
      panelRef.current?.scrollIntoView({ block: "center" });
    }
  }, [state]);

  if (state.status === "sent" || state.status === "fallback") {
    return (
      <div
        ref={panelRef}
        tabIndex={-1}
        role="status"
        className="bg-ink px-8 py-16 text-center outline-none sm:px-14"
      >
        <Ornament />
        <h2 className="mt-8 font-display text-4xl text-ivory sm:text-5xl">
          Thank you, {state.name}.
        </h2>
        {state.status === "sent" ? (
          <p className="mx-auto mt-5 max-w-md text-lg leading-relaxed text-mist">
            We got your message, and we&apos;ll be in touch soon.
          </p>
        ) : (
          <>
            <p className="mx-auto mt-5 max-w-md text-lg leading-relaxed text-mist">
              One more step: send it to us by email. We&apos;ve already
              written it out, so you just need to hit send.
            </p>
            <a href={state.mailto} className={buttonClass("gold", "mt-10")}>
              <Mail className="size-4" />
              Send by Email
            </a>
            <p className="mt-6 text-sm text-mist">
              Or write to us directly at{" "}
              <a href={`mailto:${site.email}`} className="text-gold-light underline underline-offset-4">
                {site.email}
              </a>
            </p>
          </>
        )}
      </div>
    );
  }

  const v = state.values ?? {};
  const e = state.errors ?? {};
  const invalid = (f: Field) =>
    e[f] ? { "aria-invalid": true as const, "aria-describedby": `${f}-error` } : {};

  return (
    <form key={state.attempt} action={formAction} noValidate className="space-y-7">
      {state.status === "invalid" && (
        <p role="alert" className="border-l-2 border-red-800 bg-red-50 px-4 py-3 text-sm text-red-900">
          Please check the highlighted fields below.
        </p>
      )}

      <div className="grid gap-7 sm:grid-cols-2">
        <FieldShell id="name" label="Full name" error={e.name}>
          <input id="name" name="name" autoComplete="name" required defaultValue={v.name} className={inputClass} {...invalid("name")} />
        </FieldShell>
        <FieldShell id="email" label="Email" error={e.email}>
          <input id="email" name="email" type="email" autoComplete="email" required defaultValue={v.email} className={inputClass} {...invalid("email")} />
        </FieldShell>
        <FieldShell id="phone" label="Phone" optional error={e.phone}>
          <input id="phone" name="phone" type="tel" autoComplete="tel" defaultValue={v.phone} className={inputClass} {...invalid("phone")} />
        </FieldShell>
        <FieldShell id="location" label="Project city" error={e.location}>
          <input id="location" name="location" autoComplete="address-level2" placeholder="e.g. Peoria" required defaultValue={v.location} className={inputClass} {...invalid("location")} />
        </FieldShell>
        <FieldShell id="projectType" label="Project type" error={e.projectType}>
          <Select id="projectType" options={projectTypes} placeholder="Select a project type" defaultValue={v.projectType ?? defaultProjectType} error={e.projectType} required />
        </FieldShell>
        <FieldShell id="timeline" label="Timeline" optional>
          <Select id="timeline" options={timelines} placeholder="When would you like to start?" defaultValue={v.timeline} />
        </FieldShell>
        <FieldShell id="budget" label="Estimated budget" optional>
          <Select id="budget" options={budgets} placeholder="Select a range" defaultValue={v.budget} />
        </FieldShell>
        <FieldShell id="referral" label="How did you hear about us?" optional>
          <Select id="referral" options={referralSources} placeholder="Select one" defaultValue={v.referral} />
        </FieldShell>
      </div>

      <FieldShell id="message" label="Tell us about your project" error={e.message}>
        <textarea
          id="message"
          name="message"
          rows={6}
          required
          defaultValue={v.message}
          placeholder="What are you hoping to build or change? Anything about the house, the lot, or your timing helps."
          className={cn(inputClass, "resize-y")}
          {...invalid("message")}
        />
      </FieldShell>

      {/* Honeypot for bots, hidden from people and assistive tech. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-col gap-5 border-t border-stone pt-7 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-sm text-xs leading-relaxed text-muted">
          We&apos;ll only use this to get back to you. See our{" "}
          <Link href="/privacy" className="text-bronze underline underline-offset-2">
            privacy policy
          </Link>
          .
        </p>
        <button type="submit" disabled={pending} className={buttonClass("dark", "shrink-0 disabled:opacity-60")}>
          {pending ? "Sending…" : "Request My Free Estimate"}
        </button>
      </div>
    </form>
  );
}
