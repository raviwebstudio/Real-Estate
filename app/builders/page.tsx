import { BuilderCard } from "@/components/site/builder-card";
import { PageHero } from "@/components/site/page-hero";
import { buildMetadata } from "@/lib/metadata";
import { getBuilders } from "@/lib/queries";

export const metadata = buildMetadata({
  title: "Builders",
  description: "Browse Gurgaon builders with linked projects, property listings, and brand context.",
  path: "/builders",
});

export default async function BuildersPage() {
  const builders = await getBuilders();

  return (
    <>
      <PageHero
        eyebrow="Builders"
        title="Builder pages create trust before enquiry."
        description="Profiles connect brand perception, project stack, and active residential listings in one discoverable structure."
        breadcrumbs={[{ href: "/", label: "Home" }, { label: "Builders" }]}
      />
      <section className="pb-16">
        <div className="shell grid gap-6 lg:grid-cols-3">
          {builders.map((builder) => (
            <BuilderCard key={builder.id} builder={builder} />
          ))}
        </div>
      </section>
    </>
  );
}
