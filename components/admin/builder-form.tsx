import { saveBuilderAction } from "@/lib/actions/admin";
import { AdminField, AdminTextarea } from "@/components/admin/fields";

export function BuilderForm({
  builder,
}: {
  builder?: Awaited<ReturnType<typeof import("@/lib/queries").getBuilderById>>;
}) {
  return (
    <form action={saveBuilderAction} className="panel grid gap-5 p-8">
      <input type="hidden" name="id" value={builder?.id ?? ""} />
      <div className="grid gap-5 lg:grid-cols-2">
        <AdminField label="Builder Name" name="name" defaultValue={builder?.name} required />
        <AdminField label="Slug" name="slug" defaultValue={builder?.slug} placeholder="auto-generated if blank" />
      </div>
      <AdminTextarea label="Short Description" name="description" defaultValue={builder?.description} rows={4} />
      <AdminTextarea label="Overview" name="overview" defaultValue={builder?.overview} rows={6} />
      <div className="grid gap-5 lg:grid-cols-2">
        <AdminField label="SEO Title" name="seoTitle" defaultValue={builder?.seoTitle} />
        <AdminField label="SEO Description" name="seoDescription" defaultValue={builder?.seoDescription} />
      </div>
      <button className="w-fit rounded-2xl bg-ink px-5 py-3 text-sm text-white">
        Save Builder
      </button>
    </form>
  );
}
