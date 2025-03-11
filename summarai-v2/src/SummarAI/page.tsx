"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { Copy, ClipboardPaste, Loader2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export default function Home() {
  const [inputText, setInputText] = useState("")
  const [summary, setSummary] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSummarize = async () => {
    if (!inputText.trim()) {
      toast({
        title: "Hata",
        description: "Lütfen özetlemek için bir metin girin.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    try {
      // Burada gerçek API çağrısı yapılacak
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Basit bir özet simülasyonu
      const sentences = inputText.split(/[.!?]+/).filter(Boolean)
      const summaryText = sentences.length > 3 ? sentences.slice(0, 3).join(". ") + "." : inputText

      setSummary(summaryText)

      toast({
        title: "Başarılı",
        description: "Metin başarıyla özetlendi.",
      })
    } catch (error) {
      toast({
        title: "Hata",
        description: "Özet oluşturulurken bir hata oluştu.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Kopyalandı",
      description: "Metin panoya kopyalandı.",
    })
  }

  const pasteFromClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText()
      setInputText(text)
      toast({
        title: "Yapıştırıldı",
        description: "Metin panodan yapıştırıldı.",
      })
    } catch (error) {
      toast({
        title: "Hata",
        description: "Panodan metin yapıştırılırken bir hata oluştu.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text"
      >
        Metninizi Anında Özetleyin
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto"
      >
        Yapay zeka destekli özetleme aracımız ile uzun metinlerinizi saniyeler içinde özetleyin. Makaleler, haberler,
        akademik çalışmalar ve daha fazlası için ideal.
      </motion.p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card className="h-full">
            <CardContent className="p-6 space-y-4">
              <h2 className="text-xl font-semibold">Metin Girişi</h2>
              <Textarea
                placeholder="Özetlemek istediğiniz metni buraya girin veya yapıştırın..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="min-h-[300px] resize-none"
              />
              <div className="flex justify-between">
                <Button onClick={pasteFromClipboard} variant="outline" className="gap-2">
                  <ClipboardPaste className="h-4 w-4" />
                  Yapıştır
                </Button>
                <Button
                  onClick={handleSummarize}
                  disabled={isLoading || !inputText.trim()}
                  className="gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Özetleniyor...
                    </>
                  ) : (
                    "Özetle"
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card className="h-full">
            <CardContent className="p-6 space-y-4">
              <h2 className="text-xl font-semibold">Özet</h2>
              <Textarea
                value={summary}
                readOnly
                placeholder="Özet burada görünecek..."
                className="min-h-[300px] resize-none"
              />
              <div className="flex justify-end">
                <Button
                  onClick={() => copyToClipboard(summary)}
                  variant="outline"
                  disabled={!summary}
                  className="gap-2"
                >
                  <Copy className="h-4 w-4" />
                  Kopyala
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="mt-16 text-center"
      >
        <h2 className="text-2xl font-bold mb-4">Neden Summarai?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-8">
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-semibold mb-2">Zaman Tasarrufu</h3>
            <p className="text-sm text-muted-foreground">
              Uzun metinleri saniyeler içinde özetleyerek zamanınızı verimli kullanın.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-semibold mb-2">Yapay Zeka Destekli</h3>
            <p className="text-sm text-muted-foreground">
              En son teknoloji yapay zeka modelleri ile doğru ve anlamlı özetler elde edin.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-semibold mb-2">Kullanımı Kolay</h3>
            <p className="text-sm text-muted-foreground">
              Basit ve kullanıcı dostu arayüz ile herkes kolayca kullanabilir.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

