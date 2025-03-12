"use client"

import { motion } from "framer-motion"

export default function PrivacyPage() {
  return (
    <div className="container mx-auto py-10 px-4">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text"
      >
        Gizlilik Politikası
      </motion.h1>

      <div className="max-w-4xl mx-auto prose dark:prose-invert">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }}>
          <p className="lead">Son güncelleme: 11 Mart 2023</p>

          <p>
            Bu Gizlilik Politikası, Summarai'nin kişisel verilerinizi nasıl topladığını, kullandığını, paylaştığını ve
            koruduğunu açıklar. Sitemizi kullanarak, bu politikada açıklanan uygulamaları kabul etmiş olursunuz.
          </p>

          <h2>1. Topladığımız Bilgiler</h2>
          <p>Summarai, aşağıdaki türde kişisel bilgileri toplayabilir:</p>
          <ul>
            <li>
              <strong>Hesap Bilgileri:</strong> Adınız, e-posta adresiniz, kullanıcı adınız ve şifreniz gibi hesap
              oluşturma sırasında sağladığınız bilgiler.
            </li>
            <li>
              <strong>Kullanım Bilgileri:</strong> Hizmetlerimizi nasıl kullandığınıza dair bilgiler, özetlediğiniz
              metinler ve etkileşimde bulunduğunuz özellikler.
            </li>
            <li>
              <strong>Cihaz Bilgileri:</strong> IP adresi, tarayıcı türü, işletim sistemi ve cihaz tanımlayıcıları gibi
              cihazınızla ilgili bilgiler.
            </li>
            <li>
              <strong>Ödeme Bilgileri:</strong> Ücretli hizmetlerimizi kullanıyorsanız, ödeme işlemlerini
              gerçekleştirmek için gerekli bilgiler.
            </li>
          </ul>

          <h2>2. Bilgileri Kullanma Amacımız</h2>
          <p>Topladığımız bilgileri aşağıdaki amaçlarla kullanabiliriz:</p>
          <ul>
            <li>Hesabınızı oluşturmak ve yönetmek</li>
            <li>Hizmetlerimizi sağlamak ve iyileştirmek</li>
            <li>Müşteri desteği sağlamak</li>
            <li>Güvenlik ve dolandırıcılık önleme</li>
            <li>Yasal yükümlülüklere uymak</li>
            <li>Size özel teklifler ve güncellemeler göndermek (izin verdiğiniz takdirde)</li>
          </ul>

          <h2>3. Bilgilerin Paylaşılması</h2>
          <p>Kişisel bilgilerinizi aşağıdaki durumlarda üçüncü taraflarla paylaşabiliriz:</p>
          <ul>
            <li>
              <strong>Hizmet Sağlayıcılar:</strong> Hizmetlerimizi sağlamamıza yardımcı olan üçüncü taraf hizmet
              sağlayıcılarla (ödeme işlemcileri, hosting sağlayıcıları gibi).
            </li>
            <li>
              <strong>Yasal Gereklilikler:</strong> Yasal bir yükümlülüğe uymak, Summarai'nin haklarını veya güvenliğini
              korumak, yasadışı faaliyetleri önlemek veya soruşturmak için gerekli olduğunda.
            </li>
            <li>
              <strong>İş Transferleri:</strong> Bir birleşme, satın alma veya varlık satışı durumunda, kişisel
              bilgileriniz aktarılan varlıklar arasında olabilir.
            </li>
          </ul>

          <h2>4. Veri Güvenliği</h2>
          <p>
            Kişisel bilgilerinizi korumak için uygun teknik ve organizasyonel önlemleri alıyoruz. Ancak, internet
            üzerinden hiçbir veri iletiminin veya elektronik depolamanın %100 güvenli olmadığını unutmayın.
          </p>

          <h2>5. Veri Saklama</h2>
          <p>
            Kişisel bilgilerinizi, hizmetlerimizi sağlamak için gerekli olduğu sürece veya yasal yükümlülüklerimizi
            yerine getirmek için gerekli olduğu sürece saklarız.
          </p>

          <h2>6. Çerezler ve Benzer Teknolojiler</h2>
          <p>
            Summarai, çerezler ve benzer teknolojiler kullanarak deneyiminizi kişiselleştirmek, site kullanımını analiz
            etmek ve hizmetlerimizi iyileştirmek için bilgi toplar. Çerezleri nasıl kontrol edeceğiniz hakkında daha
            fazla bilgi için Çerez Politikamıza bakın.
          </p>

          <h2>7. Haklarınız</h2>
          <p>Kişisel verilerinizle ilgili olarak aşağıdaki haklara sahipsiniz:</p>
          <ul>
            <li>Kişisel verilerinize erişim talep etme</li>
            <li>Yanlış veya eksik kişisel verilerin düzeltilmesini talep etme</li>
            <li>Belirli koşullar altında kişisel verilerinizin silinmesini talep etme</li>
            <li>Kişisel verilerinizin işlenmesine itiraz etme</li>
            <li>Kişisel verilerinizin taşınabilirliğini talep etme</li>
          </ul>

          <h2>8. Çocukların Gizliliği</h2>
          <p>
            Hizmetlerimiz 13 yaşın altındaki çocuklara yönelik değildir. 13 yaşın altındaki çocuklardan bilerek kişisel
            bilgi toplamıyoruz.
          </p>

          <h2>9. Değişiklikler</h2>
          <p>
            Bu Gizlilik Politikasını herhangi bir zamanda değiştirme hakkını saklı tutarız. Değişiklikler, web sitemizde
            yayınlandıktan sonra geçerli olacaktır.
          </p>

          <h2>10. İletişim</h2>
          <p>
            Bu Gizlilik Politikası hakkında herhangi bir sorunuz varsa, lütfen info@summarai.com adresinden bizimle
            iletişime geçin.
          </p>
        </motion.div>
      </div>
    </div>
  )
}

