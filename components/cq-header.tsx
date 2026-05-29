"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

const NAV_LINKS = [
  { num: "01", label: "Home",     path: "/" },
  { num: "02", label: "Services", path: "/services" },
  { num: "03", label: "About",    path: "/about" },
  { num: "04", label: "Works",    path: "/works" },
  { num: "05", label: "Contact",  path: "/contact" },
];

const getPageName = (path: string) => {
  if (path === "/") return "";
  if (path === "/about") return "About";
  if (path === "/services") return "Services";
  if (path === "/works") return "Works";
  if (path === "/contact") return "Contact";
  if (path.startsWith("/services/")) {
    const slug = path.split("/").pop() || "";
    return slug
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }
  return "";
};

export default function CQHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const pageName = getPageName(pathname);
  const [prevPath, setPrevPath] = useState(pathname);
  if (pathname !== prevPath) {
    setPrevPath(pathname);
    setIsOpen(false);
  }

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 80);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on resize to desktop width (lg breakpoint: 1024px)
  useEffect(() => {
    const handler = () => {
      if (window.innerWidth >= 1024) setIsOpen(false);
    };
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  // Close on Escape key
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Lock body scroll when overlay menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <style>{`
        .cq-header-root {
          position: sticky;
          top: 0;
          z-index: 50;
          width: 100%;
          background: var(--cq-night);
        }

        .cq-nav-container {
          background: var(--cq-night);
          border-bottom: 0.5px solid var(--cq-night-border);
          transition: height 300ms ease, padding 300ms ease;
          display: flex;
          align-items: center;
          width: 100%;
          position: relative;
          z-index: 50;
        }

        .cq-nav-inner {
          width: 100%;
          margin: 0 auto;
          max-width: var(--max-width-content, 68rem);
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 16px;
        }
        @media (min-width: 768px) {
          .cq-nav-inner {
            padding: 0 20px;
          }
        }
        @media (min-width: 1024px) {
          .cq-nav-inner {
            padding: 0 32px;
          }
        }

        /* Logo styles */
        .cq-logo-link {
          display: flex;
          align-items: center;
          gap: 8px;
          text-decoration: none;
        }
        .cq-logo-symbol {
          font-size: 12px;
          color: var(--cq-teal);
          transition: transform 300ms ease;
          display: inline-block;
        }
        @media (min-width: 1024px) {
          .cq-logo-symbol {
            font-size: 14px;
          }
        }
        .cq-logo-link:hover .cq-logo-symbol {
          transform: rotate(30deg);
        }
        .cq-logo-stack {
          display: flex;
          flex-direction: column;
          line-height: 1;
        }
        .cq-logo-top {
          font-family: var(--font-body), sans-serif;
          font-size: 8px;
          font-weight: 200;
          letter-spacing: 0.32em;
          color: var(--cq-linen);
          text-transform: uppercase;
        }
        @media (min-width: 1024px) {
          .cq-logo-top {
            font-size: 9px;
          }
        }
        .cq-logo-bottom {
          font-family: var(--font-display), serif;
          font-style: italic;
          font-weight: 300;
          font-size: 18px;
          color: var(--cq-cream);
          line-height: 1.15;
          margin-top: 1px;
        }
        @media (min-width: 1024px) {
          .cq-logo-bottom {
            font-size: 21px;
          }
        }

        /* Desktop Nav Link styles */
        .cq-desktop-nav {
          display: none;
        }
        @media (min-width: 1024px) {
          .cq-desktop-nav {
            display: flex;
            gap: 28px;
            flex: 1;
            justify-content: center;
            align-items: center;
          }
        }
        .cq-nav-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 5px;
          cursor: pointer;
          text-decoration: none;
        }
        .nav-number {
          font-family: var(--font-body), sans-serif;
          font-size: 8.5px;
          font-weight: 400;
          letter-spacing: 0.05em;
          color: #9C978E;
          transition: color 150ms ease;
        }
        .nav-label {
          font-family: var(--font-body), sans-serif;
          font-size: 9.5px;
          font-weight: 400;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #C6BAA8;
          transition: color 150ms ease;
        }
        .nav-dot {
          width: 3px;
          height: 3px;
          border-radius: 50%;
          background: transparent;
          transition: background 150ms ease;
        }
        .cq-nav-item:hover .nav-number,
        .cq-nav-item.active .nav-number {
          color: var(--cq-teal);
        }
        .cq-nav-item:hover .nav-label,
        .cq-nav-item.active .nav-label {
          color: var(--cq-cream);
        }
        .cq-nav-item.active .nav-dot {
          background: var(--cq-teal);
        }

        /* CTA Button right */
        .cq-nav-right {
          display: flex;
          align-items: center;
        }
        .cq-nav-cta {
          display: none;
        }
        @media (min-width: 1024px) {
          .cq-nav-cta {
            display: inline-flex;
            align-items: center;
            background: var(--cq-parchment);
            color: var(--cq-night);
            font-family: var(--font-body), sans-serif;
            font-size: 10px;
            font-weight: 500;
            letter-spacing: 0.1em;
            text-transform: uppercase;
            padding: 9px 18px;
            border-radius: 2px;
            border: none;
            white-space: nowrap;
            cursor: pointer;
            transition: background 200ms ease;
            text-decoration: none;
          }
          .cq-nav-cta:hover {
            background: var(--cq-parchment-deep);
          }
          .cq-nav-cta span {
            display: inline-block;
            transition: transform 200ms ease;
            margin-left: 4px;
          }
          .cq-nav-cta:hover span {
            transform: translateX(4px);
          }
        }

        .cq-burger-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          background: none;
          border: none;
          cursor: pointer;
          width: 44px;
          height: 44px;
          padding: 0;
          color: var(--cq-cream);
        }
        @media (min-width: 1024px) {
          .cq-burger-btn {
            display: none;
          }
        }

        /* Overlay Link overlay text */
        .cq-overlay-link-span {
          font-family: var(--font-display), serif;
          font-size: clamp(36px, 8vw, 52px);
          font-weight: 300;
          color: #A8A39A;
          line-height: 1;
          transition: color 200ms;
        }
        .cq-overlay-link-item:hover .cq-overlay-link-span,
        .cq-overlay-link-item.active .cq-overlay-link-span {
          color: var(--cq-cream);
        }
        .cq-overlay-link-item:hover .cq-overlay-link-span {
          color: var(--cq-teal);
        }

        /* CTA mobile inside overlay */
        .cq-mobile-overlay-cta {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: var(--cq-parchment);
          color: var(--cq-night);
          font-family: var(--font-body), sans-serif;
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 12px 18px;
          border-radius: 2px;
          border: none;
          white-space: nowrap;
          cursor: pointer;
          transition: background 200ms ease;
          text-decoration: none;
          width: 100%;
          min-height: 44px;
        }
        .cq-mobile-overlay-cta:hover {
          background: var(--cq-parchment-deep);
        }
        .cq-mobile-overlay-cta span {
          display: inline-block;
          transition: transform 200ms ease;
          margin-left: 4px;
        }
        .cq-mobile-overlay-cta:hover span {
          transform: translateX(4px);
        }
      `}</style>

      <header className="cq-header-root">
        {/* Layer 1: Accent Line */}
        <div style={{ height: 2, background: "linear-gradient(90deg, var(--cq-forest), var(--cq-teal))", position: "relative" }} />

        {/* Layer 2: Main Nav Bar */}
        <div
          className="cq-nav-container"
          style={{
            height: scrolled ? 52 : 62,
          }}
        >
          <div className="cq-nav-inner">
            {/* Logo & Page Name */}
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <Link href="/" className="cq-logo-link" aria-label="Creative Quill">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src="https://creativequill.co.in/CQ_Logo_Black.svg" 
                  alt="Creative Quill" 
                  className="h-7 w-auto object-contain invert"
                />
                <span 
                  style={{
                    fontFamily: "var(--font-display), serif",
                    fontWeight: 400,
                    fontSize: "14px",
                    color: "var(--cq-cream)",
                    letterSpacing: "0.02em",
                    marginLeft: "4px",
                    display: "flex",
                    gap: "4px",
                  }}
                  className="sm:text-base"
                >
                  <span>Creative</span>
                  <span>Quill</span>
                </span>
              </Link>
              {pageName && (
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <span style={{ color: "rgba(255, 255, 255, 0.2)", fontSize: "14px", fontWeight: 200, userSelect: "none" }}>/</span>
                  <span 
                    style={{ 
                      fontSize: "10px", 
                      letterSpacing: "0.15em", 
                      textTransform: "uppercase", 
                      color: "var(--cq-cream)",
                      fontFamily: "var(--font-body), sans-serif",
                      fontWeight: 500
                    }}
                  >
                    {pageName}
                  </span>
                </div>
              )}
            </div>

            {/* Desktop Navigation */}
            <nav className="cq-desktop-nav">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.path;
                return (
                  <Link
                    href={link.path}
                    key={link.path}
                    className={`cq-nav-item${isActive ? " active" : ""}`}
                    aria-label={link.label}
                  >
                    <span className="nav-label">{link.label}</span>
                    <div className="nav-dot" />
                  </Link>
                );
              })}
            </nav>

            {/* Right: CTA & Hamburger */}
            <div className="cq-nav-right">
              <Button asChild className="cq-nav-cta">
                <Link href="/contact">
                  Let&apos;s Talk <span>&rarr;</span>
                </Link>
              </Button>

              <button
                className="cq-burger-btn"
                onClick={() => setIsOpen(!isOpen)}
                aria-label={isOpen ? "Close menu" : "Open menu"}
                aria-expanded={isOpen}
              >
                <div style={{ display: "flex", flexDirection: "column", gap: "5px", alignItems: "flex-end" }}>
                  <motion.div
                    animate={isOpen ? { rotate: 45, y: 6.5 } : { rotate: 0, y: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    style={{ width: 22, height: 1.5, background: "var(--cq-cream)", transformOrigin: "center" }}
                  />
                  <motion.div
                    animate={isOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    style={{ width: 16, height: 1.5, background: "var(--cq-cream)", transformOrigin: "right" }}
                  />
                  <motion.div
                    animate={isOpen ? { rotate: -45, y: -6.5 } : { rotate: 0, y: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    style={{ width: 22, height: 1.5, background: "var(--cq-cream)", transformOrigin: "center" }}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Full-Screen Overlay Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
              animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
              exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
              className="cq-mobile-overlay"
              onClick={(e) => {
                if (e.target === e.currentTarget) {
                  setIsOpen(false);
                }
              }}
              style={{
                position: "fixed",
                inset: 0,
                zIndex: 49,
                background: "var(--cq-night)",
                paddingTop: "calc(var(--header-height, 4rem) + 16px)",
                paddingLeft: "24px",
                paddingRight: "24px",
                paddingBottom: "40px",
                display: "flex",
                flexDirection: "column",
                height: "100dvh",
                overflowY: "auto",
              }}
            >
              <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: 0, flex: 1, padding: "20px 0" }}>
                {NAV_LINKS.map((link, index) => {
                  const isActive = pathname === link.path;
                  return (
                    <Link
                      href={link.path}
                      key={link.path}
                      onClick={() => setIsOpen(false)}
                      className={`cq-overlay-link-item${isActive ? " active" : ""}`}
                      aria-label={link.label}
                      style={{ textDecoration: "none" }}
                    >
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.07, duration: 0.35, ease: "easeOut" }}
                        style={{
                          display: "flex",
                          alignItems: "baseline",
                          gap: "12px",
                          borderBottom: "0.5px solid var(--cq-night-border)",
                          padding: "14px 0",
                        }}
                      >
                        <span className="cq-overlay-link-span">
                          {link.label}
                        </span>
                      </motion.div>
                    </Link>
                  );
                })}
              </div>

              <div
                style={{
                  borderTop: "0.5px solid var(--cq-night-border)",
                  paddingTop: "20px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                  alignItems: "center",
                }}
              >
                <Button asChild className="cq-mobile-overlay-cta">
                  <Link
                    href="/contact"
                    onClick={() => setIsOpen(false)}
                    data-cursor="button"
                  >
                    Let&apos;s Talk <span>&rarr;</span>
                  </Link>
                </Button>
                <span
                  style={{
                    fontSize: "11px",
                    color: "#4A4842",
                    letterSpacing: "0.05em",
                    fontFamily: "var(--font-body), sans-serif",
                    textTransform: "uppercase",
                  }}
                >
                  +91 88071 90545
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
