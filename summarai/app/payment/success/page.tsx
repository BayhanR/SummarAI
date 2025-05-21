"use client"

import { motion } from "framer-motion"
import { CheckCircle2 } from "lucide-react"
import { Button } from "@/app/components/ui/button"
import Link from "next/link"

export default function PaymentSuccessPage() {
  return (
    <div className="container max-w-md mx-auto flex flex-col items-center justify-center min-h-[calc(100vh-12rem)] px-4 py-16">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center text-center"
      >
        <CheckCircle2 className="h-20 w-20 text-green-500 mb-6" />
        
        <h1 className="text-3xl font-bold mb-4">Ödeme Başarılı!</h1>
        
        <p className="text-muted-foreground mb-6">
          Ödemeniz başarıyla gerçekleştirildi ve Pro üyeliğiniz aktif hale getirildi.
          Artık tüm premium özelliklere erişebilirsiniz.
        </p>

        <div className="bg-muted/30 p-4 rounded-lg mb-8 text-left">
          <h3 className="font-semibold mb-3 text-center">Pro Üyelik Avantajlarınız</h3>
          <ul className="space-y-2">
            <li className="flex items-start">
              <CheckCircle2 className="h-4 w-4 text-green-500 mr-2 mt-1 shrink-0" />
              <span>Günlük <span className="font-semibold">50 özet</span> hakkı (standart üyeliğin 10 katı)</span>
            </li>
            <li className="flex items-start">
              <CheckCircle2 className="h-4 w-4 text-green-500 mr-2 mt-1 shrink-0" />
              <span>Daha kaliteli ve detaylı özetler</span>
            </li>
            <li className="flex items-start">
              <CheckCircle2 className="h-4 w-4 text-green-500 mr-2 mt-1 shrink-0" />
              <span>Öncelikli destek ve daha hızlı yanıt süresi</span>
            </li>
            <li className="flex items-start">
              <CheckCircle2 className="h-4 w-4 text-green-500 mr-2 mt-1 shrink-0" />
              <span>Reklamsız kullanıcı deneyimi</span>
            </li>
          </ul>
        </div>
        
        <div className="grid gap-4 w-full">
          <Button asChild>
            <Link href="/">
              Ana Sayfaya Dön
            </Link>
          </Button>
          
          <Button variant="outline" asChild>
            <Link href="/history">
              Özet Geçmişim
            </Link>
          </Button>
        </div>
        
        <p className="text-xs text-muted-foreground mt-8">
          İşleminizle ilgili detaylar e-posta adresinize gönderilmiştir.
          Bir sorun olması durumunda <Link href="/footerPages/contact" className="underline">destek ekibimizle</Link> iletişime geçebilirsiniz.
        </p>
      </motion.div>
    </div>
  )
} 