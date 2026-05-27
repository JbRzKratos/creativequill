import Link from "next/link";
import CQHeader from "@/components/cq-header";
import CQFooter from "@/components/cq-footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Creative Quill — The Story Behind the Words",
  description: "Learn about Creative Quill's founding story, our team of writers and strategists, and the values that drive every piece of content we create.",
};

const team = [
  {
    name: "Sania",
    role: "Founder & Lead Strategist Writer",
    bio: "The visionary behind Creative Quill. Sania built this studio after watching brilliant businesses get ignored online because their content had no real voice. She obsesses over brand strategy and narrative architecture.",
    img: "/Sania.png",
    fallback: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=400&auto=format&fit=crop",
  },
  {
    name: "Prasath",
    role: "Full Stack Developer",
    bio: "Prasath keeps Creative Quill's digital presence sharp, fast, and reliable. He bridges the gap between beautiful writing and beautiful technology.",
    img: "/Prasath.png",
    fallback: "https://images.unsplash.com/photo-1548142813-c348350df52b?q=80&w=400&auto=format&fit=crop",
  },
  {
    name: "Saiyyada",
    role: "Lead Content Editor",
    bio: "Saiyyada is the final eye on everything we publish. With a sharp editorial instinct, she ensures every piece is polished, precise, and unmistakably on-brand.",
    img: "/Saiyyada.jpeg",
    fallback: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?q=80&w=400&auto=format&fit=crop",
  },
  {
    name: "Huma",
    role: "Lead SEO Strategist",
    bio: "Huma makes sure great content gets found. She builds the keyword strategy and technical SEO foundation that puts Creative Quill's work in front of the right audiences.",
    img: "/Huma.jpeg",
    fallback: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?q=80&w=400&auto=format&fit=crop",
  },
];

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

export default function AboutPage() {
  return (
    <>
      <style>{`
        body { background: var(--muted); }

        /* HERO */
        .ab-hero {
          background: var(--primary);
          padding: 5.5rem 1.5rem;
          text-align: center;
        }
        .ab-hero-eyebrow {
          display: inline-block;
          font-size: 0.68rem; font-weight: 700;
          letter-spacing: 0.2em; text-transform: uppercase;
          color: color-mix(in oklch, var(--primary-foreground) 65%, transparent);
          margin-bottom: 1rem;
        }
        .ab-hero-h1 {
          font-family: var(--font-serif);
          font-size: clamp(2rem, 5vw, 3rem);
          color: var(--primary-foreground);
          margin: 0 0 1.25rem; line-height: 1.15;
        }
        .ab-hero-desc {
          font-size: 1rem; line-height: 1.8;
          color: color-mix(in oklch, var(--primary-foreground) 72%, transparent);
          max-width: 36rem; margin: 0 auto 2rem;
        }
        .ab-hero-actions { display: flex; justify-content: center; flex-wrap: wrap; gap: 1rem; }
        .btn-light {
          display: inline-block;
          background: var(--primary-foreground); color: var(--primary);
          font-size: 0.7rem; font-weight: 700; letter-spacing: 0.15em;
          text-transform: uppercase; padding: 0.9rem 2rem;
          border-radius: var(--radius-sm); text-decoration: none;
          transition: opacity 0.2s;
        }
        .btn-light:hover { opacity: 0.88; }
        .btn-ghost {
          display: inline-block;
          background: transparent; color: var(--primary-foreground);
          font-size: 0.7rem; font-weight: 700; letter-spacing: 0.15em;
          text-transform: uppercase; padding: 0.9rem 2rem;
          border-radius: var(--radius-sm); text-decoration: none;
          border: 1px solid color-mix(in oklch, var(--primary-foreground) 35%, transparent);
          transition: background 0.2s;
        }
        .btn-ghost:hover {
          background: color-mix(in oklch, var(--primary-foreground) 10%, transparent);
        }

        /* STORY */
        .ab-story {
          background: var(--background);
          padding: 5rem 1.5rem;
        }
        .ab-story-inner {
          max-width: 72rem; margin: 0 auto;
          display: grid; gap: 4rem;
          grid-template-columns: 1fr 1fr;
          align-items: center;
        }
        @media (max-width: 800px) { .ab-story-inner { grid-template-columns: 1fr; } }
        .ab-story-img {
          position: relative;
        }
        .ab-story-img img {
          width: 100%; border-radius: var(--radius-lg);
          filter: grayscale(1) contrast(1.1);
          box-shadow: 0 24px 60px color-mix(in oklch, var(--foreground) 18%, transparent);
          display: block;
        }
        .ab-story-badge {
          position: absolute; bottom: -1rem; right: -1rem;
          background: var(--primary); color: var(--primary-foreground);
          padding: 1rem 1.25rem; border-radius: var(--radius-md);
          text-align: center; box-shadow: 0 8px 24px color-mix(in oklch, var(--primary) 40%, transparent);
        }
        .ab-story-badge-num {
          display: block; font-family: var(--font-serif);
          font-size: 1.85rem; line-height: 1; margin-bottom: 0.15rem;
        }
        .ab-story-badge-label {
          display: block; font-size: 0.62rem; font-weight: 600;
          letter-spacing: 0.12em; text-transform: uppercase; opacity: 0.8;
        }
        .section-label {
          display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1.25rem;
        }
        .section-label-line { width: 2rem; height: 1px; background: var(--border); }
        .section-label-text {
          font-size: 0.7rem; font-weight: 500; letter-spacing: 0.15em;
          text-transform: uppercase; color: var(--muted-foreground);
        }
        .ab-story-h2 {
          font-family: var(--font-serif);
          font-size: clamp(1.75rem, 3.5vw, 2.35rem);
          color: var(--foreground); margin: 0 0 1.25rem; line-height: 1.2;
        }
        .ab-story-p {
          font-size: 0.875rem; color: var(--muted-foreground);
          line-height: 1.85; margin: 0 0 1rem;
        }

        /* VALUES */
        .ab-values {
          background: var(--muted);
          padding: 4.5rem 1.5rem;
          border-top: 1px solid var(--border);
        }
        .ab-values-inner { max-width: 72rem; margin: 0 auto; }
        .ab-values-header { text-align: center; margin-bottom: 3rem; }
        .ab-values-h2 {
          font-family: var(--font-serif);
          font-size: clamp(1.65rem, 3.5vw, 2.25rem);
          color: var(--foreground); margin: 0 0 0.75rem;
        }
        .ab-values-desc {
          font-size: 0.875rem; color: var(--muted-foreground);
          max-width: 32rem; margin: 0 auto; line-height: 1.75;
        }
        .ab-values-grid {
          display: grid; gap: 1.5rem;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
        }
        .ab-value-card {
          background: var(--background);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: 2rem;
          transition: box-shadow 0.2s;
        }
        .ab-value-card:hover {
          box-shadow: 0 8px 32px color-mix(in oklch, var(--foreground) 8%, transparent);
        }
        .ab-value-icon {
          font-size: 1.5rem; margin-bottom: 1rem;
          color: var(--primary);
        }
        .ab-value-title {
          font-size: 0.95rem; font-weight: 600;
          color: var(--foreground); margin: 0 0 0.5rem;
        }
        .ab-value-desc {
          font-size: 0.8rem; color: var(--muted-foreground);
          line-height: 1.75; margin: 0;
        }

        /* TEAM */
        .ab-team {
          background: var(--background);
          padding: 5rem 1.5rem;
          border-top: 1px solid var(--border);
        }
        .ab-team-inner { max-width: 72rem; margin: 0 auto; }
        .ab-team-header { text-align: center; margin-bottom: 3rem; }
        .ab-team-h2 {
          font-family: var(--font-serif);
          font-size: clamp(1.65rem, 3.5vw, 2.25rem);
          color: var(--foreground); margin: 0 0 0.75rem;
        }
        .ab-team-desc {
          font-size: 0.875rem; color: var(--muted-foreground);
          max-width: 32rem; margin: 0 auto; line-height: 1.75;
        }
        .ab-team-grid {
          display: grid; gap: 1.5rem;
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
        }
        .ab-member {
          border: 1px solid var(--border);
          background: var(--card);
          border-radius: var(--radius-lg);
          overflow: hidden;
          transition: box-shadow 0.2s;
        }
        .ab-member:hover {
          box-shadow: 0 12px 36px color-mix(in oklch, var(--foreground) 12%, transparent);
        }
        .ab-member-img-wrap {
          width: 100%; aspect-ratio: 4/4.5; overflow: hidden;
          background: var(--secondary);
        }
        .ab-member-img {
          width: 100%; height: 100%;
          object-fit: cover; object-position: top;
          filter: grayscale(1) contrast(1.1);
        }
        .ab-member-info { padding: 1.25rem; }
        .ab-member-name {
          font-family: var(--font-serif);
          font-size: 1.05rem; color: var(--foreground);
          margin: 0 0 0.2rem;
        }
        .ab-member-role {
          font-size: 0.68rem; font-weight: 600;
          letter-spacing: 0.12em; text-transform: uppercase;
          color: var(--primary); margin: 0 0 0.75rem;
        }
        .ab-member-bio {
          font-size: 0.78rem; color: var(--muted-foreground);
          line-height: 1.7; margin: 0;
        }

        /* CTA */
        .ab-cta {
          background: var(--primary);
          padding: 4.5rem 1.5rem; text-align: center;
        }
        .ab-cta-h2 {
          font-family: var(--font-serif);
          font-size: clamp(1.75rem, 4vw, 2.5rem);
          color: var(--primary-foreground);
          margin: 0 0 0.75rem;
        }
        .ab-cta-desc {
          font-size: 0.9rem;
          color: color-mix(in oklch, var(--primary-foreground) 70%, transparent);
          max-width: 28rem; margin: 0 auto 2rem; line-height: 1.75;
        }
        .ab-cta-actions { display: flex; justify-content: center; flex-wrap: wrap; gap: 1rem; }
      `}</style>

      <CQHeader />
      <main>
        {/* Hero */}
        <section className="ab-hero">
          <span className="ab-hero-eyebrow">Our Story</span>
          <h1 className="ab-hero-h1">
            We&apos;re Not a Content Mill.<br />
            <em>We&apos;re Your Creative Partners.</em>
          </h1>
          <p className="ab-hero-desc">
            Founded in 2024, Creative Quill was built on a simple belief: brilliant
            businesses deserve content that actually sounds like them — not like everyone else.
          </p>
          <div className="ab-hero-actions">
            <Link href="/services" className="btn-light">See Our Services</Link>
            <Link href="/contact" className="btn-ghost">Work With Us</Link>
          </div>
        </section>

        {/* Origin Story */}
        <section className="ab-story">
          <div className="ab-story-inner">
            <div className="ab-story-img">
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
              <div className="section-label">
                <span className="section-label-line" />
                <span className="section-label-text">How It Started</span>
              </div>
              <h2 className="ab-story-h2">
                Watching brilliant businesses fail with bland content — that&apos;s what started all this.
              </h2>
              <p className="ab-story-p">
                In 2024, we watched brilliant businesses get drowned out online —
                not because their product was weak, but because their content had no real voice.
                Blog posts written by AI. Website copy that could belong to anyone.
                Social media that felt like it was checking a box.
              </p>
              <p className="ab-story-p">
                Creative Quill was built to fix that. We are not here to crank out
                copy by the pound. We are here to figure out what makes your brand
                genuinely different and then write in a way that makes your audience
                feel it.
              </p>
              <p className="ab-story-p">
                Every piece of content we create is rooted in real strategy —
                not templates, not volume, not AI shortcuts. Just thoughtful,
                original writing that sounds unmistakably like you.
              </p>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="ab-values">
          <div className="ab-values-inner">
            <div className="ab-values-header">
              <div className="section-label" style={{ justifyContent: "center" }}>
                <span className="section-label-line" />
                <span className="section-label-text">What We Stand For</span>
                <span className="section-label-line" />
              </div>
              <h2 className="ab-values-h2">Our Core Values</h2>
              <p className="ab-values-desc">
                These aren&apos;t values we put on a wall. They&apos;re the decisions we make
                on every project, with every client.
              </p>
            </div>
            <div className="ab-values-grid">
              {values.map((v) => (
                <div key={v.title} className="ab-value-card">
                  <div className="ab-value-icon">{v.icon}</div>
                  <h3 className="ab-value-title">{v.title}</h3>
                  <p className="ab-value-desc">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="ab-team">
          <div className="ab-team-inner">
            <div className="ab-team-header">
              <div className="section-label" style={{ justifyContent: "center" }}>
                <span className="section-label-line" />
                <span className="section-label-text">Meet the Team</span>
                <span className="section-label-line" />
              </div>
              <h2 className="ab-team-h2">The People Behind the Words</h2>
              <p className="ab-team-desc">
                A tight-knit team of writers, editors, and strategists who care deeply
                about the work — and the businesses we do it for.
              </p>
            </div>
            <div className="ab-team-grid">
              {team.map((member) => (
                <div key={member.name} className="ab-member">
                  <div className="ab-member-img-wrap">
                    <img
                      src={member.fallback}
                      alt={member.name}
                      className="ab-member-img"
                    />
                  </div>
                  <div className="ab-member-info">
                    <h3 className="ab-member-name">{member.name}</h3>
                    <p className="ab-member-role">{member.role}</p>
                    <p className="ab-member-bio">{member.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="ab-cta">
          <h2 className="ab-cta-h2">Ready to Work With Us?</h2>
          <p className="ab-cta-desc">
            Let&apos;s talk about your brand, your audience, and what kind of content
            would actually make a difference.
          </p>
          <div className="ab-cta-actions">
            <Link href="/contact" className="btn-light">Start a Conversation</Link>
            <Link href="/works" className="btn-ghost">See Our Work</Link>
          </div>
        </section>
      </main>
      <CQFooter />
    </>
  );
}
