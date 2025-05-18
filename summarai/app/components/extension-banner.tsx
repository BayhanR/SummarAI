"use client";

import { useState, useEffect } from "react";
import { Button } from "@/app/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, X } from "lucide-react";
import { toast } from "@/app/hooks/use-toast";

declare global {
  interface Window {
    chrome?: {
      runtime?: {
        id?: string;
      };
    };
  }
}

export function ExtensionBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Local storage'dan banner durumunu kontrol et
    const bannerDismissed = localStorage.getItem('extensionBannerDismissed');
    if (!bannerDismissed) {
      setIsVisible(true);
    }
  }, []);

  const handleInstall = () => {
    const isChrome = typeof window !== "undefined" && window.chrome;
    
    if (isChrome) {
      window.open('https://chrome.google.com/webstore/detail/YOUR_EXTENSION_ID', '_blank');
    } else {
      window.open('https://addons.mozilla.org/firefox/addon/YOUR_ADDON_ID', '_blank');
    }
  };

  const handleDismiss = () => {
    setIsVisible(false);
    // Banner'ı kapattığını local storage'a kaydet
    localStorage.setItem('extensionBannerDismissed', 'true');
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, x: "100%" }}
          animate={{ opacity: 1, y: 0, x: "0%" }}
          exit={{ opacity: 0, y: 50, x: "100%" }}
          transition={{ type: "spring", damping: 20, stiffness: 100 }}
          className="fixed bottom-4 right-4 z-50 max-w-sm"
        >
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-blue-200 dark:border-blue-800 overflow-hidden">
            <div className="p-4">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg text-white">
                  <FileText size={24} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    SummarAI Eklentisi
                  </h3>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Tek tıkla metinleri özetleyin!
                  </p>
                </div>

                <button
                  onClick={handleDismiss}
                  className="flex-shrink-0 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 transition-colors"
                  aria-label="Kapat"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="mt-4 flex items-center space-x-3">
                <Button 
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                  onClick={handleInstall}
                >
                  Eklentiyi Yükle
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleDismiss}
                >
                  Daha Sonra
                </Button>
              </div>

              <div className="mt-3 flex items-center justify-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
                <span className="flex items-center">
                  <svg
                    className="h-3 w-3 mr-1"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                  Chrome & Firefox
                </span>
                <span className="flex items-center">
                  <svg
                    className="h-3 w-3 mr-1"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                  Ücretsiz
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 