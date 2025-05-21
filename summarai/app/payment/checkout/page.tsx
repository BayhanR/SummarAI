"use client"

import { useState, useEffect } from "react"
import { Button } from "@/app/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Input } from "@/app/components/ui/input"
import { Label } from "@/app/components/ui/label"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { CreditCard, LockIcon } from "lucide-react"
import { toast } from "@/app/hooks/use-toast"

interface SelectedPlan {
  id: string;
  name: string;
  price: number;
  period: string;
}

export default function CheckoutPage() {
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<SelectedPlan | null>(null);
  
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvc, setCardCvc] = useState("");

  useEffect(() => {
    // Client tarafında çalıştığında localStorage'dan seçilen planı al
    const savedPlan = localStorage.getItem('selectedPlan');
    if (savedPlan) {
      try {
        const plan = JSON.parse(savedPlan);
        setSelectedPlan(plan);
      } catch (e) {
        console.error("Plan bilgisi çözümlenemedi:", e);
        router.push("/payment/plans");
      }
    } else {
      // Plan bilgisi yoksa plan seçim sayfasına yönlendir
      router.push("/payment/plans");
    }
  }, [router]);

  const formatCardNumber = (value: string) => {
    // Boşlukları kaldır ve sadece sayıları al
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    
    // 16 haneden fazlasını kesip 4'lü gruplar halinde formatla
    const matches = v.substring(0, 16).match(/\d{1,4}/g);
    const formatted = matches ? matches.join(' ') : '';
    return formatted;
  };

  const formatExpiry = (value: string) => {
    // Boşlukları kaldır ve sadece sayıları al
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    
    // MM/YY formatına çevir
    if (v.length >= 2) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`;
    }
    return v;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basit form doğrulama
    if (!cardNumber || cardNumber.length < 16) {
      toast({
        title: "Geçersiz kart numarası",
        description: "Lütfen geçerli bir kart numarası girin.",
        variant: "destructive",
      });
      return;
    }
    
    if (!cardName) {
      toast({
        title: "Kart sahibi bilgisi eksik",
        description: "Lütfen kart üzerindeki ismi girin.",
        variant: "destructive",
      });
      return;
    }
    
    if (!cardExpiry || cardExpiry.length < 5) {
      toast({
        title: "Geçersiz son kullanma tarihi",
        description: "Lütfen geçerli bir son kullanma tarihi girin (AA/YY).",
        variant: "destructive",
      });
      return;
    }
    
    if (!cardCvc || cardCvc.length < 3) {
      toast({
        title: "Geçersiz güvenlik kodu",
        description: "Lütfen kartın arkasındaki güvenlik kodunu girin.",
        variant: "destructive",
      });
      return;
    }

    // Ödeme işlemini simüle et
    setIsProcessing(true);
    
    // Önce ödeme işlemini simüle ediyoruz (gerçek uygulamada burada ödeme API'sine istek yapılacak)
    setTimeout(async () => {
      try {
        // Ödeme başarılı olduğunda, kullanıcıyı Pro hesaba yükselt
        const upgradeResponse = await fetch('/api/user/upgrade', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            planId: selectedPlan?.id
          }),
        });

        if (!upgradeResponse.ok) {
          const errorData = await upgradeResponse.json();
          throw new Error(errorData.error || 'Pro üyelik aktivasyonu başarısız');
        }

        const upgradeData = await upgradeResponse.json();
        
        // Pro üyelik başarıyla aktifleştirildi
        toast({
          title: "Pro Üyelik Aktif!",
          description: upgradeData.message || "Artık günlük 50 özet hakkına sahipsiniz!",
        });
        
        // Başarılı ödeme sayfasına yönlendir
        router.push("/payment/success");
      } catch (error) {
        console.error("Ödeme/yükseltme hatası:", error);
        setIsProcessing(false);
        toast({
          title: "Hata",
          description: error instanceof Error ? error.message : "Ödeme sırasında bir hata oluştu",
          variant: "destructive",
        });
      }
    }, 2000);
  };

  return (
    <div className="container mx-auto py-16 px-4 min-h-[calc(100vh-12rem)]">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center"
      >
        <h1 className="text-4xl font-bold mb-2">Ödeme</h1>
        <p className="text-muted-foreground mb-8">Aboneliğinizi tamamlamak için ödeme bilgilerinizi girin</p>
      </motion.div>

      <div className="max-w-2xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Seçilen plan özeti */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Seçilen Paket</CardTitle>
            </CardHeader>
            <CardContent>
              {selectedPlan ? (
                <div className="space-y-4">
                  <div>
                    <p className="text-lg font-semibold">{selectedPlan.name} Plan</p>
                    <p className="text-muted-foreground">{selectedPlan.period} süreli abonelik</p>
                  </div>
                  
                  <div className="border-t pt-4">
                    <div className="flex justify-between">
                      <span>Toplam</span>
                      <span className="font-bold">{selectedPlan.price}₺</span>
                    </div>
                  </div>
                </div>
              ) : (
                <p>Yükleniyor...</p>
              )}
            </CardContent>
          </Card>

          {/* Ödeme formu */}
          <Card className="md:col-span-3">
            <CardHeader>
              <CardTitle>Ödeme Bilgileri</CardTitle>
              <CardDescription>Güvenli ödeme ile işleminizi tamamlayın</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="cardNumber">Kart Numarası</Label>
                  <div className="relative">
                    <Input
                      id="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                      maxLength={19}
                      className="pl-10"
                      required
                    />
                    <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cardName">Kart Üzerindeki İsim</Label>
                  <Input
                    id="cardName"
                    placeholder="Ad Soyad"
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="cardExpiry">Son Kullanma Tarihi</Label>
                    <Input
                      id="cardExpiry"
                      placeholder="AA/YY"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(formatExpiry(e.target.value))}
                      maxLength={5}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cardCvc">Güvenlik Kodu (CVC)</Label>
                    <Input
                      id="cardCvc"
                      placeholder="123"
                      value={cardCvc}
                      onChange={(e) => setCardCvc(e.target.value.replace(/[^0-9]/g, '').substring(0, 3))}
                      maxLength={3}
                      required
                    />
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full"
              >
                <Button 
                  onClick={handleSubmit} 
                  className="w-full" 
                  size="lg" 
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <div className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Ödeme İşleniyor...
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <LockIcon className="mr-2 h-4 w-4" />
                      Güvenli Ödeme Yap
                    </div>
                  )}
                </Button>
              </motion.div>
            </CardFooter>
          </Card>
        </div>
        
        <div className="flex justify-center mt-8">
          <p className="text-xs text-center text-muted-foreground max-w-md">
            Ödeme bilgileriniz SSL bağlantısı üzerinden güvenli bir şekilde işlenir. 
            Kartınızdan çekim yapılmadan önce onayınız alınacaktır.
          </p>
        </div>
      </div>
    </div>
  );
} 