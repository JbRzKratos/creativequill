"use client";

import { useState } from "react";
import Link from "next/link";
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

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "", email: "", phone: "", service: "", details: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <style>{`
        body { background: var(--muted); }

        /* HERO */
        .ct-hero {
          background: var(--background);
          padding: 5rem 1.5rem 3.5rem;
          border-bottom: 1px solid var(--border);
          text-align: center;
        }
        .ct-hero-inner { max-width: 52rem; margin: 0 auto; }
        .ct-hero-badge {
          display: inline-flex; align-items: center; gap: 0.5rem;
          background: color-mix(in oklch, var(--primary) 10%, transparent);
          color: var(--primary); border-radius: 999px;
          padding: 0.35rem 1rem;
          font-size: 0.68rem; font-weight: 600;
          letter-spacing: 0.1em; text-transform: uppercase;
          margin-bottom: 1.25rem;
        }
        .ct-hero-h1 {
          font-family: var(--font-serif);
          font-size: clamp(2rem, 5vw, 3rem);
          color: var(--foreground); margin: 0 0 1rem; line-height: 1.2;
        }
        .ct-hero-desc {
          font-size: 0.95rem; color: var(--muted-foreground);
          line-height: 1.75; max-width: 36rem; margin: 0 auto;
        }

        /* MAIN GRID */
        .ct-main {
          background: var(--background);
          padding: 4rem 1.5rem 5rem;
        }
        .ct-main-inner {
          max-width: 72rem; margin: 0 auto;
          display: grid; gap: 3rem;
          grid-template-columns: 5fr 4fr;
          align-items: start;
        }
        @media (max-width: 860px) { .ct-main-inner { grid-template-columns: 1fr; } }

        /* FORM */
        .ct-form-card {
          border: 1px solid var(--border);
          background: var(--card);
          border-radius: var(--radius-lg);
          padding: 2rem;
        }
        .ct-form-title {
          font-family: var(--font-serif);
          font-size: 1.4rem; color: var(--foreground); margin: 0 0 0.4rem;
        }
        .ct-form-subtitle {
          font-size: 0.8rem; color: var(--muted-foreground); margin: 0 0 1.75rem;
        }
        .ct-form-grid {
          display: grid; gap: 1rem;
          grid-template-columns: 1fr 1fr;
        }
        @media (max-width: 580px) { .ct-form-grid { grid-template-columns: 1fr; } }
        .ct-form-group { display: flex; flex-direction: column; gap: 0.4rem; }
        .ct-form-group.full { grid-column: 1 / -1; }
        .ct-form-label {
          font-size: 0.7rem; font-weight: 600;
          letter-spacing: 0.12em; text-transform: uppercase;
          color: var(--foreground);
        }
        .ct-form-label span { color: var(--muted-foreground); font-weight: 400; }
        .ct-input, .ct-select, .ct-textarea {
          background: var(--background);
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          padding: 0.75rem 1rem;
          font-size: 0.875rem; color: var(--foreground);
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
          font-family: var(--font-sans);
          width: 100%;
        }
        .ct-input::placeholder, .ct-textarea::placeholder {
          color: var(--muted-foreground);
        }
        .ct-input:focus, .ct-select:focus, .ct-textarea:focus {
          border-color: var(--primary);
          box-shadow: 0 0 0 3px color-mix(in oklch, var(--primary) 15%, transparent);
        }
        .ct-select { appearance: none; cursor: pointer; }
        .ct-textarea { min-height: 120px; resize: vertical; }
        .ct-form-footer {
          margin-top: 1.5rem; display: flex;
          align-items: center; justify-content: space-between;
          flex-wrap: wrap; gap: 1rem;
        }
        .ct-form-note {
          font-size: 0.72rem; color: var(--muted-foreground); line-height: 1.6;
          max-width: 20rem;
        }
        .ct-submit {
          background: var(--primary); color: var(--primary-foreground);
          border: none; cursor: pointer;
          font-size: 0.7rem; font-weight: 700;
          letter-spacing: 0.15em; text-transform: uppercase;
          padding: 1rem 2rem; border-radius: var(--radius-sm);
          transition: opacity 0.2s;
          white-space: nowrap;
        }
        .ct-submit:hover { opacity: 0.85; }
        .ct-success {
          text-align: center; padding: 3rem 1.5rem;
        }
        .ct-success-icon {
          margin-bottom: 1rem;
        }
        .ct-success-h3 {
          font-family: var(--font-serif);
          font-size: 1.5rem; color: var(--foreground); margin: 0 0 0.75rem;
        }
        .ct-success-p {
          font-size: 0.875rem; color: var(--muted-foreground); line-height: 1.75;
        }

        /* SIDEBAR */
        .ct-sidebar { display: flex; flex-direction: column; gap: 1.25rem; }
        .ct-info-card {
          border: 1px solid var(--border);
          background: var(--card);
          border-radius: var(--radius-lg);
          padding: 1.5rem;
        }
        .ct-info-card-icon {
          margin-bottom: 0.75rem;
          color: var(--primary);
        }
        .ct-info-card-title {
          font-size: 0.8rem; font-weight: 700;
          letter-spacing: 0.12em; text-transform: uppercase;
          color: var(--foreground); margin: 0 0 0.35rem;
        }
        .ct-info-card-value {
          font-size: 0.9rem; color: var(--foreground);
          font-weight: 500; margin: 0 0 0.2rem;
        }
        .ct-info-card-note {
          font-size: 0.75rem; color: var(--muted-foreground); margin: 0;
        }
        .ct-info-card a {
          color: var(--foreground);
          text-decoration: none;
          transition: color 0.2s;
        }
        .ct-info-card a:hover { color: var(--primary); }
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
        .ct-faq { background: var(--muted); padding: 4.5rem 1.5rem; border-top: 1px solid var(--border); }
        .ct-faq-inner { max-width: 52rem; margin: 0 auto; }
        .ct-faq-header { text-align: center; margin-bottom: 2.5rem; }
        .section-label {
          display: flex; align-items: center; gap: 0.75rem;
          margin-bottom: 1rem;
          justify-content: center;
        }
        .section-label-line { width: 2rem; height: 1px; background: var(--border); }
        .section-label-text {
          font-size: 0.7rem; font-weight: 500; letter-spacing: 0.15em;
          text-transform: uppercase; color: var(--muted-foreground);
        }
        .ct-faq-h2 {
          font-family: var(--font-serif);
          font-size: clamp(1.65rem, 3.5vw, 2.25rem);
          color: var(--foreground); margin: 0 0 0.5rem;
        }
        .ct-faq-desc {
          font-size: 0.875rem; color: var(--muted-foreground);
          max-width: 32rem; margin: 0 auto; line-height: 1.75;
        }
        .ct-faq-list { display: flex; flex-direction: column; gap: 0.75rem; }
        .ct-faq-item {
          border: 1px solid var(--border);
          background: var(--background);
          border-radius: var(--radius-md);
          overflow: hidden;
          transition: border-color 0.2s;
        }
        .ct-faq-item.open {
          border-color: color-mix(in oklch, var(--primary) 30%, transparent);
        }
        .ct-faq-btn {
          width: 100%; background: none; border: none; cursor: pointer;
          display: flex; align-items: center; justify-content: space-between;
          padding: 1.1rem 1.25rem;
          text-align: left; gap: 1rem;
        }
        .ct-faq-q {
          font-size: 0.875rem; font-weight: 600; color: var(--foreground);
          line-height: 1.45;
        }
        .ct-faq-chevron {
          width: 1.5rem; height: 1.5rem; border-radius: 50%;
          background: var(--secondary);
          display: flex; align-items: center; justify-content: center;
          font-size: 0.7rem; color: var(--foreground); flex-shrink: 0;
          transition: transform 0.25s;
        }
        .ct-faq-item.open .ct-faq-chevron { transform: rotate(180deg); }
        .ct-faq-body {
          max-height: 0; overflow: hidden;
          transition: max-height 0.35s ease, padding 0.25s ease;
          padding: 0 1.25rem;
          font-size: 0.83rem; color: var(--muted-foreground); line-height: 1.8;
        }
        .ct-faq-item.open .ct-faq-body { max-height: 200px; padding: 0 1.25rem 1.25rem; }
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
            <div className="ct-form-card">
              {submitted ? (
                <div className="ct-success">
                  <div className="ct-success-icon">
                    <CheckIcon />
                  </div>
                  <h3 className="ct-success-h3">Message Received!</h3>
                  <p className="ct-success-p">
                    Thanks for reaching out. We&apos;ll get back to you within 24 hours
                    with next steps and a free consultation slot.
                  </p>
                </div>
              ) : (
                <>
                  <h2 className="ct-form-title">Tell Us About Your Project</h2>
                  <p className="ct-form-subtitle">
                    Fill in the details below and we&apos;ll respond within 24 hours.
                  </p>
                  <form onSubmit={handleSubmit}>
                    <div className="ct-form-grid">
                      <div className="ct-form-group">
                        <label className="ct-form-label" htmlFor="ct-name">Full Name</label>
                        <input
                          id="ct-name"
                          name="name"
                          type="text"
                          className="ct-input"
                          placeholder="Jane Doe"
                          value={form.name}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="ct-form-group">
                        <label className="ct-form-label" htmlFor="ct-email">Email Address</label>
                        <input
                          id="ct-email"
                          name="email"
                          type="email"
                          className="ct-input"
                          placeholder="jane@example.com"
                          value={form.email}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="ct-form-group">
                        <label className="ct-form-label" htmlFor="ct-phone">
                          Phone <span>(optional)</span>
                        </label>
                        <input
                          id="ct-phone"
                          name="phone"
                          type="tel"
                          className="ct-input"
                          placeholder="+91 98765 43210"
                          value={form.phone}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="ct-form-group">
                        <label className="ct-form-label" htmlFor="ct-service">Service Interested In</label>
                        <select
                          id="ct-service"
                          name="service"
                          className="ct-select"
                          value={form.service}
                          onChange={handleChange}
                          required
                        >
                          <option value="" disabled>Select a service…</option>
                          {services.map((s) => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      </div>
                      <div className="ct-form-group full">
                        <label className="ct-form-label" htmlFor="ct-details">Project Details</label>
                        <textarea
                          id="ct-details"
                          name="details"
                          className="ct-textarea"
                          placeholder="Tell us about your project — your goals, target audience, any references you like, and your timeline…"
                          value={form.details}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="ct-form-footer">
                      <p className="ct-form-note">
                        We respond within 24 hours. Every inquiry includes a free
                        15-minute consultation call.
                      </p>
                      <button type="submit" className="ct-submit">
                        Send Message
                      </button>
                    </div>
                  </form>
                </>
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

              <div className="ct-quick-links-card">
                <p className="ct-quick-links-title">Explore More</p>
                <div className="ct-quick-links">
                  <Link href="/services" className="ct-quick-link">
                    <span>Our Services</span><span>→</span>
                  </Link>
                  <Link href="/works" className="ct-quick-link">
                    <span>Portfolio</span><span>→</span>
                  </Link>
                  <Link href="/about" className="ct-quick-link">
                    <span>About Us</span><span>→</span>
                  </Link>
                </div>
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
