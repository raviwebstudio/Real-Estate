import { notFound } from "next/navigation";

import { FaqAccordion } from "@/components/site/faq";
import { PageHero } from "@/components/site/page-hero";
import { PropertyCard } from "@/components/site/property-card";
import { buildMetadata } from "@/lib/metadata";
import { getProjectBySlug, getProjects } from "@/lib/queries";
import { formatCompactINR } from "@/lib/utils";

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return buildMetadata({
      title: "Project",
      description: "Project detail page",
      path: `/projects/${slug}`,
    });
  }

  return buildMetadata({
    title: project.seoTitle || project.name,
    description: project.seoDescription || project.description,
    path: `/projects/${project.slug}`,
  });
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) notFound();

  return (
    <>
      <PageHero
        eyebrow="Project"
        title={project.name}
        description={project.description}
        breadcrumbs={[
          { href: "/", label: "Home" },
          { href: "/projects", label: "Projects" },
          { label: project.name },
        ]}
      />
      <section className="pb-16">
        <div className="shell space-y-8">
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="panel p-6">
              <p className="eyebrow">Builder</p>
              <p className="mt-3 text-xl font-medium text-ink">{project.builder.name}</p>
            </div>
            <div className="panel p-6">
              <p className="eyebrow">Price range</p>
              <p className="mt-3 text-xl font-medium text-ink">
                {formatCompactINR(project.priceRangeMin)} - {formatCompactINR(project.priceRangeMax)}
              </p>
            </div>
            <div className="panel p-6">
              <p className="eyebrow">Possession</p>
              <p className="mt-3 text-xl font-medium text-ink">{project.possessionTimeline}</p>
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            <div className="panel p-8">
              <h2 className="font-serif text-3xl text-ink">Amenities</h2>
              <ul className="mt-5 grid gap-3 text-sm text-taupe">
                {project.amenities.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>
            <div className="panel p-8">
              <h2 className="font-serif text-3xl text-ink">Investment highlights</h2>
              <ul className="mt-5 grid gap-3 text-sm text-taupe">
                {project.investmentHighlights.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>
          </div>

          {project.faq.length ? <FaqAccordion items={project.faq} /> : null}

          <div className="space-y-6">
            <h2 className="font-serif text-3xl text-ink">Linked listings</h2>
            <div className="grid gap-6 lg:grid-cols-3">
              {project.properties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
