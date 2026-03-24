import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";

import { SiteChrome } from "@/components/site/site-chrome";
import { getSiteUrl } from "@/lib/env";
import { getSiteSettings } from "@/lib/site-data";

import "./globals.css";

const display = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const body = Jost({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export async function generateMetadata(): Promise<Metadata> {
  const siteSettings = await getSiteSettings();

  return {
    metadataBase: new URL(getSiteUrl()),
    title: {
      default: siteSettings.seoDefaultTitle,
      template: `%s | ${siteSettings.businessName}`,
    },
    description: siteSettings.seoDefaultDescription,
    applicationName: siteSettings.businessName,
    authors: [{ name: siteSettings.businessName }],
    creator: siteSettings.businessName,
    publisher: siteSettings.businessName,
    category: "Bespoke carpentry and interior design",
    robots: {
      index: true,
      follow: true,
    },
    keywords: siteSettings.seoKeywords,
    manifest: "/manifest.webmanifest",
    alternates: {
      canonical: "/",
    },
    icons: {
      icon: [{ url: siteSettings.logoUrl, type: "image/jpeg" }],
      shortcut: [siteSettings.logoUrl],
      apple: [siteSettings.logoUrl],
    },
    openGraph: {
      type: "website",
      locale: "en_ZW",
      url: "/",
      siteName: siteSettings.businessName,
      title: siteSettings.seoDefaultTitle,
      description: siteSettings.seoDefaultDescription,
      images: [siteSettings.ogImageUrl],
    },
    twitter: {
      card: "summary_large_image",
      title: `${siteSettings.businessName} | Carpentry & Interior Design — Victoria Falls`,
      description: siteSettings.seoDefaultDescription,
      images: [siteSettings.ogImageUrl],
    },
    other: {
      "geo.region": "ZW-MN",
      "geo.placename": "Victoria Falls, Zimbabwe",
      "geo.position": "-17.9243;25.8572",
      ICBM: "-17.9243,25.8572",
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteSettings = await getSiteSettings();

  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>
        <SiteChrome siteSettings={siteSettings}>{children}</SiteChrome>
      </body>
    </html>
  );
}
