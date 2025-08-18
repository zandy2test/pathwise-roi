'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Home, ArrowLeft, Search, AlertTriangle } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-red-950 to-black flex items-center justify-center p-4">
      <Card className="max-w-lg w-full bg-gray-900/90 border-red-900/50 backdrop-blur-sm">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <AlertTriangle className="h-16 w-16 text-red-500" />
              <span className="absolute -top-1 -right-1 text-4xl font-bold text-red-400">404</span>
            </div>
          </div>
          <CardTitle className="text-3xl text-white">
            Page Not Found
          </CardTitle>
          <CardDescription className="text-gray-400 text-lg">
            Oops! Looks like you've ventured into uncharted territory.
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="bg-red-950/30 border border-red-600/30 rounded-lg p-4">
            <p className="text-gray-300 text-center">
              The page you're looking for doesn't exist or may have been moved.
            </p>
          </div>

          <div className="space-y-3">
            <Link href="/" className="block">
              <Button className="w-full bg-red-600 hover:bg-red-700 text-white">
                <Home className="h-4 w-4 mr-2" />
                Go to Homepage
              </Button>
            </Link>
            
            <Button
              onClick={() => window.history.back()}
              variant="outline"
              className="w-full border-gray-600 text-gray-300 hover:bg-gray-800"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Go Back
            </Button>
          </div>

          <div className="pt-4 border-t border-gray-800">
            <p className="text-center text-sm text-gray-500">
              Lost? Try these popular pages:
            </p>
            <div className="flex flex-wrap gap-2 justify-center mt-3">
              <Link href="/calculate" className="text-red-400 hover:text-red-300 text-sm underline">
                Calculator
              </Link>
              <span className="text-gray-600">•</span>
              <Link href="/how-it-works" className="text-red-400 hover:text-red-300 text-sm underline">
                How It Works
              </Link>
              <span className="text-gray-600">•</span>
              <Link href="/results" className="text-red-400 hover:text-red-300 text-sm underline">
                Results
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
