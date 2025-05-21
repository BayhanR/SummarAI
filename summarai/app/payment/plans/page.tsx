"use client"

import { useState } from "react"
import { Button } from "@/app/components/ui/button"
import { Card, CardContent } from "@/app/components/ui/card"
import { Check } from "lucide-react"
import { motion } from "framer-motion"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { toast } from "@/app/hooks/use-toast"
import Link from "next/link"

// Ödeme planları
const pricingOptions = [
  {
    id: "monthly",
    name: "Aylık",
    price: 49,
    normalPrice: 99,
    period: "ay",
    saveText: ""
  },
  {
    id: "quarterly",
    name: "3 Aylık",
    price: 129,
    normalPrice: 297,
    period: "3 ay",
    saveText: "%57 tasarruf"
  },
  {
    id: "yearly",
    name: "Yıllık",
    price: 490,
    normalPrice: 1188,
    period: "yıl",
    saveText: "%59 tasarruf"
  }
]

// Pro özellikleri
const proFeatures = [
  "Günlük 50 özet hakkı",
  "Gelişmiş özet kalitesi",
  "Öncelikli destek",
  "Özel dil seçenekleri",
  "Reklamsız deneyim",
  "Özet geçmişi",
  "Özetleri paylaşma",
  "Uzun metinleri özetleme"
]

export default function PaymentPlansPage() {
  const router = useRouter()
  const { data: session } = useSession()
  const [selectedPlan, setSelectedPlan] = useState<string>("monthly")
  const [isProcessing, setIsProcessing] = useState(false)

  // Seçilen planı al
  const currentPlan = pricingOptions.find(plan => plan.id === selectedPlan)
  
  // Ödeme işlemi
  const handlePayment = async () => {
    if (!session) {
      toast({
        title: "Giriş yapmanız gerekiyor",
        description: "Ödeme yapabilmek için lütfen giriş yapın.",
        variant: "destructive",
      })
      router.push("/signin")
      return
    }
    
    setIsProcessing(true)
    
    try {
      // Seçilen planı localStorage'a kaydedelim
      localStorage.setItem('selectedPlan', JSON.stringify({
        id: currentPlan?.id,
        name: currentPlan?.name,
        price: currentPlan?.price,
        period: currentPlan?.period
      }));
      
      // Ödeme sayfasına yönlendir
      router.push("/payment/checkout");
      
    } catch (err) {
      console.error("Ödeme hatası:", err);
      toast({
        title: "Ödeme hatası",
        description: "Ödeme işlemi sırasında bir hata oluştu.",
        variant: "destructive",
      })
      setIsProcessing(false)
    }
  }

  // Plan değiştirme fonksiyonu
  const changePlan = (planId: string) => {
    setSelectedPlan(planId);
  }

  return (
    <div className="container mx-auto py-16 px-4">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold mb-4">SummarAI Pro Aboneliğini Seçin</h1>
        <p className="text-lg text-muted-foreground">
          Seçtiğiniz plan süresince sınırsız erişim elde edin
        </p>
      </motion.div>

      <div className="max-w-4xl mx-auto grid grid-cols-1 gap-8 lg:grid-cols-5">
        {/* Özellikler */}
        <Card className="p-6 lg:col-span-2">
          <h2 className="text-2xl font-bold mb-6">Pro Özellikleri</h2>
          <ul className="space-y-4">
            {proFeatures.map((feature, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100
                }}
                className="flex items-start"
                whileHover={{ 
                  x: 5, 
                  transition: { duration: 0.2 } 
                }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2 + index * 0.1, type: "spring", stiffness: 300 }}
                >
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                </motion.div>
                <span>{feature}</span>
              </motion.li>
            ))}
          </ul>
        </Card>

        {/* Plan seçimi */}
        <Card className="lg:col-span-3">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-6">Ödeme Planı</h2>
            
            {/* Plan seçim butonları */}
            <div className="grid grid-cols-3 gap-2 p-1 bg-muted rounded-lg mb-8 relative overflow-hidden">
              {/* Animasyonlu arka plan seçici */}
              <motion.div 
                className="absolute h-[calc(100%-8px)] top-1 rounded-md bg-primary"
                initial={{ left: "0%", width: "33.33%" }}
                animate={{ 
                  left: selectedPlan === "monthly" ? "0%" : selectedPlan === "quarterly" ? "33.33%" : "66.66%",
                  width: "33.33%" 
                }}
                transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
              />
              
              {pricingOptions.map((option, idx) => (
                <motion.div
                  key={option.id}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 * idx, duration: 0.4 }}
                  className="z-10 relative"
                >
                  <Button
                    variant="ghost"
                    className={`w-full relative z-10 ${selectedPlan === option.id ? 'text-white font-semibold' : ''}`}
                    onClick={() => changePlan(option.id)}
                  >
                    {option.name}
                  </Button>
                </motion.div>
              ))}
            </div>
            
            {/* Seçilen plan detayları */}
            <motion.div 
              className="space-y-4"
              key={selectedPlan}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="flex flex-col space-y-2">
                <span className="text-3xl font-bold">{currentPlan?.price}₺</span>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-muted-foreground line-through">{currentPlan?.normalPrice}₺</span>
                  {currentPlan?.saveText && (
                    <span className="text-sm font-medium text-green-600">{currentPlan.saveText}</span>
                  )}
                </div>
                <span className="text-muted-foreground">Bir {currentPlan?.period} için</span>
              </div>
              
              <ul className="space-y-2 mt-4 mb-6">
                <li className="flex items-center">
                  <Check className="h-4 w-4 text-green-500 mr-2" />
                  <span className="text-sm">Anında erişim</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 text-green-500 mr-2" />
                  <span className="text-sm">İstediğiniz zaman iptal edebilirsiniz</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 text-green-500 mr-2" />
                  <span className="text-sm">Güvenli ödeme</span>
                </li>
              </ul>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className="w-full mt-6"
            >
              <Button 
                onClick={handlePayment} 
                className="w-full" 
                size="lg" 
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center"
                  >
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    İşleniyor...
                  </motion.div>
                ) : (
                  <motion.span 
                    key={selectedPlan}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {`${currentPlan?.price}₺ Öde ve Pro'ya Yükselt`}
                  </motion.span>
                )}
              </Button>
            </motion.div>
            
            <p className="text-xs text-center text-muted-foreground mt-4">
              Ödeme yaparak <Link href="/footerPages/terms" className="underline">Kullanım Şartlarını</Link> ve {" "}
              <Link href="/footerPages/privacy" className="underline">Gizlilik Politikasını</Link> kabul etmiş olursunuz.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 