"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CQHeader from "@/components/cq-header";
import CQFooter from "@/components/cq-footer";
import PageHero from "@/components/sections/PageHero";
import { ContentAuditCard } from "@/components/effects/HomeComponents";

export interface ServiceDetail {
  id: string;
  label: string;
  title: React.ReactNode;
  subtitle: string;
  rate: string;
  turnaround: string;
  deliverable: string;
  summaryTitle: string;
  summaryDesc: string;
  features: { title: string; desc: string }[];
  steps: { num: string; title: string; desc: string }[];
  mockupType: "blog" | "article" | "brand" | "website" | "seo" | "custom";
  faqs: { q: string; a: string }[];
}

export const SERVICES_DATA: Record<string, ServiceDetail> = {
  "blog-writing": {
    id: "blog",
    label: "SERVICES / BLOG WRITING",
    title: <>Engaging <em>Blogs</em> That Connect</>,
    subtitle: "Turn readers into loyal customers with highly engaging, researched blog posts tailored to your exact brand tone.",
    rate: "From ₹1.5 / word",
    turnaround: "3–5 business days",
    deliverable: "Word / Google Doc + Meta Info",
    summaryTitle: "Why Blog Writing Matters",
    summaryDesc: "A company blog is your digital storefront. We don't just dump keywords into paragraphs; we craft insightful, entertaining narratives that answer client queries and position you as an expert.",
    features: [
      { title: "Voice-Match Tonal Alignment", desc: "We study your brand guidelines so that every word reads like you wrote it." },
      { title: "SEO Keyword Harmonization", desc: "Naturally integrated search terms that rank without hurting readability." },
      { title: "Meta Title & Description Included", desc: "Every blog comes with optimized tags ready for your CMS." },
      { title: "2 Rounds of Refinements", desc: "Collaborative feedback loops to ensure the final copy is flawless." },
    ],
    steps: [
      { num: "01", title: "Tonal Matching", desc: "We review your brand voice guidelines, competitors, and target audience to align on the perfect narrative posture." },
      { num: "02", title: "Drafting & Fact-Checking", desc: "Our writers build the article structure, verify citations, and integrate keywords naturally." },
      { num: "03", title: "CMS-Ready Delivery", desc: "Receive your clean copy, custom meta tags, and internal link suggestions, ready for immediate publication." }
    ],
    mockupType: "blog",
    faqs: [
      { q: "Do you research the topics yourself?", a: "Yes, absolutely. We perform in-depth research on every topic, citing authoritative sources and double-checking facts." },
      { q: "Who owns the copyright to the content?", a: "You own 100% of the copyright. Once payment is complete, all intellectual property is fully transferred to your business." },
      { q: "Can you upload posts directly to my website?", a: "Yes, we offer direct CMS upload options for popular platforms like WordPress, Webflow, and Ghost as a premium add-on." }
    ]
  },
  "article-writing": {
    id: "article",
    label: "SERVICES / ARTICLE WRITING",
    title: <>Authoritative <em>Articles</em> & Thought Leadership</>,
    subtitle: "Establish industry authority with deeply-researched, fact-checked, long-form articles that build genuine credibility.",
    rate: "From ₹3.0 / word (or ₹3,000 / 1K words)",
    turnaround: "7–10 business days",
    deliverable: "Draft with references & citations",
    summaryTitle: "Why Thought Leadership Matters",
    summaryDesc: "Surface-level copy doesn't establish authority. We write expert-level, long-form articles that dive deep into complex subjects, interview sources when necessary, and present logical, persuasive arguments.",
    features: [
      { title: "Deep Primary Research", desc: "No generic online summaries. We cross-reference scientific papers, databases, and whitepapers." },
      { title: "Professional Citations", desc: "Every statistic and technical claim is linked back to a verified, credible source." },
      { title: "Narrative Logic Structure", desc: "Perfect article flow designed to guide readers through complex industry arguments." },
      { title: "Plagiarism-Free Reports", desc: "Full originality scans delivered alongside your custom article draft." },
    ],
    steps: [
      { num: "01", title: "Scope & Outline", desc: "We establish the article's core thesis, review target publications, and outline major sections." },
      { num: "02", title: "Research & Writing", desc: "We conduct heavy research, collect source material, and draft the long-form copy." },
      { num: "03", title: "Editorial Polish", desc: "Our editor reviews the article's logic structure, style, and flow before hand-off." }
    ],
    mockupType: "article",
    faqs: [
      { q: "What length of articles do you write?", a: "We write everything from standard 1,000-word articles to exhaustive 5,000-word whitepapers and deep dives." },
      { q: "Can we provide our own research data?", a: "Yes, we encourage clients to share data briefs, interview transcripts, and internal documents. We compile it seamlessly." }
    ]
  },
  "brand-storytelling": {
    id: "brand",
    label: "SERVICES / BRAND STORYTELLING",
    title: <>Crafting Your Brand <em>Narrative</em></>,
    subtitle: "Capture hearts and minds with compelling origin stories, mission statements, and core copy that defines who you are.",
    rate: "From ₹12,000 / project",
    turnaround: "7–10 business days",
    deliverable: "Brand Identity copy document",
    summaryTitle: "Why Brand Voice Matters",
    summaryDesc: "Customers buy the 'why' before the 'what'. We help brands articulate their origin, highlight their founders' journey, and create consistent mission pillars that build a community around their products.",
    features: [
      { title: "Archetype Definition", desc: "We establish your brand's primary psychological character to ensure consistent messaging." },
      { title: "Origin Story Copywriting", desc: "A narrative hook detailing how your business started and the exact problem you set out to solve." },
      { title: "Core Pillars & Mission Copy", desc: "Concise, punchy mission statements, value sheets, and vision decks." },
      { title: "Tonal Style Sheet", desc: "A guide detailing your brand's do's and don'ts for voice, rhythm, and word choice." },
    ],
    steps: [
      { num: "01", title: "Discovery Interview", desc: "We host a 45-minute call to extract your founders' story, personal motivations, and company core values." },
      { num: "02", title: "Archetype Blueprint", desc: "Our creative directors build your brand personality framework and outline core copy blocks." },
      { num: "03", title: "Narrative Playbook", desc: "Receive a comprehensive identity document including your story, values, and guidelines." }
    ],
    mockupType: "brand",
    faqs: [
      { q: "What types of companies is this for?", a: "It is ideal for startups looking to raise capital, D2C brands launching products, and family businesses passing down heritage." },
      { q: "Can we use this for investor decks?", a: "Yes, the copy blocks we provide translate perfectly into Pitch Decks, About Us pages, and media kits." }
    ]
  },
  "website-copy": {
    id: "website",
    label: "SERVICES / WEBSITE COPY",
    title: <>High-Converting <em>Website</em> Copywriting</>,
    subtitle: "Turn site visitors into paying clients with clear, persuasive, layout-optimized copy for all your main landing pages.",
    rate: "From ₹7,000 / site (Up to 5 pages)",
    turnaround: "10–14 business days",
    deliverable: "Wireframe layout copy deck",
    summaryTitle: "Why Web Copy Matters",
    summaryDesc: "Beautiful web design fails if the message is confusing. We write clean, high-intent headers, feature sections, FAQs, and calls-to-action structured specifically for modern responsive web layouts.",
    features: [
      { title: "Layout Wireframe Structuring", desc: "Our copy is delivered in visual blocks, showing your designer exactly where text fits." },
      { title: "Clear Value Proposition", desc: "No confusing corporate jargon. We explain exactly what you do in seconds." },
      { title: "Action-Oriented CTAs", desc: "Buttons, forms, and microcopy designed to reduce friction and encourage clicks." },
      { title: "On-Page SEO Tags", desc: "SEO-friendly URL structures, header hierarchies (H1-H3), and image alt text prompts." },
    ],
    steps: [
      { num: "01", title: "UX Alignment Call", desc: "We review your site sitemap, target user personas, and conversion goals to map copy layout." },
      { num: "02", title: "Wireframe Copy Deck", desc: "We draft the copy organized by sections (Hero, Features, Social Proof) mimicking real layouts." },
      { num: "03", title: "Design Review Sync", desc: "We collaborate with your designers or web developers to tweak words as design blocks shift." }
    ],
    mockupType: "website",
    faqs: [
      { q: "Do you design the website?", a: "No, we focus 100% on copywriting. However, we deliver copy in a wireframe-friendly format that designers love." },
      { q: "What pages are included in the 5-page setup?", a: "Typically: Home, About, Services/Product, Why Us/Pricing, and Contact. We can customize the page list based on your sitemap." }
    ]
  },
  "seo-content": {
    id: "seo",
    label: "SERVICES / SEO CONTENT",
    title: <>Search-Optimized <em>SEO</em> Pages</>,
    subtitle: "Rank higher on Google and bring in recurring organic traffic without sacrificing the human voice or readability.",
    rate: "From ₹15 / word",
    turnaround: "5–7 business days",
    deliverable: "Document with SEO specifications",
    summaryTitle: "Why Strategic SEO Matters",
    summaryDesc: "Keyword stuffing is dead. Modern search engines reward helpful, expert-written articles that address real user intent. We build topic clusters that satisfy both Google algorithms and real readers.",
    features: [
      { title: "Topic Cluster Keyword Research", desc: "We find high-value, low-competition keywords that match your audience's intent." },
      { title: "Semantic Search Optimization", desc: "Integrating related sub-topics and queries to show search engines complete topical coverage." },
      { title: "Logical Header Hierarchies", desc: "H1, H2, and H3 layouts designed to make it simple for crawler bots to read your site." },
      { title: "Internal Linking Suggestions", desc: "Advice on connecting your new pages to existing content to share page rank." },
    ],
    steps: [
      { num: "01", title: "Keyword Audit", desc: "We analyze your site's current rankings, target keywords, and identify top competitor content gaps." },
      { num: "02", title: "Content Brief Creation", desc: "We build briefs outlining word count targets, semantic terms, and H2 headers." },
      { num: "03", title: "SEO Copy Draft", desc: "We draft high-quality content, optimize meta fields, and verify readability scores before delivery." }
    ],
    mockupType: "seo",
    faqs: [
      { q: "Do you guarantee #1 rankings?", a: "No honest agency guarantees specific rankings due to search algorithm updates. However, our content consistently drives significant search traffic." },
      { q: "What SEO tools do you use?", a: "We utilize industry-leading tools like SEMrush, Ahrefs, and Google Search Console to plan and research our copy." }
    ]
  },
  "custom-content": {
    id: "custom",
    label: "SERVICES / CUSTOM CONTENT",
    title: <>Tailored <em>Custom</em> Writing Solutions</>,
    subtitle: "Custom ghostwriting, case studies, whitepapers, email newsletters, and long-term retainers tailored to your exact needs.",
    rate: "Custom pricing based on scope",
    turnaround: "Varies by project scale",
    deliverable: "Custom scope agreements",
    summaryTitle: "Why Custom Scope Works",
    summaryDesc: "Some projects don't fit into standard packages. Whether you need a monthly email newsletter sequence, complex customer success case studies, or a ghostwriter for an ebook, we build bespoke workflows.",
    features: [
      { title: "Bespoke Content Planning", desc: "We scope out your exact deliverables, timelines, and reporting needs." },
      { title: "Dedicated Ghostwriters", desc: "Work with the same writers long-term to ensure absolute consistency across materials." },
      { title: "Flexible Retention Models", desc: "Monthly retainer packages with discounted rates for long-term collaboration." },
      { title: "Multi-Format Versatility", desc: "Cross-platform optimization for newsletters, social threads, PDFs, or slides." },
    ],
    steps: [
      { num: "01", title: "Briefing Sync", desc: "We host an in-depth alignment call to map out all project targets and timelines." },
      { num: "02", title: "Custom Agreement", desc: "We build a detailed proposal with clear rates, milestones, and deliverable schedules." },
      { num: "03", title: "Dedicated Delivery", desc: "Regular check-ins, milestone updates, and prompt, high-quality deliverables." }
    ],
    mockupType: "custom",
    faqs: [
      { q: "Do you offer monthly retainers?", a: "Yes, our monthly retainers are highly popular. They secure priority writing capacity and offer discounted word rates." },
      { q: "Can we mix and match services?", a: "Absolutely. A typical retainer might include 4 blog posts, 1 newsletter draft, and occasional landing page tweaks." }
    ]
  }
};

function MockupShowcase({ type }: { type: "blog" | "article" | "brand" | "website" | "seo" | "custom" }) {
  switch (type) {
    case "blog":
      return (
        <div className="w-full h-full bg-[#FAF7F0] border border-[var(--cq-linen)] rounded-[var(--radius-lg)] p-5 shadow-inner flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-3">
              <span className="badge-tag">BLOG PREVIEW</span>
              <span className="text-[10px] text-[var(--cq-ink-muted)]">3 Min Read</span>
            </div>
            <div className="h-4 bg-[var(--cq-ink)] rounded w-5/6 mb-2" />
            <div className="h-3 bg-[var(--cq-linen)] rounded w-full mb-1.5" />
            <div className="h-3 bg-[var(--cq-linen)] rounded w-4/5 mb-4" />
            <div className="border-l-2 border-[var(--cq-forest)] pl-3 py-1 my-2">
              <div className="h-2 bg-[var(--cq-ink-muted)] rounded w-11/12 mb-1" />
              <div className="h-2 bg-[var(--cq-ink-muted)] rounded w-5/6" />
            </div>
          </div>
          <div className="flex items-center gap-2 border-t border-[var(--cq-linen)] pt-3 mt-2">
            <div className="w-6 h-6 rounded-full bg-[var(--cq-parchment-deep)] flex items-center justify-center text-[9px] font-bold text-[var(--cq-ink)]">CQ</div>
            <div className="h-2 bg-[var(--cq-linen)] rounded w-1/3" />
          </div>
        </div>
      );
    case "article":
      return (
        <div className="w-full h-full bg-[#1A1714] border border-[var(--cq-night-border)] rounded-[var(--radius-lg)] p-5 shadow-inner flex flex-col justify-between text-[var(--cq-parchment)]">
          <div>
            <div className="flex justify-between items-center mb-3">
              <span className="px-2 py-0.5 rounded text-[8px] bg-[rgba(255,255,255,0.08)] border border-[rgba(255,255,255,0.15)] text-[var(--cq-parchment)] uppercase font-semibold">Long Form Draft</span>
              <span className="text-[9px] text-[rgba(255,255,255,0.4)]">Citations [1]</span>
            </div>
            <div className="h-3 bg-[rgba(255,255,255,0.9)] rounded w-11/12 mb-2" />
            <div className="h-2 bg-[rgba(255,255,255,0.3)] rounded w-full mb-1.5" />
            <div className="h-2 bg-[rgba(255,255,255,0.3)] rounded w-5/6 mb-1.5" />
            <div className="h-2 bg-[rgba(255,255,255,0.3)] rounded w-full mb-3" />
            <div className="h-3 bg-[rgba(255,255,255,0.5)] rounded w-4/5" />
          </div>
          <div className="text-[9px] text-[var(--cq-forest)] font-mono tracking-wider text-right">
            Verified Plagiarism-Free ✓
          </div>
        </div>
      );
    case "brand":
      return (
        <div className="w-full h-full bg-[#FAF7F0] border border-[var(--cq-linen)] rounded-[var(--radius-lg)] p-5 shadow-inner flex flex-col justify-between">
          <div className="text-center py-2">
            <span className="font-display italic text-4xl text-[var(--cq-forest)] select-none">&ldquo;</span>
            <div className="h-3 bg-[var(--cq-ink)] rounded w-5/6 mx-auto mb-2" />
            <div className="h-3 bg-[var(--cq-ink)] rounded w-4/5 mx-auto mb-4" />
            <div className="w-16 h-px bg-[var(--cq-linen)] mx-auto mb-3" />
            <div className="h-2.5 bg-[var(--cq-ink-muted)] rounded w-2/3 mx-auto" />
          </div>
          <div className="flex justify-center gap-1.5 mt-2">
            <span className="px-2 py-0.5 rounded text-[8px] bg-[var(--cq-forest-light)] text-[var(--cq-forest)] uppercase font-semibold">Personality Guide</span>
            <span className="px-2 py-0.5 rounded text-[8px] bg-[var(--cq-parchment-deep)] text-[var(--cq-ink-muted)] uppercase font-semibold">Tonal Rules</span>
          </div>
        </div>
      );
    case "website":
      return (
        <div className="w-full h-full bg-[#FAF7F0] border border-[var(--cq-linen)] rounded-[var(--radius-lg)] p-4 shadow-inner flex flex-col gap-3">
          <div className="border border-[var(--cq-linen)] bg-white rounded p-2.5">
            <div className="flex justify-between items-center mb-2">
              <span className="text-[8px] font-bold text-[var(--cq-forest)]">HERO AREA (Wireframe Deck)</span>
              <span className="text-[7px] text-[var(--cq-ink-faint)]">H1 Placement</span>
            </div>
            <div className="h-2.5 bg-[var(--cq-ink)] rounded w-5/6 mb-1.5" />
            <div className="h-2 bg-[var(--cq-linen)] rounded w-full mb-2" />
            <div className="w-12 h-4 bg-[var(--cq-forest)] rounded-sm flex items-center justify-center text-[7px] text-white">Call to Action</div>
          </div>
          <div className="border border-[var(--cq-linen)] bg-white rounded p-2.5">
            <span className="text-[8px] font-bold text-[var(--cq-ink-muted)] block mb-1.5">FEATURES LIST</span>
            <div className="flex gap-2">
              <div className="w-1/3 h-6 bg-[var(--cq-parchment-deep)] rounded-sm" />
              <div className="w-1/3 h-6 bg-[var(--cq-parchment-deep)] rounded-sm" />
              <div className="w-1/3 h-6 bg-[var(--cq-parchment-deep)] rounded-sm" />
            </div>
          </div>
        </div>
      );
    case "seo":
      return (
        <div className="w-full h-full bg-[#1A1714] border border-[var(--cq-night-border)] rounded-[var(--radius-lg)] p-5 shadow-inner flex flex-col justify-between text-[var(--cq-parchment)]">
          <div>
            <div className="text-[9px] text-[#4DB896] font-semibold mb-2">TOPICAL CLUSTER SCHEMATIC</div>
            <div className="flex items-center gap-2 border border-[rgba(255,255,255,0.1)] rounded p-2 mb-2 bg-[rgba(255,255,255,0.02)]">
              <div className="w-2.5 h-2.5 rounded-full bg-[var(--cq-forest)] flex-shrink-0" />
              <div className="h-2 bg-[rgba(255,255,255,0.8)] rounded w-3/4" />
            </div>
            <div className="pl-4 flex flex-col gap-1.5 border-l border-[rgba(255,255,255,0.1)] my-2">
              <div className="flex items-center gap-2">
                <span className="text-[8px] text-[rgba(255,255,255,0.4)]">└ H2</span>
                <div className="h-1.5 bg-[rgba(255,255,255,0.4)] rounded w-2/3" />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[8px] text-[rgba(255,255,255,0.4)]">└ H2</span>
                <div className="h-1.5 bg-[rgba(255,255,255,0.4)] rounded w-1/2" />
              </div>
            </div>
          </div>
          <div className="flex justify-between text-[8px] text-[rgba(255,255,255,0.4)] border-t border-[rgba(255,255,255,0.08)] pt-2.5">
            <span>Volume: High</span>
            <span>Keyword Difficulty: Low</span>
          </div>
        </div>
      );
    case "custom":
    default:
      return (
        <div className="w-full h-full bg-[#FAF7F0] border border-[var(--cq-linen)] rounded-[var(--radius-lg)] p-5 shadow-inner flex flex-col justify-between">
          <div>
            <span className="badge-tag mb-3">CUSTOM RETAINER DOCUMENT</span>
            <div className="h-4 bg-[var(--cq-ink)] rounded w-2/3 mb-2" />
            <div className="h-2 bg-[var(--cq-linen)] rounded w-full mb-1.5" />
            <div className="h-2 bg-[var(--cq-linen)] rounded w-11/12 mb-1.5" />
            <div className="h-2 bg-[var(--cq-linen)] rounded w-full" />
          </div>
          <div className="flex justify-between items-center text-[10px] text-[var(--cq-ink-muted)] border-t border-[var(--cq-linen)] pt-3">
            <span>Flexible Scope Agreement</span>
            <span className="font-semibold text-[var(--cq-forest)] font-body text-xs">Consultation &rarr;</span>
          </div>
        </div>
      );
  }
}

export function ServiceDetailClient({ slug, service }: { slug: string; service: ServiceDetail }) {
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(null);

  return (
    <>
      <style>{`
        body { background: var(--cq-cream); }

        .sdt-summary-box {
          background: var(--cq-parchment);
          border: 1px solid var(--cq-linen);
          border-radius: var(--radius-xl);
          padding: 24px;
        }

        .sdt-dl-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
        }
        @media (min-width: 580px) {
          .sdt-dl-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 24px;
          }
        }

        .sdt-dl-item {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .sdt-dl-label {
          font-family: var(--font-body);
          font-size: 10px;
          font-weight: 500;
          letter-spacing: var(--tracking-wider);
          text-transform: uppercase;
          color: var(--cq-ink-muted);
        }

        .sdt-dl-value {
          font-family: var(--font-body);
          font-weight: 500;
          font-size: 1.25rem;
          color: var(--cq-ink);
        }

        .sdt-feature-row {
          border-bottom: 0.5px solid var(--cq-linen);
          padding-top: 18px;
          padding-bottom: 18px;
        }
        .sdt-feature-row:last-child {
          border-bottom: none;
        }
      `}</style>

      <CQHeader />
      <main>
        {/* Reusable PageHero component */}
        <PageHero
          label={service.label}
          title={service.title}
          subtitle={service.subtitle}
          breadcrumb={[
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
            { name: service.summaryTitle.replace("Why ", "").replace(" Matters", ""), path: `/services/${slug}` }
          ]}
          illustration="service-detail"
        />

        {/* 1. Quick Summary Key Details Card */}
        <section className="section-sm bg-[var(--cq-parchment)]">
          <div className="container-content">
            <div className="sdt-summary-box shadow-sm">
              <dl className="sdt-dl-grid">
                <div className="sdt-dl-item">
                  <dt className="sdt-dl-label">Standard rate</dt>
                  <dd className="sdt-dl-value">{service.rate}</dd>
                </div>
                <div className="sdt-dl-item">
                  <dt className="sdt-dl-label">Turnaround time</dt>
                  <dd className="sdt-dl-value">{service.turnaround}</dd>
                </div>
                <div className="sdt-dl-item">
                  <dt className="sdt-dl-label">Primary deliverable</dt>
                  <dd className="sdt-dl-value">{service.deliverable}</dd>
                </div>
              </dl>
            </div>
          </div>
        </section>

        {/* 2. Concept Detail + Visual Sample Output */}
        <section className="section-md border-t border-[var(--cq-linen)] bg-[var(--cq-parchment-mid)]">
          <div className="container-content">
            <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-12 items-center">
              <div>
                <span className="badge-label mb-4">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A5 5 0 0 0 8 8c0 1 .3 2.5 1 3.5l.5 1" />
                    <path d="M9 18h6" />
                    <path d="M10 22h4" />
                  </svg>
                  THE CONCEPT
                </span>
                <h2 className="font-display text-3xl md:text-4xl text-[var(--cq-ink)] font-normal leading-tight mb-4">
                  {service.summaryTitle}
                </h2>
                <p className="text-base text-[var(--cq-ink-mid)] font-light leading-relaxed max-w-[60ch]">
                  {service.summaryDesc}
                </p>
              </div>

              {/* Sample Output Visual Mockup Column */}
              <div className="flex flex-col items-center">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--cq-ink-muted)] mb-3">
                  ✦ What You Will Receive
                </span>
                <div className="w-full max-w-[340px] h-[240px] relative">
                  <MockupShowcase type={service.mockupType} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. What's Included Feature List */}
        <section className="section-md border-t border-[var(--cq-linen)] bg-[var(--cq-parchment)]">
          <div className="container-content">
            <div className="flex flex-col gap-2 mb-10 text-center md:text-left">
              <span className="badge-label self-center md:self-start">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 11 12 14 22 4" />
                  <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                </svg>
                WHAT IS INCLUDED
              </span>
              <h2 className="font-display text-4xl text-[var(--cq-ink)] font-normal">
                Features & Deliverables
              </h2>
            </div>

            <div className="flex flex-col">
              {service.features.map((feature, idx) => (
                <div 
                  key={idx} 
                  className="sdt-feature-row flex flex-col md:flex-row md:items-start gap-2 md:gap-10"
                >
                  <div className="flex items-center gap-3 md:w-1/3 shrink-0">
                    <span className="text-[var(--cq-forest)] font-bold text-sm">✓</span>
                    <h3 className="font-body font-semibold text-[var(--cq-ink)] text-sm tracking-wide">
                      {feature.title}
                    </h3>
                  </div>
                  <div className="md:w-2/3 text-xs text-[var(--cq-ink-muted)] font-light leading-relaxed pl-6 md:pl-0">
                    {feature.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. Our Approach Process steps */}
        <section className="section-md border-t border-[var(--cq-linen)] bg-[var(--cq-parchment-mid)]">
          <div className="container-content">
            <div className="flex flex-col gap-2 mb-10 text-center">
              <span className="badge-label self-center">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
                </svg>
                OUR APPROACH
              </span>
              <h2 className="font-display text-3xl font-normal text-[var(--cq-ink)]">
                The Writing Process
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {service.steps.map((step) => (
                <div 
                  key={step.num} 
                  className="bg-[var(--cq-parchment)] border border-[var(--cq-linen)] rounded-[var(--radius-xl)] p-6 md:p-8 flex flex-col relative overflow-hidden transition-all duration-300 shadow-sm"
                >
                  <span className="font-sans font-semibold text-5xl text-[var(--cq-parchment-deep)] select-none mb-3">
                    {step.num}
                  </span>
                  <h3 className="font-display text-xl text-[var(--cq-ink)] font-normal mb-2 leading-none">
                    {step.title}
                  </h3>
                  <p className="text-xs text-[var(--cq-ink-mid)] font-light leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. FAQs Section */}
        <section className="section-md border-t border-[var(--cq-linen)] bg-[var(--cq-parchment)]">
          <div className="container-content">
            <div className="flex flex-col gap-2 mb-10 text-center md:text-left">
              <span className="badge-label self-center md:self-start">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                  <line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
                FAQ
              </span>
              <h2 className="font-display text-4xl text-[var(--cq-ink)] font-normal text-balance">
                Service-Specific FAQ
              </h2>
            </div>

            <div className="max-w-[720px] mx-auto flex flex-col gap-3">
              {service.faqs.map((faq, idx) => {
                const isOpen = openFaqIdx === idx;
                return (
                  <div 
                    key={idx} 
                    className="bg-[var(--cq-parchment-mid)] border border-[var(--cq-linen)] rounded-[var(--radius-lg)] overflow-hidden transition-all duration-300"
                  >
                    <button
                      onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                      className="w-full px-5 py-4 flex items-center justify-between text-left font-body font-medium text-sm text-[var(--cq-ink)]"
                    >
                      <span>{faq.q}</span>
                      <span className="text-xs text-[var(--cq-ink-muted)] ml-2 transition-transform duration-200" style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}>
                        ▼
                      </span>
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="px-5 pb-4 text-xs font-light text-[var(--cq-ink-mid)] leading-relaxed border-t border-[rgba(22,18,14,0.05)] pt-3">
                            {faq.a}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 6. CTA Action Section */}
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
