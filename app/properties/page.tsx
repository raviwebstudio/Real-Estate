import type { PropertyStatus } from "@prisma/client";

import { PageHero } from "@/components/site/page-hero";
import { PropertyFilterBar } from "@/components/site/filter-bar";
import { PropertyCard } from "@/components/site/property-card";
import { buildMetadata } from "@/lib/metadata";
import { getFilterFacets, getProperties } from "@/lib/queries";

export const metadata = buildMetadata({
  title: "Properties",
  description:
    "Browse residential and luxury properties in Gurgaon with filters for location, budget, BHK, status, and property type.",
  path: "/properties",
});

export default async function PropertiesPage({
  searchParams,
}: {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = (await searchParams) ?? {};
  const filters = {
    location: typeof params.location === "string" ? params.location : undefined,
    bhk: typeof params.bhk === "string" ? params.bhk : undefined,
    propertyType: typeof params.propertyType === "string" ? params.propertyType : undefined,
    status:
      typeof params.status === "string" ? (params.status as PropertyStatus) : undefined,
  };

  const [properties, facets] = await Promise.all([
    getProperties(filters),
    getFilterFacets(),
  ]);

  return (
    <>
      <PageHero
        eyebrow="Properties"
        title="Search Gurgaon’s premium residential inventory with clarity."
        description="Use sector, BHK, type, and status filters to shortlist homes that align with your buyer or investor brief."
        breadcrumbs={[{ href: "/", label: "Home" }, { label: "Properties" }]}
      />

      <section className="pb-16">
        <div className="shell space-y-8">
          <PropertyFilterBar
            sectors={facets.sectors}
            propertyTypes={facets.propertyTypes}
            current={{
              location: filters.location,
              bhk: filters.bhk,
              propertyType: filters.propertyType,
              status: filters.status,
            }}
          />

          <div className="grid gap-6 lg:grid-cols-3">
            {properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
