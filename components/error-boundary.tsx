'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertTriangle, RefreshCw, Home } from 'lucide-react'

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
  errorInfo: React.ErrorInfo | null
}

interface ErrorBoundaryProps {
  children: React.ReactNode
  fallback?: React.ComponentType<{
    error: Error | null
    resetError: () => void
  }>
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    }
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return {
      hasError: true,
      error
    }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error boundary caught an error:', error, errorInfo)
    
    this.setState({
      error,
      errorInfo
    })

    // You could also log the error to an error reporting service here
    // For example: analytics.errorOccurred(error.message, errorInfo.componentStack)
  }

  resetError = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null
    })
  }

  render() {
    if (this.state.hasError) {
      // Use custom fallback if provided
      if (this.props.fallback) {
        const FallbackComponent = this.props.fallback
        return <FallbackComponent error={this.state.error} resetError={this.resetError} />
      }

      // Default error UI
      return (
        <div className="min-h-screen bg-gradient-to-br from-black via-red-950 to-black flex items-center justify-center p-4">
          <Card className="max-w-lg w-full bg-gray-900/90 border-red-900/50 backdrop-blur-sm">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <AlertTriangle className="h-12 w-12 text-red-500" />
              </div>
              <CardTitle className="text-2xl text-white">
                Oops! Something went wrong
              </CardTitle>
              <CardDescription className="text-gray-400">
                The application encountered an unexpected error. Don't worry, your data is safe.
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="bg-red-950/30 border border-red-600/30 rounded-lg p-4">
                <h4 className="text-red-400 font-semibold mb-2">Error Details:</h4>
                <p className="text-sm text-gray-300 font-mono break-words">
                  {this.state.error?.message || 'Unknown error occurred'}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  onClick={this.resetError}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Try Again
                </Button>
                
                <Button
                  onClick={() => window.location.href = '/'}
                  variant="outline"
                  className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-800"
                >
                  <Home className="h-4 w-4 mr-2" />
                  Go Home
                </Button>
              </div>

              <div className="text-center text-sm text-gray-500">
                If this problem persists, please refresh the page or try again later.
              </div>
            </CardContent>
          </Card>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary