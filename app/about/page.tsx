import { PageHero } from "@/components/site/page-hero";
import { SectionHeading } from "@/components/site/section-heading";
import { Testimonials } from "@/components/site/testimonials";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "About Us",
  description:
    "Learn about Gurgaon Residences, a premium real estate platform for residential and luxury property discovery in Gurgaon.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="Luxury real estate guidance with a Gurgaon-first point of view."
        description="We built the platform to connect premium design with practical property intelligence for buyers, investors, and families."
        breadcrumbs={[
          { href: "/", label: "Home" },
          { label: "About Us" },
        ]}
      />

      <section className="section-space">
        <div className="shell grid gap-8 lg:grid-cols-2">
          <div className="panel p-8">
            <SectionHeading
              eyebrow="Our Approach"
              title="Designed to make premium inventory easier to understand"
              description="Every builder, project, and listing page is structured around clarity, not clutter."
            />
          </div>
          <div className="panel p-8 text-sm leading-8 text-taupe">
            <p>
              Gurgaon Residences focuses on residential and luxury property in Gurgaon.
              We combine premium visual presentation with a practical information model:
              project hierarchy, builder context, investor cues, nearby infrastructure, and
              lead pathways that actually help users take the next step.
            </p>
            <p className="mt-4">
              The platform is built to scale across sectors, inventory types, and future
              cities while keeping the experience fast, mobile-first, and search-ready.
            </p>
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="shell space-y-8">
          <SectionHeading
            eyebrow="Trust"
            title="Premium design backed by transparent information"
            description="The goal is to reduce friction between discovery, comparison, and enquiry."
          />
          <Testimonials />
        </div>
      </section>
    </>
  );
}
