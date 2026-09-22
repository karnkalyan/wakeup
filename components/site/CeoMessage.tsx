"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Phone, Mail, Award, CheckCircle2, Languages, ArrowRight, Users } from "lucide-react";
import { ceoMessage } from "@/lib/content";

interface CeoMessageProps {
  isCompact?: boolean;
}

export function CeoMessage({ isCompact = false }: CeoMessageProps) {
  const [lang, setLang] = useState<"en" | "np">("en");

  return (
    <section className={`section ceo-section ${isCompact ? "ceo-section-compact" : "soft"}`} id="ceo-message">
      <div className="container">
        {/* SECTION HEADER & LANGUAGE TOGGLE */}
        <div className="ceo-header-wrap">
          <div>
            <span className="kicker font-nepali">
              <span className="nepali-bold-highlight">नेतृत्वको सन्देश</span> • Leadership Message
            </span>
            <h2>
              {lang === "en" ? "Message from the CEO" : "प्रमुख कार्यकारी अधिकृतको सन्देश"}
            </h2>
            <p className="ceo-subheading">
              {lang === "en"
                ? "Building Trust. Building Homes. Building the Future."
                : "विश्वास निर्माण। घर निर्माण। भविष्य निर्माण।"}
            </p>
          </div>

          <div className="lang-switcher-pill" role="tablist" aria-label="Language selection">
            <Languages size={18} className="lang-icon" />
            <button
              type="button"
              role="tab"
              aria-selected={lang === "en"}
              className={`lang-btn ${lang === "en" ? "active" : ""}`}
              onClick={() => setLang("en")}
            >
              English
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={lang === "np"}
              className={`lang-btn font-nepali ${lang === "np" ? "active" : ""}`}
              onClick={() => setLang("np")}
            >
              नेपाली
            </button>
          </div>
        </div>

        {/* CEO CARD & CONTENT GRID */}
        <div className="ceo-main-grid">
          {/* LEFT: EXECUTIVE PROFILE CARD */}
          <div className="ceo-profile-card">
            <div className="ceo-image-wrapper">
              <Image
                src={ceoMessage.photo}
                alt={ceoMessage.name}
                width={400}
                height={480}
                priority
                className="ceo-photo"
              />
              <div className="ceo-verified-badge">
                <CheckCircle2 size={16} /> Certified Civil Engineer
              </div>
            </div>

            <div className="ceo-meta">
              <h3>{lang === "en" ? ceoMessage.name : ceoMessage.nameNp}</h3>
              <div className="ceo-title-role">
                {lang === "en" ? ceoMessage.title : ceoMessage.titleNp}
              </div>
              <div className="ceo-company-name">WakeUp Nepal Builders Pvt. Ltd.</div>

              <div className="ceo-creds-list">
                <div className="ceo-cred-item">
                  <Award size={16} className="cred-icon" />
                  <span>Structural Supervision &amp; BOQ Expert</span>
                </div>
                <div className="ceo-cred-item">
                  <CheckCircle2 size={16} className="cred-icon" />
                  <span>Project Management &amp; QC Specialist</span>
                </div>
              </div>

              <div className="ceo-motto-callout font-nepali">
                <strong>{lang === "en" ? ceoMessage.mottoEn : ceoMessage.mottoNp}</strong>
              </div>

              <div className="ceo-direct-contact">
                <a href="tel:9864033256" className="ceo-contact-link">
                  <Phone size={15} /> 9864033256
                </a>
                <a href="mailto:wakeupnepalbuilders@gmail.com" className="ceo-contact-link">
                  <Mail size={15} /> Email Office
                </a>
              </div>
            </div>
          </div>

          {/* RIGHT: OFFICIAL MESSAGE BODY */}
          <div className="ceo-letter-card">
            <div className="quote-mark-top">“</div>

            <div className="ceo-letter-inner">
              <div className="ceo-banner-callout">
                <span className="font-nepali tag-line">
                  {lang === "en" ? ceoMessage.taglineEn : ceoMessage.taglineNp}
                </span>
                <h4>
                  {lang === "en" ? ceoMessage.welcomeEn : ceoMessage.welcomeNp}
                </h4>
              </div>

              <p className="ceo-salutation">
                <strong>{lang === "en" ? ceoMessage.salutationEn : ceoMessage.salutationNp}</strong>
              </p>

              {lang === "en" ? (
                <div className="ceo-paragraphs">
                  {ceoMessage.paragraphsEn.slice(0, isCompact ? 3 : ceoMessage.paragraphsEn.length).map((para, idx) => (
                    <p key={idx}>{para}</p>
                  ))}
                  {isCompact && (
                    <div style={{ marginTop: "18px" }}>
                      <Link href="/about#ceo-message" className="btn btn-outline btn-sm">
                        Read Full CEO Letter (7 Paragraphs) <ArrowRight size={15} />
                      </Link>
                    </div>
                  )}
                </div>
              ) : (
                <div className="ceo-paragraphs font-nepali nepali-text-reading">
                  {ceoMessage.paragraphsNp.slice(0, isCompact ? 3 : ceoMessage.paragraphsNp.length).map((para, idx) => (
                    <p key={idx}>{para}</p>
                  ))}
                  {isCompact && (
                    <div style={{ marginTop: "18px" }}>
                      <Link href="/about#ceo-message" className="btn btn-outline btn-sm font-nepali">
                        पूर्ण सन्देश पढ्नुहोस् <ArrowRight size={15} />
                      </Link>
                    </div>
                  )}
                </div>
              )}

              {/* SIGN OFF BLOCK */}
              <div className="ceo-signoff">
                <div className="ceo-signature-motto font-nepali">
                  {lang === "en" ? ceoMessage.mottoEn : ceoMessage.mottoNp}
                </div>
                <div className="ceo-signature-name">
                  {lang === "en" ? ceoMessage.name : ceoMessage.nameNp}
                </div>
                <div className="ceo-signature-role">
                  {lang === "en" ? ceoMessage.title : ceoMessage.titleNp}
                </div>
                <div className="ceo-signature-corp">WakeUp Nepal Builders Pvt. Ltd.</div>
              </div>

              <div className="ceo-letter-actions">
                <Link href="/team" className="btn btn-blue">
                  <Users size={16} /> {lang === "en" ? "Meet Our Engineering Team →" : "हाम्रो प्राविधिक टोली हेर्नुहोस् →"}
                </Link>
                <Link href="/contact" className="btn btn-orange">
                  {lang === "en" ? "Schedule a Consultation →" : "परामर्शको लागि सम्पर्क गर्नुहोस् →"}
                </Link>
                <a href="tel:9864033256" className="btn btn-outline">
                  <Phone size={16} /> 9864033256 &nbsp;|&nbsp; 9851188296
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
