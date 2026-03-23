import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Winmore Creations",
    short_name: "Winmore",
    description:
      "Bespoke carpentry, interior design, and premium flooring in Victoria Falls, Zimbabwe.",
    start_url: "/",
    display: "standalone",
    background_color: "#faf7f2",
    theme_color: "#2c1a0e",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
