import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { ArrowLeft, User, Phone, Mail } from "lucide-react";

async function updateMember(formData: FormData) {
  "use server";
  const id = Number(formData.get("id"));
  const name = String(formData.get("name") || "").trim();
  const role = String(formData.get("role") || "").trim();
  const bio = String(formData.get("bio") || "").trim();
  const image = String(formData.get("image") || "").trim();
  const phone = String(formData.get("phone") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const sortOrder = Number(formData.get("sortOrder") || 0);
  const active = formData.get("active") === "on";

  if (!id || !name || !role) return;

  await (prisma as any).teamMember.update({
    where: { id },
    data: {
      name,
      role,
      bio: bio || null,
      image: image || "/assets/assets (17).png",
      phone: phone || null,
      email: email || null,
      sortOrder,
      active,
    },
  });

  revalidatePath("/");
  revalidatePath("/team");
  revalidatePath("/admin/team");
  redirect("/admin/team");
}

export default async function EditTeamMember({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const member = await (prisma as any).teamMember.findUnique({
    where: { id: Number(id) },
  });

  if (!member) notFound();

  const presets = [
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
          <Link
            href="/admin/team"
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
            <ArrowLeft size={14} /> Back to Team Members
          </Link>
          <h1 className="admin-title">Edit Team Member: {member.name}</h1>
        </div>
      </div>

      <div style={{ maxWidth: "800px" }}>
        <form action={updateMember} className="admin-panel admin-form">
          <input type="hidden" name="id" value={member.id} />

          <div style={{ marginBottom: "14px" }}>
            <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, marginBottom: "4px" }}>
              Full Name *
            </label>
            <input name="name" defaultValue={member.name} required />
          </div>

          <div style={{ marginBottom: "14px" }}>
            <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, marginBottom: "4px" }}>
              Designation / Role *
            </label>
            <input name="role" defaultValue={member.role} required />
          </div>

          <ImageUploadField
            name="image"
            defaultValue={member.image || "/assets/assets (17).png"}
            label="Profile Photo"
            presetOptions={presets}
          />

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: "14px" }}>
            <div>
              <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, marginBottom: "4px" }}>
                Phone Number
              </label>
              <input name="phone" defaultValue={member.phone || ""} placeholder="98XXXXXXXX" />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, marginBottom: "4px" }}>
                Email Address
              </label>
              <input name="email" defaultValue={member.email || ""} placeholder="name@example.com" />
            </div>
          </div>

          <div style={{ marginBottom: "14px" }}>
            <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, marginBottom: "4px" }}>
              Sort Order (1, 2, 3...)
            </label>
            <input name="sortOrder" type="number" defaultValue={member.sortOrder} />
          </div>

          <div style={{ marginBottom: "16px" }}>
            <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, marginBottom: "4px" }}>
              Bio / Experience Summary
            </label>
            <textarea name="bio" rows={4} defaultValue={member.bio || ""} />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", fontWeight: 700, cursor: "pointer" }}>
              <input type="checkbox" name="active" defaultChecked={member.active} />
              <span>Active (Visible on public team page)</span>
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
