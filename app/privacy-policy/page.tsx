import { PageHero } from "@/components/site/page-hero";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Privacy Policy",
  description: "Privacy policy for Gurgaon Residences and its lead generation platform.",
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        description="How we collect, use, and store data submitted through the website."
        breadcrumbs={[{ href: "/", label: "Home" }, { label: "Privacy Policy" }]}
      />
      <section className="pb-16">
        <div className="shell">
          <div className="panel p-8 text-sm leading-8 text-taupe">
            We collect information submitted through enquiry forms for the purpose of
            responding to property, project, and consultation requests. We do not sell
            your personal information. Data may be used for follow-up communication,
            site visit coordination, and relevant property recommendations.
          </div>
        </div>
      </section>
    </>
  );
}
