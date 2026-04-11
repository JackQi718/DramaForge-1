/**
 * DeepSeek API 客户端
 */

import { getConfig } from './config';

export interface DeepSeekMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface DeepSeekRequest {
  model: string;
  messages: DeepSeekMessage[];
  temperature?: number;
  max_tokens?: number;
  top_p?: number;
  stream?: boolean;
  /** OpenAI 兼容：约束模型输出 JSON 对象（若接口不支持可忽略） */
  response_format?: { type: 'json_object' | 'text' };
}

export interface DeepSeekResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: Array<{
    index: number;
    message: DeepSeekMessage;
    finish_reason: string;
  }>;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

export class DeepSeekError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public response?: any
  ) {
    super(message);
    this.name = 'DeepSeekError';
  }
}

export class DeepSeekClient {
  private apiKey: string;
  private apiUrl: string;
  private maxRetries: number;
  private timeoutMs: number;

  constructor() {
    const config = getConfig();
    this.apiKey = config.deepseek.apiKey;
    this.apiUrl = config.deepseek.apiUrl;
    this.maxRetries = config.deepseek.maxRetries;
    this.timeoutMs = config.deepseek.timeoutMs;
  }

  /**
   * 发送聊天完成请求
   */
  async chat(request: DeepSeekRequest): Promise<DeepSeekResponse> {
    return this.executeWithRetry(() => this.sendRequest(request));
  }

  /**
   * 发送 API 请求
   */
  private async sendRequest(request: DeepSeekRequest): Promise<DeepSeekResponse> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeoutMs);

    try {
      const response = await fetch(`${this.apiUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify(request),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new DeepSeekError(
          errorData.error?.message || `API request failed with status ${response.status}`,
          response.status,
          errorData
        );
      }

      return await response.json();
    } catch (error) {
      clearTimeout(timeoutId);

      if (error instanceof DeepSeekError) {
        throw error;
      }

      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          throw new DeepSeekError('Request timeout');
        }
        throw new DeepSeekError(`Request failed: ${error.message}`);
      }

      throw new DeepSeekError('Unknown error occurred');
    }
  }

  /**
   * 执行带重试逻辑的请求
   */
  private async executeWithRetry<T>(
    fn: () => Promise<T>,
    attempt: number = 0
  ): Promise<T> {
    try {
      return await fn();
    } catch (error) {
      if (error instanceof DeepSeekError) {
        // 不重试客户端错误 (4xx)
        if (error.statusCode && error.statusCode >= 400 && error.statusCode < 500) {
          throw error;
        }
      }

      // 达到最大重试次数
      if (attempt >= this.maxRetries) {
        throw error;
      }

      // 指数退避
      const delay = Math.min(1000 * Math.pow(2, attempt), 10000);
      await new Promise(resolve => setTimeout(resolve, delay));

      return this.executeWithRetry(fn, attempt + 1);
    }
  }
}

/**
 * 获取 DeepSeek 客户端的单例实例
 */
let cachedClient: DeepSeekClient | null = null;

export function getDeepSeekClient(): DeepSeekClient {
  if (!cachedClient) {
    cachedClient = new DeepSeekClient();
  }
  return cachedClient;
}
