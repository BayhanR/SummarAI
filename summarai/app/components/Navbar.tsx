"use client"

import Link from "next/link"
import { useSession } from "next-auth/react"
import { Button } from "@/app/components/ui/button"
import { History, User } from "lucide-react"
import { signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import { ThemeToggle } from "./ThemeToggle"

export function Navbar() {
  const { data: session } = useSession()
  const router = useRouter()

  return (
    <nav className="border-b">
      <div className="container flex h-16 items-center px-4">
        <Link 
          href="/" 
          className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text hover:opacity-90 transition-opacity"
        >
          SummarAI
        </Link>

        <div className="ml-auto flex items-center space-x-4">
          <ThemeToggle />
          {session?.user ? (
            <>
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center"
                onClick={() => router.push("/history")}
              >
                <History className="h-5 w-5 mr-2" />
                Geçmiş
              </Button>
              
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center group relative overflow-hidden hover:border-red-500 transition-colors duration-300"
                onClick={() => signOut({ callbackUrl: "/" })}
              >
                <span className="flex items-center group-hover:translate-y-[-30px] transition-transform duration-300">
                  <User className="h-5 w-5 mr-2" />
                  {session.user.name || "Kullanıcı"}
                </span>
                <span className="absolute inset-0 flex items-center justify-center translate-y-[30px] group-hover:translate-y-0 transition-transform duration-300 text-red-500">
                  Çıkış Yap
                </span>
              </Button>
            </>
          ) : (
            <>
              <Button asChild variant="ghost" size="sm">
                <Link href="/signin">Giriş Yap</Link>
              </Button>
              <Button asChild size="sm">
                <Link href="/signup">Kayıt Ol</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

