"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CQHeader from "@/components/cq-header";
import CQFooter from "@/components/cq-footer";
import HeroIllustration from "@/components/illustrations/HeroIllustration";
import {
  StatsStrip,
  ClientMarquee,
  BentoGrid,
  AiVsHuman,
  ContentAuditCard,
  SocialProofMarquee,
  OpenForWorkBadge,
} from "@/components/effects/HomeComponents";
import { ProcessSection } from "@/components/sections/ProcessSection";

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
    background: var(--cq-forest);
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

  /* Section Styles */
  .why-section, .process-section {
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
  /* ── PROCESS MARQUEE ────────────────────── */
  .cq-process-marquee-container {
    display: flex;
    overflow: hidden;
    width: 100%;
    position: relative;
    padding: var(--space-4) 0;
  }
  .cq-process-marquee-inner {
    display: flex;
    gap: 1.5rem;
    animation: process-marquee-scroll 70s linear infinite;
  }
  .cq-process-marquee-container:hover .cq-process-marquee-inner {
    animation-play-state: paused;
  }
  
  .cq-process-card {
    background: var(--cq-cream);
    border: 1px solid var(--cq-cream-dark);
    border-radius: var(--radius-lg);
    padding: var(--space-6);
    min-width: 280px;
    max-width: 340px;
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: 0.75rem;
    transition: all 250ms ease;
  }
  .cq-process-card:hover {
    border-color: var(--cq-linen) !important;
    box-shadow: var(--shadow-md);
    transform: translateY(-2px);
  }
  
  .cq-process-card-num {
    font-family: var(--font-sans);
    font-weight: 600;
    font-size: 2.25rem;
    color: var(--cq-linen);
    line-height: 1;
  }
  .cq-process-card-title {
    font-family: var(--font-display);
    font-size: 1.25rem;
    font-weight: 400;
    color: var(--cq-ink);
    margin: 0;
  }
  .cq-process-card-desc {
    font-family: var(--font-body);
    font-size: 0.85rem;
    color: var(--cq-ink-mid);
    line-height: var(--leading-tight);
    margin: 0;
  }
  
  @keyframes process-marquee-scroll {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
  
  @media (pointer: coarse) {
    .cq-process-marquee-container:hover .cq-process-marquee-inner {
      animation-play-state: running !important;
    }
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
    background: var(--cq-forest-light);
    color: var(--cq-forest);
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
    background: var(--cq-forest);
  }


  /* ── BUTTONS ────────────────────────────── */
  .btn-primary {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: var(--cq-forest);
    color: var(--cq-parchment);
    font-size: 0.8125rem;
    font-weight: 500;
    letter-spacing: var(--tracking-wide);
    text-transform: uppercase;
    padding: 0.85rem 1.75rem;
    border-radius: var(--radius-sm);
    text-decoration: none;
    transition: background 0.2s;
    border: none;
  }
  .btn-primary:hover {
    background: var(--cq-forest-hover);
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


// ── NEW TOP 3 SERVICES ──
function FeaturedServices() {
  const services = [
    {
      num: "01",
      name: "Blog Writing",
      tagline: "Engage readers and build search visibility with rich content.",
      price: "From ₹1.5 / word",
      timeline: "Standard 48hr delivery",
      features: [
        "SEO Optimization & research",
        "Tuned to your voice guide",
        "2 rounds of refinements"
      ],
      slug: "blog-writing"
    },
    {
      num: "02",
      name: "Brand Storytelling",
      tagline: "Differentiate with authentic brand narrative assets.",
      price: "From ₹12,000 / project",
      timeline: "Delivered in 5-7 days",
      features: [
        "Founder archetypes mapping",
        "Core origin stories",
        "Tonal consistency audit"
      ],
      slug: "brand-storytelling"
    },
    {
      num: "03",
      name: "SEO Content",
      tagline: "Drive high-intent traffic with optimized pages.",
      price: "From ₹2.5 / word",
      timeline: "Delivered in 3-4 days",
      features: [
        "Keyword cluster mapping",
        "Rich meta details",
        "Internal linking layout"
      ],
      slug: "seo-content"
    }
  ];

  return (
    <section className="section-md border-t border-[var(--cq-linen)] bg-[var(--cq-parchment)]">
      <div className="container-content">
        <div className="flex flex-col gap-2 mb-10 text-center md:text-left">
          <span className="badge-label self-center md:self-start">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="12 2 2 7 12 12 22 7 12 2" />
              <polyline points="2 17 12 22 22 17" />
              <polyline points="2 12 12 17 22 12" />
            </svg>
            FEATURED SERVICES
          </span>
          <h2 className="font-display text-4xl md:text-5xl text-[var(--cq-ink)] text-balance font-normal">
            Content That Moves Businesses Forward
          </h2>
          <p className="text-sm text-[var(--cq-ink-muted)] max-w-[65ch] font-light">
            From brand storytelling to SEO — we cover what matters most.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((s) => (
            <div 
              key={s.num} 
              className="bg-[var(--cq-parchment)] border border-[var(--cq-linen)] rounded-[var(--radius-xl)] p-7 flex flex-col justify-between relative transition-all duration-300 hover:shadow-md hover:-translate-y-1"
            >
              <div>
                <span className="font-sans font-semibold text-6xl text-[var(--cq-parchment-deep)] select-none absolute top-4 right-6 opacity-80">
                  {s.num}
                </span>
                
                <h3 className="font-display text-2xl text-[var(--cq-ink)] mt-2 font-normal">
                  {s.name}
                </h3>
                <p className="text-xs text-[var(--cq-ink-muted)] font-light mt-1 mb-4">
                  {s.tagline}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="badge-tag">{s.price}</span>
                  <span className="text-[10px] text-[var(--cq-ink-faint)] flex items-center">{s.timeline}</span>
                </div>

                <div className="w-full h-px bg-[var(--cq-parchment-deep)] my-4" />

                <ul className="flex flex-col gap-2.5 mb-6">
                  {s.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-xs text-[var(--cq-ink-mid)] font-light">
                      <span className="text-[var(--cq-forest)] font-bold">✓</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <Link 
                  href={`/services#${s.slug}`}
                  className="text-xs font-semibold text-[var(--cq-forest)] hover:text-[var(--cq-forest-hover)] transition-colors inline-flex items-center gap-1 group"
                >
                  Learn More <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link 
            href="/services" 
            className="px-6 py-3 border border-[var(--cq-linen)] rounded-[var(--radius-sm)] text-xs font-semibold uppercase tracking-wider text-[var(--cq-ink)] hover:border-[var(--cq-ink)] transition-colors inline-flex items-center gap-1"
          >
            See All Services &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}

// ── NEW COST ESTIMATOR ──
function CostCalculator() {
  const [service, setService] = useState("blog");
  const [words, setWords] = useState(1000);

  const calculatePrice = () => {
    let price = 0;
    let isProject = false;
    switch (service) {
      case "blog":
        price = words * 1.5;
        break;
      case "article":
        price = words * 2.0;
        break;
      case "seo":
        price = words * 2.5;
        break;
      case "story":
        price = 12000;
        isProject = true;
        break;
      case "web":
        price = 20000;
        isProject = true;
        break;
      default:
        price = 0;
    }
    return { price, isProject };
  };

  const { price, isProject } = calculatePrice();

  return (
    <section className="section-md border-t border-[var(--cq-linen)] bg-[var(--cq-parchment-mid)]">
      <div className="container-content">
        <div className="flex flex-col gap-2 mb-10 text-center">
          <span className="badge-label self-center">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="1" x2="12" y2="23" />
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
            PRICING ESTIMATOR
          </span>
          <h2 className="font-display text-4xl md:text-5xl text-[var(--cq-ink)] text-balance font-normal">
            Get an Instant Cost Estimate
          </h2>
          <p className="text-sm text-[var(--cq-ink-muted)] max-w-[65ch] mx-auto font-light">
            No surprises. Know your budget before you reach out.
          </p>
        </div>

        <div className="max-w-[640px] mx-auto bg-[var(--cq-parchment)] border border-[var(--cq-linen)] rounded-[var(--radius-xl)] p-8 md:p-10 shadow-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            <div className="flex flex-col gap-2">
              <label htmlFor="estimator-service" className="text-xs font-semibold text-[var(--cq-ink-muted)] uppercase tracking-wider">Service Type</label>
              <select
                id="estimator-service"
                value={service}
                onChange={(e) => setService(e.target.value)}
                className="w-full bg-[var(--cq-parchment-mid)] border border-[var(--cq-linen)] rounded-[var(--radius-md)] px-3 py-2 text-sm text-[var(--cq-ink)] focus:outline-none focus:ring-1 focus:ring-[var(--cq-forest)]"
              >
                <option value="blog">Blog Writing (₹1.5/word)</option>
                <option value="article">Article Writing (₹2.0/word)</option>
                <option value="seo">SEO Content (₹2.5/word)</option>
                <option value="story">Brand Storytelling (Flat)</option>
                <option value="web">Website Copy (Flat)</option>
                <option value="custom">Custom Content (Contact Us)</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              {service !== "custom" && !isProject ? (
                <>
                  <label htmlFor="estimator-words" className="text-xs font-semibold text-[var(--cq-ink-muted)] uppercase tracking-wider">Word Count</label>
                  <input
                    id="estimator-words"
                    type="number"
                    min="100"
                    step="100"
                    value={words}
                    onChange={(e) => setWords(parseInt(e.target.value) || 0)}
                    className="w-full bg-[var(--cq-parchment-mid)] border border-[var(--cq-linen)] rounded-[var(--radius-md)] px-3 py-2 text-sm text-[var(--cq-ink)] focus:outline-none focus:ring-1 focus:ring-[var(--cq-forest)]"
                    placeholder="e.g. 1000 words"
                  />
                </>
              ) : (
                <>
                  <label className="text-xs font-semibold text-[var(--cq-ink-muted)] uppercase tracking-wider">Billing Type</label>
                  <div className="w-full bg-[var(--cq-parchment-deep)] border border-[var(--cq-linen)] rounded-[var(--radius-md)] px-3 py-2 text-sm text-[var(--cq-ink-muted)]">
                    {service === "custom" ? "Project Consultation" : "Flat Project Rate"}
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="border-t border-[rgba(22,18,14,0.08)] pt-8 text-center flex flex-col items-center">
            {service === "custom" ? (
              <div className="font-display text-4xl text-[var(--cq-ink)] mb-1">
                Custom Pricing
              </div>
            ) : (
              <div className="font-sans font-medium text-5xl text-[var(--cq-ink)] mb-1">
                ₹{price.toLocaleString()}
              </div>
            )}
            <span className="text-xs text-[var(--cq-ink-muted)] uppercase tracking-wider mb-6">
              {service === "custom" ? "Based on project scope" : "Estimated Cost"}
            </span>

            <div className="flex flex-wrap gap-2 justify-center mb-6">
              <span className="badge-tag">Plagiarism-Free</span>
              <span className="badge-tag">Revisions Included</span>
              <span className="badge-tag">SEO Optimized</span>
            </div>

            <Link
              href={`/contact?service=${service}&words=${words}`}
              className="btn-primary inline-flex items-center gap-1.5 font-medium px-8 py-3.5"
            >
              Get Exact Quote &rarr;
            </Link>
            
            <p className="text-[10px] text-[var(--cq-ink-faint)] mt-4">
              *Exact pricing is confirmed during our free consultation. Rush delivery (+30%) available.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── NEW FAQ SECTION ──
function FaqSection() {
  const faqs = [
    { q: "How does the process work?", a: "We start with a voice audit, align on requirements, deliver the first draft in 48 hours, and refine based on your feedback." },
    { q: "What are your prices?", a: "Pricing is transparent. We start from ₹1.5/word for blogs, and have flat-rate project pricing for custom brand storytelling." },
    { q: "Is your content plagiarism-free?", a: "Yes, 100%. Everything we write is crafted from scratch by our human team and verified through multiple checkers." },
    { q: "How long does standard delivery take?", a: "Our standard turnaround is 48 hours for articles and blog posts. Larger strategy or website projects take 3-5 days." },
    { q: "Do you offer revisions?", a: "Absolutely. We include 2 rounds of revisions with every project to ensure the final piece aligns with your expectations." },
    { q: "What industries do you work with?", a: "We write for startups, e-commerce, D2C brands, professional agencies, authors, and SaaS companies across India." }
  ];

  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section className="section-md border-t border-[var(--cq-linen)] bg-[var(--cq-parchment)]">
      <div className="container-content">
        <div className="flex flex-col gap-2 mb-10 text-center md:text-left">
          <span className="badge-label self-center md:self-start">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
            FAQ
          </span>
          <h2 className="font-display text-4xl md:text-5xl text-[var(--cq-ink)] text-balance font-normal">
            Quick Answers to Common Questions
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Left Column: Even indices */}
          <div className="flex flex-col gap-3">
            {faqs.filter((_, i) => i % 2 === 0).map((faq, idx) => {
              const realIdx = idx * 2;
              const isOpen = openIdx === realIdx;
              return (
                <div 
                  key={realIdx} 
                  className="bg-[var(--cq-parchment-mid)] border border-[var(--cq-linen)] rounded-[var(--radius-lg)] overflow-hidden transition-all duration-300"
                >
                  <button
                    onClick={() => setOpenIdx(isOpen ? null : realIdx)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${realIdx}`}
                    className="w-full px-5 py-4 flex items-center justify-between text-left font-body font-medium text-sm text-[var(--cq-ink)]"
                  >
                    <span>{faq.q}</span>
                    <span className="text-xs text-[var(--cq-ink-muted)] ml-2 transition-transform duration-200" style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}>
                      ▼
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`faq-answer-${realIdx}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="px-5 pb-4 text-xs font-light text-[var(--cq-ink-mid)] leading-relaxed border-t border-[rgba(22,18,14,0.05)] pt-3">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Right Column: Odd indices */}
          <div className="flex flex-col gap-3">
            {faqs.filter((_, i) => i % 2 !== 0).map((faq, idx) => {
              const realIdx = idx * 2 + 1;
              const isOpen = openIdx === realIdx;
              return (
                <div 
                  key={realIdx} 
                  className="bg-[var(--cq-parchment-mid)] border border-[var(--cq-linen)] rounded-[var(--radius-lg)] overflow-hidden transition-all duration-300"
                >
                  <button
                    onClick={() => setOpenIdx(isOpen ? null : realIdx)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${realIdx}`}
                    className="w-full px-5 py-4 flex items-center justify-between text-left font-body font-medium text-sm text-[var(--cq-ink)]"
                  >
                    <span>{faq.q}</span>
                    <span className="text-xs text-[var(--cq-ink-muted)] ml-2 transition-transform duration-200" style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}>
                      ▼
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`faq-answer-${realIdx}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="px-5 pb-4 text-xs font-light text-[var(--cq-ink-mid)] leading-relaxed border-t border-[rgba(22,18,14,0.05)] pt-3">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

        <div className="text-center mt-8">
          <p className="text-xs text-[var(--cq-ink-muted)]">
            More questions? <Link href="/contact" className="text-[var(--cq-forest)] font-medium underline">Reach out to us &rarr;</Link>
          </p>
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  const [hoverCTA, setHoverCTA] = useState(false);

  // Staggered entrance variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut" as const,
      },
    },
  };

  const illustrationVariants = {
    hidden: { opacity: 0, scale: 0.96 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
        delay: 0.15,
      },
    },
  };

  return (
    <>
      <style>{pageStyles}</style>
      <CQHeader />

      <main>
        {/* ── HERO ─────────────────────────────── */}
        <section className="hero-section">
          <motion.div 
            className="hero-inner"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Left Content Column */}
            <div className="hero-text">
              <motion.div className="hero-badge-container" variants={itemVariants}>
                <svg className="w-2.5 h-2.5 text-[var(--cq-forest)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 3l3 6 6 3-6 3-3 6-3-6-6-3 6-3z"/>
                </svg>
                <span className="label-text">A CREATIVE CONTENT WRITING AGENCY</span>
              </motion.div>
              <motion.h1 className="hero-h1 font-normal" variants={itemVariants}>
                Human Strategy.<br />
                Real Stories.<br />
                Measurable Impact.
              </motion.h1>
              <motion.p className="hero-sub" data-cursor="text" variants={itemVariants}>
                WORDS THAT SATISFY. CONTENT THAT CONVERTS.
              </motion.p>
              <motion.p className="hero-desc" data-cursor="text" variants={itemVariants}>
                We craft powerful content that builds trust, drives engagement,
                and delivers real business results.
              </motion.p>

              {/* Feature icons row */}
              <motion.div className="hero-features-row" variants={itemVariants}>
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
              </motion.div>

              {/* Action buttons */}
              <motion.div className="hero-actions" variants={itemVariants}>
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
              </motion.div>
            </div>

            {/* Right Visual Column */}
            <motion.div 
              className="hero-visual"
              variants={illustrationVariants}
              initial="hidden"
              animate="visible"
            >
              <HeroIllustration />
            </motion.div>
          </motion.div>
        </section>

        {/* Stats strip & logo ticker */}
        <section style={{ background: "var(--color-bg-primary)" }}>
          <StatsStrip />
          <ClientMarquee />
        </section>

        {/* ── WHY US (BENTO GRID) ──────────────── */}
        <section className="why-section">
          <div className="section-inner">
            <div className="flex flex-col gap-2 mb-10 text-center md:text-left">
              <span className="badge-label self-center md:self-start">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 3l3 6 6 3-6 3-3 6-3-6-6-3 6-3z"/>
                </svg>
                WHAT SETS US APART
              </span>
              <h2 className="font-display text-4xl md:text-5xl text-[var(--cq-ink)] text-balance font-normal">
                Strategic Content. Measurable Growth.
              </h2>
              <p className="text-sm text-[var(--cq-ink-muted)] max-w-[65ch] font-light">
                Discover how Creative Quill transforms common content struggles into revenue-generating stories that captivate audiences.
              </p>
            </div>

            <BentoGrid />
          </div>
        </section>

        {/* ── TOP 3 SERVICES ──────────────────── */}
        <FeaturedServices />

        {/* ── AI VS HUMAN COMPARISON ──────────── */}
        <section className="section-sm" style={{ background: "var(--color-bg-primary)", paddingLeft: "1.5rem", paddingRight: "1.5rem" }}>
          <div className="section-inner">
            <AiVsHuman />
          </div>
        </section>

         {/* ── PROCESS ─────────────────────────── */}
        <ProcessSection />

        {/* ── COST CALCULATOR ─────────────────── */}
        <CostCalculator />

        {/* ── TESTIMONIALS (Marquee Only) ──────── */}
        <SocialProofMarquee />

        {/* ── FAQ SECTION ─────────────────────── */}
        <FaqSection />

        {/* ── FREE AUDIT CARD (CTA Banner) ────── */}
        <section style={{ background: "var(--color-bg-primary)", padding: "1rem 1.5rem" }}>
          <div className="section-inner">
            <ContentAuditCard />
          </div>
        </section>
      </main>

      <CQFooter />
      <OpenForWorkBadge />
    </>
  );
}
