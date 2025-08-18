'use client';

import { useEffect, useState } from 'react';
import { useErrorReporting } from './error-tracking';

interface VercelToolbarData {
  sessionId?: string;
  deploymentId?: string;
  functionLogs?: unknown[];
  performanceMetrics?: Record<string, unknown>;
  networkRequests?: unknown[];
  errors?: unknown[];
}

interface VercelWindow extends Window {
  __VERCEL_TOOLBAR__?: {
    getSessionData: () => VercelToolbarData;
    onError: (callback: (error: Record<string, unknown>) => void) => void;
    onPerformanceMetric: (callback: (metric: Record<string, unknown>) => void) => void;
  };
}

export function VercelToolbarIntegration() {
  const [toolbarData, setToolbarData] = useState<VercelToolbarData | null>(null);
  const [isToolbarAvailable, setIsToolbarAvailable] = useState(false);
  const { reportError } = useErrorReporting();

  useEffect(() => {
    // Check if Vercel Toolbar is available
    const checkToolbar = () => {
      const vercelWindow = window as VercelWindow;
      if (vercelWindow.__VERCEL_TOOLBAR__) {
        setIsToolbarAvailable(true);
        
        // Get initial session data
        try {
          const sessionData = vercelWindow.__VERCEL_TOOLBAR__.getSessionData();
          setToolbarData(sessionData);
          console.log('🔧 Vercel Toolbar Data:', sessionData);
        } catch (error) {
          console.error('Failed to get Vercel Toolbar data:', error);
        }

        // Set up error listener
        vercelWindow.__VERCEL_TOOLBAR__.onError?.((error) => {
          console.error('🚨 Vercel Toolbar Error:', error);
          
          // Send enhanced error report with Vercel context
          reportError(new Error(`Vercel Toolbar Error: ${error.message || 'Unknown error'}`), 'vercel-toolbar');
          
          // Send to our error logging endpoint with Vercel context
          fetch('/api/error-log', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              source: 'vercel-toolbar',
              error: error,
              sessionData: toolbarData,
              timestamp: new Date().toISOString(),
              url: window.location.href,
              userAgent: navigator.userAgent,
            }),
          }).catch(console.error);
        });

        // Set up performance metric listener
        vercelWindow.__VERCEL_TOOLBAR__.onPerformanceMetric?.((metric) => {
          console.log('📊 Vercel Performance Metric:', metric);
          
          // Log performance issues
          if (typeof metric.value === 'number' && metric.value > 1000) { // If metric indicates slow performance
            console.warn('⚠️ Performance Issue Detected:', metric);
          }
        });
      }
    };

    // Check immediately
    checkToolbar();

    // Check periodically in case toolbar loads later
    const interval = setInterval(checkToolbar, 1000);

    // Cleanup
    return () => clearInterval(interval);
  }, [reportError, toolbarData]);

  // Add global error handler that includes Vercel context
  useEffect(() => {
    const handleGlobalError = (event: ErrorEvent) => {
      const enhancedError = {
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        stack: event.error?.stack,
        vercelContext: toolbarData,
        timestamp: new Date().toISOString(),
      };

      console.error('🚨 Enhanced Global Error with Vercel Context:', enhancedError);

      // Send to error logging endpoint
      fetch('/api/error-log', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(enhancedError),
      }).catch(console.error);
    };

    window.addEventListener('error', handleGlobalError);
    return () => window.removeEventListener('error', handleGlobalError);
  }, [toolbarData]);

  // Export toolbar data to global scope for easy access
  useEffect(() => {
    if (toolbarData) {
      (window as unknown as Record<string, unknown>).__DEBUG_VERCEL_DATA__ = toolbarData;
    }
  }, [toolbarData]);

  // Development mode: show toolbar status
  if (process.env.NODE_ENV === 'development' && isToolbarAvailable) {
    return (
      <div className="fixed top-0 right-0 z-[9999] bg-black text-white p-2 text-xs">
        🔧 Vercel Toolbar Active
        <br />
        Session: {toolbarData?.sessionId?.substring(0, 8)}...
        <br />
        Deployment: {toolbarData?.deploymentId?.substring(0, 8)}...
      </div>
    );
  }

  return null; // This component doesn't render in production
}

// Utility function to get current Vercel context
export function getVercelContext(): VercelToolbarData | null {
  const vercelWindow = window as VercelWindow;
  try {
    return vercelWindow.__VERCEL_TOOLBAR__?.getSessionData() || null;
  } catch {
    return null;
  }
}

// Enhanced error reporting with Vercel context
export function reportErrorWithVercelContext(error: Error, context?: string) {
  const vercelData = getVercelContext();
  
  const enhancedReport = {
    message: error.message,
    stack: error.stack,
    context,
    vercelContext: vercelData,
    timestamp: new Date().toISOString(),
    url: window.location.href,
    userAgent: navigator.userAgent,
  };

  console.error('🚨 Enhanced Error Report:', enhancedReport);

  // Send to error logging endpoint
  fetch('/api/error-log', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(enhancedReport),
  }).catch(console.error);
}