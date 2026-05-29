import CQHeader from "@/components/cq-header";
import CQFooter from "@/components/cq-footer";
import type { Metadata } from "next";
import { PullQuote, ProcessTimeline } from "./aboutClient";
import PageHero from "@/components/sections/PageHero";
import { ContentAuditCard } from "@/components/effects/HomeComponents";

export const metadata: Metadata = {
  title: "About Us | Creative Quill — The Story Behind the Words",
  description: "Learn about Creative Quill's founding story, our philosophy, and the values that drive every piece of content we create.",
};

const values = [
  {
    icon: "✦",
    title: "Quality Without Compromise",
    desc: "We never ship content we wouldn't be proud to put our name on. Every piece goes through research, writing, editing, and SEO review before it reaches you.",
  },
  {
    icon: "◈",
    title: "Built for Everyone Starting Out",
    desc: "Most premium agencies gate their best work behind enterprise-level pricing. We built Creative Quill to give growing businesses access to strategy-driven content from day one.",
  },
  {
    icon: "◎",
    title: "Your Growth Partner",
    desc: "We don't just deliver files. We track what's working, suggest new directions, and evolve with your brand. Think of us as your dedicated content team, not a vendor.",
  },
];

const steps = [
  { num: "1", title: "Voice Audit", desc: "Before we write anything, we study your existing content, competitors, and audience tone. So our first draft already sounds like you, not like us." },
  { num: "2", title: "Connect", desc: "Discover your story through our contact form, email, or phone for an initial discovery call. We'll explore your brand narrative, business objectives, and audience challenges." },
  { num: "3", title: "Understand", desc: "We immerse ourselves in your brand world — analyzing target audiences, competitive positioning, voice guidelines, and content goals. Deep discovery ensures every word aligns with your strategic vision." },
  { num: "4", title: "Strategize", desc: "Our strategists develop a tailored content roadmap with narrative frameworks, topic clusters, and tonal architecture designed to captivate your audience and amplify your message." },
  { num: "5", title: "Deliver", desc: "Receive publication-ready content within 48 hours, professionally written, thoroughly researched, and polished to perfection. Every piece is optimized for engagement and ready to publish." },
  { num: "6", title: "Refine", desc: "Your satisfaction drives our process. We offer multiple revision rounds to fine-tune content until it perfectly captures your vision and exceeds your expectations." },
];

const philosophyPillars = [
  {
    num: "01",
    title: "Strategy First",
    body: "We never write a single word without understanding where it fits in your customer journey and what business outcome it is designed to drive."
  },
  {
    num: "02",
    title: "Human, Always",
    body: "AI content is forgettable. We write with humor, empathy, and deep industry knowledge that algorithm-based models simply cannot replicate."
  },
  {
    num: "03",
    title: "Results, Not Just Words",
    body: "We measure success by engagement rates, rankings, and conversions — not by page counts or arbitrary word quotas."
  }
];

const dontDoItems = [
  "AI-generated content passed off as human",
  "Template writing with swapped keywords",
  "Volume discounts that compromise quality",
  "Content writing without a strategy behind it"
];

export default function AboutPage() {
  return (
    <>
      <style>{`
        body { background: var(--cq-cream); }

        /* STORY */
        .ab-story {
          background: var(--cq-cream);
          padding: var(--section-py-md) var(--space-6);
        }
        .ab-story-inner {
          max-width: var(--max-width-content); margin: 0 auto;
          display: grid; gap: var(--space-8);
          grid-template-columns: 1fr 1fr;
          align-items: center;
        }
        @media (max-width: 767px) { .ab-story-inner { grid-template-columns: 1fr; } }
        .ab-story-img {
          position: relative;
        }
        .ab-story-img img {
          width: 100%; border-radius: var(--radius-xl);
          filter: grayscale(1) contrast(1.1);
          box-shadow: var(--shadow-lg);
          display: block;
        }
        .ab-story-badge {
          position: absolute; bottom: -0.5rem; right: 0.5rem;
          background: var(--cq-forest); color: var(--cq-parchment);
          padding: 0.75rem 1rem; border-radius: var(--radius-md);
          text-align: center; box-shadow: var(--shadow-md);
        }
        @media (min-width: 768px) {
          .ab-story-badge {
            bottom: -1rem;
            right: -1rem;
            padding: 0.85rem 1.15rem;
          }
        }
        .ab-story-badge-num {
          display: block; font-family: var(--font-display);
          font-size: 1.85rem; line-height: 1; margin-bottom: 0.15rem;
        }
        .ab-story-badge-label {
          display: block; font-family: var(--font-body);
          font-size: 0.62rem; font-weight: 500;
          letter-spacing: var(--tracking-wider); text-transform: uppercase; opacity: 0.9;
        }
        .ab-story-h2 {
          font-family: var(--font-display);
          font-size: clamp(2rem, 5vw, 3rem);
          color: var(--cq-ink); margin: 0 0 1.25rem; line-height: var(--leading-heading);
          letter-spacing: var(--tracking-tight);
        }
        .ab-story-p {
          font-family: var(--font-body);
          font-size: 0.875rem; font-weight: 300; color: var(--cq-ink-mid);
          line-height: var(--leading-body); margin: 0 0 1rem;
        }

        /* MANIFESTO */
        .ab-manifesto {
          background: var(--cq-night);
          padding: var(--section-py-md) var(--space-6);
          position: relative;
          overflow: hidden;
        }
        .ab-manifesto-inner {
          max-width: 800px;
          margin: 0 auto;
          text-align: center;
          position: relative;
          z-index: 2;
        }
        .ab-manifesto-quote {
          font-family: var(--font-display);
          font-style: italic;
          font-size: clamp(1.5rem, 4vw, 2.5rem);
          line-height: 1.35;
          color: var(--cq-parchment);
          text-wrap: balance;
        }

        /* IMPACT NUMBERS */
        .ab-impact {
          background: var(--cq-parchment-mid);
          padding: var(--section-py-md) var(--space-6);
          border-bottom: 1px solid var(--cq-linen);
        }
        .ab-impact-grid {
          max-width: var(--max-width-content);
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: var(--space-6);
        }
        @media (min-width: 768px) {
          .ab-impact-grid {
            grid-template-columns: repeat(4, 1fr);
          }
        }
        .ab-impact-card {
          text-align: center;
          padding: var(--space-4);
        }
        .ab-impact-num {
          font-family: var(--font-body);
          font-weight: 500;
          font-size: clamp(2.5rem, 5vw, 4rem);
          line-height: 1;
          color: var(--cq-ink);
          margin-bottom: 0.5rem;
        }
        .ab-impact-label {
          font-family: var(--font-body);
          font-size: 0.6875rem;
          font-weight: 500;
          letter-spacing: var(--tracking-wider);
          text-transform: uppercase;
          color: var(--cq-ink-muted);
        }

        /* VALUES */
        .ab-values {
          background: var(--cq-cream-mid);
          padding: var(--section-py-md) var(--space-6);
          border-top: 1px solid var(--cq-cream-dark);
          border-bottom: 1px solid var(--cq-cream-dark);
        }
        .ab-values-inner { max-width: var(--max-width-content); margin: 0 auto; }
        .ab-values-header { text-align: center; margin-bottom: 3rem; }
        .ab-values-h2 {
          font-family: var(--font-display);
          font-size: clamp(2rem, 5vw, 3rem);
          color: var(--cq-ink); margin: 0 0 1rem; line-height: var(--leading-heading);
          letter-spacing: var(--tracking-tight);
        }
        .ab-values-desc {
          font-family: var(--font-body);
          font-size: 0.95rem; font-weight: 300; color: var(--cq-ink-mid);
          max-width: 32rem; margin: 0 auto; line-height: var(--leading-body);
        }
        .ab-values-grid {
          display: grid; gap: var(--space-4);
          grid-template-columns: 1fr;
        }
        @media (min-width: 640px) {
          .ab-values-grid {
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }
        }
        .ab-value-card {
          background: var(--cq-cream);
          border: 1px solid var(--cq-cream-dark);
          border-radius: var(--radius-lg);
          padding: var(--space-6);
          transition: box-shadow var(--transition-base);
        }
        .ab-value-card:hover {
          box-shadow: var(--shadow-md);
        }
        .ab-value-icon {
          font-size: 1.5rem; margin-bottom: 1rem;
          color: var(--cq-forest);
        }
        .ab-value-title {
          font-family: var(--font-body);
          font-size: 1rem; font-weight: 600;
          color: var(--cq-ink); margin: 0 0 0.5rem;
        }
        .ab-value-desc {
          font-family: var(--font-body);
          font-size: 0.875rem; font-weight: 300; color: var(--cq-ink-muted);
          line-height: var(--leading-tight); margin: 0;
        }

        /* DON'T DO */
        .ab-dont {
          background: var(--cq-parchment-mid);
          padding: var(--section-py-md) var(--space-6);
          border-top: 1px solid var(--cq-linen);
          border-bottom: 1px solid var(--cq-linen);
        }
        .ab-dont-inner {
          max-width: var(--max-width-narrow);
          margin: 0 auto;
        }
        .ab-dont-row {
          display: flex;
          align-items: center;
          gap: 16px;
          border-bottom: 1px solid var(--cq-linen);
          padding: 16px 0;
        }
        .ab-dont-row:last-child {
          border-bottom: none;
        }
        .ab-dont-cross {
          color: #B91C1C;
          font-weight: bold;
          font-size: 1.1rem;
        }

        /* CTA */
        .ab-cta {
          background: var(--cq-night);
          padding: var(--section-py-md) var(--space-6); text-align: center;
          border-top: 1px solid var(--cq-night-border);
        }
        .ab-cta-h2 {
          font-family: var(--font-display);
          font-size: clamp(2rem, 5vw, 3rem);
          color: var(--cq-cream);
          margin: 0 0 1rem; line-height: var(--leading-heading);
          letter-spacing: var(--tracking-tight);
        }
        .ab-cta-desc {
          font-family: var(--font-body);
          font-size: 0.95rem; font-weight: 300;
          color: var(--cq-ink-faint);
          max-width: 32rem; margin: 0 auto 2rem; line-height: var(--leading-body);
        }
        .ab-cta-actions {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.75rem;
          width: 100%;
        }
        @media (min-width: 640px) {
          .ab-cta-actions {
            flex-direction: row;
            justify-content: center;
            gap: 1rem;
            width: auto;
          }
        }
        .ab-cta-actions .btn-light,
        .ab-cta-actions .btn-ghost {
          width: 100%;
          text-align: center;
          height: 44px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }
        @media (min-width: 640px) {
          .ab-cta-actions .btn-light,
          .ab-cta-actions .btn-ghost {
            width: auto;
          }
        }
        .ab-cta-actions .btn-ghost {
          color: var(--cq-cream);
          border-color: var(--cq-night-border);
        }
        .ab-cta-actions .btn-ghost:hover {
          border-color: var(--cq-cream);
          background: rgba(255, 255, 255, 0.05);
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
          background: transparent; color: var(--cq-ink);
          font-size: 0.75rem; font-weight: 500; letter-spacing: var(--tracking-wide);
          text-transform: uppercase; padding: 0.75rem 1.5rem;
          border-radius: var(--radius-sm); text-decoration: none;
          border: 1px solid var(--cq-beige);
          transition: border-color var(--transition-fast), background var(--transition-fast);
        }
        .btn-ghost:hover {
          border-color: var(--cq-ink);
        }
      `}</style>

      <CQHeader />
      <main>
        {/* Reusable PageHero component */}
        <PageHero
          label="OUR STORY"
          title={
            <>
              We&apos;re Not a Content Mill.<br />
              <em>We&apos;re Your Creative Partners.</em>
            </>
          }
          subtitle="Founded in 2024, Creative Quill was built on a simple belief: brilliant businesses deserve content that actually sounds like them — not like everyone else."
          breadcrumb={[{ name: "Home", path: "/" }, { name: "About", path: "/about" }]}
          illustration="about"
        />

        {/* Origin Story */}
        <section className="ab-story">
          <div className="ab-story-inner">
            <div className="ab-story-img" data-cursor="card">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1519682337058-a94d519337bc?q=80&w=800&auto=format&fit=crop"
                alt="Writing at desk"
              />
              <div className="ab-story-badge">
                <span className="ab-story-badge-num">2024</span>
                <span className="ab-story-badge-label">Founded</span>
              </div>
            </div>
            <div>
              <div className="flex flex-col gap-2 mb-6">
                <span className="badge-label">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                  How It Started
                </span>
              </div>
              <h2 className="ab-story-h2" data-cursor="text">
                Watching brilliant businesses fail with bland content — that&apos;s what started all this.
              </h2>
              <p className="ab-story-p" data-cursor="text">
                In 2024, we watched brilliant businesses get drowned out online —
                not because their product was weak, but because their content had no real voice.
                Blog posts written by AI. Website copy that could belong to anyone.
                Social media that felt like it was checking a box.
              </p>
              <p className="ab-story-p" data-cursor="text">
                Creative Quill was built to fix that. We are not here to crank out
                copy by the pound. We are here to figure out what makes your brand
                genuinely different and then write in a way that makes your audience
                feel it.
              </p>
              <p className="ab-story-p" data-cursor="text">
                Every piece of content we create is rooted in real strategy —
                not templates, not volume, not AI shortcuts. Just thoughtful,
                original writing that sounds unmistakably like you.
              </p>
            </div>
          </div>
        </section>

        {/* NEW SECTION A: Brand Manifesto */}
        <section className="ab-manifesto">
          <div className="ab-manifesto-inner flex flex-col items-center gap-6">
            <span className="font-display text-8xl text-[var(--cq-forest)] opacity-20 select-none leading-none">&ldquo;</span>
            <p className="ab-manifesto-quote">
              We didn&apos;t start Creative Quill to add more noise to the internet. We started it because brilliant brands deserve writing that sounds like them — not like everyone else.
            </p>
          </div>
        </section>

        {/* NEW SECTION B: Impact Numbers */}
        <section className="ab-impact">
          <div className="ab-impact-grid">
            <div className="ab-impact-card">
              <div className="ab-impact-num">500K+</div>
              <div className="ab-impact-label">Words Written</div>
            </div>
            <div className="ab-impact-card">
              <div className="ab-impact-num">50+</div>
              <div className="ab-impact-label">Projects Completed</div>
            </div>
            <div className="ab-impact-card">
              <div className="ab-impact-num">4.9★</div>
              <div className="ab-impact-label">Average Rating</div>
            </div>
            <div className="ab-impact-card">
              <div className="ab-impact-num">2024</div>
              <div className="ab-impact-label">Year Founded</div>
            </div>
          </div>
        </section>

        {/* NEW SECTION C: Content Philosophy Principles */}
        <section className="section-md bg-[var(--cq-parchment)]">
          <div className="container-content">
            <div className="flex flex-col gap-2 mb-10 text-center">
              <span className="badge-label self-center">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A5 5 0 0 0 8 8c0 1 .3 2.5 1 3.5l.5 1" />
                  <path d="M9 18h6" />
                  <path d="M10 22h4" />
                </svg>
                PHILOSOPHY
              </span>
              <h2 className="font-display text-4xl text-[var(--cq-ink)] font-normal">
                Our Content Principles
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {philosophyPillars.map((pillar) => (
                <div 
                  key={pillar.num} 
                  className="bg-[var(--cq-parchment)] border border-[var(--cq-linen)] rounded-[var(--radius-xl)] p-8 flex flex-col justify-between relative overflow-hidden transition-all duration-300 hover:shadow-md"
                >
                  <span className="font-sans font-semibold text-6xl text-[var(--cq-parchment-deep)] select-none opacity-80 mb-4 block leading-none">
                    {pillar.num}
                  </span>
                  <div>
                    <h3 className="font-display text-2xl text-[var(--cq-ink)] font-normal mb-3 leading-none">
                      {pillar.title}
                    </h3>
                    <p className="text-sm text-[var(--cq-ink-mid)] font-light leading-relaxed">
                      {pillar.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* NEW SECTION D: What We DON'T Do */}
        <section className="ab-dont">
          <div className="ab-dont-inner">
            <div className="flex flex-col gap-2 mb-8 text-center">
              <span className="badge-label self-center" style={{ color: "#B91C1C", borderColor: "rgba(185,28,28,0.2)" }}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: "#B91C1C" }}>
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                OUR CODE
              </span>
              <h2 className="font-display text-3xl text-[var(--cq-ink)] font-normal">
                We Proudly Don&apos;t Do These Things
              </h2>
            </div>

            <div className="bg-[var(--cq-parchment)] border border-[var(--cq-linen)] rounded-[var(--radius-xl)] p-6 sm:p-8 flex flex-col">
              {dontDoItems.map((item, idx) => (
                <div key={idx} className="ab-dont-row">
                  <span className="ab-dont-cross">✗</span>
                  <span className="text-sm text-[var(--cq-ink-mid)] font-body font-light">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Viewport Pull Quote (kept for context) */}
        <div style={{ background: "var(--background)", padding: "1rem 0" }}>
          <PullQuote />
        </div>

        {/* Values */}
        <section className="ab-values">
          <div className="ab-values-inner">
            <div className="ab-values-header">
              <div className="flex flex-col gap-2 mb-4 text-center">
                <span className="badge-label self-center">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                  </svg>
                  What We Stand For
                </span>
              </div>
              <h2 className="ab-values-h2" data-cursor="text">Our Core Values</h2>
              <p className="ab-values-desc" data-cursor="text">
                These aren&apos;t values we put on a wall. They&apos;re the decisions we make
                on every project, with every client.
              </p>
            </div>
            <div className="ab-values-grid">
              {values.map((v) => (
                <div key={v.title} className="ab-value-card" data-cursor="card">
                  <div className="ab-value-icon">{v.icon}</div>
                  <h3 className="ab-value-title">{v.title}</h3>
                  <p className="ab-value-desc">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Snap-scroll Timeline */}
        <section className="section-md" style={{ background: "var(--background)", paddingLeft: "1.5rem", paddingRight: "1.5rem", borderTop: "1px solid var(--border)" }}>
          <div className="ab-team-inner" style={{ maxWidth: "72rem", margin: "0 auto" }}>
            <div className="ab-team-header" style={{ textAlign: "center", marginBottom: "3rem" }}>
              <div className="flex flex-col gap-2 mb-4 text-center">
                <span className="badge-label self-center">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
                  </svg>
                  Our Process
                </span>
              </div>
              <h2 className="font-display text-4xl md:text-5xl text-[var(--cq-ink)] tracking-tight font-normal" data-cursor="text">How We Work</h2>
              <p className="ab-team-desc" data-cursor="text">
                From the first call to the final file, each project is guided by our 6-step framework.
              </p>
            </div>
            <ProcessTimeline steps={steps} />
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
