import Link from "next/link";

import { MediaFrame, toImageAsset } from "@/components/site/media-frame";
import { buildMetadata } from "@/lib/seo";
import { getBlogPosts, getSiteSettings } from "@/lib/site-data";

export async function generateMetadata() {
  const siteSettings = await getSiteSettings();

  return buildMetadata({
    title: `Insights | ${siteSettings.businessName}`,
    description:
      "Read design insights, local material stories, and SEO-focused articles on carpentry, interior design, epoxy floors, and wooden floors in Victoria Falls and Zimbabwe.",
    path: "/blog",
    keywords: ["carpentry blog Zimbabwe", "interior design articles Victoria Falls"],
  });
}

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <main className="content-page shell">
      <section className="detail-hero">
        <span className="section-label">Insights</span>
        <h1 className="detail-hero__title">
          Search-led writing with a <em>studio voice.</em>
        </h1>
        <p className="detail-hero__copy">
          Articles that help potential clients discover the studio, understand the work,
          and trust the process before they ever send the first enquiry.
        </p>
      </section>

      <section className="cards-grid cards-grid--two">
        {posts.map((post) => (
          <article className="blog-listing-card" key={post.id}>
            <MediaFrame
              asset={post.coverImageUrl ? toImageAsset(post.coverImageUrl, post.title, post.category.toLowerCase()) : null}
              className="blog-listing-card__art"
            />
            <div className="blog-listing-card__body">
              <span className="info-card__eyebrow">
                {post.category} · {post.readTime}
              </span>
              <h2>{post.title}</h2>
              <p>{post.excerpt}</p>
              <Link className="button button--secondary" href={`/blog/${post.slug}`}>
                Read article
              </Link>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
