"use client";

import Link from "next/link";
import { useState } from "react";
import CQHeader from "@/components/cq-header";
import CQFooter from "@/components/cq-footer";

const pageStyles = `
  body { background: var(--muted); }

  /* ── HERO ────────────────────────────────── */
  .hero-section {
    background: var(--background);
    padding: 5rem 1.5rem 4rem;
  }
  .hero-inner {
    max-width: 64rem; margin: 0 auto;
    display: flex; flex-wrap: wrap;
    align-items: center; gap: 3.5rem;
    justify-content: center;
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
  .hero-book:hover {
    box-shadow: 0 25px 65px color-mix(in oklch, var(--foreground) 20%, transparent);
  }
  .hero-book-label {
    text-align: center; font-size: 0.55rem;
    letter-spacing: 0.3em; color: var(--muted-foreground);
    margin-bottom: 1.5rem; text-transform: uppercase;
  }
  .hero-book img {
    width: 100%; height: 360px; object-fit: cover;
    filter: grayscale(1) contrast(1.25);
    border-radius: var(--radius-sm);
    display: block;
  }
  .hero-book-overlay {
    position: absolute; top: 50%; left: 0; width: 100%;
    background: color-mix(in oklch, var(--card) 92%, transparent);
    padding: 1rem 0; transform: translateY(-50%);
    text-align: center; backdrop-filter: blur(4px);
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
  }
  .hero-badge-dot {
    width: 6px; height: 6px; border-radius: 50%;
    background: var(--primary); flex-shrink: 0;
  }
  .hero-actions { display: flex; flex-wrap: wrap; gap: 1rem; }

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
  .why-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
  }
  @media (max-width: 700px) { .why-grid { grid-template-columns: 1fr; } }
  .why-header {
    grid-column: 1 / -1;
    display: grid; gap: 2rem;
    grid-template-columns: 1fr 1fr;
    margin-bottom: 1.5rem;
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
  .why-card {
    border: 2px solid var(--border);
    background: var(--card);
    border-radius: var(--radius-md);
    overflow: hidden;
    display: grid; grid-template-columns: 1fr 1fr;
    grid-column: 1 / -1;
    transition: box-shadow 0.2s;
  }
  .why-card:hover { box-shadow: 0 4px 20px color-mix(in oklch, var(--foreground) 8%, transparent); }
  .why-problem {
    display: flex; align-items: center; justify-content: flex-end;
    gap: 1rem; padding: 1.25rem 1.5rem;
    border-right: 1px solid var(--border);
  }
  .why-problem-text { flex: 1; text-align: right; }
  .why-problem-text h3 {
    font-size: 0.875rem; font-weight: 600;
    color: var(--foreground); margin: 0 0 0.25rem;
  }
  .why-problem-text p {
    font-size: 0.78rem; color: var(--muted-foreground); margin: 0;
    line-height: 1.6;
  }
  .why-x {
    width: 2rem; height: 2rem; border-radius: 50%;
    background: color-mix(in oklch, var(--destructive) 15%, transparent);
    display: flex; align-items: center; justify-content: center;
    font-size: 0.75rem; font-weight: 700;
    color: var(--destructive); flex-shrink: 0;
  }
  .why-solution {
    display: flex; align-items: center;
    gap: 1rem; padding: 1.25rem 1.5rem;
    background: color-mix(in oklch, var(--primary) 5%, transparent);
  }
  .why-check {
    width: 2rem; height: 2rem; border-radius: 50%;
    background: color-mix(in oklch, var(--primary) 15%, transparent);
    display: flex; align-items: center; justify-content: center;
    font-size: 0.75rem; color: var(--primary); flex-shrink: 0;
  }
  .why-solution-text h3 {
    font-size: 0.875rem; font-weight: 600;
    color: var(--foreground); margin: 0 0 0.25rem;
  }
  .why-solution-text p {
    font-size: 0.78rem; color: var(--muted-foreground); margin: 0;
    line-height: 1.6;
  }
  @media (max-width: 580px) {
    .why-card { grid-template-columns: 1fr; }
    .why-problem { border-right: none; border-bottom: 1px solid var(--border); justify-content: flex-start; }
    .why-problem-text { text-align: left; }
  }
  .why-cta-wrap { text-align: center; margin-top: 2.5rem; }

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
  .process-step-card:hover {
    border-color: color-mix(in oklch, var(--primary) 30%, transparent);
    box-shadow: 0 4px 16px color-mix(in oklch, var(--foreground) 6%, transparent);
  }
  .process-step-h3 {
    font-size: 0.95rem; font-weight: 600;
    color: var(--foreground); margin: 0 0 0.35rem;
  }
  .process-step-desc {
    font-size: 0.78rem; color: var(--muted-foreground);
    line-height: 1.7; margin: 0;
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
    display: flex; max-width: 28rem; margin: 0 auto; border-radius: var(--radius-sm); overflow: hidden;
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

const whyItems = [
  {
    problem: { title: "Time Constraints Slow Growth", desc: "Inconsistent publishing schedules hurt brand visibility and search rankings." },
    solution: { title: "Lightning-Fast Turnaround", desc: "Professional content delivered within 48 hours keeps momentum strong and calendars full." },
  },
  {
    problem: { title: "Generic Copy Falls Flat", desc: "Surface-level content fails to establish authority or build meaningful audience connections." },
    solution: { title: "Story-Driven Engagement", desc: "Compelling narratives that reflect your brand voice, build trust, and turn readers into loyal customers." },
  },
  {
    problem: { title: "Inconsistent Quality Damages Trust", desc: "Variable writing standards erode credibility and confuse your message." },
    solution: { title: "Expert Craft. Every Time.", desc: "Dedicated writers ensure every piece maintains premium quality aligned with your brand standards." },
  },
  {
    problem: { title: "AI Content That Sounds Like Everyone Else", desc: "Clients can't tell your brand apart because the content has no real voice or original insight." },
    solution: { title: "Unmistakably You", desc: "We develop your brand voice from scratch and write content only your brand could publish — no generic filler, no recycled takes." },
  },
];

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

  return (
    <>
      <style>{pageStyles}</style>
      <CQHeader />
      <main>
        {/* ── HERO ─────────────────────────────── */}
        <section className="hero-section">
          <div className="hero-inner">
            {/* Book card */}
            <div className="hero-book">
              <p className="hero-book-label">Creative Quill</p>
              <img
                src="https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=800&auto=format&fit=crop"
                alt="Manuscript Development"
              />
              <div className="hero-book-overlay">
                <h2 className="hero-book-title">THE MANUSCRIPT</h2>
              </div>
            </div>

            {/* Text */}
            <div className="hero-text">
              <span className="hero-badge">Featured Service</span>
              <h1 className="hero-h1">
                Human Strategy.<br />Real Stories.<br />
                <em>Not AI Filler.</em>
              </h1>
              <p className="hero-sub">
                Bringing your untold stories to life, from concept to completed manuscript.
              </p>
              <p className="hero-desc">
                The internet is drowning in AI-generated content that says nothing.
                Creative Quill crafts content with genuine voice, original insight,
                and strategy — the kind that builds audiences, not just pageviews.
              </p>
              <p className="hero-highlight">
                Because when your content feels authentic, your business does too.
              </p>
              <div className="hero-badges">
                {["24h Response Time", "Free Consultation", "Industry Expert Writers"].map((b) => (
                  <span key={b} className="hero-badge-item">
                    <span className="hero-badge-dot" /> {b}
                  </span>
                ))}
              </div>
              <div className="hero-actions">
                <Link href="/services" className="btn-primary">Start Your Journey</Link>
                <Link href="/works" className="btn-outline">Browse Our Works</Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── WHY US ──────────────────────────── */}
        <section className="why-section">
          <div className="section-inner">
            <div className="section-label">
              <span className="section-label-line" />
              <span className="section-label-text">What Sets Us Apart</span>
            </div>
            <div className="why-grid">
              <div className="why-header">
                <h2 className="why-h2">Strategic Content.<br />Measurable Growth.</h2>
                <p className="why-h2-desc">
                  Discover how Creative Quill transforms common content struggles into
                  revenue-generating stories that captivate audiences and convert prospects.
                </p>
              </div>
              {whyItems.map(({ problem, solution }) => (
                <div key={problem.title} className="why-card">
                  <div className="why-problem">
                    <div className="why-problem-text">
                      <h3>{problem.title}</h3>
                      <p>{problem.desc}</p>
                    </div>
                    <div className="why-x">✗</div>
                  </div>
                  <div className="why-solution">
                    <div className="why-check">✓</div>
                    <div className="why-solution-text">
                      <h3>{solution.title}</h3>
                      <p>{solution.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="why-cta-wrap">
              <Link href="/contact" className="btn-primary">Transform Your Content Strategy</Link>
            </div>
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
                <h2 className="process-h2">Your Story. Our Craft.<br />Results That Matter.</h2>
                <p className="process-desc">
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
                      <span key={c} className="process-check">
                        <span className="process-check-dot" /> {c}
                      </span>
                    ))}
                  </div>
                  <Link href="/contact" className="btn-primary" style={{ display: "block", textAlign: "center" }}>
                    Begin Your Journey Now
                  </Link>
                </div>
              </div>

              {/* Steps */}
              <div className="process-steps">
                {processSteps.map((step) => (
                  <div key={step.num} className="process-step">
                    <div className="process-step-num">{step.num}</div>
                    <div className="process-step-card">
                      <h3 className="process-step-h3">{step.title}</h3>
                      <p className="process-step-desc">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── REVIEWS ─────────────────────────── */}
        <section className="reviews-section">
          <div className="section-inner">
            <div className="reviews-grid">
              {reviews.map(({ quote, author }) => (
                <div key={author} className="review-card">
                  <div className="review-stars">★★★★★</div>
                  <p className="review-quote">&ldquo;{quote}&rdquo;</p>
                  <p className="review-author">— {author}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── NEWSLETTER ──────────────────────── */}
        <section className="nl-section">
          <h2 className="nl-h2">Join Our Network!</h2>
          <p className="nl-sub">And Gain Exclusive Access to Writing Tips &amp; Updates!</p>
          <p className="nl-desc">
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
              <button type="submit" className="nl-btn">Join</button>
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
              <h2 className="about-text-h2">
                About <em>Creative Quill</em>
              </h2>
              <p className="about-text-p">
                It all begins with an idea. Maybe you want to publish your first novel.
                Maybe you&apos;re ready to share your memoir, or perhaps you have a story
                that&apos;s waiting to be told. Whatever it is, the way you present your
                narrative can make all the difference in reaching your readers.
                We adapt to various tones, ranging from lighthearted fun to deep,
                emotionally heavy stories, ensuring your vision remains uncompromised.
              </p>
              <Link href="/about" className="btn-primary">Learn More</Link>
            </div>
          </div>
        </section>
      </main>
      <CQFooter />
    </>
  );
}
