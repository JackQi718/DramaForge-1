'use client';

import { VisualStyle } from '@/lib/types';
import { visualStyleMetadata, allVisualStyles } from '@/lib/visual-style-metadata';
import { cn } from '@/lib/utils';

interface VisualStyleSelectorProps {
  value?: VisualStyle;
  onChange: (style: VisualStyle) => void;
  className?: string;
}

export function VisualStyleSelector({ value, onChange, className }: VisualStyleSelectorProps) {
  return (
    <div className={cn('grid grid-cols-2 sm:grid-cols-4 gap-2', className)}>
      {allVisualStyles.map((style) => {
        const metadata = visualStyleMetadata[style];
        const isSelected = value === style;

        return (
          <button
            key={style}
            type="button"
            onClick={() => onChange(style)}
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
