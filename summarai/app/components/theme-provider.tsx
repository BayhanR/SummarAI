"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { useEffect, useState } from "react"

export function ThemeProvider({ children, ...props }: React.ComponentProps<typeof NextThemesProvider>) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    
    const checkTime = () => {
      const now = new Date()
      const hour = now.getHours()
      const isDarkTime = hour >= 19 || hour < 6
      const currentTheme = localStorage.getItem('theme')

      // Sadece otomatik mod aktifse tema değişikliği yap
      if (currentTheme === 'auto' || !currentTheme) {
        if (isDarkTime) {
          document.documentElement.classList.add('dark')
          localStorage.setItem('theme', 'dark')
        } else {
          document.documentElement.classList.remove('dark')
          localStorage.setItem('theme', 'light')
        }
      }
    }

    // Sayfa yüklendiğinde kontrol et
    checkTime()

    // Her dakika kontrol et
    const interval = setInterval(checkTime, 60000)

    return () => clearInterval(interval)
  }, [])

  // Hydrasyon uyumsuzluğunu önlemek için ilk render'da null döndür
  if (!mounted) {
    return null
  }

  return (
    <NextThemesProvider 
      attribute="class" 
      defaultTheme="system" 
      enableSystem
      {...props}
    >
      {children}
    </NextThemesProvider>
  )
}


