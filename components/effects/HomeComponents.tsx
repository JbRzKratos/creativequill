"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useInView, AnimatePresence } from "framer-motion";
import Link from "next/link";

/* ── 1. PROXIMITY GRID ── */
export function ProximityGrid() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    // Skip JS-heavy proximity effect on touch/mobile devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const dots = Array.from(svg.querySelectorAll("circle"));

    const onMouseMove = (e: MouseEvent) => {
      const rect = svg.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      for (let i = 0; i < dots.length; i++) {
        const dot = dots[i];
        const cx = parseFloat(dot.getAttribute("cx") || "0");
        const cy = parseFloat(dot.getAttribute("cy") || "0");

        const dx = mouseX - cx;
        const dy = mouseY - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 80) {
          const scale = 1.8 - (dist / 80) * 0.8;
          dot.setAttribute("r", (1.5 * scale).toString());
          dot.style.fill = "var(--primary)";
          dot.style.opacity = (0.2 + (1 - dist / 80) * 0.8).toString();
        } else {
          dot.setAttribute("r", "1.5");
          dot.style.fill = "var(--border)";
          dot.style.opacity = "0.25";
        }
      }
    };

    const onMouseLeave = () => {
      for (let i = 0; i < dots.length; i++) {
        const dot = dots[i];
        dot.setAttribute("r", "1.5");
        dot.style.fill = "var(--border)";
        dot.style.opacity = "0.25";
      }
    };

    svg.addEventListener("mousemove", onMouseMove);
    svg.addEventListener("mouseleave", onMouseLeave);
    return () => {
      svg.removeEventListener("mousemove", onMouseMove);
      svg.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  const cols = 22;
  const rows = 28;
  const spacing = 13;
  const elements = [];

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      elements.push(
        <circle
          key={`${r}-${c}`}
          cx={c * spacing + 12}
          cy={r * spacing + 12}
          r={1.5}
          fill="var(--border)"
          opacity={0.25}
          style={{ transition: "r 200ms ease-out, fill 200ms ease-out, opacity 200ms ease-out" }}
        />
      );
    }
  }

  return (
    <div style={{ position: "relative", width: "100%", height: "360px" }}>
      {/* Abstract Quill stroke */}
      <svg
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 1,
          pointerEvents: "none",
        }}
      >
        <motion.path
          d="M 50,300 C 110,210 180,120 250,60"
          stroke="var(--secondary)"
          strokeWidth={8}
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.18 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
      </svg>

      <svg
        ref={svgRef}
        width="100%"
        height="100%"
        viewBox="0 0 300 360"
        style={{ overflow: "hidden", display: "block" }}
      >
        {elements}
      </svg>
    </div>
  );
}

const phrases = [
  "Bringing your brand stories to life...",
  "Content that ranks, resonates, and converts...",
  "The internet needs more human voices...",
];

/* ── 2. TYPEWRITER TAGLINE ── */
export function TypewriterTagline() {
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentPhrase = phrases[phraseIdx];
    let timer: NodeJS.Timeout;

    if (isDeleting) {
      timer = setTimeout(() => {
        setText(currentPhrase.substring(0, text.length - 1));
      }, 20);
    } else {
      timer = setTimeout(() => {
        setText(currentPhrase.substring(0, text.length + 1));
      }, 45);
    }

    if (!isDeleting && text === currentPhrase) {
      timer = setTimeout(() => setIsDeleting(true), 3000);
    } else if (isDeleting && text === "") {
      timer = setTimeout(() => {
        setIsDeleting(false);
        setPhraseIdx((prev) => (prev + 1) % phrases.length);
      }, 300);
    }

    return () => clearTimeout(timer);
  }, [text, isDeleting, phraseIdx]);

  return (
    <span className="typewriter-text" style={{ position: "relative" }}>
      {text}
      <span
        style={{
          marginLeft: "2px",
          borderLeft: "2px solid var(--primary)",
          animation: "cq-blink 850ms infinite",
        }}
      />
      <style>{`
        @keyframes cq-blink {
          0%, 100% { opacity: 0; }
          50% { opacity: 1; }
        }
      `}</style>
    </span>
  );
}

/* ── 3. STATS STRIP ── */
function CountUp({ end, suffix = "", duration = 1500 }: { end: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (!isInView) return;
    const startTime = performance.now();

    const update = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = progress * (2 - progress);
      setCount(Math.floor(ease * end));

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        setCount(end);
      }
    };

    requestAnimationFrame(update);
  }, [end, duration, isInView]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}{suffix}
    </span>
  );
}

export function StatsStrip() {
  return (
    <div
      style={{
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
        background: "var(--card)",
        padding: "1.5rem 1rem",
        margin: "2.5rem 0",
      }}
    >
      <div
        style={{
          maxWidth: "64rem",
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "1.5rem",
        }}
      >
        {[
          { num: 500000, suffix: "+", label: "Words Written" },
          { num: 50, suffix: "+", label: "Happy Clients" },
          { num: 100, suffix: "%", label: "Human-Written" },
          { num: 48, suffix: "hrs", label: "Avg Delivery" },
        ].map((stat, i, arr) => (
          <div
            key={stat.label}
            style={{
              flex: "1 1 120px",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              /* vertical dividers hidden on mobile via CSS below */
              borderRight: i < arr.length - 1 ? "1px solid var(--border)" : "none",
            }}
            className="cq-stat-item"
          >
            <span
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "1.75rem",
                fontWeight: 700,
                color: "var(--foreground)",
              }}
            >
              <CountUp end={stat.num} suffix={stat.suffix} />
            </span>
            <span
              style={{
                fontSize: "0.72rem",
                letterSpacing: "0.05em",
                color: "var(--muted-foreground)",
                marginTop: "0.25rem",
                textTransform: "uppercase",
              }}
            >
              {stat.label}
            </span>
          </div>
        ))}
      </div>
      <style>{`
        @media (max-width: 640px) {
          .cq-stat-item { border-right: none !important; flex: 1 1 calc(50% - 0.75rem); }
        }
      `}</style>
    </div>
  );
}

/* ── 4. CLIENT LOGO MARQUEE ── */
export function ClientMarquee() {
  const logos = ["TIGER SAFARI", "BEEONLINE", "TECHPULSE", "CREATIVEFLOW", "ECOTRAVEL", "CLOUDCORE"];

  return (
    <div style={{ padding: "1.5rem 0", background: "var(--background)", overflow: "hidden", position: "relative" }}>
      <p
        style={{
          textAlign: "center",
          fontSize: "0.68rem",
          fontWeight: 600,
          letterSpacing: "0.15em",
          color: "var(--muted-foreground)",
          textTransform: "uppercase",
          marginBottom: "1rem",
        }}
      >
        Trusted by Businesses Across India
      </p>

      <div className="cq-marquee-container" style={{ display: "flex", overflow: "hidden", width: "100%" }}>
        <div className="cq-marquee-inner" style={{ display: "flex", gap: "4rem", whiteSpace: "nowrap" }}>
          {/* List 1 */}
          {logos.concat(logos).map((logo, idx) => (
            <span
              key={idx}
              style={{
                fontFamily: "var(--font-serif)",
                fontWeight: 600,
                fontSize: "1.1rem",
                letterSpacing: "0.2em",
                color: "var(--foreground)",
                opacity: 0.45,
                transition: "opacity 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.45")}
            >
              {logo}
            </span>
          ))}
        </div>
      </div>

      <style>{`
        .cq-marquee-container {
          mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
        }
        .cq-marquee-inner {
          animation: marquee-scroll 55s linear infinite;
        }
        .cq-marquee-container:hover .cq-marquee-inner {
          animation-play-state: paused;
        }
        @keyframes marquee-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}

/* ── 5. BENTO GRID ── */
export function BentoGrid() {
  return (
    <div style={{ display: "grid", gap: "1.25rem", gridTemplateColumns: "repeat(3, 1fr)" }} className="cq-bento">
      {/* Cell 1: Unmistakably You (2 cols, tall) */}
      <div
        style={{
          gridColumn: "span 2",
          background: "color-mix(in oklch, var(--primary) 7%, var(--background))",
          border: "2px solid var(--border)",
          borderRadius: "var(--radius-xl)",
          padding: "2.25rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          position: "relative",
          overflow: "hidden",
          transition: "border-color 0.2s",
        }}
        className="bento-cell"
      >
        <div>
          <span style={{ fontSize: "1.8rem", fontWeight: 700, opacity: 0.2, color: "var(--primary)" }}>01</span>
          <div style={{ color: "var(--primary)", margin: "1rem 0" }}>
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 009 11a5 5 0 00-10 0c0 1.02.166 2 .47 2.932m16.513.08a13.947 13.947 0 011.539-1.118m-3.003-2.91a2.169 2.169 0 00-3.32-.34c-.738.67-1.19 1.63-1.19 2.69v.004c0 1.083-.496 2.05-1.288 2.696m7.133.076c.38.256.729.568 1.035.927m-2.422-2.903a9.004 9.004 0 01-1.127 3.045m-7.469-2.347c.8-.696 1.307-1.72 1.307-2.864V10" />
            </svg>
          </div>
          <h3
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "1.35rem",
              fontWeight: 600,
              color: "var(--foreground)",
              marginBottom: "0.75rem",
            }}
          >
            Unmistakably You
          </h3>
          <p style={{ fontSize: "0.85rem", color: "var(--muted-foreground)", lineHeight: 1.65 }}>
            We develop your brand voice guidelines from scratch and write content only you could publish —
            no generic filler, no recycled templates.
          </p>
        </div>
      </div>

      {/* Cell 2: 48hr Turnaround (1 col) */}
      <div
        style={{
          background: "var(--primary)",
          borderRadius: "var(--radius-xl)",
          padding: "2rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          color: "var(--primary-foreground)",
          border: "2px solid var(--primary)",
        }}
        className="bento-cell"
      >
        <span style={{ fontSize: "4rem", fontFamily: "var(--font-serif)", fontWeight: 700, color: "var(--primary-foreground)", opacity: 0.9 }}>
          48h
        </span>
        <div>
          <h3 style={{ fontSize: "0.95rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.5rem" }}>
            Turnaround
          </h3>
          <p style={{ fontSize: "0.78rem", opacity: 0.8, lineHeight: 1.6 }}>
            Professional publication-ready content delivered rapidly, keeping your brand momentum strong.
          </p>
        </div>
      </div>

      {/* Cell 3: Expert Craft (1 col) */}
      <div
        style={{
          background: "var(--card)",
          border: "2px solid var(--border)",
          borderRadius: "var(--radius-xl)",
          padding: "2rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
        className="bento-cell"
      >
        <div style={{ color: "var(--primary)" }}>
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        </div>
        <div>
          <h3
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "1.1rem",
              fontWeight: 600,
              color: "var(--foreground)",
              marginBottom: "0.5rem",
            }}
          >
            Expert Craft
          </h3>
          <p style={{ fontSize: "0.78rem", color: "var(--muted-foreground)", lineHeight: 1.6 }}>
            Every piece goes through strict multi-phase checks, ensuring flawless execution that builds trust.
          </p>
        </div>
      </div>

      {/* Cell 4: Story-Driven (1 col) */}
      <div
        style={{
          background: "var(--background)",
          border: "2px solid var(--border)",
          borderRadius: "var(--radius-xl)",
          padding: "2rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          position: "relative",
          overflow: "hidden",
        }}
        className="bento-cell"
      >
        {/* Ink-textured graphic overlay */}
        <div style={{ position: "absolute", right: -20, bottom: -20, opacity: 0.08, pointerEvents: "none" }}>
          <svg width="120" height="120" viewBox="0 0 100 100" fill="currentColor">
            <path d="M50 0 C75 25 100 50 50 100 C0 50 25 25 50 0 Z" />
          </svg>
        </div>
        <div style={{ color: "var(--primary)" }}>
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        </div>
        <div>
          <h3
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "1.1rem",
              fontWeight: 600,
              color: "var(--foreground)",
              marginBottom: "0.5rem",
            }}
          >
            Story-Driven
          </h3>
          <p style={{ fontSize: "0.78rem", color: "var(--muted-foreground)", lineHeight: 1.6 }}>
            Deep narrative strategy that connects emotionally with audiences, transforming readers into buyers.
          </p>
        </div>
      </div>

      {/* Cell 5: Pull Quote (2 cols) */}
      <div
        style={{
          gridColumn: "span 2",
          background: "var(--card)",
          border: "2px solid var(--border)",
          borderRadius: "var(--radius-xl)",
          padding: "2rem 2.25rem",
          display: "flex",
          alignItems: "center",
        }}
        className="bento-cell"
      >
        <blockquote
          style={{
            fontFamily: "var(--font-serif)",
            fontStyle: "italic",
            fontSize: "1.2rem",
            lineHeight: 1.6,
            color: "var(--foreground)",
            margin: 0,
            borderLeft: "3px solid var(--primary)",
            paddingLeft: "1.25rem",
          }}
        >
          &ldquo;Strategic content isn&apos;t a cost — it&apos;s your best marketing investment.&rdquo;
        </blockquote>
      </div>

      <style>{`
        .bento-cell:hover {
          border-color: color-mix(in oklch, var(--primary) 35%, transparent) !important;
          box-shadow: 0 10px 24px color-mix(in oklch, var(--foreground) 7%, transparent);
        }
        @media (max-width: 768px) {
          .cq-bento { grid-template-columns: 1fr !important; }
          .bento-cell { grid-column: span 1 !important; }
        }
      `}</style>
    </div>
  );
}

/* ── 6. AI VS HUMAN INTERACTIVE COMPARISON ── */
export function AiVsHuman() {
  const [showHuman, setShowHuman] = useState(true);

  return (
    <div style={{ margin: "4rem 0" }}>
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
            marginBottom: "0.75rem",
          }}
        >
          The Difference
        </span>
        <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.75rem", fontWeight: 600, color: "var(--foreground)" }}>
          Content That Feels Like You, Not Like Everyone Else
        </h3>
      </div>

      {/* Toggle selector */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: "2rem" }}>
        <div style={{ background: "var(--secondary)", borderRadius: "var(--radius-md)", padding: "4px" }}>
          <button
            onClick={() => setShowHuman(false)}
            style={{
              padding: "0.5rem 1.25rem",
              borderRadius: "var(--radius-sm)",
              fontSize: "0.75rem",
              fontWeight: 600,
              background: !showHuman ? "var(--primary)" : "transparent",
              color: !showHuman ? "var(--primary-foreground)" : "var(--muted-foreground)",
              border: "none",
              cursor: "pointer",
            }}
          >
            AI Generated
          </button>
          <button
            onClick={() => setShowHuman(true)}
            style={{
              padding: "0.5rem 1.25rem",
              borderRadius: "var(--radius-sm)",
              fontSize: "0.75rem",
              fontWeight: 600,
              background: showHuman ? "var(--primary)" : "transparent",
              color: showHuman ? "var(--primary-foreground)" : "var(--muted-foreground)",
              border: "none",
              cursor: "pointer",
            }}
          >
            Human Written
          </button>
        </div>
      </div>

      <div style={{ display: "grid", gap: "1.5rem", gridTemplateColumns: "1fr 1fr" }} className="cq-split">
        {/* Left: AI Generated */}
        <div
          style={{
            background: "var(--card)",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius-xl)",
            padding: "2rem",
            opacity: showHuman ? 0.45 : 1,
            transition: "opacity 0.3s",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
            <span style={{ fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>
              AI Outline
            </span>
            <span style={{ fontSize: "0.68rem", background: "var(--secondary)", padding: "0.2rem 0.5rem", borderRadius: "4px" }}>
              Bland / Monospace
            </span>
          </div>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.85rem", lineHeight: 1.75, color: "var(--muted-foreground)" }}>
            Our company provides <span style={{ textDecoration: "line-through", color: "var(--destructive)" }}>high-quality solutions</span> to meet your business needs.
            We leverage <span style={{ textDecoration: "line-through", color: "var(--destructive)" }}>cutting-edge technology</span> to deliver value to our customers.
            Our team of experts is <span style={{ textDecoration: "line-through", color: "var(--destructive)" }}>dedicated to excellence</span> and customer satisfaction.
          </p>
        </div>

        {/* Right: Creative Quill */}
        <div
          style={{
            background: "var(--card)",
            border: "2px solid var(--primary)",
            borderRadius: "var(--radius-xl)",
            padding: "2rem",
            opacity: !showHuman ? 0.45 : 1,
            transition: "opacity 0.3s",
            boxShadow: showHuman ? "0 10px 30px color-mix(in oklch, var(--primary) 12%, transparent)" : "none",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
            <span style={{ fontSize: "0.68rem", fontWeight: 700, color: "var(--primary)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Creative Quill
            </span>
            <span style={{ fontSize: "0.68rem", background: "var(--primary)", color: "var(--primary-foreground)", padding: "0.2rem 0.5rem", borderRadius: "4px" }}>
              Human Written ✓
            </span>
          </div>
          <p style={{ fontFamily: "var(--font-serif)", fontSize: "0.95rem", lineHeight: 1.75, color: "var(--foreground)" }}>
            Built by two friends who got tired of watching <span style={{ textDecoration: "underline", textDecorationColor: "var(--primary)", textDecorationThickness: "2px" }}>brilliant ideas die in committee</span>.
            We make things that work — and occasionally, things that <span style={{ textDecoration: "underline", textDecorationColor: "var(--primary)", textDecorationThickness: "2px" }}>surprise even us</span>.
          </p>
        </div>
      </div>

      <div style={{ textAlign: "center", marginTop: "2rem" }}>
        <p style={{ fontSize: "0.85rem", color: "var(--muted-foreground)", marginBottom: "1.25rem" }}>
          Every word we write sounds like YOU — not like a content factory.
        </p>
        <Link href="/contact" className="btn-primary">
          Begin Your Journey
        </Link>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .cq-split { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

/* ── 7. FREE CONTENT AUDIT CARD ── */
export function ContentAuditCard() {
  return (
    <div
      style={{
        background: "#0d0d0d", // var(--cq-near-black)
        borderRadius: "var(--radius-xl)",
        padding: "2.5rem",
        color: "#ffffff",
        margin: "4rem 0",
        border: "1px solid #222222",
        boxShadow: "0 20px 40px rgba(0,0,0,0.5)",
      }}
    >
      <div style={{ display: "grid", gap: "2.5rem", gridTemplateColumns: "2fr 1fr", alignItems: "center" }} className="cq-audit-split">
        <div>
          <span
            style={{
              background: "rgba(255, 255, 255, 0.15)",
              color: "#ffffff",
              fontSize: "0.62rem",
              fontWeight: 700,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              padding: "0.25rem 0.75rem",
              borderRadius: "999px",
              display: "inline-block",
              marginBottom: "1rem",
            }}
          >
            Limited Offer
          </span>
          <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.85rem", fontWeight: 600, color: "#ffffff", marginBottom: "0.75rem", lineHeight: 1.2 }}>
            Get a Free Content Audit — Worth ₹5,000
          </h3>
          <p style={{ fontSize: "0.88rem", color: "#999999", lineHeight: 1.7, marginBottom: "1.5rem" }}>
            We&apos;ll analyze your current content, identify gaps, and give you a 10-point improvement plan. No strings attached.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginBottom: "1.75rem" }}>
            {["Full website layout review", "Competitor gap mapping", "10-point action blueprint"].map((item) => (
              <div key={item} style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.82rem", color: "#bbbbbb" }}>
                <span style={{ color: "var(--primary)" }}>✓</span>
                <span>{item}</span>
              </div>
            ))}
          </div>

          <Link href="/contact" className="btn-primary" style={{ background: "#ffffff", color: "#000000", border: "1px solid #ffffff" }}>
            Claim Your Free Audit
          </Link>
        </div>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
          <div
            style={{
              width: "120px",
              height: "120px",
              borderRadius: "50%",
              border: "3px solid var(--primary)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "1rem",
            }}
          >
            <span style={{ fontSize: "3rem", fontFamily: "var(--font-serif)", fontWeight: 700, color: "#ffffff" }}>
              ₹0
            </span>
          </div>
          <span style={{ fontSize: "0.72rem", color: "#999999", maxWidth: "160px", lineHeight: 1.4 }}>
            Free for first 5 new clients this month
          </span>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .cq-audit-split { grid-template-columns: 1fr !important; text-align: center; }
          .cq-audit-split div { justify-content: center; align-items: center; }
        }
      `}</style>
    </div>
  );
}

/* ── 8. SOCIAL PROOF MARQUEE ── */
export function SocialProofMarquee() {
  const reviews = [
    { text: "Breathtaking romance prose, adapted perfectly.", client: "Sarah M." },
    { text: "Hit every deadline, narrative was incredibly deep.", client: "David L." },
    { text: "Outstanding editing, resolved major plot loops.", client: "Elena R." },
    { text: "Premium copywriting that ranks and converts.", client: "TechCorp" },
  ];

  return (
    <div style={{ padding: "1.25rem 0", background: "var(--secondary)", borderTop: "1px solid var(--border)", overflow: "hidden" }}>
      <div className="cq-marquee-container" style={{ display: "flex", overflow: "hidden", width: "100%" }}>
        <div className="cq-marquee-inner-reverse" style={{ display: "flex", gap: "4rem", whiteSpace: "nowrap", alignItems: "center" }}>
          {reviews.concat(reviews).map((r, idx) => (
            <div key={idx} style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
              <span style={{ fontSize: "0.8rem", fontWeight: 500, color: "var(--foreground)" }}>
                &ldquo;{r.text}&rdquo;
              </span>
              <span style={{ fontSize: "0.68rem", fontWeight: 700, color: "var(--muted-foreground)", textTransform: "uppercase" }}>
                — {r.client}
              </span>
              <span style={{ color: "var(--primary)", fontSize: "0.75rem" }}>◆</span>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        .cq-marquee-inner-reverse {
          animation: marquee-scroll-reverse 45s linear infinite;
        }
        .cq-marquee-container:hover .cq-marquee-inner-reverse {
          animation-play-state: paused;
        }
        @keyframes marquee-scroll-reverse {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}

/* ── 9. SCROLL PROGRESS BAR ── */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "3px",
        background: "var(--primary)",
        scaleX: scrollYProgress,
        transformOrigin: "0%",
        zIndex: 100,
        opacity: visible ? 1 : 0,
        pointerEvents: "none",
      }}
      transition={{ opacity: { duration: 0.2 } }}
    />
  );
}

/* ── 10. OPEN FOR WORK FLOATING BADGE ── */
export function OpenForWorkBadge() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(true);

  // Read from localStorage on mount
  useEffect(() => {
    const isDismissed = localStorage.getItem("cq-badge-dismissed") === "true";
    if (!isDismissed) {
      const timer = setTimeout(() => setDismissed(false), 0);
      return () => clearTimeout(timer);
    }
  }, []);

  // Listen to scroll if not dismissed
  useEffect(() => {
    if (dismissed) return;
    const handleScroll = () => {
      setVisible(window.scrollY > 300);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [dismissed]);

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    localStorage.setItem("cq-badge-dismissed", "true");
    setDismissed(true);
  };

  if (dismissed || !visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        /* On mobile: center at bottom; On desktop: right side */
        bottom: "1.5rem",
        right: "1.5rem",
        left: "auto",
        zIndex: 99,
        background: "var(--card)",
        border: "1px solid var(--border)",
        boxShadow: "0 10px 24px rgba(0,0,0,0.12)",
        borderRadius: "var(--radius-lg)",
        padding: "0.85rem 1.25rem",
        display: "flex",
        alignItems: "center",
        gap: "0.75rem",
        maxWidth: "calc(100vw - 3rem)",
      }}
      className="cq-work-badge"
    >
      {/* Pulsing indicator */}
      <span style={{ position: "relative", display: "flex", height: "10px", width: "10px", flexShrink: 0 }}>
        <span style={{
          animation: "cq-ping 2s cubic-bezier(0, 0, 0.2, 1) infinite",
          position: "absolute",
          display: "inline-flex",
          height: "100%",
          width: "100%",
          borderRadius: "9999px",
          background: "var(--primary)",
          opacity: 0.75,
        }} />
        <span style={{
          position: "relative",
          display: "inline-flex",
          borderRadius: "9999px",
          height: "10px",
          width: "10px",
          background: "var(--primary)",
        }} />
      </span>

      <Link href="/contact" style={{ textDecoration: "none", display: "flex", flexDirection: "column" }}>
        <span style={{ fontSize: "0.72rem", fontWeight: 700, color: "var(--foreground)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
          Open For Work
        </span>
        <span style={{ fontSize: "0.68rem", color: "var(--muted-foreground)", marginTop: "2px" }}>
          Claim your free content audit →
        </span>
      </Link>

      <button
        onClick={handleClose}
        aria-label="Dismiss badge"
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          fontSize: "0.75rem",
          color: "var(--muted-foreground)",
          marginLeft: "0.25rem",
          /* 44x44 touch target */
          width: "32px",
          height: "32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "50%",
          flexShrink: 0,
        }}
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>

      <style>{`
        @keyframes cq-ping {
          75%, 100% {
            transform: scale(2.2);
            opacity: 0;
          }
        }
        /* On small screens move badge to bottom-center */
        @media (max-width: 480px) {
          .cq-work-badge {
            right: 1rem !important;
            bottom: 1rem !important;
          }
        }
      `}</style>
    </div>
  );
}

/* ── 11. BACK TO TOP BUTTON ── */
export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          aria-label="Back to top"
          style={{
            position: "fixed",
            bottom: "1.5rem",
            left: "1.5rem",
            zIndex: 99,
            width: "44px",
            height: "44px",
            borderRadius: "50%",
            background: "var(--card)",
            border: "1px solid var(--border)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "var(--foreground)",
            cursor: "pointer",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          }}
          whileHover={{ scale: 1.1 }}
          transition={{ scale: { duration: 0.2 } }}
        >
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
