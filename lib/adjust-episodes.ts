import type { Episode } from '@/lib/types'

/**
 * 按新的总集数增删剧集：多出的集为草稿空分镜；减少时截断末尾集。
 */
export function adjustEpisodesForTotalCount(episodes: Episode[], nextTotal: number): Episode[] {
  const n = Math.max(1, Math.min(100, Math.floor(nextTotal)))
  if (n === episodes.length) {
    return episodes.map((ep, i) => ({ ...ep, episodeNumber: i + 1 }))
  }
  if (n > episodes.length) {
    const out: Episode[] = episodes.map((ep, i) => ({ ...ep, episodeNumber: i + 1 }))
    for (let i = episodes.length; i < n; i++) {
      out.push({
        id: crypto.randomUUID(),
        episodeNumber: i + 1,
        title: `第 ${i + 1} 集`,
        synopsis: '',
        storyboard: [],
        status: '草稿',
      })
    }
    return out
  }
  return episodes.slice(0, n).map((ep, i) => ({
    ...ep,
    episodeNumber: i + 1,
  }))
}
