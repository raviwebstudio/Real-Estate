import Link from "next/link";

import { formatCompactINR } from "@/lib/utils";

export function ProjectCard({
  project,
}: {
  project: Awaited<ReturnType<typeof import("@/lib/queries").getProjects>>[number];
}) {
  return (
    <article className="panel p-6">
      <p className="eyebrow">{project.sector}</p>
      <h3 className="mt-4 font-serif text-2xl text-ink">
        <Link href={`/projects/${project.slug}`}>{project.name}</Link>
      </h3>
      <p className="mt-3 text-sm leading-7 text-taupe">{project.description}</p>
      <div className="mt-5 flex flex-wrap gap-3 text-sm text-taupe">
        <span>{project.builder.name}</span>
        <span>•</span>
        <span>{project.configurations.join(", ")}</span>
        <span>•</span>
        <span>
          {formatCompactINR(project.priceRangeMin)} - {formatCompactINR(project.priceRangeMax)}
        </span>
      </div>
    </article>
  );
}
