'use client'

import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface SpotlightCardProps {
  children: React.ReactNode
  className?: string
  spotlightColor?: string
  radius?: number
}

export function SpotlightCard({
  children,
  className,
  spotlightColor = "premium-accent-primary",
  radius = 350,
}: SpotlightCardProps) {
  const divRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return
    const rect = divRef.current.getBoundingClientRect()
    setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "relative overflow-hidden rounded-xl border border-premium-accent-primary/20 bg-premium-bg-secondary/50 p-8 backdrop-blur-xl",
        className
      )}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300"
        animate={{
          opacity: isHovered ? 1 : 0,
        }}
        style={{
          background: `radial-gradient(${radius}px circle at ${mousePosition.x}px ${mousePosition.y}px, hsl(var(--color-accent-primary) / 0.15), transparent 40%)`,
        }}
      />
      
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}
