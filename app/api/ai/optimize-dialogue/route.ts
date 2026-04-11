import { NextRequest, NextResponse } from 'next/server';
import { getDeepSeekClient, DeepSeekError } from '@/lib/deepseek-client';
import { parseAiJsonResponse } from '@/lib/parse-ai-json';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { dialogue, character, context, genre } = body;

    if (!dialogue) {
      return NextResponse.json(
        { error: '对话内容是必需的' },
        { status: 400 }
      );
    }

    const client = getDeepSeekClient();

    const prompt = `你是一位专业的剧本对话优化师。请优化以下对话：

原始对话：${dialogue}
${character ? `角色：${character}` : ''}
${context ? `场景上下文：${context}` : ''}
${genre ? `剧本类型：${genre}` : ''}

请从以下方面优化对话：
1. 使对话更自然、更符合角色性格
2. 增强对话的戏剧张力
3. 确保对话推动情节发展
4. 保持对话简洁有力

请以JSON格式返回，结构如下：
{
  "original": "原始对话",
  "optimized": "优化后的对话",
  "improvements": ["改进点1", "改进点2"],
  "notes": "优化说明"
}`;

    const response = await client.chat({
      model: 'deepseek-chat',
      messages: [
        {
          role: 'system',
          content: '你是一位专业的剧本对话优化师，擅长优化影视剧本中的对话，使其更加生动、自然、有张力。',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.6,
      max_tokens: 1000,
    });

    const content = response.choices[0]?.message?.content;
    if (!content) {
      throw new Error('未收到有效响应');
    }

    let result: Record<string, unknown> | { raw: string };
    try {
      result = parseAiJsonResponse(content);
    } catch {
      result = { raw: content };
    }

    return NextResponse.json({
      success: true,
      result,
      usage: response.usage,
    });
  } catch (error) {
    console.error('Optimize dialogue error:', error);

    if (error instanceof DeepSeekError) {
      return NextResponse.json(
        { error: error.message, statusCode: error.statusCode },
        { status: error.statusCode || 500 }
      );
    }

    return NextResponse.json(
      { error: '优化对话失败，请稍后重试' },
      { status: 500 }
    );
  }
}
