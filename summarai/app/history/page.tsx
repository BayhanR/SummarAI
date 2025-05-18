"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Loader2, Clock, FileText } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { tr } from "date-fns/locale";

interface Summary {
  id: string;
  content: string;
  result: string;
  createdAt: string;
  language: string;
}

export default function HistoryPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [summaries, setSummaries] = useState<Summary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/signin");
    }

    if (status === "authenticated") {
      fetchSummaries();
    }
  }, [status, router]);

  const fetchSummaries = async () => {
    try {
      const response = await fetch("/api/summaries");
      const data = await response.json();
      setSummaries(data);
    } catch (error) {
      console.error("Özetler yüklenirken hata oluştu:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-8">Özet Geçmişi</h1>
      
      {summaries.length === 0 ? (
        <Card className="border-2">
          <CardContent className="flex flex-col items-center justify-center py-10 text-center">
            <FileText className="h-12 w-12 text-gray-400 mb-4" />
            <p className="text-lg font-medium">Henüz özet oluşturmamışsınız</p>
            <p className="text-sm text-muted-foreground mt-2">
              Yeni bir metin özetlemek için ana sayfaya dönün
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {summaries.map((summary) => (
            <Card key={summary.id} className="border-2">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="truncate flex-1">
                    {summary.content.slice(0, 50)}...
                  </div>
                  <span className="text-sm text-muted-foreground ml-2 flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {formatDistanceToNow(new Date(summary.createdAt), {
                      addSuffix: true,
                      locale: tr
                    })}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Özet:</p>
                  <p className="text-sm">{summary.result.slice(0, 200)}...</p>
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-xs text-muted-foreground">
                      Dil: {summary.language.toUpperCase()}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
} 