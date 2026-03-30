import { PageHero } from "@/components/site/page-hero";
import { ProjectCard } from "@/components/site/project-card";
import { buildMetadata } from "@/lib/metadata";
import { getProjects } from "@/lib/queries";

export const metadata = buildMetadata({
  title: "Projects",
  description: "Explore premium residential projects in Gurgaon by builder, sector, configuration, and pricing band.",
  path: "/projects",
});

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <>
      <PageHero
        eyebrow="Projects"
        title="Project pages built for long-form discovery and comparison."
        description="Review builder context, amenities, configuration mix, location story, and linked inventory in one place."
        breadcrumbs={[{ href: "/", label: "Home" }, { label: "Projects" }]}
      />
      <section className="pb-16">
        <div className="shell grid gap-6 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>
    </>
  );
}
