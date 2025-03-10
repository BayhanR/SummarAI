"use client"

import React, { createContext, useContext, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from 'lucide-react'

interface ToastOptions {
  id: string
  title: string
  description: string
  variant?: "default" | "destructive" | "success"
}

const ToastContext = createContext<{
  toast: (options: Omit<ToastOptions, "id">) => void
  toasts: ToastOptions[]
  removeToast: (id: string) => void
}>({
  toast: () => {},
  toasts: [],
  removeToast: () => {},
})

const variants = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, x: 100 },
}

const getVariantStyles = (variant?: string) => {
  switch (variant) {
    case 'destructive':
      return 'bg-red-600 text-white'
    case 'success':
      return 'bg-green-600 text-white'
    default:
      return 'bg-white text-gray-900 dark:bg-gray-800 dark:text-white'
  }
}

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastOptions[]>([])

  const toast = (options: Omit<ToastOptions, "id">) => {
    const id = Math.random().toString()
    setToasts((prev) => [...prev, { ...options, id }])
    setTimeout(() => {
      removeToast(id)
    }, 3000)
  }

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }

  return (
    <ToastContext.Provider value={{ toast, toasts, removeToast }}>
      {children}
      <Toast />
    </ToastContext.Provider>
  )
}

export const useToast = () => {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider")
  }
  return context
}

export function Toast() {
  const { toasts, removeToast } = useToast()

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            className={`${getVariantStyles(
              toast.variant
            )} min-w-[300px] rounded-lg p-4 shadow-lg`}
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="font-medium">{toast.title}</h3>
                {toast.description && (
                  <p className="mt-1 text-sm opacity-90">{toast.description}</p>
                )}
              </div>
              <button
                onClick={() => removeToast(toast.id)}
                className="text-current opacity-70 hover:opacity-100"
              >
                <X size={18} />
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}