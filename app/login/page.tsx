import { redirect } from "next/navigation";

import { LoginForm } from "@/components/auth/login-form";
import { buildMetadata } from "@/lib/seo";
import { getAdminContext, getSiteSettings } from "@/lib/site-data";

export async function generateMetadata() {
  const siteSettings = await getSiteSettings();

  return buildMetadata({
    title: `Admin Login | ${siteSettings.businessName}`,
    description: "Secure login for the Winmore Creations content dashboard.",
    path: "/login",
  });
}

export default async function LoginPage() {
  const adminContext = await getAdminContext();

  if (adminContext.configured && adminContext.isAuthenticated && adminContext.isAdmin) {
    redirect("/admin");
  }

  return (
    <main className="auth-shell shell">
      <section className="auth-card">
        <span className="section-label">Protected Login</span>
        <h1 className="section-title">Studio CMS access.</h1>
        <p className="auth-card__copy">
          Sign in with the Supabase account you marked as an admin user.
        </p>
        {!adminContext.configured ? (
          <div className="auth-card__notice">
            <strong>Supabase is not connected yet.</strong>
            <p>
              Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` to
              enable login and live editing.
            </p>
          </div>
        ) : null}
        <LoginForm />
      </section>
    </main>
  );
}
