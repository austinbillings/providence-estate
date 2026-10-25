import type { Settings } from "./cms";

/**
 * Fixed technical details. Business facts the owners can change (name, email,
 * phone, owners, claims…) live in the Studio under "Business info".
 */
export const site = {
  url: "https://providenceestate.com",
  rocVerifyUrl: "https://azroc.my.site.com/AZRoc/s/contractor-search",
} as const;

export const licenseLabel = (s: Pick<Settings, "rocLicense">) => `AZ ROC #${s.rocLicense}`;

/** Short credential line used in the top bar, footer, and contact page. */
export const credentialLine = (s: Pick<Settings, "rocLicense" | "bondedAndInsured">) =>
  s.bondedAndInsured
    ? `Licensed, Bonded & Insured · ${licenseLabel(s)}`
    : `Licensed Arizona Contractor · ${licenseLabel(s)}`;

/** Joins owner names for prose: "Jacob Felan and Steven Courchaine". */
export const ownerNames = (s: Pick<Settings, "owners">) =>
  new Intl.ListFormat("en", { type: "conjunction" }).format(s.owners.map((o) => o.name));

export function phoneHref(phone: string) {
  return `tel:+1${phone.replace(/\D/g, "").replace(/^1/, "")}`;
}
