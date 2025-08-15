'use client';

import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface AnimatedGradientTextProps {
  children: ReactNode;
  className?: string;
}

export function AnimatedGradientText({
  children,
  className,
}: AnimatedGradientTextProps) {
  return (
    <div
      className={cn(
        'group relative mx-auto flex max-w-fit flex-row items-center justify-center rounded-2xl bg-white/40 backdrop-blur-sm px-4 py-1.5 text-sm font-medium shadow-[inset_0_-8px_10px_#8fdfff1f] transition-shadow duration-500 ease-out [--bg-size:300%] hover:shadow-[inset_0_-5px_10px_#8fdfff3f] dark:bg-black/40',
        className
      )}
    >
      <div
        className={`absolute inset-0 block h-full w-full animate-gradient-flow bg-gradient-to-r from-blue-500/50 via-purple-500/50 to-blue-500/50 bg-[length:var(--bg-size)_100%] [border-radius:inherit] [mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)]`}
        style={{
          padding: '1px',
          WebkitMaskComposite: 'exclude',
        }}
      />
      <span
        className={cn(
          `inline animate-gradient-flow bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`,
          'font-semibold'
        )}
      >
        {children}
      </span>
    </div>
  );
}

// Alternative version for larger text (hero headings)
export function AnimatedGradientHeading({
  children,
  className,
}: AnimatedGradientTextProps) {
  return (
    <h1
      className={cn(
        'inline-block animate-gradient-flow bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-[length:200%_auto] bg-clip-text text-transparent',
        'text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl',
        className
      )}
    >
      {children}
    </h1>
  );
}
