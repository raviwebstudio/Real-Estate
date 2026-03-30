import { AdminShell } from "@/components/admin/shell";
import { siteConfig } from "@/lib/site";

export default function AdminSettingsPage() {
  return (
    <AdminShell
      title="Settings"
      description="Reference the active environment variables and default business contact details."
    >
      <div className="panel grid gap-4 p-8 text-sm text-taupe">
        <p>Site URL: {siteConfig.baseUrl}</p>
        <p>Phone: {siteConfig.phone}</p>
        <p>Email: {siteConfig.email}</p>
        <p>WhatsApp: {siteConfig.whatsappNumber}</p>
        <p>
          Update these values via `.env` or production environment variables before deploying.
        </p>
      </div>
    </AdminShell>
  );
}
