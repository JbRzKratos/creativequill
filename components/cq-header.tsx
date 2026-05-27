"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/works", label: "Works" },
  { href: "/contact", label: "Contact" },
];

export default function CQHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handler = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  return (
    <>
      <style>{`
        .cq-header {
          background: #121212;
          color: #ffffff;
          position: sticky;
          top: 0;
          z-index: 50;
          width: 100%;
          border-bottom: 1px solid #222222;
        }
        .cq-header-inner {
          max-width: 72rem;
          margin: 0 auto;
          padding: 1.1rem 1.5rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .cq-logo {
          color: #ffffff;
          text-decoration: none;
          font-size: 0.85rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          font-weight: 600;
          line-height: 1.2;
        }
        .cq-logo span {
          display: block;
          font-size: 0.6rem;
          letter-spacing: 0.15em;
          font-weight: 400;
          opacity: 0.65;
          margin-top: 1px;
        }
        .cq-nav { display: flex; gap: 1.75rem; align-items: center; }
        .cq-nav-link {
          position: relative;
          color: rgba(255, 255, 255, 0.70);
          text-decoration: none;
          font-size: 0.68rem;
          letter-spacing: 0.2em;
          font-weight: 500;
          text-transform: uppercase;
          transition: color 0.2s;
          padding-bottom: 2px;
        }
        .cq-nav-link::after {
          content: '';
          position: absolute;
          bottom: -2px; left: 0;
          width: 0; height: 1px;
          background: var(--primary);
          transition: width 0.25s ease;
        }
        .cq-nav-link:hover,
        .cq-nav-link.active { color: var(--primary); }
        .cq-nav-link:hover::after,
        .cq-nav-link.active::after { width: 100%; }
        .cq-header-actions { display: flex; align-items: center; gap: 1rem; }
        .cq-btn-talk {
          background: var(--primary);
          color: var(--primary-foreground);
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          padding: 0.55rem 1.25rem;
          border-radius: var(--radius-sm);
          text-decoration: none;
          transition: opacity 0.2s;
          white-space: nowrap;
        }
        .cq-btn-talk:hover { opacity: 0.88; }
        .cq-burger {
          background: none; border: none;
          color: #ffffff;
          cursor: pointer; font-size: 1.2rem;
          padding: 0.4rem;
          display: none;
        }
        .cq-mobile-nav {
          max-height: 0; opacity: 0; overflow: hidden;
          transition: max-height 0.3s ease, opacity 0.3s ease;
          background: #121212;
          border-top: 1px solid #222222;
          position: absolute; top: 100%; left: 0; width: 100%; z-index: 40;
        }
        .cq-mobile-nav.open { max-height: 420px; opacity: 1; }
        .cq-mobile-nav-inner {
          display: flex; flex-direction: column; align-items: center;
          padding: 1.25rem 1.5rem; gap: 0.75rem;
        }
        .cq-mobile-divider {
          width: 100%; border: none;
          border-top: 1px solid #222222;
          margin: 0.25rem 0;
        }
        .cq-mobile-cta {
          margin-top: 0.5rem;
          background: var(--primary);
          color: var(--primary-foreground);
          font-size: 0.68rem; font-weight: 700;
          letter-spacing: 0.15em; text-transform: uppercase;
          padding: 0.75rem 2rem;
          border-radius: var(--radius-sm);
          text-decoration: none;
        }
        @media (max-width: 767px) {
          .cq-nav, .cq-header-actions { display: none !important; }
          .cq-burger { display: flex !important; }
        }
      `}</style>

      <header className="cq-header" style={{ position: "relative" }}>
        <div className="cq-header-inner">
          <Link href="/" className="cq-logo">
            Creative Quill
            <span>Content That Connects</span>
          </Link>

          <nav className="cq-nav">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`cq-nav-link${pathname === href ? " active" : ""}`}
              >
                {label}
              </Link>
            ))}
          </nav>

          <div className="cq-header-actions">
            <Link href="/contact" className="cq-btn-talk">
              Let&apos;s Talk
            </Link>
          </div>

          <button
            className="cq-burger"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>

        <div className={`cq-mobile-nav${menuOpen ? " open" : ""}`}>
          <div className="cq-mobile-nav-inner">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`cq-nav-link${pathname === href ? " active" : ""}`}
                style={{ padding: "0.5rem 0" }}
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </Link>
            ))}
            <hr className="cq-mobile-divider" />
            <Link href="/contact" className="cq-mobile-cta" onClick={() => setMenuOpen(false)}>
              Let&apos;s Talk
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}
