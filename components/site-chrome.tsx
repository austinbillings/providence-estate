import type { ReactNode } from "react";
import { getServices, getSettings } from "@/lib/cms";
import { businessJsonLd, JsonLd } from "@/lib/json-ld";
import { credentialLine } from "@/lib/site";
import { Footer } from "./footer";
import { Header } from "./header";
import { SettingsProvider } from "./settings-provider";

/** Header, footer, and shared settings around every public page. */
export async function SiteChrome({ children }: { children: ReactNode }) {
  const [settings, services, jsonLd] = await Promise.all([
    getSettings(),
    getServices(),
    businessJsonLd(),
  ]);
  return (
    <SettingsProvider
      value={{
        name: settings.name,
        email: settings.email,
        phone: settings.phone,
        bookingUrl: settings.bookingUrl,
        serviceAreaSummary: settings.serviceAreaSummary,
        credentialLine: credentialLine(settings),
        services: services.map(({ name, slug }) => ({ name, slug })),
      }}
    >
      <Header />
      <main id="main">{children}</main>
      <Footer />
      <JsonLd data={jsonLd} />
    </SettingsProvider>
  );
}
