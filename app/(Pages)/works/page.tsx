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
        body { background: var(--muted); }

        /* HERO */
        .wk-hero {
          background: var(--background);
          padding: 5rem 1.5rem;
          border-bottom: 1px solid var(--border);
          text-align: center;
        }
        .wk-hero-inner { max-width: 52rem; margin: 0 auto; }
        .wk-hero-badge {
          display: inline-flex; align-items: center; gap: 0.5rem;
          background: color-mix(in oklch, var(--primary) 10%, transparent);
          color: var(--primary); border-radius: 999px;
          padding: 0.35rem 1rem;
          font-size: 0.68rem; font-weight: 600;
          letter-spacing: 0.1em; text-transform: uppercase;
          margin-bottom: 1.25rem;
        }
        .wk-hero-h1 {
          font-family: var(--font-serif);
          font-size: clamp(2rem, 5vw, 3rem);
          color: var(--foreground); margin: 0 0 1rem; line-height: 1.2;
        }
        .wk-hero-desc {
          font-size: 0.95rem; color: var(--muted-foreground);
          line-height: 1.75; max-width: 36rem; margin: 0 auto;
        }

        /* PROCESS TEASER */
        .wk-process {
          background: var(--muted); padding: 4rem 1.5rem;
          border-top: 1px solid var(--border);
        }
        .wk-process-inner {
          max-width: 72rem; margin: 0 auto;
          display: grid; gap: 3rem;
          grid-template-columns: 1fr 2fr;
          align-items: start;
        }
        @media (max-width: 800px) { .wk-process-inner { grid-template-columns: 1fr; } }
        .wk-process-h2 {
          font-family: var(--font-serif);
          font-size: clamp(1.65rem, 3.5vw, 2.25rem);
          color: var(--foreground); margin: 0 0 0.75rem;
        }
        .wk-process-desc {
          font-size: 0.875rem; color: var(--muted-foreground);
          line-height: 1.75; margin: 0 0 1.5rem;
        }
        .wk-steps {
          display: grid; gap: 1rem;
          grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
        }
        .wk-step {
          background: var(--background); border: 1px solid var(--border);
          border-radius: var(--radius-md); padding: 1.25rem;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .wk-step:hover {
          border-color: color-mix(in oklch, var(--primary) 30%, transparent);
          box-shadow: 0 4px 16px color-mix(in oklch, var(--foreground) 6%, transparent);
        }
        .wk-step-num {
          font-size: 1.5rem; font-weight: 700;
          color: color-mix(in oklch, var(--primary) 25%, var(--border));
          line-height: 1; margin-bottom: 0.5rem;
        }
        .wk-step-title {
          font-size: 0.85rem; font-weight: 600; color: var(--foreground); margin-bottom: 0.3rem;
        }
        .wk-step-desc {
          font-size: 0.75rem; color: var(--muted-foreground); line-height: 1.65;
        }

        /* CTA */
        .wk-cta { background: var(--primary); padding: 4.5rem 1.5rem; text-align: center; }
        .wk-cta-h2 {
          font-family: var(--font-serif);
          font-size: clamp(1.75rem, 4vw, 2.5rem);
          color: var(--primary-foreground); margin: 0 0 0.75rem;
        }
        .wk-cta-desc {
          font-size: 0.9rem;
          color: color-mix(in oklch, var(--primary-foreground) 70%, transparent);
          max-width: 28rem; margin: 0 auto 2rem; line-height: 1.75;
        }
        .wk-cta-actions { display: flex; justify-content: center; flex-wrap: wrap; gap: 1rem; }
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
          border: 1px solid color-mix(in oklch, var(--primary-foreground) 35%, transparent);
          transition: background 0.2s;
        }
        .btn-ghost:hover {
          background: color-mix(in oklch, var(--primary-foreground) 10%, transparent);
        }
        .btn-primary {
          display: inline-block; background: var(--primary); color: var(--primary-foreground);
          font-size: 0.7rem; font-weight: 700; letter-spacing: 0.15em;
          text-transform: uppercase; padding: 0.9rem 2rem;
          border-radius: var(--radius-sm); text-decoration: none;
          transition: opacity 0.2s;
        }
        .btn-primary:hover { opacity: 0.85; }
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
