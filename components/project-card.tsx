'use client'

import { Film, Users, Layers, Trash2, ChevronRight } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import type { Project } from '@/lib/types'

const genreConfig: Record<string, { bg: string; text: string; border: string; icon: string }> = {
  复仇: { bg: 'bg-red-950/50', text: 'text-red-400', border: 'border-red-900/50', icon: '⚔️' },
  爱情: { bg: 'bg-pink-950/50', text: 'text-pink-400', border: 'border-pink-900/50', icon: '💕' },
  甜宠: { bg: 'bg-rose-950/50', text: 'text-rose-400', border: 'border-rose-900/50', icon: '🍬' },
  霸总: { bg: 'bg-violet-950/50', text: 'text-violet-400', border: 'border-violet-900/50', icon: '👔' },
  虐恋: { bg: 'bg-fuchsia-950/50', text: 'text-fuchsia-400', border: 'border-fuchsia-900/50', icon: '💔' },
  悬疑: { bg: 'bg-purple-950/50', text: 'text-purple-400', border: 'border-purple-900/50', icon: '🔍' },
  喜剧: { bg: 'bg-yellow-950/50', text: 'text-yellow-400', border: 'border-yellow-900/50', icon: '😄' },
  奇幻: { bg: 'bg-indigo-950/50', text: 'text-indigo-400', border: 'border-indigo-900/50', icon: '✨' },
  都市: { bg: 'bg-blue-950/50', text: 'text-blue-400', border: 'border-blue-900/50', icon: '🏙️' },
  古装: { bg: 'bg-amber-950/50', text: 'text-amber-400', border: 'border-amber-900/50', icon: '🏯' },
  科幻: { bg: 'bg-cyan-950/50', text: 'text-cyan-400', border: 'border-cyan-900/50', icon: '🚀' },
  武侠: { bg: 'bg-orange-950/50', text: 'text-orange-400', border: 'border-orange-900/50', icon: '🗡️' },
  仙侠: { bg: 'bg-sky-950/50', text: 'text-sky-400', border: 'border-sky-900/50', icon: '☁️' },
  恐怖: { bg: 'bg-gray-950/50', text: 'text-gray-400', border: 'border-gray-900/50', icon: '👻' },
  历史: { bg: 'bg-stone-950/50', text: 'text-stone-400', border: 'border-stone-900/50', icon: '📜' },
  战争: { bg: 'bg-red-950/60', text: 'text-red-500', border: 'border-red-900/60', icon: '🛡️' },
  犯罪: { bg: 'bg-slate-950/50', text: 'text-slate-400', border: 'border-slate-900/50', icon: '🎭' },
  青春: { bg: 'bg-green-950/50', text: 'text-green-400', border: 'border-green-900/50', icon: '🌸' },
  家庭: { bg: 'bg-teal-950/50', text: 'text-teal-400', border: 'border-teal-900/50', icon: '🏠' },
  励志: { bg: 'bg-emerald-950/50', text: 'text-emerald-400', border: 'border-emerald-900/50', icon: '💪' },
  穿越: { bg: 'bg-violet-950/40', text: 'text-violet-300', border: 'border-violet-900/40', icon: '🌀' },
  重生: { bg: 'bg-purple-950/40', text: 'text-purple-300', border: 'border-purple-900/40', icon: '🔁' },
  系统流: { bg: 'bg-lime-950/50', text: 'text-lime-400', border: 'border-lime-900/50', icon: '📟' },
  脑洞: { bg: 'bg-pink-950/40', text: 'text-pink-300', border: 'border-pink-900/40', icon: '💡' },
  宫廷: { bg: 'bg-amber-950/60', text: 'text-amber-300', border: 'border-amber-900/60', icon: '👑' },
  民国: { bg: 'bg-neutral-950/50', text: 'text-neutral-400', border: 'border-neutral-900/50', icon: '🎩' },
  电竞: { bg: 'bg-emerald-950/40', text: 'text-emerald-300', border: 'border-emerald-900/40', icon: '🎮' },
  末世: { bg: 'bg-zinc-950/50', text: 'text-zinc-400', border: 'border-zinc-900/50', icon: '☢️' },
  乡村: { bg: 'bg-lime-950/40', text: 'text-lime-300', border: 'border-lime-900/40', icon: '🌾' },
  职场: { bg: 'bg-blue-950/60', text: 'text-blue-300', border: 'border-blue-900/60', icon: '💼' },
  二次元: { bg: 'bg-fuchsia-950/50', text: 'text-fuchsia-400', border: 'border-fuchsia-900/50', icon: '🎀' },
  刑侦: { bg: 'bg-slate-950/60', text: 'text-slate-300', border: 'border-slate-900/60', icon: '🚔' },
  律政: { bg: 'bg-blue-950/70', text: 'text-blue-200', border: 'border-blue-900/70', icon: '⚖️' },
  医疗: { bg: 'bg-sky-950/50', text: 'text-sky-300', border: 'border-sky-900/50', icon: '🏥' },
  军旅: { bg: 'bg-green-950/60', text: 'text-green-300', border: 'border-green-900/60', icon: '🎖️' },
}

interface ProjectCardProps {
  project: Project
  onClick: () => void
  onDelete: (e: React.MouseEvent) => void
}

export function ProjectCard({ project, onClick, onDelete }: ProjectCardProps) {
  const gc = genreConfig[project.genre] || genreConfig['都市']
  const completedEps = project.episodes.filter((e) => e.status === '已完成').length
  const totalScenes = project.episodes.reduce((acc, ep) => acc + ep.storyboard.length, 0)

  return (
    <div
      className="group relative flex cursor-pointer items-center gap-4 rounded-xl border border-border/60 bg-card p-4 transition-all duration-200 hover:border-primary/30 hover:bg-secondary/50"
      onClick={onClick}
    >
      {/* Left accent bar */}
      <div className={`h-12 w-1 shrink-0 rounded-full ${gc.bg} ${gc.border} border`} />

      {/* Content */}
      <div className="flex min-w-0 flex-1 flex-col gap-1.5">
        <div className="flex items-center gap-2">
          <h3 className="truncate text-sm font-semibold text-foreground">{project.title}</h3>
          <Badge variant="outline" className={`${gc.bg} ${gc.text} ${gc.border} shrink-0 text-[10px] px-1.5 py-0 flex items-center gap-1`}>
            <span>{gc.icon}</span>
            {project.genre}
          </Badge>
          <Badge variant="secondary" className="shrink-0 text-[10px] px-1.5 py-0">
            {project.visualStyle}
          </Badge>
        </div>
        <p className="line-clamp-1 text-xs text-muted-foreground">{project.storyline}</p>
        <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
          <span className="flex items-center gap-1">
            <Layers className="h-3 w-3" />
            {completedEps}/{project.totalEpisodes} 集
          </span>
          <span className="flex items-center gap-1">
            <Users className="h-3 w-3" />
            {project.characters.length} 角色
          </span>
          {totalScenes > 0 && (
            <span className="text-primary/80">{totalScenes} 个分镜</span>
          )}
        </div>
      </div>

      {/* Right area */}
      <div className="flex shrink-0 items-center gap-1">
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 text-muted-foreground opacity-0 transition-opacity hover:text-destructive group-hover:opacity-100"
          onClick={onDelete}
        >
          <Trash2 className="h-3.5 w-3.5" />
          <span className="sr-only">删除</span>
        </Button>
        <ChevronRight className="h-4 w-4 text-muted-foreground/40 transition-colors group-hover:text-primary/60" />
      </div>
    </div>
  )
}
