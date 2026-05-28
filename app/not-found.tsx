import Link from "next/link";
import type { Metadata } from "next";
import CQHeader from "@/components/cq-header";
import CQFooter from "@/components/cq-footer";

export const metadata: Metadata = {
  title: "Page Not Found | Creative Quill",
  description: "The page you're looking for doesn't exist. Return to Creative Quill's homepage.",
};

export default function NotFound() {
  return (
    <>
      <style>{`
        .nf-page {
          min-height: calc(100vh - 64px);
          background: var(--cq-cream);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 4rem 1.5rem;
        }
        .nf-container {
          max-width: 40rem;
          text-align: center;
        }
        .nf-code {
          font-family: var(--font-display);
          font-size: clamp(6rem, 20vw, 10rem);
          font-weight: 400;
          color: var(--cq-parchment-deep);
          line-height: 1;
          margin: 0 0 1rem;
          letter-spacing: -0.04em;
        }
        .nf-title {
          font-family: var(--font-display);
          font-size: clamp(1.5rem, 5vw, 2.5rem);
          font-weight: 400;
          color: var(--cq-ink);
          margin: 0 0 1rem;
          letter-spacing: var(--tracking-tight);
        }
        .nf-desc {
          font-family: var(--font-body);
          font-size: 0.95rem;
          font-weight: 300;
          color: var(--cq-ink-mid);
          line-height: var(--leading-body);
          max-width: 36ch;
          margin: 0 auto 2.5rem;
        }
        .nf-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
          justify-content: center;
        }
        .nf-btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          background: var(--cq-forest);
          color: var(--cq-parchment);
          font-family: var(--font-body);
          font-size: 0.75rem;
          font-weight: 500;
          letter-spacing: var(--tracking-wide);
          text-transform: uppercase;
          padding: 0.75rem 1.5rem;
          border-radius: var(--radius-sm);
          text-decoration: none;
          transition: background var(--transition-fast);
          min-height: 44px;
        }
        .nf-btn-primary:hover { background: var(--cq-forest-hover); }
        .nf-btn-ghost {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          background: transparent;
          color: var(--cq-ink-mid);
          font-family: var(--font-body);
          font-size: 0.75rem;
          font-weight: 500;
          letter-spacing: var(--tracking-wide);
          text-transform: uppercase;
          padding: 0.75rem 1.5rem;
          border-radius: var(--radius-sm);
          text-decoration: none;
          border: 1px solid var(--cq-linen);
          transition: border-color var(--transition-fast), color var(--transition-fast);
          min-height: 44px;
        }
        .nf-btn-ghost:hover {
          border-color: var(--cq-ink-mid);
          color: var(--cq-ink);
        }
        .nf-divider {
          width: 3rem;
          height: 2px;
          background: var(--cq-linen);
          margin: 2rem auto;
        }
        .nf-links {
          display: flex;
          flex-wrap: wrap;
          gap: 1.5rem;
          justify-content: center;
        }
        .nf-link {
          font-family: var(--font-body);
          font-size: 0.8rem;
          color: var(--cq-ink-muted);
          text-decoration: none;
          transition: color var(--transition-fast);
        }
        .nf-link:hover { color: var(--cq-forest); }
      `}</style>

      <CQHeader />
      <main className="nf-page">
        <div className="nf-container">
          <p className="nf-code" aria-hidden="true">404</p>
          <h1 className="nf-title">Page Not Found</h1>
          <p className="nf-desc">
            The page you&apos;re looking for doesn&apos;t exist or may have moved. Let&apos;s get you back on track.
          </p>

          <div className="nf-actions">
            <Link href="/" className="nf-btn-primary">
              ← Back to Home
            </Link>
            <Link href="/contact" className="nf-btn-ghost">
              Contact Us
            </Link>
          </div>

          <div className="nf-divider" />

          <nav className="nf-links" aria-label="Quick navigation">
            <Link href="/services" className="nf-link">Services</Link>
            <Link href="/works" className="nf-link">Works</Link>
            <Link href="/about" className="nf-link">About</Link>
          </nav>
        </div>
      </main>
      <CQFooter />
    </>
  );
}
