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

const footerTickerText = "BLOG WRITING · ARTICLE WRITING · BRAND STORYTELLING · WEBSITE COPY · SEO CONTENT · PRODUCT DESCRIPTIONS · CUSTOM CONTENT · ";

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
        
        /* SERVICES TICKER */
        .cq-footer-ticker {
          overflow: hidden;
          width: 100%;
          background: var(--cq-night);
          border-bottom: 0.5px solid var(--cq-night-border);
          display: flex;
          align-items: center;
          padding: 10px 0;
        }
        .cq-footer-ticker-inner {
          display: inline-flex;
          white-space: nowrap;
          animation: footerTickerScroll 25s linear infinite;
        }
        @keyframes footerTickerScroll {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
        .cq-footer-ticker-inner span {
          font-family: var(--font-body), sans-serif;
          font-size: 9px;
          font-weight: 500;
          letter-spacing: 0.15em;
          color: #8A857A;
          text-transform: uppercase;
        }
        @media (max-width: 768px) {
          .cq-footer-ticker-inner {
            animation: footerTickerScroll 35s linear infinite;
          }
          .cq-footer-ticker-inner span {
            font-size: 10px;
          }
        }

        .cq-footer-grid {
          max-width: 72rem;
          margin: 0 auto;
          padding: 3.5rem 1.5rem 2rem;
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
        }
        @media (min-width: 640px) {
          .cq-footer-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }
        @media (min-width: 1024px) {
          .cq-footer-grid {
            grid-template-columns: 2fr 1fr 1fr 2fr;
            gap: 2.5rem;
          }
        }
        
        .cq-footer-brand-col {
          display: flex;
          flex-direction: column;
        }
        @media (max-width: 768px) {
          .cq-footer-brand-col {
            text-align: center;
            align-items: center;
          }
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
        
        .cq-footer-links-wrapper {
          display: contents;
        }
        @media (max-width: 1023px) {
          .cq-footer-links-wrapper {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 1.5rem;
            grid-column: 1 / -1;
          }
        }

        .cq-footer-socials {
          display: flex;
          gap: 1rem;
          margin-top: 0.5rem;
          margin-bottom: 1.5rem;
        }
        .cq-footer-socials a {
          color: var(--muted-foreground);
          transition: color var(--transition-fast);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 44px;
          height: 44px;
        }
        .cq-footer-socials a:hover {
          color: var(--foreground);
        }

        .cq-nl-input-wrap {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          margin-top: 0.75rem;
          border: none;
        }
        .cq-nl-input {
          background: var(--background);
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          padding: 0.75rem 1rem;
          font-size: 16px;
          color: var(--foreground);
          outline: none;
          width: 100%;
          min-height: 44px;
        }
        .cq-nl-input::placeholder { color: var(--muted-foreground); }
        .cq-nl-btn {
          background: var(--primary);
          color: var(--primary-foreground);
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: var(--radius-sm);
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          cursor: pointer;
          transition: opacity 0.2s;
          white-space: nowrap;
          min-height: 44px;
          width: 100%;
        }
        .cq-nl-btn:hover { opacity: 0.85; }
        @media (min-width: 640px) {
          .cq-nl-input-wrap {
            flex-direction: row;
            border: 1px solid var(--border);
            border-radius: var(--radius-sm);
            gap: 0;
            overflow: hidden;
          }
          .cq-nl-input {
            border: none;
            border-radius: 0;
            font-size: 0.8rem;
            min-height: auto;
          }
          .cq-nl-btn {
            border-radius: 0;
            font-size: 0.65rem;
            min-height: auto;
            width: auto;
          }
        }

        .cq-footer-bottom {
          max-width: 72rem;
          margin: 0 auto;
          padding: 1.25rem 1.5rem;
          border-top: 1px solid var(--border);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.75rem;
          font-size: 0.68rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--muted-foreground);
          text-align: center;
        }
        @media (min-width: 768px) {
          .cq-footer-bottom {
            flex-direction: row;
            justify-content: space-between;
            text-align: left;
          }
        }
        .cq-footer-bottom-links { display: flex; gap: 1.5rem; }
        .cq-footer-bottom-link {
          color: var(--muted-foreground);
          text-decoration: none;
          transition: color 0.2s;
          display: inline-flex;
          align-items: center;
          min-height: 44px;
        }
        .cq-footer-bottom-link:hover { color: var(--foreground); }
        .cq-nl-success {
          font-size: 0.78rem;
          color: var(--muted-foreground);
          margin-top: 0.5rem;
          display: flex; align-items: center; gap: 0.4rem;
        }
      `}</style>

      {/* Services Ticker Strip */}
      <div className="cq-footer-ticker">
        <div className="cq-footer-ticker-inner">
          <span>{footerTickerText}</span>
          <span>{footerTickerText}</span>
        </div>
      </div>

      <footer className="cq-footer">
        <div className="cq-footer-grid">
          {/* Brand */}
          <div className="cq-footer-brand-col">
            <p className="cq-footer-brand-name">Creative Quill</p>
            <p className="cq-footer-brand-tag">Content That Connects</p>
            <p className="cq-footer-desc">
              Strategic content that converts browsers into buyers and transforms
              businesses into industry leaders.
            </p>
            <div className="cq-footer-socials">
              <a href="mailto:hello@creativequill.co.in" aria-label="Mail">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </a>
              <a href="tel:+918807190545" aria-label="Phone">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </a>
            </div>
          </div>

          <div className="cq-footer-links-wrapper">
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

            {/* Services Links */}
            <div>
              <p className="cq-footer-col-title">Services</p>
              <div className="cq-footer-links">
                <Link href="/services" className="cq-footer-link">Blog Writing</Link>
                <Link href="/services" className="cq-footer-link">Article Writing</Link>
                <Link href="/services" className="cq-footer-link">Brand Storytelling</Link>
                <Link href="/services" className="cq-footer-link">Website Copy</Link>
                <Link href="/services" className="cq-footer-link">SEO Content</Link>
              </div>
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
            <a href="mailto:hello@creativequill.co.in" className="cq-footer-bottom-link">
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
