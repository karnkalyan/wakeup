import { prisma } from "@/lib/prisma";
import { fallbackMaterials, fallbackProjects, fallbackServices, fallbackStats } from "@/lib/content";

export async function getHomeData() {
  if (!process.env.DATABASE_URL) return { services: fallbackServices, materials: fallbackMaterials, projects: fallbackProjects, stats: fallbackStats };
  try {
    const [services, materials, projects, stats] = await Promise.all([
      prisma.service.findMany({ where: { active: true }, orderBy: { sortOrder: "asc" }, take: 8 }),
      prisma.material.findMany({ where: { active: true }, orderBy: { sortOrder: "asc" }, take: 12 }),
      prisma.project.findMany({ where: { active: true, featured: true }, orderBy: { createdAt: "desc" }, take: 3 }),
      prisma.stat.findMany({ where: { active: true }, orderBy: { sortOrder: "asc" }, take: 4 })
    ]);
    return { services, materials, projects, stats };
  } catch {
    return { services: fallbackServices, materials: fallbackMaterials, projects: fallbackProjects, stats: fallbackStats };
  }
}
