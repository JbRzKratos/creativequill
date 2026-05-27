"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useCardTilt } from "@/hooks/useCardTilt";

function TiltImage({ src, alt }: { src: string; alt: string }) {
  const { props, glareRef, isMobile } = useCardTilt();
  return (
    <div
      {...props}
      style={{
        position: "relative",
        borderRadius: "var(--radius-lg)",
        overflow: "hidden",
        aspectRatio: "16/10",
        boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
        cursor: "pointer",
      }}
    >
      <img src={src} alt={alt} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
      {/* Glare element — driven directly by DOM ref, zero re-renders */}
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
    </div>
  );
}

export function HorizontalScrollCaseStudies({ projects }: { projects: any[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
  });

  const xTranslation = useTransform(scrollYProgress, [0, 1], ["0vw", "-200vw"]);
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    return scrollYProgress.onChange((latest) => {
      if (latest < 0.35) {
        setActiveIdx(0);
      } else if (latest < 0.7) {
        setActiveIdx(1);
      } else {
        setActiveIdx(2);
      }
    });
  }, [scrollYProgress]);

  return (
    <div>
      {/* Desktop Sticky Horizontal Scroll */}
      <div className="hidden lg:block" ref={containerRef} style={{ height: "300vh", position: "relative" }}>
        <div style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden", display: "flex", flexDirection: "column" }}>
          
          {/* Section Progress Bar */}
          <motion.div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "4px",
              background: "var(--primary)",
              scaleX: scrollYProgress,
              transformOrigin: "0%",
              zIndex: 10,
            }}
          />

          {/* Sliding horizontal container */}
          <motion.div
            style={{
              display: "flex",
              width: "300vw",
              height: "100%",
              x: xTranslation,
            }}
          >
            {/* Slide 1: Intro */}
            <div
              style={{
                width: "100vw",
                height: "100%",
                background: "var(--background)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                padding: "2rem",
              }}
            >
              <span
                style={{
                  background: "color-mix(in oklch, var(--primary) 10%, transparent)",
                  color: "var(--primary)",
                  fontSize: "0.68rem",
                  fontWeight: 700,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  padding: "0.35rem 0.85rem",
                  borderRadius: "999px",
                  marginBottom: "1rem",
                }}
              >
                Case Studies
              </span>
              <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "3.5rem", color: "var(--foreground)", margin: "0 0 1.25rem", lineHeight: 1.15 }}>
                Stories We&apos;ve Crafted,<br /><em>Results We&apos;ve Delivered</em>
              </h2>
              <p style={{ fontSize: "1rem", color: "var(--muted-foreground)", maxWidth: "32rem", lineHeight: 1.75, marginBottom: "2rem" }}>
                Scroll down to navigate through our featured works and see how we help businesses win with storytelling.
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.8rem", color: "var(--primary)" }}>
                <span>Scroll to browse</span>
                <span style={{ animation: "cq-bounce 1s infinite" }}>→</span>
              </div>
            </div>

            {/* Slides 2 & 3: Case Studies */}
            {projects.map((project) => (
              <div
                key={project.id}
                style={{
                  width: "100vw",
                  height: "100%",
                  background: "var(--background)",
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  alignItems: "center",
                  padding: "6rem 4rem",
                  gap: "4rem",
                }}
              >
                {/* Left Half: Sticky Text Info */}
                <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
                    <span style={{ background: "var(--primary)", color: "var(--primary-foreground)", fontSize: "0.62rem", fontWeight: 700, padding: "0.25rem 0.65rem", borderRadius: "999px", letterSpacing: "0.08em" }}>
                      {project.label}
                    </span>
                  </div>
                  <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "2.25rem", color: "var(--foreground)", margin: "0 0 0.5rem" }}>
                    {project.title}
                  </h3>
                  <p style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--primary)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "1.5rem" }}>
                    {project.subtitle}
                  </p>
                  <p style={{ fontSize: "0.9rem", color: "var(--muted-foreground)", lineHeight: 1.7, marginBottom: "1.5rem" }}>
                    {project.desc}
                  </p>
                  <div style={{ borderLeft: "3px solid var(--primary)", paddingLeft: "1rem", background: "var(--secondary)", padding: "1rem", borderRadius: "0 8px 8px 0" }}>
                    <p style={{ fontSize: "0.62rem", fontWeight: 700, textTransform: "uppercase", color: "var(--primary)", marginBottom: "0.25rem" }}>
                      Outcome
                    </p>
                    <p style={{ fontSize: "0.82rem", color: "var(--muted-foreground)", margin: 0, lineHeight: 1.6 }}>
                      {project.outcome}
                    </p>
                  </div>
                </div>

                {/* Right Half: Visual Media, tags, deliverables */}
                <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                  <TiltImage src={project.img} alt={project.title} />
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                    {project.tags.map((t: string) => (
                      <span key={t} style={{ fontSize: "0.68rem", background: "var(--secondary)", color: "var(--foreground)", padding: "0.25rem 0.65rem", borderRadius: "var(--radius-sm)", border: "1px solid var(--border)" }}>
                        {t}
                      </span>
                    ))}
                  </div>
                  <div>
                    <p style={{ fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase", color: "var(--muted-foreground)", marginBottom: "0.5rem" }}>
                      Deliverables
                    </p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem 1.5rem" }}>
                      {project.deliverables.map((d: string) => (
                        <span key={d} style={{ fontSize: "0.78rem", color: "var(--muted-foreground)", display: "flex", alignItems: "center", gap: "0.25rem" }}>
                          <span style={{ color: "var(--primary)" }}>→</span> {d}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div style={{ marginTop: "1rem" }}>
                    <Link href="/contact" className="btn-primary" data-cursor="button">
                      Start a Similar Project
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Dots Indicator at bottom center */}
          <div style={{ position: "absolute", bottom: "2rem", left: "50%", transform: "translateX(-50%)", display: "flex", gap: "0.75rem", zIndex: 10 }}>
            {Array.from({ length: 3 }).map((_, idx) => (
              <div
                key={idx}
                style={{
                  position: "relative",
                  width: "12px",
                  height: "12px",
                  borderRadius: "50%",
                  border: "2px solid var(--border)",
                  cursor: "pointer",
                }}
              >
                {activeIdx === idx && (
                  <motion.div
                    layoutId="activeDot"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      borderRadius: "50%",
                      background: "var(--primary)",
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Stack Experience */}
      <div className="block lg:hidden" style={{ background: "var(--background)", padding: "2rem 1.5rem" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "3.5rem" }}>
          {/* Mobile Hero Header */}
          <div style={{ textAlign: "center", marginBottom: "1rem" }}>
            <span
              style={{
                display: "inline-flex",
                background: "color-mix(in oklch, var(--primary) 10%, transparent)",
                color: "var(--primary)",
                fontSize: "0.68rem",
                fontWeight: 700,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                padding: "0.35rem 0.85rem",
                borderRadius: "999px",
                marginBottom: "1rem",
              }}
            >
              Case Studies
            </span>
            <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "2.25rem", color: "var(--foreground)", margin: "0 0 1rem", lineHeight: 1.2 }}>
              Stories We&apos;ve Crafted,<br /><em>Results We&apos;ve Delivered</em>
            </h2>
            <p style={{ fontSize: "0.85rem", color: "var(--muted-foreground)", lineHeight: 1.6, margin: "0 auto", maxWidth: "28rem" }}>
              Browse through our featured works and see how we help businesses win with storytelling.
            </p>
          </div>

          {projects.map((project) => (
            <div key={project.id} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              <TiltImage src={project.img} alt={project.title} />
              <div>
                <span style={{ background: "var(--primary)", color: "var(--primary-foreground)", fontSize: "0.62rem", fontWeight: 700, padding: "0.25rem 0.65rem", borderRadius: "999px" }}>
                  {project.label}
                </span>
                <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.75rem", color: "var(--foreground)", margin: "0.75rem 0 0.25rem" }}>
                  {project.title}
                </h3>
                <p style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--primary)", textTransform: "uppercase", marginBottom: "1rem" }}>
                  {project.subtitle}
                </p>
                <p style={{ fontSize: "0.85rem", color: "var(--muted-foreground)", lineHeight: 1.7, marginBottom: "1.25rem" }}>
                  {project.desc}
                </p>
                <div style={{ borderLeft: "3px solid var(--primary)", paddingLeft: "1rem", background: "var(--secondary)", padding: "1rem", borderRadius: "0 8px 8px 0", marginBottom: "1.25rem" }}>
                  <p style={{ fontSize: "0.62rem", fontWeight: 700, textTransform: "uppercase", color: "var(--primary)", marginBottom: "0.25rem" }}>
                    Outcome
                  </p>
                  <p style={{ fontSize: "0.8rem", color: "var(--muted-foreground)", margin: 0 }}>
                    {project.outcome}
                  </p>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "1.25rem" }}>
                  {project.tags.map((t: string) => (
                    <span key={t} style={{ fontSize: "0.65rem", background: "var(--secondary)", color: "var(--foreground)", padding: "0.2rem 0.5rem", borderRadius: "4px", border: "1px solid var(--border)" }}>
                      {t}
                    </span>
                  ))}
                </div>
                <Link href="/contact" className="btn-primary" style={{ width: "100%", textAlign: "center" }} data-cursor="button">
                  Start a Similar Project
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes cq-bounce {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(4px); }
        }
      `}</style>
    </div>
  );
}
