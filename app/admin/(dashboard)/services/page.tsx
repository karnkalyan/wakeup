import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { Hammer, Plus, Trash2, ExternalLink } from "lucide-react";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { Pagination } from "@/components/admin/Pagination";

export const dynamic = "force-dynamic";

const PAGE_SIZE = 6;

async function createService(formData: FormData) {
  "use server";
  const title = String(formData.get("title") || "").trim();
  let slug = String(formData.get("slug") || "").trim();
  const excerpt = String(formData.get("excerpt") || "").trim();
  const image = String(formData.get("image") || "/assets/assets (19).png").trim();
  const sortOrder = Number(formData.get("sortOrder") || 0);

  if (!title) return;
  if (!slug) {
    slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  }

  await prisma.service.create({
    data: {
      title,
      slug,
      excerpt,
      image,
      sortOrder,
      active: true,
    },
  });

  revalidatePath("/admin/services");
  revalidatePath("/services");
  revalidatePath("/");
}

async function deleteService(formData: FormData) {
  "use server";
  const id = Number(formData.get("id"));
  if (!id) return;
  await prisma.service.delete({ where: { id } });
  revalidatePath("/admin/services");
  revalidatePath("/services");
  revalidatePath("/");
}

export default async function ServicesAdmin({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page } = await searchParams;
  const currentPage = Math.max(1, Number(page) || 1);

  const [totalCount, rows] = await Promise.all([
    prisma.service.count(),
    prisma.service.findMany({
      orderBy: { sortOrder: "asc" },
      skip: (currentPage - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
    }),
  ]);

  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  const presets = [
    { label: "House Construction (/assets/assets (19).png)", val: "/assets/assets (19).png" },
    { label: "Commercial (/assets/assets (20).png)", val: "/assets/assets (20).png" },
    { label: "Renovation (/assets/assets (23).png)", val: "/assets/assets (23).png" },
    { label: "Interior Design (/assets/assets (12).png)", val: "/assets/assets (12).png" },
    { label: "RCC Structural Works (/assets/assets (25).png)", val: "/assets/assets (25).png" },
    { label: "Electrical & Plumbing (/assets/assets (26).png)", val: "/assets/assets (26).png" },
    { label: "Waterproofing (/assets/assets (2).png)", val: "/assets/assets (2).png" },
    { label: "Project Supervision (/assets/assets (17).png)", val: "/assets/assets (17).png" },
  ];

  return (
    <>
      <div className="admin-head">
        <div>
          <p className="admin-kicker">Content Management</p>
          <h1 className="admin-title">Construction Services ({totalCount})</h1>
        </div>
        <Link href="/services" target="_blank" className="btn-view-site">
          <span>View Public Services</span>
          <ExternalLink size={14} />
        </Link>
      </div>

      <div className="admin-dashboard-grid" style={{ gridTemplateColumns: "1fr 1.35fr" }}>
        {/* ADD SERVICE FORM */}
        <div className="admin-panel admin-form">
          <h2 style={{ display: "flex", alignItems: "center", gap: "8px", margin: "0 0 16px" }}>
            <Plus size={20} style={{ color: "var(--crimson)" }} /> Add New Service
          </h2>

          <form action={createService}>
            <div style={{ marginBottom: "12px" }}>
              <label style={{ display: "block", fontSize: "12px", fontWeight: 700, marginBottom: "4px" }}>
                Service Title *
              </label>
              <input name="title" placeholder="e.g. Turnkey Villa Construction" required />
            </div>

            <div style={{ marginBottom: "12px" }}>
              <label style={{ display: "block", fontSize: "12px", fontWeight: 700, marginBottom: "4px" }}>
                URL Slug (Optional)
              </label>
              <input name="slug" placeholder="e.g. turnkey-villa-construction" />
            </div>

            <ImageUploadField
              name="image"
              defaultValue="/assets/assets (19).png"
              label="Service Featured Image"
              presetOptions={presets}
            />

            <div style={{ marginBottom: "12px" }}>
              <label style={{ display: "block", fontSize: "12px", fontWeight: 700, marginBottom: "4px" }}>
                Sort Order (1, 2, 3...)
              </label>
              <input name="sortOrder" type="number" defaultValue={totalCount + 1} />
            </div>

            <div style={{ marginBottom: "18px" }}>
              <label style={{ display: "block", fontSize: "12px", fontWeight: 700, marginBottom: "4px" }}>
                Short Summary / Scope *
              </label>
              <textarea name="excerpt" rows={3} placeholder="Key features, engineering techniques, and client advantages..." required />
            </div>

            <button type="submit" className="btn btn-orange" style={{ width: "100%" }}>
              Create Service
            </button>
          </form>
        </div>

        {/* SERVICES LIST */}
        <div className="admin-panel">
          <h2 style={{ display: "flex", alignItems: "center", gap: "8px", margin: "0 0 16px" }}>
            <Hammer size={20} style={{ color: "var(--navy)" }} /> Active Services ({totalCount})
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            {rows.length === 0 ? (
              <p style={{ color: "var(--text-muted)", fontSize: "14px" }}>No services found on this page.</p>
            ) : (
              rows.map((r) => (
                <div
                  key={r.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "16px",
                    background: "#ffffff",
                    border: "1px solid #e2eaf0",
                    borderRadius: "14px",
                    gap: "16px",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                    <div style={{ position: "relative", width: "65px", height: "50px", borderRadius: "8px", overflow: "hidden", flexShrink: 0, border: "1px solid #e2eaf0" }}>
                      <Image
                        src={r.image || "/assets/assets (19).png"}
                        alt={r.title}
                        fill
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                    <div>
                      <strong style={{ fontSize: "15px", color: "#0c233c", display: "block" }}>{r.title}</strong>
                      <span style={{ fontSize: "12px", color: "#64748b" }}>/{r.slug} · Order #{r.sortOrder}</span>
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <Link
                      href={`/admin/services/${r.id}`}
                      className="btn btn-outline btn-sm"
                      style={{ fontSize: "12px", padding: "6px 12px" }}
                    >
                      Edit
                    </Link>
                    <form action={deleteService}>
                      <input type="hidden" name="id" value={r.id} />
                      <button
                        type="submit"
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
              ))
            )}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={totalCount}
            pageSize={PAGE_SIZE}
            baseUrl="/admin/services"
          />
        </div>
      </div>
    </>
  );
}
