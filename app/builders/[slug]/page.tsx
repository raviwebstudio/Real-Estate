import { notFound } from "next/navigation";

import { BuilderCard } from "@/components/site/builder-card";
import { PageHero } from "@/components/site/page-hero";
import { ProjectCard } from "@/components/site/project-card";
import { buildMetadata } from "@/lib/metadata";
import { getBuilderBySlug, getBuilders, getProjects } from "@/lib/queries";

export async function generateStaticParams() {
  const builders = await getBuilders();
  return builders.map((builder) => ({ slug: builder.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const builder = await getBuilderBySlug(slug);

  if (!builder) {
    return buildMetadata({
      title: "Builder",
      description: "Builder detail page",
      path: `/builders/${slug}`,
    });
  }

  return buildMetadata({
    title: builder.seoTitle || builder.name,
    description: builder.seoDescription || builder.description,
    path: `/builders/${builder.slug}`,
  });
}

export default async function BuilderDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const builder = await getBuilderBySlug(slug);

  if (!builder) notFound();

  const allProjects = await getProjects();
  const projects = allProjects.filter((project) => project.builderId === builder.id);

  return (
    <>
      <PageHero
        eyebrow="Builder"
        title={builder.name}
        description={builder.description}
        breadcrumbs={[
          { href: "/", label: "Home" },
          { href: "/builders", label: "Builders" },
          { label: builder.name },
        ]}
      />
      <section className="pb-16">
        <div className="shell space-y-8">
          <div className="panel p-8 text-sm leading-8 text-taupe">{builder.overview}</div>
          <div className="grid gap-6 lg:grid-cols-3">
            <BuilderCard builder={builder} />
            <div className="panel p-6">
              <p className="eyebrow">Projects</p>
              <p className="mt-3 text-3xl font-serif text-ink">{builder.projects.length}</p>
            </div>
            <div className="panel p-6">
              <p className="eyebrow">Listings</p>
              <p className="mt-3 text-3xl font-serif text-ink">{builder.properties.length}</p>
            </div>
          </div>
          <div className="space-y-6">
            <h2 className="font-serif text-3xl text-ink">Projects by {builder.name}</h2>
            <div className="grid gap-6 lg:grid-cols-3">
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
