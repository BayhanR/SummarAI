"use client"

import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card"
import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/app/components/ui/button"

export default function ErrorPage() {
  const searchParams = useSearchParams()
  const error = searchParams.get("error")

  let errorMessage = "Bir hata oluştu."
  if (error === "Verification") {
    errorMessage = "Doğrulama bağlantısı geçersiz veya süresi dolmuş."
  }

  return (
    <div className="container flex items-center justify-center min-h-[calc(100vh-12rem)] py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="border-2">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Hata</CardTitle>
            <CardDescription className="text-center">
              {errorMessage}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Button asChild>
              <Link href="/">Ana Sayfaya Dön</Link>
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
} 