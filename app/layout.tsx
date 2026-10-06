import type { Metadata, Viewport } from "next";
import { Cinzel } from "next/font/google";
import "./globals.css";

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-cinzel",
});

const description =
  "Built on faith. Designed for generations. Custom homes and estate construction by Providence Estate Builders.";

export const metadata: Metadata = {
  metadataBase: new URL("https://providenceestate.com"),
  title: "Providence Estate Builders",
  description,
  openGraph: {
    title: "Providence Estate Builders",
    description,
    url: "/",
    siteName: "Providence Estate Builders",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#040404",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cinzel.variable}>
      <body>{children}</body>
    </html>
  );
}
