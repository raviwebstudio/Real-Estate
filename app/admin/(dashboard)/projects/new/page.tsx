import { ProjectForm } from "@/components/admin/project-form";
import { AdminShell } from "@/components/admin/shell";
import { getBuilders } from "@/lib/queries";

export default async function NewProjectPage() {
  const builders = await getBuilders();

  return (
    <AdminShell
      title="Add Project"
      description="Create a project page and attach it to an existing builder."
    >
      <ProjectForm builders={builders} />
    </AdminShell>
  );
}
