"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/app/components/ui/button"
import { Textarea } from "@/app/components/ui/textarea"
import { toast } from "@/app/hooks/use-toast"
import { Copy, ClipboardPasteIcon as Paste } from "lucide-react"
import axios from 'axios'
import { ExtensionBanner } from "@/app/components/extension-banner"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"

interface ApiResponse {
  summary?: string;
  error?: string;
  redirectTo?: string;
  detail?: Array<{
    type: string;
    loc: string[];
    msg: string;
    input: Record<string, unknown>;
  }>;
}

interface UserStats {
  dailyUsage: number;
  emailVerified: boolean;
  userType?: string;
  dailyLimit?: number;
}

export default function Home() {
  const router = useRouter()
  const { data: session } = useSession()
  const [inputText, setInputText] = useState("")
  const [summary, setSummary] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [userStats, setUserStats] = useState<UserStats | null>(null)

  // Kullanıcı istatistiklerini al
  useEffect(() => {
    const fetchUserStats = async () => {
      if (session?.user) {
        try {
          const response = await axios.get<UserStats>('/api/user/stats');
          setUserStats(response.data);
        } catch (error) {
          console.error('Kullanıcı istatistikleri alınamadı:', error);
        }
      }
    };

    fetchUserStats();
  }, [session]);

  const handleSubmit = async (e?: React.FormEvent | null) => {
    if (e) e.preventDefault();
    
    if (!inputText.trim()) {
      toast({
        title: "Hata",
        description: "Lütfen özetlenecek bir metin girin",
        variant: "destructive",
      });
      return;
    }

    // Metindeki fazla boşlukları temizle
    // Birden fazla satır boşluğunu tek satıra indirir
    // Birden fazla boşluğu tek boşluğa indirir
    const cleanedText = inputText
      .replace(/(\r\n|\n|\r){2,}/g, '\n')  // Birden fazla satır sonunu tek satır yapar
      .replace(/[ \t]{2,}/g, ' ');         // Birden fazla boşluğu tek boşluk yapar

    setIsLoading(true);

    try {
      const result = await axios.post<ApiResponse>('/api/summarize', {
        content: cleanedText
      });

      if (result.data.detail) {
        toast({
          title: "Hata",
          description: result.data.detail[0]?.msg || 'Bilinmeyen hata',
          variant: "destructive",
        });
        return;
      }

      // Özet başarılı olduysa kullanıcı istatistiklerini güncelle
      if (session?.user) {
        const statsResponse = await axios.get<UserStats>('/api/user/stats');
        setUserStats(statsResponse.data);
      }

      setSummary(result.data.summary || '');
    } catch (err) {
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosError = err as { message: string; response?: { data: ApiResponse } };
        
        // Eğer 401 hatası (giriş yapılmamış) ise
        if (axiosError.response?.data?.redirectTo === '/signin') {
          toast({
            title: "Giriş Gerekli",
            description: "Özet oluşturmak için lütfen giriş yapın",
            variant: "destructive",
          });
          router.push('/signin');
          return;
        }

        // Eğer pricing sayfasına yönlendirme varsa
        if (axiosError.response?.data?.redirectTo === '/footerPages/pricing') {
          toast({
            title: "Günlük Limit Doldu",
            description: "Daha fazla özet oluşturmak için premium üyeliğe geçin",
            variant: "destructive",
          });
          router.push('/footerPages/pricing');
          return;
        }

        toast({
          title: "Hata",
          description: axiosError.response?.data?.error || axiosError.message,
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

  // URL'den metni al ve otomatik özetle
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const encodedText = searchParams.get('t');
    const autoSummarize = searchParams.get('autoSummarize');
    
    if (encodedText) {
      try {
        // Base64 decode
        const decodedText = decodeURIComponent(escape(atob(encodedText)));
        setInputText(decodedText);
        
        // Eğer autoSummarize parametresi varsa hemen özetle
        if (autoSummarize === 'true') {
          handleSubmit(null);
        }
      } catch (error) {
        console.error('Metin decode edilirken hata:', error);
        toast({
          title: "Hata",
          description: "Metin işlenirken bir hata oluştu",
          variant: "destructive",
        });
      }
    }
  }, []);

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
    } catch (err) {
      console.error('Pano hatası:', err);
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

      {session?.user && userStats && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-muted/50 rounded-lg px-4 py-2 text-sm text-muted-foreground"
        >
          {userStats.userType === "pro" ? (
            <div className="flex items-center">
              <span className="bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-md mr-2 font-medium">PRO</span>
              Kalan özet hakkı: <span className="font-semibold mx-1">{userStats.dailyLimit && userStats.dailyUsage !== undefined ? userStats.dailyLimit - userStats.dailyUsage : 50 - userStats.dailyUsage}</span>
              / {userStats.dailyLimit || 50}
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <div>
                Kalan özet hakkı: <span className="font-medium">{userStats.dailyLimit && userStats.dailyUsage !== undefined ? userStats.dailyLimit - userStats.dailyUsage : (userStats.emailVerified ? 5 - userStats.dailyUsage : 1 - userStats.dailyUsage)}</span>
                / {userStats.dailyLimit || (userStats.emailVerified ? 5 : 1)}
              </div>
              <Button variant="link" className="p-0 h-auto text-xs text-primary underline decoration-dotted" onClick={() => router.push('/footerPages/pricing')}>
                Pro&apos;ya yükselt
              </Button>
            </div>
          )}
        </motion.div>
      )}

      <div className="container max-w-6xl mx-auto">
        <div className="w-full flex flex-col md:flex-row gap-8">
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
      </div>
      <ExtensionBanner />
    </main>
  )
} 