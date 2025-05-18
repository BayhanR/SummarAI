"use client"

import Link from "next/link"
import { useSession } from "next-auth/react"
import { Button } from "@/app/components/ui/button"
import { History, User } from "lucide-react"
import { signOut } from "next-auth/react"
import { useRouter } from "next/navigation"

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
                className="flex items-center"
                onClick={() => signOut({ callbackUrl: "/" })}
              >
                <User className="h-5 w-5 mr-2" />
                {session.user.name || "Kullanıcı"}
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

