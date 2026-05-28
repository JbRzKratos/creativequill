"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import CQHeader from "@/components/cq-header";
import CQFooter from "@/components/cq-footer";

const services = [
  "Blog Writing",
  "Article Writing",
  "Brand Storytelling",
  "Website Copy",
  "SEO Content",
  "Product Descriptions",
  "Custom / Not Sure Yet",
];

const faqs = [
  {
    q: "How quickly can you start on my project?",
    a: "We typically begin within 24–48 hours of receiving your brief and payment. For urgent projects, we offer expedited timelines — just mention it in your message.",
  },
  {
    q: "What information do you need to get started?",
    a: "A clear project brief helps — your target audience, tone of voice, any reference content you like, and your goals. Don't worry if you don't have all of this; we'll guide you through it on our first call.",
  },
  {
    q: "Do you offer rush delivery?",
    a: "Yes. Rush delivery (under 48 hours) is available for most content types at an additional fee. Reach out to discuss your timeline and we'll let you know what's possible.",
  },
  {
    q: "How many revisions are included?",
    a: "Every project includes at least two rounds of revisions. We keep refining until the content feels right — most clients are satisfied after one round.",
  },
  {
    q: "Can I see samples before we start?",
    a: "Absolutely. We have samples across industries and content types. Just mention what niche or format you're looking for and we'll share relevant examples.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept UPI, bank transfer (NEFT/IMPS), and Razorpay. International clients can pay via PayPal or Wise. We typically require 50% upfront for new projects.",
  },
];

// Helper SVGs to replace emojis
function ChatIcon() {
  return (
    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20" style={{ display: "inline-block", verticalAlign: "middle" }}>
      <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L1 17l1.338-3.123C1.493 12.76 1 11.434 1 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg className="w-5 h-5 text-primary fill-none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg className="w-5 h-5 text-primary fill-none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  );
}

function BoltIcon() {
  return (
    <svg className="w-5 h-5 text-primary fill-none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg className="w-8 h-8 text-primary fill-none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3} style={{ display: "inline-block" }}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

function BackIcon() {
  return (
    <svg className="w-4 h-4 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: "inline-block", verticalAlign: "middle" }}>
      <line x1="19" y1="12" x2="5" y2="12" />
      <polyline points="12 19 5 12 12 5" />
    </svg>
  );
}

function ServiceTabIcon({ service }: { service: string }) {
  if (service === "Blog Writing") {
    return (
      <svg className="w-5 h-5 stroke-current" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
      </svg>
    );
  }
  if (service === "Article Writing") {
    return (
      <svg className="w-5 h-5 stroke-current" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    );
  }
  if (service === "Brand Storytelling") {
    return (
      <svg className="w-5 h-5 stroke-current" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    );
  }
  if (service === "Website Copy") {
    return (
      <svg className="w-5 h-5 stroke-current" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    );
  }
  if (service === "SEO Content") {
    return (
      <svg className="w-5 h-5 stroke-current" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
        <line x1="11" y1="8" x2="11" y2="14" />
        <line x1="8" y1="11" x2="14" y2="11" />
      </svg>
    );
  }
  if (service === "Product Descriptions") {
    return (
      <svg className="w-5 h-5 stroke-current" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 0 1-8 0" />
      </svg>
    );
  }
  return (
    <svg className="w-5 h-5 stroke-current" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "", email: "", phone: "", service: "", details: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);

  // Pre-fill service from URL search parameters on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const svcParam = params.get("service");
      if (svcParam) {
        const matched = services.find(
          (s) =>
             s.toLowerCase() === svcParam.toLowerCase() ||
             s.toLowerCase().startsWith(svcParam.toLowerCase())
        );
        if (matched) {
          const timer = setTimeout(() => {
            setForm((f) => ({ ...f, service: matched }));
          }, 0);
          return () => clearTimeout(timer);
        }
      }
    }
  }, []);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1200);
  };

  const goToStep = (nextStep: number) => {
    setDirection(nextStep > step ? 1 : -1);
    setStep(nextStep);
  };

  return (
    <>
      <style>{`
        body { background: var(--cq-cream); }

        /* HERO */
        .ct-hero {
          background: var(--cq-cream);
          padding: var(--space-16) var(--space-6);
          border-bottom: 1px solid var(--cq-cream-dark);
          text-align: center;
        }
        .ct-hero-inner { max-width: var(--max-width-narrow); margin: 0 auto; }
        .ct-hero-badge {
          display: inline-flex; align-items: center; gap: 0.5rem;
          background: var(--cq-cream-mid);
          color: var(--cq-teal); border-radius: var(--radius-full);
          padding: 0.35rem 0.85rem;
          font-family: var(--font-body);
          font-size: 0.6875rem; font-weight: 500;
          letter-spacing: var(--tracking-wider); text-transform: uppercase;
          margin-bottom: 1rem;
          border: 1px solid var(--cq-cream-dark);
        }
        .ct-hero-h1 {
          font-family: var(--font-display);
          font-size: clamp(2.5rem, 6vw, 4rem);
          color: var(--cq-ink); margin: 0 0 1rem; line-height: var(--leading-display);
          letter-spacing: var(--tracking-tighter);
        }
        .ct-hero-desc {
          font-family: var(--font-body);
          font-size: 1.0625rem; font-weight: 300; color: var(--cq-ink-mid);
          line-height: var(--leading-body); max-width: 36rem; margin: 0 auto;
        }

        /* MAIN GRID */
        .ct-main {
          background: var(--cq-cream);
          padding: var(--space-12) var(--space-6);
        }
        .ct-main-inner {
          max-width: var(--max-width-content); margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }
        @media (min-width: 1024px) {
          .ct-main-inner {
            display: grid;
            grid-template-columns: 3fr 2fr;
            gap: 3rem;
            align-items: start;
          }
        }

        /* FORM */
        .ct-form-card {
          border: 1px solid var(--cq-cream-dark);
          background: var(--cq-cream-mid);
          border-radius: var(--radius-lg);
          padding: var(--space-6);
        }
        .ct-form-title {
          font-family: var(--font-display);
          font-size: 1.5rem; color: var(--cq-ink); margin: 0 0 0.5rem;
          letter-spacing: var(--tracking-tight);
        }
        .ct-form-subtitle {
          font-family: var(--font-body);
          font-size: 0.875rem; color: var(--cq-ink-muted); margin: 0 0 1.75rem;
        }
        .ct-form-grid {
          display: grid; gap: 1rem;
          grid-template-columns: 1fr 1fr;
        }
        @media (max-width: 580px) { .ct-form-grid { grid-template-columns: 1fr; } }
        .ct-form-group { display: flex; flex-direction: column; gap: 0.4rem; }
        .ct-form-group.full { grid-column: 1 / -1; }
        .ct-form-label {
          font-family: var(--font-body);
          font-size: 0.6875rem; font-weight: 500;
          letter-spacing: var(--tracking-wider); text-transform: uppercase;
          color: var(--cq-ink);
        }
        .ct-form-label span { color: var(--cq-ink-muted); font-weight: 400; }
        .ct-input, .ct-select {
          background: var(--cq-cream);
          border: 1px solid var(--cq-cream-dark);
          border-radius: var(--radius-sm);
          padding: 0.75rem 1rem;
          font-size: 0.875rem; color: var(--cq-ink);
          outline: none;
          transition: border-color var(--transition-fast), box-shadow var(--transition-fast);
          font-family: var(--font-body);
          width: 100%;
          min-height: 44px;
        }
        .ct-textarea {
          background: var(--cq-cream);
          border: 1px solid var(--cq-cream-dark);
          border-radius: var(--radius-sm);
          padding: 0.75rem 1rem;
          font-size: 0.875rem; color: var(--cq-ink);
          outline: none;
          transition: border-color var(--transition-fast), box-shadow var(--transition-fast);
          font-family: var(--font-body);
          width: 100%;
          min-height: 120px;
          resize: vertical;
        }
        .ct-input::placeholder, .ct-textarea::placeholder {
          color: var(--cq-ink-muted);
        }
        .ct-input:focus, .ct-select:focus, .ct-textarea:focus {
          border-color: var(--cq-teal);
          box-shadow: 0 0 0 3px rgba(13, 148, 136, 0.15);
        }
        .ct-select { appearance: none; cursor: pointer; }
        .ct-form-footer {
          margin-top: 1.5rem; display: flex;
          align-items: center; justify-content: space-between;
          flex-wrap: wrap; gap: 1rem;
        }
        .ct-form-note {
          font-family: var(--font-body);
          font-size: 0.75rem; color: var(--cq-ink-muted); line-height: 1.6;
          max-width: 20rem;
        }
        .ct-submit {
          background: var(--cq-teal); color: white;
          border: none; cursor: pointer;
          font-family: var(--font-body);
          font-size: 0.75rem; font-weight: 500;
          letter-spacing: var(--tracking-wide); text-transform: uppercase;
          padding: 0.75rem 1.5rem; border-radius: var(--radius-sm);
          transition: background var(--transition-fast);
          white-space: nowrap;
          min-height: 44px;
        }
        .ct-submit:hover { background: var(--cq-teal-hover); }
        /* On mobile: full-width submit */
        @media (max-width: 480px) {
          .ct-submit { width: 100%; }
          .ct-form-footer { flex-direction: column-reverse; align-items: stretch; }
        }
        .ct-success {
          text-align: center; padding: 3rem 1.5rem;
        }
        .ct-success-icon {
          margin-bottom: 1rem;
          color: var(--cq-teal);
        }
        .ct-success-h3 {
          font-family: var(--font-display);
          font-size: 1.75rem; color: var(--cq-ink); margin: 0 0 0.75rem;
          letter-spacing: var(--tracking-tight);
        }
        .ct-success-p {
          font-family: var(--font-body);
          font-size: 0.95rem; color: var(--cq-ink-muted); line-height: var(--leading-body);
        }

        /* SIDEBAR */
        .ct-sidebar {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1rem;
        }
        @media (min-width: 640px) and (max-width: 1023px) {
          .ct-sidebar {
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }
        }
        .ct-info-card {
          border: 1px solid var(--cq-cream-dark);
          background: var(--cq-cream-mid);
          border-radius: var(--radius-lg);
          padding: var(--space-4);
        }
        @media (min-width: 640px) {
          .ct-info-card {
            padding: var(--space-5);
          }
        }
        .ct-info-card-icon {
          margin-bottom: 0.75rem;
          color: var(--cq-teal);
        }
        .ct-info-card-title {
          font-family: var(--font-body);
          font-size: 0.6875rem; font-weight: 500;
          letter-spacing: var(--tracking-wider); text-transform: uppercase;
          color: var(--cq-ink-muted); margin: 0 0 0.35rem;
        }
        .ct-info-card-value {
          font-family: var(--font-body);
          font-size: 0.95rem; color: var(--cq-ink);
          font-weight: 500; margin: 0 0 0.2rem;
        }
        .ct-info-card-note {
          font-family: var(--font-body);
          font-size: 0.75rem; color: var(--cq-ink-muted); margin: 0;
        }
        .ct-info-card a {
          color: var(--cq-ink);
          text-decoration: none;
          transition: color var(--transition-fast);
        }
        .ct-info-card a:hover { color: var(--cq-teal); }
        .ct-quick-links-card {
          border: 1px solid var(--border);
          background: var(--secondary);
          border-radius: var(--radius-lg);
          padding: 1.5rem;
        }
        .ct-quick-links-title {
          font-size: 0.7rem; font-weight: 700;
          letter-spacing: 0.12em; text-transform: uppercase;
          color: var(--muted-foreground); margin: 0 0 1rem;
        }
        .ct-quick-links { display: flex; flex-direction: column; gap: 0.5rem; }
        .ct-quick-link {
          display: flex; align-items: center; justify-content: space-between;
          padding: 0.6rem 0.85rem;
          background: var(--background);
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          text-decoration: none; color: var(--foreground);
          font-size: 0.8rem; font-weight: 500;
          transition: border-color 0.2s, background 0.2s;
        }
        .ct-quick-link:hover {
          border-color: color-mix(in oklch, var(--primary) 30%, transparent);
          background: color-mix(in oklch, var(--primary) 5%, var(--background));
        }

        /* FAQ */
        .ct-faq {
          background: var(--cq-cream-mid);
          padding: var(--space-16) var(--space-6);
          border-top: 1px solid var(--cq-cream-dark);
        }
        .ct-faq-inner { max-width: var(--max-width-narrow); margin: 0 auto; }
        .ct-faq-header { text-align: center; margin-bottom: 2.5rem; }
        .section-label {
          display: flex; align-items: center; gap: 0.75rem;
          margin-bottom: 1rem;
          justify-content: center;
        }
        .section-label-line { width: 2rem; height: 1px; background: var(--cq-cream-dark); }
        .section-label-text {
          font-family: var(--font-body);
          font-size: 0.6875rem; font-weight: 500; letter-spacing: var(--tracking-wider);
          text-transform: uppercase; color: var(--cq-ink-muted);
        }
        .ct-faq-h2 {
          font-family: var(--font-display);
          font-size: clamp(2rem, 5vw, 3rem);
          color: var(--cq-ink); margin: 0 0 1rem; line-height: var(--leading-heading);
          letter-spacing: var(--tracking-tight);
        }
        .ct-faq-desc {
          font-family: var(--font-body);
          font-size: 0.95rem; font-weight: 300; color: var(--cq-ink-muted);
          max-width: 32rem; margin: 0 auto; line-height: var(--leading-body);
        }
        .ct-faq-list { display: flex; flex-direction: column; gap: 0.75rem; }
        .ct-faq-item {
          border: 1px solid var(--cq-cream-dark);
          background: var(--cq-cream);
          border-radius: var(--radius-md);
          overflow: hidden;
          transition: border-color var(--transition-fast);
        }
        .ct-faq-item.open {
          border-color: var(--cq-teal);
        }
        .ct-faq-btn {
          width: 100%; background: none; border: none; cursor: pointer;
          display: flex; align-items: center; justify-content: space-between;
          padding: 1.1rem 1.25rem;
          text-align: left; gap: 1rem;
          min-height: 52px;
        }
        .ct-faq-q {
          font-family: var(--font-body);
          font-size: 0.875rem; font-weight: 600; color: var(--cq-ink);
          line-height: 1.45;
        }
        .ct-faq-chevron {
          width: 1.5rem; height: 1.5rem; border-radius: 50%;
          background: var(--cq-cream-mid);
          display: flex; align-items: center; justify-content: center;
          font-size: 0.7rem; color: var(--cq-ink); flex-shrink: 0;
          transition: transform 0.25s;
        }
        .ct-faq-item.open .ct-faq-chevron { transform: rotate(180deg); }
        .ct-faq-body {
          max-height: 0; overflow: hidden;
          transition: max-height 0.35s ease, padding 0.25s ease;
          padding: 0 1.25rem;
          font-family: var(--font-body);
          font-size: 0.875rem; font-weight: 300; color: var(--cq-ink-muted); line-height: var(--leading-body);
        }
        .ct-faq-item.open .ct-faq-body { max-height: 200px; padding: 0 1.25rem 1.25rem; }
        @media (max-width: 768px) {
          .ct-faq-btn {
            padding: 1rem;
          }
          .ct-faq-body {
            padding: 0 1rem;
          }
          .ct-faq-item.open .ct-faq-body {
            padding: 0 1rem 1rem;
          }
        }

        /* Conversational Wizard Styles */
        .conv-wrapper {
          max-width: 560px;
          margin: 0 auto;
          min-height: 420px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .conv-step-container {
          width: 100%;
        }
        .conv-title {
          font-family: var(--font-serif);
          font-size: clamp(1.4rem, 3vw, 1.85rem);
          line-height: 1.3;
          color: var(--foreground);
          margin-bottom: 1.5rem;
          font-weight: 600;
        }
        .conv-input-wrap {
          position: relative;
          margin-bottom: 1.5rem;
        }
        .conv-input-large {
          font-family: var(--font-serif);
          font-size: clamp(1.25rem, 2.5vw, 1.6rem);
          width: 100%;
          border: none;
          border-bottom: 2px solid var(--border);
          background: transparent;
          padding: 0.75rem 0;
          color: var(--foreground);
          outline: none;
          transition: border-color 0.3s;
          text-align: left;
          min-height: 44px;
        }
        .conv-input-large:focus {
          border-color: var(--primary);
        }
        .conv-input-large::placeholder {
          color: var(--muted-foreground);
          opacity: 0.5;
        }
        .conv-input-sub {
          font-size: 1rem;
          width: 100%;
          border: none;
          border-bottom: 1px solid var(--border);
          background: transparent;
          padding: 0.5rem 0;
          color: var(--foreground);
          outline: none;
          transition: border-color 0.3s;
          min-height: 44px;
        }
        .conv-input-sub:focus {
          border-color: var(--primary);
        }
        .conv-service-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 0.5rem;
          margin-bottom: 1.5rem;
        }
        @media (min-width: 768px) {
          .conv-service-grid {
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 0.75rem;
          }
        }
        .conv-service-card {
          border: 1px solid var(--border);
          background: var(--background);
          border-radius: var(--radius-md);
          padding: 0.75rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          cursor: pointer;
          transition: border-color 0.2s ease, background 0.2s ease;
          text-align: left;
          min-height: 44px;
        }
        @media (min-width: 768px) {
          .conv-service-card {
            padding: 0.85rem 1rem;
            gap: 0.75rem;
            min-height: 48px;
          }
        }
        @media (hover: hover) {
          .conv-service-card:hover {
            border-color: var(--primary);
            background: color-mix(in oklch, var(--primary) 5%, var(--background));
          }
        }
        .conv-service-card.active {
          border-color: var(--primary);
          background: color-mix(in oklch, var(--primary) 10%, var(--background));
          box-shadow: 0 0 0 1px var(--primary);
        }
        .conv-service-icon {
          color: var(--primary);
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .conv-service-name {
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--foreground);
        }
        .conv-textarea {
          width: 100%;
          min-height: 120px;
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          background: var(--background);
          padding: 0.85rem 1rem;
          font-size: 1rem;
          color: var(--foreground);
          outline: none;
          resize: none;
          transition: border-color 0.3s;
          font-family: var(--font-sans);
        }
        .conv-textarea:focus {
          border-color: var(--primary);
        }
        .conv-textarea::placeholder {
          color: var(--muted-foreground);
        }
        .conv-progress-bar-wrap {
          width: 100%;
          height: 4px;
          background: var(--border);
          border-radius: 2px;
          overflow: hidden;
          margin-top: 0.5rem;
        }
        .conv-progress-bar-fill {
          height: 100%;
          background: var(--primary);
          transition: width 0.2s ease;
        }
        .conv-counter-text {
          font-size: 0.72rem;
          color: var(--muted-foreground);
          margin-top: 0.25rem;
          text-align: right;
        }
        .conv-summary-card {
          border: 1px solid var(--border);
          background: var(--secondary);
          border-radius: var(--radius-md);
          padding: 1.25rem;
          margin-bottom: 1.5rem;
        }
        .conv-summary-item {
          margin-bottom: 0.85rem;
          border-bottom: 1px solid color-mix(in oklch, var(--border) 60%, transparent);
          padding-bottom: 0.85rem;
        }
        .conv-summary-item:last-child {
          margin-bottom: 0;
          border-bottom: none;
          padding-bottom: 0;
        }
        .conv-summary-label {
          font-size: 0.65rem;
          font-weight: 700;
          text-transform: uppercase;
          color: var(--muted-foreground);
          letter-spacing: 0.05em;
          margin-bottom: 0.15rem;
        }
        .conv-summary-value {
          font-size: 0.875rem;
          color: var(--foreground);
          line-height: 1.4;
          white-space: pre-line;
        }
        .conv-footer {
          margin-top: auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-top: 1px solid var(--border);
          padding-top: 1.25rem;
        }
        .conv-btn-back {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.4rem;
          background: transparent;
          color: var(--muted-foreground);
          border: none;
          cursor: pointer;
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          padding: 0.6rem 1rem;
          border-radius: var(--radius-sm);
          transition: color 0.2s;
          min-height: 44px;
          min-width: 44px;
        }
        .conv-btn-back:hover {
          color: var(--foreground);
        }
        .conv-btn-next {
          background: var(--primary);
          color: var(--primary-foreground);
          border: none;
          cursor: pointer;
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          padding: 0.75rem 1.5rem;
          border-radius: var(--radius-sm);
          transition: opacity 0.2s;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.4rem;
          min-height: 44px;
        }
        .conv-btn-next:hover:not(:disabled) {
          opacity: 0.88;
        }
        .conv-btn-next:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }

        /* Prevent iOS auto-zoom by forcing minimum 16px font-size on mobile inputs */
        @media (max-width: 768px) {
          .ct-input, .ct-select, .ct-textarea, .conv-textarea, .conv-input-large, .conv-input-sub {
            font-size: 16px !important;
          }
        }
      `}</style>

      <CQHeader />
      <main>
        {/* Hero */}
        <section className="ct-hero">
          <div className="ct-hero-inner">
            <div className="ct-hero-badge">
              <ChatIcon />
              <span>Get in Touch</span>
            </div>
            <h1 className="ct-hero-h1">
              Ready to Transform<br />Your Content?
            </h1>
            <p className="ct-hero-desc">
              Tell us about your project. We respond within 24 hours and
              provide a free consultation to every new inquiry.
            </p>
          </div>
        </section>

        {/* Form + Sidebar */}
        <section className="ct-main">
          <div className="ct-main-inner">
            {/* Form */}
            <div className="ct-form-card" style={{ padding: step === 3 ? "1.5rem" : "2rem" }}>
              {submitted ? (
                <div className="ct-success">
                  <div className="ct-success-icon">
                    <CheckIcon />
                  </div>
                  <h3 className="ct-success-h3" data-cursor="text">Message Received!</h3>
                  <p className="ct-success-p" data-cursor="text">
                    Thanks for reaching out. We&apos;ll get back to you within 24 hours
                    with next steps and a free consultation slot.
                  </p>
                </div>
              ) : (
                <div className="conv-wrapper">
                  {/* Progress Bar (Teal fill) */}
                  <div style={{ width: "100%", height: "2px", background: "var(--cq-cream-dark)", marginBottom: "2rem", position: "relative" }}>
                    <div
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        height: "100%",
                        background: "var(--cq-teal)",
                        width: `${((step - 1) / 4) * 100}%`,
                        transition: "width 0.3s ease",
                      }}
                    />
                  </div>

                  {/* Step container with AnimatePresence */}
                  <div style={{ position: "relative", flex: 1, display: "flex", flexDirection: "column" }}>
                    <AnimatePresence mode="wait" custom={direction}>
                      <motion.div
                        key={step}
                        custom={direction}
                        variants={{
                          enter: (dir: number) => ({
                            x: dir > 0 ? 40 : -40,
                            opacity: 0,
                          }),
                          center: {
                            x: 0,
                            opacity: 1,
                            transition: { duration: 0.25, ease: "easeOut" },
                          },
                          exit: (dir: number) => ({
                            x: dir < 0 ? 40 : -40,
                            opacity: 0,
                            transition: { duration: 0.2, ease: "easeIn" },
                          }),
                        }}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        className="conv-step-container"
                        style={{ display: "flex", flexDirection: "column", height: "100%" }}
                      >
                        {step === 1 && (
                          <div>
                            <h2 className="conv-title" data-cursor="text">Hi! What&apos;s your name?</h2>
                            <div className="conv-input-wrap">
                              <input
                                id="contact-name"
                                name="name"
                                type="text"
                                className="conv-input-large"
                                placeholder="Your name..."
                                value={form.name}
                                onChange={(e) => setForm({ ...form, name: e.target.value })}
                                autoFocus
                                onKeyDown={(e) => {
                                  if (e.key === "Enter" && form.name.trim().length >= 2) {
                                    goToStep(2);
                                  }
                                }}
                                data-cursor="text"
                                aria-label="Your name"
                              />
                            </div>
                          </div>
                        )}

                        {step === 2 && (
                          <div>
                            <h2 className="conv-title" data-cursor="text">
                              Nice to meet you, <span style={{ color: "var(--primary)" }}>{form.name}</span>! What&apos;s your email?
                            </h2>
                            <div className="conv-input-wrap" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                              <input
                                id="contact-email"
                                name="email"
                                type="email"
                                className="conv-input-large"
                                placeholder="yourname@example.com"
                                value={form.email}
                                onChange={(e) => setForm({ ...form, email: e.target.value })}
                                autoFocus
                                onKeyDown={(e) => {
                                  if (e.key === "Enter" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
                                    goToStep(3);
                                  }
                                }}
                                data-cursor="text"
                                aria-label="Your email address"
                              />
                              <div style={{ marginTop: "0.5rem" }}>
                                <label htmlFor="contact-phone" className="ct-form-label" style={{ fontSize: "0.68rem" }}>Phone Number (optional)</label>
                                <input
                                  id="contact-phone"
                                  name="phone"
                                  type="tel"
                                  className="conv-input-sub"
                                  placeholder="+91 98765 43210"
                                  value={form.phone}
                                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                                  data-cursor="text"
                                />
                              </div>
                            </div>
                          </div>
                        )}

                        {step === 3 && (
                          <div>
                            <h2 className="conv-title" data-cursor="text" style={{ marginBottom: "1rem" }}>What can we help you with?</h2>
                            <div className="conv-service-grid">
                              {services.map((svc) => {
                                const isActive = form.service === svc;
                                return (
                                  <div
                                    key={svc}
                                    className={`conv-service-card${isActive ? " active" : ""}`}
                                    onClick={() => {
                                      setForm({ ...form, service: svc });
                                      setTimeout(() => {
                                        goToStep(4);
                                      }, 220);
                                    }}
                                    data-cursor="card"
                                  >
                                    <div className="conv-service-icon">
                                      <ServiceTabIcon service={svc} />
                                    </div>
                                    <span className="conv-service-name">{svc}</span>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}

                        {step === 4 && (
                          <div>
                            <h2 className="conv-title" data-cursor="text">Tell us about your project</h2>
                            <div>
                              <textarea
                                id="contact-details"
                                name="details"
                                className="conv-textarea"
                                placeholder="What are your goals, target audience, references you like, and your timeline?"
                                value={form.details}
                                onChange={(e) => setForm({ ...form, details: e.target.value })}
                                autoFocus
                                data-cursor="text"
                                aria-label="Project details"
                              />
                              {/* Character counter progress bar */}
                              <div className="conv-progress-bar-wrap">
                                <div
                                  className="conv-progress-bar-fill"
                                  style={{ width: `${Math.min(100, (form.details.length / 200) * 100)}%` }}
                                />
                              </div>
                              <div className="conv-counter-text" data-cursor="text">
                                {form.details.length} / 200 characters recommended
                              </div>
                            </div>
                          </div>
                        )}

                        {step === 5 && (
                          <div>
                            <h2 className="conv-title" data-cursor="text">Review your request</h2>
                            <div className="conv-summary-card">
                              <div className="conv-summary-item">
                                <div className="conv-summary-label">Name</div>
                                <div className="conv-summary-value">{form.name}</div>
                              </div>
                              <div className="conv-summary-item">
                                <div className="conv-summary-label">Contact Details</div>
                                <div className="conv-summary-value">
                                  {form.email}
                                  {form.phone && ` · ${form.phone}`}
                                </div>
                              </div>
                              <div className="conv-summary-item">
                                <div className="conv-summary-label">Service Interested In</div>
                                <div className="conv-summary-value">{form.service}</div>
                              </div>
                              <div className="conv-summary-item">
                                <div className="conv-summary-label">Project Details</div>
                                <div className="conv-summary-value" style={{ maxHeight: "120px", overflowY: "auto" }}>{form.details || "No details provided"}</div>
                              </div>
                            </div>
                          </div>
                        )}
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* Navigation Footer */}
                  <div className="conv-footer">
                    {step > 1 ? (
                      <button
                        type="button"
                        className="conv-btn-back"
                        onClick={() => goToStep(step - 1)}
                        data-cursor="button"
                      >
                        <BackIcon />
                        <span>Back</span>
                      </button>
                    ) : (
                      <div />
                    )}

                    {step < 5 ? (
                      <button
                        type="button"
                        className="conv-btn-next"
                        disabled={
                          (step === 1 && form.name.trim().length < 2) ||
                          (step === 2 && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) ||
                          (step === 3 && !form.service) ||
                          (step === 4 && form.details.trim().length < 10)
                        }
                        onClick={() => goToStep(step + 1)}
                        data-cursor="button"
                      >
                        <span>Continue</span>
                        <span>→</span>
                      </button>
                    ) : (
                      <div style={{ display: "flex", gap: "0.5rem" }}>
                        <button
                          type="button"
                          className="conv-btn-back"
                          onClick={() => {
                            goToStep(1); // Return to step 1 to edit
                          }}
                          data-cursor="button"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          className="conv-btn-next"
                          disabled={loading}
                          onClick={() => handleSubmit()}
                          data-cursor="button"
                          style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}
                        >
                          {loading ? (
                            <>
                              <svg className="animate-spin h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24" style={{ display: "inline-block" }}>
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                              </svg>
                              <span>Sending...</span>
                            </>
                          ) : (
                            <span>Send It</span>
                          )}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="ct-sidebar">
              <div className="ct-info-card">
                <div className="ct-info-card-icon">
                  <MailIcon />
                </div>
                <p className="ct-info-card-title">Email Us</p>
                <p className="ct-info-card-value">
                  <a href="mailto:sanzstudios14@gmail.com">sanzstudios14@gmail.com</a>
                </p>
                <p className="ct-info-card-note">Response within 24 hours</p>
              </div>

              <div className="ct-info-card">
                <div className="ct-info-card-icon">
                  <PhoneIcon />
                </div>
                <p className="ct-info-card-title">Call Us</p>
                <p className="ct-info-card-value">
                  <a href="tel:+918807190545">+91 88071 90545</a>
                </p>
                <p className="ct-info-card-note">Mon – Fri, 9 AM – 6 PM IST</p>
              </div>

              <div className="ct-info-card">
                <div className="ct-info-card-icon">
                  <BoltIcon />
                </div>
                <p className="ct-info-card-title">Free Consultation</p>
                <p className="ct-info-card-value">15 Minutes, No Obligation</p>
                <p className="ct-info-card-note">
                  Every new inquiry gets a complimentary strategy call.
                </p>
              </div>

              <div className="ct-info-card" style={{ background: "var(--cq-cream-mid)", borderColor: "var(--cq-cream-dark)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.75rem" }}>
                  <span style={{ color: "var(--cq-teal)", display: "inline-flex" }}>
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </span>
                  <p className="ct-info-card-title" style={{ margin: 0 }}>While You Wait</p>
                </div>
                <p className="ct-info-card-value" style={{ fontSize: "0.875rem", fontWeight: 600 }}>Average response time: Under 2 hours</p>
                <p className="ct-info-card-note" style={{ marginBottom: "1rem" }}>Free strategy call included with every inquiry.</p>
                <Link href="/works" style={{ display: "inline-flex", alignItems: "center", gap: "0.25rem", color: "var(--cq-teal)", fontSize: "0.8125rem", fontWeight: 500 }} data-cursor="button">
                  Browse our work <span style={{ transition: "transform var(--transition-fast)" }}>&rarr;</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="ct-faq">
          <div className="ct-faq-inner">
            <div className="ct-faq-header">
              <div className="section-label">
                <span className="section-label-line" />
                <span className="section-label-text">FAQ</span>
                <span className="section-label-line" />
              </div>
              <h2 className="ct-faq-h2">Frequently Asked Questions</h2>
              <p className="ct-faq-desc">
                Everything you need to know before getting started.
                Can&apos;t find your answer?{" "}
                <a href="mailto:sanzstudios14@gmail.com" style={{ color: "var(--foreground)", fontWeight: 500 }}>
                  Just ask us.
                </a>
              </p>
            </div>
            <div className="ct-faq-list">
              {faqs.map((faq, i) => (
                <div key={i} className={`ct-faq-item${openFaq === i ? " open" : ""}`}>
                  <button
                    className="ct-faq-btn"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    aria-expanded={openFaq === i}
                    id={`faq-btn-${i}`}
                  >
                    <span className="ct-faq-q">{faq.q}</span>
                    <span className="ct-faq-chevron">▼</span>
                  </button>
                  <div className="ct-faq-body" role="region" aria-labelledby={`faq-btn-${i}`}>
                    {faq.a}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <CQFooter />
    </>
  );
}
