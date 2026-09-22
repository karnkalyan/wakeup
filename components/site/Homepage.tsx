import Image from "next/image";
import Link from "next/link";
import { Phone, Landmark, ShieldCheck, Clock, MapPin, CheckCircle, ArrowRight, Package } from "lucide-react";
import { DynamicIcon } from "@/components/site/Icon";
import { CeoMessage } from "@/components/site/CeoMessage";
import { companyValues, engagementModels, faqs } from "@/lib/content";

type HomeProps = {
  services: any[];
  materials: any[];
  projects: any[];
  stats: any[];
};

export function Homepage({ services, materials, projects, stats }: HomeProps) {
  const steps = [
    { n: "01", t: "Initial Consultation", d: "Discuss land, ideas, floors, requirements & budget with our civil engineering team." },
    { n: "02", t: "Site Visit & Soil Study", d: "Detailed inspection, ground condition & practical topographical analysis." },
    { n: "03", t: "Estimate & Scope (BOQ)", d: "Transparent BOQ quotation, 2D/3D drawings & agreed milestone timeline." },
    { n: "04", t: "Quality Construction", d: "RCC frame, civil work, MEP lines & systematic on-site engineering supervision." },
    { n: "05", t: "Finishing & Handover", d: "Tiles, painting, interior touches, snag checks & seamless key handover." }
  ];

  return (
    <>
      {/* 1. HERO SECTION WITH ASSETS (18).PNG BACKGROUND */}
      <section className="hero hero-with-bg">
        {/* Full-width responsive background image */}
        <div className="hero-bg-container">
          <Image
            src="/assets/assets (18).png"
            alt="WakeUp Nepal Builders Luxury Architectural Landmark in Nepal"
            fill
            priority
            className="hero-bg-image"
          />
          <div className="hero-bg-overlay" />
        </div>

        <div className="container hero-grid">
          <div className="hero-copy">
            <div className="hero-eyebrow-pill">
              <span className="dot" />
              <span>New Baneshwor, Kathmandu, Nepal</span>
            </div>

            <h1 className="hero-title-clean">
              <span>Building Trust. Building Homes.</span>
              <span className="hero-title-sub">Building the Future.</span>
            </h1>

            <div className="hero-tagline font-nepali">
              <span className="nepali-bold-highlight">विश्वास निर्माण</span> •{" "}
              <span className="nepali-bold-highlight">घर निर्माण</span> •{" "}
              <span className="nepali-bold-highlight">भविष्य निर्माण</span>
            </div>

            <p className="lead">
              WakeUp Nepal Builders Pvt. Ltd. is your trusted partner for complete building construction,
              structural civil works, renovation, luxury modern interiors, and certified construction materials
              supply across Nepal. Led by experienced engineers committed to transparency, quality, and durability.
            </p>

            <div className="hero-actions">
              <Link className="btn btn-orange" href="/contact">
                Get a FREE Site Visit &amp; Estimate →
              </Link>
              <a href="tel:9864033256" className="hero-phone-call">
                <Phone size={16} /> 9864033256 &nbsp;|&nbsp; 9851188296
              </a>
            </div>

            <div className="mini-features">
              <div className="mini-feature-item">
                <span className="icon"><Landmark size={20} /></span>
                <b>One Company.<br />Complete Support.</b>
              </div>
              <div className="mini-feature-item">
                <span className="icon"><ShieldCheck size={20} /></span>
                <b>Certified Quality<br />Standard Materials</b>
              </div>
              <div className="mini-feature-item">
                <span className="icon"><Clock size={20} /></span>
                <b>On-Time Delivery<br />Transparent BOQ</b>
              </div>
            </div>
          </div>

          {/* Blank space on hero right to fully showcase the architectural villa image */}
          <div className="hero-blank-space" aria-hidden="true" />
        </div>
      </section>

      {/* 2. INTEGRATED 1-ROOF WORKFLOW SECTION (COMPLETELY REDESIGNED) */}
      <section className="workflow-section">
        <div className="container">
          <div className="workflow-head">
            <span className="kicker font-nepali">
              <span className="nepali-bold-highlight">एकीकृत कार्यप्रवाह</span> • One-Roof Integrated Execution
            </span>
            <h2>Complete 8-Step Construction Journey</h2>
            <p>From initial land layout to final key handover under one single accountable engineering team.</p>
          </div>

          <div className="workflow-grid">
            <div className="workflow-card">
              <div className="workflow-card-top">
                <span className="workflow-step-num">01</span>
                <span className="workflow-phase">Phase 1</span>
              </div>
              <h3 className="workflow-title">Planning &amp; 3D Design</h3>
              <p className="workflow-desc">
                Architectural layouts, 3D photorealistic renderings, structural engineering &amp; NBC municipal approvals.
              </p>
            </div>

            <div className="workflow-card">
              <div className="workflow-card-top">
                <span className="workflow-step-num">02</span>
                <span className="workflow-phase">Phase 2</span>
              </div>
              <h3 className="workflow-title">Cost Estimation (BOQ)</h3>
              <p className="workflow-desc">
                Transparent itemized bill of quantities with certified material grades and locked milestone pricing.
              </p>
            </div>

            <div className="workflow-card">
              <div className="workflow-card-top">
                <span className="workflow-step-num">03</span>
                <span className="workflow-phase">Phase 3</span>
              </div>
              <h3 className="workflow-title">Materials Supply</h3>
              <p className="workflow-desc">
                Direct factory procurement of test-certified OPC/PPC cement, TMT rebar, sand, aggregate &amp; bricks.
              </p>
            </div>

            <div className="workflow-card">
              <div className="workflow-card-top">
                <span className="workflow-step-num">04</span>
                <span className="workflow-phase">Phase 4</span>
              </div>
              <h3 className="workflow-title">RCC Construction</h3>
              <p className="workflow-desc">
                Seismic-resistant raft/isolated footings, column ties, beam casting &amp; continuous curing on site.
              </p>
            </div>

            <div className="workflow-card">
              <div className="workflow-card-top">
                <span className="workflow-step-num">05</span>
                <span className="workflow-phase">Phase 5</span>
              </div>
              <h3 className="workflow-title">MEP Engineering</h3>
              <p className="workflow-desc">
                Concealed multi-circuit electrical lines, CPVC/PVC water distribution, drainage &amp; sanitary fittings.
              </p>
            </div>

            <div className="workflow-card">
              <div className="workflow-card-top">
                <span className="workflow-step-num">06</span>
                <span className="workflow-phase">Phase 6</span>
              </div>
              <h3 className="workflow-title">Finishing &amp; Sealing</h3>
              <p className="workflow-desc">
                Terrace waterproofing membranes, weather-coat external plaster, interior putty &amp; luxury tile laying.
              </p>
            </div>

            <div className="workflow-card">
              <div className="workflow-card-top">
                <span className="workflow-step-num">07</span>
                <span className="workflow-phase">Phase 7</span>
              </div>
              <h3 className="workflow-title">Interior Fit-Out</h3>
              <p className="workflow-desc">
                Designer false ceilings, ambient LED lighting, modular kitchen cabinets &amp; architectural woodwork.
              </p>
            </div>

            <div className="workflow-card highlight">
              <div className="workflow-card-top">
                <span className="workflow-step-num highlight-num">08</span>
                <span className="workflow-phase highlight-badge">Final Step</span>
              </div>
              <h3 className="workflow-title">Inspection &amp; Handover</h3>
              <p className="workflow-desc">
                Rigorous quality snagging audit, warranty documentation &amp; formal handover of your dream building.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. ABOUT US & INTRODUCTION WITH ASSET (17).PNG */}
      <section className="section intro">
        <div className="container intro-grid">
          <div>
            <span className="kicker font-nepali">
              <span className="nepali-bold-highlight">हाम्रो परिचय</span> • About WakeUp Nepal Builders
            </span>
            <h2>Build Your Dream with Confidence</h2>
            <h3 style={{ fontSize: "22px", margin: "0 0 16px", color: "var(--blue)" }}>
              All Your Construction Needs Under One Roof
            </h3>
            <p>
              A building is more than concrete, steel, bricks, and walls. It represents a family&apos;s dream, a business
              investment, and an enduring foundation for the future.
            </p>
            <p>
              At <strong>WakeUp Nepal Builders Pvt. Ltd.</strong>, we bring together professional engineering management,
              skilled workforce, certified construction materials, and disciplined supervision to deliver structures
              that provide long-term strength, aesthetic beauty, and complete satisfaction.
            </p>
            <p>
              From individual modern homes in Kathmandu, Lalitpur, and Bhaktapur to multi-storey commercial complexes,
              structural renovations, and bulk material logistics, we eliminate subcontractor hassle with single-point
              accountability.
            </p>
            <div style={{ display: "flex", gap: "14px", marginTop: "24px", flexWrap: "wrap" }}>
              <Link href="/about" className="btn btn-blue btn-sm">
                Explore Full Company Profile →
              </Link>
              <Link href="/about#ceo-message" className="btn btn-outline btn-sm">
                Message from CEO
              </Link>
            </div>
          </div>

          <div className="stats-grid">
            {stats.map((s) => (
              <div className="stat-card" key={s.id}>
                <div className="stat-icon">
                  <DynamicIcon name={s.icon || "trophy"} size={32} />
                </div>
                <strong>{s.value}</strong>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="container" style={{ marginTop: "32px" }}>
          <div className="quote-box">
            <p className="font-nepali">
              “ <span className="nepali-bold-highlight">गुणस्तरीय निर्माण</span>, भरपर्दो सामग्री र{" "}
              <span className="nepali-bold-highlight">अनुभवी समन्वय</span> — समृद्ध नेपालको लागि हाम्रो प्रतिबद्धता । ”
            </p>
            <Link href="/contact" className="btn btn-orange btn-sm">
              Inquire Now →
            </Link>
          </div>
        </div>
      </section>

      {/* 4. CEO MESSAGE SPOTLIGHT ON HOMEPAGE */}
      <CeoMessage isCompact={true} />

      {/* 5. CONSTRUCTION SERVICES WITH LOCAL HIGH-RESOLUTION ASSETS */}
      <section className="section soft">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="kicker font-nepali">
                <span className="nepali-bold-highlight">हाम्रा प्रमुख सेवाहरू</span> • Construction Services
              </span>
              <h2>Comprehensive Construction Services</h2>
              <p>End-to-end building solutions from foundation excavation to luxury interior finishes.</p>
            </div>
            <Link className="btn btn-outline btn-sm" href="/services">
              View All Services →
            </Link>
          </div>

          <div className="service-grid">
            {services.slice(0, 6).map((s, idx) => {
              const serviceDefaults = [
                "/assets/assets (19).png",
                "/assets/assets (20).png",
                "/assets/assets (23).png",
                "/assets/assets (12).png",
                "/assets/assets (25).png",
                "/assets/assets (26).png"
              ];
              const sImg = s.image || serviceDefaults[idx % serviceDefaults.length];
              return (
                <article className="service-card" key={s.id}>
                  <div className="img-wrap">
                    <Image
                      src={sImg}
                      alt={s.title}
                      width={800}
                      height={480}
                    />
                  </div>
                <div className="card-body">
                  <h3>{s.title}</h3>
                  <p>{s.excerpt}</p>
                  {s.features && (
                    <ul className="service-features">
                      {s.features.slice(0, 3).map((f: string, i: number) => (
                        <li key={i}>{f}</li>
                      ))}
                    </ul>
                  )}
                  <Link
                    href="/contact"
                    style={{
                      marginTop: "auto",
                      fontSize: "13.5px",
                      fontWeight: 700,
                      color: "var(--crimson)",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "4px"
                    }}
                  >
                    Request Consultation <ArrowRight size={14} />
                  </Link>
                </div>
              </article>
            );
          })}
          </div>
        </div>
      </section>

      {/* 6. MATERIALS SUPPLY WITH ASSET (15).PNG HIGHLIGHT */}
      <section className="section materials">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="kicker font-nepali">
                <span className="nepali-bold-highlight">निर्माण सामग्री आपूर्ति</span> • Materials Supply
              </span>
              <h2>Quality Construction Materials Supply</h2>
              <p>Direct project-site delivery of certified materials across Kathmandu Valley and Nepal.</p>
            </div>
            <Link className="btn btn-outline btn-sm" href="/materials">
              View All Materials →
            </Link>
          </div>

          {/* Featured Warehouse Banner */}
          <div className="material-hero-banner" style={{
            position: "relative",
            borderRadius: "var(--radius)",
            overflow: "hidden",
            marginBottom: "32px",
            minHeight: "260px",
            display: "flex",
            alignItems: "center",
            boxShadow: "var(--shadow-lg)"
          }}>
            <Image
              src="/assets/assets (15).png"
              alt="WakeUp Nepal Builders Construction Materials Supply Warehouse"
              fill
              style={{ objectFit: "cover" }}
            />
            <div style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(90deg, rgba(7, 25, 54, 0.92) 0%, rgba(7, 25, 54, 0.75) 50%, rgba(7, 25, 54, 0.3) 100%)"
            }} />
            <div style={{ position: "relative", zIndex: 2, padding: "36px 40px", maxWidth: "680px", color: "#ffffff" }}>
              <span className="nepali-bold-highlight font-nepali" style={{ fontSize: "13px", marginBottom: "10px", display: "inline-block" }}>
                थोक तथा खुद्रा आपूर्ति
              </span>
              <h3 style={{ fontSize: "28px", color: "#ffffff", margin: "4px 0 10px" }}>
                Direct Site Delivery for Contractors &amp; Homeowners
              </h3>
              <p style={{ color: "#d5e8f5", fontSize: "15px", margin: "0 0 20px" }}>
                From high-grade cement and TMT bars to washed sand, aggregates, bricks, tiles, and sanitaryware — we supply certified materials with guaranteed volume and transparent pricing.
              </p>
              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                <Link href="/contact" className="btn btn-orange btn-sm">
                  Get Bulk Material Quotation →
                </Link>
                <a href="tel:9864033256" className="btn btn-outline-white btn-sm">
                  <Phone size={14} /> Call Material Desk: 9864033256
                </a>
              </div>
            </div>
          </div>

          <div className="material-grid">
            {materials.slice(0, 8).map((m, idx) => {
              const matDefaults = [
                "/assets/assets (15).png",
                "/assets/assets (13).png",
                "/assets/assets (1).png",
                "/assets/assets (3).png",
                "/assets/assets (5).png",
                "/assets/assets (8).png",
                "/assets/assets (6).png",
                "/assets/assets (9).png"
              ];
              const mImg = m.image || matDefaults[idx % matDefaults.length];
              return (
                <div className="material-card" key={m.id}>
                  <div className="mat-img">
                    <Image
                      src={mImg}
                      alt={m.title}
                      width={600}
                      height={340}
                    />
                  </div>
                <div className="mat-body">
                  {m.category && <span className="category-pill">{m.category}</span>}
                  <strong>{m.title}</strong>
                  <p>{m.description}</p>
                </div>
              </div>
            );
          })}
          </div>

          <div style={{ textAlign: "center", marginTop: "36px" }}>
            <Link href="/materials" className="btn btn-blue">
              Explore All 12+ Construction Material Categories →
            </Link>
          </div>
        </div>
      </section>

      {/* 7. ENGAGEMENT MODELS */}
      <section className="section soft">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="kicker font-nepali">
                <span className="nepali-bold-highlight">सहकार्य मोडेल तथा प्रस्ताव</span> • Engagement Models
              </span>
              <h2>Flexible Engagement &amp; Partnership Models</h2>
              <p>Tailored contract options suited for homeowners, commercial property owners, and developers.</p>
            </div>
            <Link className="btn btn-orange btn-sm" href="/contact">
              Discuss Your Scope →
            </Link>
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

      {/* 8. WHY CHOOSE US & CORE VALUES */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="kicker font-nepali">
                <span className="nepali-bold-highlight">किन हामीलाई रोज्ने ?</span> • Why Choose Us
              </span>
              <h2>Our Core Values &amp; Commitment</h2>
              <p>We deliver more than structures. We deliver trust, safety, and long-term value.</p>
            </div>
            <div style={{ fontWeight: 700, color: "var(--navy)" }}>
              One Company. One Team. Complete Support.
            </div>
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

      {/* 9. OUR WORKING PROCESS */}
      <section className="section process">
        <div className="container">
          <div style={{ textAlign: "center", maxWidth: "700px", margin: "0 auto 36px" }}>
            <span className="kicker font-nepali">
              <span className="nepali-bold-highlight">हाम्रो कार्य प्रक्रिया</span> • 5-Step Process
            </span>
            <h2>Step-by-Step Construction Journey</h2>
            <p>
              A transparent, well-coordinated 5-stage workflow ensuring your investment is delivered
              on schedule and within budget.
            </p>
          </div>

          <div className="process-grid">
            {steps.map((s) => (
              <div className="process-step" key={s.n}>
                <div className="step-num">{s.n}</div>
                <h3>{s.t}</h3>
                <p>{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. FEATURED PROJECTS SHOWCASE */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="kicker font-nepali">
                <span className="nepali-bold-highlight">हाम्रो परियोजनाहरू</span> • Featured Portfolio
              </span>
              <h2>Featured Architectural Projects</h2>
              <p>Selected residential, commercial, and renovation landmarks across Nepal.</p>
            </div>
            <Link className="btn btn-outline btn-sm" href="/projects">
              View All Projects →
            </Link>
          </div>

          <div className="project-grid">
            {projects.map((p, idx) => {
              const projDefaults = [
                "/assets/assets (21).png",
                "/assets/assets (22).png",
                "/assets/assets (24).png"
              ];
              const pImg = p.coverImage || projDefaults[idx % projDefaults.length];
              return (
                <article className="project-card" key={p.id}>
                  <div className="img-wrap">
                    <Image
                      src={pImg}
                      alt={p.title}
                      width={800}
                      height={480}
                    />
                  </div>
                <div className="project-body">
                  <span className="badge">{p.category}</span>
                  <h3>{p.title}</h3>
                  <p className="project-loc">
                    <MapPin size={14} style={{ display: "inline-block", verticalAlign: "-2px", marginRight: "4px" }} />
                    {p.location}
                  </p>
                  <p>{p.excerpt}</p>
                </div>
              </article>
            );
          })}
          </div>
        </div>
      </section>

      {/* 11. FREQUENTLY ASKED QUESTIONS */}
      <section className="section soft">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="kicker font-nepali">
                <span className="nepali-bold-highlight">प्रायः सोधिने प्रश्नहरू</span> • FAQs
              </span>
              <h2>Frequently Asked Questions</h2>
              <p>Everything you need to know about our construction services and material supplies.</p>
            </div>
            <Link className="btn btn-outline btn-sm" href="/contact">
              Have More Questions?
            </Link>
          </div>

          <div className="faq-grid">
            {faqs.map((f, i) => (
              <div className="faq-card" key={i}>
                <h3>{f.q}</h3>
                <p>{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 12. HIGH-CONVERTING CALL TO ACTION BANNER */}
      <section className="cta">
        <div className="container cta-grid">
          <div>
            <div style={{ marginBottom: "14px" }}>
              <span className="nepali-bold-highlight font-nepali" style={{ fontSize: "14.5px", padding: "4px 14px", borderRadius: "999px" }}>
                सपनाको घर निर्माण • Building Dreams
              </span>
            </div>
            <h2 className="font-nepali" style={{ color: "#ffffff", fontWeight: 800 }}>
              आफ्नो सपनाको घर निर्माण आजै सुरु गर्नुहोस् ।
            </h2>
            <h3>Building Trust. Building Homes. Building the Future.</h3>
            <p>
              Contact WakeUp Nepal Builders Pvt. Ltd. today for a <strong>FREE site visit and project estimate</strong>.
              From residential homes and commercial complexes to renovation and verified material supplies, our engineering
              team is here to help you build with confidence.
            </p>
          </div>
          <div className="cta-action">
            <Link href="/contact" className="btn btn-orange">
              Request a FREE Consultation →
            </Link>
            <a href="tel:9864033256" className="cta-phone">
              <Phone size={16} /> 9864033256 &nbsp;|&nbsp; 9851188296
            </a>
            <span style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "12.5px", color: "#c8dfef" }}>
              <MapPin size={14} /> New Baneshwor, Kathmandu, Nepal
            </span>
          </div>
        </div>
      </section>
    </>
  );
}
