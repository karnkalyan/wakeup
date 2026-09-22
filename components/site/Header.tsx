import Image from "next/image";
import Link from "next/link";
import { Phone, ArrowRight } from "lucide-react";

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
  return (
    <header className="topbar">
      <div className="container nav-wrap">
        <Link href="/" className="brand">
          <Image
            src="/logo/logo.png"
            alt="WakeUp Nepal Builders Pvt. Ltd. Logo"
            width={52}
            height={52}
            style={{ width: "48px", height: "48px", objectFit: "contain", borderRadius: "8px" }}
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
        <nav className="nav-links">
          {nav.map(([label, href]) => (
            <Link key={href} href={href}>
              {label}
            </Link>
          ))}
        </nav>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <a href="tel:9864033256" className="nav-contact-pill">
            <Phone size={14} style={{ color: "var(--crimson)" }} /> 9864033256
          </a>
          <Link className="btn btn-orange btn-sm" href="/contact">
            Free Estimate <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </header>
  );
}
