'use client'

import { useState } from 'react'
import { Pencil, Trash2, Save, X, Clapperboard, MessageSquare, Video } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import type { StoryboardEntry } from '@/lib/types'
import { cn } from '@/lib/utils'

interface StoryboardTableViewProps {
  entries: StoryboardEntry[]
  onUpdate: (entries: StoryboardEntry[]) => void
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="mb-1 block text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
      {children}
    </span>
  )
}

export function StoryboardTableView({ entries, onUpdate }: StoryboardTableViewProps) {
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editData, setEditData] = useState<StoryboardEntry | null>(null)

  const startEdit = (entry: StoryboardEntry) => {
    setEditingId(entry.id)
    setEditData({ ...entry })
  }

  const cancelEdit = () => {
    setEditingId(null)
    setEditData(null)
  }

  const saveEdit = () => {
    if (!editData) return
    onUpdate(entries.map((e) => (e.id === editData.id ? editData : e)))
    cancelEdit()
  }

  const deleteScene = (id: string) => {
    onUpdate(
      entries
        .filter((e) => e.id !== id)
        .map((e, i) => ({ ...e, sceneNumber: i + 1 }))
    )
  }

  if (entries.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border/60 bg-muted/20 py-20 text-center">
        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
          <Clapperboard className="h-6 w-6 text-primary/80" />
        </div>
        <p className="text-sm font-medium text-foreground">暂无分镜</p>
        <p className="mt-1 max-w-sm text-xs leading-relaxed text-muted-foreground">
          在上方点击「生成本集分镜」，或稍后再试。生成后可在此逐条编辑并自动保存。
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4 pb-8">
      <div className="flex flex-wrap items-end justify-between gap-2 border-b border-border/40 pb-3">
        <div>
          <h4 className="text-sm font-semibold text-foreground">分镜脚本</h4>
          <p className="mt-0.5 text-xs text-muted-foreground">
            共 {entries.length} 条镜头 · 单条编辑后自动写入项目 · 场景描述建议写满时空、环境、人物动作与细节，便于拍摄与 AI 成片
          </p>
        </div>
      </div>

      <div className="grid gap-4">
        {entries.map((entry) => {
          const isEditing = editingId === entry.id

          if (isEditing && editData) {
            return (
              <Card
                key={entry.id}
                className="overflow-hidden border-primary/25 bg-card/80 shadow-md ring-1 ring-primary/15"
              >
                <CardHeader className="flex flex-row items-center justify-between gap-3 space-y-0 border-b border-border/50 bg-primary/[0.06] py-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/20 text-sm font-bold text-primary">
                      {editData.sceneNumber}
                    </span>
                    <span className="text-xs font-medium text-muted-foreground">编辑分镜</span>
                  </div>
                  <div className="flex gap-1.5">
                    <Button size="sm" className="h-8 gap-1 text-xs" onClick={saveEdit}>
                      <Save className="h-3.5 w-3.5" />
                      保存本条
                    </Button>
                    <Button size="sm" variant="ghost" className="h-8 text-xs" onClick={cancelEdit}>
                      <X className="h-3.5 w-3.5" />
                      取消
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="grid gap-4 pt-5 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <FieldLabel>场景描述（完整场景）</FieldLabel>
                    <Textarea
                      value={editData.sceneDescription}
                      onChange={(e) => setEditData({ ...editData, sceneDescription: e.target.value })}
                      placeholder="建议写清：日/夜与光线、具体空间与陈设、人物站位与动作表情、关键道具、本镜叙事作用等，越详细越好。"
                      className="min-h-[140px] text-sm leading-relaxed"
                    />
                  </div>
                  <div>
                    <FieldLabel>镜头运动</FieldLabel>
                    <Input
                      value={editData.cameraMovement}
                      onChange={(e) => setEditData({ ...editData, cameraMovement: e.target.value })}
                      className="text-sm"
                    />
                  </div>
                  <div>
                    <FieldLabel>时长</FieldLabel>
                    <Input
                      value={editData.duration}
                      onChange={(e) => setEditData({ ...editData, duration: e.target.value })}
                      className="text-sm"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <FieldLabel>对话内容</FieldLabel>
                    <Textarea
                      value={editData.dialogue}
                      onChange={(e) => setEditData({ ...editData, dialogue: e.target.value })}
                      className="min-h-[72px] text-sm leading-relaxed"
                    />
                  </div>
                  <div>
                    <FieldLabel>出场角色</FieldLabel>
                    <Input
                      value={editData.characterInScene}
                      onChange={(e) => setEditData({ ...editData, characterInScene: e.target.value })}
                      className="text-sm"
                    />
                  </div>
                  <div>
                    <FieldLabel>情绪</FieldLabel>
                    <Input
                      value={editData.mood}
                      onChange={(e) => setEditData({ ...editData, mood: e.target.value })}
                      className="text-sm"
                    />
                  </div>
                  <div>
                    <FieldLabel>画外音</FieldLabel>
                    <Input
                      value={editData.voiceOver || ''}
                      onChange={(e) => setEditData({ ...editData, voiceOver: e.target.value })}
                      className="text-sm"
                    />
                  </div>
                  <div>
                    <FieldLabel>画面色调</FieldLabel>
                    <Input
                      value={editData.colorTone || ''}
                      onChange={(e) => setEditData({ ...editData, colorTone: e.target.value })}
                      className="text-sm"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <FieldLabel>视觉元素</FieldLabel>
                    <Textarea
                      value={editData.visualElements}
                      onChange={(e) => setEditData({ ...editData, visualElements: e.target.value })}
                      className="min-h-[56px] text-sm"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <FieldLabel>视频拍摄提示词</FieldLabel>
                    <Textarea
                      value={editData.aiVideoPrompt || ''}
                      onChange={(e) => setEditData({ ...editData, aiVideoPrompt: e.target.value })}
                      className="min-h-[120px] font-mono text-xs leading-relaxed"
                    />
                  </div>
                </CardContent>
              </Card>
            )
          }

          return (
            <Card
              key={entry.id}
              className="group overflow-hidden border-border/60 bg-card/50 transition-shadow hover:border-border hover:shadow-md"
            >
              <CardHeader className="flex flex-row flex-wrap items-start justify-between gap-3 space-y-0 border-b border-border/40 py-3">
                <div className="flex min-w-0 flex-1 flex-wrap items-center gap-2">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/12 text-sm font-bold text-primary">
                    {entry.sceneNumber}
                  </span>
                  <div className="min-w-0">
                    <p className="line-clamp-2 text-sm font-medium leading-snug text-foreground">
                      {entry.sceneDescription || `镜头 ${entry.sceneNumber}`}
                    </p>
                  </div>
                </div>
                <div className="flex shrink-0 flex-wrap items-center gap-1.5">
                  <Badge variant="secondary" className="font-mono text-[10px] tabular-nums">
                    {entry.duration}
                  </Badge>
                  {entry.mood ? (
                    <Badge variant="outline" className="text-[10px]">
                      {entry.mood}
                    </Badge>
                  ) : null}
                  <div className="ml-1 flex gap-0.5 opacity-100 sm:opacity-0 sm:transition-opacity sm:group-hover:opacity-100">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => startEdit(entry)}
                      title="编辑"
                    >
                      <Pencil className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive hover:text-destructive"
                      onClick={() => deleteScene(entry.id)}
                      title="删除"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="grid gap-4 pt-4 lg:grid-cols-2">
                <div className="space-y-3 lg:col-span-2">
                  <div className="flex items-start gap-2 text-sm leading-relaxed text-foreground/90">
                    <Clapperboard className="mt-0.5 h-4 w-4 shrink-0 text-primary/70" />
                    <div>
                      <span className="text-[11px] font-medium text-muted-foreground">场景与动作</span>
                      <p className="mt-0.5 whitespace-pre-wrap">{entry.sceneDescription}</p>
                    </div>
                  </div>
                  {(entry.dialogue || '').trim() ? (
                    <div className="flex items-start gap-2 text-sm leading-relaxed text-foreground/90">
                      <MessageSquare className="mt-0.5 h-4 w-4 shrink-0 text-sky-500/80" />
                      <div>
                        <span className="text-[11px] font-medium text-muted-foreground">对白</span>
                        <p className="mt-0.5 whitespace-pre-wrap">{entry.dialogue}</p>
                      </div>
                    </div>
                  ) : null}
                </div>

                <div className="space-y-2 rounded-lg bg-muted/30 p-3 text-xs lg:col-span-2">
                  <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
                    <div>
                      <span className="text-[10px] text-muted-foreground">镜头</span>
                      <p className="mt-0.5 text-foreground/90">{entry.cameraMovement || '—'}</p>
                    </div>
                    <div>
                      <span className="text-[10px] text-muted-foreground">角色</span>
                      <p className="mt-0.5 text-foreground/90">{entry.characterInScene || '—'}</p>
                    </div>
                    <div>
                      <span className="text-[10px] text-muted-foreground">画外音</span>
                      <p className="mt-0.5 text-foreground/90">{entry.voiceOver?.trim() || '—'}</p>
                    </div>
                    <div>
                      <span className="text-[10px] text-muted-foreground">色调</span>
                      <p className="mt-0.5 text-foreground/90">{entry.colorTone?.trim() || '—'}</p>
                    </div>
                  </div>
                  {(entry.visualElements || '').trim() ? (
                    <>
                      <Separator className="my-1 bg-border/60" />
                      <div>
                        <span className="text-[10px] text-muted-foreground">视觉元素</span>
                        <p className="mt-0.5 leading-relaxed text-foreground/85">{entry.visualElements}</p>
                      </div>
                    </>
                  ) : null}
                </div>

                <div className="lg:col-span-2">
                  <div className="flex items-center gap-2 text-[11px] font-medium text-muted-foreground">
                    <Video className="h-3.5 w-3.5 text-amber-500/90" />
                    AI 视频提示词
                  </div>
                  <pre
                    className={cn(
                      'mt-2 max-h-48 overflow-auto rounded-lg border border-border/50 bg-muted/40 p-3',
                      'whitespace-pre-wrap font-mono text-[11px] leading-relaxed text-foreground/90'
                    )}
                  >
                    {entry.aiVideoPrompt?.trim() || '—'}
                  </pre>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
