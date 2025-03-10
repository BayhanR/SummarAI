"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

export function Navbar() {
  const pathname = usePathname()

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex justify-between items-center p-4 bg-background border-b"
    >
      <Link href="/" className="text-2xl font-bold text-primary">
        Summarai
      </Link>
      <div className="space-x-2">
        {pathname !== "/signin" && pathname !== "/signup" && (
          <>
            <Button asChild variant="ghost">
              <Link href="/signin">Giriş Yap</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/signup">Kayıt Ol</Link>
            </Button>
          </>
        )}
      </div>
    </motion.nav>
  )
}

