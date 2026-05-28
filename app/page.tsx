"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CQHeader from "@/components/cq-header";
import CQFooter from "@/components/cq-footer";
import { useTextScramble } from "@/hooks/useTextScramble";
import {
  StatsStrip,
  ClientMarquee,
  BentoGrid,
  AiVsHuman,
  ContentAuditCard,
  SocialProofMarquee,
} from "@/components/effects/HomeComponents";

const pageStyles = `
  body { background: var(--color-bg-primary); }

  /* ── HERO ────────────────────────────────── */
  .hero-section {
    background: var(--color-bg-primary);
    padding-top: calc(var(--header-height) + var(--space-12));
    padding-bottom: var(--space-16);
    position: relative;
    overflow: hidden;
  }
  .hero-inner {
    max-width: var(--max-width-content);
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1.1fr 0.9fr;
    gap: var(--space-10);
    align-items: center;
    position: relative;
    z-index: 2;
    padding: 0 var(--space-6);
  }
  @media (max-width: 1023px) {
    .hero-inner {
      grid-template-columns: 1fr;
      text-align: center;
      gap: var(--space-8);
      padding: 0 var(--space-4);
    }
  }
  .hero-text {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  @media (max-width: 1023px) {
    .hero-text {
      align-items: center;
    }
  }
  .hero-badge-container {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: var(--space-4);
  }
  .hero-badge-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--cq-teal);
  }
  .hero-h1 {
    font-family: var(--font-display);
    font-size: 2.5rem;
    line-height: 1.1;
    letter-spacing: -0.04em;
    color: var(--color-text-primary);
    margin-bottom: var(--space-4);
    text-shadow: none !important;
  }
  @media (min-width: 768px) {
    .hero-h1 {
      font-size: 3rem;
    }
  }
  @media (min-width: 1024px) {
    .hero-h1 {
      font-size: 3.75rem;
    }
  }
  @media (min-width: 1280px) {
    .hero-h1 {
      font-size: 4.5rem;
    }
  }
  .hero-sub {
    font-family: var(--font-body);
    font-size: 1.0625rem;
    font-weight: 300;
    color: var(--color-text-secondary);
    line-height: var(--leading-body);
    margin-bottom: var(--space-4);
  }
  .hero-desc {
    font-family: var(--font-body);
    font-size: 1rem;
    font-weight: 300;
    color: var(--color-text-secondary);
    line-height: var(--leading-body);
    max-width: 90%;
    margin-bottom: var(--space-6);
  }
  @media (min-width: 640px) {
    .hero-desc {
      max-width: 80%;
    }
  }
  @media (min-width: 768px) {
    .hero-desc {
      font-size: 1.125rem;
    }
  }
  @media (min-width: 1024px) {
    .hero-desc {
      max-width: 38ch;
    }
  }
  .hero-features-row {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
    margin-bottom: var(--space-8);
  }
  @media (min-width: 640px) {
    .hero-features-row {
      flex-direction: row;
      align-items: center;
      gap: 0.75rem;
    }
  }
  .hero-feature-item {
    font-family: var(--font-body);
    font-size: 0.75rem;
    color: var(--color-text-muted);
    letter-spacing: var(--tracking-wide);
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }
  @media (min-width: 768px) {
    .hero-feature-item {
      font-size: 0.8rem;
    }
  }
  .hero-feature-sep {
    color: var(--cq-beige);
    display: none;
  }
  @media (min-width: 640px) {
    .hero-feature-sep {
      display: inline;
    }
  }
  .hero-actions {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    align-items: center;
    width: 100%;
  }
  @media (min-width: 640px) {
    .hero-actions {
      flex-direction: row;
      gap: 1rem;
      width: auto;
    }
  }

  /* Book visual column */
  .hero-visual {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
  }
  @media (max-width: 1023px) {
    .hero-visual {
      display: none;
    }
  }

  /* CSS-Only Book Component */
  .book-container {
    perspective: 600px;
    width: 240px;
    height: 320px;
  }
  .book {
    width: 100%;
    height: 100%;
    background: #1B3A35; /* Forest green */
    border-radius: var(--radius-sm) var(--radius-md) var(--radius-md) var(--radius-sm);
    box-shadow: var(--shadow-xl);
    transform: rotateY(-8deg) rotateX(3deg);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: var(--space-8);
    position: relative;
    border-left: 3px solid rgba(255, 255, 255, 0.15);
  }
  .book-spine-line {
    position: absolute;
    left: 4px;
    top: 0;
    bottom: 0;
    width: 1px;
    background: rgba(255, 255, 255, 0.08);
  }
  .book-title {
    font-family: var(--font-display);
    color: var(--cq-cream);
    font-size: 1.15rem;
    font-weight: 500;
    letter-spacing: var(--tracking-wider);
    text-align: center;
    margin-top: var(--space-12);
  }
  .book-author {
    font-family: var(--font-body);
    color: var(--cq-cream-dark);
    font-size: 0.65rem;
    letter-spacing: var(--tracking-wider);
    text-transform: uppercase;
    text-align: center;
  }

  /* Botanical Sway */
  .botanical-svg {
    position: absolute;
    right: -20px;
    top: 10%;
    height: 45%;
    transform-origin: bottom center;
    animation: sway 4s ease-in-out infinite alternate;
    pointer-events: none;
  }
  @keyframes sway {
    0% { transform: rotate(-2deg); }
    100% { transform: rotate(2deg); }
  }

  /* Section Styles */
  .why-section, .process-section, .about-section {
    background: var(--color-bg-primary);
    padding-top: var(--section-py-md);
    padding-bottom: var(--section-py-md);
    border-top: 1px solid var(--border);
  }
  .section-inner {
    max-width: var(--max-width-content);
    margin: 0 auto;
    padding: 0 var(--space-6);
  }
  .why-header {
    display: grid;
    grid-template-columns: 1.2fr 0.8fr;
    gap: var(--space-8);
    margin-bottom: var(--space-8);
  }
  @media (max-width: 768px) {
    .why-header {
      grid-template-columns: 1fr;
      text-align: center;
    }
  }
  .why-h2 {
    font-family: var(--font-display);
    font-size: clamp(2rem, 4.5vw, 3rem);
    letter-spacing: var(--tracking-tight);
    line-height: var(--leading-heading);
    color: var(--color-text-primary);
    margin: 0;
  }
  .why-h2-desc {
    font-family: var(--font-body);
    font-size: 1rem;
    font-weight: 300;
    color: var(--color-text-secondary);
    line-height: var(--leading-body);
    margin-top: auto;
  }
  .process-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-10);
    align-items: start;
  }
  @media (max-width: 768px) {
    .process-grid {
      grid-template-columns: 1fr;
    }
  }
  .process-h2 {
    font-family: var(--font-display);
    font-size: clamp(2rem, 4.5vw, 3rem);
    line-height: var(--leading-heading);
    color: var(--color-text-primary);
    margin-bottom: var(--space-4);
  }
  .process-desc {
    font-family: var(--font-body);
    font-size: 0.95rem;
    color: var(--color-text-secondary);
    line-height: var(--leading-body);
    margin-bottom: var(--space-6);
  }
  .process-cta-box {
    border: 1px solid var(--cq-cream-dark);
    background: var(--cq-cream-mid);
    border-radius: var(--radius-xl);
    padding: var(--space-6);
  }
  .process-cta-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    background: var(--cq-teal-subtle);
    color: var(--cq-teal-hover);
    border-radius: var(--radius-full);
    padding: 0.25rem 0.75rem;
    font-size: 0.68rem;
    font-weight: 600;
    margin-bottom: var(--space-3);
  }
  .process-cta-h3 {
    font-family: var(--font-display);
    font-size: 1.25rem;
    color: var(--color-text-primary);
    margin-bottom: var(--space-3);
  }
  .process-checks {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    margin-bottom: var(--space-4);
  }
  .process-check {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    font-size: 0.8rem;
    color: var(--color-text-secondary);
  }
  .process-check-dot {
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: var(--cq-teal);
  }
  .process-steps {
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
  }
  .process-step {
    display: flex;
    align-items: flex-start;
    gap: var(--space-4);
  }
  .process-step-num {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    background: var(--cq-cream-dark);
    color: var(--color-text-primary);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.95rem;
    font-weight: 600;
    flex-shrink: 0;
  }
  .process-step-card {
    flex: 1;
    border: 1px solid var(--border);
    background: var(--color-bg-primary);
    border-radius: var(--radius-md);
    padding: var(--space-4) var(--space-5);
    transition: border-color var(--transition-fast), box-shadow var(--transition-fast);
  }
  .process-step-card:hover {
    border-color: var(--cq-teal);
    box-shadow: var(--shadow-sm);
  }
  .process-step-h3 {
    font-family: var(--font-display);
    font-size: 1.15rem;
    color: var(--color-text-primary);
    margin-bottom: var(--space-1);
  }
  .process-step-desc {
    font-family: var(--font-body);
    font-size: 0.85rem;
    color: var(--color-text-secondary);
    line-height: var(--leading-tight);
  }

  /* ── NEWSLETTER (overhauled) ──────────────── */
  .nl-section {
    background: var(--cq-cream-mid);
    border: 1px solid var(--cq-cream-dark);
    border-radius: var(--radius-xl);
    padding: var(--space-8) var(--space-6);
    text-align: center;
    max-width: var(--max-width-narrow);
    margin: var(--space-16) auto;
  }
  .nl-badge-container {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: var(--space-2);
  }
  .nl-badge-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--cq-teal);
  }
  .nl-h2 {
    font-family: var(--font-display);
    font-size: clamp(2rem, 4.5vw, 3rem);
    color: var(--color-text-primary);
    margin-bottom: var(--space-2);
  }
  .nl-sub {
    font-family: var(--font-display);
    font-style: italic;
    font-size: 1.15rem;
    color: var(--color-text-secondary);
    margin-bottom: var(--space-4);
  }
  .nl-desc {
    font-family: var(--font-body);
    font-size: 0.85rem;
    color: var(--color-text-muted);
    line-height: var(--leading-body);
    max-width: 42ch;
    margin: 0 auto var(--space-6);
  }
  .nl-form {
    display: flex;
    max-width: 28rem;
    margin: 0 auto;
    border: 1px solid var(--cq-beige);
    border-radius: var(--radius-sm);
    overflow: hidden;
  }
  @media (max-width: 480px) {
    .nl-form {
      flex-direction: column;
      border: none;
      gap: var(--space-3);
    }
    .nl-input {
      border: 1px solid var(--cq-beige);
      border-radius: var(--radius-sm);
    }
    .nl-btn {
      border-radius: var(--radius-sm);
      padding: var(--space-4);
    }
  }
  .nl-input {
    flex: 1;
    background: var(--color-bg-primary);
    color: var(--color-text-primary);
    padding: 0.85rem 1rem;
    font-size: 0.875rem;
    border: none;
    outline: none;
  }
  .nl-btn {
    background: var(--cq-teal);
    color: #ffffff;
    padding: 0.85rem 1.5rem;
    font-size: 0.8125rem;
    font-weight: 500;
    letter-spacing: var(--tracking-wide);
    text-transform: uppercase;
    border: none;
    transition: opacity 0.2s;
  }
  .nl-btn:hover {
    opacity: 0.88;
  }

  /* ── ABOUT SNIPPET ───────────────────────── */
  .about-inner {
    max-width: var(--max-width-narrow);
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: var(--space-6);
  }
  @media (min-width: 640px) {
    .about-inner {
      flex-direction: row;
      text-align: left;
      align-items: center;
      gap: var(--space-8);
    }
  }
  .about-img-wrap {
    width: 200px;
    flex-shrink: 0;
  }
  .about-img {
    width: 100%;
    height: auto;
    border-radius: var(--radius-md);
    filter: grayscale(100%);
    transition: filter 600ms ease;
    box-shadow: var(--shadow-md);
  }
  .about-img:hover {
    filter: grayscale(0%);
  }
  .about-text-h2 {
    font-family: var(--font-display);
    font-size: clamp(2rem, 4.5vw, 2.75rem);
    color: var(--color-text-primary);
    margin-bottom: var(--space-4);
  }
  .about-text-p {
    font-family: var(--font-body);
    font-size: 0.95rem;
    color: var(--color-text-secondary);
    line-height: var(--leading-body);
    margin-bottom: var(--space-6);
  }

  /* ── BUTTONS ────────────────────────────── */
  .btn-primary {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: var(--cq-teal);
    color: #ffffff;
    font-size: 0.8125rem;
    font-weight: 500;
    letter-spacing: var(--tracking-wide);
    text-transform: uppercase;
    padding: 0.85rem 1.75rem;
    border-radius: var(--radius-sm);
    text-decoration: none;
    transition: opacity 0.2s;
    border: none;
  }
  .btn-primary:hover {
    opacity: 0.88;
  }
  .btn-outline {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    color: var(--color-text-primary);
    font-size: 0.8125rem;
    font-weight: 500;
    letter-spacing: var(--tracking-wide);
    text-transform: uppercase;
    padding: 0.85rem 1.75rem;
    border-radius: var(--radius-sm);
    border: 1px solid var(--cq-beige);
    text-decoration: none;
    transition: border-color 0.2s, color 0.2s;
  }
  .btn-outline:hover {
    border-color: var(--color-text-primary);
  }
`;

function ScrambleText({ text }: { text: string }) {
  const chars = useTextScramble(text);
  return (
    <>
      {chars.map((charObj, idx) => {
        let color = "var(--color-text-primary)";
        if (charObj.status === "resolving") color = "var(--cq-teal)";
        if (charObj.status === "scrambled") color = "var(--cq-ink-muted)";

        const isStoriesWord = text.includes("Stories") && idx >= 5 && idx <= 11;
        const isImpactWord = text.includes("Impact") && idx >= 11 && idx <= 16;

        if (isStoriesWord || isImpactWord) {
          return (
            <span
              key={idx}
              style={{
                color: charObj.status === "resolved" ? "var(--cq-teal)" : color,
                display: "inline-block",
                fontStyle: charObj.status === "resolved" ? "italic" : "normal",
              }}
            >
              {charObj.char}
            </span>
          );
        }

        return (
          <span key={idx} style={{ color, display: "inline-block" }}>
            {charObj.char}
          </span>
        );
      })}
    </>
  );
}

const processSteps = [
  { num: "1", title: "Voice Audit", desc: "Before we write anything, we study your existing content, competitors, and audience tone. So our first draft already sounds like you, not like us." },
  { num: "2", title: "Connect", desc: "Discover your story through our contact form, email, or phone for an initial discovery call. We'll explore your brand narrative, business objectives, and audience challenges." },
  { num: "3", title: "Understand", desc: "We immerse ourselves in your brand world — analyzing target audiences, competitive positioning, voice guidelines, and content goals. Deep discovery ensures every word aligns with your strategic vision." },
  { num: "4", title: "Strategize", desc: "Our strategists develop a tailored content roadmap with narrative frameworks, topic clusters, and tonal architecture designed to captivate your audience and amplify your message." },
  { num: "5", title: "Deliver", desc: "Receive publication-ready content within 48 hours, professionally written, thoroughly researched, and polished to perfection. Every piece is optimized for engagement and ready to publish." },
  { num: "6", title: "Refine", desc: "Your satisfaction drives our process. We offer multiple revision rounds to fine-tune content until it perfectly captures your vision and exceeds your expectations." },
];

export default function HomePage() {
  const [nlEmail, setNlEmail] = useState("");
  const [nlSent, setNlSent] = useState(false);
  const [hoverCTA, setHoverCTA] = useState(false);
  const [openStepIdx, setOpenStepIdx] = useState<number | null>(0);

  return (
    <>
      <style>{pageStyles}</style>
      <CQHeader />

      <main>
        {/* ── HERO ─────────────────────────────── */}
        <section className="hero-section">
          <div className="hero-inner">
            {/* Left Content Column */}
            <div className="hero-text">
              <div className="hero-badge-container">
                <span className="hero-badge-dot" />
                <span className="label-text">A CREATIVE CONTENT WRITING AGENCY</span>
              </div>
              <h1 className="hero-h1">
                <ScrambleText text="Human Strategy." /><br />
                <ScrambleText text="Real Stories." /><br />
                <ScrambleText text="Measurable Impact." />
              </h1>
              <p className="hero-sub" data-cursor="text">
                WORDS THAT SATISFY. CONTENT THAT CONVERTS.
              </p>
              <p className="hero-desc" data-cursor="text">
                We craft powerful content that builds trust, drives engagement,
                and delivers real business results.
              </p>

              {/* Feature icons row */}
              <div className="hero-features-row">
                <div className="hero-feature-item">
                  <span>Fast &amp; Reliable</span>
                </div>
                <span className="hero-feature-sep">|</span>
                <div className="hero-feature-item">
                  <span>Strategy &amp; Insight</span>
                </div>
                <span className="hero-feature-sep">|</span>
                <div className="hero-feature-item">
                  <span>Expert Writers</span>
                </div>
              </div>

              {/* Action buttons */}
              <div className="hero-actions">
                <div style={{ position: "relative", display: "inline-block" }}>
                  <Link
                    href="/services"
                    className="btn-primary"
                    onMouseEnter={() => setHoverCTA(true)}
                    onMouseLeave={() => setHoverCTA(false)}
                    data-cursor="button"
                  >
                    START YOUR PROJECT &rarr;
                  </Link>
                  <svg style={{ position: "absolute", bottom: -8, left: 0, width: "100%", height: 12, pointerEvents: "none" }}>
                    <motion.path
                      d="M 5,6 Q 50,14 140,6"
                      stroke="var(--cq-teal)"
                      strokeWidth={2}
                      fill="none"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: hoverCTA ? 1 : 0 }}
                      transition={{ duration: 0.35 }}
                    />
                  </svg>
                </div>
                <Link href="/works" className="btn-outline" data-cursor="button">EXPLORE OUR WORK &rarr;</Link>
              </div>
            </div>

            {/* Right Visual Column */}
            <div className="hero-visual">
              {/* CSS-only Book Cover */}
              <div className="book-container">
                <div className="book">
                  <div className="book-spine-line" />
                  <p className="hero-book-label" style={{ color: "var(--cq-cream-dark)", opacity: 0.8, fontSize: "0.55rem", letterSpacing: "0.2em", textTransform: "uppercase" }}>Creative Quill</p>
                  <div>
                    <h2 className="book-title">THE MANUSCRIPT</h2>
                    {/* Gold feather SVG */}
                    <div style={{ display: "flex", justifyContent: "center", marginTop: "1rem", color: "#C4A882" }}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                        <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z" />
                        <line x1="16" y1="8" x2="2" y2="22" />
                        <line x1="17.5" y1="15" x2="9" y2="15" />
                      </svg>
                    </div>
                  </div>
                  <p className="book-author">Est. 2024</p>
                </div>
              </div>

              {/* Dried botanical branch SVG illustration */}
              <svg
                className="botanical-svg"
                width="80"
                height="180"
                viewBox="0 0 100 220"
                fill="none"
                stroke="#C4A882"
                strokeWidth={1.5}
                strokeLinecap="round"
              >
                {/* Stem */}
                <path d="M 50,210 Q 48,110 52,10" />
                {/* Leaves */}
                <path d="M 50,180 Q 25,160 15,165 Q 32,150 50,158" />
                <path d="M 50,158 Q 75,138 85,143 Q 68,128 50,136" />
                <path d="M 50,136 Q 28,116 18,121 Q 33,106 50,114" />
                <path d="M 50,114 Q 72,94 82,99 Q 65,84 50,92" />
                <path d="M 50,92 Q 30,72 20,77 Q 35,62 50,70" />
                <path d="M 50,70 Q 70,50 80,55 Q 63,40 50,48" />
                <path d="M 50,48 Q 32,28 24,33 Q 38,18 50,26" />
              </svg>
            </div>
          </div>
        </section>

        {/* Stats strip & logo ticker */}
        <section style={{ background: "var(--color-bg-primary)" }}>
          <StatsStrip />
          <ClientMarquee />
        </section>

        {/* ── WHY US (BENTO GRID) ──────────────── */}
        <section className="why-section">
          <div className="section-inner">
            <div className="section-label">
              <span className="section-label-line" />
              <span className="section-label-text">What Sets Us Apart</span>
            </div>
            <div className="why-header">
              <h2 className="why-h2" data-cursor="text">Strategic Content.<br />Measurable Growth.</h2>
              <p className="why-h2-desc" data-cursor="text">
                Discover how Creative Quill transforms common content struggles into
                revenue-generating stories that captivate audiences and convert prospects.
              </p>
            </div>

            <BentoGrid />
          </div>
        </section>

        {/* ── AI VS HUMAN COMPARISON ──────────── */}
        <section style={{ background: "var(--color-bg-primary)", padding: "2rem 1.5rem" }}>
          <div className="section-inner">
            <AiVsHuman />
          </div>
        </section>

        {/* ── PROCESS ─────────────────────────── */}
        <section className="process-section">
          <div className="section-inner">
            <div className="section-label">
              <span className="section-label-line" />
              <span className="section-label-text">Our Process</span>
            </div>
            <div className="process-grid">
              {/* Left */}
              <div>
                <h2 className="process-h2" data-cursor="text">Your Story. Our Craft.<br />Results That Matter.</h2>
                <p className="process-desc" data-cursor="text">
                  From discovery to delivery, our story-driven approach transforms your brand
                  message into compelling narratives that resonate with audiences and drive
                  measurable business outcomes. Every step is designed for clarity,
                  collaboration, and content that truly connects.
                </p>
                <div className="process-cta-box">
                  <div className="process-cta-badge">✓ Ready to Transform Your Brand?</div>
                  <h3 className="process-cta-h3">Let&apos;s Craft Content That Converts</h3>
                  <div className="process-checks">
                    {["48-Hour Delivery", "Multiple Revisions", "Premium Quality"].map((c) => (
                      <span key={c} className="process-check" data-cursor="text">
                        <span className="process-check-dot" /> {c}
                      </span>
                    ))}
                  </div>
                  <Link href="/contact" className="btn-primary" style={{ display: "block", textAlign: "center" }} data-cursor="button">
                    Begin Your Journey Now
                  </Link>
                </div>
              </div>

              {/* Steps */}
              <div className="w-full">
                {/* Desktop Version */}
                <div className="hidden md:flex flex-col gap-4">
                  {processSteps.map((step) => (
                    <div key={step.num} className="process-step">
                      <div className="process-step-num">{step.num}</div>
                      <div className="process-step-card" data-cursor="card">
                        <h3 className="process-step-h3">{step.title}</h3>
                        <p className="process-step-desc">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Mobile Version (Accordion) */}
                <div className="block md:hidden">
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                    {processSteps.map((step, i) => {
                      const isStepOpen = openStepIdx === i;
                      return (
                        <div
                          key={step.num}
                          style={{
                            border: "1px solid var(--border)",
                            borderRadius: "var(--radius-md)",
                            background: "var(--color-bg-primary)",
                            overflow: "hidden",
                          }}
                        >
                          <button
                            onClick={() => setOpenStepIdx(isStepOpen ? null : i)}
                            style={{
                              width: "100%",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                              padding: "1rem 1.25rem",
                              border: "none",
                              background: isStepOpen ? "var(--cq-cream-mid)" : "transparent",
                              textAlign: "left",
                              cursor: "pointer",
                              transition: "background 0.2s",
                              borderLeft: isStepOpen ? "4px solid var(--cq-teal)" : "none",
                            }}
                          >
                            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                              <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--cq-teal)" }}>
                                0{step.num}
                              </span>
                              <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--color-text-primary)" }}>
                                {step.title}
                              </span>
                            </div>
                            <span style={{ fontSize: "0.75rem", transition: "transform 0.2s", transform: isStepOpen ? "rotate(180deg)" : "rotate(0deg)" }}>
                              ▼
                            </span>
                          </button>
                          
                          <AnimatePresence initial={false}>
                            {isStepOpen && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2, ease: "easeOut" }}
                                style={{ overflow: "hidden" }}
                              >
                                <div style={{ padding: "1.25rem", borderTop: "1px solid var(--border)", fontSize: "0.85rem", color: "var(--color-text-secondary)", lineHeight: 1.6 }}>
                                  {step.desc}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── FREE AUDIT CARD ─────────────────── */}
        <section style={{ background: "var(--color-bg-primary)", padding: "1rem 1.5rem" }}>
          <div className="section-inner">
            <ContentAuditCard />
          </div>
        </section>

        {/* ── TESTIMONIALS (Marquee Only) ──────── */}
        <SocialProofMarquee />

        {/* ── NEWSLETTER ──────────────────────── */}
        <section className="nl-section">
          <div className="nl-badge-container">
            <span className="nl-badge-dot" />
            <span className="label-text">Newsletter</span>
          </div>
          <h2 className="nl-h2" data-cursor="text">Join Our Network!</h2>
          <p className="nl-sub" data-cursor="text">And Gain Exclusive Access to Writing Tips &amp; Updates!</p>
          <p className="nl-desc" data-cursor="text">
            Subscribe to receive expert advice on manuscript development, story arcs,
            and the publishing journey directly from our top ghostwriters.
          </p>
          {nlSent ? (
            <p style={{ color: "var(--cq-teal)", fontSize: "0.95rem", fontWeight: 600 }}>
              ✓ You&apos;re subscribed — welcome aboard!
            </p>
          ) : (
            <form className="nl-form" onSubmit={(e) => { e.preventDefault(); if (nlEmail) setNlSent(true); }}>
              <input
                id="newsletter-email"
                name="email"
                type="email" className="nl-input" placeholder="Email Address" required
                value={nlEmail} onChange={(e) => setNlEmail(e.target.value)}
                aria-label="Email address"
              />
              <button type="submit" className="nl-btn" data-cursor="button">Join</button>
            </form>
          )}
        </section>

        {/* ── ABOUT SNIPPET ───────────────────── */}
        <section className="about-section">
          <div className="section-inner">
            <div className="about-inner">
              <div className="about-img-wrap">
                <img
                  src="https://images.unsplash.com/photo-1455390582262-044cdead2708?q=80&w=600&auto=format&fit=crop"
                  alt="Creative Quill Desk"
                  className="about-img"
                />
              </div>
              <div style={{ flex: "1 1 280px" }}>
                <h2 className="about-text-h2" data-cursor="text">
                  About <em>Creative Quill</em>
                </h2>
                <p className="about-text-p" data-cursor="text">
                  It all begins with an idea. Maybe you want to publish your first novel.
                  Maybe you&apos;re ready to share your memoir, or perhaps you have a story
                  that&apos;s waiting to be told. Whatever it is, the way you present your
                  narrative can make all the difference in reaching your readers.
                  We adapt to various tones, ranging from lighthearted fun to deep,
                  emotionally heavy stories, ensuring your vision remains uncompromised.
                </p>
                <Link href="/about" className="btn-primary" data-cursor="button">Learn More</Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <CQFooter />
    </>
  );
}
