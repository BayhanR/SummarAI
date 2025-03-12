"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/app/components/ui/card"

export default function AboutPage() {
  return (
    <div className="container mx-auto py-10 px-4">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text"
      >
        Hakkımızda
      </motion.h1>

      <div className="max-w-4xl mx-auto space-y-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-4">Vizyonumuz</h2>
              <p className="text-muted-foreground">
                Summarai olarak vizyonumuz, yapay zeka teknolojisini kullanarak insanların bilgiye erişimini
                kolaylaştırmak ve zamanlarını daha verimli kullanmalarını sağlamaktır. Günümüzde bilgi bolluğu içinde
                boğulmak çok kolay. Biz, bu bilgi okyanusunda insanlara rehberlik etmek ve önemli bilgileri hızlıca
                özümsemelerine yardımcı olmak istiyoruz.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-4">Hikayemiz</h2>
              <p className="text-muted-foreground mb-4">
                Summarai, 2023 yılında bir grup teknoloji tutkunu tarafından kuruldu. Hepimiz, günlük hayatımızda çok
                fazla bilgiye maruz kalıyor ve bunları işlemekte zorlanıyorduk. Makaleler, raporlar, haberler, akademik
                çalışmalar... Hepsini okumak ve anlamak için yeterli zamanımız yoktu.
              </p>
              <p className="text-muted-foreground">
                Bu sorunu çözmek için yapay zeka destekli bir metin özetleme aracı geliştirmeye karar verdik. Amacımız,
                insanların zamanlarını daha verimli kullanmalarını sağlamak ve bilgiye erişimlerini kolaylaştırmaktı.
                Böylece Summarai doğdu.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-4">Ekibimiz</h2>
              <p className="text-muted-foreground mb-6">
                Summarai, yapay zeka, doğal dil işleme ve web geliştirme alanlarında uzman bir ekip tarafından
                geliştirilmektedir. Ekibimiz, kullanıcılarımıza en iyi deneyimi sunmak için sürekli olarak
                çalışmaktadır.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-4 flex items-center justify-center">
                    <span className="text-white text-2xl font-bold">AY</span>
                  </div>
                  <h3 className="font-semibold">Ahmet Yılmaz</h3>
                  <p className="text-sm text-muted-foreground">Kurucu & CEO</p>
                </div>

                <div className="text-center">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-4 flex items-center justify-center">
                    <span className="text-white text-2xl font-bold">MK</span>
                  </div>
                  <h3 className="font-semibold">Mehmet Kaya</h3>
                  <p className="text-sm text-muted-foreground">CTO</p>
                </div>

                <div className="text-center">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-4 flex items-center justify-center">
                    <span className="text-white text-2xl font-bold">ZA</span>
                  </div>
                  <h3 className="font-semibold">Zeynep Aydın</h3>
                  <p className="text-sm text-muted-foreground">Yapay Zeka Uzmanı</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-4">Teknolojimiz</h2>
              <p className="text-muted-foreground mb-4">
                Summarai, en son yapay zeka ve doğal dil işleme teknolojilerini kullanarak metinleri analiz eder ve
                özetler. Algoritmalarımız, metnin ana fikrini ve önemli noktalarını belirleyerek, anlamlı ve özlü
                özetler oluşturur.
              </p>
              <p className="text-muted-foreground">
                Sürekli olarak teknolojimizi geliştiriyor ve kullanıcı geri bildirimlerini dikkate alarak iyileştirmeler
                yapıyoruz. Amacımız, kullanıcılarımıza en doğru ve kullanışlı özetleri sunmaktır.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

