"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Loader2, Clock, FileText, ChevronDown, ChevronUp, Trash2 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { tr } from "date-fns/locale";
import { Button } from "@/app/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogCancel, AlertDialogAction } from "@/app/components/ui/alert-dialog";
import { toast } from "@/app/hooks/use-toast";

interface Summary {
  id: string;
  content: string;
  result: string;
  createdAt: string;
  language: string;
}

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      when: "beforeChildren",
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3 }
  }
};

export default function HistoryPage() {
  const { status } = useSession();
  const router = useRouter();
  const [summaries, setSummaries] = useState<Summary[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedSummaries, setExpandedSummaries] = useState<Record<string, boolean>>({});
  const [isClearing, setIsClearing] = useState(false);

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

  const clearHistory = async () => {
    try {
      setIsClearing(true);
      const response = await fetch("/api/summaries/clear", {
        method: "DELETE",
      });

      if (response.ok) {
        setSummaries([]);
        toast({
          title: "Başarılı",
          description: "Geçmiş başarıyla temizlendi.",
        });
      } else {
        throw new Error("Geçmiş temizlenirken bir hata oluştu");
      }
    } catch {
      toast({
        title: "Hata",
        description: "Geçmiş temizlenirken bir hata oluştu.",
        variant: "destructive",
      });
    } finally {
      setIsClearing(false);
    }
  };

  const toggleSummary = (id: string) => {
    setExpandedSummaries(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <motion.div 
      className="container py-10"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="flex gap-8">
        <div className="flex-1">
          <motion.div 
            className="flex justify-between items-center mb-8"
            variants={itemVariants}
          >
            <h1 className="text-3xl font-bold">Özet Geçmişi</h1>
            {summaries.length > 0 && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" disabled={isClearing}>
                    {isClearing ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Temizleniyor...
                      </>
                    ) : (
                      <>
                        <Trash2 className="mr-2 h-4 w-4" />
                        Geçmişi Temizle
                      </>
                    )}
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Geçmişi Temizle</AlertDialogTitle>
                    <AlertDialogDescription>
                      Tüm özet geçmişiniz silinecek. Bu işlem geri alınamaz.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>İptal</AlertDialogCancel>
                    <AlertDialogAction onClick={clearHistory}>
                      Evet, Temizle
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </motion.div>
          
          {summaries.length === 0 ? (
            <motion.div variants={itemVariants}>
              <Card className="border-2">
                <CardContent className="flex flex-col items-center justify-center py-10 text-center">
                  <FileText className="h-12 w-12 text-gray-400 mb-4" />
                  <p className="text-lg font-medium">Henüz özet oluşturmamışsınız</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Yeni bir metin özetlemek için ana sayfaya dönün
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            <motion.div 
              className="grid gap-6 md:grid-cols-2"
              variants={containerVariants}
            >
              {summaries.map((summary) => (
                <motion.div
                  key={summary.id}
                  variants={itemVariants}
                >
                  <Card className="border-2">
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
                        <div className="flex justify-between items-center">
                          <p className="text-sm text-muted-foreground">Özet:</p>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleSummary(summary.id)}
                            className="p-0 h-6"
                          >
                            {expandedSummaries[summary.id] ? (
                              <ChevronUp className="h-4 w-4" />
                            ) : (
                              <ChevronDown className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                        <AnimatePresence>
                          {expandedSummaries[summary.id] ? (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden"
                            >
                              <div className="border rounded-lg p-3 mt-2 space-y-3 bg-muted/50">
                                <div>
                                  <p className="text-sm font-medium mb-1">Orijinal Metin:</p>
                                  <p className="text-sm">{summary.content}</p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium mb-1">Özet:</p>
                                  <p className="text-sm">{summary.result}</p>
                                </div>
                              </div>
                            </motion.div>
                          ) : null}
                        </AnimatePresence>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}