"use client"

import { motion } from "framer-motion"
import { Button } from "@/app/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Check } from "lucide-react"
import Link from "next/link"

export default function PricingPage() {
  return (
    <div className="container mx-auto py-10 px-4">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold text-center mb-4 bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text"
      >
        Fiyatlandırma Planları
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto"
      >
        İhtiyaçlarınıza uygun planı seçin ve hemen özetlemeye başlayın. Tüm planlar 7 günlük ücretsiz deneme içerir.
      </motion.p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card className="border-2 h-full flex flex-col">
            <CardHeader>
              <CardTitle className="text-xl">Ücretsiz</CardTitle>
              <CardDescription>Temel özetleme ihtiyaçları için</CardDescription>
              <div className="mt-4">
                <span className="text-4xl font-bold">0₺</span>
                <span className="text-muted-foreground ml-2">/ ay</span>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <ul className="space-y-2">
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <span>Günlük 5 özet</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <span>Maksimum 1000 karakter</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <span>Temel özet kalitesi</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <span>Web arayüzü</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full" variant="outline">
                <Link href="/signup">Ücretsiz Başla</Link>
              </Button>
            </CardFooter>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card className="border-2 border-blue-600 h-full flex flex-col relative">
            <div className="absolute top-0 right-0 bg-blue-600 text-white px-3 py-1 text-xs font-semibold rounded-bl-lg">
              EN POPÜLER
            </div>
            <CardHeader>
              <CardTitle className="text-xl">Pro</CardTitle>
              <CardDescription>Profesyonel kullanım için</CardDescription>
              <div className="mt-4">
                <span className="text-4xl font-bold">49₺</span>
                <span className="text-muted-foreground ml-2">/ ay</span>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <ul className="space-y-2">
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <span>Günlük 50 özet</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <span>Maksimum 5000 karakter</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <span>Gelişmiş özet kalitesi</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <span>Web arayüzü</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <span>Özet geçmişi</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <span>Öncelikli destek</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button
                asChild
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                <Link href="/signup">7 Gün Ücretsiz Dene</Link>
              </Button>
            </CardFooter>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Card className="border-2 h-full flex flex-col">
            <CardHeader>
              <CardTitle className="text-xl">Kurumsal</CardTitle>
              <CardDescription>Büyük ekipler ve şirketler için</CardDescription>
              <div className="mt-4">
                <span className="text-4xl font-bold">199₺</span>
                <span className="text-muted-foreground ml-2">/ ay</span>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <ul className="space-y-2">
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <span>Sınırsız özet</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <span>Sınırsız karakter</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <span>En yüksek özet kalitesi</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <span>Web arayüzü ve API erişimi</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <span>Özet geçmişi ve analitikler</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <span>7/24 öncelikli destek</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <span>Özel entegrasyonlar</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <span>Çoklu kullanıcı yönetimi</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full" variant="outline">
                <Link href="/footerPages/contact">Bizimle İletişime Geçin</Link>
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="mt-16 text-center max-w-3xl mx-auto"
      >
        <h2 className="text-2xl font-bold mb-4">Sıkça Sorulan Sorular</h2>
        <div className="space-y-6 mt-8 text-left">
          <div>
            <h3 className="font-semibold mb-2">Aboneliğimi istediğim zaman iptal edebilir miyim?</h3>
            <p className="text-muted-foreground">
              Evet, aboneliğinizi istediğiniz zaman iptal edebilirsiniz. İptal işlemi anında gerçekleşir ve bir sonraki
              ödeme döneminde ücretlendirilmezsiniz.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Ödeme yöntemleri nelerdir?</h3>
            <p className="text-muted-foreground">
              Kredi kartı, banka kartı ve havale/EFT ile ödeme yapabilirsiniz. Tüm ödemeleriniz güvenli bir şekilde
              işlenir.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">
              Ücretsiz deneme süresi sonunda otomatik olarak ücretlendirilir miyim?
            </h3>
            <p className="text-muted-foreground">
              Hayır, ücretsiz deneme süresi sonunda otomatik olarak ücretlendirilmezsiniz. Deneme süresi bitiminde size
              bir bildirim gönderilir ve devam etmek isteyip istemediğiniz sorulur.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Kurumsal plan için özel fiyatlandırma mümkün mü?</h3>
            <p className="text-muted-foreground">
              Evet, kurumsal planlar için özel fiyatlandırma mümkündür. İhtiyaçlarınıza uygun bir teklif için lütfen
              bizimle iletişime geçin.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

