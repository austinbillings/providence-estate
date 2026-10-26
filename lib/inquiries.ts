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

const FROM = "Providence Website <inquiries@mail.providenceestate.com>";

function inquiryLines(inquiry: Inquiry) {
  const optional = (label: string, value: string) => (value ? [`${label}: ${value}`] : []);
  return [
    `Name: ${inquiry.name}`,
    `Email: ${inquiry.email}`,
    ...optional("Phone", inquiry.phone),
    `Project location: ${inquiry.location}`,
    `Project type: ${inquiry.projectType}`,
    ...optional("Timeline", inquiry.timeline),
    ...optional("Budget", inquiry.budget),
    ...optional("Heard about us", inquiry.referral),
  ];
}

const inquirySubject = (inquiry: Inquiry) =>
  `Project inquiry: ${inquiry.projectType} — ${inquiry.name}`;

const escapeHtml = (text: string) =>
  text.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

/**
 * Emails a new lead to the business through Resend, with the visitor as
 * reply-to so the owners can answer straight from their inbox. Returns false
 * (and the form falls back to a pre-filled email) if Resend isn't configured
 * or the send fails, so no lead is silently dropped.
 */
export async function deliverInquiry(inquiry: Inquiry, to: string): Promise<boolean> {
  // Visible in server / Vercel function logs as a last-resort record.
  console.info("[inquiry]", JSON.stringify(inquiry));

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return false;

  const lines = inquiryLines(inquiry);
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: FROM,
      to: [to],
      reply_to: inquiry.email,
      subject: inquirySubject(inquiry),
      text: [...lines, "", inquiry.message].join("\n"),
      html: `<p>${lines.map(escapeHtml).join("<br>")}</p><p style="white-space:pre-wrap">${escapeHtml(inquiry.message)}</p>`,
    }),
  });
  if (!res.ok) {
    console.error("[inquiry] Resend rejected the email", res.status, await res.text());
    return false;
  }
  return true;
}

/** Pre-filled email fallback for when online delivery isn't available. */
export function inquiryMailto(inquiry: Inquiry, to: string) {
  const lines = [...inquiryLines(inquiry), "", inquiry.message.slice(0, 1500)];
  return `mailto:${to}?subject=${encodeURIComponent(inquirySubject(inquiry))}&body=${encodeURIComponent(lines.join("\n"))}`;
}
