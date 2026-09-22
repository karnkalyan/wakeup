"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
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

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="admin-sidebar">
      {/* Top Logo Container matching admin-dashboard.png */}
      <div className="admin-logo-box">
        <Image
          src="/logo/logo.png"
          alt="WakeUp Nepal Builders"
          width={40}
          height={40}
          style={{ width: "38px", height: "38px", objectFit: "contain" }}
        />
        <div style={{ lineHeight: 1.2 }}>
          <div style={{ fontFamily: "var(--font-poppins)", fontWeight: 800, fontSize: "14px", color: "var(--navy-dark)" }}>
            WAKE UP NEPAL
          </div>
          <div style={{ fontSize: "10.5px", fontWeight: 700, color: "var(--crimson)", letterSpacing: "0.03em" }}>
            BUILDERS PVT. LTD.
          </div>
        </div>
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
  );
}
