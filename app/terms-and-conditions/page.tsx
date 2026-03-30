import { PageHero } from "@/components/site/page-hero";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Terms & Conditions",
  description: "Terms and conditions for Gurgaon Residences.",
  path: "/terms-and-conditions",
});

export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Terms & Conditions"
        description="Website use, informational intent, and enquiry guidelines."
        breadcrumbs={[{ href: "/", label: "Home" }, { label: "Terms & Conditions" }]}
      />
      <section className="pb-16">
        <div className="shell">
          <div className="panel p-8 text-sm leading-8 text-taupe">
            Property information, pricing cues, and availability are subject to change
            without prior notice. Users should independently verify all details before
            making any purchase or investment decision. Submission of a lead form does
            not constitute a booking or offer acceptance.
          </div>
        </div>
      </section>
    </>
  );
}
