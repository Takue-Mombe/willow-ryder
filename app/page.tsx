import { HomePage } from "@/components/site/home-page";
import { buildLocalBusinessSchema, buildMetadata } from "@/lib/seo";
import { getHomePageBundle } from "@/lib/site-data";

export async function generateMetadata() {
  const { siteSettings } = await getHomePageBundle();

  return buildMetadata({
    title: siteSettings.seoDefaultTitle,
    description: siteSettings.seoDefaultDescription,
    path: "/",
    keywords: siteSettings.seoKeywords,
    image: siteSettings.ogImageUrl,
  });
}

export default async function Home() {
  const {
    siteSettings,
    services,
    featuredProjects,
    testimonials,
    blogPosts,
    featuredMedia,
  } = await getHomePageBundle();

  const schema = buildLocalBusinessSchema({
    name: siteSettings.businessName,
    description: siteSettings.businessDescription,
    email: siteSettings.email,
    phone: siteSettings.phone,
    streetAddress: siteSettings.streetAddress,
    addressLocality: siteSettings.addressLocality,
    addressRegion: siteSettings.addressRegion,
    addressCountry: siteSettings.addressCountry,
    websiteUrl: siteSettings.websiteUrl,
    image: siteSettings.logoUrl,
  });

  return (
    <>
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        type="application/ld+json"
      />
      <HomePage
        blogPosts={blogPosts}
        featuredProjects={featuredProjects}
        services={services}
        siteSettings={siteSettings}
        testimonials={testimonials}
        featuredMedia={featuredMedia}
      />
    </>
  );
}
