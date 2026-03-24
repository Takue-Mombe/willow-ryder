import type { MetadataRoute } from "next";

import { getSiteSettings } from "@/lib/site-data";

export default async function manifest(): Promise<MetadataRoute.Manifest> {
  const siteSettings = await getSiteSettings();

  return {
    name: siteSettings.businessName,
    short_name: "Winmore",
    description:
      "Bespoke carpentry, interior design, and premium flooring in Victoria Falls, Zimbabwe.",
    start_url: "/",
    display: "standalone",
    background_color: "#faf7f2",
    theme_color: "#2c1a0e",
    icons: [
      {
        src: siteSettings.logoUrl,
        sizes: "512x512",
        type: "image/jpeg",
      },
    ],
  };
}
