"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/app/components/ui/button"
import { Textarea } from "@/app/components/ui/textarea"
import { toast } from "@/app/hooks/use-toast"
import { Copy, ClipboardPasteIcon as Paste } from "lucide-react"
import axios from 'axios'

interface ApiResponse {
  summary?: string;
  detail?: Array<{
    type: string;
    loc: string[];
    msg: string;
    input: Record<string, unknown>;
  }>;
}

export default function Home() {
  const [inputText, setInputText] = useState("")
  const [summary, setSummary] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await axios.post<ApiResponse>('/api/proxy', {
        content: inputText
      });

      if (result.data.detail) {
        toast({
          title: "Hata",
          description: result.data.detail[0]?.msg || 'Bilinmeyen hata',
          variant: "destructive",
        });
        return;
      }

      setSummary(result.data.summary || '');
    } catch (err) {
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosError = err as { message: string; response?: { data: unknown } };
        toast({
          title: "Hata",
          description: `API hatası: ${axiosError.message}`,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Hata",
          description: "Özet oluşturulurken bir hata oluştu",
          variant: "destructive",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

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
            <Button onClick={handleSubmit} disabled={isLoading}>
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
          <Textarea 
            value={summary} 
            readOnly 
            rows={10} 
            className="w-full" 
            placeholder="Özet burada görünecek..." 
          />
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

