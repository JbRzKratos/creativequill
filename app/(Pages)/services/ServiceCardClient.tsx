"use client";

import { useState } from "react";
import Link from "next/link";
import { useCardTilt } from "@/hooks/useCardTilt";

export interface ServiceItem {
  href: string;
  icon: string;
  name: string;
  desc: string;
  tags: string[];
  price: string;
  time: string;
}

export function ServiceCard({ svc, index }: { svc: ServiceItem; index: number }) {
  const { props, glareRef, isHovered, isMobile } = useCardTilt<HTMLAnchorElement>();

  const padZero = (n: number) => (n < 9 ? `0${n + 1}` : `${n + 1}`);

  return (
    <Link
      href={svc.href}
      className="sp-card"
      {...props}
      data-cursor="card"
      style={{
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Glare shine effect */}
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

      {/* Watermark index */}
      <style>{`
        .sp-watermark {
          font-size: 5.5rem;
          opacity: 0.08 !important;
        }
        @media (min-width: 768px) {
          .sp-watermark {
            font-size: 7.5rem;
            opacity: 0.12 !important;
          }
        }
      `}</style>
      <span
        className="sp-watermark"
        style={{
          position: "absolute",
          bottom: "-15px",
          right: "15px",
          fontFamily: "var(--font-serif)",
          fontWeight: 400,
          color: isHovered
            ? "color-mix(in oklch, var(--foreground) 16%, transparent)"
            : "var(--border)",
          lineHeight: 1,
          pointerEvents: "none",
          transition: "color 0.3s ease",
          zIndex: 0,
        }}
      >
        {padZero(index)}
      </span>

      <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", height: "100%" }}>
        <div className="sp-card-icon">
          <ServiceIcon type={svc.icon} />
        </div>
        <h2 className="sp-card-name" style={{ color: "var(--cq-ink)" }}>{svc.name}</h2>
        <p className="sp-card-desc">{svc.desc}</p>
        <div className="sp-card-tags">
          {svc.tags.map((tag: string) => (
            <span key={tag} className="badge-tag">{tag}</span>
          ))}
        </div>
        <div className="sp-card-bottom" style={{ marginTop: "auto" }}>
          <span className="sp-card-price">{svc.price}</span>
          <span className="sp-card-time">
            <ClockIcon />
            <span>{svc.time}</span>
          </span>
        </div>
        <div className="sp-card-cta" style={{ color: "var(--cq-forest)" }}>
          Learn More <span>&rarr;</span>
        </div>
      </div>
    </Link>
  );
}

export function PricingCalculator({ className }: { className?: string } = {}) {
  const [service, setService] = useState("blog");
  const [wordCount, setWordCount] = useState(1000);
  const [turnaround, setTurnaround] = useState("standard");
  const [revisions, setRevisions] = useState("standard");

  const getServiceDetails = () => {
    let rate = 0;
    let isPerWord = false;
    let flatRate = 0;
    let serviceLabel = "";

    switch (service) {
      case "blog":
        rate = 1.5;
        isPerWord = true;
        serviceLabel = "Blog Writing";
        break;
      case "article":
        rate = 3.0;
        isPerWord = true;
        serviceLabel = "Article Writing";
        break;
      case "seo":
        rate = 15;
        isPerWord = true;
        serviceLabel = "SEO Content";
        break;
      case "brand":
        flatRate = 12000;
        serviceLabel = "Brand Storytelling";
        break;
      case "website":
        flatRate = 7000;
        serviceLabel = "Website Copy";
        break;
      case "custom":
      default:
        serviceLabel = "Custom Content";
        break;
    }
    return { rate, isPerWord, flatRate, serviceLabel };
  };

  const { rate, isPerWord, flatRate, serviceLabel } = getServiceDetails();

  const calculateBreakdown = () => {
    if (service === "custom") {
      return null;
    }

    const baseCost = isPerWord ? wordCount * rate : flatRate;
    
    // Volume discount: 10% off for word counts > 5000
    const hasVolumeDiscount = isPerWord && wordCount > 5000;
    const discountAmount = hasVolumeDiscount ? baseCost * 0.1 : 0;
    const afterDiscount = baseCost - discountAmount;

    // Rush delivery adjustment: +30%
    const rushAdjustment = turnaround === "rush" ? afterDiscount * 0.3 : 0;

    // Extra revisions adjustment: +500
    const revisionsAdjustment = revisions === "extra" ? 500 : 0;

    const totalCost = afterDiscount + rushAdjustment + revisionsAdjustment;
    const minEstimated = Math.round(totalCost * 0.95);
    const maxEstimated = Math.round(totalCost * 1.05);

    return {
      baseCost,
      hasVolumeDiscount,
      discountAmount,
      afterDiscount,
      rushAdjustment,
      revisionsAdjustment,
      totalCost,
      minEstimated,
      maxEstimated,
    };
  };

  const breakdown = calculateBreakdown();

  return (
    <div
      className={`p-6 sm:p-8 md:p-10 mx-auto w-full ${className ?? ""}`}
      style={{
        background: "var(--cq-parchment-mid)",
        border: "1px solid var(--cq-linen)",
        borderRadius: "var(--radius-xl)",
        maxWidth: "56rem",
        marginTop: className !== undefined ? 0 : "4rem",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
        <span className="badge-label self-center">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="1" x2="12" y2="23" />
            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
          </svg>
          Pricing Estimator
        </span>
        <h2 className="font-display text-3xl font-normal text-[var(--cq-ink)] mt-3">
          Estimate Your Project Cost
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
        {/* Left Column: Inputs */}
        <div className="flex flex-col gap-6 justify-between">
          <div className="flex flex-col gap-5">
            {/* Service Type */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="service-calc-type"
                className="text-xs font-semibold uppercase tracking-wider text-[var(--cq-ink-muted)]"
              >
                Service Type
              </label>
              <select
                id="service-calc-type"
                name="service-type"
                value={service}
                onChange={(e) => setService(e.target.value)}
                className="w-full bg-[var(--cq-parchment)] border border-[var(--cq-linen)] rounded-[var(--radius-md)] px-4 py-3 text-sm text-[var(--cq-ink)] focus:outline-none focus:ring-1 focus:ring-[var(--cq-forest)]"
              >
                <option value="blog">Blog Writing (₹1.5/word)</option>
                <option value="article">Article Writing (₹3.0/word)</option>
                <option value="brand">Brand Storytelling (₹12,000 flat)</option>
                <option value="website">Website Copy (₹7,000 flat)</option>
                <option value="seo">SEO Content (₹15/word)</option>
                <option value="custom">Custom / Other Content</option>
              </select>
            </div>

            {/* Word Count */}
            {isPerWord && (
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <label
                    htmlFor="service-calc-words"
                    className="text-xs font-semibold uppercase tracking-wider text-[var(--cq-ink-muted)]"
                  >
                    Word Count
                  </label>
                  {wordCount > 5000 && (
                    <span className="px-2 py-0.5 rounded-[var(--radius-xs)] text-[9px] bg-[var(--cq-forest-light)] text-[var(--cq-forest)] font-medium uppercase tracking-wider border border-[var(--cq-linen)]">
                      10% Volume Discount Applied ✓
                    </span>
                  )}
                </div>
                <input
                  id="service-calc-words"
                  name="word-count"
                  type="number"
                  min="100"
                  step="100"
                  value={wordCount}
                  onChange={(e) => setWordCount(Math.max(100, parseInt(e.target.value) || 0))}
                  className="w-full bg-[var(--cq-parchment)] border border-[var(--cq-linen)] rounded-[var(--radius-md)] px-4 py-3 text-sm text-[var(--cq-ink)] focus:outline-none focus:ring-1 focus:ring-[var(--cq-forest)]"
                />
              </div>
            )}

            {/* Turnaround Timeline */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-[var(--cq-ink-muted)]">
                Turnaround Timeline
              </label>
              <div className="grid grid-cols-2 gap-1 bg-[var(--cq-parchment-deep)] p-1 rounded-[var(--radius-md)] border border-[var(--cq-linen)]">
                <button
                  onClick={() => setTurnaround("standard")}
                  type="button"
                  className="py-2 rounded-md text-[11px] font-semibold transition-all duration-200"
                  style={{
                    background: turnaround === "standard" ? "var(--cq-forest)" : "transparent",
                    color: turnaround === "standard" ? "var(--cq-parchment)" : "var(--cq-ink-muted)",
                    border: "none",
                  }}
                >
                  Standard
                </button>
                <button
                  onClick={() => setTurnaround("rush")}
                  type="button"
                  className="py-2 rounded-md text-[11px] font-semibold transition-all duration-200"
                  style={{
                    background: turnaround === "rush" ? "var(--cq-forest)" : "transparent",
                    color: turnaround === "rush" ? "var(--cq-parchment)" : "var(--cq-ink-muted)",
                    border: "none",
                  }}
                >
                  Rush (+30%)
                </button>
              </div>
            </div>

            {/* Revisions Rounds */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-[var(--cq-ink-muted)]">
                Revisions Rounds
              </label>
              <div className="grid grid-cols-2 gap-1 bg-[var(--cq-parchment-deep)] p-1 rounded-[var(--radius-md)] border border-[var(--cq-linen)]">
                <button
                  onClick={() => setRevisions("standard")}
                  type="button"
                  className="py-2 rounded-md text-[11px] font-semibold transition-all duration-200"
                  style={{
                    background: revisions === "standard" ? "var(--cq-forest)" : "transparent",
                    color: revisions === "standard" ? "var(--cq-parchment)" : "var(--cq-ink-muted)",
                    border: "none",
                  }}
                >
                  2 Included
                </button>
                <button
                  onClick={() => setRevisions("extra")}
                  type="button"
                  className="py-2 rounded-md text-[11px] font-semibold transition-all duration-200"
                  style={{
                    background: revisions === "extra" ? "var(--cq-forest)" : "transparent",
                    color: revisions === "extra" ? "var(--cq-parchment)" : "var(--cq-ink-muted)",
                    border: "none",
                  }}
                >
                  Extra (+₹500)
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Output */}
        <div className="flex flex-col justify-between bg-[var(--cq-parchment)] border border-[var(--cq-linen)] rounded-[var(--radius-lg)] p-5 sm:p-6">
          <div className="flex-1 flex flex-col justify-center">
            {service === "custom" ? (
              <div className="w-full text-center py-4">
                <span className="text-[10px] text-[var(--cq-ink-muted)] uppercase tracking-wider block mb-1">Estimated Cost</span>
                <div className="font-display text-2xl font-light text-[var(--cq-ink)] my-3 leading-tight">
                  Custom Quote Required
                </div>
                <p className="text-xs text-[var(--cq-ink-muted)] mb-6 font-light max-w-[32ch] mx-auto leading-relaxed">
                  Please contact us directly to define your custom scope, retainers, or volume discounts.
                </p>
              </div>
            ) : (
              breakdown && (
                <div className="w-full flex flex-col h-full justify-between">
                  {/* Visual Estimated Range */}
                  <div className="text-center mb-5">
                    <span className="text-[10px] text-[var(--cq-ink-muted)] uppercase tracking-wider">Estimated Price Range</span>
                    <div className="font-sans font-medium text-3xl sm:text-4xl text-[var(--cq-ink)] my-2">
                      ₹{breakdown.minEstimated.toLocaleString()} – ₹{breakdown.maxEstimated.toLocaleString()}
                    </div>
                  </div>

                  {/* Price Breakdown Table */}
                  <div className="w-full text-xs text-[var(--cq-ink-mid)] font-light mb-6 flex-1 flex flex-col justify-center">
                    <h4 className="font-semibold uppercase tracking-wider text-[var(--cq-ink-muted)] mb-2.5 text-[10px]">Price Breakdown</h4>
                    <table className="w-full">
                      <tbody>
                        <tr className="border-b border-[rgba(22,18,14,0.04)] py-2.5 block">
                          <td className="w-2/3">Base rate for {serviceLabel}</td>
                          <td className="w-1/3 text-right">₹{breakdown.baseCost.toLocaleString()}</td>
                        </tr>
                        {breakdown.hasVolumeDiscount && (
                          <tr className="border-b border-[rgba(22,18,14,0.04)] py-2.5 block text-[var(--cq-forest)] font-medium">
                            <td className="w-2/3">Volume discount (10% off)</td>
                            <td className="w-1/3 text-right">-₹{breakdown.discountAmount.toLocaleString()}</td>
                          </tr>
                        )}
                        {turnaround === "rush" && (
                          <tr className="border-b border-[rgba(22,18,14,0.04)] py-2.5 block">
                            <td className="w-2/3">Rush delivery surcharge (+30%)</td>
                            <td className="w-1/3 text-right">+₹{breakdown.rushAdjustment.toLocaleString()}</td>
                          </tr>
                        )}
                        {revisions === "extra" && (
                          <tr className="border-b border-[rgba(22,18,14,0.04)] py-2.5 block">
                            <td className="w-2/3">Extra revision round</td>
                            <td className="w-1/3 text-right">+₹500</td>
                          </tr>
                        )}
                        <tr className="py-3 block font-semibold text-[var(--cq-ink)] text-sm">
                          <td className="w-2/3">Total Calculated Estimate</td>
                          <td className="w-1/3 text-right">₹{Math.round(breakdown.totalCost).toLocaleString()}*</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )
            )}
          </div>

          <Link
            href={`/contact?service=${service}&words=${isPerWord ? wordCount : 0}&rush=${turnaround === "rush" ? "yes" : "no"}`}
            className="btn-primary inline-flex items-center gap-1.5 font-medium px-8 py-3.5 w-full justify-center text-center mt-auto"
          >
            Get Exact Quote &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}

export function ClockIcon() {
  return (
    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} style={{ display: "inline-block", verticalAlign: "middle" }}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

export function ServiceIcon({ type }: { type: string }) {
  const base = "w-5 h-5 text-current";
  switch (type) {
    case "blog":
      return (
        <svg className={base} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      );
    case "article":
      return (
        <svg className={base} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
        </svg>
      );
    case "brand":
      return (
        <svg className={base} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      );
    case "website":
      return (
        <svg className={base} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
        </svg>
      );
    case "seo":
      return (
        <svg className={base} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      );
    case "custom":
      return (
        <svg className={base} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 19v-8.93a2 2 0 01.89-1.664l8-5.333a2 2 0 012.22 0l8 5.333A2 2 0 0121 10.07V19a2 2 0 01-2 2H5a2 2 0 01-2-2z" strokeMiterlimit="10" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 14l8-5.333a2 2 0 012.22 0L21 14" strokeMiterlimit="10" />
        </svg>
      );
    default:
      return null;
  }
}
