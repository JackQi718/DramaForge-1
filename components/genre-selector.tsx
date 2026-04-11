'use client'

import { Genre } from '@/lib/types'
import { genreMetadata, allGenres } from '@/lib/genre-metadata'
import { cn } from '@/lib/utils'
import { ScrollArea } from '@/components/ui/scroll-area'

interface GenreSelectorProps {
  value?: Genre
  onChange: (genre: Genre) => void
  className?: string
}

export function GenreSelector({ value, onChange, className }: GenreSelectorProps) {
  return (
    <ScrollArea className={cn('max-h-[min(420px,52vh)] w-full rounded-lg border border-border/50', className)}>
      <div className="grid grid-cols-2 gap-2 p-2 sm:grid-cols-3 md:grid-cols-4">
        {allGenres.map((genre) => {
          const metadata = genreMetadata[genre]
          const isSelected = value === genre

          return (
            <button
              key={genre}
              type="button"
              onClick={() => onChange(genre)}
              className={cn(
                'flex flex-col items-center gap-1.5 rounded-lg border-2 p-2.5 text-left transition-all',
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
              </div>
            </button>
          )
        })}
      </div>
    </ScrollArea>
  )
}
