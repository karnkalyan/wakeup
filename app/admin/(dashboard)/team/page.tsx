import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { Users, Plus, Trash2, Phone, Mail, Edit, ExternalLink } from "lucide-react";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { Pagination } from "@/components/admin/Pagination";

export const dynamic = "force-dynamic";

const PAGE_SIZE = 6;

async function createMember(formData: FormData) {
  "use server";
  const name = String(formData.get("name") || "").trim();
  const role = String(formData.get("role") || "").trim();
  const bio = String(formData.get("bio") || "").trim();
  const image = String(formData.get("image") || "/assets/assets (17).png").trim();
  const phone = String(formData.get("phone") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const sortOrder = Number(formData.get("sortOrder") || 1);

  if (!name || !role) return;

  await (prisma as any).teamMember.create({
    data: {
      name,
      role,
      bio: bio || null,
      image: image || "/assets/assets (17).png",
      phone: phone || null,
      email: email || null,
      sortOrder,
      active: true,
    },
  });

  revalidatePath("/admin/team");
  revalidatePath("/team");
  revalidatePath("/");
}

async function removeMember(formData: FormData) {
  "use server";
  const id = Number(formData.get("id"));
  if (!id) return;
  await (prisma as any).teamMember.delete({ where: { id } });
  revalidatePath("/admin/team");
  revalidatePath("/team");
  revalidatePath("/");
}

export default async function TeamAdminPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page } = await searchParams;
  const currentPage = Math.max(1, Number(page) || 1);

  const [totalCount, members] = await Promise.all([
    (prisma as any).teamMember.count(),
    (prisma as any).teamMember.findMany({
      orderBy: { sortOrder: "asc" },
      skip: (currentPage - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
    }),
  ]);

  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  const availableImages = [
    { label: "CEO Krishna Kumar Shah (/assets/ceo.jpeg)", val: "/assets/ceo.jpeg" },
    { label: "Site Engineer Rajesh (/assets/assets (17).png)", val: "/assets/assets (17).png" },
    { label: "Architect Pooja (/assets/assets (14).png)", val: "/assets/assets (14).png" },
    { label: "MEP Engineer Bikash (/assets/assets (7).png)", val: "/assets/assets (7).png" },
    { label: "Executive Asset 18 (/assets/assets (18).png)", val: "/assets/assets (18).png" },
    { label: "Executive Asset 20 (/assets/assets (20).png)", val: "/assets/assets (20).png" },
    { label: "Executive Asset 26 (/assets/assets (26).png)", val: "/assets/assets (26).png" },
  ];

  return (
    <>
      <div className="admin-head">
        <div>
          <p className="admin-kicker">Company People</p>
          <h1 className="admin-title">Team Members ({totalCount})</h1>
        </div>
        <Link href="/team" target="_blank" className="btn-view-site">
          <span>View Public Team Page</span>
          <ExternalLink size={14} />
        </Link>
      </div>

      <div className="admin-dashboard-grid" style={{ gridTemplateColumns: "1fr 1.35fr" }}>
        {/* ADD MEMBER FORM */}
        <div className="admin-panel admin-form">
          <h2 style={{ display: "flex", alignItems: "center", gap: "8px", margin: "0 0 16px" }}>
            <Plus size={20} style={{ color: "var(--crimson)" }} /> Add Team Member
          </h2>
          <form action={createMember}>
            <div style={{ marginBottom: "12px" }}>
              <label style={{ display: "block", fontSize: "12px", fontWeight: 700, marginBottom: "4px" }}>
                Full Name *
              </label>
              <input name="name" placeholder="e.g. Er. Krishna Kumar Shah" required />
            </div>

            <div style={{ marginBottom: "12px" }}>
              <label style={{ display: "block", fontSize: "12px", fontWeight: 700, marginBottom: "4px" }}>
                Designation / Role *
              </label>
              <input name="role" placeholder="e.g. Senior Civil & Structural Engineer" required />
            </div>

            <ImageUploadField
              name="image"
              defaultValue="/assets/assets (17).png"
              label="Profile Photo"
              presetOptions={availableImages}
            />

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "12px" }}>
              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 700, marginBottom: "4px" }}>
                  Phone
                </label>
                <input name="phone" placeholder="98XXXXXXXX" />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 700, marginBottom: "4px" }}>
                  Email
                </label>
                <input name="email" placeholder="name@example.com" />
              </div>
            </div>

            <div style={{ marginBottom: "12px" }}>
              <label style={{ display: "block", fontSize: "12px", fontWeight: 700, marginBottom: "4px" }}>
                Sort Order (1, 2, 3...)
              </label>
              <input name="sortOrder" type="number" defaultValue={totalCount + 1} />
            </div>

            <div style={{ marginBottom: "18px" }}>
              <label style={{ display: "block", fontSize: "12px", fontWeight: 700, marginBottom: "4px" }}>
                Short Bio / Experience
              </label>
              <textarea name="bio" rows={3} placeholder="Experience, specialty, and responsibilities..." />
            </div>

            <button type="submit" className="btn btn-orange" style={{ width: "100%" }}>
              Save Team Member
            </button>
          </form>
        </div>

        {/* TEAM MEMBER LIST */}
        <div className="admin-panel">
          <h2 style={{ display: "flex", alignItems: "center", gap: "8px", margin: "0 0 16px" }}>
            <Users size={20} style={{ color: "var(--navy)" }} /> Current Team ({totalCount})
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            {members.length === 0 ? (
              <p style={{ color: "var(--text-muted)", fontSize: "14px" }}>No team members found on this page.</p>
            ) : (
              members.map((m: any) => (
                <div
                  key={m.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "16px",
                    background: "#ffffff",
                    border: "1px solid #e2eaf0",
                    borderRadius: "12px",
                    gap: "16px",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                    <div style={{ position: "relative", width: "50px", height: "50px", borderRadius: "10px", overflow: "hidden", flexShrink: 0, border: "1px solid #d0dbe5" }}>
                      <Image
                        src={m.image || "/assets/assets (17).png"}
                        alt={m.name}
                        fill
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                    <div>
                      <strong style={{ fontSize: "15px", color: "var(--navy-dark)", display: "block" }}>
                        {m.name}
                      </strong>
                      <span style={{ fontSize: "12.5px", color: "var(--crimson)", fontWeight: 700, display: "block" }}>
                        {m.role}
                      </span>
                      <span style={{ fontSize: "11.5px", color: "var(--text-muted)", display: "flex", gap: "10px", marginTop: "2px" }}>
                        {m.phone && <span><Phone size={11} style={{ display: "inline" }} /> {m.phone}</span>}
                        {m.email && <span><Mail size={11} style={{ display: "inline" }} /> {m.email}</span>}
                        <span>Order #{m.sortOrder}</span>
                      </span>
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <Link
                      href={`/admin/team/${m.id}`}
                      className="btn btn-outline btn-sm"
                      style={{ fontSize: "12px", padding: "6px 12px", display: "inline-flex", alignItems: "center", gap: "4px" }}
                    >
                      <Edit size={13} /> Edit
                    </Link>

                    <form action={removeMember}>
                      <input type="hidden" name="id" value={m.id} />
                      <button
                        type="submit"
                        style={{
                          padding: "8px 12px",
                          background: "#fff1f2",
                          border: "1px solid #fecdd3",
                          color: "#e11d48",
                          borderRadius: "8px",
                          fontSize: "12px",
                          fontWeight: 700,
                          cursor: "pointer",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "4px",
                        }}
                      >
                        <Trash2 size={13} /> Delete
                      </button>
                    </form>
                  </div>
                </div>
              ))
            )}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={totalCount}
            pageSize={PAGE_SIZE}
            baseUrl="/admin/team"
          />
        </div>
      </div>
    </>
  );
}
