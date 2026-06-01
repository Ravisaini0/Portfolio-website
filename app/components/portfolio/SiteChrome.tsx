"use client"

import type React from "react"
import { usePathname } from "next/navigation"
import PortfolioHeader from "./Header"
import PortfolioFooter from "./Footer"

export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAdminRoute = pathname.startsWith("/admin")

  return (
    <>
      {!isAdminRoute && <PortfolioHeader />}
      <main>{children}</main>
      {!isAdminRoute && <PortfolioFooter />}
    </>
  )
}
