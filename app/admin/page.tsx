import { redirect } from "next/navigation";

import { AdminDashboard } from "@/components/admin/dashboard";
import { getStudioArchiveAssets } from "@/lib/media-library";
import { buildMetadata } from "@/lib/seo";
import {
  getAdminContext,
  getBlogPosts,
  getProjects,
  getServices,
  getSiteSettings,
  getTestimonials,
} from "@/lib/site-data";

type AdminPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export async function generateMetadata() {
  const siteSettings = await getSiteSettings();

  return buildMetadata({
    title: `CMS Dashboard | ${siteSettings.businessName}`,
    description: "Protected content editing dashboard for the Winmore Creations website.",
    path: "/admin",
  });
}

export default async function AdminPage({ searchParams }: AdminPageProps) {
  const adminContext = await getAdminContext();

  if (!adminContext.configured) {
    return (
      <main className="auth-shell shell">
        <section className="auth-card auth-card--wide">
          <span className="section-label">Setup Required</span>
          <h1 className="section-title">Connect Supabase to unlock the CMS.</h1>
          <p className="auth-card__copy">
            The admin dashboard is scaffolded and ready. Add your Supabase project URL,
            anon key, run the SQL schema, then create an admin user in the
            `admin_users` table.
          </p>
        </section>
      </main>
    );
  }

  if (!adminContext.isAuthenticated) {
    redirect("/login");
  }

  if (!adminContext.isAdmin) {
    return (
      <main className="auth-shell shell">
        <section className="auth-card auth-card--wide">
          <span className="section-label">Access Restricted</span>
          <h1 className="section-title">This account is not marked as an admin.</h1>
          <p className="auth-card__copy">
            Add the signed-in user ID below to the `admin_users` table in Supabase to
            grant editing access.
          </p>
          <code className="auth-card__code">{adminContext.userId}</code>
        </section>
      </main>
    );
  }

  const params = await searchParams;
  const status = Array.isArray(params.status) ? params.status[0] : params.status;

  const [siteSettings, services, projects, blogPosts, testimonials, archiveAssets] = await Promise.all([
    getSiteSettings(),
    getServices(),
    getProjects(),
    getBlogPosts(),
    getTestimonials(),
    getStudioArchiveAssets(),
  ]);

  return (
    <AdminDashboard
      archiveAssets={archiveAssets}
      blogPosts={blogPosts}
      email={adminContext.email}
      projects={projects}
      services={services}
      siteSettings={siteSettings}
      status={status}
      testimonials={testimonials}
    />
  );
}
