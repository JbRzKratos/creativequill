import type { Metadata } from "next";
import { ContactPageClient } from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact Us | Creative Quill",
  description:
    "Get in touch with Creative Quill. Tell us about your content needs and we'll craft a tailored strategy that sounds unmistakably like you. Free consultation available.",
  alternates: { canonical: "https://creativequill.co.in/contact" },
  openGraph: {
    title: "Contact Creative Quill — Let's Create Something Great",
    description:
      "Tell us about your content needs. We'll get back to you within 24 hours with a tailored strategy.",
    url: "https://creativequill.co.in/contact",
    images: [
      {
        url: "/og-contact.png",
        width: 1200,
        height: 630,
        alt: "Contact Creative Quill",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Creative Quill — Let's Create Something Great",
    images: ["/og-contact.png"],
  },
};

const contactJsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact Creative Quill",
  url: "https://creativequill.co.in/contact",
  description:
    "Get in touch with Creative Quill for content writing services, free consultations, and project enquiries.",
  mainEntity: {
    "@type": "Organization",
    name: "Creative Quill",
    url: "https://creativequill.co.in",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+91-88071-90545",
      contactType: "Customer Service",
      availableLanguage: "English",
    },
  },
};

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactJsonLd) }}
      />
      <ContactPageClient />
    </>
  );
}
