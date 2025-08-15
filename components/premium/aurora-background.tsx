'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface AuroraBackgroundProps {
  children: React.ReactNode
  className?: string
  showRadialGradient?: boolean
  gradientFrom?: string
  gradientTo?: string
}

export function AuroraBackground({
  children,
  className,
  showRadialGradient = true,
  gradientFrom = "premium-accent-primary",
  gradientTo = "premium-accent-secondary",
}: AuroraBackgroundProps) {
  return (
    <div className={cn(
      "relative flex flex-col h-full min-h-screen bg-premium-bg-primary overflow-hidden",
      className
    )}>
      <div className="absolute inset-0 overflow-hidden">
        <div
          className={cn(
            "aurora-bg",
            "[--aurora-bg-from:#6366f1]",
            "[--aurora-bg-to:#8b5cf6]",
            "opacity-40",
            "after:content-[''] after:absolute after:inset-0",
            "after:bg-gradient-to-b after:from-transparent after:via-premium-bg-primary/50 after:to-premium-bg-primary",
            showRadialGradient && "before:absolute before:inset-0 before:bg-radial-gradient"
          )}
        />
        
        {/* Animated blobs */}
        <motion.div
          initial={{ opacity: 0.5, scale: 0.8 }}
          animate={{
            scale: [0.8, 1.2, 0.8],
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -top-20 -left-20 w-96 h-96 bg-gradient-to-br from-premium-accent-primary/20 to-premium-accent-secondary/20 rounded-full filter blur-3xl"
        />
        
        <motion.div
          initial={{ opacity: 0.5, scale: 0.8 }}
          animate={{
            scale: [0.8, 1.1, 0.8],
            x: [0, -100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 5,
          }}
          className="absolute -bottom-20 -right-20 w-96 h-96 bg-gradient-to-bl from-premium-accent-secondary/20 to-premium-accent-primary/20 rounded-full filter blur-3xl"
        />
      </div>
      
      <div className="relative z-10 flex flex-col h-full">
        {children}
      </div>
    </div>
  )
}
