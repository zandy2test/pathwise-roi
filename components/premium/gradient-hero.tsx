'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface GradientHeroProps {
  children: React.ReactNode
  className?: string
  variant?: 'default' | 'mesh' | 'radial'
}

export function GradientHero({
  children,
  className,
  variant = 'default',
}: GradientHeroProps) {
  const variants = {
    default: "bg-gradient-to-br from-premium-bg-primary via-premium-bg-secondary to-premium-bg-primary",
    mesh: "bg-[radial-gradient(ellipse_at_top_left,_var(--color-accent-primary)_0%,_transparent_50%),radial-gradient(ellipse_at_bottom_right,_var(--color-accent-secondary)_0%,_transparent_50%)]",
    radial: "bg-[radial-gradient(circle_at_center,_var(--color-accent-primary)_0%,_transparent_25%),radial-gradient(circle_at_center,_var(--color-accent-secondary)_0%,_transparent_50%)]",
  }

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className={cn(
        "relative min-h-[80vh] flex items-center justify-center overflow-hidden",
        variants[variant],
        className
      )}
    >
      {/* Animated mesh overlay */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent" />
      </div>
      
      {/* Floating orbs */}
      <motion.div
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-br from-premium-accent-primary/10 to-transparent rounded-full filter blur-3xl"
      />
      
      <motion.div
        animate={{
          x: [0, -100, 0],
          y: [0, 50, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-bl from-premium-accent-secondary/10 to-transparent rounded-full filter blur-3xl"
      />
      
      <div className="relative z-10 w-full">
        {children}
      </div>
    </motion.section>
  )
}
