import Link from "next/link";

import { AdminShell } from "@/components/admin/shell";
import { deleteBuilderAction } from "@/lib/actions/admin";
import { getBuilders } from "@/lib/queries";

export default async function AdminBuildersPage() {
  const builders = await getBuilders();

  return (
    <AdminShell
      title="Builders"
      description="Manage builder profiles, linked projects, and SEO metadata."
      actions={
        <Link href="/admin/builders/new" className="rounded-2xl bg-ink px-5 py-3 text-sm text-white">
          Add Builder
        </Link>
      }
    >
      <div className="grid gap-4">
        {builders.map((builder) => (
          <article key={builder.id} className="panel flex flex-col gap-4 p-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="font-serif text-2xl text-ink">{builder.name}</h2>
              <p className="mt-2 text-sm text-taupe">{builder.description}</p>
            </div>
            <div className="flex gap-3">
              <Link href={`/admin/builders/${builder.id}`} className="rounded-2xl border border-black/10 px-4 py-3 text-sm text-ink">
                Edit
              </Link>
              <form action={deleteBuilderAction}>
                <input type="hidden" name="id" value={builder.id} />
                <button className="rounded-2xl border border-red-200 px-4 py-3 text-sm text-red-700">
                  Delete
                </button>
              </form>
            </div>
          </article>
        ))}
      </div>
    </AdminShell>
  );
}
