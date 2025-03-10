"use client"

import { motion } from "framer-motion"

export function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.8 }}
      className="border-t py-6 md:py-0"
    >
      <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
        <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
          &copy; {new Date().getFullYear()} Summarai. Tüm hakları saklıdır.
        </p>
        <div className="flex items-center gap-4">
          <motion.a
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            href="#"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Hakkında
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            href="#"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Gizlilik
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            href="#"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            İletişim
          </motion.a>
        </div>
      </div>
    </motion.footer>
  )
}

