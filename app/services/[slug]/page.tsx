import Link from "next/link";
import { notFound } from "next/navigation";

import { MediaFrame, toImageAsset } from "@/components/site/media-frame";
import { getServiceMediaAsset } from "@/lib/media-library";
import { buildMetadata, buildServiceSchema } from "@/lib/seo";
import { getProjects, getServiceBySlug, getServices, getSiteSettings } from "@/lib/site-data";

type ServiceDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const services = await getServices();
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: ServiceDetailPageProps) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  const siteSettings = await getSiteSettings();

  if (!service) {
    return buildMetadata({
      title: `Service Not Found | ${siteSettings.businessName}`,
      description: siteSettings.seoDefaultDescription,
      path: "/services",
    });
  }

  return buildMetadata({
    title: service.seoTitle,
    description: service.seoDescription,
    path: `/services/${service.slug}`,
    keywords: [service.title, service.category, ...siteSettings.seoKeywords.slice(0, 4)],
  });
}

export default async function ServiceDetailPage({ params }: ServiceDetailPageProps) {
  const { slug } = await params;
  const [service, projects, serviceMedia] = await Promise.all([
    getServiceBySlug(slug),
    getProjects(),
    getServiceMediaAsset(slug),
  ]);

  if (!service) {
    notFound();
  }

  const relatedProjects = projects
    .filter((project) => project.category.toLowerCase().includes(service.category.toLowerCase().slice(0, 5)))
    .slice(0, 3);

  const schema = buildServiceSchema({
    name: service.title,
    description: service.fullDescription,
    url: `/services/${service.slug}`,
  });

  return (
    <main className="content-page shell">
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        type="application/ld+json"
      />

      <section className="detail-hero">
        <span className="section-label">{service.category}</span>
        <h1 className="detail-hero__title">
          {service.title} with a <em>studio standard.</em>
        </h1>
        <p className="detail-hero__copy">{service.fullDescription}</p>
      </section>

      <section className="detail-layout">
        <article className="detail-panel">
          <MediaFrame asset={serviceMedia} className="detail-panel__media" />
          <h2>What this service includes</h2>
          <ul className="detail-list">
            {service.bullets.map((bullet) => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>
        </article>

        <aside className="detail-sidebar">
          <div className="info-card">
            <span className="info-card__eyebrow">Why clients book this</span>
            <p>{service.shortDescription}</p>
          </div>
          <div className="info-card">
            <span className="info-card__eyebrow">Need a quote?</span>
            <p>
              Tell us about your space, your timeline, and your design direction.
            </p>
            <Link className="button button--primary" href="/contact">
              Start Your Project
            </Link>
          </div>
        </aside>
      </section>

      {relatedProjects.length ? (
        <section className="content-slab">
          <div className="section-intro section-intro--split">
            <div>
              <span className="section-label">Related Work</span>
              <h2 className="section-title">Projects linked to this discipline.</h2>
            </div>
            <Link className="button button--secondary" href="/portfolio">
              View Portfolio
            </Link>
          </div>

          <div className="cards-grid cards-grid--three">
            {relatedProjects.map((project) => (
              <article className="info-card" key={project.id}>
                <MediaFrame
                  asset={project.imageUrl ? toImageAsset(project.imageUrl, project.title, project.category.toLowerCase()) : null}
                  className="info-card__media"
                />
                <span className="info-card__eyebrow">{project.location}</span>
                <h3>{project.title}</h3>
                <p>{project.summary}</p>
                <Link href={`/portfolio/${project.slug}`}>Read project →</Link>
              </article>
            ))}
          </div>
        </section>
      ) : null}
    </main>
  );
}
