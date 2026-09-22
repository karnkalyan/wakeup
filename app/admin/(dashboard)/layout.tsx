import { requireAdmin } from "@/lib/auth";
import { AdminShellClient } from "@/components/admin/AdminShellClient";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAdmin();
  return <AdminShellClient>{children}</AdminShellClient>;
}
