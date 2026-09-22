"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone, ArrowRight, Menu, X, MessageCircle, MapPin } from "lucide-react";

const nav = [
  ["Home", "/"],
  ["About", "/about"],
  ["Services", "/services"],
  ["Materials", "/materials"],
  ["Projects", "/projects"],
  ["Our Team", "/team"],
  ["Contact", "/contact"]
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Close mobile drawer on route navigation
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  return (
    <header className="topbar">
      <div className="container nav-wrap">
        <Link href="/" className="brand" onClick={() => setMobileMenuOpen(false)}>
          <Image
            src="/logo/logo.png"
            alt="WakeUp Nepal Builders Pvt. Ltd. Logo"
            width={48}
            height={48}
            style={{ width: "44px", height: "44px", objectFit: "contain", borderRadius: "8px", flexShrink: 0 }}
            priority
          />
          <div className="brand-text">
            <span className="brand-title">
              WakeUp Nepal <span className="brand-highlight">Builders</span>
            </span>
            <span className="brand-subtitle font-nepali">
              विश्वास निर्माण • घर निर्माण • Kathmandu
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="nav-links">
          {nav.map(([label, href]) => {
            const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href);
            return (
              <Link key={href} href={href} className={isActive ? "active-nav-link" : ""}>
                {label}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Topbar Actions */}
        <div className="nav-actions-desktop">
          <a href="tel:9864033256" className="nav-contact-pill">
            <Phone size={14} style={{ color: "var(--crimson)" }} /> 9864033256
          </a>
          <Link className="btn btn-orange btn-sm" href="/contact">
            Free Estimate <ArrowRight size={14} />
          </Link>
        </div>

        {/* Mobile Action Buttons & Hamburger Toggle */}
        <div className="nav-actions-mobile">
          <a
            href="tel:9864033256"
            className="mobile-call-icon-btn"
            aria-label="Call 9864033256"
            title="Call WakeUp Nepal Builders"
          >
            <Phone size={18} />
          </a>
          <button
            type="button"
            className="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      <div
        className={`mobile-nav-overlay ${mobileMenuOpen ? "open" : ""}`}
        onClick={() => setMobileMenuOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile Slide-In Navigation Drawer */}
      <div
        className={`mobile-nav-drawer ${mobileMenuOpen ? "open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation"
      >
        <div className="mobile-drawer-header">
          <Link href="/" className="brand" onClick={() => setMobileMenuOpen(false)}>
            <Image
              src="/logo/logo.png"
              alt="WakeUp Nepal Builders Logo"
              width={40}
              height={40}
              style={{ width: "38px", height: "38px", objectFit: "contain", borderRadius: "6px" }}
            />
            <div className="brand-text">
              <span className="brand-title" style={{ fontSize: "16px" }}>
                WakeUp Nepal <span className="brand-highlight">Builders</span>
              </span>
              <span className="brand-subtitle font-nepali" style={{ fontSize: "10.5px" }}>
                विश्वास निर्माण • घर निर्माण
              </span>
            </div>
          </Link>
          <button
            type="button"
            className="mobile-drawer-close"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        <div className="mobile-drawer-body">
          <nav className="mobile-nav-links">
            {nav.map(([label, href]) => {
              const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href);
              return (
                <Link
                  key={href}
                  href={href}
                  className={`mobile-nav-item ${isActive ? "active" : ""}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span>{label}</span>
                  <ArrowRight size={16} className="mobile-nav-arrow" />
                </Link>
              );
            })}
          </nav>

          <div className="mobile-drawer-footer">
            <div className="mobile-drawer-info">
              <div className="mobile-info-row">
                <MapPin size={15} style={{ color: "var(--crimson)", flexShrink: 0 }} />
                <span>New Baneshwor, Kathmandu, Nepal</span>
              </div>
            </div>

            <div className="mobile-drawer-actions">
              <a href="tel:9864033256" className="mobile-drawer-btn btn-call">
                <Phone size={16} />
                <span>Call: 9864033256 / 9851188296</span>
              </a>

              <a
                href="https://wa.me/9779864033256"
                target="_blank"
                rel="noopener noreferrer"
                className="mobile-drawer-btn btn-wa"
              >
                <MessageCircle size={16} />
                <span>WhatsApp Instant Chat</span>
              </a>

              <Link
                href="/contact"
                className="btn btn-orange"
                style={{ width: "100%", justifyContent: "center", padding: "12px" }}
                onClick={() => setMobileMenuOpen(false)}
              >
                Get FREE Site Estimate <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
