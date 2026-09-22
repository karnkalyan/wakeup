"use client";
import { useState } from "react";
import { CheckCircle2, AlertTriangle, ArrowRight } from "lucide-react";

export function ContactForm() {
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("sending");
    const f = e.currentTarget;
    const body = Object.fromEntries(new FormData(f));

    try {
      const r = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (r.ok) {
        setState("sent");
        f.reset();
      } else {
        setState("error");
      }
    } catch {
      setState("error");
    }
  }

  return (
    <form className="contact-form" onSubmit={submit}>
      <h3 style={{ margin: "0 0 4px", fontSize: "22px", color: "var(--navy-dark)" }}>
        Request a Free Consultation &amp; Estimate
      </h3>
      <p style={{ margin: "0 0 16px", fontSize: "14px", color: "var(--text-muted)" }}>
        Fill out the project details below and our engineering team will get in touch promptly.
      </p>

      <div className="form-grid-2">
        <div>
          <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, marginBottom: "6px", color: "var(--navy)" }}>
            Full Name *
          </label>
          <input name="name" placeholder="e.g. Ramesh Sharma" required />
        </div>
        <div>
          <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, marginBottom: "6px", color: "var(--navy)" }}>
            Phone Number *
          </label>
          <input name="phone" placeholder="e.g. 98XXXXXXXX" required />
        </div>
      </div>

      <div className="form-grid-2">
        <div>
          <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, marginBottom: "6px", color: "var(--navy)" }}>
            Email Address
          </label>
          <input name="email" type="email" placeholder="e.g. name@example.com" />
        </div>
        <div>
          <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, marginBottom: "6px", color: "var(--navy)" }}>
            Project Location
          </label>
          <input name="location" placeholder="e.g. Baneshwor, Kathmandu" />
        </div>
      </div>

      <div className="form-grid-2">
        <div>
          <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, marginBottom: "6px", color: "var(--navy)" }}>
            Project Type
          </label>
          <select name="projectType" defaultValue="">
            <option value="" disabled>Select Project Type</option>
            <option value="Residential House Construction">Residential House Construction</option>
            <option value="Commercial Building Construction">Commercial Building Construction</option>
            <option value="RCC & Structural Works">RCC &amp; Structural Works</option>
            <option value="Renovation & Remodeling">Renovation &amp; Remodeling</option>
            <option value="Interior Design & Execution">Interior Design &amp; Execution</option>
            <option value="MEP (Electrical & Plumbing)">MEP (Electrical &amp; Plumbing)</option>
            <option value="Construction Materials Supply">Construction Materials Supply</option>
            <option value="Turnkey Package Contract">Turnkey Package Contract</option>
          </select>
        </div>

        <div>
          <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, marginBottom: "6px", color: "var(--navy)" }}>
            Number of Floors / Land Area
          </label>
          <input name="area" placeholder="e.g. 2.5 Floors / 4 Aana" />
        </div>
      </div>

      <div>
        <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, marginBottom: "6px", color: "var(--navy)" }}>
          Project Scope &amp; Additional Details *
        </label>
        <textarea
          name="message"
          placeholder="Tell us about your land, requirements, expected start timeline, approximate budget or materials needed..."
          rows={4}
          required
        />
      </div>

      <button className="btn btn-orange" disabled={state === "sending"} style={{ width: "100%", padding: "16px", gap: "8px" }}>
        {state === "sending" ? "Submitting Request..." : (
          <>
            Request a Free Site Visit &amp; Project Estimate <ArrowRight size={16} />
          </>
        )}
      </button>

      {state === "sent" && (
        <div className="success" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <CheckCircle2 size={18} style={{ flexShrink: 0 }} />
          <span>Thank you! Your inquiry has been received. Our team will contact you within 24 hours.</span>
        </div>
      )}
      {state === "error" && (
        <div className="error" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <AlertTriangle size={18} style={{ flexShrink: 0 }} />
          <span>Unable to submit right now. Please call us directly at 9864033256 or 9851188296.</span>
        </div>
      )}
    </form>
  );
}
