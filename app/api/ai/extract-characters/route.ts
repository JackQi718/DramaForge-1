import { NextRequest, NextResponse } from 'next/server'
import { getDeepSeekClient, DeepSeekError } from '@/lib/deepseek-client'
import { parseAiJsonResponse } from '@/lib/parse-ai-json'
import { draftsFromAiCharacterRows } from '@/lib/normalize-ai-characters'

const MIN_STORYLINE_LEN = 24

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const storyline = typeof body.storyline === 'string' ? body.storyline.trim() : ''
    const title = typeof body.title === 'string' ? body.title.trim() : ''
    const genre = typeof body.genre === 'string' ? body.genre.trim() : ''

    if (storyline.length < MIN_STORYLINE_LEN) {
      return NextResponse.json(
        { error: `请先填写更完整的故事梗概（至少约 ${MIN_STORYLINE_LEN} 字），便于识别角色` },
        { status: 400 }
      )
    }

    const client = getDeepSeekClient()

    const prompt = `你是一位专业的剧本策划。请**只根据**下面的故事梗概，识别并整理**主要出场角色**（含主角与重要配角；若梗概中人物关系简单，一般 2～6 人即可，最多不超过 12 人）。

${title ? `短剧标题（供参考）：${title}\n` : ''}${genre ? `类型：${genre}\n` : ''}
【故事梗概】
${storyline}

要求：
1. 每个角色必须给出**在梗概中可推断或合理补全**的信息；不要编造与梗概明显矛盾的情节。
2. **name** 使用梗概里出现的称呼或合理全名/常用名。
3. **role** 如：男主角、女主角、反派、配角等。
4. **personality**：性格与行为特点（简短）。
5. **appearance**：外貌关键词，一句话。
6. **appearanceDetail**：供分镜与视频生成用的外貌详细描述（脸型、发型发色、五官、体型、着装风格、标志性特征等）；若梗概未写，可合理推断但须与类型、角色定位一致。
7. **age**、**height**：可填如「二十七八岁」「约 175cm」或梗概中的信息；不确定可留空字符串。
8. 必须返回**合法 JSON 对象**，且顶层结构固定为：{ "characters": [ ... ] }，不要输出其它说明文字。

JSON 中每个角色字段名与类型示例：
{
  "characters": [
    {
      "name": "string",
      "role": "string",
      "personality": "string",
      "appearance": "string",
      "appearanceDetail": "string",
      "age": "string",
      "height": "string"
    }
  ]
}`

    const response = await client.chat({
      model: 'deepseek-chat',
      messages: [
        {
          role: 'system',
          content:
            '你只输出 JSON 对象，结构为 {"characters":[...]}。字段使用英文键名。不要 markdown 代码块。',
        },
        { role: 'user', content: prompt },
      ],
      temperature: 0.45,
      max_tokens: 3500,
      response_format: { type: 'json_object' },
    })

    const content = response.choices[0]?.message?.content
    if (!content) {
      return NextResponse.json({ error: '未收到有效响应' }, { status: 502 })
    }

    let parsed: unknown
    try {
      parsed = parseAiJsonResponse(content)
    } catch {
      return NextResponse.json({ error: '无法解析角色数据，请重试' }, { status: 502 })
    }

    const obj = parsed && typeof parsed === 'object' ? (parsed as Record<string, unknown>) : null
    const rawList = Array.isArray(parsed)
      ? parsed
      : obj && Array.isArray(obj.characters)
        ? obj.characters
        : null

    if (!rawList) {
      return NextResponse.json({ error: '模型返回格式异常' }, { status: 502 })
    }

    const drafts = draftsFromAiCharacterRows(rawList, 12)
    if (drafts.length === 0) {
      return NextResponse.json(
        { error: '未能从梗概中识别出角色，请补充人物姓名或关系后再试' },
        { status: 422 }
      )
    }

    return NextResponse.json({
      characters: drafts,
      usage: response.usage,
    })
  } catch (error) {
    console.error('extract-characters:', error)
    if (error instanceof DeepSeekError) {
      return NextResponse.json(
        { error: error.message, statusCode: error.statusCode },
        { status: error.statusCode || 500 }
      )
    }
    return NextResponse.json({ error: '提取角色失败，请稍后重试' }, { status: 500 })
  }
}
