import { VisualStyle } from './types';

export interface VisualStyleMetadata {
  name: VisualStyle;
  label: string;
  description: string;
  color: string;
  icon: string;
  example: string;
}

export const visualStyleMetadata: Record<VisualStyle, VisualStyleMetadata> = {
  '真人实拍': {
    name: '真人实拍',
    label: '真人实拍',
    description: '真实演员拍摄，写实风格',
    color: 'text-blue-500',
    icon: '🎬',
    example: '电视剧、电影',
  },
  '动漫': {
    name: '动漫',
    label: '动漫',
    description: '日式动画风格',
    color: 'text-pink-500',
    icon: '🎨',
    example: '日本动画',
  },
  'CG': {
    name: 'CG',
    label: 'CG',
    description: '计算机生成图像',
    color: 'text-purple-500',
    icon: '💻',
    example: '3D动画',
  },
  '电影': {
    name: '电影',
    label: '电影',
    description: '电影级别的视觉效果',
    color: 'text-amber-500',
    icon: '🎥',
    example: '院线电影',
  },
  '卡通': {
    name: '卡通',
    label: '卡通',
    description: '卡通动画风格',
    color: 'text-yellow-500',
    icon: '🎪',
    example: '迪士尼风格',
  },
  '水墨画': {
    name: '水墨画',
    label: '水墨画',
    description: '中国传统水墨画风格',
    color: 'text-gray-500',
    icon: '🖌️',
    example: '山水画意境',
  },
  '赛博朋克': {
    name: '赛博朋克',
    label: '赛博朋克',
    description: '未来科技与霓虹灯',
    color: 'text-cyan-500',
    icon: '🌃',
    example: '银翼杀手',
  },
  '蒸汽朋克': {
    name: '蒸汽朋克',
    label: '蒸汽朋克',
    description: '维多利亚时代科技',
    color: 'text-orange-500',
    icon: '⚙️',
    example: '机械齿轮',
  },
  '像素风': {
    name: '像素风',
    label: '像素风',
    description: '复古像素艺术风格',
    color: 'text-green-500',
    icon: '🎮',
    example: '8位游戏',
  },
  '油画风': {
    name: '油画风',
    label: '油画风',
    description: '古典油画质感',
    color: 'text-red-500',
    icon: '🖼️',
    example: '文艺复兴',
  },
  '漫画风': {
    name: '漫画风',
    label: '漫画风',
    description: '漫画书风格',
    color: 'text-indigo-500',
    icon: '📚',
    example: '美式漫画',
  },
  '写实主义': {
    name: '写实主义',
    label: '写实主义',
    description: '高度写实的视觉风格',
    color: 'text-slate-500',
    icon: '📷',
    example: '纪录片风格',
  },
};

export function getVisualStyleMetadata(style: VisualStyle): VisualStyleMetadata {
  return visualStyleMetadata[style];
}

export const allVisualStyles: VisualStyle[] = Object.keys(visualStyleMetadata) as VisualStyle[];
