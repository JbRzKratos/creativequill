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
            <span className="badge-label">{label}</span>
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
