'use client';

import React, { CSSProperties } from 'react';
import { cn } from '@/lib/utils';

export interface ShimmerButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  shimmerColor?: string;
  shimmerSize?: string;
  borderRadius?: string;
  shimmerDuration?: string;
  background?: string;
  className?: string;
  children?: React.ReactNode;
}

export function ShimmerButton({
  shimmerColor = '#ffffff',
  shimmerSize = '0.05em',
  shimmerDuration = '3s',
  borderRadius = '100px',
  background = 'linear-gradient(90deg, #4338ca 0%, #5b21b6 100%)',
  className,
  children,
  ...props
}: ShimmerButtonProps) {
  return (
    <button
      style={
        {
          '--shimmer-color': shimmerColor,
          '--shimmer-size': shimmerSize,
          '--shimmer-duration': shimmerDuration,
          '--border-radius': borderRadius,
          '--background': background,
        } as CSSProperties
      }
      className={cn(
        'group relative z-0 flex cursor-pointer items-center justify-center overflow-hidden whitespace-nowrap border border-white/10 px-6 py-3 text-white transition-all duration-300',
        'transform-gpu transition-transform hover:scale-105 active:scale-95',
        'before:absolute before:inset-0 before:-z-10 before:opacity-0 before:transition-opacity before:duration-300',
        'after:absolute after:inset-0 after:-z-10 after:animate-shimmer-button after:bg-shimmer',
        'hover:before:opacity-100',
        '[background:var(--background)] [border-radius:var(--border-radius)]',
        'before:[background:var(--background)] before:[border-radius:var(--border-radius)] before:brightness-125',
        'shadow-2xl shadow-[var(--shimmer-color)]/20',
        className
      )}
      {...props}
    >
      <span className="relative z-10 font-semibold">
        {children}
      </span>
      <div className="absolute inset-0 -z-5 bg-gradient-to-t from-transparent via-white/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </button>
  );
}

// CTAButton - Pre-configured for main CTAs
export function CTAButton({
  children,
  className,
  ...props
}: Omit<ShimmerButtonProps, 'shimmerColor' | 'background'>) {
  return (
    <ShimmerButton
      shimmerColor="#22c55e"
      background="linear-gradient(135deg, #059669 0%, #10b981 100%)"
      className={cn('text-lg px-8 py-4', className)}
      {...props}
    >
      {children}
    </ShimmerButton>
  );
}

// PremiumButton - Pre-configured for premium features
export function PremiumButton({
  children,
  className,
  ...props
}: Omit<ShimmerButtonProps, 'shimmerColor' | 'background'>) {
  return (
    <ShimmerButton
      shimmerColor="#fbbf24"
      background="linear-gradient(135deg, #f59e0b 0%, #eab308 50%, #f59e0b 100%)"
      className={cn('text-base px-6 py-3', className)}
      {...props}
    >
      {children}
    </ShimmerButton>
  );
}
