import { AdminShell } from "@/components/admin/shell";
import { getLeads } from "@/lib/queries";
import { startCase } from "@/lib/utils";

export default async function AdminLeadsPage() {
  const leads = await getLeads();

  return (
    <AdminShell
      title="Leads"
      description="Review buyer and investor enquiries captured through property and contact forms."
    >
      <div className="panel overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#efe6d8] text-taupe">
              <tr>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Phone</th>
                <th className="px-6 py-4">Property</th>
                <th className="px-6 py-4">Source</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead.id} className="border-t border-black/5">
                  <td className="px-6 py-4 text-ink">{lead.name}</td>
                  <td className="px-6 py-4 text-taupe">{startCase(lead.leadType)}</td>
                  <td className="px-6 py-4 text-taupe">{lead.phone}</td>
                  <td className="px-6 py-4 text-taupe">{lead.property?.title ?? "General enquiry"}</td>
                  <td className="px-6 py-4 text-taupe">{lead.sourcePage ?? "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminShell>
  );
}
