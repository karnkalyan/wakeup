import Link from "next/link";
import { prisma } from "@/lib/prisma";
import {
  Hammer,
  Package,
  Building2,
  Inbox,
  Users,
  Settings as SettingsIcon,
  ChevronRight,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function Dashboard() {
  const [services, materials, projects, inquiriesCount, recentInquiries] =
    await Promise.all([
      prisma.service.count(),
      prisma.material.count(),
      prisma.project.count(),
      prisma.inquiry.count({ where: { status: "NEW" } }),
      prisma.inquiry.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
      }),
    ]);

  const cards = [
    { label: "Services", count: services },
    { label: "Materials", count: materials },
    { label: "Projects", count: projects },
    { label: "New Inquiries", count: inquiriesCount },
  ];

  return (
    <>
      <div className="admin-head">
        <div>
          <p className="admin-kicker">Admin Panel</p>
          <h1 className="admin-title">Dashboard</h1>
        </div>
        <a className="btn-view-site" href="/" target="_blank" rel="noopener noreferrer">
          <span>View Website</span>
          <ExternalLink size={14} />
        </a>
      </div>

      {/* 4 STAT CARDS */}
      <div className="admin-stats">
        {cards.map((c) => (
          <div className="admin-stat-card" key={c.label}>
            <span>{c.label}</span>
            <strong>{c.count}</strong>
          </div>
        ))}
      </div>

      {/* TWO COLUMNS: RECENT INQUIRIES & QUICK ACTIONS */}
      <div className="admin-dashboard-grid">
        {/* LEFT: RECENT INQUIRIES */}
        <div className="admin-panel">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
            <h2 style={{ fontSize: "20px", fontWeight: 800, color: "#0c233c", margin: 0 }}>
              Recent Inquiries
            </h2>
            <Link href="/admin/inquiries" style={{ fontSize: "13px", fontWeight: 700, color: "var(--crimson)" }}>
              View All ({recentInquiries.length}) →
            </Link>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {recentInquiries.length === 0 ? (
              <p style={{ color: "var(--text-muted)", fontSize: "14px" }}>No inquiries submitted yet.</p>
            ) : (
              recentInquiries.map((inq) => {
                const isNew = inq.status === "NEW";
                const isContacted = inq.status === "CONTACTED";
                return (
                  <div
                    key={inq.id}
                    style={{
                      background: "#ffffff",
                      border: "1px solid #e8eef3",
                      borderRadius: "14px",
                      padding: "18px 20px",
                      boxShadow: "0 2px 4px rgba(12, 35, 60, 0.02)",
                    }}
                  >
                    <div style={{ marginBottom: "8px" }}>
                      <span
                        className={
                          isNew
                            ? "badge-new"
                            : isContacted
                            ? "badge-contacted"
                            : "badge-closed"
                        }
                      >
                        {inq.status}
                      </span>
                    </div>

                    <div style={{ fontSize: "16px", fontWeight: 800, color: "#0c233c", marginBottom: "4px" }}>
                      {inq.name} &nbsp;•&nbsp; {inq.phone}
                    </div>

                    <div style={{ fontSize: "13px", fontWeight: 700, color: "#1e6091", marginBottom: "8px" }}>
                      {inq.projectType || "General Construction"} {inq.location ? `• ${inq.location}` : ""}
                    </div>

                    <p style={{ margin: 0, fontSize: "13.5px", color: "#50667a", lineHeight: 1.5 }}>
                      {inq.message}
                    </p>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* RIGHT: QUICK ACTIONS & WEBSITE STATUS */}
        <div>
          {/* QUICK ACTIONS */}
          <div className="admin-panel" style={{ marginBottom: "24px" }}>
            <h2 style={{ fontSize: "20px", fontWeight: 800, color: "#0c233c", margin: "0 0 16px" }}>
              Quick Actions
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <Link href="/admin/services" className="quick-action-btn">
                <span className="qa-icon"><Hammer size={16} /></span>
                <span>Add Service</span>
                <ChevronRight size={14} style={{ marginLeft: "auto", color: "#a0aec0" }} />
              </Link>
              <Link href="/admin/materials" className="quick-action-btn">
                <span className="qa-icon"><Package size={16} /></span>
                <span>Add Material</span>
                <ChevronRight size={14} style={{ marginLeft: "auto", color: "#a0aec0" }} />
              </Link>
              <Link href="/admin/projects" className="quick-action-btn">
                <span className="qa-icon"><Building2 size={16} /></span>
                <span>Add Project</span>
                <ChevronRight size={14} style={{ marginLeft: "auto", color: "#a0aec0" }} />
              </Link>
              <Link href="/admin/team" className="quick-action-btn">
                <span className="qa-icon"><Users size={16} /></span>
                <span>Add Team Member</span>
                <ChevronRight size={14} style={{ marginLeft: "auto", color: "#a0aec0" }} />
              </Link>
              <Link href="/admin/settings" className="quick-action-btn">
                <span className="qa-icon"><SettingsIcon size={16} /></span>
                <span>Company Settings</span>
                <ChevronRight size={14} style={{ marginLeft: "auto", color: "#a0aec0" }} />
              </Link>
            </div>
          </div>

          {/* WEBSITE STATUS */}
          <div className="admin-panel">
            <h2 style={{ fontSize: "20px", fontWeight: 800, color: "#0c233c", margin: "0 0 16px" }}>
              Website Status
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <div className="status-row">
                <span style={{ fontSize: "14px", color: "#50667a", fontWeight: 600 }}>Database</span>
                <span className="status-pill-green">Connected</span>
              </div>
              <div className="status-row">
                <span style={{ fontSize: "14px", color: "#50667a", fontWeight: 600 }}>Public Website</span>
                <span className="status-pill-green">Online</span>
              </div>
              <div className="status-row">
                <span style={{ fontSize: "14px", color: "#50667a", fontWeight: 600 }}>CMS Content</span>
                <span className="status-pill-green">Seeded</span>
              </div>
              <div className="status-row" style={{ borderBottom: "none" }}>
                <span style={{ fontSize: "14px", color: "#50667a", fontWeight: 600 }}>Contact Form</span>
                <span className="status-pill-green">Ready</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
