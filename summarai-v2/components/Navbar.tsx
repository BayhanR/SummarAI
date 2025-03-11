"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"

export function Navbar() {
  const pathname = usePathname()

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50"
    >
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="rounded-full bg-gradient-to-r from-blue-600 to-purple-600 p-1">
            <div className="h-6 w-6 rounded-full bg-background flex items-center justify-center">
              <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 text-sm">
                S
              </span>
            </div>
          </div>
          <span className="font-bold text-xl">Summarai</span>
        </Link>

        <div className="flex items-center gap-4">
          {pathname !== "/signin" && pathname !== "/signup" && (
            <div className="flex gap-2">
              <Button asChild variant="ghost">
                <Link href="/signin">Giriş Yap</Link>
              </Button>
              <Button
                asChild
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                <Link href="/signup">Kayıt Ol</Link>
              </Button>
            </div>
          )}
          <ModeToggle />
        </div>
      </div>
    </motion.nav>
  )
}

