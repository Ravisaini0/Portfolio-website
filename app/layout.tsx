import "./globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import PortfolioHeader from "./components/portfolio/Header"
import PortfolioFooter from "./components/portfolio/Footer"
import type React from "react"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Ravi Saini | Java Full Stack Developer",
  description: "Portfolio of Ravi Saini - Java Full Stack Developer skilled in Spring Boot, React, MySQL, and REST APIs.",
  generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen bg-background text-foreground`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <PortfolioHeader />
          <main>{children}</main>
          <PortfolioFooter />
        </ThemeProvider>
      </body>
    </html>
  )
}
