import Image from "next/image";
import Link from "next/link";

import { formatCompactINR } from "@/lib/utils";

export function ProjectCard({
  project,
}: {
  project: Awaited<
    ReturnType<typeof import("@/lib/queries").getProjects>
  >[number];
}) {
  return (
    <article className="group panel overflow-hidden transition-transform duration-500 ease-out hover:-translate-y-1 hover:shadow-xl">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src="/images/placeholders/dlf-arbour-landscape.svg"
          alt={`Project ${project.name}`}
          fill
          className="object-cover transition duration-700 group-hover:scale-105"
        />
      </div>

      <div className="space-y-5 p-6">
        <p className="eyebrow">{project.sector}</p>
        <h3 className="font-serif text-2xl text-ink">
          <Link href={`/projects/${project.slug}`}>{project.name}</Link>
        </h3>
        <p className="text-sm leading-7 text-taupe">{project.description}</p>
        <div className="flex flex-wrap gap-3 text-sm text-taupe">
          <span>{project.builder.name}</span>
          <span>•</span>
          <span>{project.configurations.join(", ")}</span>
          <span>•</span>
          <span>
            {formatCompactINR(project.priceRangeMin)} -{" "}
            {formatCompactINR(project.priceRangeMax)}
          </span>
        </div>
      </div>
    </article>
  );
}
