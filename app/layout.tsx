import type { Metadata } from "next";
import { DM_Sans, Cormorant_Garamond, Geist_Mono } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils";
import InkCursor from "@/components/effects/InkCursor";
import { BackToTop, FloatingWhatsApp } from "@/components/effects/HomeComponents";

export const metadata: Metadata = {
  metadataBase: new URL("https://creativequill.co.in"),
  title: {
    default: "Creative Quill — Human-Written Content That Actually Sounds Like You",
    template: "%s | Creative Quill",
  },
  description:
    "Creative Quill delivers strategy-driven blog posts, articles, brand storytelling, website copy, and SEO content — written by humans, never AI. Growing businesses deserve content with a real voice.",
  keywords: [
    "content writing services",
    "blog writing",
    "SEO content",
    "brand storytelling",
    "website copywriting",
    "article writing",
    "content strategy",
    "human content writing India",
  ],
  authors: [{ name: "Creative Quill", url: "https://creativequill.co.in" }],
  creator: "Creative Quill",
  publisher: "Creative Quill",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://creativequill.co.in",
    siteName: "Creative Quill",
    title: "Creative Quill — Human-Written Content That Actually Sounds Like You",
    description:
      "Strategy-driven blog posts, articles, brand storytelling, website copy and SEO content — written by humans, never AI.",
    images: [
      {
        url: "/og-home.png",
        width: 1200,
        height: 630,
        alt: "Creative Quill — Human-Written Content",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Creative Quill — Human-Written Content That Actually Sounds Like You",
    description:
      "Strategy-driven content writing services. Blog posts, SEO content, brand storytelling and website copy that sounds like you.",
    images: ["/og-home.png"],
    creator: "@creativequill",
  },
  manifest: "/site.webmanifest",
  icons: {
    icon: "/favicon.ico",
    apple: "/favicon.ico",
  },
  alternates: {
    canonical: "https://creativequill.co.in",
  },
};



const dmSans = DM_Sans({ subsets: ['latin'], variable: '--font-sans' })

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-serif',
  style: ['normal', 'italic'],
  weight: ['300', '400', '500', '600', '700'],
})

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  style: ["normal"],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("antialiased", fontMono.variable, "font-sans", dmSans.variable, cormorant.variable)}
      data-scroll-behavior="smooth"
    >
      <body suppressHydrationWarning>
        <ThemeProvider>

          <BackToTop />
          <FloatingWhatsApp />
          {children}
          <InkCursor />
        </ThemeProvider>
      </body>
    </html>
  )
}
