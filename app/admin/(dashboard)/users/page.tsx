import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { UserCheck, UserPlus, Trash2, Shield, AlertCircle } from "lucide-react";
import { Pagination } from "@/components/admin/Pagination";

export const dynamic = "force-dynamic";

const PAGE_SIZE = 6;

async function createUser(formData: FormData) {
  "use server";
  const session = await requireAdmin();
  if (session.role !== "ADMIN") return;
  const name = String(formData.get("name") || "").trim();
  const email = String(formData.get("email") || "").toLowerCase().trim();
  const password = String(formData.get("password") || "").trim();
  const role = String(formData.get("role") || "EDITOR") as "ADMIN" | "EDITOR";

  if (!name || !email || !password) return;

  const passwordHash = await bcrypt.hash(password, 12);
  await prisma.user.create({
    data: {
      name,
      email,
      passwordHash,
      role,
      active: true,
    },
  });
  revalidatePath("/admin/users");
}

async function deleteUser(formData: FormData) {
  "use server";
  const session = await requireAdmin();
  if (session.role !== "ADMIN") return;
  const id = Number(formData.get("id"));
  if (id === Number(session.userId)) return;
  await prisma.user.delete({ where: { id } });
  revalidatePath("/admin/users");
}

export default async function UsersAdmin({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const session = await requireAdmin();
  const { page } = await searchParams;
  const currentPage = Math.max(1, Number(page) || 1);

  const [totalCount, rows] = await Promise.all([
    prisma.user.count(),
    prisma.user.findMany({
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
          <p className="admin-kicker">Access Control</p>
          <h1 className="admin-title">Admin &amp; Editor Users ({totalCount})</h1>
        </div>
      </div>

      <div className="admin-dashboard-grid" style={{ gridTemplateColumns: "1fr 1.35fr" }}>
        {/* ADD USER FORM */}
        <div className="admin-panel admin-form">
          <h2 style={{ display: "flex", alignItems: "center", gap: "8px", margin: "0 0 16px" }}>
            <UserPlus size={20} style={{ color: "var(--crimson)" }} /> Add Admin User
          </h2>

          {session.role !== "ADMIN" && (
            <div className="alert" style={{ background: "#fef2f2", border: "1px solid #fee2e2", color: "#991b1b", padding: "10px", borderRadius: "8px", marginBottom: "14px", fontSize: "13px", display: "flex", gap: "8px", alignItems: "center" }}>
              <AlertCircle size={16} /> Only administrators can add new users.
            </div>
          )}

          <form action={createUser}>
            <div style={{ marginBottom: "12px" }}>
              <label style={{ display: "block", fontSize: "12px", fontWeight: 700, marginBottom: "4px" }}>
                Full Name *
              </label>
              <input name="name" placeholder="e.g. Ramesh Karki" required disabled={session.role !== "ADMIN"} />
            </div>

            <div style={{ marginBottom: "12px" }}>
              <label style={{ display: "block", fontSize: "12px", fontWeight: 700, marginBottom: "4px" }}>
                Email Address *
              </label>
              <input name="email" type="email" placeholder="user@wakeupnepalbuilders.com" required disabled={session.role !== "ADMIN"} />
            </div>

            <div style={{ marginBottom: "12px" }}>
              <label style={{ display: "block", fontSize: "12px", fontWeight: 700, marginBottom: "4px" }}>
                Password *
              </label>
              <input name="password" type="password" placeholder="••••••••••••" required disabled={session.role !== "ADMIN"} />
            </div>

            <div style={{ marginBottom: "18px" }}>
              <label style={{ display: "block", fontSize: "12px", fontWeight: 700, marginBottom: "4px" }}>
                System Role *
              </label>
              <select name="role" defaultValue="EDITOR" disabled={session.role !== "ADMIN"}>
                <option value="EDITOR">Editor (Can edit services, materials, projects)</option>
                <option value="ADMIN">Administrator (Full Access &amp; User Management)</option>
              </select>
            </div>

            <button
              type="submit"
              className="btn btn-orange"
              disabled={session.role !== "ADMIN"}
              style={{ width: "100%" }}
            >
              Create User Account
            </button>
          </form>
        </div>

        {/* USER LIST */}
        <div className="admin-panel">
          <h2 style={{ display: "flex", alignItems: "center", gap: "8px", margin: "0 0 16px" }}>
            <UserCheck size={20} style={{ color: "var(--navy)" }} /> Registered Accounts ({totalCount})
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {rows.length === 0 ? (
              <p style={{ color: "var(--text-muted)", fontSize: "14px" }}>No users found on this page.</p>
            ) : (
              rows.map((r) => {
                const isCurrent = r.id === Number(session.userId);
                return (
                  <div
                    key={r.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "16px 18px",
                      background: "#ffffff",
                      border: "1px solid #e2eaf0",
                      borderRadius: "12px",
                    }}
                  >
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <strong style={{ fontSize: "15px", color: "var(--navy-dark)" }}>{r.name}</strong>
                        {isCurrent && (
                          <span style={{ fontSize: "10px", background: "#e0f2fe", color: "#0369a1", padding: "2px 8px", borderRadius: "999px", fontWeight: 800 }}>
                            YOU
                          </span>
                        )}
                      </div>
                      <span style={{ fontSize: "12.5px", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: "6px", marginTop: "2px" }}>
                        <Shield size={12} style={{ color: "var(--crimson)" }} /> {r.email} • <strong>{r.role}</strong>
                      </span>
                    </div>

                    <form action={deleteUser}>
                      <input type="hidden" name="id" value={r.id} />
                      <button
                        type="submit"
                        disabled={isCurrent || session.role !== "ADMIN"}
                        style={{
                          padding: "6px 12px",
                          background: isCurrent ? "#f1f5f9" : "#fff1f2",
                          border: "1px solid " + (isCurrent ? "#e2e8f0" : "#fecdd3"),
                          color: isCurrent ? "#94a3b8" : "#e11d48",
                          borderRadius: "8px",
                          fontSize: "12px",
                          fontWeight: 700,
                          cursor: isCurrent ? "not-allowed" : "pointer",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "4px",
                        }}
                      >
                        <Trash2 size={13} /> Delete
                      </button>
                    </form>
                  </div>
                );
              })
            )}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={totalCount}
            pageSize={PAGE_SIZE}
            baseUrl="/admin/users"
          />
        </div>
      </div>
    </>
  );
}
