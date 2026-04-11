/**
 * 从模型输出中稳健解析 JSON：去掉 markdown 代码块、按括号平衡截取对象、
 * 尾随逗号、Unicode 引号归一化，必要时使用 jsonrepair 修复截断/格式错误。
 */

import { jsonrepair } from 'jsonrepair'

function stripMarkdownFence(text: string): string {
  const m = text.match(/```(?:json)?\s*([\s\S]*?)```/i)
  return m ? m[1].trim() : text.trim()
}

/** 从首个 `{` 起按括号深度截取完整对象（忽略字符串内的花括号） */
export function extractFirstJsonObject(text: string): string | null {
  const start = text.indexOf('{')
  if (start === -1) return null
  let depth = 0
  let inString = false
  let escaped = false
  for (let i = start; i < text.length; i++) {
    const ch = text[i]
    if (escaped) {
      escaped = false
      continue
    }
    if (ch === '\\' && inString) {
      escaped = true
      continue
    }
    if (ch === '"') {
      inString = !inString
      continue
    }
    if (inString) continue
    if (ch === '{') depth++
    else if (ch === '}') {
      depth--
      if (depth === 0) return text.slice(start, i + 1)
    }
  }
  return null
}

/** 常见模型错误：数组或对象末尾多逗号 */
function removeTrailingCommas(json: string): string {
  return json.replace(/,\s*([}\]])/g, '$1')
}

/** 将弯引号等替换为 ASCII，避免非法 JSON 字符串定界符 */
function normalizeUnicodeQuotes(s: string): string {
  return s
    .replace(/[\u201c\u201e\u301d\u00ab]/g, '"')
    .replace(/[\u201d\u301f\u00bb]/g, '"')
}

function tryParse(s: string): unknown | null {
  try {
    return JSON.parse(s)
  } catch {
    return null
  }
}

function tryJsonrepairParse(s: string): unknown | null {
  try {
    const repaired = jsonrepair(s)
    return JSON.parse(repaired)
  } catch {
    return null
  }
}

function buildVariants(raw: string): string[] {
  const trimmed = raw.trim()
  const noTrail = removeTrailingCommas(trimmed)
  const norm = normalizeUnicodeQuotes(noTrail)
  const normTrail = removeTrailingCommas(norm)
  const seen = new Set<string>()
  const out: string[] = []
  for (const v of [trimmed, noTrail, norm, normTrail]) {
    if (!seen.has(v)) {
      seen.add(v)
      out.push(v)
    }
  }
  return out
}

export function parseAiJsonResponse<T = unknown>(content: string): T {
  const unfenced = stripMarkdownFence(content)
  const extracted = extractFirstJsonObject(unfenced)
  const roots = [unfenced, extracted].filter((s): s is string => Boolean(s))
  const seenRoots = new Set<string>()
  const uniqueRoots = roots.filter((s) => {
    if (seenRoots.has(s)) return false
    seenRoots.add(s)
    return true
  })

  for (const root of uniqueRoots) {
    for (const variant of buildVariants(root)) {
      const parsed = tryParse(variant)
      if (parsed !== null) return parsed as T
    }
    for (const variant of buildVariants(root)) {
      const parsed = tryJsonrepairParse(variant)
      if (parsed !== null) return parsed as T
    }
  }

  throw new SyntaxError('无法解析 AI 返回的 JSON')
}
