import Link from "next/link";

import { ContactForm } from "@/components/site/contact-form";
import { MediaFrame, toImageAsset } from "@/components/site/media-frame";
import type { BlogPost, FeaturedMedia, Project, Service, SiteSettings, Testimonial } from "@/lib/types";

type HomePageProps = {
  siteSettings: SiteSettings;
  services: Service[];
  featuredProjects: Project[];
  testimonials: Testimonial[];
  blogPosts: BlogPost[];
  featuredMedia: FeaturedMedia;
};

const aboutValues = [
  {
    title: "Local Timber",
    description: "Ethically sourced Zimbabwean hardwoods sit at the core of our work.",
  },
  {
    title: "Precision Build",
    description: "Every piece is measured, shaped, and finished by skilled artisans.",
  },
  {
    title: "Turnkey Service",
    description: "Design through delivery, with one team carrying the full responsibility.",
  },
  {
    title: "Lasting Quality",
    description: "We build to outlast trends, not just satisfy a brief for the month.",
  },
];

const processSteps = [
  {
    title: "Consult",
    description:
      "We sit down together - in person or remotely - to understand your space, budget, goals, and aesthetic direction.",
  },
  {
    title: "Design",
    description:
      "Our studio shapes the concept through layouts, material direction, and a visual language you can actually respond to.",
  },
  {
    title: "Craft",
    description:
      "Joinery, flooring, cabinetry, and finishing work are executed with detail, timing, and durability in mind.",
  },
  {
    title: "Deliver",
    description:
      "We install, refine, and hand over a finished space that feels composed rather than simply completed.",
  },
];

export function HomePage({
  siteSettings,
  services,
  featuredProjects,
  testimonials,
  blogPosts,
  featuredMedia,
}: HomePageProps) {
  return (
    <>
      <main>
        <section className="hero" id="home">
          <div className="hero__content">
            <div className="hero__eyebrow" aria-hidden="true">
              <span className="hero__eyebrow-line" />
              <span className="hero__eyebrow-text">{siteSettings.heroEyebrow}</span>
            </div>

            <h1 className="hero__title">
              {siteSettings.heroTitlePrefix}
              <br />
              <em>{siteSettings.heroTitleEmphasis}</em>
              <br />
              {siteSettings.heroTitleSuffix}
            </h1>

            <p className="hero__sub">{siteSettings.heroDescription}</p>

            <div className="hero__actions">
              <Link className="button button--primary" href={siteSettings.primaryCtaHref}>
                {siteSettings.primaryCtaLabel}
              </Link>
              <Link className="button button--secondary" href={siteSettings.secondaryCtaHref}>
                {siteSettings.secondaryCtaLabel}
              </Link>
            </div>

            <div className="hero__stats" aria-label="Studio statistics">
              <div>
                <div className="hero__stat-num">{siteSettings.yearsCrafting}</div>
                <div className="hero__stat-label">Years Crafting</div>
              </div>
              <div>
                <div className="hero__stat-num">{siteSettings.projectsCompleted}</div>
                <div className="hero__stat-label">Projects Done</div>
              </div>
              <div>
                <div className="hero__stat-num">{siteSettings.clientRating}</div>
                <div className="hero__stat-label">Client Rating</div>
              </div>
            </div>
          </div>

          <div aria-hidden="true" className="hero__visual">
            <MediaFrame
              asset={featuredMedia.heroVideo}
              autoPlay
              className="hero__media"
              loop
              muted
              preload="auto"
            />
            <div className="hero__visual-inner" />
            <div className="hero__wood-art hero__wood-art--overlay">
              <div className="hero__wood-rings">
                {Array.from({ length: 5 }).map((_, index) => (
                  <div className="ring" key={`ring-${index}`} />
                ))}
              </div>
            </div>

            <div className="hero__wood-text">
              <blockquote className="hero__quote">
                &ldquo;Every grain of wood tells a story - we make yours worth telling.&rdquo;
              </blockquote>
              <p className="hero__location">
                Victoria Falls, Zimbabwe · Est. {siteSettings.foundedYear}
              </p>
            </div>
          </div>
        </section>

        <div aria-hidden="true" className="marquee-strip">
          <div className="marquee-inner">
            {[...siteSettings.marqueeItems, ...siteSettings.marqueeItems].map((item, index) => (
              <span className="marquee-item" key={`${item}-${index}`}>
                {item}
                <span className="marquee-dot" />
              </span>
            ))}
          </div>
        </div>

        <section className="section" id="services">
          <div className="shell">
            <div className="section-intro section-intro--split">
              <div>
                <span className="section-label">What We Do</span>
                <h2 className="section-title">Craft in every corner.</h2>
              </div>

              <div>
                <p className="section-subtitle">
                  From raw timber to refined hospitality spaces, Winmore Creations
                  brings expertise across every layer of interior craft in Victoria
                  Falls and beyond.
                </p>
                <Link className="button button--secondary" href="/contact">
                  Discuss Your Project
                </Link>
              </div>
            </div>

            <div className="services-grid">
              {services.map((service, index) => (
                <article className="service-card" key={service.id}>
                  <div className="service-card__media-wrap">
                    <MediaFrame
                      asset={service.imageUrl ? toImageAsset(service.imageUrl, service.title, service.category.toLowerCase()) : null}
                      className="service-card__media"
                    />
                  </div>
                  <div className="service-card__number">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <div className="service-card__icon">{service.icon}</div>
                  <h3>{service.title}</h3>
                  <p>{service.shortDescription}</p>
                  <ul>
                    {service.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                  <Link className="service-card__link" href={`/services/${service.slug}`}>
                    Explore service →
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section section--alt" id="portfolio">
          <div className="shell">
            <div className="section-intro section-intro--centered">
              <span className="section-label">Selected Work</span>
              <h2 className="section-title">Built with intention.</h2>
              <p className="section-subtitle section-subtitle--centered">
                A selection of projects from Victoria Falls, Hwange, and across
                Zimbabwe - each one a collaboration between craft, atmosphere, and
                client ambition.
              </p>
            </div>

            <div className="portfolio-grid">
              {featuredProjects.map((project, index) => (
                <Link
                  className={`portfolio-card portfolio-card--${index === 0 ? "wide" : index === 1 ? "tall" : "square"}`}
                  href={`/portfolio/${project.slug}`}
                  key={project.id}
                >
                  <MediaFrame
                    asset={project.imageUrl ? toImageAsset(project.imageUrl, project.title, project.category.toLowerCase()) : null}
                    className="portfolio-card__media"
                  />
                  <div className="portfolio-card__overlay">
                    <div>
                      <p className="portfolio-card__tag">
                        {project.category} · {project.location}
                      </p>
                      <h3>{project.title}</h3>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="section-action">
              <Link className="button button--secondary" href="/portfolio">
                View Full Portfolio
              </Link>
            </div>
          </div>
        </section>

        <section className="section about-section" id="about">
          <div className="shell about-grid">
            <div className="about-visual">
              <div className="about-visual__panel">
                <MediaFrame asset={featuredMedia.aboutImage} className="about-visual__image" />
                <div className="about-visual__grain" />
                <div className="about-visual__word">CRAFT</div>
              </div>
              <div className="about-visual__badge">
                <span>{siteSettings.yearsCrafting}</span>
                <small>Years of Craft</small>
              </div>
            </div>

            <div className="about-copy">
              <span className="section-label">Our Story</span>
              <div className="section-divider" />
              <h2 className="section-title">
                Rooted in <em>Victoria Falls.</em>
              </h2>
              <p>{siteSettings.aboutStory}</p>
              <p>{siteSettings.aboutStorySecondary}</p>
              <p>{siteSettings.aboutStoryTertiary}</p>

              <div className="about-values">
                {aboutValues.map((value) => (
                  <article className="about-value" key={value.title}>
                    <h3>{value.title}</h3>
                    <p>{value.description}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        {featuredMedia.storyVideo ? (
          <section className="section section--alt studio-film">
            <div className="shell studio-film__layout">
              <div>
                <span className="section-label">Studio In Motion</span>
                <h2 className="section-title">
                  A closer look at the making behind the <em>finish.</em>
                </h2>
                <p className="section-subtitle">
                  We have now woven your live public-folder media into the experience,
                  giving the site real atmosphere instead of placeholder abstraction.
                </p>
              </div>
              <MediaFrame
                asset={featuredMedia.storyVideo}
                autoPlay
                className="studio-film__media"
                loop
                muted
                preload="auto"
              />
            </div>
          </section>
        ) : null}

        <section className="section section--alt">
          <div className="shell">
            <div className="section-intro section-intro--centered">
              <span className="section-label">How It Works</span>
              <h2 className="section-title">
                Simple process. <em>Extraordinary results.</em>
              </h2>
            </div>

            <div className="process-grid">
              {processSteps.map((step, index) => (
                <article className="process-card" key={step.title}>
                  <div className="process-card__index">{index + 1}</div>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section testimonials-section" id="testimonials">
          <div className="shell testimonials-layout">
            <div className="testimonials-aside">
              <span className="section-label">Client Reviews</span>
              <h2 className="section-title">What clients say.</h2>
              <div className="testimonials-rating">
                <div className="testimonials-stars">★★★★★</div>
                <div className="testimonials-rating__value">4.9</div>
                <div className="testimonials-rating__meta">from 47 verified reviews</div>
              </div>
              <Link className="button button--primary" href="/contact">
                Start Your Project
              </Link>
            </div>

            <div className="testimonials-grid">
              {testimonials.map((testimonial) => (
                <article className="testimonial-card" key={testimonial.id}>
                  <p className="testimonial-card__quote">“{testimonial.quote}”</p>
                  <div className="testimonial-card__author">
                    <div className="testimonial-card__avatar">
                      {testimonial.name
                        .split(" ")
                        .map((part) => part[0])
                        .join("")
                        .slice(0, 2)}
                    </div>
                    <div>
                      <strong>{testimonial.name}</strong>
                      <span>
                        {testimonial.company} · {testimonial.location}
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section section--alt" id="blog">
          <div className="shell">
            <div className="section-intro section-intro--split">
              <div>
                <span className="section-label">Insights & Craft</span>
                <h2 className="section-title">From the workshop.</h2>
              </div>
              <Link className="button button--secondary" href="/blog">
                All Articles
              </Link>
            </div>

            <div className="blog-grid">
              {blogPosts.map((post) => (
                <article className="blog-card" key={post.id}>
                  <MediaFrame
                    asset={post.coverImageUrl ? toImageAsset(post.coverImageUrl, post.title, post.category.toLowerCase()) : null}
                    className="blog-card__art"
                  />
                  <div className="blog-card__body">
                    <span className="blog-card__category">{post.category}</span>
                    <h3>{post.title}</h3>
                    <p>{post.excerpt}</p>
                    <div className="blog-card__meta">
                      <time dateTime={post.publishedAt}>{post.publishedAt}</time>
                      <Link href={`/blog/${post.slug}`}>Read More →</Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="contact">
          <div className="shell contact-layout">
            <div className="contact-copy">
              <span className="section-label">Get In Touch</span>
              <h2 className="section-title">
                Let&apos;s build <em>something great.</em>
              </h2>
              <p>{siteSettings.contactIntro}</p>

              <div className="contact-details">
                <div>
                  <h3>Location</h3>
                  <p>
                    {siteSettings.addressLocality}, {siteSettings.addressRegion},
                    Zimbabwe
                  </p>
                </div>
                <div>
                  <h3>Phone / WhatsApp</h3>
                  <p>
                    <a href={`tel:${siteSettings.phone.replace(/\s+/g, "")}`}>
                      {siteSettings.phone}
                    </a>
                  </p>
                </div>
                <div>
                  <h3>Email</h3>
                  <p>
                    <a href={`mailto:${siteSettings.email}`}>{siteSettings.email}</a>
                  </p>
                </div>
                <div>
                  <h3>Studio Hours</h3>
                  <p>Mon-Fri 08:00-17:00 · Sat 09:00-14:00</p>
                </div>
              </div>
            </div>

            <div className="contact-panel">
              <ContactForm />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
