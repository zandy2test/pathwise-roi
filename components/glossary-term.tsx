'use client'

import { ReactNode } from 'react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

interface GlossaryTermProps {
  term: string
  definition: string
  example?: string
  children: ReactNode
}

export function GlossaryTerm({ term, definition, example, children }: GlossaryTermProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span className="underline decoration-dotted underline-offset-2 cursor-help decoration-muted-foreground">
            {children}
          </span>
        </TooltipTrigger>
        <TooltipContent className="max-w-sm">
          <div className="space-y-2">
            <p className="font-semibold">{term}</p>
            <p className="text-sm">{definition}</p>
            {example && (
              <p className="text-xs text-muted-foreground italic">
                Example: {example}
              </p>
            )}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
