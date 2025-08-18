'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface AnimatedTextProps {
  text: string
  className?: string
  delay?: number
  gradient?: boolean
}

export function AnimatedText({
  text,
  className,
  delay = 0,
  gradient = false,
}: AnimatedTextProps) {
  const words = text.split(' ')

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: delay },
    }),
  }

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        damping: 12,
        stiffness: 200,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring" as const,
        damping: 12,
        stiffness: 200,
      },
    },
  }

  return (
    <motion.div
      className={cn("overflow-hidden", className)}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {words.map((word, index) => (
        <motion.span
          variants={child}
          key={index}
          className={cn(
            "inline-block mr-2",
            gradient && "bg-gradient-to-r from-premium-accent-primary to-premium-accent-secondary bg-clip-text text-transparent"
          )}
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  )
}
