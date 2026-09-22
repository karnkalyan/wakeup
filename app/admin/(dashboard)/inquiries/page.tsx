import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { Phone, Mail, MapPin, Calendar, Trash2, MessageCircle, Layers } from "lucide-react";
import { Pagination } from "@/components/admin/Pagination";

export const dynamic = "force-dynamic";

const PAGE_SIZE = 5;

async function updateStatus(formData: FormData) {
  "use server";
  const id = Number(formData.get("id"));
  const status = String(formData.get("status")) as any;
  if (!id) return;
  await (prisma as any).inquiry.update({
    where: { id },
    data: { status },
  });
  revalidatePath("/admin/inquiries");
  revalidatePath("/admin");
}

async function removeInquiry(formData: FormData) {
  "use server";
  const id = Number(formData.get("id"));
  if (!id) return;
  await (prisma as any).inquiry.delete({ where: { id } });
  revalidatePath("/admin/inquiries");
  revalidatePath("/admin");
}

export default async function InquiriesAdminPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page } = await searchParams;
  const currentPage = Math.max(1, Number(page) || 1);

  const [totalCount, newCount, contactedCount, rows] = await Promise.all([
    (prisma as any).inquiry.count(),
    (prisma as any).inquiry.count({ where: { status: "NEW" } }),
    (prisma as any).inquiry.count({ where: { status: "CONTACTED" } }),
    (prisma as any).inquiry.findMany({
      orderBy: { createdAt: "desc" },
      skip: (currentPage - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
    }),
  ]);

  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  return (
    <>
      <div className="admin-head">
        <div>
          <p className="admin-kicker">Client Leads &amp; Consultations</p>
          <h1 className="admin-title">Customer Inquiries ({totalCount})</h1>
        </div>
      </div>

      <div style={{ display: "flex", gap: "14px", marginBottom: "24px" }}>
        <div className="admin-stat-card" style={{ flex: 1, padding: "16px 20px" }}>
          <span>New Leads</span>
          <strong style={{ fontSize: "28px", color: "var(--orange)" }}>{newCount}</strong>
        </div>
        <div className="admin-stat-card" style={{ flex: 1, padding: "16px 20px" }}>
          <span>Contacted</span>
          <strong style={{ fontSize: "28px", color: "#059669" }}>{contactedCount}</strong>
        </div>
        <div className="admin-stat-card" style={{ flex: 1, padding: "16px 20px" }}>
          <span>Total Received</span>
          <strong style={{ fontSize: "28px", color: "#0c233c" }}>{totalCount}</strong>
        </div>
      </div>

      <div className="admin-panel">
        <h2 style={{ fontSize: "20px", fontWeight: 800, color: "#0c233c", margin: "0 0 20px" }}>
          All Submitted Inquiries
        </h2>

        {rows.length === 0 ? (
          <p style={{ color: "var(--text-muted)", fontSize: "14px" }}>No inquiries found on this page.</p>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {rows.map((r: any) => {
              const isNew = r.status === "NEW";
              const isContacted = r.status === "CONTACTED";
              const cleanPhone = r.phone ? r.phone.replace(/[^0-9]/g, "") : "";

              return (
                <article
                  key={r.id}
                  style={{
                    background: "#ffffff",
                    border: isNew ? "1.5px solid #fed7aa" : "1px solid #e2eaf0",
                    borderRadius: "14px",
                    padding: "24px",
                    boxShadow: "0 2px 6px rgba(12, 35, 60, 0.03)",
                    display: "flex",
                    flexDirection: "column",
                    gap: "14px",
                  }}
                >
                  {/* Top Bar with Badges and Actions */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "12px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <span className={isNew ? "badge-new" : isContacted ? "badge-contacted" : "badge-closed"}>
                        {r.status}
                      </span>
                      <h3 style={{ margin: 0, fontSize: "18px", color: "#0c233c", fontWeight: 800 }}>
                        {r.name}
                      </h3>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <form action={updateStatus} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                        <input type="hidden" name="id" value={r.id} />
                        <select
                          name="status"
                          defaultValue={r.status}
                          style={{
                            padding: "6px 12px",
                            borderRadius: "8px",
                            border: "1px solid #cbd5e1",
                            fontSize: "12.5px",
                            fontWeight: 700,
                            background: "#f8fafc",
                          }}
                        >
                          <option value="NEW">NEW</option>
                          <option value="CONTACTED">CONTACTED</option>
                          <option value="CLOSED">CLOSED</option>
                        </select>
                        <button
                          type="submit"
                          className="btn btn-blue btn-sm"
                          style={{ padding: "6px 12px", fontSize: "12.5px" }}
                        >
                          Save Status
                        </button>
                      </form>

                      <form action={removeInquiry}>
                        <input type="hidden" name="id" value={r.id} />
                        <button
                          type="submit"
                          title="Delete Inquiry"
                          style={{
                            padding: "6px 10px",
                            background: "#fff1f2",
                            border: "1px solid #fecdd3",
                            color: "#e11d48",
                            borderRadius: "8px",
                            fontSize: "12px",
                            cursor: "pointer",
                          }}
                        >
                          <Trash2 size={14} />
                        </button>
                      </form>
                    </div>
                  </div>

                  {/* Contact Meta Grid */}
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                      gap: "12px",
                      background: "#f8fafc",
                      padding: "12px 16px",
                      borderRadius: "10px",
                      fontSize: "13px",
                    }}
                  >
                    <div>
                      <strong style={{ color: "#64748b", display: "block", fontSize: "11px", textTransform: "uppercase" }}>Phone</strong>
                      <a href={`tel:${r.phone}`} style={{ color: "#0c233c", fontWeight: 700, display: "inline-flex", alignItems: "center", gap: "5px" }}>
                        <Phone size={13} style={{ color: "var(--orange)" }} /> {r.phone}
                      </a>
                    </div>

                    {r.email && (
                      <div>
                        <strong style={{ color: "#64748b", display: "block", fontSize: "11px", textTransform: "uppercase" }}>Email</strong>
                        <a href={`mailto:${r.email}`} style={{ color: "#0c233c", fontWeight: 600, display: "inline-flex", alignItems: "center", gap: "5px" }}>
                          <Mail size={13} /> {r.email}
                        </a>
                      </div>
                    )}

                    {r.location && (
                      <div>
                        <strong style={{ color: "#64748b", display: "block", fontSize: "11px", textTransform: "uppercase" }}>Location</strong>
                        <span style={{ color: "#0c233c", fontWeight: 600, display: "inline-flex", alignItems: "center", gap: "5px" }}>
                          <MapPin size={13} style={{ color: "var(--crimson)" }} /> {r.location}
                        </span>
                      </div>
                    )}

                    <div>
                      <strong style={{ color: "#64748b", display: "block", fontSize: "11px", textTransform: "uppercase" }}>Project Scope</strong>
                      <span style={{ color: "#1e6091", fontWeight: 700 }}>
                        {r.projectType || "General Construction"}
                      </span>
                    </div>

                    {r.area && (
                      <div>
                        <strong style={{ color: "#64748b", display: "block", fontSize: "11px", textTransform: "uppercase" }}>Area / Floors</strong>
                        <span style={{ color: "#0c233c", fontWeight: 600, display: "inline-flex", alignItems: "center", gap: "5px" }}>
                          <Layers size={13} /> {r.area}
                        </span>
                      </div>
                    )}

                    <div>
                      <strong style={{ color: "#64748b", display: "block", fontSize: "11px", textTransform: "uppercase" }}>Submitted Date</strong>
                      <span style={{ color: "#64748b", display: "inline-flex", alignItems: "center", gap: "5px" }}>
                        <Calendar size={13} /> {new Date(r.createdAt).toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Message body */}
                  <div style={{ background: "#ffffff", border: "1px solid #e2eaf0", borderRadius: "10px", padding: "14px 16px" }}>
                    <strong style={{ display: "block", fontSize: "12px", color: "#64748b", marginBottom: "4px", textTransform: "uppercase" }}>
                      Client Request &amp; Requirement Notes
                    </strong>
                    <p style={{ margin: 0, fontSize: "14px", color: "#1e293b", whiteSpace: "pre-line", lineHeight: 1.6 }}>
                      {r.message}
                    </p>
                  </div>

                  {/* Fast Action Buttons */}
                  <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                    <a
                      href={`tel:${r.phone}`}
                      className="btn btn-outline btn-sm"
                      style={{ fontSize: "12.5px", padding: "6px 14px" }}
                    >
                      <Phone size={13} /> Call {r.phone}
                    </a>
                    {cleanPhone && (
                      <a
                        href={`https://wa.me/977${cleanPhone.startsWith("98") ? cleanPhone : cleanPhone.replace(/^0/, "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-sm"
                        style={{ background: "#25D366", color: "#fff", border: "none", fontSize: "12.5px", padding: "6px 14px" }}
                      >
                        <MessageCircle size={13} /> WhatsApp Client
                      </a>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        )}

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalCount}
          pageSize={PAGE_SIZE}
          baseUrl="/admin/inquiries"
        />
      </div>
    </>
  );
}
