import React, { ReactNode } from "react";
import Link from "next/link";
import PageIllustration from "../illustrations/PageIllustration";

interface PageHeroProps {
  label: string;
  title: string | ReactNode;
  subtitle?: string;
  breadcrumb: { name: string; path: string }[];
  illustration?: "services" | "about" | "works" | "contact" | "service-detail";
}

function getHeroBadgeIcon(label: string) {
  const norm = label.toLowerCase();
  if (norm.includes("about") || norm.includes("philosophy") || norm.includes("code") || norm.includes("stand for")) {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <path d="M12 16v-4"/>
        <path d="M12 8h.01"/>
      </svg>
    );
  }
  if (norm.includes("contact")) {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="14" x="2" y="5" rx="2"/>
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
      </svg>
    );
  }
  if (norm.includes("portfolio") || norm.includes("work")) {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="m6 14 1.45-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.55 6a2 2 0 0 1-1.94 1.5H4a2 2 0 0 1-2-2V5c0-1.1.9-2 2-2h3.93a2 2 0 0 1 1.66.9l.82 1.2a2 2 0 0 0 1.66.9H18a2 2 0 0 1 2 2v2"/>
      </svg>
    );
  }
  if (norm.includes("service") || norm.includes("solution") || norm.includes("pricing") || norm.includes("concept") || norm.includes("approach")) {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
        <rect width="20" height="14" x="2" y="6" rx="2"/>
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3l3 6 6 3-6 3-3 6-3-6-6-3 6-3z"/>
    </svg>
  );
}

export default function PageHero({
  label,
  title,
  subtitle,
  breadcrumb,
  illustration,
}: PageHeroProps) {
  return (
    <section 
      style={{ 
        backgroundColor: "var(--cq-parchment-mid)", 
        borderBottom: "1px solid var(--cq-parchment-deep)" 
      }} 
      className="py-16 md:py-20 relative overflow-hidden"
    >
      <div className="container-content">
        {/* Breadcrumb Navigation */}
        <nav className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-8 text-[10px] font-body tracking-wider uppercase text-[var(--cq-ink-muted)]">
          {breadcrumb.map((item, i) => (
            <div key={item.path + i} className="flex items-center gap-1.5 whitespace-nowrap">
              {i < breadcrumb.length - 1 ? (
                <Link href={item.path} className="hover:text-[var(--cq-forest)] transition-colors inline-flex items-center leading-none">
                  {item.name}
                </Link>
              ) : (
                <span className="text-[var(--cq-ink-faint)] font-light inline-flex items-center leading-none">{item.name}</span>
              )}
              {i < breadcrumb.length - 1 && <span className="text-[8px] text-[var(--cq-linen)] inline-flex items-center leading-none">/</span>}
            </div>
          ))}
        </nav>

        {/* Hero Grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 items-center">
          {/* Left Column: Text */}
          <div className="flex flex-col items-start">
            <span className="badge-label">
              {getHeroBadgeIcon(label)}
              {label}
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl mt-4 text-balance leading-tight text-[var(--cq-ink)] font-normal">
              {title}
            </h1>
            {subtitle && (
              <p className="mt-4 text-base md:text-lg font-light max-w-[55ch] text-[var(--cq-ink-mid)] leading-relaxed">
                {subtitle}
              </p>
            )}
          </div>

          {/* Right Column: Dynamic SVG Illustration */}
          {illustration && (
            <div className="hidden lg:block w-[180px] h-[180px] shrink-0">
              <PageIllustration type={illustration} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
