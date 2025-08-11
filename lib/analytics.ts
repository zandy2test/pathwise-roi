// Basic Analytics Implementation
// Can be replaced with Google Analytics, Mixpanel, or other analytics providers

interface AnalyticsEvent {
  event: string
  properties?: Record<string, any>
  timestamp: Date
}

class Analytics {
  private events: AnalyticsEvent[] = []
  private sessionId: string
  
  constructor() {
    // Generate a unique session ID
    this.sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    
    // Initialize Vercel Analytics if available
    if (typeof window !== 'undefined' && window.va) {
      console.log('Vercel Analytics initialized')
    }
  }

  track(event: string, properties?: Record<string, any>) {
    const analyticsEvent: AnalyticsEvent = {
      event,
      properties: {
        ...properties,
        sessionId: this.sessionId,
        url: typeof window !== 'undefined' ? window.location.href : '',
        userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : ''
      },
      timestamp: new Date()
    }

    // Store event locally
    this.events.push(analyticsEvent)

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log('📊 Analytics Event:', event, properties)
    }

    // Send to Vercel Analytics if available
    if (typeof window !== 'undefined' && window.va) {
      window.va('event', { name: event, ...properties })
    }

    // Here you would send to your analytics provider
    // Example: Google Analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', event, properties)
    }

    // Example: Custom endpoint (commented out)
    // this.sendToEndpoint(analyticsEvent)
  }

  pageView(page: string) {
    this.track('page_view', { page })
  }

  calculationCompleted(pathName: string, roi: number, totalCost: number) {
    this.track('calculation_completed', {
      pathName,
      roi,
      totalCost,
      calculationType: 'single'
    })
  }

  comparisonCompleted(path1: string, path2: string, winner: string) {
    this.track('comparison_completed', {
      path1,
      path2,
      winner,
      calculationType: 'comparison'
    })
  }

  shareAttempted(method: 'webshare' | 'clipboard', success: boolean) {
    this.track('share_attempted', {
      method,
      success
    })
  }

  premiumClicked() {
    this.track('premium_clicked', {
      source: 'calculator'
    })
  }

  errorOccurred(error: string, context?: string) {
    this.track('error_occurred', {
      error,
      context
    })
  }

  // Get all events for debugging or export
  getEvents() {
    return this.events
  }

  // Clear stored events
  clearEvents() {
    this.events = []
  }

  // Example method to send events to a custom endpoint
  private async sendToEndpoint(event: AnalyticsEvent) {
    // Uncomment and configure when you have an analytics endpoint
    /*
    try {
      await fetch('/api/analytics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(event)
      })
    } catch (error) {
      console.error('Failed to send analytics event:', error)
    }
    */
  }
}

// Create singleton instance
const analytics = new Analytics()

// Export for use throughout the app
export default analytics

// Declare global types for window
declare global {
  interface Window {
    gtag?: (...args: any[]) => void
    va?: (...args: any[]) => void
  }
}
