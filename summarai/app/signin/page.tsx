"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
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
import { Icons } from "@/app/components/icons"
import { signIn } from "next-auth/react"

const formSchema = z.object({
  email: z.string().email({
    message: "Lütfen geçerli bir e-posta adresi girin.",
  }),
  password: z.string().min(6, {
    message: "Şifre en az 6 karakter uzunluğunda olmalıdır.",
  }),
})

export default function SignInPage() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const isVerified = searchParams.get("verified") === "true"

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  useEffect(() => {
    if (isVerified) {
      toast({
        title: "E-posta Doğrulandı!",
        description: "E-posta adresiniz başarıyla doğrulandı. Şimdi giriş yapabilirsiniz.",
        variant: "default"
      });
    }
  }, [isVerified]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)

    try {
      const result = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
        callbackUrl: '/'
      })

      if (result?.error) {
        toast({
          title: "Giriş Başarısız!",
          description: "E-posta veya şifre hatalı.",
          variant: "destructive",
        })
      } else {
        toast({
          title: "Giriş Başarılı!",
          description: "Hoş geldiniz!",
        })
        router.push("/")
        router.refresh()
      }
    } catch (error) {
      console.error('Giriş hatası:', error);
      toast({
        title: "Hata!",
        description: "Giriş sırasında bir hata oluştu. Lütfen tekrar deneyin.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-[350px]">
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl">Giriş Yap</CardTitle>
            <p className="text-sm text-muted-foreground">Hesabınıza erişmek için e-posta ve şifrenizi girin.</p>
          </CardHeader>
          <CardContent className="grid gap-2">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>E-posta</FormLabel>
                      <FormControl>
                        <Input placeholder="ornek@eposta.com" {...field} />
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
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button disabled={isLoading} className="w-full">
                  {isLoading ? (
                    <>
                      <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                      Lütfen Bekleyin...
                    </>
                  ) : (
                    "Giriş Yap"
                  )}
                </Button>
              </form>
            </Form>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">Veya</span>
              </div>
            </div>
            <Button variant="outline" disabled={isLoading} className="w-full">
              {isLoading ? (
                <>
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  Lütfen Bekleyin...
                </>
              ) : (
                <>
                  <Icons.github className="mr-2 h-4 w-4" />
                  Github ile Giriş Yap
                </>
              )}
            </Button>
          </CardContent>
          <div className="px-6 pb-4 text-center text-sm">
            Hesabınız yok mu?{" "}
            <Link href="/signup" className="font-semibold text-primary">
              Kayıt Ol
            </Link>
          </div>
        </Card>
      </motion.div>
    </div>
  )
}

