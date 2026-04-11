import type { Character } from '@/lib/types'

function pickStr(obj: Record<string, unknown>, ...keys: string[]): string {
  for (const k of keys) {
    const v = obj[k]
    if (v != null && String(v).trim() !== '') return String(v).trim()
  }
  return ''
}

/** 将 AI 返回的单条角色对象规范为可写入前端的字段（不含 id） */
export function rawRowToCharacterDraft(row: unknown): Omit<Character, 'id'> | null {
  if (!row || typeof row !== 'object') return null
  const o = row as Record<string, unknown>
  const name = pickStr(o, 'name', '姓名', 'characterName')
  if (!name) return null
  return {
    name,
    age: pickStr(o, 'age', '年龄'),
    height: pickStr(o, 'height', '身高'),
    personality: pickStr(o, 'personality', '性格', '性格特征'),
    appearance: pickStr(o, 'appearance', '外貌', '外貌关键词'),
    appearanceDetail: pickStr(
      o,
      'appearanceDetail',
      'appearance_detail',
      '外貌详细',
      '外貌详细描述'
    ),
    role: pickStr(o, 'role', '定位', '角色定位'),
  }
}

/** 从 AI 返回的数组去重（按姓名）、限制条数，生成不含 id 的角色草稿 */
export function draftsFromAiCharacterRows(rows: unknown, maxCount = 15): Omit<Character, 'id'>[] {
  if (!Array.isArray(rows)) return []
  const out: Omit<Character, 'id'>[] = []
  const seen = new Set<string>()
  for (const row of rows) {
    const d = rawRowToCharacterDraft(row)
    if (!d) continue
    const key = d.name.toLowerCase()
    if (seen.has(key)) continue
    seen.add(key)
    out.push(d)
    if (out.length >= maxCount) break
  }
  return out
}

export function assignCharacterIds(drafts: Omit<Character, 'id'>[]): Character[] {
  const uuid =
    typeof globalThis !== 'undefined' && globalThis.crypto?.randomUUID
      ? () => globalThis.crypto.randomUUID()
      : () => `char-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`
  return drafts.map((d) => ({
    ...d,
    appearanceDetail: d.appearanceDetail ?? '',
    id: uuid(),
  }))
}
