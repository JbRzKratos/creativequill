import Link from "next/link";
import CQHeader from "@/components/cq-header";
import CQFooter from "@/components/cq-footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Content Writing Services | Creative Quill",
  description: "Professional content writing services including blog writing, SEO content, brand storytelling, website copy, and more. Human-written, strategy-driven content that converts.",
};

const services = [
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

// Helper SVGs to replace emojis
function StarIcon() {
  return (
    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20" style={{ display: "inline-block", verticalAlign: "middle" }}>
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} style={{ display: "inline-block", verticalAlign: "middle" }}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3} style={{ display: "inline-block", verticalAlign: "middle" }}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

function ServiceIcon({ type }: { type: string }) {
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

export default function ServicesPage() {
  return (
    <>
      <style>{`
        body { background: var(--muted); }

        .sp-hero {
          background: var(--background);
          padding: 5rem 1.5rem 3.5rem;
          border-bottom: 1px solid var(--border);
        }
        .sp-hero-inner { max-width: 72rem; margin: 0 auto; text-align: center; }
        .sp-hero-badge {
          display: inline-flex; align-items: center; gap: 0.5rem;
          background: color-mix(in oklch, var(--primary) 10%, transparent);
          color: var(--primary); border-radius: 999px;
          padding: 0.35rem 1rem;
          font-size: 0.7rem; font-weight: 600;
          letter-spacing: 0.1em; text-transform: uppercase;
          margin-bottom: 1.25rem;
        }
        .sp-hero-h1 {
          font-family: var(--font-serif);
          font-size: clamp(2rem, 5vw, 3rem);
          color: var(--foreground); margin: 0 0 1rem; line-height: 1.2;
        }
        .sp-hero-desc {
          font-size: 0.95rem; color: var(--muted-foreground);
          max-width: 36rem; margin: 0 auto; line-height: 1.75;
        }

        .sp-grid-section { background: var(--background); padding: 3rem 1.5rem 5rem; }
        .sp-grid {
          max-width: 72rem; margin: 0 auto;
          display: grid; gap: 1.5rem;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
        }
        .sp-card {
          display: flex; flex-direction: column;
          border: 1px solid var(--border);
          background: var(--card);
          border-radius: var(--radius-lg);
          padding: 1.5rem;
          transition: border-color 0.2s, box-shadow 0.2s;
          text-decoration: none; color: inherit;
        }
        .sp-card:hover {
          border-color: color-mix(in oklch, var(--primary) 35%, transparent);
          box-shadow: 0 8px 32px color-mix(in oklch, var(--foreground) 10%, transparent);
        }
        .sp-card-icon {
          width: 2.75rem; height: 2.75rem;
          background: color-mix(in oklch, var(--primary) 10%, transparent);
          border-radius: var(--radius-md);
          display: flex; align-items: center; justify-content: center;
          color: var(--primary); margin-bottom: 1rem; flex-shrink: 0;
        }
        .sp-card-name {
          font-size: 1rem; font-weight: 600; color: var(--foreground);
          margin: 0 0 0.5rem;
          transition: color 0.2s;
        }
        .sp-card:hover .sp-card-name { color: var(--primary); }
        .sp-card-desc {
          font-size: 0.82rem; color: var(--muted-foreground);
          line-height: 1.7; flex: 1; margin: 0 0 1rem;
        }
        .sp-card-tags { display: flex; flex-wrap: wrap; gap: 0.4rem; margin-bottom: 1.25rem; }
        .sp-tag {
          font-size: 0.65rem; color: var(--muted-foreground);
          display: flex; align-items: center; gap: 0.3rem;
        }
        .sp-tag::before {
          content: '✓'; font-size: 0.6rem;
          color: var(--primary);
        }
        .sp-card-bottom {
          display: flex; align-items: center; justify-content: space-between;
          border-top: 1px solid var(--border); padding-top: 1rem;
          margin-bottom: 1rem;
        }
        .sp-card-price { font-size: 0.9rem; font-weight: 700; color: var(--primary); }
        .sp-card-time {
          font-size: 0.72rem; color: var(--muted-foreground);
          display: inline-flex; align-items: center; gap: 0.25rem;
        }
        .sp-card-cta {
          display: flex; align-items: center; justify-content: center; gap: 0.5rem;
          background: var(--secondary); color: var(--foreground);
          border-radius: var(--radius-md); padding: 0.6rem;
          font-size: 0.78rem; font-weight: 500;
          transition: background 0.2s, color 0.2s;
        }
        .sp-card:hover .sp-card-cta {
          background: var(--primary); color: var(--primary-foreground);
        }

        .sp-cta-section { background: var(--primary); padding: 4rem 1.5rem; }
        .sp-cta-box {
          max-width: 48rem; margin: 0 auto;
          border: 2px solid color-mix(in oklch, var(--primary-foreground) 20%, transparent);
          border-radius: var(--radius-xl);
          padding: 2.5rem;
          text-align: center;
        }
        .sp-cta-h2 {
          font-family: var(--font-serif);
          font-size: clamp(1.65rem, 3.5vw, 2.25rem);
          color: var(--primary-foreground); margin: 0 0 0.75rem;
        }
        .sp-cta-desc {
          font-size: 0.875rem;
          color: color-mix(in oklch, var(--primary-foreground) 70%, transparent);
          line-height: 1.75; margin: 0 0 1.5rem; max-width: 32rem; margin-left: auto; margin-right: auto;
        }
        .sp-cta-checks {
          display: flex; flex-wrap: wrap; justify-content: center;
          gap: 1rem 2rem; margin-bottom: 2rem;
        }
        .sp-cta-check {
          display: flex; align-items: center; gap: 0.4rem;
          font-size: 0.78rem;
          color: color-mix(in oklch, var(--primary-foreground) 80%, transparent);
        }
        .sp-cta-actions { display: flex; flex-wrap: wrap; justify-content: center; gap: 1rem; }
        .btn-light {
          display: inline-block;
          background: var(--primary-foreground); color: var(--primary);
          font-size: 0.7rem; font-weight: 700; letter-spacing: 0.15em;
          text-transform: uppercase; padding: 1rem 2rem;
          border-radius: var(--radius-sm); text-decoration: none;
          transition: opacity 0.2s;
        }
        .btn-light:hover { opacity: 0.88; }
        .btn-ghost {
          display: inline-block;
          background: transparent; color: var(--primary-foreground);
          font-size: 0.7rem; font-weight: 700; letter-spacing: 0.15em;
          text-transform: uppercase; padding: 1rem 2rem;
          border-radius: var(--radius-sm); text-decoration: none;
          border: 1px solid color-mix(in oklch, var(--primary-foreground) 45%, transparent);
          transition: background 0.2s;
        }
        .btn-ghost:hover {
          background: color-mix(in oklch, var(--primary-foreground) 10%, transparent);
        }
        .sp-not-sure {
          text-align: center; padding: 1.5rem 0 0;
          font-size: 0.875rem; color: var(--muted-foreground);
        }
        .sp-not-sure a { color: var(--foreground); font-weight: 500; }
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
            {services.map((svc) => (
              <Link key={svc.name} href={svc.href} className="sp-card">
                <div className="sp-card-icon">
                  <ServiceIcon type={svc.icon} />
                </div>
                <h2 className="sp-card-name">{svc.name}</h2>
                <p className="sp-card-desc">{svc.desc}</p>
                <div className="sp-card-tags">
                  {svc.tags.map((tag) => (
                    <span key={tag} className="sp-tag">{tag}</span>
                  ))}
                </div>
                <div className="sp-card-bottom">
                  <span className="sp-card-price">{svc.price}</span>
                  <span className="sp-card-time">
                    <ClockIcon />
                    <span>{svc.time}</span>
                  </span>
                </div>
                <div className="sp-card-cta">Learn More →</div>
              </Link>
            ))}
          </div>
          <p className="sp-not-sure">
            Not sure what you need?{" "}
            <Link href="/contact">Talk to us</Link>
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
                <span key={c} className="sp-cta-check">
                  <CheckIcon />
                  <span>{c}</span>
                </span>
              ))}
            </div>
            <div className="sp-cta-actions">
              <Link href="/contact" className="btn-light">Start Your Project</Link>
              <Link href="/works" className="btn-ghost">See Our Work</Link>
            </div>
          </div>
        </section>
      </main>
      <CQFooter />
    </>
  );
}
