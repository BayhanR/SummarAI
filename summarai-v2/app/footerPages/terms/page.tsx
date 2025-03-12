"use client"

import { motion } from "framer-motion"

export default function TermsPage() {
  return (
    <div className="container mx-auto py-10 px-4">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text"
      >
        Kullanım Şartları
      </motion.h1>

      <div className="max-w-4xl mx-auto prose dark:prose-invert">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }}>
          <p className="lead">Son güncelleme: 11 Mart 2023</p>

          <h2>1. Giriş</h2>
          <p>
            Bu Kullanım Şartları, Summarai web sitesini ve hizmetlerini kullanımınızı düzenleyen şartları ve koşulları
            içerir. Sitemizi kullanarak, bu şartları kabul etmiş olursunuz. Lütfen bu şartları dikkatlice okuyun.
          </p>

          <h2>2. Tanımlar</h2>
          <p>
            <strong>"Summarai"</strong>, <strong>"biz"</strong>, <strong>"bize"</strong> veya <strong>"bizim"</strong>{" "}
            ifadeleri, Summarai'yi ifade eder <strong>"bize"</strong> veya <strong>"bizim"</strong> ifadeleri,
            Summarai'yi ifade eder.
          </p>

          <p>
            <strong>"Hizmet"</strong> veya <strong>"Hizmetler"</strong>, Summarai tarafından sağlanan tüm ürünleri,
            hizmetleri, içerikleri ve özellikleri ifade eder.
          </p>

          <p>
            <strong>"Kullanıcı"</strong>, <strong>"siz"</strong> veya <strong>"sizin"</strong> ifadeleri, Summarai'yi
            kullanan kişiyi ifade eder.
          </p>

          <h2>3. Hesap Oluşturma</h2>
          <p>
            Bazı hizmetlerimizi kullanabilmek için bir hesap oluşturmanız gerekebilir. Hesap oluşturduğunuzda, doğru,
            güncel ve eksiksiz bilgiler sağlamakla yükümlüsünüz. Hesap bilgilerinizin gizliliğini korumak ve hesabınızda
            gerçekleşen tüm etkinliklerden sorumlu olmak sizin sorumluluğunuzdadır.
          </p>

          <h2>4. Hizmet Kullanımı</h2>
          <p>
            Summarai'yi kullanırken, tüm geçerli yasalara ve düzenlemelere uymayı kabul edersiniz. Ayrıca, aşağıdakileri
            yapmamayı kabul edersiniz:
          </p>
          <ul>
            <li>Hizmetlerimizi yasadışı amaçlarla kullanmak</li>
            <li>Hizmetlerimizin güvenliğini ihlal etmek veya etmeye çalışmak</li>
            <li>Diğer kullanıcıların hizmetlerimizi kullanmasını engellemek</li>
            <li>Hizmetlerimizi, diğer kullanıcılara zarar verecek şekilde kullanmak</li>
            <li>Hizmetlerimizi, istenmeyen e-posta veya reklam göndermek için kullanmak</li>
          </ul>

          <h2>5. Fikri Mülkiyet</h2>
          <p>
            Summarai ve içeriği, ticari markalar, telif hakları, ticari sırlar ve diğer fikri mülkiyet hakları dahil
            olmak üzere, Summarai'ye veya lisans verenlerine aittir. Summarai'nin önceden yazılı izni olmadan,
            Summarai'nin içeriğini kopyalayamaz, değiştiremez, dağıtamaz veya başka bir şekilde kullanamaz veya
            çoğaltamazsınız.
          </p>

          <h2>6. Gizlilik</h2>
          <p>
            Kişisel verilerinizin nasıl toplandığını, kullanıldığını ve paylaşıldığını anlamak için lütfen Gizlilik
            Politikamızı okuyun.
          </p>

          <h2>7. Değişiklikler</h2>
          <p>
            Bu Kullanım Şartlarını herhangi bir zamanda değiştirme hakkını saklı tutarız. Değişiklikler, web sitemizde
            yayınlandıktan sonra geçerli olacaktır. Değişikliklerden sonra hizmetlerimizi kullanmaya devam etmeniz,
            değiştirilmiş şartları kabul ettiğiniz anlamına gelir.
          </p>

          <h2>8. Sorumluluk Reddi</h2>
          <p>
            Hizmetlerimiz "olduğu gibi" ve "mevcut olduğu şekilde" sunulmaktadır. Summarai, hizmetlerimizin kesintisiz,
            güvenli veya hatasız olacağını garanti etmez. Summarai, hizmetlerimizin kullanımından kaynaklanan herhangi
            bir doğrudan, dolaylı, tesadüfi, özel veya sonuç olarak ortaya çıkan zararlardan sorumlu değildir.
          </p>

          <h2>9. İletişim</h2>
          <p>
            Bu Kullanım Şartları hakkında herhangi bir sorunuz varsa, lütfen info@summarai.com adresinden bizimle
            iletişime geçin.
          </p>
        </motion.div>
      </div>
    </div>
  )
}

