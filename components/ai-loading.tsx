'use client';

import { useState, useEffect } from 'react';
import { Loader2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AILoadingProps {
  onCancel?: () => void;
  message?: string;
}

const loadingMessages = [
  '正在分析剧本结构...',
  '正在构思故事情节...',
  '正在塑造角色形象...',
  '正在优化对话内容...',
  '正在完善场景描述...',
  '即将完成，请稍候...',
];

export function AILoading({ onCancel, message }: AILoadingProps) {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessageIndex((prev) => (prev + 1) % loadingMessages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-4">
      <div className="relative">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <div className="absolute inset-0 h-12 w-12 rounded-full border-2 border-primary/20 animate-pulse" />
      </div>

      <div className="text-center space-y-2">
        <p className="text-lg font-medium">
          {message || loadingMessages[currentMessageIndex]}
        </p>
        <p className="text-sm text-muted-foreground">
          AI 正在为您创作，这可能需要几秒钟
        </p>
      </div>

      {onCancel && (
        <Button
          variant="outline"
          size="sm"
          onClick={onCancel}
          className="mt-4"
        >
          <X className="h-4 w-4 mr-2" />
          取消
        </Button>
      )}
    </div>
  );
}
