import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { Building2, Plus, Trash2, MapPin, ExternalLink } from "lucide-react";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { Pagination } from "@/components/admin/Pagination";

export const dynamic = "force-dynamic";

const PAGE_SIZE = 6;

async function createProject(formData: FormData) {
  "use server";
  const title = String(formData.get("title") || "").trim();
  let slug = String(formData.get("slug") || "").trim();
  const category = String(formData.get("category") || "Residential").trim();
  const location = String(formData.get("location") || "").trim();
  const excerpt = String(formData.get("excerpt") || "").trim();
  const coverImage = String(formData.get("coverImage") || "/assets/assets (21).png").trim();
  const featured = formData.get("featured") === "on";

  if (!title) return;
  if (!slug) {
    slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  }

  await prisma.project.create({
    data: {
      title,
      slug,
      category,
      location,
      excerpt: excerpt || null,
      coverImage: coverImage || "/assets/assets (21).png",
      featured,
      active: true,
    },
  });

  revalidatePath("/admin/projects");
  revalidatePath("/projects");
  revalidatePath("/");
}

async function removeProject(formData: FormData) {
  "use server";
  const id = Number(formData.get("id"));
  if (!id) return;
  await prisma.project.delete({ where: { id } });
  revalidatePath("/admin/projects");
  revalidatePath("/projects");
  revalidatePath("/");
}

export default async function ProjectsAdminPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page } = await searchParams;
  const currentPage = Math.max(1, Number(page) || 1);

  const [totalCount, rows] = await Promise.all([
    prisma.project.count(),
    prisma.project.findMany({
      orderBy: { createdAt: "desc" },
      skip: (currentPage - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
    }),
  ]);

  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  const availableProjectImages = [
    { label: "Modern Villa / Residence (/assets/assets (21).png)", val: "/assets/assets (21).png" },
    { label: "Commercial Office Complex (/assets/assets (22).png)", val: "/assets/assets (22).png" },
    { label: "Renovated Residence (/assets/assets (24).png)", val: "/assets/assets (24).png" },
    { label: "Luxury Villa Landmark (/assets/assets (18).png)", val: "/assets/assets (18).png" },
    { label: "Residential Construction (/assets/assets (19).png)", val: "/assets/assets (19).png" },
    { label: "Modern Commercial Plaza (/assets/assets (20).png)", val: "/assets/assets (20).png" },
    { label: "Interior & Fit-out (/assets/assets (12).png)", val: "/assets/assets (12).png" },
    { label: "RCC Structural Works (/assets/assets (25).png)", val: "/assets/assets (25).png" },
  ];

  return (
    <>
      <div className="admin-head">
        <div>
          <p className="admin-kicker">Portfolio Management</p>
          <h1 className="admin-title">Architectural Projects ({totalCount})</h1>
        </div>
        <Link href="/projects" target="_blank" className="btn-view-site">
          <span>View Public Projects</span>
          <ExternalLink size={14} />
        </Link>
      </div>

      <div className="admin-dashboard-grid" style={{ gridTemplateColumns: "1fr 1.35fr" }}>
        {/* ADD PROJECT FORM */}
        <div className="admin-panel admin-form">
          <h2 style={{ display: "flex", alignItems: "center", gap: "8px", margin: "0 0 16px" }}>
            <Plus size={20} style={{ color: "var(--crimson)" }} /> Add New Project
          </h2>

          <form action={createProject}>
            <div style={{ marginBottom: "12px" }}>
              <label style={{ display: "block", fontSize: "12px", fontWeight: 700, marginBottom: "4px" }}>
                Project Title *
              </label>
              <input name="title" placeholder="e.g. Modern Family Villa" required />
            </div>

            <div style={{ marginBottom: "12px" }}>
              <label style={{ display: "block", fontSize: "12px", fontWeight: 700, marginBottom: "4px" }}>
                URL Slug (Optional, auto-generated if empty)
              </label>
              <input name="slug" placeholder="e.g. modern-family-villa" />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "12px" }}>
              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 700, marginBottom: "4px" }}>
                  Category *
                </label>
                <select name="category" defaultValue="Residential">
                  <option value="Residential">Residential</option>
                  <option value="Commercial">Commercial</option>
                  <option value="Renovation">Renovation</option>
                  <option value="Interior">Interior</option>
                  <option value="Turnkey">Turnkey</option>
                </select>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 700, marginBottom: "4px" }}>
                  Location *
                </label>
                <input name="location" placeholder="e.g. Lalitpur, Nepal" required />
              </div>
            </div>

            <ImageUploadField
              name="coverImage"
              defaultValue="/assets/assets (21).png"
              label="Project Cover Image"
              presetOptions={availableProjectImages}
            />

            <div style={{ marginBottom: "14px" }}>
              <label style={{ display: "block", fontSize: "12px", fontWeight: 700, marginBottom: "4px" }}>
                Short Excerpt
              </label>
              <textarea name="excerpt" rows={3} placeholder="Brief highlights, land area, stories, and finishing specs..." />
            </div>

            <div style={{ marginBottom: "18px" }}>
              <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", fontWeight: 700, cursor: "pointer" }}>
                <input type="checkbox" name="featured" defaultChecked />
                <span>Feature on Homepage Showcase</span>
              </label>
            </div>

            <button type="submit" className="btn btn-orange" style={{ width: "100%" }}>
              Create Project
            </button>
          </form>
        </div>

        {/* CURRENT PROJECTS LIST */}
        <div className="admin-panel">
          <h2 style={{ display: "flex", alignItems: "center", gap: "8px", margin: "0 0 16px" }}>
            <Building2 size={20} style={{ color: "var(--navy)" }} /> Existing Projects ({totalCount})
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {rows.length === 0 ? (
              <p style={{ color: "var(--text-muted)", fontSize: "14px" }}>No projects found on this page.</p>
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
                    <div style={{ position: "relative", width: "70px", height: "55px", borderRadius: "8px", overflow: "hidden", flexShrink: 0 }}>
                      <Image
                        src={r.coverImage || "/assets/assets (21).png"}
                        alt={r.title}
                        fill
                        style={{ objectFit: "cover" }}
                      />
                    </div>

                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "2px" }}>
                        <strong style={{ fontSize: "15px", color: "#0c233c" }}>{r.title}</strong>
                        {r.featured && (
                          <span style={{ fontSize: "10.5px", background: "#fef3eb", color: "#d97706", padding: "2px 8px", borderRadius: "999px", fontWeight: 800 }}>
                            FEATURED
                          </span>
                        )}
                      </div>
                      <div style={{ fontSize: "12.5px", color: "#64748b", display: "flex", alignItems: "center", gap: "8px" }}>
                        <span style={{ color: "var(--crimson)", fontWeight: 700 }}>{r.category}</span>
                        <span>•</span>
                        <span style={{ display: "inline-flex", alignItems: "center", gap: "3px" }}>
                          <MapPin size={12} /> {r.location}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <Link
                      href={`/admin/projects/${r.id}`}
                      className="btn btn-outline btn-sm"
                      style={{ fontSize: "12px", padding: "6px 12px" }}
                    >
                      Edit
                    </Link>

                    <form action={removeProject}>
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
            baseUrl="/admin/projects"
          />
        </div>
      </div>
    </>
  );
}
