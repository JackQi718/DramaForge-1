/**
 * 应用配置加载和验证
 */

export interface AppConfig {
  deepseek: {
    apiKey: string;
    apiUrl: string;
    maxRetries: number;
    timeoutMs: number;
  };
  app: {
    name: string;
    version: string;
  };
}

class ConfigError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ConfigError';
  }
}

/**
 * 加载并验证应用配置
 */
export function loadConfig(): AppConfig {
  const apiKey = process.env.DEEPSEEK_API_KEY;
  
  if (!apiKey) {
    throw new ConfigError('DEEPSEEK_API_KEY is required but not set in environment variables');
  }

  const config: AppConfig = {
    deepseek: {
      apiKey,
      apiUrl: process.env.DEEPSEEK_API_URL || 'https://api.deepseek.com/v1',
      maxRetries: parseInt(process.env.DEEPSEEK_MAX_RETRIES || '3', 10),
      timeoutMs: parseInt(process.env.DEEPSEEK_TIMEOUT_MS || '30000', 10),
    },
    app: {
      name: process.env.NEXT_PUBLIC_APP_NAME || '剧本创作助手',
      version: process.env.NEXT_PUBLIC_APP_VERSION || '1.0.0',
    },
  };

  // 验证配置值
  if (config.deepseek.maxRetries < 0 || config.deepseek.maxRetries > 10) {
    throw new ConfigError('DEEPSEEK_MAX_RETRIES must be between 0 and 10');
  }

  if (config.deepseek.timeoutMs < 1000 || config.deepseek.timeoutMs > 120000) {
    throw new ConfigError('DEEPSEEK_TIMEOUT_MS must be between 1000 and 120000');
  }

  return config;
}

/**
 * 获取配置的单例实例
 */
let cachedConfig: AppConfig | null = null;

export function getConfig(): AppConfig {
  if (!cachedConfig) {
    cachedConfig = loadConfig();
  }
  return cachedConfig;
}
