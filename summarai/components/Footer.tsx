import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-background border-t py-6 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-muted-foreground">© 2023 Summarai. Tüm hakları saklıdır.</p>
          </div>
          <div className="flex space-x-4">
            <Link href="/about" className="text-sm text-muted-foreground hover:text-primary">
              Hakkımızda
            </Link>
            <Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary">
              Gizlilik Politikası
            </Link>
            <Link href="/terms" className="text-sm text-muted-foreground hover:text-primary">
              Kullanım Şartları
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

