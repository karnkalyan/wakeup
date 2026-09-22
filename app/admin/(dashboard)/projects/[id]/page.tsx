import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { ArrowLeft } from "lucide-react";

async function updateItem(formData: FormData) {
  "use server";
  const id = Number(formData.get("id"));
  await prisma.project.update({
    where: { id },
    data: {
      title: String(formData.get("title")),
      slug: String(formData.get("slug")),
      category: String(formData.get("category")),
      location: String(formData.get("location")),
      excerpt: String(formData.get("excerpt") || ""),
      content: String(formData.get("content") || ""),
      coverImage: String(formData.get("coverImage") || ""),
      featured: formData.get("featured") === "on",
      active: formData.get("active") === "on",
    },
  });
  revalidatePath("/");
  revalidatePath("/projects");
  revalidatePath("/admin/projects");
  redirect("/admin/projects");
}

export default async function EditProject({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const row = await prisma.project.findUnique({ where: { id: Number(id) } });
  if (!row) notFound();

  const presets = [
    { label: "Modern Villa (/assets/assets (21).png)", val: "/assets/assets (21).png" },
    { label: "Office Complex (/assets/assets (22).png)", val: "/assets/assets (22).png" },
    { label: "House Renovation (/assets/assets (24).png)", val: "/assets/assets (24).png" },
    { label: "Luxury Villa (/assets/assets (18).png)", val: "/assets/assets (18).png" },
    { label: "Residential (/assets/assets (19).png)", val: "/assets/assets (19).png" },
  ];

  return (
    <>
      <div className="admin-head">
        <div>
          <Link
            href="/admin/projects"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              fontSize: "13px",
              color: "#64748b",
              fontWeight: 600,
              marginBottom: "8px",
            }}
          >
            <ArrowLeft size={14} /> Back to Projects
          </Link>
          <h1 className="admin-title">Edit Project: {row.title}</h1>
        </div>
      </div>

      <div style={{ maxWidth: "800px" }}>
        <form action={updateItem} className="admin-panel admin-form">
          <input type="hidden" name="id" value={row.id} />

          <div style={{ marginBottom: "14px" }}>
            <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, marginBottom: "4px" }}>
              Project Title *
            </label>
            <input name="title" defaultValue={row.title} required />
          </div>

          <div style={{ marginBottom: "14px" }}>
            <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, marginBottom: "4px" }}>
              URL Slug
            </label>
            <input name="slug" defaultValue={row.slug} required />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: "14px" }}>
            <div>
              <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, marginBottom: "4px" }}>
                Category
              </label>
              <input name="category" defaultValue={row.category} required />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, marginBottom: "4px" }}>
                Location
              </label>
              <input name="location" defaultValue={row.location} required />
            </div>
          </div>

          <ImageUploadField
            name="coverImage"
            defaultValue={row.coverImage || ""}
            label="Cover Image"
            presetOptions={presets}
          />

          <div style={{ marginBottom: "14px" }}>
            <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, marginBottom: "4px" }}>
              Short Excerpt
            </label>
            <textarea name="excerpt" rows={3} defaultValue={row.excerpt || ""} />
          </div>

          <div style={{ marginBottom: "16px" }}>
            <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, marginBottom: "4px" }}>
              Detailed Description / Content
            </label>
            <textarea name="content" rows={6} defaultValue={row.content || ""} />
          </div>

          <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
            <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", fontWeight: 700, cursor: "pointer" }}>
              <input type="checkbox" name="featured" defaultChecked={row.featured} />
              <span>Featured on Homepage</span>
            </label>
            <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", fontWeight: 700, cursor: "pointer" }}>
              <input type="checkbox" name="active" defaultChecked={row.active} />
              <span>Active (Visible)</span>
            </label>
          </div>

          <button type="submit" className="btn btn-orange">
            Save Changes
          </button>
        </form>
      </div>
    </>
  );
}
