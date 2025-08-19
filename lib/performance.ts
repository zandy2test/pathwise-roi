// Performance optimization utilities

/**
 * Lazy load components with Suspense fallback
 */
export function createLazyComponent<T = any>(
  importFn: () => Promise<{ default: React.ComponentType<T> }>,
  fallback?: React.ReactNode
) {
  const Component = React.lazy(importFn);
  
  const defaultFallback = React.createElement('div', {
    className: 'animate-pulse bg-gray-200 rounded h-32 w-full'
  });
  
  return function LazyWrapper(props: T) {
    return (
      <React.Suspense fallback={fallback || defaultFallback}>
        <Component {...props} />
      </React.Suspense>
    );
  };
}

/**
 * Image optimization with automatic WebP/AVIF support
 */
interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  placeholder = 'empty',
  blurDataURL
}: OptimizedImageProps) {
  // Generate blur data URL for placeholder if not provided
  const defaultBlurDataURL = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q==';

  if (typeof window !== 'undefined' && 'next/image' in window) {
    // Use Next.js Image component when available
    const Image = require('next/image').default;
    return (
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={className}
        priority={priority}
        placeholder={placeholder}
        blurDataURL={blurDataURL || defaultBlurDataURL}
        loading={priority ? 'eager' : 'lazy'}
        quality={85}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    );
  }

  // Fallback to regular img tag with loading optimization
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      style={{ aspectRatio: width && height ? `${width}/${height}` : undefined }}
    />
  );
}

/**
 * Debounce function for performance optimization
 */
export function debounce<T extends (...args: any[]) => void>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Throttle function for scroll events and animations
 */
export function throttle<T extends (...args: any[]) => void>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  
  return function executedFunction(...args: Parameters<T>) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

/**
 * Check if code is running in browser
 */
export const isBrowser = typeof window !== 'undefined';

/**
 * Intersection Observer hook for lazy loading
 */
export function useIntersectionObserver(
  elementRef: React.RefObject<Element>,
  options: IntersectionObserverInit = {}
): boolean {
  const [isIntersecting, setIsIntersecting] = React.useState(false);

  React.useEffect(() => {
    if (!isBrowser || !elementRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsIntersecting(entry.isIntersecting),
      {
        threshold: 0.1,
        rootMargin: '50px',
        ...options
      }
    );

    observer.observe(elementRef.current);

    return () => observer.disconnect();
  }, [elementRef, options]);

  return isIntersecting;
}

/**
 * Preload critical resources
 */
export function preloadResource(href: string, as: 'script' | 'style' | 'font' | 'image' = 'script') {
  if (!isBrowser) return;

  const link = document.createElement('link');
  link.rel = 'preload';
  link.href = href;
  link.as = as;
  
  if (as === 'font') {
    link.crossOrigin = 'anonymous';
  }

  document.head.appendChild(link);
}

/**
 * Bundle size analyzer - only for development
 */
export function logBundleSize(componentName: string) {
  if (process.env.NODE_ENV === 'development') {
    console.log(`🚀 Component loaded: ${componentName}`);
  }
}

/**
 * Performance metrics tracking
 */
export function trackPerformance(eventName: string, startTime?: number) {
  if (!isBrowser) return;

  const perfEntry = performance.getEntriesByName(eventName)[0];
  const duration = startTime ? Date.now() - startTime : perfEntry?.duration || 0;

  // Track with analytics if available
  if (window.gtag) {
    window.gtag('event', 'timing_complete', {
      name: eventName,
      value: Math.round(duration)
    });
  }

  if (process.env.NODE_ENV === 'development') {
    console.log(`⚡ ${eventName}: ${Math.round(duration)}ms`);
  }
}

/**
 * Code splitting helper
 */
export const dynamicImport = {
  // Heavy components that should be lazy loaded
  Calculator: () => import('@/components/roi-calculator'),
  PathBuilder: () => import('@/components/path-builder'),
  ShareCard: () => import('@/components/share-result-card'),
  EmailModal: () => import('@/components/email-capture-modal'),
  FeedbackWidget: () => import('@/components/feedback-widget'),
  
  // Magic UI components
  ShimmerButton: () => import('@/components/magic/shimmer-button'),
  NumberTicker: () => import('@/components/magic/number-ticker'),
};

// Import React at the top level to fix the lazy component function
import React from 'react';