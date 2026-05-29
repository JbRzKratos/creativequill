import Link from "next/link";
import CQHeader from "@/components/cq-header";
import CQFooter from "@/components/cq-footer";
import PageHero from "@/components/sections/PageHero";
import { ContentAuditCard } from "@/components/effects/HomeComponents";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Work | Creative Quill",
  description: "See how Creative Quill has helped brands like Tiger Safari Tours India and BeeOnline Communications establish authority through strategy-driven content.",
  alternates: { canonical: "https://creativequill.co.in/works" },
  openGraph: {
    title: "Our Work — Case Studies | Creative Quill",
    description: "Real content strategies, real results. See how we've helped brands build authority and reach their audience.",
    url: "https://creativequill.co.in/works",
    images: [{ url: "/og-works.png", width: 1200, height: 630, alt: "Creative Quill Works" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Work — Case Studies | Creative Quill",
    images: ["/og-works.png"],
  },
};

const worksJsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "Our Work — Creative Quill Case Studies",
  "url": "https://creativequill.co.in/works",
  "description": "Case studies and portfolio showcasing Creative Quill's content writing projects.",
  "publisher": {
    "@type": "Organization",
    "name": "Creative Quill",
    "url": "https://creativequill.co.in"
  }
};

const projects = [
  {
    id: "tiger-safari",
    label: "Blog Series",
    title: "Tiger Safari Tours India",
    subtitle: "Wildlife Tourism Content Strategy",
    desc: "A comprehensive blog series crafted for a wildlife tourism brand entering a competitive travel market. We developed a content strategy rooted in authentic storytelling — capturing the raw, sensory experience of India's tiger reserves rather than generic itinerary copy.",
    outcome: "Helped the client establish topical authority in wildlife tourism, driving high-intent travellers planning safari experiences.",
    tags: ["Wildlife Tourism", "Blog Series", "SEO Strategy", "Brand Voice"],
    deliverables: ["8-part blog series", "Keyword mapping", "Content calendar", "Meta copy"],
    img: "https://images.unsplash.com/photo-1561731216-c3a4d99437d5?q=80&w=900&auto=format&fit=crop",
  },
  {
    id: "beeonline",
    label: "SEO Strategy",
    title: "BeeOnline Communications",
    subtitle: "Comprehensive SEO Content Strategy",
    desc: "BeeOnline needed more than just well-written pages — they needed a cohesive content architecture that could compete against established players in the B2B communications space.",
    outcome: "Delivered a full SEO content strategy including topic cluster maps, pillar page frameworks, and layout-optimized web copywriting.",
    tags: ["B2B Communications", "SEO Content", "Pillar Pages", "Topic Clusters"],
    deliverables: ["Topic cluster map", "5 pillar pages", "On-page copy", "SEO audit"],
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=900&auto=format&fit=crop",
  },
];

export default function WorksPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(worksJsonLd) }}
      />
      <style>{`
        body { background: var(--cq-cream); }


        .wk-metrics-strip {
          background: var(--cq-parchment-mid);
          border-bottom: 1px solid var(--cq-linen);
          padding: 1.25rem 0;
        }

        .wk-grid-section {
          background: var(--cq-cream);
          padding: var(--section-py-md) var(--space-6);
        }

        .wk-grid {
          max-width: var(--max-width-content);
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr;
          gap: 24px;
        }
        @media (min-width: 1024px) {
          .wk-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        .wk-card {
          background: var(--cq-parchment);
          border: 1px solid var(--cq-linen);
          border-radius: var(--radius-xl);
          overflow: hidden;
          transition: all 250ms ease;
          display: flex;
          flex-direction: column;
        }
        .wk-card:hover {
          box-shadow: var(--shadow-md);
          border-color: var(--cq-linen) !important;
          transform: translateY(-2px);
        }

        .wk-card-img-wrap {
          width: 100%;
          aspect-ratio: 16/9;
          overflow: hidden;
          border-bottom: 1px solid var(--cq-linen);
          background: var(--cq-parchment-deep);
        }

        .wk-card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: grayscale(100%);
          transition: filter 400ms ease;
        }
        .wk-card:hover .wk-card-img {
          filter: grayscale(0%);
        }

        .wk-card-content {
          padding: 24px;
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .wk-cta {
          background: var(--cq-night);
          padding: var(--section-py-md) var(--space-6);
          text-align: center;
          border-top: 1px solid var(--cq-night-border);
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
      `}</style>

      <CQHeader />
      <main>
        {/* Reusable PageHero component */}
        <PageHero
          label="PORTFOLIO"
          title={<>Stories <em>We&apos;ve Crafted,</em><br/>Results We&apos;ve Delivered</>}
          subtitle="Every project is a collaboration. Here&apos;s a look at some of the work we&apos;re proud to have been part of."
          breadcrumb={[{ name: "Home", path: "/" }, { name: "Works", path: "/works" }]}
          illustration="works"
        />

        {/* Top metrics strip */}
        <div className="wk-metrics-strip">
          <div className="container-content flex justify-center items-center gap-6 sm:gap-12 flex-wrap text-xs text-[var(--cq-ink-muted)] uppercase tracking-wider font-semibold">
            <span>2 Featured Projects</span>
            <span className="text-[var(--cq-linen)]">|</span>
            <span>2 Industries</span>
            <span className="text-[var(--cq-linen)]">|</span>
            <span>100% Results Delivered</span>
          </div>
        </div>

        {/* Grid Case Studies */}
        <section className="wk-grid-section">
          <div className="wk-grid">
            {projects.map((project) => (
              <div key={project.id} className="wk-card">
                <div className="wk-card-img-wrap">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={project.img}
                    alt={project.title}
                    className="wk-card-img"
                  />
                </div>
                
                <div className="wk-card-content">
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="badge-tag">{project.label}</span>
                  </div>
                  
                  <span className="text-[10px] font-semibold text-[var(--cq-ink-muted)] uppercase tracking-wider">
                    {project.subtitle}
                  </span>
                  
                  <h3 className="font-display text-2xl text-[var(--cq-ink)] font-normal mt-1 mb-3">
                    {project.title}
                  </h3>
                  
                  <p className="text-xs text-[var(--cq-ink-mid)] font-light leading-relaxed mb-4 flex-1">
                    {project.desc}
                  </p>

                  <div className="border-l-2 border-[var(--cq-forest)] pl-4 py-1.5 my-3 bg-[var(--cq-parchment-mid)] rounded-r-md">
                    <span className="text-[8px] font-semibold uppercase tracking-wider text-[var(--cq-forest)] block mb-0.5">
                      Outcome
                    </span>
                    <p className="text-xs italic text-[var(--cq-ink-mid)] font-light leading-relaxed">
                      {project.outcome}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mt-2 mb-4">
                    {project.tags.map((tag) => (
                      <span key={tag} className="badge-tag text-[9px] py-0.5 px-2">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex justify-between items-center mt-auto pt-4 border-t border-[rgba(22,18,14,0.05)]">
                    <Link 
                      href={`/contact?project=${project.id}`} 
                      className="text-xs font-semibold text-[var(--cq-forest)] hover:text-[var(--cq-forest-hover)] transition-colors inline-flex items-center gap-1 group"
                    >
                      Start Similar Project <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
                    </Link>
                    <span className="text-[9px] text-[var(--cq-ink-faint)]">
                      Deliverables: {project.deliverables.length} Items
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
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
