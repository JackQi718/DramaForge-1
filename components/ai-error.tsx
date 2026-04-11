'use client';

import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export type AIErrorType = 
  | 'network'
  | 'timeout'
  | 'api_key'
  | 'rate_limit'
  | 'server'
  | 'unknown';

interface AIErrorProps {
  type?: AIErrorType;
  message?: string;
  onRetry?: () => void;
  onDismiss?: () => void;
}

const errorMessages: Record<AIErrorType, { title: string; description: string }> = {
  network: {
    title: '网络连接失败',
    description: '无法连接到 AI 服务，请检查您的网络连接后重试。',
  },
  timeout: {
    title: '请求超时',
    description: 'AI 服务响应超时，请稍后重试。',
  },
  api_key: {
    title: 'API 密钥错误',
    description: 'DeepSeek API 密钥无效或未配置，请检查环境变量配置。',
  },
  rate_limit: {
    title: '请求频率限制',
    description: '您的请求过于频繁，请稍后再试。',
  },
  server: {
    title: '服务器错误',
    description: 'AI 服务暂时不可用，请稍后重试。',
  },
  unknown: {
    title: '未知错误',
    description: '发生了未知错误，请重试或联系支持。',
  },
};

export function AIError({ 
  type = 'unknown', 
  message, 
  onRetry, 
  onDismiss 
}: AIErrorProps) {
  const errorInfo = errorMessages[type];

  return (
    <Alert variant="destructive" className="my-4">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>{errorInfo.title}</AlertTitle>
      <AlertDescription className="mt-2 space-y-3">
        <p>{message || errorInfo.description}</p>
        <div className="flex gap-2">
          {onRetry && (
            <Button
              variant="outline"
              size="sm"
              onClick={onRetry}
              className="bg-background hover:bg-accent"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              重试
            </Button>
          )}
          {onDismiss && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onDismiss}
            >
              关闭
            </Button>
          )}
        </div>
      </AlertDescription>
    </Alert>
  );
}

/**
 * 根据错误对象推断错误类型
 */
export function inferErrorType(error: any): AIErrorType {
  if (!error) return 'unknown';

  const message = error.message?.toLowerCase() || '';
  
  if (message.includes('network') || message.includes('fetch')) {
    return 'network';
  }
  if (message.includes('timeout') || message.includes('abort')) {
    return 'timeout';
  }
  if (message.includes('api key') || message.includes('unauthorized') || error.statusCode === 401) {
    return 'api_key';
  }
  if (message.includes('rate limit') || error.statusCode === 429) {
    return 'rate_limit';
  }
  if (error.statusCode && error.statusCode >= 500) {
    return 'server';
  }

  return 'unknown';
}
