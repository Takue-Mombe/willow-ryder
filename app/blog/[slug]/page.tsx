import Link from "next/link";
import { notFound } from "next/navigation";

import { MediaFrame, toImageAsset } from "@/components/site/media-frame";
import { RichText } from "@/components/site/rich-text";
import { buildArticleSchema, buildMetadata } from "@/lib/seo";
import { getBlogPostBySlug, getBlogPosts, getSiteSettings } from "@/lib/site-data";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  const siteSettings = await getSiteSettings();

  if (!post) {
    return buildMetadata({
      title: `Article Not Found | ${siteSettings.businessName}`,
      description: siteSettings.seoDefaultDescription,
      path: "/blog",
    });
  }

  return buildMetadata({
    title: post.seoTitle,
    description: post.seoDescription,
    path: `/blog/${post.slug}`,
    keywords: [post.title, post.category, "Victoria Falls carpentry insights"],
  });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const [post, posts] = await Promise.all([getBlogPostBySlug(slug), getBlogPosts()]);

  if (!post) {
    notFound();
  }

  const schema = buildArticleSchema({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    publishedAt: post.publishedAt,
  });

  const relatedPosts = posts.filter((item) => item.slug !== post.slug).slice(0, 3);

  return (
    <main className="content-page shell">
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        type="application/ld+json"
      />

      <article className="article-layout">
        <header className="detail-hero detail-hero--article">
          <span className="section-label">
            {post.category} · {post.readTime}
          </span>
          <h1 className="detail-hero__title">{post.title}</h1>
          <p className="detail-hero__copy">{post.excerpt}</p>
        </header>

        <MediaFrame
          asset={post.coverImageUrl ? toImageAsset(post.coverImageUrl, post.title, post.category.toLowerCase()) : null}
          className="article-hero-media"
        />

        <div className="article-body">
          <RichText className="article-body__paragraph" content={post.content} />
        </div>
      </article>

      {relatedPosts.length ? (
        <section className="content-slab">
          <div className="section-intro section-intro--split">
            <div>
              <span className="section-label">Continue Reading</span>
              <h2 className="section-title">More articles from the studio.</h2>
            </div>
            <Link className="button button--secondary" href="/blog">
              View All Insights
            </Link>
          </div>

          <div className="cards-grid cards-grid--three">
            {relatedPosts.map((item) => (
              <article className="info-card" key={item.id}>
                <span className="info-card__eyebrow">{item.category}</span>
                <h3>{item.title}</h3>
                <p>{item.excerpt}</p>
                <Link href={`/blog/${item.slug}`}>Read article →</Link>
              </article>
            ))}
          </div>
        </section>
      ) : null}
    </main>
  );
}
