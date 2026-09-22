import { NextResponse } from "next/server";
import { sessionCookie } from "@/lib/auth";

export async function POST(req: Request) {
  const res = NextResponse.redirect(new URL("/admin/login", req.url), 303);
  res.cookies.set(sessionCookie, "", {
    path: "/",
    maxAge: 0,
    expires: new Date(0),
  });
  return res;
}

export async function GET(req: Request) {
  const res = NextResponse.redirect(new URL("/admin/login", req.url), 303);
  res.cookies.set(sessionCookie, "", {
    path: "/",
    maxAge: 0,
    expires: new Date(0),
  });
  return res;
}
