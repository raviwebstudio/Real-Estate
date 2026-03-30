import Link from "next/link";

import { AdminShell } from "@/components/admin/shell";
import { deletePropertyAction } from "@/lib/actions/admin";
import { getProperties } from "@/lib/queries";

export default async function AdminPropertiesPage() {
  const properties = await getProperties();

  return (
    <AdminShell
      title="Properties"
      description="Manage live listing pages, image galleries, pricing cues, and investor content."
      actions={
        <Link href="/admin/properties/new" className="rounded-2xl bg-ink px-5 py-3 text-sm text-white">
          Add Property
        </Link>
      }
    >
      <div className="grid gap-4">
        {properties.map((property) => (
          <article key={property.id} className="panel flex flex-col gap-4 p-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="font-serif text-2xl text-ink">{property.title}</h2>
              <p className="mt-2 text-sm text-taupe">
                {property.sector} • {property.propertyType} • {property.possessionTimeline}
              </p>
            </div>
            <div className="flex gap-3">
              <Link href={`/admin/properties/${property.id}`} className="rounded-2xl border border-black/10 px-4 py-3 text-sm text-ink">
                Edit
              </Link>
              <form action={deletePropertyAction}>
                <input type="hidden" name="id" value={property.id} />
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
