import type { Genre } from './types'

export interface GenreMetadata {
  name: Genre
  label: string
  description: string
  color: string
  icon: string
}

export const genreMetadata: Record<Genre, GenreMetadata> = {
  复仇: {
    name: '复仇',
    label: '复仇',
    description: '复仇主线，强冲突',
    color: 'text-red-500',
    icon: '⚔️',
  },
  爱情: {
    name: '爱情',
    label: '爱情',
    description: '情感与关系',
    color: 'text-pink-500',
    icon: '💕',
  },
  甜宠: {
    name: '甜宠',
    label: '甜宠',
    description: '高甜互动、轻松撒糖',
    color: 'text-rose-400',
    icon: '🍬',
  },
  霸总: {
    name: '霸总',
    label: '霸总',
    description: '总裁/豪门、权力与张力',
    color: 'text-violet-500',
    icon: '👔',
  },
  虐恋: {
    name: '虐恋',
    label: '虐恋',
    description: '情感拉扯、误会与救赎',
    color: 'text-fuchsia-600',
    icon: '💔',
  },
  悬疑: {
    name: '悬疑',
    label: '悬疑',
    description: '悬念、推理与反转',
    color: 'text-purple-500',
    icon: '🔍',
  },
  喜剧: {
    name: '喜剧',
    label: '喜剧',
    description: '轻松幽默、笑点密集',
    color: 'text-yellow-500',
    icon: '😄',
  },
  奇幻: {
    name: '奇幻',
    label: '奇幻',
    description: '魔法、异世界与想象',
    color: 'text-indigo-500',
    icon: '✨',
  },
  都市: {
    name: '都市',
    label: '都市',
    description: '现代城市、职场与生活',
    color: 'text-blue-500',
    icon: '🏙️',
  },
  古装: {
    name: '古装',
    label: '古装',
    description: '古代服饰与礼制背景',
    color: 'text-amber-500',
    icon: '🏯',
  },
  科幻: {
    name: '科幻',
    label: '科幻',
    description: '科技、未来与太空',
    color: 'text-cyan-500',
    icon: '🚀',
  },
  武侠: {
    name: '武侠',
    label: '武侠',
    description: '江湖、侠义与武功',
    color: 'text-orange-500',
    icon: '🗡️',
  },
  仙侠: {
    name: '仙侠',
    label: '仙侠',
    description: '修仙、神话与三界',
    color: 'text-sky-500',
    icon: '☁️',
  },
  恐怖: {
    name: '恐怖',
    label: '恐怖',
    description: '惊悚、悬疑氛围',
    color: 'text-gray-500',
    icon: '👻',
  },
  历史: {
    name: '历史',
    label: '历史',
    description: '历史背景与人物',
    color: 'text-stone-500',
    icon: '📜',
  },
  战争: {
    name: '战争',
    label: '战争',
    description: '战争场面与人性',
    color: 'text-red-700',
    icon: '🛡️',
  },
  犯罪: {
    name: '犯罪',
    label: '犯罪',
    description: '罪案、黑帮与博弈',
    color: 'text-slate-500',
    icon: '🎭',
  },
  青春: {
    name: '青春',
    label: '青春',
    description: '校园与成长',
    color: 'text-green-500',
    icon: '🌸',
  },
  家庭: {
    name: '家庭',
    label: '家庭',
    description: '亲情与家庭关系',
    color: 'text-teal-500',
    icon: '🏠',
  },
  励志: {
    name: '励志',
    label: '励志',
    description: '奋斗逆袭、正能量',
    color: 'text-emerald-500',
    icon: '💪',
  },
  穿越: {
    name: '穿越',
    label: '穿越',
    description: '时空穿越、身份错位',
    color: 'text-violet-400',
    icon: '🌀',
  },
  重生: {
    name: '重生',
    label: '重生',
    description: '重生归来、改写命运',
    color: 'text-purple-400',
    icon: '🔁',
  },
  系统流: {
    name: '系统流',
    label: '系统流',
    description: '系统任务、数值与金手指',
    color: 'text-lime-500',
    icon: '📟',
  },
  脑洞: {
    name: '脑洞',
    label: '脑洞',
    description: '高概念、反套路设定',
    color: 'text-pink-400',
    icon: '💡',
  },
  宫廷: {
    name: '宫廷',
    label: '宫廷',
    description: '宫斗、权谋与朝堂',
    color: 'text-amber-600',
    icon: '👑',
  },
  民国: {
    name: '民国',
    label: '民国',
    description: '民国年代、乱世情缘',
    color: 'text-neutral-500',
    icon: '🎩',
  },
  电竞: {
    name: '电竞',
    label: '电竞',
    description: '电竞赛事与战队',
    color: 'text-emerald-400',
    icon: '🎮',
  },
  末世: {
    name: '末世',
    label: '末世',
    description: '废土、求生与秩序崩塌',
    color: 'text-zinc-500',
    icon: '☢️',
  },
  乡村: {
    name: '乡村',
    label: '乡村',
    description: '乡土、田园与小镇',
    color: 'text-lime-600',
    icon: '🌾',
  },
  职场: {
    name: '职场',
    label: '职场',
    description: '职场博弈与成长',
    color: 'text-blue-600',
    icon: '💼',
  },
  二次元: {
    name: '二次元',
    label: '二次元',
    description: 'ACG 世界观与梗文化',
    color: 'text-fuchsia-500',
    icon: '🎀',
  },
  刑侦: {
    name: '刑侦',
    label: '刑侦',
    description: '刑侦破案、追凶',
    color: 'text-slate-600',
    icon: '🚔',
  },
  律政: {
    name: '律政',
    label: '律政',
    description: '法庭、律师与正义',
    color: 'text-blue-800',
    icon: '⚖️',
  },
  医疗: {
    name: '医疗',
    label: '医疗',
    description: '医院、急救与医患',
    color: 'text-sky-600',
    icon: '🏥',
  },
  军旅: {
    name: '军旅',
    label: '军旅',
    description: '军营、任务与战友情',
    color: 'text-green-700',
    icon: '🎖️',
  },
}

export function getGenreMetadata(genre: Genre): GenreMetadata {
  return genreMetadata[genre]
}

export const allGenres: Genre[] = Object.keys(genreMetadata) as Genre[]
