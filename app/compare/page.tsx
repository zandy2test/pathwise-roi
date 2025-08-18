"use client"

import { ArrowLeft, TrendingUp } from "lucide-react"
import Link from "next/link"
import { PathComparison } from "@/components/path-comparison"

export default function ComparePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link
              href="/"
              className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-['Open_Sans']">Back to Home</span>
            </Link>
            <div className="w-px h-6 bg-border"></div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-black font-['Montserrat'] text-gradient">PathwiseROI</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-black font-['Montserrat'] mb-4">Compare Education Paths</h1>
            <p className="text-lg text-muted-foreground font-['Open_Sans'] max-w-2xl mx-auto">
              Make informed decisions by comparing the ROI of different education options side-by-side
            </p>
          </div>

          <PathComparison />
        </div>
      </div>
    </div>
  )
}
