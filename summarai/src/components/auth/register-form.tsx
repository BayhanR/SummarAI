"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/toast"
import { motion } from "framer-motion"

export function RegisterForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Şifreler eşleşmiyor",
        description: "Lütfen şifrelerin aynı olduğundan emin olun",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          name: formData.name,
          password: formData.password,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Kayıt olurken bir hata oluştu")
      }

      // Başarılı kayıt
      localStorage.setItem("token", data.token)
      toast({
        title: "Kayıt başarılı",
        description: "Hesabınız oluşturuldu!",
      })

      // Ana sayfaya yönlendirme
      router.push("/")
    } catch (error) {
      toast({
        title: "Kayıt başarısız",
        description: error instanceof Error ? error.message : "Bir hata oluştu",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mx-auto max-w-sm space-y-6"
    >
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Kayıt Ol</h1>
        <p className="text-muted-foreground">Yeni bir hesap oluşturarak özetleme özelliklerine erişin</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="username">Kullanıcı Adı</Label>
          <Input
            id="username"
            name="username"
            placeholder="kullanici_adi"
            required
            value={formData.username}
            onChange={handleChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="ornek@email.com"
            required
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="name">Ad Soyad (İsteğe bağlı)</Label>
          <Input id="name" name="name" placeholder="Ad Soyad" value={formData.name} onChange={handleChange} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Şifre</Label>
          <Input
            id="password"
            name="password"
            type="password"
            required
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Şifre Tekrar</Label>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            required
            value={formData.confirmPassword}
            onChange={handleChange}
          />
        </div>
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Kayıt Olunuyor...
            </>
          ) : (
            "Kayıt Ol"
          )}
        </Button>
      </form>
      <div className="text-center text-sm">
        Zaten bir hesabınız var mı?{" "}
        <Button variant="link" className="h-auto p-0" onClick={() => router.push("/login")}>
          Giriş Yap
        </Button>
      </div>
    </motion.div>
  )
}

