import Link from "next/link";
import CQHeader from "@/components/cq-header";
import CQFooter from "@/components/cq-footer";
import type { Metadata } from "next";
import { ServiceCard, PricingCalculator } from "./ServiceCardClient";

export const metadata: Metadata = {
  title: "Content Writing Services | Creative Quill",
  description: "Professional content writing services including blog writing, SEO content, brand storytelling, website copy, and more. Human-written, strategy-driven content that converts.",
};

export const services = [
  {
    icon: "blog",
    name: "Blog Writing",
    desc: "Engaging blog posts that turn readers into customers. Authentic insights that establish your expertise.",
    tags: ["Topic Research", "SEO Optimized", "2 Revisions"],
    price: "₹1.5/word",
    time: "3–5 days",
    href: "/contact",
  },
  {
    icon: "article",
    name: "Article Writing",
    desc: "In-depth, authoritative articles that position your brand as an industry thought leader.",
    tags: ["Deep Research", "Expert Sources", "Fact-Checked"],
    price: "₹3,000/1K words",
    time: "7–10 days",
    href: "/contact",
  },
  {
    icon: "brand",
    name: "Brand Storytelling",
    desc: "Compelling narratives that bring your brand to life and connect emotionally with customers.",
    tags: ["Brand Voice", "Origin Story", "Mission & Values"],
    price: "₹12,000/project",
    time: "7–10 days",
    href: "/contact",
  },
  {
    icon: "website",
    name: "Website Copy",
    desc: "Conversion-focused web pages that turn visitors into customers with clear, persuasive messaging.",
    tags: ["5 Pages", "Brand Voice", "SEO Optimized"],
    price: "₹7,000/site",
    time: "10–14 days",
    href: "/contact",
  },
  {
    icon: "seo",
    name: "SEO Content",
    desc: "Search-optimized content that ranks without sacrificing quality or readability.",
    tags: ["Keyword Research", "Meta Tags", "Internal Linking"],
    price: "₹15/word",
    time: "5–7 days",
    href: "/contact",
  },
  {
    icon: "custom",
    name: "Custom Content",
    desc: "Tailored solutions for case studies, whitepapers, newsletters, and more.",
    tags: ["Custom Scope", "Volume Discounts", "Retainers"],
    price: "Custom",
    time: "Varies",
    href: "/contact",
  },
];

// Helper SVGs
export function StarIcon() {
  return (
    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20" style={{ display: "inline-block", verticalAlign: "middle" }}>
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}



export function CheckIcon() {
  return (
    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3} style={{ display: "inline-block", verticalAlign: "middle" }}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}



export default function ServicesPage() {
  return (
    <>
      <style>{`
        body { background: var(--cq-cream); }

        .sp-hero {
          background: var(--cq-cream);
          padding: var(--space-16) var(--space-6) var(--space-10);
          border-bottom: 1px solid var(--cq-cream-dark);
        }
        .sp-hero-inner { max-width: var(--max-width-narrow); margin: 0 auto; text-align: center; }
        .sp-hero-badge {
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
        .sp-hero-h1 {
          font-family: var(--font-display);
          font-size: clamp(2.5rem, 6vw, 4rem);
          color: var(--cq-ink); margin: 0 0 1rem; line-height: var(--leading-display);
          letter-spacing: var(--tracking-tighter);
        }
        .sp-hero-desc {
          font-family: var(--font-body);
          font-size: 1.0625rem; font-weight: 300; color: var(--cq-ink-mid);
          max-width: 38rem; margin: 0 auto; line-height: var(--leading-body);
        }

        .sp-grid-section { background: var(--cq-cream); padding: var(--space-12) var(--space-6); }
        .sp-grid {
          max-width: var(--max-width-content); margin: 0 auto;
          display: grid; gap: var(--space-4);
          grid-template-columns: 1fr;
        }
        @media (min-width: 640px) {
          .sp-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }
        @media (min-width: 1024px) {
          .sp-grid {
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }
        }
        .sp-card {
          display: flex; flex-direction: column;
          border: 1px solid var(--cq-cream-dark);
          background: var(--cq-cream-mid);
          border-radius: var(--radius-lg);
          padding: var(--space-4);
          transition: border-color var(--transition-base), box-shadow var(--transition-base);
          text-decoration: none; color: inherit;
        }
        @media (min-width: 640px) {
          .sp-card {
            padding: var(--space-5);
          }
        }
        .sp-card:hover {
          border-color: var(--cq-beige);
          box-shadow: var(--shadow-md);
        }
        .sp-card-icon {
          width: 2.5rem; height: 2.5rem;
          background: var(--cq-cream-dark);
          border-radius: var(--radius-md);
          display: flex; align-items: center; justify-content: center;
          color: var(--cq-teal); margin-bottom: 1rem; flex-shrink: 0;
        }
        .sp-card-name {
          font-family: var(--font-display);
          font-size: 1.5rem; font-weight: 500; color: var(--cq-teal);
          margin: 0 0 0.5rem;
          letter-spacing: var(--tracking-tight);
          transition: color var(--transition-fast);
        }
        .sp-card-desc {
          font-family: var(--font-body);
          font-size: 0.875rem; font-weight: 300; color: var(--cq-ink-mid);
          line-height: var(--leading-tight); flex: 1; margin: 0 0 1.25rem;
        }
        .sp-card-tags { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1.25rem; }
        .sp-tag {
          font-family: var(--font-body);
          font-size: 0.6875rem; font-weight: 500; color: var(--cq-teal);
          letter-spacing: var(--tracking-wide); text-transform: uppercase;
          display: flex; align-items: center; gap: 0.35rem;
        }
        .sp-tag::before {
          content: '';
          display: inline-block;
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background-color: var(--cq-teal);
        }
        .sp-card-bottom {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 0.4rem;
          border-top: 1px solid var(--cq-cream-dark);
          padding-top: 0.85rem;
          margin-bottom: 0.5rem;
        }
        @media (min-width: 440px) {
          .sp-card-bottom {
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
          }
        }
        .sp-card-price {
          font-family: var(--font-display);
          font-size: 1.25rem;
          font-weight: 400;
          color: var(--cq-ink);
        }
        .sp-card-time {
          font-family: var(--font-body);
          font-size: 0.75rem; color: var(--cq-ink-muted);
          display: inline-flex; align-items: center; gap: 0.25rem;
        }
        .sp-card-cta {
          display: inline-flex; align-items: center; gap: 0.35rem;
          background: transparent !important;
          color: var(--cq-teal);
          font-family: var(--font-body);
          font-size: 0.8125rem; font-weight: 500;
          letter-spacing: var(--tracking-wide);
          text-transform: uppercase;
          padding: 0;
          margin-top: 0.5rem;
          transition: color var(--transition-fast);
        }
        .sp-card-cta span {
          display: inline-block;
          transition: transform var(--transition-fast);
        }
        .sp-card:hover .sp-card-cta {
          color: var(--cq-teal-hover);
        }
        .sp-card:hover .sp-card-cta span {
          transform: translateX(3px);
        }

        .sp-cta-section { background: var(--cq-cream); padding: var(--space-12) var(--space-6); }
        .sp-cta-box {
          max-width: var(--max-width-narrow); margin: 0 auto;
          background: var(--cq-night);
          border: 1px solid var(--cq-night-border);
          border-radius: var(--radius-xl);
          padding: var(--space-8) var(--space-6);
        }
        @media (min-width: 768px) {
          .sp-cta-box {
            padding: var(--space-12) var(--space-16);
          }
        }
        .sp-cta-h2 {
          font-family: var(--font-display);
          font-size: clamp(2rem, 5vw, 3rem);
          color: var(--cq-cream); margin: 0 0 1rem; line-height: var(--leading-heading);
          letter-spacing: var(--tracking-tight);
        }
        .sp-cta-desc {
          font-family: var(--font-body);
          font-size: 0.95rem; font-weight: 300;
          color: var(--cq-ink-faint);
          line-height: var(--leading-body); margin: 0 auto 1.5rem; max-width: 32rem;
        }
        .sp-cta-actions {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          align-items: center;
          width: 100%;
        }
        @media (min-width: 640px) {
          .sp-cta-actions {
            flex-direction: row;
            justify-content: center;
            gap: 1rem;
            width: auto;
          }
        }
        .sp-cta-actions .btn-light,
        .sp-cta-actions .btn-ghost {
          width: 100%;
          text-align: center;
          height: 44px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }
        @media (min-width: 640px) {
          .sp-cta-actions .btn-light,
          .sp-cta-actions .btn-ghost {
            width: auto;
          }
        }
        .sp-cta-checks {
          display: flex; flex-wrap: wrap; justify-content: center;
          gap: 1rem; margin-bottom: 2rem;
        }
        .sp-cta-check {
          display: flex; align-items: center; gap: 0.4rem;
          font-size: 0.78rem;
          background: var(--cq-night-mid);
          color: var(--cq-cream);
          padding: 0.35rem 0.85rem;
          border-radius: var(--radius-full);
          border: 1px solid var(--cq-night-border);
        }
        .sp-cta-check svg {
          color: var(--cq-teal);
        }
        
        .btn-primary {
          display: inline-block;
          background: var(--cq-teal);
          color: white;
          font-size: 0.75rem; font-weight: 500;
          letter-spacing: var(--tracking-wide); text-transform: uppercase;
          padding: 0.75rem 1.5rem; border-radius: var(--radius-sm);
          text-decoration: none; transition: background var(--transition-fast);
        }
        .btn-primary:hover { background: var(--cq-teal-hover); }
        
        .btn-light {
          display: inline-block;
          background: var(--cq-teal); color: white;
          font-size: 0.75rem; font-weight: 500; letter-spacing: var(--tracking-wide);
          text-transform: uppercase; padding: 0.75rem 1.5rem;
          border-radius: var(--radius-sm); text-decoration: none;
          transition: background var(--transition-fast);
        }
        .btn-light:hover { background: var(--cq-teal-hover); }
        
        .btn-ghost {
          display: inline-block;
          background: transparent; color: var(--cq-cream);
          font-size: 0.75rem; font-weight: 500; letter-spacing: var(--tracking-wide);
          text-transform: uppercase; padding: 0.75rem 1.5rem;
          border-radius: var(--radius-sm); text-decoration: none;
          border: 1px solid var(--cq-night-border);
          transition: border-color var(--transition-fast), background var(--transition-fast);
        }
        .btn-ghost:hover {
          border-color: var(--cq-cream);
          background: rgba(255, 255, 255, 0.05);
        }
        
        .sp-not-sure {
          text-align: center; padding: 1.5rem 0 0;
          font-size: 0.875rem; color: var(--cq-ink-muted);
        }
        .sp-not-sure a { color: var(--cq-ink); font-weight: 500; }
        .sp-not-sure a:hover { text-decoration: underline; }
      `}</style>

      <CQHeader />
      <main>
        {/* Hero */}
        <section className="sp-hero">
          <div className="sp-hero-inner">
            <div className="sp-hero-badge">
              <StarIcon />
              <span>Our Services</span>
            </div>
            <h1 className="sp-hero-h1">Content That Converts</h1>
            <p className="sp-hero-desc">
              Professional content writing services that help your business grow.
              Every piece is human-written, strategy-driven, and designed to deliver results.
            </p>
          </div>
        </section>

        {/* Service Cards */}
        <section className="sp-grid-section">
          <div className="sp-grid">
            {services.map((svc, index) => (
              <ServiceCard key={svc.name} svc={svc} index={index} />
            ))}
          </div>

          <PricingCalculator />

          <p className="sp-not-sure" style={{ marginTop: "3rem" }}>
            Not sure what you need?{" "}
            <Link href="/contact" data-cursor="button">Talk to us</Link>
            {" "}— we&apos;ll help you find the right solution.
          </p>
        </section>

        {/* CTA */}
        <section className="sp-cta-section">
          <div className="sp-cta-box">
            <div className="sp-hero-badge" style={{ marginBottom: "1rem" }}>
              <CheckIcon />
              <span>Ready to Transform Your Content?</span>
            </div>
            <h2 className="sp-cta-h2">Let&apos;s Craft Content That Converts</h2>
            <p className="sp-cta-desc">
              Join businesses across India who trust Creative Quill for content that
              builds genuine connections and drives real results.
            </p>
            <div className="sp-cta-checks">
              {["Human-Written Content", "48-Hour Delivery", "Multiple Revisions"].map((c) => (
                <span key={c} className="sp-cta-check" data-cursor="text">
                  <CheckIcon />
                  <span>{c}</span>
                </span>
              ))}
            </div>
            <div className="sp-cta-actions">
              <Link href="/contact" className="btn-light" data-cursor="button">Start Your Project</Link>
              <Link href="/works" className="btn-ghost" data-cursor="button">See Our Work</Link>
            </div>
          </div>
        </section>
      </main>
      <CQFooter />
    </>
  );
}
