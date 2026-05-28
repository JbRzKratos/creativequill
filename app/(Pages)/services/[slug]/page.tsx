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
  return {
    title: `${serviceName} | Creative Quill`,
    description: service.subtitle,
  };
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const service = SERVICES_DATA[slug];
  
  if (!service) {
    notFound();
  }

  return <ServiceDetailClient slug={slug} service={service} />;
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
