"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Loader2 } from "lucide-react";

export default function VerifyEmailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        if (!token) {
          setStatus("error");
          setMessage("Doğrulama tokeni eksik");
          return;
        }

        const response = await fetch(`/api/verify-email?token=${token}`);
        
        if (response.ok) {
          setStatus("success");
          setMessage("E-posta adresiniz başarıyla doğrulandı!");
          // 3 saniye sonra giriş sayfasına yönlendir
          setTimeout(() => {
            router.push("/signin?verified=true");
          }, 3000);
        } else {
          const data = await response.json();
          setStatus("error");
          setMessage(data.message || "Doğrulama işlemi başarısız oldu");
        }
      } catch (error) {
        setStatus("error");
        setMessage("Bir hata oluştu. Lütfen daha sonra tekrar deneyin.");
      }
    };

    verifyEmail();
  }, [token, router]);

  return (
    <div className="container flex items-center justify-center min-h-[calc(100vh-12rem)] py-10">
      <Card className="w-full max-w-md border-2">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            E-posta Doğrulama
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-4">
          {status === "loading" && (
            <>
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="text-center text-muted-foreground">
                E-posta adresiniz doğrulanıyor...
              </p>
            </>
          )}

          {status === "success" && (
            <>
              <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                <svg
                  className="h-5 w-5 text-green-500"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-center text-green-600 font-medium">{message}</p>
              <p className="text-center text-sm text-muted-foreground">
                Giriş sayfasına yönlendiriliyorsunuz...
              </p>
            </>
          )}

          {status === "error" && (
            <>
              <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center">
                <svg
                  className="h-5 w-5 text-red-500"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <p className="text-center text-red-600 font-medium">{message}</p>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
} 