import { ContactForm } from "@/components/site/contact-form";
import { buildMetadata } from "@/lib/seo";
import { getServices, getSiteSettings, getTeamMembers } from "@/lib/site-data";

export async function generateMetadata() {
  const siteSettings = await getSiteSettings();

  return buildMetadata({
    title: `Contact ${siteSettings.businessName}`,
    description:
      "Contact Winmore Creations for bespoke carpentry, interior design, epoxy flooring, wooden flooring, cabinetry, and commercial fit-outs in Victoria Falls and across Zimbabwe.",
    path: "/contact",
    keywords: ["contact carpentry Victoria Falls", "quote interior design Zimbabwe"],
  });
}

export default async function ContactPage() {
  const [siteSettings, services, teamMembers] = await Promise.all([
    getSiteSettings(),
    getServices(),
    getTeamMembers(),
  ]);

  return (
    <main className="content-page shell">
      <section className="detail-hero">
        <span className="section-label">Get In Touch</span>
        <h1 className="detail-hero__title">
          Let&apos;s shape something that <em>lasts.</em>
        </h1>
        <p className="detail-hero__copy">{siteSettings.contactIntro}</p>
      </section>

      <section className="contact-layout contact-layout--page">
        <div className="contact-copy contact-copy--page">
          <div className="contact-details">
            <div>
              <h3>Location</h3>
              <p>
                {siteSettings.addressLocality}, {siteSettings.addressRegion}, Zimbabwe
              </p>
            </div>
            <div>
              <h3>Phone / WhatsApp</h3>
              <p>
                <a href={`tel:${siteSettings.phone.replace(/\s+/g, "")}`}>{siteSettings.phone}</a>
              </p>
            </div>
            <div>
              <h3>Email</h3>
              <p>
                <a href={`mailto:${siteSettings.email}`}>{siteSettings.email}</a>
              </p>
            </div>
            <div>
              <h3>Hours</h3>
              <p>Mon-Fri 08:00-17:00 · Sat 09:00-14:00</p>
            </div>
          </div>

          <div className="cards-grid cards-grid--two">
            {services.slice(0, 4).map((service) => (
              <article className="info-card" key={service.id}>
                <h3>{service.title}</h3>
                <p>{service.shortDescription}</p>
              </article>
            ))}
          </div>

          <div className="team-contacts">
            {teamMembers.map((member) => (
              <article className="team-contact-card" key={member.id}>
                <strong>{member.name}</strong>
                <span>{member.role}</span>
                <a href={`tel:${member.phone.replace(/\s+/g, "")}`}>{member.phone}</a>
                <a href={`mailto:${member.email}`}>{member.email}</a>
              </article>
            ))}
          </div>
        </div>

        <div className="contact-panel contact-panel--page">
          <ContactForm />
        </div>
      </section>
    </main>
  );
}
