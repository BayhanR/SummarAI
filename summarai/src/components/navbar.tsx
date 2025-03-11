"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/src/components/ui/button"

export function Navbar() {
  const pathname = usePathname()

  return (
    <nav className="flex justify-between items-center p-4 bg-gray-1000">
      <Link href="/" className="text-xl font-bold">
        Summarai
      </Link>
      <div className="space-x-2">
        {pathname !== "/signin" && (
          <Button asChild variant="ghost">
            <Link href="/signin">Giriş Yap</Link>
          </Button>
        )}
        {pathname !== "/signup" && (
          <Button asChild variant="outline">
            <Link href="/signup">Kayıt Ol</Link>
          </Button>
        )}
      </div>
    </nav>
  )
}

