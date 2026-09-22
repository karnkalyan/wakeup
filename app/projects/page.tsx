import Image from "next/image";
import Link from "next/link";
import { MapPin, Phone } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { fallbackProjects } from "@/lib/content";

export const metadata = {
  title: "Featured Projects | WakeUp Nepal Builders Pvt. Ltd.",
  description: "Browse our completed residential, commercial, renovation, and interior construction projects across Kathmandu, Lalitpur, Bhaktapur and beyond."
};

export default function ProjectsPage() {
  return (
    <>
      <Header />
      <main>
        <section className="page-hero">
          <div className="container">
            <span className="kicker font-nepali">
              <span className="nepali-bold-highlight">हाम्रो काम</span> • Portfolio &amp; Landmarks
            </span>
            <h1>Featured Building Projects</h1>
            <p>
              Every structure represents the trust a client places in our team. Explore selected residential residences,
              corporate headquarters, commercial spaces, and comprehensive renovations completed by WakeUp Nepal Builders.
            </p>
          </div>
        </section>

        <section className="section">
          <div className="container">
            {/* FEATURED ARCHITECTURAL LANDMARKS SHOWCASE BANNER */}
            <div className="featured-banner-wrap">
              <Image
                src="/assets/assets (16).png"
                alt="WakeUp Nepal Builders Architectural Landmarks in Nepal"
                fill
                priority
                style={{ objectFit: "cover" }}
              />
              <div className="featured-banner-overlay" />
              <div className="featured-banner-content">
                <span
                  className="nepali-bold-highlight font-nepali"
                  style={{ fontSize: "13px", marginBottom: "12px", display: "inline-block" }}
                >
                  आधुनिक निर्माण तथा इन्जिनियरिङ
                </span>
                <h2>Engineering Masterpieces Across Nepal</h2>
                <p>
                  From luxury hillside villas and residential homes to modern corporate commercial headquarters and
                  heritage retrofitting, explore structures designed and delivered with precision, durability, and elegance.
                </p>
                <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                  <Link href="/contact" className="btn btn-orange btn-sm">
                    Discuss Your Building Project →
                  </Link>
                  <a href="tel:9864033256" className="btn btn-outline-white btn-sm">
                    <Phone size={14} /> 9864033256
                  </a>
                </div>
              </div>
            </div>

            <div className="project-grid">
              {fallbackProjects.map((p) => (
                <article className="project-card" key={p.id}>
                  <div className="img-wrap">
                    <Image
                      src={p.coverImage}
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
                    <div style={{ marginTop: "auto", paddingTop: "14px" }}>
                      <Link href="/contact" className="btn btn-outline btn-sm" style={{ width: "100%" }}>
                        Consult About a Similar Project →
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
                  सपनाको संरचना • Build With Confidence
                </span>
              </div>
              <h2 className="font-nepali">जग्गा छ र घर बनाउने सोचमा हुनुहुन्छ ?</h2>
              <h3>Contact us for a detailed project estimation and site visit.</h3>
              <p>
                From modern villas to commercial plazas and renovation works, our engineers are ready to guide you from foundation to finishing.
              </p>
            </div>
            <div className="cta-action">
              <Link href="/contact" className="btn btn-orange">
                Start Your Project Today →
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
