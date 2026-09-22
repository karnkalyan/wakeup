import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { Building, Phone, Mail, MapPin, Globe, Save, Trophy, Plus, Trash2, CheckCircle } from "lucide-react";

export const dynamic = "force-dynamic";

async function saveSettings(formData: FormData) {
  "use server";
  const companyName = String(formData.get("companyName") || "WakeUp Nepal Builders Pvt. Ltd.");
  const tagline = String(formData.get("tagline") || "Building Trust, Building Homes.");
  const phone1 = String(formData.get("phone1") || "9864033256");
  const phone2 = String(formData.get("phone2") || "9851188296");
  const email = String(formData.get("email") || "wakeupnepalbuilders@gmail.com");
  const address = String(formData.get("address") || "New Baneshwor, Kathmandu, Nepal");
  const heroTitleNp = String(formData.get("heroTitleNp") || "विश्वासका साथ निर्माण गर्नुहोस्");
  const heroTitleEn = String(formData.get("heroTitleEn") || "Build with Confidence");
  const heroText = String(formData.get("heroText") || "");

  await prisma.companySetting.upsert({
    where: { id: 1 },
    create: {
      id: 1,
      companyName,
      tagline,
      phone1,
      phone2,
      email,
      address,
      heroTitleNp,
      heroTitleEn,
      heroText,
    },
    update: {
      companyName,
      tagline,
      phone1,
      phone2,
      email,
      address,
      heroTitleNp,
      heroTitleEn,
      heroText,
    },
  });

  revalidatePath("/");
  revalidatePath("/about");
  revalidatePath("/contact");
  revalidatePath("/admin/settings");
}

async function updateStat(formData: FormData) {
  "use server";
  const id = Number(formData.get("id"));
  const label = String(formData.get("label") || "").trim();
  const value = String(formData.get("value") || "").trim();
  const icon = String(formData.get("icon") || "trophy").trim();
  const sortOrder = Number(formData.get("sortOrder") || 0);
  const active = formData.get("active") === "on";

  if (!id || !label || !value) return;

  await prisma.stat.update({
    where: { id },
    data: {
      label,
      value,
      icon,
      sortOrder,
      active,
    },
  });

  revalidatePath("/");
  revalidatePath("/about");
  revalidatePath("/admin/settings");
}

async function createStat(formData: FormData) {
  "use server";
  const label = String(formData.get("label") || "").trim();
  const value = String(formData.get("value") || "").trim();
  const icon = String(formData.get("icon") || "trophy").trim();
  const sortOrder = Number(formData.get("sortOrder") || 0);

  if (!label || !value) return;

  await prisma.stat.create({
    data: {
      label,
      value,
      icon,
      sortOrder,
      active: true,
    },
  });

  revalidatePath("/");
  revalidatePath("/about");
  revalidatePath("/admin/settings");
}

async function deleteStat(formData: FormData) {
  "use server";
  const id = Number(formData.get("id"));
  if (!id) return;
  await prisma.stat.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/about");
  revalidatePath("/admin/settings");
}

export default async function SettingsPage() {
  const [s, stats] = await Promise.all([
    prisma.companySetting.findUnique({ where: { id: 1 } }),
    prisma.stat.findMany({ orderBy: { sortOrder: "asc" } }),
  ]);

  if (!s) {
    return (
      <div className="admin-panel">
        <p>Company settings not initialized. Run the seed command to initialize.</p>
      </div>
    );
  }

  const iconOptions = [
    { label: "Trophy (Experience)", val: "trophy" },
    { label: "Building (Projects Completed)", val: "building" },
    { label: "Truck (Materials Supplied)", val: "truck" },
    { label: "Users (Satisfaction / Clients)", val: "users" },
    { label: "Shield (Quality & Trust)", val: "shield" },
    { label: "Award (Milestones)", val: "award" },
    { label: "Clock (Years / Speed)", val: "clock" },
  ];

  return (
    <>
      <div className="admin-head">
        <div>
          <p className="admin-kicker">Site Configuration</p>
          <h1 className="admin-title">Company Settings &amp; Statistics</h1>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "32px", maxWidth: "920px" }}>
        {/* 1. GENERAL COMPANY DETAILS */}
        <form action={saveSettings} className="admin-panel admin-form">
          <h2 style={{ display: "flex", alignItems: "center", gap: "8px", margin: "0 0 20px" }}>
            <Building size={20} style={{ color: "var(--crimson)" }} /> General Company Details
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: "14px" }}>
            <div>
              <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, marginBottom: "4px" }}>
                Company Name *
              </label>
              <input name="companyName" defaultValue={s.companyName} required />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, marginBottom: "4px" }}>
                Motto / Tagline
              </label>
              <input name="tagline" defaultValue={s.tagline} required />
            </div>
          </div>

          <h2 style={{ display: "flex", alignItems: "center", gap: "8px", margin: "24px 0 16px" }}>
            <Phone size={20} style={{ color: "var(--navy)" }} /> Contact Numbers &amp; Location
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: "14px" }}>
            <div>
              <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, marginBottom: "4px" }}>
                Primary Phone (WhatsApp) *
              </label>
              <input name="phone1" defaultValue={s.phone1} required />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, marginBottom: "4px" }}>
                Secondary Phone
              </label>
              <input name="phone2" defaultValue={s.phone2} />
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: "14px" }}>
            <div>
              <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, marginBottom: "4px" }}>
                Official Email Address *
              </label>
              <input name="email" type="email" defaultValue={s.email} required />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, marginBottom: "4px" }}>
                Head Office Address *
              </label>
              <input name="address" defaultValue={s.address} required />
            </div>
          </div>

          <h2 style={{ display: "flex", alignItems: "center", gap: "8px", margin: "24px 0 16px" }}>
            <Globe size={20} style={{ color: "var(--orange)" }} /> Homepage Hero Banner
          </h2>

          <div style={{ marginBottom: "14px" }}>
            <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, marginBottom: "4px" }}>
              Hero Headline (Nepali Devnagari)
            </label>
            <input name="heroTitleNp" defaultValue={s.heroTitleNp} />
          </div>

          <div style={{ marginBottom: "14px" }}>
            <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, marginBottom: "4px" }}>
              Hero Headline (English)
            </label>
            <input name="heroTitleEn" defaultValue={s.heroTitleEn} />
          </div>

          <div style={{ marginBottom: "24px" }}>
            <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, marginBottom: "4px" }}>
              Hero Subtext / Introduction
            </label>
            <textarea name="heroText" rows={4} defaultValue={s.heroText} />
          </div>

          <button type="submit" className="btn btn-orange" style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
            <Save size={16} /> Save Company Settings
          </button>
        </form>

        {/* 2. COMPANY STATISTICS & COUNTERS (YEARS, PROJECTS, MATERIALS, SATISFACTION) */}
        <div className="admin-panel admin-form">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
            <h2 style={{ display: "flex", alignItems: "center", gap: "8px", margin: 0 }}>
              <Trophy size={20} style={{ color: "var(--crimson)" }} /> Company Key Statistics &amp; Counters
            </h2>
            <span style={{ fontSize: "12.5px", color: "var(--text-muted)", fontWeight: 600 }}>
              Live on Homepage Intro Section
            </span>
          </div>

          {/* EXISTING STATS EDIT LIST */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "28px" }}>
            {stats.map((st) => (
              <form
                key={st.id}
                action={updateStat}
                style={{
                  background: "#f8fafc",
                  border: "1px solid #e2eaf0",
                  borderRadius: "12px",
                  padding: "16px 20px",
                  display: "grid",
                  gridTemplateColumns: "1.2fr 1fr 1fr 0.6fr auto auto",
                  gap: "12px",
                  alignItems: "center",
                }}
              >
                <input type="hidden" name="id" value={st.id} />

                <div>
                  <label style={{ display: "block", fontSize: "11px", fontWeight: 700, color: "#64748b", marginBottom: "3px" }}>
                    Metric Label
                  </label>
                  <input
                    name="label"
                    defaultValue={st.label}
                    placeholder="e.g. Projects Completed"
                    required
                    style={{ padding: "8px 10px", fontSize: "13px" }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "11px", fontWeight: 700, color: "#64748b", marginBottom: "3px" }}>
                    Value / Number
                  </label>
                  <input
                    name="value"
                    defaultValue={st.value}
                    placeholder="e.g. 250+"
                    required
                    style={{ padding: "8px 10px", fontSize: "13px", fontWeight: 800, color: "var(--navy-dark)" }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "11px", fontWeight: 700, color: "#64748b", marginBottom: "3px" }}>
                    Icon
                  </label>
                  <select name="icon" defaultValue={st.icon || "trophy"} style={{ padding: "8px 10px", fontSize: "13px" }}>
                    {iconOptions.map((opt) => (
                      <option key={opt.val} value={opt.val}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "11px", fontWeight: 700, color: "#64748b", marginBottom: "3px" }}>
                    Order
                  </label>
                  <input
                    name="sortOrder"
                    type="number"
                    defaultValue={st.sortOrder}
                    style={{ padding: "8px 10px", fontSize: "13px" }}
                  />
                </div>

                <div style={{ paddingTop: "14px" }}>
                  <button
                    type="submit"
                    className="btn btn-blue btn-sm"
                    style={{ padding: "8px 14px", fontSize: "12.5px", whiteSpace: "nowrap" }}
                  >
                    <Save size={13} /> Update
                  </button>
                </div>
              </form>
            ))}
          </div>

          {/* ADD NEW STATISTIC COUNTER */}
          <div style={{ background: "#ffffff", border: "1.5px dashed #cbd5e1", borderRadius: "14px", padding: "20px" }}>
            <h3 style={{ fontSize: "15px", fontWeight: 800, color: "var(--navy-dark)", margin: "0 0 14px", display: "flex", alignItems: "center", gap: "6px" }}>
              <Plus size={16} style={{ color: "var(--crimson)" }} /> Add New Counter Metric
            </h3>

            <form action={createStat} style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr 1fr 0.6fr auto", gap: "12px", alignItems: "flex-end" }}>
              <div>
                <label style={{ display: "block", fontSize: "11px", fontWeight: 700, color: "#64748b", marginBottom: "3px" }}>
                  Label *
                </label>
                <input name="label" placeholder="e.g. Cities Covered" required style={{ padding: "8px 10px", fontSize: "13px" }} />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "11px", fontWeight: 700, color: "#64748b", marginBottom: "3px" }}>
                  Value *
                </label>
                <input name="value" placeholder="e.g. 15+" required style={{ padding: "8px 10px", fontSize: "13px" }} />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "11px", fontWeight: 700, color: "#64748b", marginBottom: "3px" }}>
                  Icon
                </label>
                <select name="icon" defaultValue="building" style={{ padding: "8px 10px", fontSize: "13px" }}>
                  {iconOptions.map((opt) => (
                    <option key={opt.val} value={opt.val}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "11px", fontWeight: 700, color: "#64748b", marginBottom: "3px" }}>
                  Order
                </label>
                <input name="sortOrder" type="number" defaultValue={stats.length + 1} style={{ padding: "8px 10px", fontSize: "13px" }} />
              </div>

              <button
                type="submit"
                className="btn btn-orange btn-sm"
                style={{ padding: "8px 16px", fontSize: "12.5px", whiteSpace: "nowrap" }}
              >
                <Plus size={14} /> Add Metric
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
