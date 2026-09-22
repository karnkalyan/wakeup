import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().min(7, "Please enter a valid phone number"),
  email: z.string().email().optional().or(z.literal("")),
  location: z.string().optional(),
  projectType: z.string().optional(),
  area: z.string().optional(),
  message: z.string().min(3, "Please provide some project details"),
});

export async function POST(req: Request) {
  try {
    const raw = await req.json();
    const data = schema.parse(raw);

    if (!process.env.DATABASE_URL) {
      return NextResponse.json({ ok: true, demo: true });
    }

    const created = await (prisma as any).inquiry.create({
      data: {
        name: data.name,
        phone: data.phone,
        email: data.email || null,
        location: data.location || null,
        projectType: data.projectType || null,
        area: data.area || null,
        message: data.area ? `[Area/Floors: ${data.area}]\n${data.message}` : data.message,
        status: "NEW",
      },
    });

    return NextResponse.json({ ok: true, id: created.id });
  } catch (e: any) {
    console.error("Contact form error:", e);
    return NextResponse.json(
      { ok: false, error: e?.message || "Invalid request" },
      { status: 400 }
    );
  }
}
