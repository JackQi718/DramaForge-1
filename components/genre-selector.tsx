'use client';

import { Genre } from '@/lib/types';
import { genreMetadata, allGenres } from '@/lib/genre-metadata';
import { cn } from '@/lib/utils';

interface GenreSelectorProps {
  value?: Genre;
  onChange: (genre: Genre) => void;
  className?: string;
}

export function GenreSelector({ value, onChange, className }: GenreSelectorProps) {
  return (
    <div className={cn('grid grid-cols-2 sm:grid-cols-4 gap-2', className)}>
      {allGenres.map((genre) => {
        const metadata = genreMetadata[genre];
        const isSelected = value === genre;

        return (
          <button
            key={genre}
            type="button"
            onClick={() => onChange(genre)}
            className={cn(
              'flex flex-col items-center gap-2 p-3 rounded-lg border-2 transition-all',
              'hover:border-primary/50 hover:bg-accent/50',
              isSelected
                ? 'border-primary bg-accent shadow-md'
                : 'border-border bg-card'
            )}
          >
            <span className="text-2xl">{metadata.icon}</span>
            <div className="text-center">
              <div className={cn('font-medium text-sm', isSelected && metadata.color)}>
                {metadata.label}
              </div>
              <div className="text-xs text-muted-foreground line-clamp-1 mt-0.5">
                {metadata.description}
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
