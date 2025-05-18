"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card"
import { motion } from "framer-motion"

export default function VerifyRequestPage() {
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
            <CardTitle className="text-2xl font-bold text-center">E-posta Doğrulama</CardTitle>
            <CardDescription className="text-center">
              E-posta adresinize bir doğrulama bağlantısı gönderdik. Lütfen gelen kutunuzu kontrol edin.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center text-sm text-muted-foreground">
              <p>E-posta gelmedi mi?</p>
              <p>Spam klasörünü kontrol edin veya birkaç dakika bekleyin.</p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
} 