import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t py-8 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">SummarAI</h3>
            <p className="text-sm text-muted-foreground">
              Yapay zeka destekli metin özetleme aracı ile zamanınızı verimli kullanın.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Bağlantılar</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm text-muted-foreground hover:text-primary">
                  Ana Sayfa
                </Link>
              </li>
              <li>
                <Link href="/footerPages/about" className="text-sm text-muted-foreground hover:text-primary">
                  Hakkımızda
                </Link>
              </li>
              <li>
                <Link href="/footerPages/pricing" className="text-sm text-muted-foreground hover:text-primary">
                  Fiyatlandırma
                </Link>
              </li>
              <li>
                <Link href="/footerPages/contact" className="text-sm text-muted-foreground hover:text-primary">
                  İletişim
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Yasal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/footerPages/terms" className="text-sm text-muted-foreground hover:text-primary">
                  Kullanım Şartları
                </Link>
              </li>
              <li>
                <Link href="/footerPages/privacy" className="text-sm text-muted-foreground hover:text-primary">
                  Gizlilik Politikası
                </Link>
              </li>
              <li>
                <Link href="/footerPages/cookies" className="text-sm text-muted-foreground hover:text-primary">
                  Çerez Politikası
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">İletişim</h3>
            <ul className="space-y-2">
              <li className="text-sm text-muted-foreground">info@summarai.com</li>
              <li className="text-sm text-muted-foreground">+90 506 140 4727</li>
              <li className="text-sm text-muted-foreground">İzmir, Türkiye</li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Summarai. Tüm hakları saklıdır.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link href="#" className="text-muted-foreground hover:text-primary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-primary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-primary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

