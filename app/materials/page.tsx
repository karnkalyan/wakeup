import Image from "next/image";
import Link from "next/link";
import { Package, Phone } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { fallbackMaterials } from "@/lib/content";

export const metadata = {
  title: "Construction Materials Supplier in Kathmandu | WakeUp Nepal Builders",
  description: "Wholesale & retail construction materials supply in Kathmandu: Cement, TMT steel bars, sand, aggregate, bricks, tiles, marble, plumbing, electrical, paints, and waterproofing."
};

export default function MaterialsPage() {
  return (
    <>
      <Header />
      <main>
        <section className="page-hero">
          <div className="container">
            <span className="kicker font-nepali">
              <span className="nepali-bold-highlight">निर्माण सामग्री आपूर्ति</span> • Direct Site Supply
            </span>
            <h1>Construction Materials Supply in Nepal</h1>
            <p>
              Direct project-site delivery of certified structural, MEP, finishing, and architectural construction
              materials for individual homeowners, contractors, developers, and institutions.
            </p>
          </div>
        </section>

        {/* BULK SUPPLY HIGHLIGHT */}
        <section className="section-tight" style={{ background: "var(--sky)", borderBottom: "1px solid var(--line)" }}>
          <div className="container">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "20px" }}>
              <div>
                <strong style={{ fontSize: "18px", color: "var(--navy-dark)", display: "flex", alignItems: "center", gap: "8px" }}>
                  <Package size={20} style={{ color: "var(--crimson)" }} /> Need Bulk Materials for Your Project?
                </strong>
                <span style={{ fontSize: "14px", color: "var(--text-muted)" }}>
                  Submit your BOQ or material list for wholesale discounted quotes and phased site deliveries.
                </span>
              </div>
              <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                <Link href="/contact" className="btn btn-orange btn-sm">
                  Request Material Pricing →
                </Link>
                <a href="tel:9864033256" style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "8px 16px", background: "#fff", borderRadius: "999px", fontWeight: 700, fontSize: "13.5px", color: "var(--navy)", border: "1px solid var(--line)" }}>
                  <Phone size={14} /> 9864033256 / 9851188296
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            {/* FEATURED CENTRAL WAREHOUSE BANNER */}
            <div className="featured-banner-wrap">
              <Image
                src="/assets/assets (15).png"
                alt="WakeUp Nepal Builders Construction Materials Supply Showroom & Warehouse"
                fill
                priority
                style={{ objectFit: "cover" }}
              />
              <div className="featured-banner-overlay" />
              <div className="featured-banner-content">
                <span
                  className="nepali-bold-highlight font-nepali"
                  style={{ fontSize: "13px", marginBottom: "10px", display: "inline-block" }}
                >
                  केन्द्रीय सामग्री आपूर्ति केन्द्र
                </span>
                <h2>Certified Construction Materials Supply Center</h2>
                <p>
                  Direct supply of Grade 43/53 cement, earthquake-resistant Fe-500D TMT rebar, river sand, aggregates,
                  clay bricks, designer tiles, and MEP fixtures delivered directly to your construction site across Nepal.
                </p>
                <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                  <Link href="/contact" className="btn btn-orange btn-sm">
                    Request Direct Site Delivery Quote →
                  </Link>
                  <a href="tel:9864033256" className="btn btn-outline-white btn-sm">
                    <Phone size={14} /> Call Material Hotline: 9864033256
                  </a>
                </div>
              </div>
            </div>

            <div className="material-grid">
              {fallbackMaterials.map((m) => (
                <div className="material-card" key={m.id}>
                  <div className="mat-img">
                    <Image
                      src={m.image}
                      alt={m.title}
                      width={600}
                      height={320}
                    />
                  </div>
                  <div className="mat-body">
                    {m.category && <span className="category-pill">{m.category}</span>}
                    <strong>{m.title}</strong>
                    <p>{m.description}</p>
                    <div style={{ marginTop: "auto", paddingTop: "12px" }}>
                      <Link
                        href="/contact"
                        style={{ fontSize: "13px", fontWeight: 700, color: "var(--crimson)" }}
                      >
                        Inquire Price →
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="cta">
          <div className="container cta-grid">
            <div>
              <div style={{ marginBottom: "12px" }}>
                <span className="nepali-bold-highlight font-nepali" style={{ fontSize: "14px", padding: "4px 12px" }}>
                  भरपर्दो गुणस्तर • Trusted Delivery
                </span>
              </div>
              <h2 className="font-nepali">सिधै तपाईंको साइटमा निर्माण सामग्री डेलिभरी</h2>
              <h3>Cement, TMT Steel, Sand, Bricks, Tiles, Electrical, Plumbing &amp; more.</h3>
              <p>
                We arrange verified standard brands with guaranteed weight, quality specifications, and prompt transportation across Nepal.
              </p>
            </div>
            <div className="cta-action">
              <Link href="/contact" className="btn btn-orange">
                Get Material Quotation →
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
