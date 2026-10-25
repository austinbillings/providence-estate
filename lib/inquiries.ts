/** Form options: every service from the Studio, plus catch-alls. */
export const projectTypesFor = (serviceNames: string[]) => [
  ...serviceNames,
  "Outdoor Living / Patio",
  "Repair or Other",
];

export const timelines = [
  "As soon as possible",
  "Within 3 months",
  "3–6 months",
  "6–12 months",
  "Just planning ahead",
];

export const budgets = [
  "Under $25,000",
  "$25,000 – $75,000",
  "$75,000 – $150,000",
  "$150,000 – $500,000",
  "$500,000+",
  "Not sure yet",
];

export const referralSources = [
  "Google or online search",
  "Referral from friend or family",
  "Social media",
  "Saw a job site or sign",
  "Other",
];

export type Inquiry = {
  name: string;
  email: string;
  phone: string;
  location: string;
  projectType: string;
  timeline: string;
  budget: string;
  referral: string;
  message: string;
  submittedAt: string;
};

/**
 * Sends a new lead to the business.
 *
 * TODO(delivery): not wired up yet. Connect an email service (e.g. Resend),
 * form backend, or CRM here and return `true` once the inquiry is delivered.
 * While this returns `false`, the contact form asks the visitor to send their
 * (pre-filled) message by email instead, so no lead is silently dropped.
 */
export async function deliverInquiry(inquiry: Inquiry): Promise<boolean> {
  // Visible in server / Vercel function logs as a last-resort record.
  console.info("[inquiry]", JSON.stringify(inquiry));
  return false;
}

/** Pre-filled email fallback for when online delivery isn't available. */
export function inquiryMailto(inquiry: Inquiry, to: string) {
  const optional = (label: string, value: string) => (value ? [`${label}: ${value}`] : []);
  const lines = [
    `Name: ${inquiry.name}`,
    `Email: ${inquiry.email}`,
    ...optional("Phone", inquiry.phone),
    `Project location: ${inquiry.location}`,
    `Project type: ${inquiry.projectType}`,
    ...optional("Timeline", inquiry.timeline),
    ...optional("Budget", inquiry.budget),
    ...optional("Heard about us", inquiry.referral),
    "",
    inquiry.message.slice(0, 1500),
  ];
  const subject = `Project inquiry: ${inquiry.projectType} — ${inquiry.name}`;
  return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`;
}
