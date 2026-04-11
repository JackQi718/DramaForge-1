import { Genre } from './types';

export interface GenreMetadata {
  name: Genre;
  label: string;
  description: string;
  color: string;
  icon: string;
}

export const genreMetadata: Record<Genre, GenreMetadata> = {
  '复仇': {
    name: '复仇',
    label: '复仇',
    description: '以复仇为主线的故事，充满戏剧冲突',
    color: 'text-red-500',
    icon: '⚔️',
  },
  '爱情': {
    name: '爱情',
    label: '爱情',
    description: '浪漫爱情故事，情感细腻动人',
    color: 'text-pink-500',
    icon: '💕',
  },
  '悬疑': {
    name: '悬疑',
    label: '悬疑',
    description: '扣人心弦的悬疑推理故事',
    color: 'text-purple-500',
    icon: '🔍',
  },
  '喜剧': {
    name: '喜剧',
    label: '喜剧',
    description: '轻松幽默，带来欢乐的故事',
    color: 'text-yellow-500',
    icon: '😄',
  },
  '奇幻': {
    name: '奇幻',
    label: '奇幻',
    description: '充满魔法与想象的奇幻世界',
    color: 'text-indigo-500',
    icon: '✨',
  },
  '都市': {
    name: '都市',
    label: '都市',
    description: '现代都市生活故事',
    color: 'text-blue-500',
    icon: '🏙️',
  },
  '古装': {
    name: '古装',
    label: '古装',
    description: '古代背景的历史故事',
    color: 'text-amber-500',
    icon: '🏯',
  },
  '科幻': {
    name: '科幻',
    label: '科幻',
    description: '未来科技与太空探索',
    color: 'text-cyan-500',
    icon: '🚀',
  },
  '武侠': {
    name: '武侠',
    label: '武侠',
    description: '江湖恩怨，侠义精神',
    color: 'text-orange-500',
    icon: '🗡️',
  },
  '恐怖': {
    name: '恐怖',
    label: '恐怖',
    description: '惊悚恐怖，营造紧张氛围',
    color: 'text-gray-500',
    icon: '👻',
  },
  '历史': {
    name: '历史',
    label: '历史',
    description: '真实历史事件改编',
    color: 'text-stone-500',
    icon: '📜',
  },
  '战争': {
    name: '战争',
    label: '战争',
    description: '战争题材，展现人性与勇气',
    color: 'text-red-700',
    icon: '⚔️',
  },
  '犯罪': {
    name: '犯罪',
    label: '犯罪',
    description: '犯罪与侦破的较量',
    color: 'text-slate-500',
    icon: '🔫',
  },
  '青春': {
    name: '青春',
    label: '青春',
    description: '青春成长故事',
    color: 'text-green-500',
    icon: '🌸',
  },
  '家庭': {
    name: '家庭',
    label: '家庭',
    description: '温馨的家庭生活故事',
    color: 'text-teal-500',
    icon: '🏠',
  },
  '励志': {
    name: '励志',
    label: '励志',
    description: '激励人心的奋斗故事',
    color: 'text-emerald-500',
    icon: '💪',
  },
};

export function getGenreMetadata(genre: Genre): GenreMetadata {
  return genreMetadata[genre];
}

export const allGenres: Genre[] = Object.keys(genreMetadata) as Genre[];
