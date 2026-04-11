'use client'

import { VisualStyle } from '@/lib/types'
import { visualStyleMetadata, allVisualStyles } from '@/lib/visual-style-metadata'
import { cn } from '@/lib/utils'
import { ScrollArea } from '@/components/ui/scroll-area'

interface VisualStyleSelectorProps {
  value?: VisualStyle
  onChange: (style: VisualStyle) => void
  className?: string
}

export function VisualStyleSelector({ value, onChange, className }: VisualStyleSelectorProps) {
  return (
    <ScrollArea className={cn('max-h-[min(380px,48vh)] w-full rounded-lg border border-border/50', className)}>
      <div className="grid grid-cols-2 gap-2 p-2 sm:grid-cols-3 md:grid-cols-4">
        {allVisualStyles.map((style) => {
          const metadata = visualStyleMetadata[style]
          const isSelected = value === style

          return (
            <button
              key={style}
              type="button"
              onClick={() => onChange(style)}
              className={cn(
                'flex flex-col items-center gap-1.5 rounded-lg border-2 p-2.5 transition-all',
                'hover:border-primary/50 hover:bg-accent/50',
                isSelected ? 'border-primary bg-accent shadow-md' : 'border-border bg-card'
              )}
            >
              <span className="text-xl">{metadata.icon}</span>
              <div className="w-full text-center">
                <div className={cn('text-xs font-medium leading-tight', isSelected && metadata.color)}>
                  {metadata.label}
                </div>
                <div className="mt-0.5 line-clamp-2 text-[10px] leading-snug text-muted-foreground">
                  {metadata.description}
                </div>
                <div className="mt-0.5 line-clamp-1 text-[9px] text-muted-foreground/80">例：{metadata.example}</div>
              </div>
            </button>
          )
        })}
      </div>
    </ScrollArea>
  )
}
