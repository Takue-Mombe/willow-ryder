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
                &ldquo;{siteSettings.heroQuote}&rdquo;
              </blockquote>
              <p className="hero__location">{siteSettings.heroLocationText}</p>
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
                <h2 className="section-title">{siteSettings.servicesSectionTitle}</h2>
              </div>

              <div>
                <p className="section-subtitle">{siteSettings.servicesSectionSubtitle}</p>
                <Link className="button button--secondary" href={siteSettings.servicesSectionCtaHref}>
                  {siteSettings.servicesSectionCtaLabel}
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
              <h2 className="section-title">{siteSettings.portfolioSectionTitle}</h2>
              <p className="section-subtitle section-subtitle--centered">{siteSettings.portfolioSectionSubtitle}</p>
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
              <Link className="button button--secondary" href={siteSettings.portfolioSectionCtaHref}>
                {siteSettings.portfolioSectionCtaLabel}
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
              <h2 className="section-title">{siteSettings.aboutSectionTitle}</h2>
              <p>{siteSettings.aboutStory}</p>
              <p>{siteSettings.aboutStorySecondary}</p>
              <p>{siteSettings.aboutStoryTertiary}</p>

              <div className="about-values">
                {siteSettings.aboutValues.map((value) => (
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
                <h2 className="section-title">{siteSettings.studioFilmTitle}</h2>
                <p className="section-subtitle">{siteSettings.studioFilmDescription}</p>
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
              <h2 className="section-title">{siteSettings.processSectionTitle}</h2>
              <p className="section-subtitle section-subtitle--centered">{siteSettings.processSectionSubtitle}</p>
            </div>

            <div className="process-grid">
              {siteSettings.processSteps.map((step, index) => (
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
              <span className="section-label">{siteSettings.testimonialsSectionSubtitle}</span>
              <h2 className="section-title">{siteSettings.testimonialsSectionTitle}</h2>
              <div className="testimonials-rating">
                <div className="testimonials-stars">★★★★★</div>
                <div className="testimonials-rating__value">4.9</div>
                <div className="testimonials-rating__meta">{siteSettings.testimonialsRatingLabel}</div>
              </div>
              <Link className="button button--primary" href={siteSettings.testimonialsPrimaryCtaHref}>
                {siteSettings.testimonialsPrimaryCtaLabel}
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
                <h2 className="section-title">{siteSettings.blogSectionTitle}</h2>
                <p className="section-subtitle">{siteSettings.blogSectionSubtitle}</p>
              </div>
              <Link className="button button--secondary" href={siteSettings.blogSectionCtaHref}>
                {siteSettings.blogSectionCtaLabel}
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
              <h2 className="section-title">{siteSettings.contactSectionTitle}</h2>
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
