import Image from "next/image";
import Link from "next/link";
import { Phone } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { fallbackServices } from "@/lib/content";

export const metadata = {
  title: "Building Construction Services in Kathmandu | WakeUp Nepal Builders",
  description: "Complete building construction services: residential house construction, commercial buildings, RCC structural work, renovation, interior design, exterior elevation, electrical, plumbing, and waterproofing."
};

export default function ServicesPage() {
  return (
    <>
      <Header />
      <main>
        <section className="page-hero">
          <div className="container">
            <span className="kicker font-nepali">
              <span className="nepali-bold-highlight">हाम्रा निर्माण सेवाहरू</span> • Comprehensive Building Solutions
            </span>
            <h1>Comprehensive Building Construction Services</h1>
            <p>
              From foundation to finishing, WakeUp Nepal Builders provides complete building construction solutions
              for residential homes, commercial projects, structural civil works, renovation, and interior design across Nepal.
            </p>
          </div>
        </section>

        <section className="section">
          <div className="container">
            {/* FEATURED STRUCTURAL & TURNKEY BANNER */}
            <div className="featured-banner-wrap">
              <Image
                src="/assets/assets (13).png"
                alt="WakeUp Nepal Builders Structural & Turnkey Construction"
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
                  इन्जिनियरिङ उत्कृष्टता तथा संरचनात्मक सुरक्षा
                </span>
                <h2>Seismic-Resistant &amp; Turnkey Construction Services</h2>
                <p>
                  Every project is supervised by qualified structural civil engineers. We take care of architectural planning,
                  soil investigation, municipality permits, foundation excavation, RCC framework, MEP installations, and luxury finishing.
                </p>
                <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                  <Link href="/contact" className="btn btn-orange btn-sm">
                    Book Free Site Engineering Consultation →
                  </Link>
                  <a href="tel:9864033256" className="btn btn-outline-white btn-sm">
                    <Phone size={14} /> Call: 9864033256
                  </a>
                </div>
              </div>
            </div>

            <div className="service-grid">
              {fallbackServices.map((s) => (
                <article className="service-card" key={s.id}>
                  <div className="img-wrap">
                    <Image
                      src={s.image}
                      alt={s.title}
                      width={800}
                      height={420}
                    />
                  </div>
                  <div className="card-body">
                    <h3>{s.title}</h3>
                    <p>{s.excerpt}</p>
                    {s.features && (
                      <ul className="service-features">
                        {s.features.map((f: string, i: number) => (
                          <li key={i}>{f}</li>
                        ))}
                      </ul>
                    )}
                    <div style={{ marginTop: "auto", paddingTop: "14px", borderTop: "1px solid var(--line)" }}>
                      <Link href="/contact" className="btn btn-outline btn-sm" style={{ width: "100%" }}>
                        Get Estimate for this Service →
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="cta">
          <div className="container cta-grid">
            <div>
              <div style={{ marginBottom: "12px" }}>
                <span className="nepali-bold-highlight font-nepali" style={{ fontSize: "14px", padding: "4px 12px" }}>
                  एकल जिम्मेवारी • One-Roof Turnkey
                </span>
              </div>
              <h2 className="font-nepali">घर तथा भवन निर्माणको सम्पूर्ण प्याकेज</h2>
              <h3>We coordinate all engineering, materials, and skilled labor under one roof.</h3>
              <p>
                Call our office in New Baneshwor, Kathmandu for a free site assessment and customized project plan.
              </p>
            </div>
            <div className="cta-action">
              <Link href="/contact" className="btn btn-orange">
                Book a FREE Site Visit →
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
