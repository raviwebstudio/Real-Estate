import { notFound } from "next/navigation";

import { FaqAccordion } from "@/components/site/faq";
import { PageHero } from "@/components/site/page-hero";
import { PropertyCard } from "@/components/site/property-card";
import { buildMetadata } from "@/lib/metadata";
import { getSectorProperties, getSectorSlugs } from "@/lib/queries";

function toSectorName(slug: string) {
  return slug
    .split("-")
    .map((part) => (part === "sector" ? "Sector" : part.charAt(0).toUpperCase() + part.slice(1)))
    .join(" ");
}

export async function generateStaticParams() {
  const sectors = await getSectorSlugs();
  return sectors.map((sector) => ({ sectorSlug: sector.toLowerCase().replace(/\s+/g, "-") }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ sectorSlug: string }>;
}) {
  const { sectorSlug } = await params;
  const sectorName = toSectorName(sectorSlug);

  return buildMetadata({
    title: `${sectorName} Gurgaon`,
    description: `Explore residential and luxury properties in ${sectorName}, Gurgaon.`,
    path: `/gurgaon/${sectorSlug}`,
  });
}

export default async function SectorPage({
  params,
}: {
  params: Promise<{ sectorSlug: string }>;
}) {
  const { sectorSlug } = await params;
  const sectorName = toSectorName(sectorSlug);
  const properties = await getSectorProperties(sectorName);

  if (!properties.length) notFound();

  return (
    <>
      <PageHero
        eyebrow="Sector Page"
        title={`${sectorName}, Gurgaon`}
        description={`Location-first property discovery for ${sectorName}, including premium residential listings, project context, and enquiry flow.`}
        breadcrumbs={[
          { href: "/", label: "Home" },
          { href: "/properties", label: "Properties" },
          { label: sectorName },
        ]}
      />
      <section className="pb-16">
        <div className="shell space-y-8">
          <div className="panel p-8 text-sm leading-8 text-taupe">
            <p>
              {sectorName} is an important Gurgaon micro-market for buyers comparing
              infrastructure, builder quality, and livability at the sector level.
            </p>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
          <FaqAccordion
            items={[
              {
                question: `Why search by ${sectorName}?`,
                answer:
                  "Sector-specific pages help buyers compare micro-market dynamics, access, and inventory quality more efficiently.",
              },
              {
                question: "Can I enquire directly from these listings?",
                answer:
                  "Yes. Every listing keeps pricing, brochure, site visit, call, and WhatsApp actions visible.",
              },
            ]}
          />
        </div>
      </section>
    </>
  );
}
