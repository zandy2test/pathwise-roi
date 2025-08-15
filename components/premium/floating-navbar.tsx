'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface FloatingNavbarProps {
  className?: string
}

export function FloatingNavbar({ className }: FloatingNavbarProps) {
  const [visible, setVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      if (currentScrollY < 50) {
        setVisible(true)
      } else if (currentScrollY > lastScrollY) {
        setVisible(false)
      } else {
        setVisible(true)
      }
      
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  return (
    <AnimatePresence mode="wait">
      {visible && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className={cn(
            "fixed top-4 left-1/2 -translate-x-1/2 z-50",
            className
          )}
        >
          <nav className="glass-dark px-8 py-4 rounded-full flex items-center gap-8">
            <Link 
              href="/"
              className="text-premium-text-primary hover:text-premium-accent-primary transition-colors font-semibold"
            >
              PathwiseROI
            </Link>
            
            <div className="flex items-center gap-6">
              <Link 
                href="/calculate"
                className="text-premium-text-secondary hover:text-premium-text-primary transition-colors"
              >
                Calculate
              </Link>
              <Link 
                href="/how-it-works"
                className="text-premium-text-secondary hover:text-premium-text-primary transition-colors"
              >
                How It Works
              </Link>
              <Link 
                href="/results"
                className="text-premium-text-secondary hover:text-premium-text-primary transition-colors"
              >
                Results
              </Link>
            </div>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
