import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { createSession, sessionCookie } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const form = await req.formData();
    const email = String(form.get("email") || "").toLowerCase().trim();
    const password = String(form.get("password") || "").trim();

    if (!email || !password) {
      return NextResponse.redirect(new URL("/admin/login?error=1", req.url), 303);
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !user.active) {
      return NextResponse.redirect(new URL("/admin/login?error=1", req.url), 303);
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return NextResponse.redirect(new URL("/admin/login?error=1", req.url), 303);
    }

    const token = await createSession({
      userId: user.id,
      role: user.role,
      email: user.email,
    });

    const res = NextResponse.redirect(new URL("/admin", req.url), 303);
    res.cookies.set(sessionCookie, token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 8, // 8 hours
    });

    return res;
  } catch (error) {
    console.error("Login exception:", error);
    return NextResponse.redirect(new URL("/admin/login?error=1", req.url), 303);
  }
}
