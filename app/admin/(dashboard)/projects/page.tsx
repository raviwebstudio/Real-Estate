import Link from "next/link";

import { AdminShell } from "@/components/admin/shell";
import { deleteProjectAction } from "@/lib/actions/admin";
import { getProjects } from "@/lib/queries";

export default async function AdminProjectsPage() {
  const projects = await getProjects();

  return (
    <AdminShell
      title="Projects"
      description="Manage project detail pages, configuration mix, amenities, and SEO copy."
      actions={
        <Link href="/admin/projects/new" className="rounded-2xl bg-ink px-5 py-3 text-sm text-white">
          Add Project
        </Link>
      }
    >
      <div className="grid gap-4">
        {projects.map((project) => (
          <article key={project.id} className="panel flex flex-col gap-4 p-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="font-serif text-2xl text-ink">{project.name}</h2>
              <p className="mt-2 text-sm text-taupe">
                {project.builder.name} • {project.sector} • {project.possessionTimeline}
              </p>
            </div>
            <div className="flex gap-3">
              <Link href={`/admin/projects/${project.id}`} className="rounded-2xl border border-black/10 px-4 py-3 text-sm text-ink">
                Edit
              </Link>
              <form action={deleteProjectAction}>
                <input type="hidden" name="id" value={project.id} />
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
