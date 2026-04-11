/** 竖屏短剧单镜头合法区间（秒） */
const MIN_SEC = 3
const MAX_SEC = 8
const DEFAULT_SEC = 5

/**
 * 从模型返回的时长文案中解析秒数（中英混排、分/秒），无法识别或超出 3～8 秒则回落到 DEFAULT_SEC。
 */
export function clampShotSeconds(input: string | undefined | null): number {
  if (input == null) return DEFAULT_SEC
  const raw = String(input).trim()
  if (!raw) return DEFAULT_SEC

  const s = raw.toLowerCase()

  const minCn = s.match(/(\d+(?:\.\d+)?)\s*分(?:钟)?/)
  if (minCn) {
    return outOfRangeToDefault(Math.round(parseFloat(minCn[1]) * 60))
  }

  const minEn = s.match(/(\d+(?:\.\d+)?)\s*(?:min|minute)s?\b/)
  if (minEn) {
    return outOfRangeToDefault(Math.round(parseFloat(minEn[1]) * 60))
  }

  const secCn = s.match(/(\d+(?:\.\d+)?)\s*秒/)
  if (secCn) {
    return outOfRangeToDefault(Math.round(parseFloat(secCn[1])))
  }

  const secEn = s.match(/(\d+(?:\.\d+)?)\s*(?:s|sec|secs|second|seconds)\b/)
  if (secEn) {
    return outOfRangeToDefault(Math.round(parseFloat(secEn[1])))
  }

  const range = s.match(/(\d+)\s*[-～~至]\s*(\d+)\s*秒/)
  if (range) {
    const a = parseInt(range[1], 10)
    const b = parseInt(range[2], 10)
    const mid = Math.round((a + b) / 2)
    return outOfRangeToDefault(mid)
  }

  return DEFAULT_SEC
}

/** 仅在无法得到 [MIN,MAX] 内整数秒时使用；合法 3～8 秒原样保留 */
function outOfRangeToDefault(sec: number): number {
  if (Number.isNaN(sec)) return DEFAULT_SEC
  if (sec >= MIN_SEC && sec <= MAX_SEC) return sec
  return DEFAULT_SEC
}

/** 从【时长】片段中取「N秒」，仅当 N∈[3,8] 时采用（用于 duration 字段缺失时回填） */
function extractValidSecondsFromChinesePrompt(prompt: string | undefined | null): number | null {
  if (!prompt) return null
  const block = prompt.match(/【时长】([^【]*)/)
  if (!block) return null
  const inner = block[1]
  const m = inner.match(/(\d+)\s*秒/)
  if (!m) return null
  const n = parseInt(m[1], 10)
  if (n >= MIN_SEC && n <= MAX_SEC) return n
  return null
}

/** 英文提示词中独立的 3～8s / N seconds（duration 缺失时） */
function extractValidSecondsFromEnglishPrompt(prompt: string | undefined | null): number | null {
  if (!prompt) return null
  const m = prompt.match(/\b([3-8])\s*(?:s|sec|secs|second|seconds)\b/i)
  if (m) return parseInt(m[1], 10)
  return null
}

/**
 * 决定本条分镜秒数：优先 `duration` 字段（合法则保留 3～8）；否则尝试从提示词提取合法秒数；最后才默认 5。
 */
export function resolveShotSeconds(row: { duration?: string | null; aiVideoPrompt?: string | null }): number {
  const d = row.duration?.trim()
  if (d) return clampShotSeconds(d)
  const zh = extractValidSecondsFromChinesePrompt(row.aiVideoPrompt ?? undefined)
  if (zh !== null) return zh
  const en = extractValidSecondsFromEnglishPrompt(row.aiVideoPrompt ?? undefined)
  if (en !== null) return en
  return DEFAULT_SEC
}

export function formatShotDurationZh(seconds: number): string {
  return `${seconds}秒`
}

/**
 * 同步「duration」与中文 aiVideoPrompt 中的【时长】；缺省时补全。
 */
export function normalizeChineseStoryboardRow(
  row: { duration?: string; aiVideoPrompt?: string },
  index: number
): { duration: string; aiVideoPrompt: string } {
  const sec = resolveShotSeconds(row)
  const duration = formatShotDurationZh(sec)
  let aiVideoPrompt = String(row.aiVideoPrompt ?? '').trim()

  if (aiVideoPrompt.includes('【时长】')) {
    aiVideoPrompt = aiVideoPrompt.replace(/【时长】[^【]*/g, `【时长】${duration}`)
  } else if (aiVideoPrompt) {
    aiVideoPrompt = `${aiVideoPrompt} 【时长】${duration}`
  } else {
    aiVideoPrompt = `【镜头语言】固定镜头 【画面内容】场景${index + 1} 【对话】无 【画外音】无 【色调】自然光 【氛围】平静 【时长】${duration}`
  }

  return { duration, aiVideoPrompt }
}

/**
 * generate-episode：英文提示词场景，统一 duration 为「N秒」，并在提示词末尾保证有单镜头秒数说明。
 */
const ENGLISH_CLIP_SUFFIX = /\s*Single\s+\d+s\s+one-take\s+vertical\s+clip\.?\s*$/i

export function normalizeEpisodeSceneRow(row: {
  duration?: string
  aiVideoPrompt?: string
}): { duration: string; aiVideoPrompt: string } {
  const sec = resolveShotSeconds(row)
  const duration = formatShotDurationZh(sec)
  const tag = `Single ${sec}s one-take vertical clip.`
  let p = String(row.aiVideoPrompt ?? '').trim().replace(ENGLISH_CLIP_SUFFIX, '').trim()
  p = p ? `${p} ${tag}` : tag
  return { duration, aiVideoPrompt: p }
}
