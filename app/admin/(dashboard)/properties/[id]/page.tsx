import { notFound } from "next/navigation";

import { PropertyForm } from "@/components/admin/property-form";
import { AdminShell } from "@/components/admin/shell";
import { getBuilders, getProjects, getPropertyById } from "@/lib/queries";

export default async function EditPropertyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [property, builders, projects] = await Promise.all([
    getPropertyById(id),
    getBuilders(),
    getProjects(),
  ]);

  if (!property) notFound();

  return (
    <AdminShell
      title={`Edit ${property.title}`}
      description="Update the full property detail experience, including media and lead-ready content."
    >
      <PropertyForm property={property} builders={builders} projects={projects} />
    </AdminShell>
  );
}
