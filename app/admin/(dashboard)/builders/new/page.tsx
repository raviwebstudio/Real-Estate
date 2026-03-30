import { BuilderForm } from "@/components/admin/builder-form";
import { AdminShell } from "@/components/admin/shell";

export default function NewBuilderPage() {
  return (
    <AdminShell
      title="Add Builder"
      description="Create a new builder profile with SEO metadata and positioning notes."
    >
      <BuilderForm />
    </AdminShell>
  );
}
