import { notFound } from "next/navigation";

import { BuilderForm } from "@/components/admin/builder-form";
import { AdminShell } from "@/components/admin/shell";
import { getBuilderById } from "@/lib/queries";

export default async function EditBuilderPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const builder = await getBuilderById(id);

  if (!builder) notFound();

  return (
    <AdminShell
      title={`Edit ${builder.name}`}
      description="Update builder copy, SEO fields, and supporting details."
    >
      <BuilderForm builder={builder} />
    </AdminShell>
  );
}
