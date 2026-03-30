import { AdminShell } from "@/components/admin/shell";
import { getDashboardMetrics } from "@/lib/queries";
import { logoutAction } from "@/lib/actions/admin";

export default async function AdminDashboardPage() {
  const metrics = await getDashboardMetrics();

  return (
    <AdminShell
      title="Dashboard"
      description="Track core content collections and lead activity across the Gurgaon residential platform."
      actions={
        <form action={logoutAction}>
          <button className="rounded-2xl border border-black/10 px-5 py-3 text-sm text-ink">
            Log out
          </button>
        </form>
      }
    >
      <div className="grid gap-6 xl:grid-cols-5">
        {metrics.map((metric) => (
          <article key={metric.label} className="panel p-6">
            <p className="eyebrow">{metric.label}</p>
            <p className="mt-4 font-serif text-4xl text-ink">{metric.value}</p>
            <p className="mt-3 text-sm leading-7 text-taupe">{metric.detail}</p>
          </article>
        ))}
      </div>
    </AdminShell>
  );
}
