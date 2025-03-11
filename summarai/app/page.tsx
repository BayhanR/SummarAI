"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/src/components/ui/button"
import { Textarea } from "@/src/components/ui/textarea"
import { toast } from "@/src/hooks/use-toast"
import { Copy, ClipboardPasteIcon as Paste } from "lucide-react"

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
      setSummary(
        "Bu, girdiğiniz metnin özeti olacaktır. Gerçek bir API entegre edildiğinde, burası AI tarafından oluşturulan özet ile doldurulacaktır.",
      )
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
    <main className="flex flex-col items-center justify-center p-8 space-y-8">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold text-primary"
      >
        Metninizi Özetleyin
      </motion.h1>
      <div className="w-full max-w-6xl flex flex-col md:flex-row gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex-1 space-y-4"
        >
          <Textarea
            placeholder="Özetlemek istediğiniz metni buraya girin..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            rows={10}
            className="w-full"
          />
          <div className="flex justify-between">
            <Button onClick={pasteFromClipboard} variant="outline">
              <Paste className="mr-2 h-4 w-4" /> Yapıştır
            </Button>
            <Button onClick={handleSummarize} disabled={isLoading}>
              {isLoading ? "Özetleniyor..." : "Özetle"}
            </Button>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex-1 space-y-4"
        >
          <Textarea value={summary} readOnly rows={10} className="w-full" placeholder="Özet burada görünecek..." />
          <div className="flex justify-end">
            <Button onClick={() => copyToClipboard(summary)} variant="outline" disabled={!summary}>
              <Copy className="mr-2 h-4 w-4" /> Kopyala
            </Button>
          </div>
        </motion.div>
      </div>
    </main>
  )
}

