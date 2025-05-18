"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Mail } from "lucide-react";

export default function VerifyPendingPage() {
  return (
    <div className="container flex items-center justify-center min-h-[calc(100vh-12rem)] py-10">
      <Card className="w-full max-w-md border-2">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            E-posta Doğrulaması Gerekli
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
            <Mail className="h-8 w-8 text-blue-500" />
          </div>
          <div className="text-center space-y-4">
            <p className="text-lg font-medium">
              Neredeyse hazır!
            </p>
            <p className="text-muted-foreground">
              Size bir doğrulama e-postası gönderdik. Lütfen e-posta adresinizi kontrol edin ve hesabınızı doğrulamak için e-postadaki bağlantıya tıklayın.
            </p>
            <div className="pt-4 text-sm text-muted-foreground">
              <p>E-posta almadınız mı?</p>
              <p>Spam klasörünüzü kontrol edin veya birkaç dakika bekleyin.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 