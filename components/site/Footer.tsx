import Image from "next/image";
import Link from "next/link";
import { MessageCircle, ArrowRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "14px" }}>
            <Image
              src="/logo/logo.png"
              alt="WakeUp Nepal Builders Logo"
              width={50}
              height={50}
              style={{ width: "48px", height: "48px", objectFit: "contain", borderRadius: "8px" }}
            />
            <div>
              <div style={{ fontFamily: "var(--font-poppins)", fontWeight: 800, fontSize: "19px", color: "var(--navy-dark)", lineHeight: 1.15 }}>
                WakeUp Nepal <span style={{ color: "var(--crimson)" }}>Builders</span>
              </div>
              <div className="font-nepali" style={{ fontSize: "12px", fontWeight: 700, color: "var(--crimson)", letterSpacing: "0.02em" }}>
                विश्वास निर्माण • घर निर्माण • भविष्य निर्माण
              </div>
            </div>
          </div>
          <p style={{ marginTop: "4px", fontWeight: 700, color: "var(--navy)", fontSize: "14.5px" }}>
            Building Trust. Building Homes. Building the Future.
          </p>
          <p style={{ fontSize: "13.5px", color: "var(--text-muted)", maxWidth: "340px", lineHeight: 1.6 }}>
            Complete building construction, renovation, interior, exterior, MEP works, and verified construction
            materials supply solutions across Kathmandu and Nepal.
          </p>
        </div>

        <div>
          <h4>Quick Links</h4>
          <div className="footer-links">
            <Link href="/">Home</Link>
            <Link href="/about">About Us</Link>
            <Link href="/services">Construction Services</Link>
            <Link href="/materials">Materials Supply</Link>
            <Link href="/projects">Featured Projects</Link>
            <Link href="/team">Our Engineering Team</Link>
            <Link href="/contact">Contact Us</Link>
          </div>
        </div>

        <div>
          <h4>Core Services</h4>
          <div className="footer-links">
            <Link href="/services">Residential House Construction</Link>
            <Link href="/services">Commercial Building Construction</Link>
            <Link href="/services">RCC &amp; Structural Works</Link>
            <Link href="/services">Renovation &amp; Remodeling</Link>
            <Link href="/services">Interior Design &amp; Fit-Out</Link>
            <Link href="/services">Turnkey Construction Solutions</Link>
            <Link href="/materials">Construction Materials Supply</Link>
          </div>
        </div>

        <div>
          <h4>Contact Information</h4>
          <p style={{ margin: "0 0 6px" }}>
            <strong>Office:</strong> New Baneshwor, Kathmandu, Nepal
          </p>
          <p style={{ margin: "0 0 6px" }}>
            <strong>Phone:</strong><br />
            <a href="tel:9864033256" style={{ fontWeight: 700 }}>9864033256</a> &nbsp;|&nbsp; <a href="tel:9851188296" style={{ fontWeight: 700 }}>9851188296</a>
          </p>
          <p style={{ margin: "0 0 6px" }}>
            <strong>WhatsApp:</strong><br />
            <a href="https://wa.me/9779864033256" target="_blank" rel="noopener noreferrer" style={{ color: "#25D366", fontWeight: 700, display: "inline-flex", alignItems: "center", gap: "6px" }}>
              <MessageCircle size={15} /> +977 9864033256 (Chat Now)
            </a>
          </p>
          <p style={{ margin: "0 0 10px" }}>
            <strong>Email:</strong><br />
            <a href="mailto:wakeupnepalbuilders@gmail.com">wakeupnepalbuilders@gmail.com</a>
          </p>
          <Link
            href="/contact"
            className="btn btn-orange btn-sm"
            style={{ marginTop: "6px", color: "#ffffff !important" as any }}
          >
            <span style={{ color: "#ffffff", fontWeight: 700 }}>Get FREE Site Visit</span> <ArrowRight size={14} color="#ffffff" />
          </Link>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "10px" }}>
          <div>
            © {new Date().getFullYear()} WakeUp Nepal Builders Pvt. Ltd. All rights reserved.
          </div>
          <div>
            New Baneshwor, Kathmandu, Nepal &nbsp;|&nbsp; Building Trust, Building Homes.
          </div>
        </div>
      </div>
    </footer>
  );
}
