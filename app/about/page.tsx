import Image from "next/image";
import Link from "next/link";
import { Check, Phone, ArrowRight, Users } from "lucide-react";
import { DynamicIcon } from "@/components/site/Icon";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { CeoMessage } from "@/components/site/CeoMessage";
import { companyValues, engagementModels } from "@/lib/content";

export const metadata = {
  title: "About Us | WakeUp Nepal Builders Pvt. Ltd.",
  description: "Learn about WakeUp Nepal Builders Pvt. Ltd., our mission, vision, core values, leadership, message from CEO Er. Krishna Kumar Shah, and integrated construction solutions in New Baneshwor, Kathmandu."
};

export default function AboutPage() {
  const steps = [
    { num: "01", title: "Planning & Design", desc: "Architectural layouts, 3D modeling, structural engineering & authority approvals." },
    { num: "02", title: "Cost Estimation (BOQ)", desc: "Detailed bill of quantities, material grade selection & transparent pricing." },
    { num: "03", title: "Material Supply", desc: "Direct procurement of certified cement, TMT steel, aggregates, bricks & fixtures." },
    { num: "04", title: "RCC & Civil Construction", desc: "Seismic-resistant footing, columns, beams, slabs & masonry work." },
    { num: "05", title: "MEP Works", desc: "Concealed electrical wiring, distribution boxes, piping & sanitary fittings." },
    { num: "06", title: "Finishing & Waterproofing", desc: "Terrace membranes, bathroom sealing, plaster, putty & weather-proof paints." },
    { num: "07", title: "Interior Fit-Out", desc: "False ceilings, custom woodwork, modular kitchens & architectural lighting." },
    { num: "08", title: "Inspection & Handover", desc: "Final quality snagging, close-out review and key handover to our client." }
  ];

  const projectTypes = [
    "Individual & Modern Family Homes",
    "Commercial Buildings & Complexes",
    "Corporate Offices & Showrooms",
    "Hotels, Cafes & Restaurants",
    "Educational & Institutional Buildings",
    "Structural Renovation & Remodeling",
    "Interior Modernization & Fit-Out",
    "Civil & Structural Sub-Contracting"
  ];

  const siteGallery = [
    { src: "/assets/assets (1).png", title: "Excavation & Footing", desc: "Heavy earthworks, foundation trenching & rebar cage assembly" },
    { src: "/assets/assets (2).png", title: "Concrete Slab Casting", desc: "Machine pump pouring, vibration compaction & curing oversight" },
    { src: "/assets/assets (3).png", title: "Precision Masonry", desc: "High-compressive red brick laying and structural alignment" },
    { src: "/assets/assets (4).png", title: "Facade & Plastering", desc: "Weather-resistant external plaster and scaffolding safety" },
    { src: "/assets/assets (5).png", title: "Marble & Tile Laying", desc: "Laser-aligned vitrified tiles and polished Italian marble" },
    { src: "/assets/assets (6).png", title: "Electrical & MEP", desc: "Industrial switchgear, conduits and concealed multi-core wiring" },
    { src: "/assets/assets (11).png", title: "Elevation & Remodel", desc: "Stone cladding, balcony glass rails and structural renovation" },
    { src: "/assets/assets (12).png", title: "Interior Fitout", desc: "False ceilings, ambient LED illumination & bespoke furnishings" }
  ];

  return (
    <>
      <Header />
      <main>
        {/* HERO SECTION */}
        <section className="page-hero">
          <div className="container">
            <span className="kicker font-nepali">
              <span className="nepali-bold-highlight">हाम्रो परिचय</span> • Who We Are
            </span>
            <h1>WakeUp Nepal Builders Pvt. Ltd.</h1>
            <p>
              Building Trust. Building Homes. Building the Future. Complete building construction, renovation,
              interior design, and construction materials supply solutions in Nepal.
            </p>
          </div>
        </section>

        {/* WHO WE ARE & EXECUTIVE SUMMARY */}
        <section className="section">
          <div className="container">
            <div className="intro-grid">
              <div>
                <span className="kicker font-nepali">
                  <span className="nepali-bold-highlight">कम्पनी परिचय</span> • Executive Summary
                </span>
                <h2>Complete Building Solutions Under One Roof</h2>
                <h3 style={{ color: "var(--blue)", fontSize: "20px", marginTop: "4px" }}>
                  New Baneshwor, Kathmandu, Nepal
                </h3>
                <p>
                  <strong>WakeUp Nepal Builders Pvt. Ltd.</strong> is a professional building construction and
                  construction materials supply company based in <strong>New Baneshwor, Kathmandu, Nepal</strong>.
                  We provide comprehensive construction solutions for residential houses, commercial properties,
                  renovations, interiors, civil works, and related building projects.
                </p>
                <p>
                  Our approach combines technical knowledge, practical construction experience, reliable project
                  coordination, quality materials, and skilled workmanship.
                </p>
                <p>
                  We understand that building a house or commercial property is one of the most important investments
                  our clients make. Every project therefore deserves careful planning, proper material selection,
                  professional site supervision, transparent communication, and responsible execution.
                </p>
                <p>
                  Our objective is not simply to complete construction work. We aim to create structures that provide
                  long-term value, functionality, durability, comfort, and satisfaction.
                </p>

                <div style={{ marginTop: "24px", display: "flex", gap: "12px", flexWrap: "wrap" }}>
                  <Link href="/contact" className="btn btn-orange btn-sm">
                    Get a Free Site Visit &amp; Estimate →
                  </Link>
                  <Link href="#ceo-message" className="btn btn-outline btn-sm">
                    Read CEO Message
                  </Link>
                </div>
              </div>

              <div style={{ position: "relative" }}>
                <div style={{ borderRadius: "var(--radius)", overflow: "hidden", boxShadow: "var(--shadow-lg)" }}>
                  <Image
                    src="/assets/assets (17).png"
                    alt="Engineers and clients reviewing architectural plans at WakeUp Nepal Builders"
                    width={900}
                    height={600}
                    style={{ display: "block", width: "100%", height: "420px", objectFit: "cover" }}
                  />
                </div>
                <div
                  style={{
                    position: "absolute",
                    bottom: "-20px",
                    left: "20px",
                    background: "var(--navy-dark)",
                    color: "#ffffff",
                    padding: "16px 24px",
                    borderRadius: "14px",
                    boxShadow: "var(--shadow)",
                    maxWidth: "340px",
                    borderLeft: "4px solid var(--crimson)"
                  }}
                >
                  <strong style={{ fontSize: "16px", display: "block", color: "var(--crimson-light)" }}>
                    One Responsible Partner
                  </strong>
                  <span style={{ fontSize: "13px", color: "#d2e4f0" }}>
                    From empty land to finished dream building without subcontractor hassles.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* OFFICIAL MESSAGE FROM THE CEO - ENGLISH & NEPALI */}
        <CeoMessage isCompact={false} />

        {/* 8-STEP INTEGRATED LIFECYCLE */}
        <section className="section soft">
          <div className="container">
            <div style={{ textAlign: "center", maxWidth: "780px", margin: "0 auto 48px" }}>
              <span className="kicker font-nepali">
                <span className="nepali-bold-highlight">एकीकृत सेवा प्रवाह</span> • 8-Step Lifecycle
              </span>
              <h2>Everything You Need Under One Roof</h2>
              <p>
                Managing different contractors, labor teams, material suppliers, electricians, plumbers, painters,
                and designers can make construction complicated. We simplify the entire journey through one coordinated team.
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px" }}>
              {steps.map((s) => (
                <div
                  key={s.num}
                  style={{
                    background: "#ffffff",
                    border: "1px solid var(--line)",
                    borderRadius: "var(--radius)",
                    padding: "24px 20px",
                    boxShadow: "var(--shadow-sm)"
                  }}
                >
                  <span
                    style={{
                      display: "inline-block",
                      fontSize: "14px",
                      fontWeight: 900,
                      color: "var(--crimson)",
                      background: "var(--sky)",
                      padding: "4px 10px",
                      borderRadius: "999px",
                      marginBottom: "12px"
                    }}
                  >
                    Step {s.num}
                  </span>
                  <h3 style={{ fontSize: "17px", margin: "0 0 8px", color: "var(--navy-dark)" }}>{s.title}</h3>
                  <p style={{ fontSize: "13.5px", margin: 0, color: "var(--text-muted)", lineHeight: 1.55 }}>
                    {s.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ON-SITE WORKMANSHIP GALLERY */}
        <section className="section">
          <div className="container">
            <div className="section-head">
              <div>
                <span className="kicker font-nepali">
                  <span className="nepali-bold-highlight">कार्यस्थल तस्बिरहरू</span> • Field Execution
                </span>
                <h2>Real Construction Quality on Site</h2>
                <p>Every milestone supervised by our qualified site engineers and executed by skilled craftsmen.</p>
              </div>
              <Link href="/projects" className="btn btn-outline btn-sm">
                View Landmark Projects →
              </Link>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "18px" }}>
              {siteGallery.map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    background: "#ffffff",
                    borderRadius: "var(--radius)",
                    overflow: "hidden",
                    border: "1px solid var(--line)",
                    boxShadow: "var(--shadow-sm)",
                    transition: "transform 0.2s ease, box-shadow 0.2s ease"
                  }}
                >
                  <div style={{ position: "relative", width: "100%", height: "200px" }}>
                    <Image
                      src={item.src}
                      alt={item.title}
                      fill
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <div style={{ padding: "16px" }}>
                    <strong style={{ display: "block", fontSize: "15px", color: "var(--navy-dark)", marginBottom: "4px" }}>
                      {item.title}
                    </strong>
                    <p style={{ fontSize: "12.5px", color: "var(--text-muted)", margin: 0, lineHeight: 1.5 }}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* MISSION & VISION */}
        <section className="section soft">
          <div className="container">
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "32px" }}>
              <div
                style={{
                  background: "linear-gradient(135deg, #002B7F 0%, #071936 100%)",
                  color: "#ffffff",
                  borderRadius: "var(--radius)",
                  padding: "42px",
                  boxShadow: "var(--shadow)",
                  borderTop: "4px solid var(--crimson)"
                }}
              >
                <span className="font-nepali" style={{ color: "#ffd1da", fontWeight: 800, textTransform: "uppercase", fontSize: "13px" }}>
                  हाम्रो मिसन • Our Mission
                </span>
                <h3 style={{ fontSize: "28px", color: "#ffffff", margin: "10px 0 16px" }}>
                  Reliable, Professional &amp; Value-Driven
                </h3>
                <p style={{ color: "#d5e8f5", fontSize: "15.5px", lineHeight: 1.7, margin: 0 }}>
                  Our mission is to provide reliable, professional, and value-driven building construction services
                  while supplying quality construction materials for projects throughout Nepal. We are committed to
                  maintaining high standards of workmanship, safety, communication, project coordination, and customer
                  satisfaction while balancing quality, durability, functionality, design, budget, and timeline.
                </p>
              </div>

              <div
                style={{
                  background: "linear-gradient(135deg, #DC143C 0%, #A70C28 100%)",
                  color: "#ffffff",
                  borderRadius: "var(--radius)",
                  padding: "42px",
                  boxShadow: "var(--shadow)",
                  borderTop: "4px solid #ffffff"
                }}
              >
                <span className="font-nepali" style={{ color: "#ffffff", fontWeight: 800, textTransform: "uppercase", fontSize: "13px" }}>
                  हाम्रो भिजन • Our Vision
                </span>
                <h3 style={{ fontSize: "28px", color: "#ffffff", margin: "10px 0 16px" }}>
                  Nepal&apos;s Most Trusted Builder
                </h3>
                <p style={{ color: "#ffffff", fontSize: "15.5px", lineHeight: 1.7, margin: 0 }}>
                  Our vision is to become a trusted name in Nepal&apos;s construction industry by consistently delivering
                  quality construction, dependable materials, professional service, and long-term value. We aspire to build
                  lasting relationships with homeowners, businesses, developers, professionals, suppliers, and institutions
                  through honesty, responsibility, and quality service.
                </p>
              </div>
            </div>

            {/* MEET OUR ENGINEERING TEAM CALLOUT */}
            <div
              style={{
                marginTop: "40px",
                background: "#ffffff",
                border: "1.5px solid var(--line)",
                borderRadius: "var(--radius)",
                padding: "32px 36px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: "24px",
                boxShadow: "var(--shadow-sm)",
              }}
            >
              <div>
                <span className="kicker font-nepali" style={{ marginBottom: "4px", display: "inline-block" }}>
                  <span className="nepali-bold-highlight">हाम्रो टोली</span> • Leadership &amp; Engineering
                </span>
                <h3 style={{ margin: "4px 0 6px", fontSize: "22px", color: "var(--navy-dark)" }}>
                  Meet the Engineers &amp; Designers Behind WakeUp Nepal
                </h3>
                <p style={{ margin: 0, color: "var(--text-muted)", fontSize: "14.5px", maxWidth: "600px" }}>
                  Our multidisciplinary team includes certified structural engineers, site supervisors, architects,
                  and MEP specialists dedicated to NBC code compliance and flawless execution.
                </p>
              </div>

              <Link href="/team" className="btn btn-orange" style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
                <Users size={18} /> View Engineering Team <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>

        {/* CORE VALUES */}
        <section className="section">
          <div className="container">
            <div style={{ textAlign: "center", maxWidth: "700px", margin: "0 auto 40px" }}>
              <span className="kicker font-nepali">
                <span className="nepali-bold-highlight">हाम्रा मूल्य र मान्यताहरू</span> • Core Values
              </span>
              <h2>Our Fundamental Values</h2>
              <p>The principles that guide every design decision, site inspection, and foundation we pour.</p>
            </div>

            <div className="why-grid">
              {companyValues.map((v, i) => (
                <div className="why-card" key={i}>
                  <div className="why-icon">
                    <DynamicIcon name={v.icon} size={28} />
                  </div>
                  <div>
                    <h3>{v.title}</h3>
                    <p>{v.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TYPES OF PROJECTS WE UNDERTAKE */}
        <section className="section soft">
          <div className="container">
            <div className="section-head">
              <div>
                <span className="kicker font-nepali">
                  <span className="nepali-bold-highlight">परियोजना क्षेत्र</span> • Construction Scope
                </span>
                <h2>Types of Projects We Undertake</h2>
                <p>We serve a diverse range of residential, commercial, and civil building needs.</p>
              </div>
              <Link href="/projects" className="btn btn-outline btn-sm">
                View Completed Projects →
              </Link>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px" }}>
              {projectTypes.map((pt, i) => (
                <div
                  key={i}
                  style={{
                    background: "#ffffff",
                    border: "1px solid var(--line)",
                    borderRadius: "12px",
                    padding: "18px",
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    boxShadow: "var(--shadow-sm)"
                  }}
                >
                  <Check size={18} style={{ color: "var(--crimson)", flexShrink: 0 }} />
                  <strong style={{ fontSize: "14px", color: "var(--navy-dark)" }}>{pt}</strong>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ENGAGEMENT MODELS */}
        <section className="section">
          <div className="container">
            <div className="section-head">
              <div>
                <span className="kicker font-nepali">
                  <span className="nepali-bold-highlight">सहकार्य मोडेल</span> • Partnership Options
                </span>
                <h2>Flexible Engagement Models</h2>
                <p>Choose the model that best fits your procurement and project preferences.</p>
              </div>
            </div>

            <div className="engagement-grid">
              {engagementModels.map((em, idx) => (
                <div className="engagement-card" key={idx}>
                  <span className="meta">{em.basis}</span>
                  <h3 className="font-nepali">{em.model}</h3>
                  <p>{em.description}</p>
                  <div className="suitable">
                    <strong>Target:</strong> {em.suitableFor}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="cta">
          <div className="container cta-grid">
            <div>
              <div style={{ marginBottom: "12px" }}>
                <span className="nepali-bold-highlight font-nepali" style={{ fontSize: "14px", padding: "4px 12px" }}>
                  सपनाको निर्माण • Building Trust
                </span>
              </div>
              <h2 className="font-nepali">आफ्नो घर तथा भवन निर्माण आजै सुरु गर्नुहोस्</h2>
              <h3>Plan your new home or commercial building with WakeUp Nepal Builders.</h3>
              <p>
                Contact us today for a FREE initial site consultation and comprehensive project estimate.
                Office located at New Baneshwor, Kathmandu.
              </p>
            </div>
            <div className="cta-action">
              <Link href="/contact" className="btn btn-orange">
                Schedule a Consultation →
              </Link>
              <a href="tel:9864033256" className="cta-phone">
                <Phone size={16} /> 9864033256 &nbsp;|&nbsp; 9851188296
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
