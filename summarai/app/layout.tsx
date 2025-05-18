import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Navbar } from "@/app/components/Navbar"
import { Footer } from "@/app/components/Footer"
import { Toaster } from "@/app/components/ui/toaster"
import { ThemeProvider } from "@/app/components/theme-provider"
import { AuthProvider } from "./providers"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Summarai - AI Metin Özetleme Aracı",
  description: "Yapay zeka destekli metin özetleme aracı ile uzun metinlerinizi saniyeler içinde özetleyin.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <AuthProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <Navbar />
            <main className="flex-grow">{children}</main>
            <Footer />
            <Toaster />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  )
}

