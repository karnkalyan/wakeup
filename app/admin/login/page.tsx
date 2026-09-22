import Link from "next/link";
import Image from "next/image";
import { Lock, Mail, ArrowLeft, AlertCircle } from "lucide-react";

export const metadata = {
  title: "Admin Login | WakeUp Nepal Builders CMS",
  description: "Secure administrative login portal for WakeUp Nepal Builders Pvt. Ltd.",
};

export default async function AdminLogin({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const q = await searchParams;

  return (
    <main className="admin-login">
      <div className="login-wrapper">
        <form action="/api/admin/login" method="post" className="login-card">
          {/* Logo & Header */}
          <div className="login-header">
            <div className="login-logo-wrap">
              <Image
                src="/logo/logo.png"
                alt="WakeUp Nepal Builders Logo"
                width={72}
                height={72}
                style={{ width: "64px", height: "64px", objectFit: "contain" }}
                priority
              />
            </div>
            <h1>WakeUp Nepal <span style={{ color: "var(--crimson)" }}>Builders</span></h1>
            <p className="login-subtitle">
              Secure CMS • Content &amp; Inquiries Management
            </p>
          </div>

          {/* Error Alert */}
          {q.error && (
            <div className="alert alert-error">
              <AlertCircle size={18} style={{ flexShrink: 0 }} />
              <div>
                <strong>Authentication Failed</strong>
                <p style={{ margin: 0, fontSize: "12.5px" }}>
                  Invalid email or password. Please try again.
                </p>
              </div>
            </div>
          )}

          {/* Form Fields */}
          <div className="login-field-group">
            <label htmlFor="email">Email Address</label>
            <div className="login-input-wrap">
              <Mail size={16} className="login-icon" />
              <input
                id="email"
                type="email"
                name="email"
                placeholder="admin@wakeupnepalbuilders.com"
                required
                autoComplete="email"
              />
            </div>
          </div>

          <div className="login-field-group">
            <label htmlFor="password">Password</label>
            <div className="login-input-wrap">
              <Lock size={16} className="login-icon" />
              <input
                id="password"
                type="password"
                name="password"
                placeholder="••••••••••••"
                required
                autoComplete="current-password"
              />
            </div>
          </div>

          <button className="btn btn-orange login-btn" type="submit">
            Sign In to Dashboard
          </button>

          <div className="login-footer">
            <Link href="/" className="login-back-link">
              <ArrowLeft size={14} /> Back to Website
            </Link>
          </div>
        </form>

        <div className="login-copyright">
          © {new Date().getFullYear()} WakeUp Nepal Builders Pvt. Ltd. Kathmandu, Nepal.
        </div>
      </div>
    </main>
  );
}
