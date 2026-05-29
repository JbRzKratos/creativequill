"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  img: string;
  fallback: string;
}

export interface Step {
  num: string;
  title: string;
  desc: string;
}

/* ── 1. PULL QUOTE ── */
export function PullQuote() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.65, ease: "easeOut" }}
      className="cq-pullquote-container"
      style={{
        position: "relative",
        borderLeft: "4px solid var(--primary)",
        maxWidth: "52rem",
        margin: "2rem auto",
      }}
    >
      <style>{`
        .cq-pullquote-container {
          padding: 2rem 1rem 2rem 2rem;
          margin: 2rem auto;
        }
        .cq-pullquote-mark {
          font-size: 3.5rem;
        }
        .cq-pullquote-text {
          font-size: 1.35rem;
        }
        @media (min-width: 768px) {
          .cq-pullquote-container {
            padding: 3rem 1.5rem 3rem 2.5rem;
            margin: 4rem auto;
          }
          .cq-pullquote-mark {
            font-size: 8rem;
          }
          .cq-pullquote-text {
            font-size: 2rem;
          }
        }
        @media (min-width: 1024px) {
          .cq-pullquote-text {
            font-size: 2.5rem;
          }
        }
      `}</style>
      {/* Quotation mark decoration */}
      <span
        className="cq-pullquote-mark"
        style={{
          position: "absolute",
          top: "-2.2rem",
          left: "0.5rem",
          fontFamily: "var(--font-serif)",
          fontWeight: 700,
          color: "var(--border)",
          lineHeight: 1,
          opacity: 0.35,
          pointerEvents: "none",
        }}
      >
        &ldquo;
      </span>
      <p
        className="cq-pullquote-text"
        style={{
          fontFamily: "var(--font-serif)",
          fontStyle: "italic",
          fontWeight: 600,
          lineHeight: 1.3,
          color: "var(--foreground)",
          margin: 0,
        }}
      >
        We didn&apos;t build Creative Quill to compete. We built it to change what &apos;good content&apos; means.
      </p>
    </motion.div>
  );
}

export function TeamSection({ team }: { team: TeamMember[] }) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const favWords = ["Clarity", "Speed", "Polish", "Focus"];

  return (
    <div style={{ display: "grid", gap: "1.5rem" }} className="cq-team-grid">
      {team.map((member, i) => {
        const isFounder = i === 0;
        const isHovered = hoveredIdx === i;

        return (
          <div
            key={member.name}
            style={{
              border: "1px solid var(--border)",
              background: "var(--card)",
              borderRadius: "var(--radius-lg)",
              overflow: "hidden",
              transition: "border-color 0.25s, box-shadow 0.25s",
              boxShadow: isHovered ? "0 12px 36px color-mix(in oklch, var(--foreground) 10%, transparent)" : "none",
            }}
            onMouseEnter={() => setHoveredIdx(i)}
            onMouseLeave={() => setHoveredIdx(null)}
            className="cq-member-card"
          >
            <div style={{ display: "flex", flexDirection: "column", height: "100%" }} className="cq-member-layout">
              {/* Image */}
              <div
                style={{
                  width: "100%",
                  aspectRatio: "4/4.5",
                  overflow: "hidden",
                  background: "var(--secondary)",
                  position: "relative",
                }}
                className="cq-member-img-wrap"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={member.fallback}
                  alt={member.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "top",
                    filter: isHovered ? "grayscale(0%)" : "grayscale(100%)",
                    transition: "filter 0.4s ease",
                  }}
                />

                {isFounder && (
                  <div
                    style={{
                      position: "absolute",
                      top: "1rem",
                      left: "1rem",
                      background: "var(--primary)",
                      color: "var(--primary-foreground)",
                      padding: "0.25rem 0.75rem",
                      fontSize: "0.68rem",
                      fontWeight: 700,
                      borderRadius: "var(--radius-sm)",
                      transform: "rotate(-2deg)",
                      boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
                    }}
                  >
                    Founder
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="cq-member-info" style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div>
                  <h3
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: "1.25rem",
                      color: "var(--foreground)",
                      margin: "0 0 0.2rem",
                    }}
                  >
                    {member.name}
                  </h3>
                  <p
                    style={{
                      fontSize: "0.68rem",
                      fontWeight: 600,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "var(--primary)",
                      margin: "0 0 0.85rem",
                    }}
                  >
                    {member.role}
                  </p>
                  <p style={{ fontSize: "0.8rem", color: "var(--muted-foreground)", lineHeight: 1.65, margin: 0 }}>
                    {member.bio}
                  </p>
                </div>

                {/* Favorite Word easter egg */}
                <div
                  className="cq-team-egg"
                  style={{
                    opacity: isHovered ? 0.75 : 0,
                    transition: "opacity 0.25s ease",
                    fontSize: "0.72rem",
                    color: "var(--muted-foreground)",
                    marginTop: "1.25rem",
                    fontStyle: "italic",
                    borderTop: "1px solid var(--border)",
                    paddingTop: "0.5rem",
                  }}
                >
                  Favorite word: &ldquo;{favWords[i]}&rdquo;
                </div>
              </div>
            </div>
          </div>
        );
      })}

      <style>{`
        .cq-team-grid { grid-template-columns: repeat(4, 1fr) !important; }
        .cq-member-info { padding: 0.75rem; }
        .cq-team-egg { display: none; }
        @media (min-width: 768px) {
          .cq-member-info { padding: 1.5rem; }
          .cq-team-egg { display: block; }
        }
        @media (max-width: 1024px) {
          .cq-team-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 767px) {
          .cq-team-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 480px) {
          .cq-team-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

/* ── 3. PROCESS TIMELINE ── */
export function ProcessTimeline({ steps }: { steps: Step[] }) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <div>
      {/* Desktop Horizontal */}
      <div className="hidden md:block" style={{ position: "relative", padding: "3rem 0" }}>
        {/* Connector Line */}
        <div style={{ position: "absolute", top: "78px", left: "60px", right: "60px", height: "4px", zIndex: 0 }}>
          <svg width="100%" height="4" viewBox="0 0 800 4" fill="none" preserveAspectRatio="none" style={{ width: "100%", height: "100%" }}>
            <line x1="0" y1="2" x2="800" y2="2" stroke="var(--border)" strokeWidth="2" strokeDasharray="5,5" />
          </svg>
        </div>

        <div
          style={{
            display: "flex",
            gap: "2rem",
            overflowX: "auto",
            scrollSnapType: "x mandatory",
            paddingBottom: "1.5rem",
          }}
          className="cq-scroll-snap"
        >
          {steps.map((step) => (
            <div
              key={step.num}
              style={{
                flex: "0 0 280px",
                scrollSnapAlign: "start",
                position: "relative",
                zIndex: 1,
              }}
            >
              {/* Circle */}
              <div style={{ display: "flex", justifyContent: "center", marginBottom: "1.5rem" }}>
                <div
                  style={{
                    width: "3.5rem",
                    height: "3.5rem",
                    borderRadius: "50%",
                    background: "var(--primary)",
                    color: "var(--primary-foreground)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.1rem",
                    fontWeight: 700,
                    boxShadow: "0 4px 10px color-mix(in oklch, var(--primary) 25%, transparent)",
                  }}
                >
                  0{step.num}
                </div>
              </div>

              {/* Card */}
              <div
                style={{
                  background: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--radius-md)",
                  padding: "1.5rem",
                  minHeight: "180px",
                }}
              >
                <h3 style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--foreground)", marginBottom: "0.5rem" }}>
                  {step.title}
                </h3>
                <p style={{ fontSize: "0.78rem", color: "var(--muted-foreground)", lineHeight: 1.6 }}>
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Accordion */}
      <div className="block md:hidden">
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {steps.map((step, i) => {
            const isOpen = openIdx === i;

            return (
              <div
                key={step.num}
                style={{
                  border: "1px solid var(--border)",
                  borderRadius: "var(--radius-md)",
                  background: "var(--card)",
                  overflow: "hidden",
                }}
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "1.1rem 1.25rem",
                    border: "none",
                    background: isOpen ? "var(--secondary)" : "transparent",
                    textAlign: "left",
                    cursor: "pointer",
                    transition: "background 0.2s",
                    borderLeft: isOpen ? "4px solid var(--primary)" : "none",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                    <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--primary)" }}>
                      0{step.num}
                    </span>
                    <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--foreground)" }}>
                      {step.title}
                    </span>
                  </div>
                  <span style={{ fontSize: "0.75rem", transition: "transform 0.2s", transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}>
                    ▼
                  </span>
                </button>

                {isOpen && (
                  <div style={{ padding: "1.25rem", fontSize: "0.8rem", color: "var(--muted-foreground)", lineHeight: 1.7, borderTop: "1px solid var(--border)" }}>
                    {step.desc}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
