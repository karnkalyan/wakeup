import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { Package, Plus, Trash2, ExternalLink } from "lucide-react";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { Pagination } from "@/components/admin/Pagination";

export const dynamic = "force-dynamic";

const PAGE_SIZE = 6;

async function createItem(formData: FormData) {
  "use server";
  const title = String(formData.get("title") || "").trim();
  let slug = String(formData.get("slug") || "").trim();
  const description = String(formData.get("description") || "").trim();
  const image = String(formData.get("image") || "/assets/assets (15).png").trim();
  const sortOrder = Number(formData.get("sortOrder") || 0);

  if (!title) return;
  if (!slug) {
    slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  }

  await prisma.material.create({
    data: {
      title,
      slug,
      description: description || null,
      image: image || "/assets/assets (15).png",
      sortOrder,
      active: true,
    },
  });

  revalidatePath("/admin/materials");
  revalidatePath("/materials");
  revalidatePath("/");
}

async function remove(formData: FormData) {
  "use server";
  const id = Number(formData.get("id"));
  if (!id) return;
  await prisma.material.delete({ where: { id } });
  revalidatePath("/admin/materials");
  revalidatePath("/materials");
  revalidatePath("/");
}

export default async function MaterialsAdmin({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page } = await searchParams;
  const currentPage = Math.max(1, Number(page) || 1);

  const [totalCount, rows] = await Promise.all([
    prisma.material.count(),
    prisma.material.findMany({
      orderBy: { sortOrder: "asc" },
      skip: (currentPage - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
    }),
  ]);

  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  const presets = [
    { label: "Cement (OPC, PPC) (/assets/assets (15).png)", val: "/assets/assets (15).png" },
    { label: "TMT Bars / Steel (/assets/assets (13).png)", val: "/assets/assets (13).png" },
    { label: "Sand & Aggregate (/assets/assets (1).png)", val: "/assets/assets (1).png" },
    { label: "Bricks & Blocks (/assets/assets (3).png)", val: "/assets/assets (3).png" },
    { label: "Tiles & Marble (/assets/assets (5).png)", val: "/assets/assets (5).png" },
    { label: "Plumbing Items (/assets/assets (8).png)", val: "/assets/assets (8).png" },
    { label: "Electrical Materials (/assets/assets (6).png)", val: "/assets/assets (6).png" },
    { label: "Sanitary Products (/assets/assets (9).png)", val: "/assets/assets (9).png" },
    { label: "Paints & Finishes (/assets/assets (4).png)", val: "/assets/assets (4).png" },
    { label: "Hardware & Tools (/assets/assets (11).png)", val: "/assets/assets (11).png" },
    { label: "Roofing Solutions (/assets/assets (16).png)", val: "/assets/assets (16).png" },
    { label: "Waterproofing Chemicals (/assets/assets (10).png)", val: "/assets/assets (10).png" },
  ];

  return (
    <>
      <div className="admin-head">
        <div>
          <p className="admin-kicker">Material Catalog</p>
          <h1 className="admin-title">Materials Supply ({totalCount})</h1>
        </div>
        <Link href="/materials" target="_blank" className="btn-view-site">
          <span>View Public Materials</span>
          <ExternalLink size={14} />
        </Link>
      </div>

      <div className="admin-dashboard-grid" style={{ gridTemplateColumns: "1fr 1.35fr" }}>
        {/* ADD MATERIAL FORM */}
        <div className="admin-panel admin-form">
          <h2 style={{ display: "flex", alignItems: "center", gap: "8px", margin: "0 0 16px" }}>
            <Plus size={20} style={{ color: "var(--crimson)" }} /> Add New Material
          </h2>

          <form action={createItem}>
            <div style={{ marginBottom: "12px" }}>
              <label style={{ display: "block", fontSize: "12px", fontWeight: 700, marginBottom: "4px" }}>
                Material Name *
              </label>
              <input name="title" placeholder="e.g. Ready-Mix Concrete (RMC)" required />
            </div>

            <div style={{ marginBottom: "12px" }}>
              <label style={{ display: "block", fontSize: "12px", fontWeight: 700, marginBottom: "4px" }}>
                URL Slug (Optional)
              </label>
              <input name="slug" placeholder="e.g. ready-mix-concrete" />
            </div>

            <ImageUploadField
              name="image"
              defaultValue="/assets/assets (15).png"
              label="Material Image"
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
                Specification &amp; Description
              </label>
              <textarea name="description" rows={3} placeholder="Grades, sourcing reliability, site delivery notes..." />
            </div>

            <button type="submit" className="btn btn-orange" style={{ width: "100%" }}>
              Create Material
            </button>
          </form>
        </div>

        {/* MATERIALS LIST */}
        <div className="admin-panel">
          <h2 style={{ display: "flex", alignItems: "center", gap: "8px", margin: "0 0 16px" }}>
            <Package size={20} style={{ color: "var(--navy)" }} /> Material Catalog ({totalCount})
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            {rows.length === 0 ? (
              <p style={{ color: "var(--text-muted)", fontSize: "14px" }}>No materials found on this page.</p>
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
                    <div style={{ position: "relative", width: "60px", height: "45px", borderRadius: "8px", overflow: "hidden", flexShrink: 0, border: "1px solid #e2eaf0" }}>
                      <Image
                        src={r.image || "/assets/assets (15).png"}
                        alt={r.title}
                        fill
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                    <div>
                      <strong style={{ fontSize: "15px", color: "#0c233c", display: "block" }}>{r.title}</strong>
                      <span style={{ fontSize: "12px", color: "#64748b" }}>Order #{r.sortOrder} · /{r.slug}</span>
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <Link
                      href={`/admin/materials/${r.id}`}
                      className="btn btn-outline btn-sm"
                      style={{ fontSize: "12px", padding: "6px 12px" }}
                    >
                      Edit
                    </Link>
                    <form action={remove}>
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
            baseUrl="/admin/materials"
          />
        </div>
      </div>
    </>
  );
}
