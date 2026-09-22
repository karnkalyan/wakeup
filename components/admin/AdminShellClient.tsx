"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  LayoutDashboard,
  Hammer,
  Package,
  Building2,
  Users,
  Inbox,
  Settings,
  UserCheck,
  LogOut,
  Menu,
  X,
  ExternalLink
} from "lucide-react";

const items = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Services", href: "/admin/services", icon: Hammer },
  { label: "Materials", href: "/admin/materials", icon: Package },
  { label: "Projects", href: "/admin/projects", icon: Building2 },
  { label: "Team Members", href: "/admin/team", icon: Users },
  { label: "Inquiries", href: "/admin/inquiries", icon: Inbox },
  { label: "Settings", href: "/admin/settings", icon: Settings },
  { label: "Users", href: "/admin/users", icon: UserCheck },
];

export function AdminShellClient({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  // Close mobile sidebar on route transition
  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  return (
    <div className="admin-shell">
      {/* Mobile Backdrop Overlay */}
      <div
        className={`admin-sidebar-overlay ${sidebarOpen ? "open" : ""}`}
        onClick={() => setSidebarOpen(false)}
        aria-hidden="true"
      />

      {/* Admin Sidebar */}
      <aside className={`admin-sidebar ${sidebarOpen ? "open" : ""}`}>
        {/* Top Logo Container */}
        <div className="admin-logo-box" style={{ justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Image
              src="/logo/logo.png"
              alt="WakeUp Nepal Builders"
              width={38}
              height={38}
              style={{ width: "36px", height: "36px", objectFit: "contain" }}
            />
            <div style={{ lineHeight: 1.2 }}>
              <div style={{ fontFamily: "var(--font-poppins)", fontWeight: 800, fontSize: "13px", color: "var(--navy-dark)" }}>
                WAKE UP NEPAL
              </div>
              <div style={{ fontSize: "10px", fontWeight: 700, color: "var(--crimson)", letterSpacing: "0.03em" }}>
                BUILDERS PVT. LTD.
              </div>
            </div>
          </div>

          <button
            type="button"
            className="admin-mobile-toggle"
            style={{ width: "30px", height: "30px", padding: 0 }}
            onClick={() => setSidebarOpen(false)}
            aria-label="Close admin menu"
          >
            <X size={16} />
          </button>
        </div>

        {/* Nav items */}
        <nav className="admin-nav">
          {items.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`admin-nav-item ${isActive ? "active" : ""}`}
                onClick={() => setSidebarOpen(false)}
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Sign out at bottom */}
        <div className="admin-sidebar-footer">
          <form action="/api/admin/logout" method="post">
            <button type="submit" className="admin-signout-btn">
              <LogOut size={16} />
              <span>Sign Out</span>
            </button>
          </form>
        </div>
      </aside>

      {/* Main Wrap */}
      <div className="admin-main-wrap">
        <header className="admin-topbar">
          <div className="admin-topbar-content">
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <button
                type="button"
                className="admin-mobile-toggle"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                aria-label="Toggle navigation menu"
              >
                <Menu size={20} />
              </button>

              <div className="admin-breadcrumb">
                <span className="admin-breadcrumb-kicker">Admin Panel</span>
                <span className="admin-breadcrumb-badge">WakeUp CMS v2.0</span>
              </div>
            </div>

            <div className="admin-topbar-actions">
              <a
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-view-site"
                title="View Website"
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

        <main className="admin-main">
          {children}
        </main>
      </div>
    </div>
  );
}
