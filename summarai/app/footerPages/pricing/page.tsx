"use client"

import { Button } from "@/app/components/ui/button"
import { Card } from "@/app/components/ui/card"
import { Check } from "lucide-react"
import Link from "next/link"

const pricingPlans = [
  {
    name: "Ücretsiz",
    price: "0₺",
    description: "Temel özellikler",
    features: [
      "Günlük 5 özet hakkı",
      "Temel özet kalitesi",
      "E-posta desteği",
      "Reklamlı arayüz"
    ],
    buttonText: "Mevcut Plan",
    disabled: true
  },
  {
    name: "Pro",
    price: "99₺/ay",
    description: "Profesyonel kullanım için",
    features: [
      "Günlük 50 özet hakkı",
      "Gelişmiş özet kalitesi",
      "Öncelikli destek",
      "Özel dil seçenekleri",
      "Reklamsız deneyim",
      "Özet geçmişi"
    ],
    buttonText: "Pro'ya Yükselt",
    disabled: false,
    highlight: true
  },
  {
    name: "Kurumsal",
    price: "Teklif alın",
    description: "Büyük ekipler ve şirketler için",
    features: [
      "Sınırsız özet hakkı",
      "En yüksek özet kalitesi",
      "7/24 öncelikli destek",
      "Tüm dil seçenekleri",
      "API erişimi",
      "Özel entegrasyonlar",
      "Çoklu kullanıcı yönetimi",
      "Detaylı kullanım analitikleri"
    ],
    buttonText: "İletişime Geç",
    disabled: false,
    href: "/footerPages/contact"
  }
]

export default function PricingPage() {
  return (
    <div className="container mx-auto py-16 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Fiyatlandırma Planları</h1>
        <p className="text-lg text-muted-foreground">
          İhtiyaçlarınıza uygun planı seçin
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {pricingPlans.map((plan) => (
          <Card 
            key={plan.name} 
            className={`p-8 relative ${plan.highlight ? 'border-2 border-primary' : ''}`}
          >
            {plan.highlight && (
              <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 text-xs font-semibold rounded-bl-lg">
                EN POPÜLER
              </div>
            )}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-2">{plan.name}</h2>
              <p className="text-4xl font-bold mb-4">{plan.price}</p>
              <p className="text-muted-foreground">{plan.description}</p>
            </div>

            <ul className="space-y-4 mb-8">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  {feature}
                </li>
              ))}
            </ul>

            <Button 
              className="w-full" 
              disabled={plan.disabled}
              variant={plan.highlight ? "default" : "outline"}
              asChild={!!plan.href}
            >
              {plan.href ? (
                <Link href={plan.href}>{plan.buttonText}</Link>
              ) : (
                plan.buttonText
              )}
            </Button>
          </Card>
        ))}
      </div>
    </div>
  )
}

