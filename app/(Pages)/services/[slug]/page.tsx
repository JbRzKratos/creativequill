import { notFound } from "next/navigation";
import { ServiceDetailClient, SERVICES_DATA } from "./ServiceDetailClient";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = SERVICES_DATA[slug];
  if (!service) return { title: "Service Not Found | Creative Quill" };
  const labelParts = service.label.split(" / ");
  const serviceName = labelParts[labelParts.length - 1];
  const titleStr = `${serviceName} Services`;
  const canonical = `https://creativequill.co.in/services/${slug}`;
  return {
    title: titleStr,
    description: service.subtitle,
    alternates: { canonical },
    openGraph: {
      title: `${titleStr} | Creative Quill`,
      description: service.subtitle,
      url: canonical,
      images: [{ url: "/og-services.png", width: 1200, height: 630, alt: `Creative Quill — ${serviceName}` }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${titleStr} | Creative Quill`,
      images: ["/og-services.png"],
    },
  };
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const service = SERVICES_DATA[slug];

  if (!service) {
    notFound();
  }

  const labelParts = service.label.split(" / ");
  const serviceName = labelParts[labelParts.length - 1];
  const canonical = `https://creativequill.co.in/services/${slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": `${serviceName} — Creative Quill`,
    "url": canonical,
    "description": service.subtitle,
    "provider": {
      "@type": "Organization",
      "name": "Creative Quill",
      "url": "https://creativequill.co.in",
    },
    "areaServed": "IN",
    "offers": {
      "@type": "Offer",
      "priceCurrency": "INR",
      "price": service.rate.replace(/[^0-9.]/g, "") || "1.5",
      "eligibleRegion": "IN",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ServiceDetailClient slug={slug} service={service} />
    </>
  );
}

export async function generateStaticParams() {
  return [
    { slug: "blog-writing" },
    { slug: "article-writing" },
    { slug: "brand-storytelling" },
    { slug: "website-copy" },
    { slug: "seo-content" },
    { slug: "custom-content" },
  ];
}

