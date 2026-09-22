import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { ContactForm } from "@/components/site/ContactForm";
import { MapPin, Phone, MessageCircle, Mail, Clock, Gift } from "lucide-react";

export const metadata = {
  title: "Contact Us | WakeUp Nepal Builders Pvt. Ltd.",
  description: "Get in touch with WakeUp Nepal Builders in New Baneshwor, Kathmandu. Call 9864033256 / 9851188296 for a free site visit and project estimate."
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <main>
        <section className="page-hero">
          <div className="container">
            <span className="kicker font-nepali">
              <span className="nepali-bold-highlight">सम्पर्क गर्नुहोस्</span> • Get in Touch
            </span>
            <h1>Let&apos;s Build Something Great Together</h1>
            <p>
              Have land and planning to build? Need to renovate your property? Looking for a dependable contractor
              or bulk construction materials? Talk to our team at WakeUp Nepal Builders Pvt. Ltd.
            </p>
          </div>
        </section>

        <section className="section">
          <div className="container contact-grid">
            <div className="contact-info-card">
              <span className="kicker font-nepali">
                <span className="nepali-bold-highlight">कार्यालय सम्पर्क</span> • Office &amp; Support
              </span>
              <h2>WakeUp Nepal Builders Pvt. Ltd.</h2>
              <p className="font-nepali" style={{ fontSize: "15px", color: "var(--crimson)", fontWeight: 800, margin: "0 0 20px" }}>
                विश्वास निर्माण • घर निर्माण • भविष्य निर्माण
              </p>

              <div className="contact-detail-row">
                <span className="icon"><MapPin size={20} /></span>
                <div>
                  <strong>Office Location:</strong>
                  <p style={{ margin: "2px 0 0" }}>New Baneshwor, Kathmandu, Nepal</p>
                </div>
              </div>

              <div className="contact-detail-row">
                <span className="icon"><Phone size={20} /></span>
                <div>
                  <strong>Phone Numbers:</strong>
                  <p style={{ margin: "2px 0 0" }}>
                    <a href="tel:9864033256" style={{ color: "var(--navy)", fontWeight: 700 }}>9864033256</a>
                    &nbsp; | &nbsp;
                    <a href="tel:9851188296" style={{ color: "var(--navy)", fontWeight: 700 }}>9851188296</a>
                  </p>
                </div>
              </div>

              <div className="contact-detail-row">
                <span className="icon"><MessageCircle size={20} /></span>
                <div>
                  <strong>WhatsApp Contact:</strong>
                  <p style={{ margin: "2px 0 0" }}>
                    <a href="https://wa.me/9779864033256" target="_blank" rel="noopener noreferrer" style={{ color: "#25D366", fontWeight: 700 }}>
                      +977 9864033256 (Instant WhatsApp Chat)
                    </a>
                  </p>
                </div>
              </div>

              <div className="contact-detail-row">
                <span className="icon"><Mail size={20} /></span>
                <div>
                  <strong>Email Address:</strong>
                  <p style={{ margin: "2px 0 0" }}>wakeupnepalbuilders@gmail.com</p>
                </div>
              </div>

              <div className="contact-detail-row">
                <span className="icon"><Clock size={20} /></span>
                <div>
                  <strong>Working Hours:</strong>
                  <p style={{ margin: "2px 0 0" }}>Sunday – Friday: 9:00 AM – 6:00 PM</p>
                </div>
              </div>

              <div style={{ marginTop: "28px", padding: "18px", background: "#ffffff", borderRadius: "12px", border: "1px solid var(--line)" }}>
                <strong style={{ display: "flex", alignItems: "center", gap: "6px", color: "var(--navy-dark)", fontSize: "14px", marginBottom: "4px" }}>
                  <Gift size={16} style={{ color: "var(--crimson)" }} /> Free Site Visit &amp; Initial Estimate
                </strong>
                <p style={{ margin: 0, fontSize: "13px", color: "var(--text-muted)" }}>
                  Subject to project location and scope. We review your land condition, access, floor plan, and provide
                  transparent cost guidance.
                </p>
              </div>
            </div>

            <div>
              <ContactForm />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
