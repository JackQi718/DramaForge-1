'use client'

import { FolderOpen, Sparkles, Film, Layers, BookOpen } from 'lucide-react'
import { ProjectCard } from '@/components/project-card'
import { ScrollArea } from '@/components/ui/scroll-area'
import type { Project } from '@/lib/types'

interface ProjectDashboardProps {
  projects: Project[]
  onSelect: (project: Project) => void
  onDelete: (id: string) => void
  onNewProject: () => void
}

export function ProjectDashboard({ projects, onSelect, onDelete, onNewProject }: ProjectDashboardProps) {
  const completedCount = projects.filter((p) => p.status === '已完成').length
  const totalEps = projects.reduce((acc, p) => acc + p.totalEpisodes, 0)
  const totalScenes = projects.reduce(
    (acc, p) => acc + p.episodes.reduce((a, ep) => a + ep.storyboard.length, 0),
    0
  )

  return (
    <ScrollArea className="h-[calc(100vh-64px)]">
      <div className="mx-auto max-w-3xl px-6 py-8">
        {/* Welcome */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-foreground">工作台</h2>
          <p className="mt-1 text-xs text-muted-foreground">
            管理短剧项目，使用 AI 为每集自动生成剧本与分镜
          </p>
        </div>

        {/* Stats */}
        <div className="mb-8 grid grid-cols-4 gap-3">
          {[
            {
              icon: FolderOpen,
              label: '总项目',
              value: projects.length,
              color: 'text-primary',
              bg: 'bg-primary/10',
            },
            {
              icon: Sparkles,
              label: '已完成',
              value: completedCount,
              color: 'text-emerald-400',
              bg: 'bg-emerald-900/30',
            },
            {
              icon: Layers,
              label: '总集数',
              value: totalEps,
              color: 'text-sky-400',
              bg: 'bg-sky-900/30',
            },
            {
              icon: Film,
              label: '总分镜',
              value: totalScenes,
              color: 'text-amber-400',
              bg: 'bg-amber-900/30',
            },
          ].map(({ icon: Icon, label, value, color, bg }) => (
            <div
              key={label}
              className="flex items-center gap-3 rounded-xl border border-border/40 bg-card/80 p-3.5"
            >
              <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${bg}`}>
                <Icon className={`h-4 w-4 ${color}`} />
              </div>
              <div>
                <p className="text-lg font-bold text-foreground">{value}</p>
                <p className="text-[10px] text-muted-foreground">{label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Project List */}
        {projects.length > 0 ? (
          <div>
            <h3 className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              我的项目
            </h3>
            <div className="grid gap-2">
              {projects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onClick={() => onSelect(project)}
                  onDelete={(e) => {
                    e.stopPropagation()
                    onDelete(project.id)
                  }}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border/40 py-20">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-secondary">
              <BookOpen className="h-6 w-6 text-muted-foreground/40" />
            </div>
            <p className="text-sm font-medium text-muted-foreground">还没有项目</p>
            <p className="mt-1 text-xs text-muted-foreground/60">
              创建您的第一个短剧项目，开始 AI 创作之旅
            </p>
            <button
              onClick={onNewProject}
              className="mt-5 rounded-lg bg-primary px-5 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              创建第一个项目
            </button>
          </div>
        )}
      </div>
    </ScrollArea>
  )
}
