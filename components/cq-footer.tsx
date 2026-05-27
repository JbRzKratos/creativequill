"use client";

import Link from "next/link";
import { useState } from "react";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/works", label: "Works" },
  { href: "/contact", label: "Contact" },
];

export default function CQFooter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <>
      <style>{`
        .cq-footer {
          background: var(--background);
          border-top: 1px solid var(--border);
        }
        .cq-footer-grid {
          max-width: 72rem;
          margin: 0 auto;
          padding: 3.5rem 1.5rem 2rem;
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 3rem;
        }
        @media (max-width: 900px) {
          .cq-footer-grid { grid-template-columns: 1fr 1fr; gap: 2rem; }
        }
        @media (max-width: 580px) {
          .cq-footer-grid { grid-template-columns: 1fr; gap: 2rem; }
        }
        .cq-footer-brand-name {
          font-size: 1rem;
          font-weight: 700;
          color: var(--foreground);
          margin: 0 0 2px;
        }
        .cq-footer-brand-tag {
          font-size: 0.75rem;
          color: var(--muted-foreground);
          margin: 0 0 0.75rem;
        }
        .cq-footer-desc {
          font-size: 0.8rem;
          color: var(--muted-foreground);
          line-height: 1.75;
          margin: 0 0 1.5rem;
        }
        .cq-footer-col-title {
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--foreground);
          margin: 0 0 1rem;
        }
        .cq-footer-links { display: flex; flex-direction: column; gap: 0.6rem; }
        .cq-footer-link {
          font-size: 0.8rem;
          color: var(--muted-foreground);
          text-decoration: none;
          transition: color 0.2s;
        }
        .cq-footer-link:hover { color: var(--foreground); }
        .cq-nl-input-wrap { display: flex; margin-top: 0.75rem; border-radius: var(--radius-sm); overflow: hidden; border: 1px solid var(--border); }
        .cq-nl-input {
          flex: 1; background: var(--background);
          border: none; padding: 0.65rem 0.85rem;
          font-size: 0.8rem; color: var(--foreground);
          outline: none;
        }
        .cq-nl-input::placeholder { color: var(--muted-foreground); }
        .cq-nl-btn {
          background: var(--primary); color: var(--primary-foreground);
          border: none; padding: 0 1rem;
          font-size: 0.65rem; font-weight: 700;
          letter-spacing: 0.1em; text-transform: uppercase;
          cursor: pointer; transition: opacity 0.2s;
          white-space: nowrap;
        }
        .cq-nl-btn:hover { opacity: 0.85; }
        .cq-footer-bottom {
          max-width: 72rem;
          margin: 0 auto;
          padding: 1.25rem 1.5rem;
          border-top: 1px solid var(--border);
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          align-items: center;
          gap: 0.75rem;
          font-size: 0.68rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--muted-foreground);
        }
        .cq-footer-bottom-links { display: flex; gap: 1.5rem; }
        .cq-footer-bottom-link {
          color: var(--muted-foreground);
          text-decoration: none;
          transition: color 0.2s;
        }
        .cq-footer-bottom-link:hover { color: var(--foreground); }
        .cq-nl-success {
          font-size: 0.78rem;
          color: var(--muted-foreground);
          margin-top: 0.5rem;
          display: flex; align-items: center; gap: 0.4rem;
        }
      `}</style>

      <footer className="cq-footer">
        <div className="cq-footer-grid">
          {/* Brand */}
          <div>
            <p className="cq-footer-brand-name">Creative Quill</p>
            <p className="cq-footer-brand-tag">Content That Connects</p>
            <p className="cq-footer-desc">
              Strategic content that converts browsers into buyers and transforms
              businesses into industry leaders.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <p className="cq-footer-col-title">Quick Links</p>
            <div className="cq-footer-links">
              {quickLinks.map(({ href, label }) => (
                <Link key={href} href={href} className="cq-footer-link">
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <p className="cq-footer-col-title">Newsletter</p>
            <p className="cq-footer-desc" style={{ marginBottom: "0" }}>
              Get content tips and exclusive offers.
            </p>
            {submitted ? (
              <p className="cq-nl-success">✓ You&apos;re subscribed!</p>
            ) : (
              <form
                className="cq-nl-input-wrap"
                onSubmit={(e) => {
                  e.preventDefault();
                  if (email) setSubmitted(true);
                }}
              >
                <input
                  id="footer-email"
                  name="email"
                  type="email"
                  className="cq-nl-input"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  aria-label="Email for newsletter"
                />
                <button type="submit" className="cq-nl-btn">
                  Join
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="cq-footer-bottom">
          <span>&copy; 2026 Creative Quill. All Rights Reserved.</span>
          <div className="cq-footer-bottom-links">
            <a href="mailto:sanzstudios14@gmail.com" className="cq-footer-bottom-link">
              Email
            </a>
            <a href="tel:+918807190545" className="cq-footer-bottom-link">
              +91 88071 90545
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
