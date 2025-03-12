"use client"

import { motion } from "framer-motion"

export default function CookiesPage() {
  return (
    <div className="container mx-auto py-10 px-4">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text"
      >
        Çerez Politikası
      </motion.h1>

      <div className="max-w-4xl mx-auto prose dark:prose-invert">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }}>
          <p className="lead">Son güncelleme: 11 Mart 2023</p>

          <p>
            Bu Çerez Politikası, Summarai'nin web sitesinde çerezleri ve benzer teknolojileri nasıl kullandığını
            açıklar. Sitemizi kullanarak, bu politikada açıklanan çerez kullanımını kabul etmiş olursunuz.
          </p>

          <h2>1. Çerezler Nedir?</h2>
          <p>
            Çerezler, web sitelerinin bilgisayarınıza veya mobil cihazınıza yerleştirdiği küçük metin dosyalarıdır.
            Çerezler, web sitelerinin sizi tanımasına, tercihlerinizi hatırlamasına ve size daha iyi bir deneyim
            sunmasına yardımcı olur.
          </p>

          <h2>2. Kullandığımız Çerez Türleri</h2>
          <p>Summarai, aşağıdaki türde çerezleri kullanabilir:</p>
          <ul>
            <li>
              <strong>Zorunlu Çerezler:</strong> Bu çerezler, web sitemizin düzgün çalışması için gereklidir ve
              sistemlerimizde kapatılamazlar.
            </li>
            <li>
              <strong>Performans Çerezleri:</strong> Bu çerezler, ziyaretçilerin web sitemizi nasıl kullandığı hakkında
              bilgi toplar ve web sitemizin performansını ölçmemize yardımcı olur.
            </li>
            <li>
              <strong>İşlevsellik Çerezleri:</strong> Bu çerezler, web sitemizi kullanırken yaptığınız seçimleri
              hatırlar ve size daha kişiselleştirilmiş bir deneyim sunar.
            </li>
            <li>
              <strong>Hedefleme Çerezleri:</strong> Bu çerezler, ilgi alanlarınıza göre size özel reklamlar göstermek
              için kullanılır.
            </li>
          </ul>

          <h2>3. Üçüncü Taraf Çerezleri</h2>
          <p>
            Web sitemizde, üçüncü taraf hizmet sağlayıcılarımız tarafından yerleştirilen çerezler de bulunabilir. Bu
            üçüncü taraflar, analitik, reklam ve sosyal medya özellikleri sağlamak için çerezleri kullanabilir.
          </p>

          <h2>4. Çerezleri Nasıl Kontrol Edebilirsiniz?</h2>
          <p>
            Çoğu web tarayıcısı, çerezleri kabul etmeyi veya reddetmeyi seçmenize olanak tanır. Tarayıcınızın ayarlarını
            değiştirerek çerezleri kontrol edebilirsiniz. Ancak, çerezleri devre dışı bırakırsanız, web sitemizin bazı
            özellikleri düzgün çalışmayabilir.
          </p>
          <p>Çerezleri nasıl kontrol edeceğiniz hakkında daha fazla bilgi için tarayıcınızın yardım sayfasına bakın:</p>
          <ul>
            <li>
              <a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer">
                Google Chrome
              </a>
            </li>
            <li>
              <a
                href="https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop"
                target="_blank"
                rel="noopener noreferrer"
              >
                Mozilla Firefox
              </a>
            </li>
            <li>
              <a
                href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac"
                target="_blank"
                rel="noopener noreferrer"
              >
                Safari
              </a>
            </li>
            <li>
              <a
                href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09"
                target="_blank"
                rel="noopener noreferrer"
              >
                Microsoft Edge
              </a>
            </li>
          </ul>

          <h2>5. Değişiklikler</h2>
          <p>
            Bu Çerez Politikasını herhangi bir zamanda değiştirme hakkını saklı tutarız. Değişiklikler, web sitemizde
            yayınlandıktan sonra geçerli olacaktır.
          </p>

          <h2>6. İletişim</h2>
          <p>
            Bu Çerez Politikası hakkında herhangi bir sorunuz varsa, lütfen info@summarai.com adresinden bizimle
            iletişime geçin.
          </p>
        </motion.div>
      </div>
    </div>
  )
}

