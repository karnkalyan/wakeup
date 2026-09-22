import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";
import { redirect } from "next/navigation";

const COOKIE = "wun_session";
const secret = () => new TextEncoder().encode(process.env.AUTH_SECRET || "dev-only-change-me");

export async function createSession(payload: { userId: number; role: string; email: string }) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("8h")
    .sign(secret());
}

export async function readSession() {
  const store = await cookies();
  const token = store.get(COOKIE)?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secret());
    return payload as { userId: number; role: string; email: string };
  } catch {
    return null;
  }
}

export async function requireAdmin() {
  const session = await readSession();
  if (!session) redirect("/admin/login");
  return session;
}

export const sessionCookie = COOKIE;
