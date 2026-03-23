import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";

import { SiteFooter } from "@/components/site/footer";
import { SiteHeader } from "@/components/site/header";
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

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default:
      "Winmore Creations | Bespoke Carpentry, Interior Design & Flooring in Victoria Falls, Zimbabwe",
    template: "%s | Winmore Creations",
  },
  description:
    "Winmore Creations is Victoria Falls' premier carpentry and interior design studio. We craft bespoke wooden furniture, luxury epoxy flooring, custom desks, chairs, and full interior transformations across Zimbabwe.",
  applicationName: "Winmore Creations",
  authors: [{ name: "Winmore Creations" }],
  creator: "Winmore Creations",
  publisher: "Winmore Creations",
  category: "Bespoke carpentry and interior design",
  robots: {
    index: true,
    follow: true,
  },
  keywords: [
    "carpentry Victoria Falls",
    "interior design Victoria Falls Zimbabwe",
    "epoxy flooring Victoria Falls",
    "wooden flooring Zimbabwe",
    "custom furniture Zimbabwe",
  ],
  manifest: "/manifest.webmanifest",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_ZW",
    url: "/",
    siteName: "Winmore Creations",
    title:
      "Winmore Creations | Bespoke Carpentry, Interior Design & Flooring in Victoria Falls, Zimbabwe",
    description:
      "Bespoke carpentry, custom furniture, epoxy flooring, wooden floors, and interior design in Victoria Falls, Zimbabwe.",
    images: ["/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Winmore Creations | Carpentry & Interior Design — Victoria Falls",
    description:
      "Bespoke furniture, epoxy flooring, and interior design in Victoria Falls, Zimbabwe.",
    images: ["/opengraph-image"],
  },
  other: {
    "geo.region": "ZW-MN",
    "geo.placename": "Victoria Falls, Zimbabwe",
    "geo.position": "-17.9243;25.8572",
    ICBM: "-17.9243,25.8572",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteSettings = await getSiteSettings();

  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>
        <div className="site-frame">
          <SiteHeader brandName={siteSettings.businessName} />
          {children}
          <SiteFooter siteSettings={siteSettings} />
        </div>
      </body>
    </html>
  );
}
