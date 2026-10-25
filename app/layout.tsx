import type { Metadata, Viewport } from "next";
import { Cinzel, Gloock, Manrope } from "next/font/google";
import { getSettings } from "@/lib/cms";
import { site } from "@/lib/site";
import "./globals.css";

const gloock = Gloock({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-gloock",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["500"],
  variable: "--font-cinzel",
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();
  return {
    metadataBase: new URL(site.url),
    title: {
      default: `${settings.name} | Custom Homes & Remodeling in Arizona`,
      template: `%s | ${settings.name}`,
    },
    description: settings.description,
    openGraph: {
      siteName: settings.name,
      type: "website",
      locale: "en_US",
    },
  };
}

export const viewport: Viewport = {
  themeColor: "#0a0907",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${gloock.variable} ${manrope.variable} ${cinzel.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
