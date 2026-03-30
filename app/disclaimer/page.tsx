import { PageHero } from "@/components/site/page-hero";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Disclaimer",
  description: "Disclaimer for Gurgaon Residences property information and projections.",
  path: "/disclaimer",
});

export default function DisclaimerPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Disclaimer"
        description="Important notes regarding indicative pricing, ROI estimates, and project information."
        breadcrumbs={[{ href: "/", label: "Home" }, { label: "Disclaimer" }]}
      />
      <section className="pb-16">
        <div className="shell">
          <div className="panel p-8 text-sm leading-8 text-taupe">
            ROI, rental yield, possession timelines, and pricing shown on the platform are
            indicative and intended for informational use only. Buyers and investors should
            verify all details with the relevant builder, channel partner, and legal advisors.
          </div>
        </div>
      </section>
    </>
  );
}
