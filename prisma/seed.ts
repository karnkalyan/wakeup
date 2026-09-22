import { PrismaClient, UserRole } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash("Admin@12345", 12);

  // Admin User
  await prisma.user.upsert({
    where: { email: "admin@wakeupnepalbuilders.com" },
    update: { passwordHash, name: "WakeUp Admin", role: UserRole.ADMIN, active: true },
    create: {
      name: "WakeUp Admin",
      email: "admin@wakeupnepalbuilders.com",
      passwordHash,
      role: UserRole.ADMIN,
      active: true,
    },
  });

  // Company Setting
  await prisma.companySetting.upsert({
    where: { id: 1 },
    update: {
      phone1: "9864033256",
      phone2: "9851188296",
      email: "wakeupnepalbuilders@gmail.com",
      address: "New Baneshwor, Kathmandu, Nepal",
      heroTitleNp: "विश्वासका साथ निर्माण गर्नुहोस्",
      heroTitleEn: "Build with Confidence",
      heroText: "Your trusted partner for complete building construction services and supply of all kinds of certified construction materials in Nepal.",
    },
    create: {
      id: 1,
      companyName: "WakeUp Nepal Builders Pvt. Ltd.",
      tagline: "Building Trust, Building Homes.",
      phone1: "9864033256",
      phone2: "9851188296",
      email: "wakeupnepalbuilders@gmail.com",
      address: "New Baneshwor, Kathmandu, Nepal",
      heroTitleNp: "विश्वासका साथ निर्माण गर्नुहोस्",
      heroTitleEn: "Build with Confidence",
      heroText: "Your trusted partner for complete building construction services and supply of all kinds of certified construction materials in Nepal.",
    },
  });

  // Statistics
  await prisma.stat.deleteMany();
  await prisma.stat.createMany({
    data: [
      { label: "Years of Experience", value: "8+", icon: "trophy", sortOrder: 1 },
      { label: "Projects Completed", value: "250+", icon: "building", sortOrder: 2 },
      { label: "Tons of Materials Supplied", value: "1000+", icon: "truck", sortOrder: 3 },
      { label: "Client Satisfaction", value: "98%", icon: "users", sortOrder: 4 },
    ],
  });

  // Services - Distinct local images for all
  await prisma.service.deleteMany();
  await prisma.service.createMany({
    data: [
      {
        title: "House Construction",
        slug: "house-construction",
        excerpt: "Residential buildings, dream homes and villas",
        image: "/assets/assets (19).png",
        sortOrder: 1,
      },
      {
        title: "Commercial Construction",
        slug: "commercial-construction",
        excerpt: "Offices, showrooms, complexes and more",
        image: "/assets/assets (20).png",
        sortOrder: 2,
      },
      {
        title: "Renovation & Remodeling",
        slug: "renovation-remodeling",
        excerpt: "Give new life to your existing space",
        image: "/assets/assets (23).png",
        sortOrder: 3,
      },
      {
        title: "Interior & Exterior",
        slug: "interior-exterior",
        excerpt: "Modern, practical and functional designs",
        image: "/assets/assets (12).png",
        sortOrder: 4,
      },
      {
        title: "RCC & Structural Works",
        slug: "rcc-structural",
        excerpt: "Strong foundations for a safer tomorrow",
        image: "/assets/assets (25).png",
        sortOrder: 5,
      },
      {
        title: "Electrical & Plumbing",
        slug: "electrical-plumbing",
        excerpt: "Safe, efficient and reliable MEP systems",
        image: "/assets/assets (26).png",
        sortOrder: 6,
      },
      {
        title: "Waterproofing Solutions",
        slug: "waterproofing",
        excerpt: "Long-lasting protection from water damage",
        image: "/assets/assets (2).png",
        sortOrder: 7,
      },
      {
        title: "Project Supervision",
        slug: "project-supervision",
        excerpt: "Professional monitoring for quality results",
        image: "/assets/assets (17).png",
        sortOrder: 8,
      },
    ],
  });

  // Materials - Every material has its own UNIQUE distinct image
  await prisma.material.deleteMany();
  const materialList = [
    { title: "Cement (OPC, PPC)", image: "/assets/assets (15).png", desc: "High-grade OPC 43/53 and PPC cement bags for structural and masonry durability." },
    { title: "TMT Bars / Steel Rods", image: "/assets/assets (13).png", desc: "Fe 500D earthquake-resistant thermo-mechanically treated steel reinforcement rods." },
    { title: "Sand & Aggregate", image: "/assets/assets (1).png", desc: "Washed river sand, 10mm/20mm crushed aggregates for high-strength concrete mixes." },
    { title: "Bricks & Blocks", image: "/assets/assets (3).png", desc: "First-class kiln-baked Nepali bricks, AAC lightweight blocks, and solid concrete blocks." },
    { title: "Tiles & Marble", image: "/assets/assets (5).png", desc: "Vitrified floor tiles, glazed wall tiles, natural granite slabs, and Italian marble." },
    { title: "Plumbing Items", image: "/assets/assets (8).png", desc: "CPVC/PVC water supply pipes, drainage fittings, valves, water tanks, and fittings." },
    { title: "Electrical Materials", image: "/assets/assets (6).png", desc: "FR fire-retardant copper wires, modular switch plates, MCBs, conduit pipes & fixtures." },
    { title: "Sanitary Products", image: "/assets/assets (9).png", desc: "Modern commodes, designer wash basins, chrome faucets, shower mixers, and bath accessories." },
    { title: "Paints & Finishes", image: "/assets/assets (4).png", desc: "Exterior weather-coat emulsions, luxury interior acrylic paints, primers, and wall putty." },
    { title: "Hardware & Tools", image: "/assets/assets (11).png", desc: "Door fittings, locks, fasteners, safety gear, and precision construction power tools." },
    { title: "Roofing Solutions", image: "/assets/assets (16).png", desc: "Color-coated CGI profile sheets, UPVC roofing tiles, truss materials, and gutters." },
    { title: "Waterproofing Materials", image: "/assets/assets (10).png", desc: "Advanced polymer waterproofing chemicals, crystalline admixtures, and bitumen sheets." },
  ];

  await prisma.material.createMany({
    data: materialList.map((m, idx) => ({
      title: m.title,
      slug: m.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
      description: m.desc,
      image: m.image,
      sortOrder: idx + 1,
      active: true,
    })),
  });

  // Featured Projects with distinct local images
  await prisma.project.deleteMany();
  await prisma.project.createMany({
    data: [
      {
        title: "Modern Family Home",
        slug: "modern-family-home",
        category: "Residential",
        location: "Lalitpur, Nepal",
        excerpt: "A modern family residence with practical planning and premium finishing.",
        coverImage: "/assets/assets (21).png",
        featured: true,
        active: true,
      },
      {
        title: "Office Complex",
        slug: "office-complex",
        category: "Commercial",
        location: "New Baneshwor, Kathmandu",
        excerpt: "Commercial workspace designed for functionality, access and professional appearance.",
        coverImage: "/assets/assets (22).png",
        featured: true,
        active: true,
      },
      {
        title: "House Renovation",
        slug: "house-renovation",
        category: "Renovation",
        location: "Bhaktapur, Nepal",
        excerpt: "A complete upgrade of an existing home with modern interior and exterior finishing.",
        coverImage: "/assets/assets (24).png",
        featured: true,
        active: true,
      },
    ],
  });

  // Team Members
  const db = prisma as any;
  await db.teamMember.deleteMany();
  await db.teamMember.createMany({
    data: [
      {
        name: "Er. Krishna Kumar Shah",
        role: "Founder & CEO / Chief Structural Engineer",
        bio: "Leading WakeUp Nepal Builders with a mission to deliver transparent, engineering-driven construction and reliable materials supply across Nepal.",
        image: "/assets/ceo.jpeg",
        phone: "9864033256",
        email: "wakeupnepalbuilders@gmail.com",
        sortOrder: 1,
        active: true,
      },
      {
        name: "Er. Rajesh Adhikari",
        role: "Senior Site & Construction Engineer",
        bio: "Over 8 years of rigorous on-site experience overseeing RCC structural casting, quality control, worker safety, and architectural execution.",
        image: "/assets/assets (17).png",
        phone: "9851188296",
        email: "rajesh@wakeupnepalbuilders.com",
        sortOrder: 2,
        active: true,
      },
      {
        name: "Ar. Pooja Shrestha",
        role: "Chief Architectural & Interior Designer",
        bio: "Specializing in contemporary residential planning, 3D photorealistic renderings, spatial ergonomics, and modern interior aesthetics.",
        image: "/assets/assets (14).png",
        phone: "9864033256",
        email: "pooja@wakeupnepalbuilders.com",
        sortOrder: 3,
        active: true,
      },
      {
        name: "Er. Bikash Thapa",
        role: "Lead MEP & Quantity Estimation Engineer",
        bio: "Expert in plumbing, electrical schematics, precise BOQ calculations, and cost optimization for residential and commercial ventures.",
        image: "/assets/assets (7).png",
        phone: "9851188296",
        email: "bikash@wakeupnepalbuilders.com",
        sortOrder: 4,
        active: true,
      },
    ],
  });

  // Initial customer inquiries for admin review
  await db.inquiry.deleteMany();
  await db.inquiry.createMany({
    data: [
      {
        name: "Demo Client",
        phone: "9800000000",
        email: "demo@example.com",
        location: "Kathmandu",
        projectType: "Residential House Construction",
        area: "2.5 Floors / 4 Aana",
        message: "I would like a free site visit and cost estimate for building a 2.5-storey residential home in Kathmandu.",
        status: "NEW",
      },
      {
        name: "Sample Business",
        phone: "9811111111",
        email: "office@example.com",
        location: "Lalitpur",
        projectType: "Construction Materials Supply",
        area: "Commercial Site",
        message: "Please quote OPC cement (500 bags), TMT bars (10 tons), sand and aggregate delivery for our site.",
        status: "NEW",
      },
      {
        name: "Rajesh K.",
        phone: "9840000000",
        email: "rajesh.k@example.com",
        location: "Bhaktapur",
        projectType: "Renovation & Remodeling",
        area: "2-Storey Old House",
        message: "Need complete structural retrofit and modern interior finishing for an existing home.",
        status: "CONTACTED",
      },
    ],
  });

  console.log("Database seeded successfully with distinct images, team members, and initial inquiries!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
