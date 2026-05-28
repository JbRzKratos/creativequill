import { DM_Sans, Cormorant_Garamond, Geist_Mono } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils";
import InkCursor from "@/components/effects/InkCursor";
import { ScrollProgress, BackToTop } from "@/components/effects/HomeComponents";

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
          <ScrollProgress />
          <BackToTop />
          {children}
          <InkCursor />
        </ThemeProvider>
      </body>
    </html>
  )
}
