import Link from "next/link";
import CQHeader from "@/components/cq-header";
import CQFooter from "@/components/cq-footer";
import type { Metadata } from "next";
import { HorizontalScrollCaseStudies } from "./worksClient";

export const metadata: Metadata = {
  title: "Our Works | Creative Quill — Content We've Crafted",
  description: "Browse Creative Quill's portfolio of content projects. From blog series to comprehensive SEO strategies, see the stories we've crafted and results we've delivered.",
};

const projects = [
  {
    id: "tiger-safari",
    label: "Blog Series",
    title: "Tiger Safari Tours India",
    subtitle: "Wildlife Tourism Content Strategy",
    desc: "A comprehensive blog series crafted for a wildlife tourism brand entering a competitive travel market. We developed a content strategy rooted in authentic storytelling — capturing the raw, sensory experience of India's tiger reserves rather than generic itinerary copy.",
    outcome: "Helped the client establish topical authority in wildlife tourism, with blog posts that drove organic discovery from travellers actively planning safari experiences.",
    tags: ["Wildlife Tourism", "Blog Series", "SEO Strategy", "Brand Voice"],
    deliverables: ["8-part blog series", "Keyword mapping", "Content calendar", "Meta copy"],
    img: "https://images.unsplash.com/photo-1561731216-c3a4d99437d5?q=80&w=900&auto=format&fit=crop",
    accent: "#2d4a3e",
  },
  {
    id: "beeonline",
    label: "SEO Strategy",
    title: "BeeOnline Communications",
    subtitle: "Comprehensive SEO Content Strategy",
    desc: "BeeOnline needed more than just well-written pages — they needed a cohesive content architecture that could compete against established players in the B2B communications space.",
    outcome: "Delivered a full SEO content strategy including topic cluster maps, pillar page frameworks, and on-page copy across their core service pages — giving their team a clear publishing roadmap built for long-term growth.",
    tags: ["B2B Communications", "SEO Content", "Pillar Pages", "Topic Clusters"],
    deliverables: ["Topic cluster map", "5 pillar pages", "On-page copy", "SEO audit"],
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=900&auto=format&fit=crop",
    accent: "#1a2d4a",
  },
];

export default function WorksPage() {
  return (
    <>
      <style>{`
        body { background: var(--cq-cream); }

        /* HERO */
        .wk-hero {
          background: var(--cq-cream);
          padding: var(--space-16) var(--space-6);
          border-bottom: 1px solid var(--cq-cream-dark);
          text-align: center;
        }
        .wk-hero-inner { max-width: var(--max-width-narrow); margin: 0 auto; }
        .wk-hero-badge {
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
        .wk-hero-h1 {
          font-family: var(--font-display);
          font-size: clamp(2.5rem, 6vw, 4rem);
          color: var(--cq-ink); margin: 0 0 1rem; line-height: var(--leading-display);
          letter-spacing: var(--tracking-tighter);
        }
        .wk-hero-desc {
          font-family: var(--font-body);
          font-size: 1.0625rem; font-weight: 300; color: var(--cq-ink-mid);
          line-height: var(--leading-body); max-width: 36rem; margin: 0 auto;
        }

        /* PROCESS TEASER */
        .wk-process {
          background: var(--cq-cream-mid); padding: var(--space-16) var(--space-6);
          border-top: 1px solid var(--cq-cream-dark);
          border-bottom: 1px solid var(--cq-cream-dark);
        }
        .wk-process-inner {
          max-width: var(--max-width-content); margin: 0 auto;
          display: grid; gap: var(--space-8);
          grid-template-columns: 1fr 2fr;
          align-items: start;
        }
        @media (max-width: 800px) { .wk-process-inner { grid-template-columns: 1fr; } }
        .wk-process-h2 {
          font-family: var(--font-display);
          font-size: clamp(2rem, 5vw, 3rem);
          color: var(--cq-ink); margin: 0 0 1rem; line-height: var(--leading-heading);
          letter-spacing: var(--tracking-tight);
        }
        .wk-process-desc {
          font-family: var(--font-body);
          font-size: 0.95rem; font-weight: 300; color: var(--cq-ink-mid);
          line-height: var(--leading-body); margin: 0 0 1.5rem;
        }
        .wk-steps {
          display: grid; gap: var(--space-4);
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }
        @media (min-width: 640px) {
          .wk-steps {
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }
        }
        @media (min-width: 768px) {
          .wk-steps {
            grid-template-columns: repeat(6, minmax(0, 1fr));
          }
        }
        .wk-step {
          background: var(--cq-cream); border: 1px solid var(--cq-cream-dark);
          border-radius: var(--radius-lg); padding: var(--space-4);
          transition: border-color var(--transition-base), box-shadow var(--transition-base);
        }
        @media (min-width: 640px) {
          .wk-step {
            padding: var(--space-5);
          }
        }
        .wk-step:hover {
          border-color: var(--cq-beige);
          box-shadow: var(--shadow-md);
        }
        .wk-step-num {
          font-family: var(--font-display);
          font-size: 2rem; font-weight: 400;
          color: var(--cq-beige);
          line-height: 1; margin-bottom: 0.5rem;
        }
        .wk-step-title {
          font-family: var(--font-body);
          font-size: 0.95rem; font-weight: 600; color: var(--cq-ink); margin-bottom: 0.3rem;
        }
        .wk-step-desc {
          font-family: var(--font-body);
          font-size: 0.8125rem; font-weight: 300; color: var(--cq-ink-muted); line-height: var(--leading-tight);
        }

        /* CTA */
        .wk-cta {
          background: var(--cq-night);
          padding: var(--space-16) var(--space-6);
          text-align: center;
        }
        .wk-cta-h2 {
          font-family: var(--font-display);
          font-size: clamp(2rem, 5vw, 3rem);
          color: var(--cq-cream); margin: 0 0 1rem; line-height: var(--leading-heading);
          letter-spacing: var(--tracking-tight);
        }
        .wk-cta-desc {
          font-family: var(--font-body);
          font-size: 0.95rem; font-weight: 300;
          color: var(--cq-ink-faint);
          max-width: 32rem; margin: 0 auto 2rem; line-height: var(--leading-body);
        }
        .wk-cta-actions {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.75rem;
          width: 100%;
        }
        @media (min-width: 640px) {
          .wk-cta-actions {
            flex-direction: row;
            justify-content: center;
            gap: 1rem;
            width: auto;
          }
        }
        .wk-cta-actions .btn-light,
        .wk-cta-actions .btn-ghost {
          width: 100%;
          text-align: center;
          height: 44px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }
        @media (min-width: 640px) {
          .wk-cta-actions .btn-light,
          .wk-cta-actions .btn-ghost {
            width: auto;
          }
        }
        
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
        
        .btn-primary {
          display: inline-block;
          background: var(--cq-teal); color: white;
          font-size: 0.75rem; font-weight: 500; letter-spacing: var(--tracking-wide);
          text-transform: uppercase; padding: 0.75rem 1.5rem;
          border-radius: var(--radius-sm); text-decoration: none;
          transition: background var(--transition-fast);
          height: 44px;
        }
        .btn-primary:hover { background: var(--cq-teal-hover); }
      `}</style>

      <CQHeader />
      <main>
        {/* Sticky Horizontal Scroll experience encapsulates the hero, selected projects, and outcomes */}
        <HorizontalScrollCaseStudies projects={projects} />

        {/* Process teaser */}
        <section className="wk-process">
          <div className="wk-process-inner">
            <div>
              <div className="section-label">
                <span className="section-label-line" />
                <span className="section-label-text">How We Work</span>
              </div>
              <h2 className="wk-process-h2" data-cursor="text">Every Project Follows a Proven Process</h2>
              <p className="wk-process-desc" data-cursor="text">
                From the first call to the final file, each project is guided by
                our 6-step framework — so nothing falls through the cracks.
              </p>
              <Link href="/contact" className="btn-primary" data-cursor="button">Start Your Project</Link>
            </div>
            <div className="wk-steps">
              {["Voice Audit", "Connect", "Understand", "Strategize", "Deliver", "Refine"].map((step, i) => (
                <div key={step} className="wk-step" data-cursor="card">
                  <div className="wk-step-num">0{i + 1}</div>
                  <div className="wk-step-title">{step}</div>
                  <div className="wk-step-desc">
                    {["Study your brand voice", "Intro call", "Audience deep-dive", "Content roadmap", "48h delivery", "Revise to perfection"][i]}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="wk-cta">
          <h2 className="wk-cta-h2" data-cursor="text">Ready to Be Our Next Success Story?</h2>
          <p className="wk-cta-desc" data-cursor="text">
            Tell us about your project. We&apos;ll tell you exactly how we can make it better.
          </p>
          <div className="wk-cta-actions">
            <Link href="/contact" className="btn-light" data-cursor="button">Start Your Project</Link>
            <Link href="/services" className="btn-ghost" data-cursor="button">Browse Services</Link>
          </div>
        </section>
      </main>
      <CQFooter />
    </>
  );
}
