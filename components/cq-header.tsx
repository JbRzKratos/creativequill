"use client";

import { useState, useEffect, useRef } from "react";
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
  const headerRef = useRef<HTMLElement>(null);

  // Close on resize to desktop
  useEffect(() => {
    const handler = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  // Close on Escape key
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  // Measure header height and expose as CSS var so the fixed dropdown
  // always sits flush below the header regardless of device / font scale.
  useEffect(() => {
    const updateHeight = () => {
      if (headerRef.current) {
        const h = headerRef.current.getBoundingClientRect().height;
        document.documentElement.style.setProperty("--cq-header-h", `${h}px`);
      }
    };
    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  // Close menu when route changes
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <style>{`
        .cq-header {
          background: #121212;
          color: #ffffff;
          position: sticky;
          top: 0;
          z-index: 1000;
          width: 100%;
          border-bottom: 1px solid #222222;
          overflow: visible !important;
        }
        .cq-header-inner {
          max-width: 72rem;
          margin: 0 auto;
          padding: 1.1rem 1.5rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .cq-logo-wrapper {
          text-decoration: none;
          display: flex;
          flex-direction: column;
          line-height: 1.1;
        }
        .cq-logo-brand {
          display: flex;
          align-items: baseline;
          gap: 0.15rem;
        }
        .cq-logo-creative {
          font-family: var(--font-sans), sans-serif;
          color: #ffffff;
          font-size: 0.88rem;
          font-weight: 800;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          transition: color 0.3s ease;
        }
        .cq-logo-quill {
          font-family: var(--font-serif), serif;
          font-style: italic;
          color: var(--primary);
          font-size: 1.1rem;
          font-weight: 700;
          letter-spacing: 0.02em;
          position: relative;
          transition: text-shadow 0.3s ease, transform 0.3s ease;
          display: inline-block;
        }
        .cq-logo-wrapper:hover .cq-logo-quill {
          text-shadow: 0 0 8px color-mix(in oklch, var(--primary) 50%, transparent);
          transform: translateY(-1px) rotate(-2deg);
        }
        .cq-logo-wrapper:hover .cq-logo-creative {
          color: var(--primary);
        }
        .cq-logo-tagline {
          display: block;
          font-size: 0.55rem;
          letter-spacing: 0.16em;
          font-weight: 500;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.45);
          margin-top: 1px;
          transition: color 0.3s ease;
        }
        .cq-logo-wrapper:hover .cq-logo-tagline {
          color: rgba(255, 255, 255, 0.85);
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
          /* Ensure 44×44px touch target */
          width: 44px; height: 44px;
          display: none;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          border-radius: 4px;
          transition: background 0.15s;
        }
        .cq-burger:active { background: rgba(255,255,255,0.08); }
        .cq-mobile-overlay {
          display: none;
          position: fixed; inset: 0;
          z-index: 998;
          background: rgba(0,0,0,0.5);
          backdrop-filter: blur(2px);
        }
        .cq-mobile-overlay.open { display: block; }
        .cq-mobile-nav {
          max-height: 0; opacity: 0; overflow: hidden;
          transition: max-height 0.35s cubic-bezier(0.4,0,0.2,1), opacity 0.25s ease;
          background: #121212;
          border-top: 1px solid #222222;
          /* Fixed to viewport top so it's always visible regardless of scroll */
          position: fixed;
          top: var(--cq-header-h, 56px); /* always flush below the sticky header */
          left: 0;
          width: 100%;
          z-index: 999;
          box-shadow: 0 8px 32px rgba(0,0,0,0.35);
        }
        .cq-mobile-nav.open { max-height: 460px; opacity: 1; }
        .cq-mobile-nav-inner {
          display: flex; flex-direction: column; align-items: center;
          padding: 1rem 1.5rem 1.5rem; gap: 0;
        }
        /* Mobile nav links: full-width, 48px tap targets */
        .cq-mobile-nav-inner .cq-nav-link {
          width: 100%; text-align: center;
          padding: 0.85rem 0;
          min-height: 48px;
          display: flex; align-items: center; justify-content: center;
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }
        .cq-mobile-divider {
          width: 100%; border: none;
          border-top: 1px solid #222222;
          margin: 0.5rem 0;
        }
        .cq-mobile-cta {
          margin-top: 0.75rem;
          background: var(--primary);
          color: var(--primary-foreground);
          font-size: 0.68rem; font-weight: 700;
          letter-spacing: 0.15em; text-transform: uppercase;
          padding: 0.9rem 2.5rem;
          border-radius: var(--radius-sm);
          text-decoration: none;
          min-height: 48px;
          display: flex; align-items: center; justify-content: center;
        }
        @media (max-width: 767px) {
          .cq-nav, .cq-header-actions { display: none !important; }
          .cq-burger { display: flex !important; }
          .cq-header-inner { padding: 0.75rem 1rem; }
        }
      `}</style>

      <header className="cq-header" ref={headerRef}>
        <div className="cq-header-inner">
          <Link href="/" className="cq-logo-wrapper">
            <span className="cq-logo-brand">
              <span className="cq-logo-creative">Creative</span>
              <span className="cq-logo-quill">Quill</span>
            </span>
            <span className="cq-logo-tagline">Content That Connects</span>
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
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>
        </div>

        {/* Backdrop overlay — tap to close */}
        <div
          className={`cq-mobile-overlay${menuOpen ? " open" : ""}`}
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />

        <div className={`cq-mobile-nav${menuOpen ? " open" : ""}`} role="navigation" aria-label="Mobile navigation">
          <div className="cq-mobile-nav-inner">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`cq-nav-link${pathname === href ? " active" : ""}`}
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
