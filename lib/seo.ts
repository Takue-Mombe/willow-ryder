import type { Metadata } from "next";

import { getSiteUrl } from "@/lib/env";

type MetadataInput = {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
  image?: string;
};

export function buildMetadata({
  title,
  description,
  path = "/",
  keywords = [],
  image = "/opengraph-image",
}: MetadataInput): Metadata {
  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title,
      description,
      url: path,
      siteName: "Winmore Creations",
      images: [image],
      locale: "en_ZW",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export function buildLocalBusinessSchema(input: {
  name: string;
  description: string;
  email: string;
  phone: string;
  streetAddress: string;
  addressLocality: string;
  addressRegion: string;
  addressCountry: string;
  websiteUrl: string;
  image: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "HomeAndConstructionBusiness"],
    name: input.name,
    description: input.description,
    url: input.websiteUrl,
    logo: `${getSiteUrl()}${input.image}`,
    image: `${getSiteUrl()}${input.image}`,
    telephone: input.phone,
    email: input.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: input.streetAddress,
      addressLocality: input.addressLocality,
      addressRegion: input.addressRegion,
      addressCountry: input.addressCountry,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -17.9243,
      longitude: 25.8572,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "17:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "09:00",
        closes: "14:00",
      },
    ],
    priceRange: "$$",
    currenciesAccepted: "USD, ZWL",
    areaServed: ["Victoria Falls", "Hwange", "Bulawayo", "Harare", "Zimbabwe"],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Winmore Creations Services",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Bespoke Carpentry" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Interior Design" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Epoxy Flooring" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Wooden Flooring" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Custom Furniture" } },
      ],
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "47",
    },
  };
}

export function buildServiceSchema(input: {
  name: string;
  description: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: input.name,
    description: input.description,
    areaServed: ["Victoria Falls", "Zimbabwe"],
    url: `${getSiteUrl()}${input.url}`,
    provider: {
      "@type": "Organization",
      name: "Winmore Creations",
      url: getSiteUrl(),
    },
  };
}

export function buildArticleSchema(input: {
  title: string;
  description: string;
  path: string;
  publishedAt: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: input.title,
    description: input.description,
    datePublished: input.publishedAt,
    dateModified: input.publishedAt,
    mainEntityOfPage: `${getSiteUrl()}${input.path}`,
    publisher: {
      "@type": "Organization",
      name: "Winmore Creations",
      url: getSiteUrl(),
    },
  };
}
