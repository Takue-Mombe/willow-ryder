import { AdminShell, TestimonialsSection } from "@/components/admin/sections";
import { getAdminContext, getTestimonials } from "@/lib/site-data";

type TestimonialsAdminPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function TestimonialsAdminPage({ searchParams }: TestimonialsAdminPageProps) {
  const adminContext = await getAdminContext();
  const params = await searchParams;
  const status = Array.isArray(params.status) ? params.status[0] : params.status;
  const testimonials = await getTestimonials();

  return (
    <AdminShell
      description="Update trust signals and client reviews without the rest of the CMS getting in the way."
      email={adminContext.email}
      status={status}
      title="Testimonials."
    >
      <TestimonialsSection testimonials={testimonials} />
    </AdminShell>
  );
}
