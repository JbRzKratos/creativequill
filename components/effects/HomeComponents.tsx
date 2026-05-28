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
    let timer: ReturnType<typeof setTimeout>;

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
  const rafHandle = useRef<number>(0);

  useEffect(() => {
    if (!isInView) return;
    const startTime = performance.now();

    const update = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = progress * (2 - progress);
      setCount(Math.floor(ease * end));

      if (progress < 1) {
        rafHandle.current = requestAnimationFrame(update);
      } else {
        setCount(end);
      }
    };

    rafHandle.current = requestAnimationFrame(update);
    return () => cancelAnimationFrame(rafHandle.current);
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
        borderTop: "1px solid var(--cq-night-border, #2E2E2A)",
        borderBottom: "1px solid var(--cq-night-border, #2E2E2A)",
        background: "var(--cq-night, #0F0F0D)",
        padding: "2rem 0",
      }}
    >
      <div
        className="mx-auto px-4 md:px-6 lg:px-8"
        style={{
          maxWidth: "var(--max-width-content, 68rem)",
        }}
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[var(--cq-night-border)] overflow-hidden">
          {[
            { num: 500000, suffix: "+", label: "Words Written" },
            { num: 50, suffix: "+", label: "Happy Clients" },
            { num: 100, suffix: "%", label: "Human-Written" },
            { num: 48, suffix: "hrs", label: "Avg Delivery" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-[var(--cq-night)] p-6 text-center flex flex-col items-center justify-center"
            >
              <span
                className="text-3xl sm:text-4xl text-[var(--cq-cream)]"
                style={{
                  fontFamily: "var(--font-body), sans-serif",
                  fontWeight: 500,
                  letterSpacing: "var(--tracking-tighter, -0.04em)",
                }}
              >
                <CountUp end={stat.num} suffix={stat.suffix} />
              </span>
              <span
                className="text-[9px] sm:text-[10px] text-[var(--cq-ink-faint)] mt-1 uppercase"
                style={{
                  fontFamily: "var(--font-body), sans-serif",
                  letterSpacing: "var(--tracking-wider, 0.06em)",
                }}
              >
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
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
              key={`logo-${idx}`}
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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 w-full cq-bento">
      {/* Cell 1: Unmistakably You (2 cols, tall) */}
      <div
        className="col-span-1 sm:col-span-2 lg:col-span-2 border border-[var(--cq-linen)] rounded-[var(--radius-xl)] p-6 md:p-9 flex flex-col justify-between relative overflow-hidden transition-all duration-300 bento-cell min-h-[140px]"
        style={{
          background: "var(--cq-parchment)",
        }}
      >
        <div>
          <span className="font-sans text-5xl font-medium text-[var(--cq-parchment-deep)] select-none">01</span>
          <h3 className="font-display text-2xl font-light text-[var(--cq-ink)] mt-4 mb-3 tracking-tight leading-none">
            Unmistakably You
          </h3>
          <p className="text-sm text-[var(--cq-ink-mid)] leading-relaxed font-light">
            We develop your brand voice guidelines from scratch and write content only you could publish —
            no generic filler, no recycled templates.
          </p>
        </div>
      </div>

      {/* Cell 2: 48hr Turnaround (1 col) */}
      <div
        className="col-span-1 border border-[var(--cq-linen)] bg-[var(--cq-parchment)] rounded-[var(--radius-xl)] p-6 md:p-8 flex flex-col justify-between bento-cell min-h-[140px]"
      >
        <span className="text-5xl font-sans font-medium text-[var(--cq-ink)] tracking-tight leading-none">
          48h
        </span>
        <div className="mt-4">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--cq-ink-muted)] mb-2">
            Delivery Guarantee
          </h3>
          <p className="text-xs text-[var(--cq-ink-mid)] font-light leading-relaxed">
            Professional publication-ready content delivered rapidly, keeping your brand momentum strong.
          </p>
        </div>
      </div>

      {/* Cell 3: Expert Craft (1 col) */}
      <div
        className="col-span-1 border border-[var(--cq-linen)] bg-[var(--cq-parchment)] rounded-[var(--radius-xl)] p-6 md:p-8 flex flex-col justify-between bento-cell min-h-[140px]"
      >
        <span className="text-3xl font-display font-light text-[var(--cq-ink)] tracking-tight leading-none">
          Expert Craft
        </span>
        <div className="mt-4">
          <p className="text-xs text-[var(--cq-ink-mid)] font-light leading-relaxed">
            Every piece goes through strict multi-phase checks, ensuring flawless execution that builds trust.
          </p>
        </div>
      </div>

      {/* Cell 4: Story-Driven (1 col) */}
      <div
        className="col-span-1 border border-[var(--cq-linen)] bg-[var(--cq-parchment-mid)] rounded-[var(--radius-xl)] p-6 md:p-8 flex flex-col justify-between relative overflow-hidden bento-cell min-h-[140px]"
      >
        <span className="text-3xl font-display font-light text-[var(--cq-ink)] tracking-tight leading-none">
          Story-Driven
        </span>
        <div className="mt-4">
          <p className="text-xs text-[var(--cq-ink-mid)] font-light leading-relaxed">
            Deep narrative strategy that connects emotionally with audiences, transforming readers into buyers.
          </p>
        </div>
      </div>

      {/* Cell 5: Pull Quote (2 cols) */}
      <div
        className="col-span-1 sm:col-span-2 lg:col-span-2 border-none bg-[var(--cq-teal)] rounded-[var(--radius-xl)] p-6 md:p-8 flex items-center bento-cell min-h-[140px]"
      >
        <blockquote className="font-display italic text-lg md:text-xl leading-relaxed text-[var(--cq-teal-text)] border-l-4 border-[var(--cq-ink-muted)] pl-5 m-0">
          &ldquo;Strategic content isn&apos;t a cost — it&apos;s your best marketing investment.&rdquo;
        </blockquote>
      </div>

      <style>{`
        .bento-cell {
          transition: all 250ms ease;
        }
        .bento-cell:hover {
          border-color: var(--cq-linen) !important;
          box-shadow: var(--shadow-md);
          transform: translateY(-2px);
        }
      `}</style>
    </div>
  );
}

/* ── 6. AI VS HUMAN INTERACTIVE COMPARISON ── */
export function AiVsHuman() {
  const [sliderPos, setSliderPos] = useState(50); // percentage (0 to 100)
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const pos = Math.max(5, Math.min(95, (x / rect.width) * 100));
    setSliderPos(pos);
  };

  const onPointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    handleMove(e.clientX);
    containerRef.current?.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const onPointerUp = (e: React.PointerEvent) => {
    setIsDragging(false);
    containerRef.current?.releasePointerCapture(e.pointerId);
  };

  // Helper buttons to click and show one side fully
  const showAi = () => setSliderPos(95);
  const showHuman = () => setSliderPos(5);

  return (
    <div style={{ margin: "4rem 0" }} className="w-full">
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <span className="badge-label">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 3l3 6 6 3-6 3-3 6-3-6-6-3 6-3z"/>
          </svg>
          The Difference
        </span>
        <h3 className="font-display text-3xl md:text-4xl mt-3 text-balance font-normal text-[var(--cq-ink)]">
          Content That Feels Like You, Not Like Everyone Else
        </h3>
        <p className="text-sm text-[var(--cq-ink-muted)] mt-2 max-w-[60ch] mx-auto font-light">
          Drag the slider to see the difference between generic AI copy and human writing that actually sounds like your brand.
        </p>
      </div>

      {/* Selector Buttons (preserves test suite buttons!) */}
      <div className="flex justify-center mb-6">
        <div className="bg-[var(--cq-parchment-deep)] rounded-[var(--radius-md)] p-1 flex gap-1">
          <button
            onClick={showAi}
            role="button"
            className="px-5 py-2 rounded-[var(--radius-sm)] text-xs font-semibold transition-all duration-200"
            style={{
              background: sliderPos > 50 ? "var(--cq-forest)" : "transparent",
              color: sliderPos > 50 ? "var(--cq-parchment)" : "var(--cq-ink-muted)",
              border: "none",
            }}
          >
            AI Generated
          </button>
          <button
            onClick={showHuman}
            role="button"
            className="px-5 py-2 rounded-[var(--radius-sm)] text-xs font-semibold transition-all duration-200"
            style={{
              background: sliderPos <= 50 ? "var(--cq-forest)" : "transparent",
              color: sliderPos <= 50 ? "var(--cq-parchment)" : "var(--cq-ink-muted)",
              border: "none",
            }}
          >
            Human Written
          </button>
        </div>
      </div>

      {/* Interactive Slider Container */}
      <div 
        ref={containerRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        role="slider"
        aria-label="Compare AI-generated vs human-written content"
        aria-valuenow={Math.round(sliderPos)}
        aria-valuemin={5}
        aria-valuemax={95}
        tabIndex={0}
        className="relative mx-auto w-full max-w-[580px] h-[340px] select-none overflow-hidden touch-none"
        style={{
          borderRadius: "var(--radius-xl)",
          border: "1px solid var(--cq-linen)",
          cursor: "ew-resize"
        }}
      >
        {/* Left Side: AI Generated Content (at the back) */}
        <div 
          className="absolute inset-0 p-8 flex flex-col justify-between"
          style={{ backgroundColor: "var(--cq-night)", color: "#FAF7F0" }}
        >
          <div>
            <div className="flex justify-between items-center mb-4">
              <span className="px-2 py-0.5 rounded-[var(--radius-xs)] text-[10px] uppercase font-semibold tracking-wider bg-[#2A1A1A] text-[#E09090] border border-[#4A2525]">
                AI Generated
              </span>
              <span className="text-[10px] text-[var(--cq-ink-faint)] font-mono">Bland & Monospace</span>
            </div>
            <p className="font-mono text-sm leading-relaxed text-[#8C867C]">
              Our company provides <span className="line-through text-[#C97C7C]">high-quality solutions</span> to meet your business needs. 
              We leverage <span className="line-through text-[#C97C7C]">cutting-edge technology</span> to deliver value-added services to our customers. 
              Our team of experts is dedicated to delivering excellence and satisfaction.
            </p>
          </div>
          <div className="text-[11px] font-mono text-[#5A554D]">
            Generated by GPT-4 in 2.4 seconds
          </div>
        </div>

        {/* Right Side: Human Written Content (on top, clipped from left) */}
        <div 
          className="absolute inset-0 p-8 flex flex-col justify-between"
          style={{ 
            backgroundColor: "var(--cq-parchment)", 
            color: "var(--cq-ink)",
            clipPath: `inset(0 0 0 ${sliderPos}%)`
          }}
        >
          <div>
            <div className="flex justify-between items-center mb-4">
              <span className="px-2 py-0.5 rounded-[var(--radius-xs)] text-[10px] uppercase font-semibold tracking-wider bg-[var(--cq-forest-light)] text-[var(--cq-forest)] border border-[var(--cq-linen)]">
                Creative Quill ✓
              </span>
              <span className="text-[10px] text-[var(--cq-ink-muted)] font-body">Editorial Strategy</span>
            </div>
            <p className="font-display italic text-base md:text-lg leading-relaxed text-[var(--cq-ink)]">
              Built by two people tired of watching <span className="underline decoration-[var(--cq-forest)] decoration-2 underline-offset-4 font-normal">great ideas get buried</span> in forgettable copy. We write the kind of content that makes readers stop scrolling and actually feel something.
            </p>
          </div>
          <div className="text-[11px] font-body text-[var(--cq-ink-muted)]">
            Crafted with research, intuition, and care
          </div>
        </div>

        {/* Slider Handle Line */}
        <div 
          className="absolute top-0 bottom-0 w-[2px] bg-white z-20 pointer-events-none"
          style={{ left: `${sliderPos}%` }}
        />

        {/* Slider Handle Knob */}
        <div 
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 bg-white border border-[var(--cq-linen)] rounded-full shadow-lg z-20 flex items-center justify-center pointer-events-none"
          style={{ left: `${sliderPos}%` }}
        >
          <span className="text-[11px] text-[var(--cq-ink-muted)] font-medium">✦</span>
        </div>
      </div>

      <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
        <p style={{ fontSize: "0.85rem", color: "var(--cq-ink-muted)", marginBottom: "1.25rem" }} className="font-light">
          Every word we write sounds like YOU — not like a content factory.
        </p>
        <Link href="/contact" className="cq-nav-cta font-medium inline-flex items-center gap-1">
          Begin Your Journey &rarr;
        </Link>
      </div>
    </div>
  );
}

/* ── 7. FREE CONTENT AUDIT CARD ── */
export function ContentAuditCard() {
  return (
    <div
      style={{
        background: "var(--cq-night)",
        borderRadius: "var(--radius-2xl)",
        border: "1px solid var(--cq-night-border)",
        color: "var(--cq-parchment)",
        overflow: "hidden",
        margin: "4rem 0"
      }}
      className="p-8 md:p-12"
    >
      <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-8 items-center">
        {/* Left Column: Content */}
        <div className="flex flex-col items-start gap-4">
          <span className="px-2.5 py-1 rounded-full text-[10px] font-medium tracking-wider uppercase bg-[rgba(255,255,255,0.08)] text-[var(--cq-parchment)] border border-[rgba(255,255,255,0.15)]">
            Free Content Audit • Price: <span className="font-bold">₹0</span>
          </span>
          <h3 className="font-display text-3xl md:text-4xl text-balance leading-tight text-[var(--cq-parchment)] font-light">
            Get a Free Audit — Start Writing Content That Converts
          </h3>
          <p className="text-sm text-[rgba(250,247,240,0.65)] font-light leading-relaxed max-w-[55ch]">
            We&apos;ll analyze your current content, map competitor gaps, and give you a 10-point action blueprint. No strings attached.
          </p>
          
          <div className="flex flex-col gap-2.5 my-2">
            {[
              "Free strategy call included",
              "First draft in 48 hours",
              "100% satisfaction guarantee"
            ].map((item) => (
              <div key={item} className="flex items-center gap-2 text-xs text-[rgba(250,247,240,0.7)] font-light">
                <span className="text-[#4DB896] text-sm">✓</span>
                <span>{item}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-3 mt-2 flex-wrap text-xs text-[rgba(250,247,240,0.5)]">
            <div className="flex -space-x-2">
              <div className="w-6 h-6 rounded-full bg-[var(--cq-forest)] border border-[var(--cq-night)] flex items-center justify-center text-[8px] font-bold">PQ</div>
              <div className="w-6 h-6 rounded-full bg-[var(--cq-teal)] border border-[var(--cq-night)] flex items-center justify-center text-[8px] font-bold">SE</div>
              <div className="w-6 h-6 rounded-full bg-[var(--cq-ink-muted)] border border-[var(--cq-night)] flex items-center justify-center text-[8px] font-bold">KR</div>
            </div>
            <span>+47 clients this month</span>
            <span className="text-[#4DB896]">★★★★★</span>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto mt-4">
            <Link 
              href="/contact" 
              className="px-6 py-3 rounded-[var(--radius-sm)] text-xs font-semibold uppercase tracking-wider text-[var(--cq-night)] bg-white hover:bg-[var(--cq-parchment-mid)] transition-colors text-center"
            >
              Claim Your Free Audit
            </Link>
            <Link 
              href="/contact?type=consultation" 
              className="px-6 py-3 rounded-[var(--radius-sm)] text-xs font-semibold uppercase tracking-wider text-[var(--cq-parchment)] border border-[rgba(255,255,255,0.2)] hover:bg-[rgba(255,255,255,0.05)] transition-colors text-center"
            >
              Book Free Consultation
            </Link>
          </div>
          
          <span className="text-[10px] text-[var(--cq-ink-faint)] opacity-60">
            No commitment • Respond in under 2 hours • Free audit included
          </span>
        </div>

        {/* Right Column: Visual Mockup Showcase (Hidden on Mobile) */}
        <div className="hidden lg:flex flex-col items-center justify-center relative w-full h-[280px] bg-[#1A1714] rounded-[var(--radius-xl)] border border-[var(--cq-night-border)] overflow-hidden">
          {/* Decorative quote mark watermark */}
          <span className="absolute -top-10 -right-6 font-display text-[160px] text-[var(--cq-forest)] opacity-10 select-none pointer-events-none leading-none">&ldquo;</span>
          
          {/* Mockup card */}
          <motion.div 
            className="w-[200px] bg-[var(--cq-parchment-mid)] border border-[var(--cq-linen)] p-4 shadow-xl z-10"
            style={{ borderRadius: "var(--radius-lg)", rotate: "-4deg" }}
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="w-3 h-3 rounded-full bg-[var(--cq-forest)] mb-3" />
            <div className="h-3 bg-[var(--cq-ink-muted)] opacity-30 rounded w-5/6 mb-2" />
            <div className="h-2 bg-[var(--cq-linen)] rounded w-full mb-1.5" />
            <div className="h-2 bg-[var(--cq-linen)] rounded w-4/5 mb-1.5" />
            <div className="h-2 bg-[var(--cq-linen)] rounded w-2/3 mb-1.5" />
          </motion.div>

          {/* Floating Metric Chips */}
          <motion.div 
            className="absolute top-8 left-6 bg-[var(--cq-forest)] text-[var(--cq-parchment)] px-2.5 py-1 text-[9px] font-semibold tracking-wider rounded z-20 shadow-md"
            style={{ rotate: "6deg" }}
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
          >
            +230% Traffic
          </motion.div>

          <motion.div 
            className="absolute bottom-8 right-6 bg-white text-[var(--cq-ink)] border border-[var(--cq-linen)] px-2.5 py-1 text-[9px] font-semibold tracking-wider rounded z-20 shadow-md"
            style={{ rotate: "-6deg" }}
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
          >
            ₹500K+ Earned
          </motion.div>
        </div>
      </div>
    </div>
  );
}

/* ── 8. SOCIAL PROOF MARQUEE ── */
export function SocialProofMarquee() {
  const [isPaused, setIsPaused] = useState(false);
  const testimonials = [
    { quote: "Creative Quill took my rough outline and transformed it into a breathtaking romance novel. Their ability to capture my voice was remarkable.", author: "Sarah M.", role: "Author" },
    { quote: "The structured development process gave me so much peace of mind. They hit every deadline and character arcs were deep.", author: "David L.", role: "Novelist" },
    { quote: "Exceptional editing and story planning. They resolved a major plot hole in my fantasy series, getting me back on track instantly.", author: "Elena R.", role: "Fantasy Writer" },
    { quote: "Their team delivered clean, engaging content on-time, boosting our traffic. Professional from start to finish.", author: "TechCorp", role: "Content Manager" }
  ];

  return (
    <section className="section-sm" style={{ background: "var(--cq-cream-mid)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", position: "relative" }}>
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <span className="label-text">What Our Clients Say</span>
      </div>

      <div 
        className="cq-testimonial-marquee-container" 
        style={{ display: "flex", overflow: "hidden", width: "100%", position: "relative" }}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
        onTouchCancel={() => setIsPaused(false)}
      >
        {/* Left fade overlay */}
        <div style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: "80px",
          background: "linear-gradient(to right, var(--cq-cream-mid), transparent)",
          zIndex: 10,
          pointerEvents: "none"
        }} />
        {/* Right fade overlay */}
        <div style={{
          position: "absolute",
          right: 0,
          top: 0,
          bottom: 0,
          width: "80px",
          background: "linear-gradient(to left, var(--cq-cream-mid), transparent)",
          zIndex: 10,
          pointerEvents: "none"
        }} />

        <div 
          className="cq-testimonial-marquee-inner" 
          style={{ display: "flex", gap: "1.5rem", animationPlayState: isPaused ? "paused" : "running" }}
        >
          {testimonials.concat(testimonials).concat(testimonials).map((t, idx) => (
            <div
              key={`testimonial-${idx}`}
              className="cq-testimonial-card"
              data-cursor="card"
            >
              <div>
                <div className="text-xs sm:text-sm text-[var(--cq-teal)] mb-2 tracking-widest">★★★★★</div>
                <div style={{ position: "relative" }}>
                  <span style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "2.5rem",
                    color: "var(--cq-cream-dark)",
                    lineHeight: 0,
                    position: "absolute",
                    left: "-0.5rem",
                    top: "0.25rem",
                    pointerEvents: "none"
                  }}>&ldquo;</span>
                  <p className="font-serif italic text-sm md:text-base font-light text-[var(--cq-ink-mid)] leading-relaxed pl-3" style={{ margin: 0, textIndent: "0.25rem" }}>
                    {t.quote}
                  </p>
                </div>
              </div>
              <div style={{ borderTop: "1px solid var(--cq-cream-dark)", paddingTop: "0.75rem" }}>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "0.875rem", fontWeight: 500, color: "var(--cq-ink)", margin: 0 }}>
                  {t.author}
                </p>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", color: "var(--cq-ink-muted)", margin: 0, letterSpacing: "var(--tracking-wide)" }}>
                  {t.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        .cq-testimonial-card {
          background: var(--cq-cream);
          border: 1px solid var(--cq-cream-dark);
          border-radius: var(--radius-lg);
          padding: var(--space-6);
          min-width: 260px;
          max-width: 380px;
          flex-shrink: 0;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: 1rem;
        }
        @media (min-width: 768px) {
          .cq-testimonial-card {
            min-width: 320px;
          }
        }
        .cq-testimonial-marquee-inner {
          animation: marquee-scroll-reverse 45s linear infinite;
        }
        .cq-testimonial-marquee-container:hover .cq-testimonial-marquee-inner {
          animation-play-state: paused;
        }
        @keyframes marquee-scroll-reverse {
          0% { transform: translateX(-33.33%); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </section>
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
    <div className="cq-work-badge">
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
          <span className="block sm:hidden">Open for projects</span>
          <span className="hidden sm:block">Open For Work</span>
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
          width: "44px",
          height: "44px",
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
        .cq-work-badge {
          position: fixed;
          bottom: 1rem;
          right: 1rem;
          max-width: calc(100vw - 32px);
          z-index: 40;
          background: var(--card);
          border: 1px solid var(--border);
          box-shadow: 0 10px 24px rgba(0,0,0,0.12);
          border-radius: var(--radius-lg);
          padding: 0.85rem 1.25rem;
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        @media (min-width: 768px) {
          .cq-work-badge {
            bottom: 1.5rem;
            right: 1.5rem;
            max-width: 360px;
          }
        }
        @keyframes cq-ping {
          75%, 100% {
            transform: scale(2.2);
            opacity: 0;
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
        <>
          <style>{`
            .cq-back-to-top {
              bottom: 1rem;
              left: 1rem;
              width: 44px;
              height: 44px;
            }
            @media (min-width: 768px) {
              .cq-back-to-top {
                bottom: 1.5rem;
                left: 1.5rem;
              }
            }
          `}</style>
          <motion.button
            onClick={scrollToTop}
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            aria-label="Back to top"
            className="cq-back-to-top"
            style={{
              position: "fixed",
              zIndex: 40,
              background: "var(--card)",
              border: "1px solid var(--border)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--foreground)",
              cursor: "pointer",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              borderRadius: "50%",
            }}
            whileHover={{ scale: 1.1 }}
            transition={{ scale: { duration: 0.2 } }}
          >
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
            </svg>
          </motion.button>
        </>
      )}
    </AnimatePresence>
  );
}
