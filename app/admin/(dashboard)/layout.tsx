import { requireAdmin } from "@/lib/auth";
import { Sidebar } from "@/components/admin/Sidebar";
import { AdminNavbar } from "@/components/admin/Navbar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAdmin();
  return (
    <div className="admin-shell">
      <Sidebar />
      <div className="admin-main-wrap">
        <AdminNavbar />
        <main className="admin-main">
          {children}
        </main>
      </div>
    </div>
  );
}
