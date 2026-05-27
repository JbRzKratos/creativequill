import { Inter, Playfair_Display, Geist_Mono } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils";
import InkCursor from "@/components/effects/InkCursor";
import { ScrollProgress, OpenForWorkBadge, BackToTop } from "@/components/effects/HomeComponents";

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  style: ['normal', 'italic'],
  weight: ['400', '600', '700'],
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
      className={cn("antialiased", fontMono.variable, "font-sans", inter.variable, playfair.variable)}
    >
      <body suppressHydrationWarning>
        <ThemeProvider>
          <ScrollProgress />
          <OpenForWorkBadge />
          <BackToTop />
          {children}
          <InkCursor />
        </ThemeProvider>
      </body>
    </html>
  )
}
