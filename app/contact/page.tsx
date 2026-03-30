import { LeadForm } from "@/components/site/lead-form";
import { PageHero } from "@/components/site/page-hero";
import { buildMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site";
import { telLink } from "@/lib/utils";

export const metadata = buildMetadata({
  title: "Contact Us",
  description:
    "Contact Gurgaon Residences for luxury residential property enquiries, pricing, brochures, and site visits in Gurgaon.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Speak with a Gurgaon residential property specialist."
        description="Use the enquiry form or connect directly for pricing, brochures, builder comparisons, and site visit planning."
        breadcrumbs={[
          { href: "/", label: "Home" },
          { label: "Contact Us" },
        ]}
      />

      <section className="section-space">
        <div className="shell grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="panel p-8 text-sm leading-8 text-taupe">
            <p className="eyebrow">Direct Contact</p>
            <div className="mt-5 space-y-4">
              <p>{siteConfig.phone}</p>
              <p>{siteConfig.email}</p>
              <a href={telLink()} className="inline-flex rounded-full bg-ink px-5 py-3 text-sm text-white">
                Call Now
              </a>
            </div>
          </div>
          <LeadForm
            leadType="GENERAL"
            sourcePage="/contact"
            title="Send an enquiry"
            description="Tell us what you are evaluating and we will respond with curated options."
          />
        </div>
      </section>
    </>
  );
}
