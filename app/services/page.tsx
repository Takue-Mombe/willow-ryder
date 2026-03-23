import Link from "next/link";

import { MediaFrame, toImageAsset } from "@/components/site/media-frame";
import { buildMetadata } from "@/lib/seo";
import { getServices, getSiteSettings } from "@/lib/site-data";

export async function generateMetadata() {
  const siteSettings = await getSiteSettings();

  return buildMetadata({
    title: `Services | ${siteSettings.businessName}`,
    description:
      "Explore interior design, bespoke carpentry, custom furniture, epoxy flooring, wooden flooring, cabinetry, and commercial fit-out services from Winmore Creations in Victoria Falls.",
    path: "/services",
    keywords: [
      "bespoke carpentry Victoria Falls",
      "interior design Victoria Falls",
      "epoxy flooring Zimbabwe",
    ],
  });
}

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <main className="content-page shell">
      <section className="detail-hero">
        <span className="section-label">Services</span>
        <h1 className="detail-hero__title">
          Strategy, craftsmanship, and finish across <em>every layer.</em>
        </h1>
        <p className="detail-hero__copy">
          We work across custom furniture, interior design, epoxy flooring, hardwood
          installations, cabinetry, restoration, and commercial fit-outs for clients
          who want more than standard contractor output.
        </p>
      </section>

      <section className="cards-grid cards-grid--two">
        {services.map((service) => (
          <article className="service-feature-card" key={service.id}>
            <MediaFrame
              asset={service.imageUrl ? toImageAsset(service.imageUrl, service.title, service.category.toLowerCase()) : null}
              className="service-feature-card__media"
            />
            <div className="service-feature-card__icon">{service.icon}</div>
            <span className="info-card__eyebrow">{service.category}</span>
            <h2>{service.title}</h2>
            <p>{service.fullDescription}</p>
            <ul>
              {service.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
            <Link className="button button--secondary" href={`/services/${service.slug}`}>
              Open service page
            </Link>
          </article>
        ))}
      </section>
    </main>
  );
}
