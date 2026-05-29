import Link from "next/link";
import CQHeader from "@/components/cq-header";
import CQFooter from "@/components/cq-footer";
import type { Metadata } from "next";
import { ServiceCard, PricingCalculator } from "./ServiceCardClient";
import PageHero from "@/components/sections/PageHero";
import { ContentAuditCard } from "@/components/effects/HomeComponents";

export const metadata: Metadata = {
  title: "Content Writing Services | Creative Quill",
  description: "Professional content writing services including blog writing, SEO content, brand storytelling, website copy, and more. Human-written, strategy-driven content that converts.",
  alternates: { canonical: "https://creativequill.co.in/services" },
  openGraph: {
    title: "Content Writing Services | Creative Quill",
    description: "Human-written blog posts, SEO content, brand storytelling, website copy, and article writing. Strategy first, always.",
    url: "https://creativequill.co.in/services",
    images: [{ url: "/og-services.png", width: 1200, height: 630, alt: "Creative Quill Services" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Content Writing Services | Creative Quill",
    images: ["/og-services.png"],
  },
};

const servicesJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "Creative Quill Content Writing Services",
  "url": "https://creativequill.co.in/services",
  "description": "Professional human-written content writing services for growing businesses.",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Blog Writing", "url": "https://creativequill.co.in/services/blog-writing" },
    { "@type": "ListItem", "position": 2, "name": "Article Writing", "url": "https://creativequill.co.in/services/article-writing" },
    { "@type": "ListItem", "position": 3, "name": "Brand Storytelling", "url": "https://creativequill.co.in/services/brand-storytelling" },
    { "@type": "ListItem", "position": 4, "name": "Website Copy", "url": "https://creativequill.co.in/services/website-copy" },
    { "@type": "ListItem", "position": 5, "name": "SEO Content", "url": "https://creativequill.co.in/services/seo-content" },
    { "@type": "ListItem", "position": 6, "name": "Custom Content", "url": "https://creativequill.co.in/services/custom-content" }
  ]
};


export const services = [
  {
    icon: "blog",
    name: "Blog Writing",
    desc: "Engaging blog posts that turn readers into customers. Authentic insights that establish your expertise.",
    tags: ["Topic Research", "SEO Optimized", "2 Revisions"],
    price: "₹1.5/word",
    time: "3–5 days",
    href: "/services/blog-writing",
  },
  {
    icon: "article",
    name: "Article Writing",
    desc: "In-depth, authoritative articles that position your brand as an industry thought leader.",
    tags: ["Deep Research", "Expert Sources", "Fact-Checked"],
    price: "₹3,000/1K words",
    time: "7–10 days",
    href: "/services/article-writing",
  },
  {
    icon: "brand",
    name: "Brand Storytelling",
    desc: "Compelling narratives that bring your brand to life and connect emotionally with customers.",
    tags: ["Brand Voice", "Origin Story", "Mission & Values"],
    price: "₹12,000/project",
    time: "7–10 days",
    href: "/services/brand-storytelling",
  },
  {
    icon: "website",
    name: "Website Copy",
    desc: "Conversion-focused web pages that turn visitors into customers with clear, persuasive messaging.",
    tags: ["5 Pages", "Brand Voice", "SEO Optimized"],
    price: "₹7,000/site",
    time: "10–14 days",
    href: "/services/website-copy",
  },
  {
    icon: "seo",
    name: "SEO Content",
    desc: "Search-optimized content that ranks without sacrificing quality or readability.",
    tags: ["Keyword Research", "Meta Tags", "Internal Linking"],
    price: "₹15/word",
    time: "5–7 days",
    href: "/services/seo-content",
  },
  {
    icon: "custom",
    name: "Custom Content",
    desc: "Tailored solutions for case studies, whitepapers, newsletters, and more.",
    tags: ["Custom Scope", "Volume Discounts", "Retainers"],
    price: "Custom",
    time: "Varies",
    href: "/services/custom-content",
  },
];

export default function ServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesJsonLd) }}
      />
      <style>{`
        body { background: var(--cq-cream); }


        .sp-grid-section { background: var(--cq-cream); padding: var(--section-py-md) var(--space-6); }
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
          border: 1px solid var(--cq-linen);
          background: var(--cq-parchment);
          border-radius: var(--radius-xl);
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
          border-color: var(--cq-linen);
          box-shadow: var(--shadow-md);
        }
        .sp-card-icon {
          width: 2.5rem; height: 2.5rem;
          background: var(--cq-parchment-deep);
          border-radius: var(--radius-md);
          display: flex; align-items: center; justify-content: center;
          color: var(--cq-forest); margin-bottom: 1rem; flex-shrink: 0;
        }
        .sp-card-name {
          font-family: var(--font-display);
          font-size: 1.5rem; font-weight: 400; color: var(--cq-ink);
          margin: 0 0 0.5rem;
          letter-spacing: var(--tracking-tight);
        }
        .sp-card-desc {
          font-family: var(--font-body);
          font-size: 0.875rem; font-weight: 300; color: var(--cq-ink-mid);
          line-height: var(--leading-tight); flex: 1; margin: 0 0 1.25rem;
        }
        .sp-card-tags { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1.25rem; }
        
        .sp-card-bottom {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 0.4rem;
          border-top: 1px solid var(--cq-parchment-deep);
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
          color: var(--cq-forest);
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
          color: var(--cq-forest-hover);
        }
        .sp-card:hover .sp-card-cta span {
          transform: translateX(3px);
        }

        .sp-cta-section { background: var(--cq-cream); padding: var(--section-py-md) var(--space-6); }
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
          text-align: center;
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
          color: var(--cq-forest-hover);
        }
        
        .btn-light {
          display: inline-block;
          background: var(--cq-forest); color: var(--cq-parchment);
          font-size: 0.75rem; font-weight: 500; letter-spacing: var(--tracking-wide);
          text-transform: uppercase; padding: 0.75rem 1.5rem;
          border-radius: var(--radius-sm); text-decoration: none;
          transition: background var(--transition-fast);
        }
        .btn-light:hover { background: var(--cq-forest-hover); }
        
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
        {/* Reusable PageHero component */}
        <PageHero
          label="OUR SERVICES"
          title={<>Content That <em>Converts</em></>}
          subtitle="Professional content writing services — human-written, strategy-driven, and designed to deliver measurable results."
          breadcrumb={[{ name: "Home", path: "/" }, { name: "Services", path: "/services" }]}
          illustration="services"
        />

        {/* Service Cards & Calculator */}
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
        <section className="section-sm" style={{ background: "var(--color-bg-primary)", padding: "1rem 1.5rem" }}>
          <div className="container-content">
            <ContentAuditCard />
          </div>
        </section>
      </main>
      <CQFooter />
    </>
  );
}
