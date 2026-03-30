import { Breadcrumbs } from "@/components/site/breadcrumbs";

export function PageHero({
  eyebrow,
  title,
  description,
  breadcrumbs,
}: {
  eyebrow: string;
  title: string;
  description: string;
  breadcrumbs: { href?: string; label: string }[];
}) {
  return (
    <section className="section-space">
      <div className="shell">
        <div className="panel bg-hero-blur px-6 py-12 sm:px-10">
          <Breadcrumbs items={breadcrumbs} />
          <p className="eyebrow mt-6">{eyebrow}</p>
          <h1 className="mt-4 max-w-4xl font-serif text-4xl leading-tight text-ink sm:text-5xl">
            {title}
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-8 text-taupe">{description}</p>
        </div>
      </div>
    </section>
  );
}
