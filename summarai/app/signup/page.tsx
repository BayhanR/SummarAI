"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { toast } from "@/app/hooks/use-toast"
import { Loader2 } from "lucide-react"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/app/components/ui/form"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/app/components/ui/card"

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Kullanıcı adı en az 2 karakter olmalıdır.",
  }),
  email: z.string().email({
    message: "Geçerli bir e-posta adresi giriniz.",
  }),
  password: z.string().min(6, {
    message: "Şifre en az 6 karakter olmalıdır.",
  }),
})

export default function SignUpPage() {
  const router = useRouter()

  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: values.email,
          name: values.username,
          password: values.password
        })
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          title: "Kayıt Başarılı!",
          description: "Lütfen e-posta adresinizi doğrulayın.",
        });
        router.push("/verify-pending");
      } else {
        toast({
          title: "Kayıt Başarısız!",
          description: data.message || "Bir hata oluştu.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Hata!",
        description: "Kayıt sırasında bir hata oluştu. Lütfen tekrar deneyin.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="container flex items-center justify-center min-h-[calc(100vh-12rem)] py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="border-2">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Hesap Oluştur</CardTitle>
            <CardDescription className="text-center">
              Yeni bir hesap oluşturarak özetleme özelliklerine erişin
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Kullanıcı Adı</FormLabel>
                      <FormControl>
                        <Input placeholder="kullaniciadi" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>E-posta</FormLabel>
                      <FormControl>
                        <Input placeholder="ornek@email.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Şifre</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="******" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Kaydediliyor...
                    </>
                  ) : (
                    "Kayıt Ol"
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter>
            <div className="mt-4 text-center text-sm w-full">
              Zaten hesabınız var mı?{" "}
              <Link href="/signin" className="text-blue-600 hover:underline">
                Giriş yap
              </Link>
            </div>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}

async function register(username: string, email: string, password: string): Promise<boolean> {
  try {
    const response = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: username,
        email,
        password,
      }),
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || 'Kayıt işlemi başarısız');
    }

    return true;
  } catch (error) {
    console.error('Kayıt hatası:', error);
    return false;
  }
}

