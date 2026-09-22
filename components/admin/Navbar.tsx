import Link from "next/link";
import { ExternalLink, LogOut } from "lucide-react";

export function AdminNavbar() {
  return (
    <header className="admin-topbar">
      <div className="admin-topbar-content">
        <div className="admin-breadcrumb">
          <span className="admin-breadcrumb-kicker">Admin Panel</span>
          <span className="admin-breadcrumb-badge">WakeUp CMS v2.0</span>
        </div>

        <div className="admin-topbar-actions">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-view-site"
          >
            <span>View Website</span>
            <ExternalLink size={14} />
          </a>

          <a
            href="/api/admin/logout"
            className="btn-admin-logout"
            title="Sign Out of Admin Panel"
          >
            <LogOut size={14} />
            <span>Logout</span>
          </a>
        </div>
      </div>
    </header>
  );
}
