import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { ArrowLeft } from "lucide-react";

async function updateService(formData: FormData) {
  "use server";
  const id = Number(formData.get("id"));
  await prisma.service.update({
    where: { id },
    data: {
      title: String(formData.get("title")),
      slug: String(formData.get("slug")),
      excerpt: String(formData.get("excerpt")),
      content: String(formData.get("content") || ""),
      image: String(formData.get("image") || ""),
      sortOrder: Number(formData.get("sortOrder") || 0),
      active: formData.get("active") === "on",
    },
  });
  revalidatePath("/");
  revalidatePath("/services");
  revalidatePath("/admin/services");
  redirect("/admin/services");
}

export default async function EditService({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const row = await prisma.service.findUnique({ where: { id: Number(id) } });
  if (!row) notFound();

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
          <Link
            href="/admin/services"
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
            <ArrowLeft size={14} /> Back to Services
          </Link>
          <h1 className="admin-title">Edit Service: {row.title}</h1>
        </div>
      </div>

      <div style={{ maxWidth: "800px" }}>
        <form action={updateService} className="admin-panel admin-form">
          <input type="hidden" name="id" value={row.id} />

          <div style={{ marginBottom: "14px" }}>
            <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, marginBottom: "4px" }}>
              Service Title *
            </label>
            <input name="title" defaultValue={row.title} required />
          </div>

          <div style={{ marginBottom: "14px" }}>
            <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, marginBottom: "4px" }}>
              URL Slug
            </label>
            <input name="slug" defaultValue={row.slug} required />
          </div>

          <ImageUploadField
            name="image"
            defaultValue={row.image || ""}
            label="Service Featured Image"
            presetOptions={presets}
          />

          <div style={{ marginBottom: "14px" }}>
            <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, marginBottom: "4px" }}>
              Sort Order
            </label>
            <input name="sortOrder" type="number" defaultValue={row.sortOrder} />
          </div>

          <div style={{ marginBottom: "14px" }}>
            <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, marginBottom: "4px" }}>
              Summary / Excerpt *
            </label>
            <textarea name="excerpt" rows={3} defaultValue={row.excerpt} required />
          </div>

          <div style={{ marginBottom: "16px" }}>
            <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, marginBottom: "4px" }}>
              Full Service Details / Content
            </label>
            <textarea name="content" rows={6} defaultValue={row.content || ""} />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", fontWeight: 700, cursor: "pointer" }}>
              <input type="checkbox" name="active" defaultChecked={row.active} />
              <span>Active (Visible on public site)</span>
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
