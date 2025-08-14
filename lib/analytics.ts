// Basic Analytics Implementation
// Can be replaced with Google Analytics, Mixpanel, or other analytics providers

type AnalyticsPropertyValue = string | number | boolean | null | undefined

interface AnalyticsEvent {
  event: string
  properties?: Record<string, AnalyticsPropertyValue>
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
      // Vercel Analytics initialized
    }
  }

  track(event: string, properties?: Record<string, AnalyticsPropertyValue>) {
    const analyticsEvent: AnalyticsEvent = {
      event,
      properties: {
        ...properties,
        sessionId: this.sessionId,
        url: typeof window !== 'undefined' ? window.location.href : '',
        userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
        timestamp: Date.now(),
        viewport: typeof window !== 'undefined' ? 
          `${window.innerWidth}x${window.innerHeight}` : '',
        referrer: typeof document !== 'undefined' ? document.referrer : ''
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
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', event, properties || {})
    }

    // Example: Custom endpoint (commented out)
    // this.sendToEndpoint(analyticsEvent)
  }

  // Page and Navigation Events
  pageView(page: string, previousPage?: string) {
    this.track('page_view', { 
      page,
      previousPage,
      timeOnPreviousPage: this.getTimeOnPage()
    })
    this.setCurrentPage(page)
  }

  // Path Selection Events
  pathSelected(educationType: string, field?: string, specialization?: string) {
    this.track('path_selected', {
      educationType,
      field,
      specialization,
      step: specialization ? 3 : field ? 2 : 1
    })
  }

  pathChanged(from: string, to: string, step: number) {
    this.track('path_changed', {
      from,
      to,
      step
    })
  }

  // Cost Input Events
  costEntered(costType: string, value: number, pathName: string) {
    this.track('cost_entered', {
      costType,
      value,
      pathName,
      isValid: value >= 0
    })
  }

  // Calculation Events
  calculationStarted(pathName: string, mode: 'single' | 'comparison') {
    this.track('calculation_started', {
      pathName,
      mode,
      timestamp: Date.now()
    })
  }

  calculationCompleted(pathName: string, roi: number, totalCost: number, breakEvenYears?: number) {
    this.track('calculation_completed', {
      pathName,
      roi,
      totalCost,
      breakEvenYears,
      calculationType: 'single',
      conversionEvent: true // Mark as conversion
    })
  }

  comparisonCompleted(path1: string, path2: string, winner: string, path1ROI: number, path2ROI: number) {
    this.track('comparison_completed', {
      path1,
      path2,
      winner,
      path1ROI,
      path2ROI,
      roiDifference: Math.abs(path1ROI - path2ROI),
      calculationType: 'comparison',
      conversionEvent: true // Mark as conversion
    })
  }

  // Share Events
  shareButtonClicked(platform: string) {
    this.track('share_button_clicked', {
      platform,
      hasResults: true
    })
  }

  shareAttempted(method: 'webshare' | 'clipboard' | 'social', platform?: string, success?: boolean) {
    this.track('share_attempted', {
      method,
      platform,
      success,
      shareType: method === 'social' ? 'social_media' : method
    })
  }

  shareCompleted(platform: string) {
    this.track('share_completed', {
      platform,
      conversionEvent: true // Mark as conversion
    })
  }

  // Timeline Interaction Events
  timelineViewed(duration: number) {
    this.track('timeline_viewed', {
      duration,
      interacted: duration > 3000 // User spent more than 3 seconds
    })
  }

  timelineInteraction(action: string, year?: number) {
    this.track('timeline_interaction', {
      action,
      year,
      timestamp: Date.now()
    })
  }

  // Form Events
  formStarted(formType: string) {
    this.track('form_started', {
      formType,
      timestamp: Date.now()
    })
  }

  formAbandoned(formType: string, lastField?: string, percentComplete?: number) {
    this.track('form_abandoned', {
      formType,
      lastField,
      percentComplete
    })
  }

  formCompleted(formType: string, duration?: number) {
    this.track('form_completed', {
      formType,
      duration,
      conversionEvent: true
    })
  }

  // User Engagement Events
  sessionStarted() {
    this.track('session_started', {
      timestamp: Date.now(),
      entryPage: typeof window !== 'undefined' ? window.location.pathname : ''
    })
  }

  sessionEnded(duration: number, pageViews: number) {
    this.track('session_ended', {
      duration,
      pageViews,
      eventsCount: this.events.length
    })
  }

  featureEngagement(feature: string, action: string) {
    this.track('feature_engagement', {
      feature,
      action,
      timestamp: Date.now()
    })
  }

  // Error and Edge Case Events
  errorOccurred(error: string, context?: string, severity?: 'low' | 'medium' | 'high') {
    this.track('error_occurred', {
      error,
      context,
      severity: severity || 'medium',
      stackTrace: process.env.NODE_ENV === 'development' ? error : undefined
    })
  }

  validationFailed(field: string, value: unknown, reason: string) {
    this.track('validation_failed', {
      field,
      value: typeof value === 'object' ? JSON.stringify(value) : String(value),
      reason
    })
  }

  // Conversion Funnel Events
  funnelStep(step: number, stepName: string, completed: boolean) {
    this.track('funnel_step', {
      step,
      stepName,
      completed,
      funnelType: 'calculation'
    })
  }

  conversionGoal(goalType: string, value?: number) {
    this.track('conversion_goal', {
      goalType,
      value,
      conversionEvent: true,
      timestamp: Date.now()
    })
  }

  // Premium/CTA Events
  premiumClicked(source: string, variant?: string) {
    this.track('premium_clicked', {
      source,
      variant,
      timestamp: Date.now()
    })
  }

  ctaClicked(ctaType: string, location: string) {
    this.track('cta_clicked', {
      ctaType,
      location,
      timestamp: Date.now()
    })
  }

  // Helper methods for timing
  private currentPage: string = ''
  private pageStartTime: number = Date.now()

  private setCurrentPage(page: string) {
    this.currentPage = page
    this.pageStartTime = Date.now()
  }

  private getTimeOnPage(): number {
    return Date.now() - this.pageStartTime
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
  private async sendToEndpoint(_event: AnalyticsEvent) { // eslint-disable-line @typescript-eslint/no-unused-vars
    // Uncomment and configure when you have an analytics endpoint
    /*
    try {
      await fetch('/api/analytics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(_event)
      })
    } catch (error) {
      // Failed to send analytics event - error silently handled
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
    gtag?: (command: string, eventName: string, parameters?: Record<string, AnalyticsPropertyValue>) => void
    va?: (command: string, data: { name: string; [key: string]: AnalyticsPropertyValue }) => void
  }
}
