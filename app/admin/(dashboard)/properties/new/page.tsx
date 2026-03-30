import { PropertyForm } from "@/components/admin/property-form";
import { AdminShell } from "@/components/admin/shell";
import { getBuilders, getProjects } from "@/lib/queries";

export default async function NewPropertyPage() {
  const [builders, projects] = await Promise.all([getBuilders(), getProjects()]);

  return (
    <AdminShell
      title="Add Property"
      description="Create a new listing with gallery uploads, investor notes, and SEO metadata."
    >
      <PropertyForm builders={builders} projects={projects} />
    </AdminShell>
  );
}
