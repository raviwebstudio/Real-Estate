import { PageHero } from "@/components/site/page-hero";
import { SectionHeading } from "@/components/site/section-heading";
import { serviceHighlights } from "@/lib/site";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Services",
  description:
    "Luxury property advisory, buyer support, investor guidance, and curated site visit planning for Gurgaon residential real estate.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Advisory services designed for high-intent residential buyers and investors."
        description="From shortlist strategy to site visits and investment evaluation, the platform is built for action."
        breadcrumbs={[
          { href: "/", label: "Home" },
          { label: "Services" },
        ]}
      />

      <section className="section-space">
        <div className="shell space-y-8">
          <SectionHeading
            eyebrow="Offerings"
            title="What the platform supports"
            description="Services are structured to work for end users, investors, and referral-driven enquiries."
          />
          <div className="grid gap-6 lg:grid-cols-2">
            {serviceHighlights.map((service) => (
              <article key={service.title} className="panel p-8">
                <h2 className="font-serif text-3xl text-ink">{service.title}</h2>
                <p className="mt-4 text-sm leading-8 text-taupe">{service.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
