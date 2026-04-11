import { NextRequest, NextResponse } from 'next/server';
import { getDeepSeekClient, DeepSeekError } from '@/lib/deepseek-client';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      sceneDescription, 
      visualElements, 
      cameraMovement, 
      mood, 
      characterInScene,
      visualStyle,
      genre 
    } = body;

    if (!sceneDescription) {
      return NextResponse.json(
        { error: '场景描述是必需的' },
        { status: 400 }
      );
    }

    const client = getDeepSeekClient();

    const prompt = `你是一位专业的 AI 视频生成提示词专家。请根据以下分镜信息，生成一个详细、专业的 AI 视频生成提示词（适用于 Runway、Pika、Sora 等视频生成工具）。

分镜信息：
- 场景描述（请完整消化其中所有时空、环境、人物与动作细节，勿随意丢弃信息）：${sceneDescription}
- 视觉元素：${visualElements || '无'}
- 镜头运动：${cameraMovement || '无'}
- 氛围情绪：${mood || '无'}
- 场景角色：${characterInScene || '无'}
- 视觉风格：${visualStyle || '无'}
- 剧本类型：${genre || '无'}

请生成一个英文的 AI 视频提示词，要求：
1. 使用专业的电影术语和视觉描述；**场景描述越长，提示词应覆盖得越细**（空间层次、光线、人物外形与动作、道具等），避免只写笼统概括。
2. 包含具体的镜头类型（如 close-up, wide shot, tracking shot 等）
3. 描述光线、色调、氛围
4. 包含动作和运动细节；**动作量必须适合单条视频约 3～8 秒（竖屏短剧单镜头）**，不要写成可拍 30 秒以上的长镜头叙事
5. 符合指定的视觉风格
6. 长度可根据场景复杂度在约 **100-280 个单词**之间（信息多则可更长，但仍为单镜头短视频）
7. 使用逗号分隔的关键词格式，便于 AI 理解
8. 在结尾用关键词标明片段时间，例如 "3 second clip" / "5 second shot" / "single 6s take"（秒数须在 3～8 之间）

示例格式：
"cinematic shot, [shot type], [subject and action], [lighting], [color palette], [mood], [camera movement], [visual style], [additional details], high quality, 4k"

请直接返回提示词文本，不要包含其他解释。`;

    const response = await client.chat({
      model: 'deepseek-chat',
      messages: [
        {
          role: 'system',
          content: '你是一位专业的 AI 视频生成提示词专家，擅长将剧本场景转换为详细的视频生成提示词。',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.55,
      max_tokens: 900,
    });

    const videoPrompt = response.choices[0]?.message?.content?.trim();
    if (!videoPrompt) {
      throw new Error('未收到有效响应');
    }

    return NextResponse.json({
      success: true,
      videoPrompt,
      usage: response.usage,
    });
  } catch (error) {
    console.error('Generate video prompt error:', error);

    if (error instanceof DeepSeekError) {
      return NextResponse.json(
        { error: error.message, statusCode: error.statusCode },
        { status: error.statusCode || 500 }
      );
    }

    return NextResponse.json(
      { error: '生成视频提示词失败，请稍后重试' },
      { status: 500 }
    );
  }
}
