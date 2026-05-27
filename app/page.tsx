"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import CQHeader from "@/components/cq-header";
import CQFooter from "@/components/cq-footer";
import { useTextScramble } from "@/hooks/useTextScramble";
import {
  ProximityGrid,
  TypewriterTagline,
  StatsStrip,
  ClientMarquee,
  BentoGrid,
  AiVsHuman,
  ContentAuditCard,
  SocialProofMarquee,
} from "@/components/effects/HomeComponents";

const pageStyles = `
  body { background: var(--muted); }

  /* ── HERO ────────────────────────────────── */
  .hero-section {
    background: var(--background);
    padding: clamp(2.5rem, 8vw, 5rem) 1.25rem clamp(2rem, 6vw, 4rem);
    position: relative;
    overflow: hidden;
  }
  .hero-inner {
    max-width: 64rem; margin: 0 auto;
    display: flex; flex-wrap: wrap;
    align-items: center; gap: 2.5rem;
    justify-content: center;
    position: relative;
    z-index: 2;
  }
  .hero-book {
    position: relative; background: var(--card);
    padding: 1rem 1rem 3rem;
    border-radius: var(--radius-sm);
    box-shadow: 0 20px 60px color-mix(in oklch, var(--foreground) 15%, transparent);
    transition: box-shadow 0.3s ease;
    max-width: 300px; width: 100%;
    flex-shrink: 0;
  }
  /* Hide book card on small screens to avoid layout crowding */
  @media (max-width: 640px) { .hero-book { display: none; } }
  .hero-book:hover {
    box-shadow: 0 25px 65px color-mix(in oklch, var(--foreground) 20%, transparent);
  }
  .hero-book-label {
    text-align: center; font-size: 0.55rem;
    letter-spacing: 0.3em; color: var(--muted-foreground);
    margin-bottom: 1.5rem; text-transform: uppercase;
  }
  .hero-book-overlay {
    position: absolute; top: 50%; left: 0; width: 100%;
    background: color-mix(in oklch, var(--card) 92%, transparent);
    padding: 1rem 0; transform: translateY(-50%);
    text-align: center; backdrop-filter: blur(4px);
    z-index: 5;
  }
  .hero-book-title {
    font-family: var(--font-serif);
    font-size: 1.4rem; letter-spacing: 0.2em;
    color: var(--card-foreground); margin: 0;
  }
  .hero-text { flex: 1 1 300px; }
  .hero-badge {
    font-size: 0.65rem; font-weight: 700;
    letter-spacing: 0.2em; color: var(--foreground);
    text-transform: uppercase; display: block; margin-bottom: 1rem;
  }
  .hero-h1 {
    font-family: var(--font-serif);
    font-size: clamp(2rem, 5vw, 3.25rem);
    color: var(--foreground); line-height: 1.15;
    margin: 0 0 1rem;
  }
  .hero-sub {
    font-family: var(--font-serif);
    font-size: 1.1rem; color: var(--foreground);
    line-height: 1.65; margin: 0 0 1rem;
  }
  .hero-desc {
    font-size: 0.875rem; color: var(--muted-foreground);
    line-height: 1.85; max-width: 28rem; margin: 0 0 1.75rem;
  }
  .hero-highlight {
    font-size: 0.9rem; font-weight: 600;
    color: var(--foreground); line-height: 1.65;
    margin: 0 0 1.75rem;
  }
  .hero-badges {
    display: flex; flex-wrap: wrap; gap: 1rem 1.5rem;
    margin-bottom: 1.75rem;
  }
  .hero-badge-item {
    display: flex; align-items: center; gap: 0.5rem;
    font-size: 0.78rem; color: var(--muted-foreground);
    min-height: 36px;
  }
  .hero-badge-dot {
    width: 6px; height: 6px; border-radius: 50%;
    background: var(--primary); flex-shrink: 0;
  }
  .hero-actions { display: flex; flex-wrap: wrap; gap: 1.5rem; align-items: center; }

  /* Stroke effect for the word "Stories" */
  .hero-stroke {
    -webkit-text-stroke: 1.2px var(--foreground);
    color: transparent;
  }

  /* ── WHY US ──────────────────────────────── */
  .why-section {
    background: var(--background);
    padding: 4rem 1.5rem;
    border-top: 1px solid var(--border);
  }
  .section-inner { max-width: 72rem; margin: 0 auto; }
  .section-label {
    display: flex; align-items: center; gap: 0.75rem;
    margin-bottom: 1.5rem;
  }
  .section-label-line {
    width: 2rem; height: 1px; background: var(--border);
  }
  .section-label-text {
    font-size: 0.7rem; font-weight: 500;
    letter-spacing: 0.15em; text-transform: uppercase;
    color: var(--muted-foreground);
  }
  .why-header {
    display: grid; gap: 2rem;
    grid-template-columns: 1fr 1fr;
    margin-bottom: 2.5rem;
  }
  @media (max-width: 700px) { .why-header { grid-template-columns: 1fr; } }
  .why-h2 {
    font-family: var(--font-serif);
    font-size: clamp(1.75rem, 3.5vw, 2.5rem);
    color: var(--foreground); line-height: 1.2; margin: 0;
  }
  .why-h2-desc {
    font-size: 0.9rem; color: var(--muted-foreground);
    line-height: 1.75; margin: 0; align-self: end;
  }

  /* ── PROCESS ────────────────────────────── */
  .process-section {
    background: var(--background);
    padding: 4rem 1.5rem;
    border-top: 1px solid var(--border);
  }
  .process-grid {
    display: grid; gap: 3rem;
    grid-template-columns: 1fr 1fr;
    align-items: start;
  }
  @media (max-width: 800px) { .process-grid { grid-template-columns: 1fr; } }
  .process-h2 {
    font-family: var(--font-serif);
    font-size: clamp(1.75rem, 3.5vw, 2.5rem);
    color: var(--foreground); line-height: 1.2; margin: 0 0 1rem;
  }
  .process-desc {
    font-size: 0.875rem; color: var(--muted-foreground);
    line-height: 1.85; margin: 0 0 2rem;
  }
  .process-cta-box {
    border: 2px solid color-mix(in oklch, var(--primary) 30%, transparent);
    background: color-mix(in oklch, var(--primary) 6%, var(--background));
    border-radius: var(--radius-md); padding: 1.5rem;
  }
  .process-cta-badge {
    display: inline-flex; align-items: center; gap: 0.5rem;
    background: color-mix(in oklch, var(--primary) 12%, transparent);
    color: var(--primary); border-radius: 999px;
    padding: 0.35rem 0.85rem;
    font-size: 0.68rem; font-weight: 600; margin-bottom: 0.75rem;
  }
  .process-cta-h3 {
    font-family: var(--font-serif);
    font-size: 1.15rem; color: var(--foreground);
    margin: 0 0 1rem;
  }
  .process-checks { display: flex; flex-wrap: wrap; gap: 0.75rem; margin-bottom: 1.25rem; }
  .process-check {
    display: flex; align-items: center; gap: 0.4rem;
    font-size: 0.78rem; color: var(--muted-foreground);
  }
  .process-check-dot {
    width: 5px; height: 5px; border-radius: 50%;
    background: var(--primary); flex-shrink: 0;
  }
  .process-steps { display: flex; flex-direction: column; gap: 1rem; }
  .process-step {
    display: flex; align-items: flex-start; gap: 1rem; position: relative;
  }
  .process-step-num {
    width: 3rem; height: 3rem; border-radius: 50%;
    background: var(--primary); color: var(--primary-foreground);
    display: flex; align-items: center; justify-content: center;
    font-size: 1.1rem; font-weight: 700;
    flex-shrink: 0; position: relative; z-index: 1;
  }
  .process-step-card {
    flex: 1; border: 2px solid var(--border);
    background: var(--card); border-radius: var(--radius-md);
    padding: 1rem 1.25rem;
    transition: border-color 0.2s, box-shadow 0.2s;
  }
  @media (hover: hover) and (pointer: fine) {
    .process-step-card:hover {
      border-color: color-mix(in oklch, var(--primary) 30%, transparent);
      box-shadow: 0 4px 16px color-mix(in oklch, var(--foreground) 6%, transparent);
    }
  }

  /* ── REVIEWS ──────────────────────────────── */
  .reviews-section {
    background: var(--background);
    padding: 4rem 1.5rem;
    border-top: 1px solid var(--border);
  }
  .reviews-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 1.5rem;
  }
  .review-card {
    background: var(--secondary);
    border-radius: var(--radius-md);
    padding: 2rem;
    transition: box-shadow 0.2s;
  }
  .review-card:hover {
    box-shadow: 0 8px 32px color-mix(in oklch, var(--foreground) 10%, transparent);
  }
  .review-stars { font-size: 0.85rem; color: var(--foreground); margin-bottom: 1rem; letter-spacing: 2px; }
  .review-quote {
    font-size: 0.83rem; color: var(--muted-foreground);
    line-height: 1.8; margin-bottom: 1.25rem;
  }
  .review-author {
    font-size: 0.65rem; font-weight: 700;
    letter-spacing: 0.15em; text-transform: uppercase;
    color: var(--foreground);
  }

  /* ── NEWSLETTER ──────────────────────────── */
  .nl-section {
    background: var(--primary); padding: 4.5rem 1.5rem; text-align: center;
  }
  .nl-h2 {
    font-family: var(--font-serif);
    font-size: clamp(1.75rem, 4vw, 2.5rem);
    color: var(--primary-foreground); margin: 0 0 0.75rem;
  }
  .nl-sub {
    font-family: var(--font-serif); font-style: italic;
    font-size: 1.05rem;
    color: color-mix(in oklch, var(--primary-foreground) 75%, transparent);
    margin: 0 0 1rem;
  }
  .nl-desc {
    font-size: 0.78rem;
    color: color-mix(in oklch, var(--primary-foreground) 55%, transparent);
    line-height: 1.8; max-width: 28rem; margin: 0 auto 2.5rem;
  }
  .nl-form {
    display: flex; max-width: 28rem; margin: 0 auto;
    border-radius: var(--radius-sm); overflow: hidden;
    flex-wrap: wrap;
  }
  /* Stack form on mobile */
  @media (max-width: 480px) {
    .nl-form { flex-direction: column; border-radius: var(--radius-md); overflow: visible; }
    .nl-input { border-radius: var(--radius-sm); width: 100%; font-size: 16px !important; }
    .nl-btn { border-radius: var(--radius-sm); width: 100%; border-left: none; border-top: 1px solid color-mix(in oklch, var(--primary) 20%, transparent); padding: 1rem; }
  }
  .nl-input {
    flex: 1; background: var(--primary-foreground);
    color: var(--primary); border: none;
    padding: 0.85rem 1rem; font-size: 0.875rem; outline: none;
  }
  .nl-input::placeholder { color: color-mix(in oklch, var(--primary) 55%, transparent); }
  .nl-btn {
    background: var(--primary-foreground); color: var(--primary);
    border: none; border-left: 1px solid color-mix(in oklch, var(--primary) 20%, transparent);
    padding: 0.85rem 1.5rem;
    font-size: 0.68rem; font-weight: 700;
    letter-spacing: 0.15em; text-transform: uppercase;
    cursor: pointer; transition: opacity 0.2s; white-space: nowrap;
  }
  .nl-btn:hover { opacity: 0.82; }

  /* ── ABOUT SNIPPET ───────────────────────── */
  .about-section {
    background: var(--background); padding: 5rem 1.5rem;
  }
  .about-inner {
    max-width: 52rem; margin: 0 auto;
    display: flex; flex-wrap: wrap;
    align-items: center; gap: 2.5rem; justify-content: center;
  }
  .about-img-wrap { width: clamp(140px, 18vw, 220px); flex-shrink: 0; }
  .about-img {
    width: 100%; height: auto; object-fit: cover;
    border-radius: var(--radius-md);
    filter: grayscale(1) contrast(1.1);
    box-shadow: 0 12px 40px color-mix(in oklch, var(--foreground) 15%, transparent);
  }
  .about-text-h2 {
    font-family: var(--font-serif);
    font-size: clamp(1.65rem, 3.5vw, 2.25rem);
    color: var(--foreground); margin: 0 0 1.25rem;
  }
  .about-text-p {
    font-size: 0.875rem; color: var(--muted-foreground);
    line-height: 1.85; margin: 0 0 2rem;
  }

  /* ── SHARED BUTTONS ──────────────────────── */
  .btn-primary {
    display: inline-block; background: var(--primary); color: var(--primary-foreground);
    font-size: 0.7rem; font-weight: 700; letter-spacing: 0.15em;
    text-transform: uppercase; padding: 1rem 2rem;
    border-radius: var(--radius-sm); border: 1px solid var(--primary);
    text-decoration: none; text-align: center;
    transition: opacity 0.2s;
  }
  .btn-primary:hover { opacity: 0.85; }
  .btn-outline {
    display: inline-block; background: var(--background); color: var(--primary);
    font-size: 0.7rem; font-weight: 700; letter-spacing: 0.15em;
    text-transform: uppercase; padding: 1rem 2rem;
    border-radius: var(--radius-sm); border: 1px solid var(--primary);
    text-decoration: none; text-align: center;
    transition: background 0.2s;
  }
  .btn-outline:hover { background: var(--secondary); }
`;

function ScrambleText({ text }: { text: string }) {
  const chars = useTextScramble(text);
  return (
    <>
      {chars.map((charObj, idx) => {
        let color = "var(--foreground)";
        if (charObj.status === "resolving") color = "var(--primary)";
        if (charObj.status === "scrambled") color = "var(--muted-foreground)";

        // Outlined word "Stories" (index 5 to 11 in "Real Stories.")
        const isStoriesWord = text.includes("Stories") && idx >= 5 && idx <= 11;

        if (isStoriesWord) {
          return (
            <span
              key={idx}
              className="hero-stroke"
              style={{
                color: charObj.status === "resolved" ? "transparent" : color,
                display: "inline-block",
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

function FloatingQuill({ hoverCTA }: { hoverCTA: boolean }) {
  const { scrollY } = useScroll();
  const yParallax = useTransform(scrollY, [0, 800], [0, 180]);

  return (
    <motion.div
      style={{
        position: "absolute",
        right: "3rem",
        top: "35%",
        y: yParallax,
        pointerEvents: "none",
        zIndex: 1,
      }}
      className="hidden lg:block"
    >
      <motion.svg
        width="140"
        height="200"
        viewBox="0 0 100 150"
        animate={{
          y: [-8, 8],
          rotate: [-2, 3],
        }}
        transition={{
          repeat: Infinity,
          repeatType: "reverse",
          duration: 3.5,
          ease: "easeInOut",
        }}
        style={{ opacity: 0.16, fill: "none", stroke: "var(--foreground)" }}
      >
        <path
          d="M 50,140 Q 48,90 35,40 Q 30,20 40,10 Q 52,5 50,30 Q 48,55 50,80 Q 52,110 50,140"
          strokeWidth="2"
        />
        <path d="M 45,95 Q 35,90 28,95" strokeWidth="1" />
        <path d="M 46,80 Q 33,72 26,75" strokeWidth="1" />
        <path d="M 47,65 Q 32,54 24,55" strokeWidth="1" />
        <path d="M 48,50 Q 33,38 27,35" strokeWidth="1" />
        <path d="M 49,35 Q 36,25 32,18" strokeWidth="1" />
        <path d="M 49,95 Q 58,92 65,97" strokeWidth="1" />
        <path d="M 48,80 Q 60,76 68,81" strokeWidth="1" />
        <path d="M 47,65 Q 61,59 70,62" strokeWidth="1" />
        <path d="M 47,50 Q 60,42 68,43" strokeWidth="1" />
        <path d="M 48,35 Q 58,28 64,26" strokeWidth="1" />
      </motion.svg>
    </motion.div>
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

const reviews = [
  { quote: "Creative Quill took my rough outline and transformed it into a breathtaking romance novel. Their ability to capture my intended voice while elevating the prose was truly remarkable. Highly recommended.", author: "Sarah M." },
  { quote: "The structured development process gave me so much peace of mind. They hit every deadline and the character arcs were deeper than I ever imagined. My thriller is now ready for publishing.", author: "David L." },
  { quote: "Exceptional editing and story planning. I came to them stuck on a major plot hole in my fantasy series, and their consultation services got me back on track instantly. Worth every penny.", author: "Elena R." },
];

export default function HomePage() {
  const [nlEmail, setNlEmail] = useState("");
  const [nlSent, setNlSent] = useState(false);
  const [hoverCTA, setHoverCTA] = useState(false);

  return (
    <>
      <style>{pageStyles}</style>
      <CQHeader />

      <main>
        {/* ── HERO ─────────────────────────────── */}
        <section className="hero-section">
          <FloatingQuill hoverCTA={hoverCTA} />

          <div className="hero-inner">
            {/* Proximity dot background book card */}
            <div
              className="hero-book"
              style={{
                height: "380px",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                position: "relative",
              }}
              data-cursor="card"
            >
              <p className="hero-book-label">Creative Quill</p>
              <div style={{ flex: 1, position: "relative" }}>
                <ProximityGrid hoverCTA={hoverCTA} />
                <div className="hero-book-overlay">
                  <h2 className="hero-book-title">THE MANUSCRIPT</h2>
                </div>
              </div>
            </div>

            {/* Text */}
            <div className="hero-text">
              <span className="hero-badge" data-cursor="text">Featured Service</span>
              <h1 className="hero-h1">
                <ScrambleText text="Human Strategy." /><br />
                <ScrambleText text="Real Stories." /><br />
                <ScrambleText text="Not AI Filler." />
              </h1>
              <p className="hero-sub" data-cursor="text">
                <TypewriterTagline />
              </p>
              <p className="hero-desc" data-cursor="text">
                The internet is drowning in AI-generated content that says nothing.
                Creative Quill crafts content with genuine voice, original insight,
                and strategy — the kind that builds audiences, not just pageviews.
              </p>
              <p className="hero-highlight" data-cursor="text">
                Because when your content feels authentic, your business does too.
              </p>
              <div className="hero-badges">
                {["24h Response Time", "Free Consultation", "Industry Expert Writers"].map((b) => (
                  <span key={b} className="hero-badge-item" data-cursor="text">
                    <span className="hero-badge-dot" /> {b}
                  </span>
                ))}
              </div>
              <div className="hero-actions">
                <div style={{ position: "relative", display: "inline-block" }}>
                  <Link
                    href="/services"
                    className="btn-primary"
                    onMouseEnter={() => setHoverCTA(true)}
                    onMouseLeave={() => setHoverCTA(false)}
                    data-cursor="button"
                  >
                    Start Your Journey
                  </Link>
                  <svg style={{ position: "absolute", bottom: -8, left: 0, width: "100%", height: 12, pointerEvents: "none" }}>
                    <motion.path
                      d="M 5,6 Q 50,14 140,6"
                      stroke="var(--primary)"
                      strokeWidth={2}
                      fill="none"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: hoverCTA ? 1 : 0 }}
                      transition={{ duration: 0.35 }}
                    />
                  </svg>
                </div>
                <Link href="/works" className="btn-outline" data-cursor="button">Browse Our Works</Link>
              </div>
            </div>
          </div>
        </section>

        {/* Stats strip & logo ticker */}
        <section style={{ background: "var(--background)" }}>
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
        <section style={{ background: "var(--background)", padding: "2rem 1.5rem" }}>
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
              <div className="process-steps">
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
            </div>
          </div>
        </section>

        {/* ── FREE AUDIT CARD ─────────────────── */}
        <section style={{ background: "var(--background)", padding: "1rem 1.5rem" }}>
          <div className="section-inner">
            <ContentAuditCard />
          </div>
        </section>

        {/* ── REVIEWS & MARQUEE ───────────────── */}
        <section className="reviews-section">
          <div className="section-inner">
            <div className="reviews-grid">
              {reviews.map(({ quote, author }) => (
                <div key={author} className="review-card" data-cursor="card">
                  <div className="review-stars">★★★★★</div>
                  <p className="review-quote">&ldquo;{quote}&rdquo;</p>
                  <p className="review-author">— {author}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <SocialProofMarquee />

        {/* ── NEWSLETTER ──────────────────────── */}
        <section className="nl-section">
          <h2 className="nl-h2" data-cursor="text">Join Our Network!</h2>
          <p className="nl-sub" data-cursor="text">And Gain Exclusive Access to Writing Tips &amp; Updates!</p>
          <p className="nl-desc" data-cursor="text">
            Subscribe to receive expert advice on manuscript development, story arcs,
            and the publishing journey directly from our top ghostwriters.
          </p>
          {nlSent ? (
            <p style={{ color: "var(--primary-foreground)", fontSize: "0.95rem" }}>
              ✓ You&apos;re subscribed — welcome aboard!
            </p>
          ) : (
            <form className="nl-form" onSubmit={(e) => { e.preventDefault(); if (nlEmail) setNlSent(true); }}>
              <input
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
        </section>
      </main>

      <CQFooter />
    </>
  );
}
