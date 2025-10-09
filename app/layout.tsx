import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Poppins } from "next/font/google"
import "./globals.css"
import { headers } from "next/headers"

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["400", "700"]
})

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "KeyRate Mortgage Dubai - Lowest Rates, No Lender Fees",
  description:
    "Fast, transparent mortgage solutions for homebuyers and investors across the UAE. $2B+ processed, 10K+ clients, 100% success rate.",
  openGraph: {
    title: "KeyRate Mortgage Dubai - Lowest Rates, No Lender Fees",
    description:
      "Fast, transparent mortgage solutions for homebuyers and investors across the UAE. $2B+ processed, 10K+ clients, 100% success rate.",
    url: "https://keyrate.ae",
    siteName: "KeyRate",
    images: [
      {
        url: "/social.jpg",
        width: 1200,
        height: 630,
        alt: "KeyRate Mortgage Dubai",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "KeyRate Mortgage Dubai - Lowest Rates, No Lender Fees",
    description:
      "Fast, transparent mortgage solutions for homebuyers and investors across the UAE. $2B+ processed, 10K+ clients, 100% success rate.",
    images: ["/social.jpg"],
  },
  icons: {
    icon: [
      { url: "/icon.png", type: "image/png", sizes: "32x32" },
      { url: "/icon.png", type: "image/png", sizes: "192x192" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const h = headers()
  const host = (h.get("x-forwarded-host") || h.get("host") || "").toLowerCase()
  const isLocalhost = host.startsWith("localhost") || host.startsWith("127.0.0.1")
  const htmlClasses = `${inter.variable} ${poppins.variable} antialiased ${isLocalhost ? "dev-auto-dark" : ""}`.trim()
  return (
    <html lang="en" className={htmlClasses}>
      <body className="font-sans">{children}</body>
    </html>
  )
}
