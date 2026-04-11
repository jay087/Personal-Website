import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import ScrollBubble from "@/components/ScrollBubble";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "Jason Wu — Personal Site",
  description: "Account Manager · Fixed Income Specialist",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrains.variable}`}>
      <body className="min-h-screen bg-zinc-950 text-zinc-100 antialiased">
        <ScrollBubble />   {/* ← background bubble */}
        <div className="mx-auto max-w-5xl px-5">{children}</div>
      </body>
    </html>
  );
}