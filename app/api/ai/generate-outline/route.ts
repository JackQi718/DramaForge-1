import { NextRequest, NextResponse } from 'next/server';
import { getDeepSeekClient, DeepSeekError } from '@/lib/deepseek-client';
import { parseAiJsonResponse } from '@/lib/parse-ai-json';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, genre, visualStyle, targetAudience, description } = body;

    if (!title || !genre) {
      return NextResponse.json(
        { error: '标题和类型是必需的' },
        { status: 400 }
      );
    }

    const client = getDeepSeekClient();

    const prompt = `你是一位专业的剧本创作助手。请根据以下信息生成一个详细的剧本大纲：

标题：${title}
类型：${genre}
视觉风格：${visualStyle || '未指定'}
目标观众：${targetAudience || '未指定'}
描述：${description || '无'}

请生成一个包含以下内容的剧本大纲：
1. 故事概要（200-300字）
2. 主要角色（3-5个，包括姓名、性格特点、角色定位）
3. 剧集结构（建议6-12集，每集简要说明）
4. 主要冲突和转折点
5. 结局方向

请以JSON格式返回，结构如下：
{
  "summary": "故事概要",
  "characters": [{"name": "角色名", "personality": "性格", "role": "定位"}],
  "episodes": [{"number": 1, "title": "集标题", "summary": "简介"}],
  "conflicts": ["冲突1", "冲突2"],
  "ending": "结局方向"
}`;

    const response = await client.chat({
      model: 'deepseek-chat',
      messages: [
        {
          role: 'system',
          content: '你是一位专业的剧本创作助手，擅长创作各种类型的影视剧本。',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.8,
      max_tokens: 2000,
    });

    const content = response.choices[0]?.message?.content;
    if (!content) {
      throw new Error('未收到有效响应');
    }

    let outline: Record<string, unknown> | { raw: string };
    try {
      outline = parseAiJsonResponse(content);
    } catch {
      outline = { raw: content };
    }

    return NextResponse.json({
      success: true,
      outline,
      usage: response.usage,
    });
  } catch (error) {
    console.error('Generate outline error:', error);

    if (error instanceof DeepSeekError) {
      return NextResponse.json(
        { error: error.message, statusCode: error.statusCode },
        { status: error.statusCode || 500 }
      );
    }

    return NextResponse.json(
      { error: '生成大纲失败，请稍后重试' },
      { status: 500 }
    );
  }
}
