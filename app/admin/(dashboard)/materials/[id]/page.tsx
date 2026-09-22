import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { ArrowLeft } from "lucide-react";

async function updateItem(formData: FormData) {
  "use server";
  const id = Number(formData.get("id"));
  await prisma.material.update({
    where: { id },
    data: {
      title: String(formData.get("title")),
      slug: String(formData.get("slug")),
      description: String(formData.get("description") || ""),
      image: String(formData.get("image") || ""),
      sortOrder: Number(formData.get("sortOrder") || 0),
      active: formData.get("active") === "on",
    },
  });
  revalidatePath("/");
  revalidatePath("/materials");
  revalidatePath("/admin/materials");
  redirect("/admin/materials");
}

export default async function EditMaterial({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const row = await prisma.material.findUnique({ where: { id: Number(id) } });
  if (!row) notFound();

  const presets = [
    { label: "Cement (OPC, PPC) (/assets/assets (15).png)", val: "/assets/assets (15).png" },
    { label: "TMT Steel Rods (/assets/assets (13).png)", val: "/assets/assets (13).png" },
    { label: "Sand & Aggregate (/assets/assets (1).png)", val: "/assets/assets (1).png" },
    { label: "Bricks & Blocks (/assets/assets (3).png)", val: "/assets/assets (3).png" },
    { label: "Tiles & Marble (/assets/assets (5).png)", val: "/assets/assets (5).png" },
    { label: "Plumbing Items (/assets/assets (8).png)", val: "/assets/assets (8).png" },
    { label: "Electrical Materials (/assets/assets (6).png)", val: "/assets/assets (6).png" },
    { label: "Sanitary Products (/assets/assets (9).png)", val: "/assets/assets (9).png" },
    { label: "Paints (/assets/assets (4).png)", val: "/assets/assets (4).png" },
  ];

  return (
    <>
      <div className="admin-head">
        <div>
          <Link
            href="/admin/materials"
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
            <ArrowLeft size={14} /> Back to Materials
          </Link>
          <h1 className="admin-title">Edit Material: {row.title}</h1>
        </div>
      </div>

      <div style={{ maxWidth: "800px" }}>
        <form action={updateItem} className="admin-panel admin-form">
          <input type="hidden" name="id" value={row.id} />

          <div style={{ marginBottom: "14px" }}>
            <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, marginBottom: "4px" }}>
              Material Name *
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
            label="Material Image"
            presetOptions={presets}
          />

          <div style={{ marginBottom: "14px" }}>
            <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, marginBottom: "4px" }}>
              Sort Order
            </label>
            <input name="sortOrder" type="number" defaultValue={row.sortOrder} />
          </div>

          <div style={{ marginBottom: "16px" }}>
            <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, marginBottom: "4px" }}>
              Description &amp; Specs
            </label>
            <textarea name="description" rows={5} defaultValue={row.description || ""} />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", fontWeight: 700, cursor: "pointer" }}>
              <input type="checkbox" name="active" defaultChecked={row.active} />
              <span>Active (Visible in public catalog)</span>
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
