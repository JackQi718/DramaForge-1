import type { VisualStyle } from './types'

export interface VisualStyleMetadata {
  name: VisualStyle
  label: string
  description: string
  color: string
  icon: string
  example: string
}

export const visualStyleMetadata: Record<VisualStyle, VisualStyleMetadata> = {
  真人实拍: {
    name: '真人实拍',
    label: '真人实拍',
    description: '真人演员、实景或棚拍',
    color: 'text-blue-500',
    icon: '🎬',
    example: '短剧、网剧',
  },
  动漫: {
    name: '动漫',
    label: '二维动漫',
    description: '传统 2D 手绘/番剧平面感',
    color: 'text-pink-500',
    icon: '🎨',
    example: 'TV 动画、番剧',
  },
  '3D动漫': {
    name: '3D动漫',
    label: '3D 动漫',
    description: '全三维建模、渲染的动漫画面',
    color: 'text-pink-600',
    icon: '🎭',
    example: '3D 番剧、CG 动画',
  },
  三渲二: {
    name: '三渲二',
    label: '三渲二',
    description: '三维制作、卡通渲染（国漫常见）',
    color: 'text-rose-500',
    icon: '🧊',
    example: '国漫 3D、游戏过场',
  },
  国漫风: {
    name: '国漫风',
    label: '国漫风',
    description: '国漫人设、配色与镜头习惯',
    color: 'text-red-400',
    icon: '🐉',
    example: '玄幻国漫审美',
  },
  美漫风: {
    name: '美漫风',
    label: '美漫风',
    description: '美漫线条、色块与英雄叙事',
    color: 'text-indigo-400',
    icon: '🦸',
    example: '漫威式视觉',
  },
  CG: {
    name: 'CG',
    label: 'CG',
    description: '计算机图像、特效向',
    color: 'text-purple-500',
    icon: '💻',
    example: '电影级 CG',
  },
  电影: {
    name: '电影',
    label: '电影',
    description: '电影级构图与光影',
    color: 'text-amber-500',
    icon: '🎥',
    example: '院线质感',
  },
  卡通: {
    name: '卡通',
    label: '卡通',
    description: '夸张造型、儿童向卡通',
    color: 'text-yellow-500',
    icon: '🎪',
    example: '欧美卡通片',
  },
  水墨画: {
    name: '水墨画',
    label: '水墨画',
    description: '水墨晕染、留白意境',
    color: 'text-gray-500',
    icon: '🖌️',
    example: '山水意境',
  },
  赛博朋克: {
    name: '赛博朋克',
    label: '赛博朋克',
    description: '霓虹、科技与反乌托邦',
    color: 'text-cyan-500',
    icon: '🌃',
    example: '赛博城市',
  },
  蒸汽朋克: {
    name: '蒸汽朋克',
    label: '蒸汽朋克',
    description: '蒸汽机械、维多利亚幻想',
    color: 'text-orange-500',
    icon: '⚙️',
    example: '齿轮与黄铜',
  },
  像素风: {
    name: '像素风',
    label: '像素风',
    description: '复古像素美术',
    color: 'text-green-500',
    icon: '🎮',
    example: '8-bit 游戏',
  },
  油画风: {
    name: '油画风',
    label: '油画风',
    description: '油画笔触与质感',
    color: 'text-red-500',
    icon: '🖼️',
    example: '古典油画',
  },
  漫画风: {
    name: '漫画风',
    label: '漫画风',
    description: '分格、网点与漫画语言',
    color: 'text-indigo-500',
    icon: '📚',
    example: '条漫、美漫格',
  },
  写实主义: {
    name: '写实主义',
    label: '写实主义',
    description: '高度写实、纪录片感',
    color: 'text-slate-500',
    icon: '📷',
    example: '纪实美学',
  },
}

export function getVisualStyleMetadata(style: VisualStyle): VisualStyleMetadata {
  return visualStyleMetadata[style]
}

export const allVisualStyles: VisualStyle[] = Object.keys(visualStyleMetadata) as VisualStyle[]
