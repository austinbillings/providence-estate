"use client";

import { createContext, useContext, type ReactNode } from "react";

/** The slice of Business info that client components (header, CTAs, form) need. */
export type ClientSettings = {
  name: string;
  email: string;
  phone?: string;
  bookingUrl?: string;
  serviceAreaSummary: string;
  credentialLine: string;
  services: { name: string; slug: string }[];
};

const SettingsContext = createContext<ClientSettings | null>(null);

export function SettingsProvider({ value, children }: { value: ClientSettings; children: ReactNode }) {
  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}

export function useSettings() {
  const value = useContext(SettingsContext);
  if (!value) throw new Error("useSettings must be used inside <SettingsProvider>");
  return value;
}
