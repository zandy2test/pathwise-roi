'use client';

import { useEffect } from 'react';

export function ClickDebugger() {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const clickInfo = {
        timestamp: new Date().toISOString(),
        element: target.tagName,
        className: target.className,
        id: target.id,
        textContent: target.textContent?.substring(0, 100),
        coordinates: { x: event.clientX, y: event.clientY },
        path: getElementPath(target),
      };
      
      console.log('🖱️ Click Event:', clickInfo);
    };

    const handleError = (event: ErrorEvent) => {
      console.error('🚨 JavaScript Error:', {
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        error: event.error,
        stack: event.error?.stack,
      });
    };

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      console.error('🚨 Unhandled Promise Rejection:', {
        reason: event.reason,
        promise: event.promise,
      });
    };

    // Add event listeners
    document.addEventListener('click', handleClick);
    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);

    return () => {
      document.removeEventListener('click', handleClick);
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, []);

  return null; // This component doesn't render anything
}

function getElementPath(element: HTMLElement): string {
  const path: string[] = [];
  let current = element;
  
  while (current && current !== document.body) {
    let selector = current.tagName.toLowerCase();
    
    if (current.id) {
      selector += `#${current.id}`;
    } else if (current.className) {
      selector += `.${current.className.split(' ').join('.')}`;
    }
    
    path.unshift(selector);
    current = current.parentElement as HTMLElement;
  }
  
  return path.join(' > ');
}