import { FaqAccordion } from "@/components/site/faq";
import { PageHero } from "@/components/site/page-hero";
import { PropertyCard } from "@/components/site/property-card";
import { buildMetadata } from "@/lib/metadata";
import { getProperties } from "@/lib/queries";
import { seoLandingPages } from "@/lib/seo-pages";

const config = seoLandingPages["luxury-apartments-in-gurgaon"];

export const metadata = buildMetadata({
  title: config.metaTitle,
  description: config.metaDescription,
  path: `/${config.slug}`,
});

export default async function LuxuryApartmentsPage() {
  const properties = await getProperties(config.filters);

  return (
    <>
      <PageHero eyebrow="SEO Landing" title={config.title} description={config.intro} breadcrumbs={[{ href: "/", label: "Home" }, { label: config.title }]} />
      <section className="pb-16">
        <div className="shell space-y-8">
          <div className="panel p-8 text-sm leading-8 text-taupe">
            {config.body.map((paragraph) => (
              <p key={paragraph} className="mt-4 first:mt-0">
                {paragraph}
              </p>
            ))}
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
          <FaqAccordion items={config.faq} />
        </div>
      </section>
    </>
  );
}
