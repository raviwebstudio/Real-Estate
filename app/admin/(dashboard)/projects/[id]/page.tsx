import { notFound } from "next/navigation";

import { ProjectForm } from "@/components/admin/project-form";
import { AdminShell } from "@/components/admin/shell";
import { getBuilders, getProjectById } from "@/lib/queries";

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [project, builders] = await Promise.all([getProjectById(id), getBuilders()]);

  if (!project) notFound();

  return (
    <AdminShell
      title={`Edit ${project.name}`}
      description="Update project details, pricing range, and linked SEO content."
    >
      <ProjectForm project={project} builders={builders} />
    </AdminShell>
  );
}
