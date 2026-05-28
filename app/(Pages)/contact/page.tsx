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

function ServiceTabIcon({ service }: { service: string }) {
  if (service === "Blog Writing") {
    return (
      <svg className="w-5 h-5 stroke-current" viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
      </svg>
    );
  }
  if (service === "Article Writing") {
    return (
      <svg className="w-5 h-5 stroke-current" viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
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
      <svg className="w-5 h-5 stroke-current" viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    );
  }
  if (service === "Website Copy") {
    return (
      <svg className="w-5 h-5 stroke-current" viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    );
  }
  if (service === "SEO Content") {
    return (
      <svg className="w-5 h-5 stroke-current" viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
        <line x1="11" y1="8" x2="11" y2="14" />
        <line x1="8" y1="11" x2="14" y2="11" />
      </svg>
    );
  }
  if (service === "Product Descriptions") {
    return (
      <svg className="w-5 h-5 stroke-current" viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 0 1-8 0" />
      </svg>
    );
  }
  return (
    <svg className="w-5 h-5 stroke-current" viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    details: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);

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

  const handleNext = () => {
    if (step < 5) {
      setDirection(1);
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setDirection(-1);
      setStep(step - 1);
    }
  };

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1200);
  };

  const isNextDisabled =
    (step === 1 && form.name.trim().length < 2) ||
    (step === 2 && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) ||
    (step === 3 && !form.service) ||
    (step === 4 && form.details.trim().length < 10);

  return (
    <>
      <style>{`
        /* Prevent iOS auto-zoom */
        @media (max-width: 768px) {
          input, textarea {
            font-size: 16px !important;
          }
        }
      `}</style>

      <CQHeader />
      <main className="min-h-[calc(100vh-64px)] bg-[var(--cq-parchment)] flex flex-col lg:flex-row">
        {/* Left Sticky Column */}
        <div className="w-full lg:w-[45%] lg:sticky lg:top-[64px] lg:h-[calc(100vh-64px)] bg-[var(--cq-night)] text-[var(--cq-parchment)] p-8 md:p-12 flex flex-col justify-between gap-12 overflow-y-auto">
          {/* Top block */}
          <div className="flex flex-col items-start gap-4">
            <span className="px-2.5 py-1 text-[10px] font-medium tracking-wider uppercase bg-[rgba(255,255,255,0.08)] text-white border border-[rgba(255,255,255,0.15)] rounded-full">
              Get in Touch
            </span>
            <h2 className="font-display text-3xl md:text-4xl text-[var(--cq-parchment)] leading-tight text-balance font-normal">
              Let&apos;s Talk About Your Content
            </h2>
            <p className="text-sm font-light text-[rgba(250,247,240,0.65)] leading-relaxed max-w-[45ch]">
              Fill in the form and we&apos;ll get back to you within 24 hours with a free strategy consultation.
            </p>
          </div>

          {/* Middle block */}
          <div className="flex flex-col font-body">
            <div className="border-b border-[var(--cq-night-border)] py-4">
              <span className="block text-[10px] font-medium uppercase tracking-wider text-[rgba(250,247,240,0.5)] mb-1">
                Email
              </span>
              <a
                href="mailto:hello@creativequill.co.in"
                className="text-sm font-medium text-[var(--cq-parchment)] hover:text-[var(--cq-teal)] transition-colors"
              >
                hello@creativequill.co.in
              </a>
            </div>

            <div className="border-b border-[var(--cq-night-border)] py-4">
              <span className="block text-[10px] font-medium uppercase tracking-wider text-[rgba(250,247,240,0.5)] mb-1">
                Phone
              </span>
              <a
                href="tel:+918807190545"
                className="text-sm font-medium text-[var(--cq-parchment)] hover:text-[var(--cq-teal)] transition-colors"
              >
                +91 88071 90545
              </a>
              <span className="block text-[10px] text-[rgba(250,247,240,0.4)] mt-0.5">
                Mon–Fri, 9 AM–6 PM IST
              </span>
            </div>

            <div className="py-4">
              <span className="block text-[10px] font-medium uppercase tracking-wider text-[rgba(250,247,240,0.5)] mb-1">
                Response Time
              </span>
              <span className="text-sm font-medium text-[var(--cq-parchment)]">
                Under 24 hours
              </span>
              <span className="block text-[10px] text-[rgba(250,247,240,0.4)] mt-0.5">
                Free consultation included
              </span>
            </div>
          </div>

          {/* Bottom block */}
          <div className="border-l-2 border-[var(--cq-forest)] pl-4">
            <p className="font-display italic text-lg md:text-xl text-[rgba(250,247,240,0.4)] leading-relaxed">
              &ldquo;Every great piece of content starts with one conversation.&rdquo;
            </p>
          </div>
        </div>

        {/* Right Scrollable Column */}
        <div className="w-full lg:w-[55%] p-8 md:p-12 flex flex-col bg-[var(--cq-parchment)] justify-between min-h-[500px]">
          {/* Breadcrumb + Step progress header */}
          <div className="flex items-center justify-between gap-4 mb-12 flex-wrap sm:flex-nowrap">
            <nav className="flex items-center flex-nowrap whitespace-nowrap gap-1.5 text-[10px] font-body tracking-wider uppercase text-[var(--cq-ink-muted)]">
              <Link href="/" className="hover:text-[var(--cq-forest)] transition-colors inline-flex items-center leading-none">
                Home
              </Link>
              <span className="text-[8px] text-[var(--cq-linen)] inline-flex items-center leading-none">/</span>
              <span className="text-[var(--cq-ink-faint)] font-light inline-flex items-center leading-none">Contact</span>
            </nav>
            {!submitted && (
              <span className="font-body text-xs text-[var(--cq-ink-faint)] font-medium shrink-0">
                Step {step} of 5
              </span>
            )}
          </div>

          {/* Form Wizard / Success block */}
          <div className="flex-1 flex flex-col justify-center max-w-[560px] w-full mx-auto mb-12">
            {submitted ? (
              <div className="flex flex-col items-center justify-center text-center py-8">
                <div className="w-16 h-16 rounded-full bg-[var(--cq-forest-light)] text-[var(--cq-forest)] flex items-center justify-center mb-6">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-display text-3xl text-[var(--cq-ink)] mb-4">Message Received!</h3>
                <p className="font-body font-light text-[var(--cq-ink-mid)] leading-relaxed max-w-[40ch]">
                  Thanks for reaching out, {form.name.split(" ")[0]}. We&apos;ll get back to you within 24 hours with next steps and a free strategy consultation slot.
                </p>
                <Link
                  href="/"
                  className="mt-8 px-6 py-2.5 bg-[var(--cq-forest)] hover:bg-[var(--cq-forest-hover)] text-white rounded-[var(--radius-sm)] transition-colors text-xs font-semibold uppercase tracking-wider"
                >
                  Back to Home
                </Link>
              </div>
            ) : (
              <div className="w-full">
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
                    className="w-full"
                  >
                    {step === 1 && (
                      <div>
                        <h2 className="font-display italic text-2xl md:text-3xl text-[var(--cq-ink)] mb-6">
                          Hi! What&apos;s your name?
                        </h2>
                        <input
                          type="text"
                          className="w-full bg-transparent border-b-2 border-[var(--cq-linen)] focus:border-[var(--cq-forest)] outline-none py-3 text-lg md:text-xl font-body text-[var(--cq-ink)] transition-colors"
                          placeholder="Your name..."
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          autoFocus
                          onKeyDown={(e) => {
                            if (e.key === "Enter" && form.name.trim().length >= 2) {
                              handleNext();
                            }
                          }}
                        />
                      </div>
                    )}

                    {step === 2 && (
                      <div>
                        <h2 className="font-display italic text-2xl md:text-3xl text-[var(--cq-ink)] mb-6 text-balance">
                          Nice to meet you, <span className="text-[var(--cq-forest)] font-normal">{form.name}</span>! What&apos;s your email?
                        </h2>
                        <div className="flex flex-col gap-6">
                          <input
                            type="email"
                            className="w-full bg-transparent border-b-2 border-[var(--cq-linen)] focus:border-[var(--cq-forest)] outline-none py-3 text-lg md:text-xl font-body text-[var(--cq-ink)] transition-colors"
                            placeholder="yourname@example.com"
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            autoFocus
                            onKeyDown={(e) => {
                              if (e.key === "Enter" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
                                handleNext();
                              }
                            }}
                          />
                          <div>
                            <label className="block text-[10px] font-body font-medium tracking-wider uppercase text-[var(--cq-ink-muted)] mb-2">
                              Phone Number (optional)
                            </label>
                            <input
                              type="tel"
                              className="w-full bg-transparent border-b border-[var(--cq-linen)] focus:border-[var(--cq-forest)] outline-none py-2 text-base font-body text-[var(--cq-ink)] transition-colors"
                              placeholder="+91 98765 43210"
                              value={form.phone}
                              onChange={(e) => setForm({ ...form, phone: e.target.value })}
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {step === 3 && (
                      <div>
                        <h2 className="font-display italic text-2xl md:text-3xl text-[var(--cq-ink)] mb-6">
                          What can we help you with?
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                          {services.map((svc) => {
                            const isSelected = form.service === svc;
                            return (
                              <button
                                key={svc}
                                type="button"
                                className={`flex items-center gap-3 p-4 border rounded-[var(--radius-md)] text-left transition-all ${
                                  isSelected
                                    ? "border-[var(--cq-forest)] bg-[var(--cq-forest-light)] text-[var(--cq-forest)]"
                                    : "border-[var(--cq-parchment-deep)] bg-white text-[var(--cq-ink-mid)] hover:border-[var(--cq-linen)] hover:bg-[var(--cq-parchment-mid)]"
                                }`}
                                onClick={() => {
                                  setForm({ ...form, service: svc });
                                  setTimeout(() => {
                                    handleNext();
                                  }, 250);
                                }}
                              >
                                <span className="text-[var(--cq-forest)]">
                                  <ServiceTabIcon service={svc} />
                                </span>
                                <span className="font-body text-sm font-medium">{svc}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {step === 4 && (
                      <div>
                        <h2 className="font-display italic text-2xl md:text-3xl text-[var(--cq-ink)] mb-6">
                          Tell us about your project
                        </h2>
                        <div className="flex flex-col gap-2">
                          <textarea
                            className="w-full min-h-[140px] bg-white border border-[var(--cq-parchment-deep)] focus:border-[var(--cq-forest)] rounded-[var(--radius-md)] p-4 outline-none text-base font-body text-[var(--cq-ink)] transition-colors resize-none"
                            placeholder="What are your goals, target audience, references you like, and your timeline?"
                            value={form.details}
                            onChange={(e) => setForm({ ...form, details: e.target.value })}
                            autoFocus
                          />
                          <div className="flex justify-between items-center text-[10px] font-body text-[var(--cq-ink-muted)]">
                            <span>Recommended length: &ge; 10 characters</span>
                            <span className={form.details.trim().length >= 10 ? "text-emerald-700 font-medium" : "text-amber-700 font-medium"}>
                              {form.details.length} characters
                            </span>
                          </div>
                        </div>
                      </div>
                    )}

                    {step === 5 && (
                      <div>
                        <h2 className="font-display italic text-2xl md:text-3xl text-[var(--cq-ink)] mb-6">
                          Here&apos;s what we&apos;ve got —
                        </h2>
                        <div className="bg-[var(--cq-parchment-mid)] border border-[var(--cq-parchment-deep)] rounded-[var(--radius-xl)] p-6 flex flex-col gap-4 text-sm font-body">
                          <div className="border-b border-[var(--cq-parchment-deep)] pb-3">
                            <span className="block text-[10px] uppercase tracking-wider text-[var(--cq-ink-muted)] mb-1">Name</span>
                            <span className="text-[var(--cq-ink)] font-medium">{form.name}</span>
                          </div>
                          <div className="border-b border-[var(--cq-parchment-deep)] pb-3">
                            <span className="block text-[10px] uppercase tracking-wider text-[var(--cq-ink-muted)] mb-1">Contact</span>
                            <span className="text-[var(--cq-ink)] font-medium">
                              {form.email} {form.phone && `• ${form.phone}`}
                            </span>
                          </div>
                          <div className="border-b border-[var(--cq-parchment-deep)] pb-3">
                            <span className="block text-[10px] uppercase tracking-wider text-[var(--cq-ink-muted)] mb-1">Service</span>
                            <span className="text-[var(--cq-ink)] font-medium">{form.service}</span>
                          </div>
                          <div>
                            <span className="block text-[10px] uppercase tracking-wider text-[var(--cq-ink-muted)] mb-1">Details</span>
                            <p className="text-[var(--cq-ink-mid)] font-light leading-relaxed whitespace-pre-wrap max-h-[150px] overflow-y-auto">
                              {form.details || "No details provided"}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            )}
          </div>

          {/* Navigation Footer */}
          {!submitted && (
            <div className="flex items-center justify-between border-t border-[var(--cq-parchment-deep)] pt-6">
              {step > 1 ? (
                <button
                  type="button"
                  className="inline-flex items-center gap-2 font-body text-xs font-semibold uppercase tracking-wider text-[var(--cq-ink-muted)] hover:text-[var(--cq-ink)] transition-colors"
                  onClick={handleBack}
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  <span>Back</span>
                </button>
              ) : (
                <div />
              )}

              {step < 5 ? (
                <button
                  type="button"
                  className="px-6 py-2.5 bg-[var(--cq-forest)] hover:bg-[var(--cq-forest-hover)] disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-[var(--radius-sm)] transition-colors font-body text-xs font-semibold uppercase tracking-wider inline-flex items-center gap-2"
                  disabled={isNextDisabled}
                  onClick={handleNext}
                >
                  <span>Continue</span>
                  <span>&rarr;</span>
                </button>
              ) : (
                <div className="flex gap-3">
                  <button
                    type="button"
                    className="px-4 py-2.5 border border-[var(--cq-linen)] hover:bg-[var(--cq-parchment-mid)] text-[var(--cq-ink-mid)] rounded-[var(--radius-sm)] transition-colors font-body text-xs font-semibold uppercase tracking-wider"
                    onClick={() => setStep(1)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="px-6 py-2.5 bg-[var(--cq-forest)] hover:bg-[var(--cq-forest-hover)] disabled:opacity-50 text-white rounded-[var(--radius-sm)] transition-colors font-body text-xs font-semibold uppercase tracking-wider inline-flex items-center gap-2"
                    disabled={loading}
                    onClick={handleSubmit}
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <span>Confirm &amp; Send</span>
                        <span>&rarr;</span>
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
      <CQFooter />
    </>
  );
}
