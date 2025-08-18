'use client'

import Link from "next/link"
import { Calculator, Heart } from "lucide-react"

interface FooterProps {
  onPremiumClick?: () => void
}

export function Footer({ onPremiumClick }: FooterProps = {}) {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="mt-auto border-t bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="text-center md:text-left">
            <Link href="/" className="flex items-center justify-center md:justify-start gap-2 mb-3">
              <span className="font-bold text-xl">PathwiseROI</span>
              <span className="text-blue-600 font-medium">| Scam Score™</span>
            </Link>
            <p className="text-sm text-gray-600">
              Make smarter education decisions with data-driven insights
            </p>
          </div>
          
          {/* Quick Links */}
          <div className="text-center">
            <h3 className="font-semibold mb-3">Quick Links</h3>
            <div className="space-y-2">
              <Link href="/" className="block text-sm text-gray-600 hover:text-blue-600 transition-colors">
                ROI Calculator
              </Link>
              <Link href="/how-it-works" className="block text-sm text-gray-600 hover:text-blue-600 transition-colors">
                How It Works
              </Link>
              {onPremiumClick ? (
                <button 
                  onClick={onPremiumClick}
                  className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Premium Features
                </button>
              ) : (
                <Link href="#premium" className="block text-sm text-gray-600 hover:text-blue-600 transition-colors">
                  Premium Features
                </Link>
              )}
            </div>
          </div>
          
          {/* Legal Links */}
          <div className="text-center md:text-right">
            <h3 className="font-semibold mb-3">Legal</h3>
            <div className="space-y-2">
              <Link href="/privacy" className="block text-sm text-gray-600 hover:text-blue-600 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="block text-sm text-gray-600 hover:text-blue-600 transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-600">
              © {currentYear} PathwiseROI. All rights reserved. | v1.3.0 (Phase 1)
            </p>
            <p className="text-sm text-gray-600 flex items-center gap-1">
              Made with <Heart className="h-3 w-3 text-red-500 fill-red-500" /> for students everywhere
            </p>
          </div>
        </div>
        
        {/* Social Proof */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            Trusted by thousands of students making informed education decisions
          </p>
        </div>
      </div>
    </footer>
  )
}
