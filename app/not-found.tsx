import Link from "next/link";

export default function NotFound() {
  return (
    <main className="auth-shell shell">
      <section className="auth-card auth-card--wide">
        <span className="section-label">404</span>
        <h1 className="section-title">That page is not part of the studio archive.</h1>
        <p className="auth-card__copy">
          The link may have moved, or the content may not be published yet.
        </p>
        <Link className="button button--primary" href="/">
          Back to Home
        </Link>
      </section>
    </main>
  );
}
