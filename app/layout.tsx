import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import "./globals.css"
import ScrollBubble from "@/components/ScrollBubble"
import { Inter } from "next/font/google"
import { JetBrains_Mono } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })
const jetbrains = JetBrains_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "v0 App",
  description: "Created with v0",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrains.variable}`}>
      <head>
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
      </head>
      <body className="min-h-screen bg-zinc-950 text-zinc-100 antialiased">
        <ScrollBubble />
        <div className="mx-auto max-w-5xl px-5">{children}</div>
      </body>
    </html>
  )
}
