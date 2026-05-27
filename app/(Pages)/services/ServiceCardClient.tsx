"use client";

import { useState } from "react";
import Link from "next/link";
import { useCardTilt } from "@/hooks/useCardTilt";

export interface ServiceItem {
  href: string;
  icon: string;
  name: string;
  desc: string;
  tags: string[];
  price: string;
  time: string;
}

export function ServiceCard({ svc, index }: { svc: ServiceItem; index: number }) {
  const { props, glareRef, isHovered, isMobile } = useCardTilt<HTMLAnchorElement>();

  const padZero = (n: number) => (n < 9 ? `0${n + 1}` : `${n + 1}`);

  return (
    <Link
      href={svc.href}
      className="sp-card"
      {...props}
      data-cursor="card"
      style={{
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Glare shine effect — controlled directly via DOM ref, no re-renders */}
      {!isMobile && (
        <div
          ref={glareRef}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
            zIndex: 3,
            opacity: 0,
            transition: "opacity 200ms ease",
          }}
        />
      )}

      {/* Watermark index */}
      <span
        className="sp-watermark"
        style={{
          position: "absolute",
          bottom: "-15px",
          right: "15px",
          fontSize: "7.5rem",
          fontFamily: "var(--font-serif)",
          fontWeight: 400,
          color: isHovered
            ? "color-mix(in oklch, var(--foreground) 16%, transparent)"
            : "var(--border)",
          opacity: 0.16,
          lineHeight: 1,
          pointerEvents: "none",
          transition: "color 0.3s ease",
          zIndex: 0,
        }}
      >
        {padZero(index)}
      </span>

      <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", height: "100%" }}>
        <div className="sp-card-icon">
          <ServiceIcon type={svc.icon} />
        </div>
        <h2 className="sp-card-name">{svc.name}</h2>
        <p className="sp-card-desc">{svc.desc}</p>
        <div className="sp-card-tags">
          {svc.tags.map((tag: string) => (
            <span key={tag} className="sp-tag">{tag}</span>
          ))}
        </div>
        <div className="sp-card-bottom" style={{ marginTop: "auto" }}>
          <span className="sp-card-price">{svc.price}</span>
          <span className="sp-card-time">
            <ClockIcon />
            <span>{svc.time}</span>
          </span>
        </div>
        <div className="sp-card-cta">Learn More →</div>
      </div>
    </Link>
  );
}

export function PricingCalculator() {
  const [service, setService] = useState("blog");
  const [wordCount, setWordCount] = useState(1000);
  const [turnaround, setTurnaround] = useState("standard");
  const [revisions, setRevisions] = useState("standard");

  const calculateEstimate = () => {
    let base = 0;

    if (service === "blog") {
      base = wordCount * 1.5;
    } else if (service === "article") {
      base = wordCount * 3.0;
    } else if (service === "brand") {
      base = 12000;
    } else if (service === "website") {
      base = 7000;
    } else if (service === "seo") {
      base = wordCount * 15;
    } else if (service === "custom") {
      return "Custom Scope — Let's Talk";
    }

    if (turnaround === "rush") {
      base *= 1.3;
    }

    if (revisions === "extra") {
      base += 500;
    }

    const min = Math.round(base * 0.9);
    const max = Math.round(base * 1.1);

    return `₹${min.toLocaleString()} – ₹${max.toLocaleString()}`;
  };

  const isPerWord = service === "blog" || service === "article" || service === "seo";

  return (
    <div
      style={{
        background: "var(--card)",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius-xl)",
        padding: "2.5rem",
        maxWidth: "42rem",
        margin: "4rem auto 0",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            background: "color-mix(in oklch, var(--primary) 10%, transparent)",
            color: "var(--primary)",
            fontSize: "0.68rem",
            fontWeight: 700,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            padding: "0.35rem 0.85rem",
            borderRadius: "999px",
            marginBottom: "0.5rem",
          }}
        >
          Pricing Calculator
        </span>
        <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "1.75rem", fontWeight: 600, color: "var(--foreground)" }}>
          Estimate Your Project Cost
        </h2>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        {/* Row 1: Service Type */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <label style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase" }}>
            Service Type
          </label>
          <select
            value={service}
            onChange={(e) => setService(e.target.value)}
            style={{
              padding: "0.75rem 1rem",
              borderRadius: "var(--radius-sm)",
              border: "1px solid var(--border)",
              background: "var(--background)",
              color: "var(--foreground)",
              outline: "none",
            }}
          >
            <option value="blog">Blog Writing (₹1.5/word)</option>
            <option value="article">Article Writing (₹3/word)</option>
            <option value="brand">Brand Storytelling (₹12,000 flat)</option>
            <option value="website">Website Copy (₹7,000 flat)</option>
            <option value="seo">SEO Content (₹15/word)</option>
            <option value="custom">Custom / Other Content</option>
          </select>
        </div>

        {/* Row 2: Word Count */}
        {isPerWord && (
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <label style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase" }}>
              Word Count
            </label>
            <input
              type="number"
              value={wordCount}
              onChange={(e) => setWordCount(Math.max(100, parseInt(e.target.value) || 0))}
              style={{
                padding: "0.75rem 1rem",
                borderRadius: "var(--radius-sm)",
                border: "1px solid var(--border)",
                background: "var(--background)",
                color: "var(--foreground)",
                outline: "none",
              }}
            />
          </div>
        )}

        {/* Row 3: Turnaround */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <label style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase" }}>
            Turnaround
          </label>
          <div style={{ display: "flex", gap: "0.5rem", background: "var(--secondary)", padding: "4px", borderRadius: "var(--radius-sm)" }}>
            <button
              onClick={() => setTurnaround("standard")}
              style={{
                flex: 1,
                padding: "0.5rem 1rem",
                borderRadius: "var(--radius-sm)",
                border: "none",
                fontSize: "0.75rem",
                fontWeight: 600,
                cursor: "pointer",
                background: turnaround === "standard" ? "var(--primary)" : "transparent",
                color: turnaround === "standard" ? "var(--primary-foreground)" : "var(--muted-foreground)",
              }}
            >
              Standard
            </button>
            <button
              onClick={() => setTurnaround("rush")}
              style={{
                flex: 1,
                padding: "0.5rem 1rem",
                borderRadius: "var(--radius-sm)",
                border: "none",
                fontSize: "0.75rem",
                fontWeight: 600,
                cursor: "pointer",
                background: turnaround === "rush" ? "var(--primary)" : "transparent",
                color: turnaround === "rush" ? "var(--primary-foreground)" : "var(--muted-foreground)",
              }}
            >
              Rush (+30%)
            </button>
          </div>
        </div>

        {/* Row 4: Revisions */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <label style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase" }}>
            Revisions
          </label>
          <div style={{ display: "flex", gap: "0.5rem", background: "var(--secondary)", padding: "4px", borderRadius: "var(--radius-sm)" }}>
            <button
              onClick={() => setRevisions("standard")}
              style={{
                flex: 1,
                padding: "0.5rem 1rem",
                borderRadius: "var(--radius-sm)",
                border: "none",
                fontSize: "0.75rem",
                fontWeight: 600,
                cursor: "pointer",
                background: revisions === "standard" ? "var(--primary)" : "transparent",
                color: revisions === "standard" ? "var(--primary-foreground)" : "var(--muted-foreground)",
              }}
            >
              2 Included
            </button>
            <button
              onClick={() => setRevisions("extra")}
              style={{
                flex: 1,
                padding: "0.5rem 1rem",
                borderRadius: "var(--radius-sm)",
                border: "none",
                fontSize: "0.75rem",
                fontWeight: 600,
                cursor: "pointer",
                background: revisions === "extra" ? "var(--primary)" : "transparent",
                color: revisions === "extra" ? "var(--primary-foreground)" : "var(--muted-foreground)",
              }}
            >
              Extra Round (+₹500)
            </button>
          </div>
        </div>

        {/* Results */}
        <div
          style={{
            borderTop: "1px solid var(--border)",
            paddingTop: "1.5rem",
            marginTop: "0.5rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <span style={{ fontSize: "0.75rem", color: "var(--muted-foreground)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
            Estimated Pricing
          </span>
          <span
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "1.85rem",
              fontWeight: 700,
              color: "var(--primary)",
              margin: "0.5rem 0 1rem",
            }}
          >
            {calculateEstimate()}
          </span>

          <Link href={`/contact?service=${service}`} className="btn-primary" style={{ width: "100%", textAlign: "center" }} data-cursor="button">
            Get Exact Quote
          </Link>
        </div>
      </div>
    </div>
  );
}

export function ClockIcon() {
  return (
    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} style={{ display: "inline-block", verticalAlign: "middle" }}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

export function ServiceIcon({ type }: { type: string }) {
  const base = "w-5 h-5 text-current";
  switch (type) {
    case "blog":
      return (
        <svg className={base} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      );
    case "article":
      return (
        <svg className={base} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
        </svg>
      );
    case "brand":
      return (
        <svg className={base} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      );
    case "website":
      return (
        <svg className={base} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
        </svg>
      );
    case "seo":
      return (
        <svg className={base} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      );
    case "custom":
      return (
        <svg className={base} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 19v-8.93a2 2 0 01.89-1.664l8-5.333a2 2 0 012.22 0l8 5.333A2 2 0 0121 10.07V19a2 2 0 01-2 2H5a2 2 0 01-2-2z" strokeMiterlimit="10" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 14l8-5.333a2 2 0 012.22 0L21 14" strokeMiterlimit="10" />
        </svg>
      );
    default:
      return null;
  }
}
