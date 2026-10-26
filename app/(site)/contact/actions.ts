"use server";

import { getServices, getSettings } from "@/lib/cms";
import {
  budgets,
  deliverInquiry,
  type Inquiry,
  inquiryMailto,
  projectTypesFor,
  referralSources,
  timelines,
} from "@/lib/inquiries";

export type Field = Exclude<keyof Inquiry, "submittedAt">;

export type InquiryState = {
  status: "idle" | "invalid" | "sent" | "fallback";
  /** Increments per submission so the form remounts with the submitted values. */
  attempt: number;
  values?: Partial<Record<Field, string>>;
  errors?: Partial<Record<Field, string>>;
  name?: string;
  mailto?: string;
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function text(formData: FormData, key: string, max = 200) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function oneOf(value: string, options: string[]) {
  return options.includes(value) ? value : "";
}

export async function submitInquiry(
  prev: InquiryState,
  formData: FormData,
): Promise<InquiryState> {
  const attempt = prev.attempt + 1;

  // Honeypot: real visitors never see or fill this field.
  if (text(formData, "website")) {
    return { status: "sent", attempt, name: "there" };
  }

  const [settings, services] = await Promise.all([getSettings(), getServices()]);
  const projectTypes = projectTypesFor(services.map((s) => s.name));

  const values = {
    name: text(formData, "name", 100),
    email: text(formData, "email", 200),
    phone: text(formData, "phone", 40),
    location: text(formData, "location", 120),
    projectType: oneOf(text(formData, "projectType"), projectTypes),
    timeline: oneOf(text(formData, "timeline"), timelines),
    budget: oneOf(text(formData, "budget"), budgets),
    referral: oneOf(text(formData, "referral"), referralSources),
    message: text(formData, "message", 5000),
  };

  const errors: InquiryState["errors"] = {};
  if (values.name.length < 2) errors.name = "Please enter your name.";
  if (!EMAIL.test(values.email)) errors.email = "Please enter a valid email address.";
  if (values.phone && values.phone.replace(/\D/g, "").length < 10)
    errors.phone = "Please enter a 10-digit phone number, or leave this blank.";
  if (values.location.length < 2) errors.location = "Let us know the city or area of your project.";
  if (!values.projectType) errors.projectType = "Please choose a project type.";
  if (values.message.length < 10)
    errors.message = "Tell us a little about your project (a sentence or two is plenty).";

  if (Object.keys(errors).length) {
    return { status: "invalid", attempt, values, errors };
  }

  const inquiry: Inquiry = { ...values, submittedAt: new Date().toISOString() };
  const firstName = values.name.split(/\s+/)[0];

  let delivered = false;
  try {
    // INQUIRY_TO redirects leads (e.g. to a developer) for testing.
    delivered = await deliverInquiry(inquiry, process.env.INQUIRY_TO || settings.email);
  } catch (error) {
    console.error("[inquiry] delivery failed", error);
  }

  return delivered
    ? { status: "sent", attempt, name: firstName }
    : { status: "fallback", attempt, name: firstName, values, mailto: inquiryMailto(inquiry, settings.email) };
}
