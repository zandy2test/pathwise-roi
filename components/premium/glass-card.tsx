'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface GlassCardProps {
  children: React.ReactNode
  className?: string
  variant?: 'default' | 'dark' | 'gradient'
  hover?: boolean
}

export function GlassCard({
  children,
  className,
  variant = 'default',
  hover = true,
}: GlassCardProps) {
  const variants = {
    default: "glass",
    dark: "glass-dark",
    gradient: "bg-gradient-to-br from-premium-accent-primary/10 to-premium-accent-secondary/10 backdrop-blur-xl border border-white/10",
  }

  return (
    <motion.div
      whileHover={hover ? { scale: 1.02, y: -5 } : {}}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={cn(
        "rounded-xl p-6 transition-all duration-300",
        variants[variant],
        hover && "hover:shadow-2xl hover:shadow-premium-accent-primary/20",
        className
      )}
    >
      {children}
    </motion.div>
  )
}
