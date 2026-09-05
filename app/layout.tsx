import React from "react"
import type { Metadata, Viewport } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { Providers } from "@/components/providers"
import { GoogleAnalytics } from "@next/third-parties/google" // <-- Tambahan Import GA4

import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
})

export const metadata: Metadata = {
  title: "Pena Edukasi - Membangun Generasi Cerdas dan Berakhlak",
  description:
    "Portal edukasi untuk membangun generasi cerdas dan berakhlak mulia melalui konten pendidikan berkualitas.",
}

export const viewport: Viewport = {
  themeColor: "#1a8a9e",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="id"
      suppressHydrationWarning
      className="overflow-x-clip"
    >
      <body
        className={`
          ${inter.variable}
          ${playfair.variable}
          font-sans
          antialiased
          overflow-x-clip
        `}
      >
        <Providers>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </Providers>
        
        {/* Tambahan Komponen Google Analytics */}
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID as string} />
      </body>
    </html>
  )
}