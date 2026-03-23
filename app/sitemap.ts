import type { MetadataRoute } from "next";

import { getSiteUrl } from "@/lib/env";
import { getAllPublicSlugs } from "@/lib/site-data";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = getSiteUrl();
  const { blogPosts, projects, services } = await getAllPublicSlugs();

  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/about",
    "/blog",
    "/contact",
    "/gallery",
    "/portfolio",
    "/services",
  ].map((path, index) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: index === 0 ? "weekly" : "monthly",
    priority: index === 0 ? 1 : 0.8,
  }));

  const dynamicRoutes: MetadataRoute.Sitemap = [
    ...services.map((slug) => ({
      url: `${siteUrl}/services/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.75,
    })),
    ...projects.map((slug) => ({
      url: `${siteUrl}/portfolio/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.72,
    })),
    ...blogPosts.map((slug) => ({
      url: `${siteUrl}/blog/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];

  return [...staticRoutes, ...dynamicRoutes];
}
