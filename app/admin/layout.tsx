import { redirect } from "next/navigation";

import { getAdminContext } from "@/lib/site-data";

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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

  return children;
}
