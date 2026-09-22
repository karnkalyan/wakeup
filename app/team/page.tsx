import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { prisma } from "@/lib/prisma";
import { ShieldCheck, HardHat, Award, Phone, Mail, ArrowRight, CheckCircle2 } from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Our Engineering Team | WakeUp Nepal Builders Pvt. Ltd.",
  description: "Meet the experienced civil engineers, architects, MEP specialists, and project supervisors leading WakeUp Nepal Builders in Kathmandu, Nepal.",
};

export default async function TeamPage() {
  const members = await (prisma as any).teamMember.findMany({
    where: { active: true },
    orderBy: { sortOrder: "asc" },
  });

  const ceo = members.find((m: any) => m.name.includes("Krishna")) || members[0];
  const rest = members.filter((m: any) => m.id !== ceo?.id);

  return (
    <>
      <Header />
      <main>
        {/* HERO SECTION */}
        <section className="page-hero">
          <div className="container">
            <span className="kicker font-nepali">
              <span className="nepali-bold-highlight">हाम्रो टोली</span> • Leadership &amp; Engineering Team
            </span>
            <h1>The Engineering Minds Behind Every Milestone</h1>
            <p style={{ maxWidth: "780px" }}>
              At WakeUp Nepal Builders Pvt. Ltd., our projects are driven by certified civil engineers, creative architects,
              and dedicated site supervisors. We believe that true quality comes from disciplined coordination and technical precision.
            </p>
          </div>
        </section>

        {/* CEO SPOTLIGHT */}
        {ceo && (
          <section className="section" style={{ paddingBottom: "40px" }}>
            <div className="container">
              <div
                style={{
                  background: "linear-gradient(135deg, #0e2a47 0%, #071936 100%)",
                  borderRadius: "24px",
                  padding: "48px 52px",
                  color: "#ffffff",
                  display: "grid",
                  gridTemplateColumns: "auto 1fr",
                  gap: "48px",
                  alignItems: "center",
                  boxShadow: "0 16px 36px rgba(7, 25, 54, 0.18)",
                }}
                className="team-ceo-card"
              >
                <div style={{ position: "relative", width: "220px", height: "260px", flexShrink: 0, borderRadius: "18px", overflow: "hidden", border: "4px solid rgba(220,20,60,0.6)", boxShadow: "0 10px 25px rgba(0,0,0,0.3)" }}>
                  <Image
                    src={ceo.image || "/assets/ceo.jpeg"}
                    alt={ceo.name}
                    fill
                    style={{ objectFit: "cover", objectPosition: "top center" }}
                  />
                </div>

                <div>
                  <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(220, 20, 60, 0.2)", border: "1px solid var(--crimson)", padding: "4px 14px", borderRadius: "999px", fontSize: "12.5px", fontWeight: 700, color: "#ff859b", marginBottom: "12px" }}>
                    <Award size={14} /> Executive Leadership
                  </div>
                  <h2 style={{ color: "#ffffff", fontSize: "32px", margin: "0 0 6px", fontWeight: 800 }}>
                    {ceo.name}
                  </h2>
                  <div style={{ fontSize: "16px", color: "var(--orange)", fontWeight: 700, marginBottom: "16px" }}>
                    {ceo.role}
                  </div>
                  <p style={{ color: "#d8ebfa", fontSize: "15.5px", lineHeight: 1.7, marginBottom: "22px", maxWidth: "680px" }}>
                    {ceo.bio || "Leading WakeUp Nepal Builders with a mission to deliver transparent, engineering-driven construction and reliable materials supply across Nepal."}
                  </p>
                  <div style={{ display: "flex", gap: "14px", flexWrap: "wrap", alignItems: "center" }}>
                    <Link href="/about#ceo-message" className="btn btn-orange btn-sm">
                      Read Full CEO Message →
                    </Link>
                    {ceo.phone && (
                      <a href={`tel:${ceo.phone}`} className="btn btn-outline-white btn-sm">
                        <Phone size={14} /> Call: {ceo.phone}
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* CORE TEAM MEMBERS GRID */}
        <section className="section soft">
          <div className="container">
            <div className="section-head">
              <div>
                <span className="kicker font-nepali">
                  <span className="nepali-bold-highlight">प्राविधिक विशेषज्ञहरू</span> • Core Technical Team
                </span>
                <h2>Experienced Engineers &amp; Designers</h2>
                <p>Ensuring structural safety, timely milestones, and exact BOQ accuracy on every project site.</p>
              </div>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                gap: "28px",
              }}
            >
              {rest.map((member: any) => (
                <div
                  key={member.id}
                  style={{
                    background: "#ffffff",
                    borderRadius: "18px",
                    overflow: "hidden",
                    border: "1px solid var(--line)",
                    boxShadow: "var(--shadow-sm)",
                    display: "flex",
                    flexDirection: "column",
                    transition: "transform 0.25s ease, box-shadow 0.25s ease",
                  }}
                >
                  <div style={{ position: "relative", width: "100%", height: "280px", background: "#edf4fa" }}>
                    <Image
                      src={member.image || "/assets/assets (17).png"}
                      alt={member.name}
                      fill
                      style={{ objectFit: "cover" }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: "80px",
                        background: "linear-gradient(to top, rgba(7,25,54,0.7), transparent)",
                      }}
                    />
                  </div>

                  <div style={{ padding: "24px", display: "flex", flexDirection: "column", flex: 1 }}>
                    <h3 style={{ fontSize: "20px", color: "var(--navy-dark)", margin: "0 0 4px", fontWeight: 800 }}>
                      {member.name}
                    </h3>
                    <div style={{ fontSize: "13.5px", color: "var(--crimson)", fontWeight: 700, marginBottom: "12px" }}>
                      {member.role}
                    </div>
                    {member.bio && (
                      <p style={{ fontSize: "14px", color: "var(--text-muted)", lineHeight: 1.6, marginBottom: "18px", flex: 1 }}>
                        {member.bio}
                      </p>
                    )}

                    <div style={{ borderTop: "1px solid var(--line)", paddingTop: "14px", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "13px" }}>
                      {member.phone ? (
                        <a href={`tel:${member.phone}`} style={{ display: "inline-flex", alignItems: "center", gap: "6px", color: "var(--navy)", fontWeight: 700 }}>
                          <Phone size={14} style={{ color: "var(--orange)" }} /> {member.phone}
                        </a>
                      ) : <span />}
                      {member.email && (
                        <a href={`mailto:${member.email}`} style={{ display: "inline-flex", alignItems: "center", gap: "6px", color: "var(--text-muted)" }}>
                          <Mail size={14} /> Email
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* WORK ETHICS & COMMITMENT STRIP */}
        <section className="section">
          <div className="container">
            <div
              style={{
                background: "var(--sky)",
                border: "1px solid #d0e3f2",
                borderRadius: "20px",
                padding: "40px",
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                gap: "28px",
              }}
            >
              <div style={{ display: "flex", gap: "14px" }}>
                <div style={{ width: "48px", height: "48px", borderRadius: "12px", background: "var(--navy)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <HardHat size={24} />
                </div>
                <div>
                  <h4 style={{ margin: "0 0 6px", color: "var(--navy-dark)", fontSize: "17px" }}>Daily Site Supervision</h4>
                  <p style={{ margin: 0, fontSize: "13.5px", color: "var(--text-muted)", lineHeight: 1.5 }}>
                    Our site engineers verify rebar placement, concrete mix ratios, and curing on-site every single day.
                  </p>
                </div>
              </div>

              <div style={{ display: "flex", gap: "14px" }}>
                <div style={{ width: "48px", height: "48px", borderRadius: "12px", background: "var(--crimson)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <ShieldCheck size={24} />
                </div>
                <div>
                  <h4 style={{ margin: "0 0 6px", color: "var(--navy-dark)", fontSize: "17px" }}>Certified Material Checks</h4>
                  <p style={{ margin: 0, fontSize: "13.5px", color: "var(--text-muted)", lineHeight: 1.5 }}>
                    Every batch of cement, TMT steel, sand, and aggregate is tested to meet Nepal National Building Code (NBC).
                  </p>
                </div>
              </div>

              <div style={{ display: "flex", gap: "14px" }}>
                <div style={{ width: "48px", height: "48px", borderRadius: "12px", background: "var(--orange)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <CheckCircle2 size={24} />
                </div>
                <div>
                  <h4 style={{ margin: "0 0 6px", color: "var(--navy-dark)", fontSize: "17px" }}>Transparent Costing</h4>
                  <p style={{ margin: 0, fontSize: "13.5px", color: "var(--text-muted)", lineHeight: 1.5 }}>
                    Clear BOQ itemization with no hidden escalation, so you know exactly what your building costs.
                  </p>
                </div>
              </div>
            </div>

            {/* CALL TO ACTION */}
            <div style={{ textAlign: "center", marginTop: "48px" }}>
              <h3 style={{ fontSize: "24px", color: "var(--navy-dark)", margin: "0 0 12px" }}>
                Ready to discuss your building project with our engineers?
              </h3>
              <p style={{ color: "var(--text-muted)", maxWidth: "560px", margin: "0 auto 24px" }}>
                Book a free site inspection or consultation at our New Baneshwor office today.
              </p>
              <Link href="/contact" className="btn btn-orange">
                Schedule a Free Site Visit <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
