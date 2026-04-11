'use client'

import { useState } from 'react'
import { Camera, MessageSquare, Eye, Palette, Clock, Smile, Save, X, Pencil, Trash2, Sparkles } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import type { StoryboardEntry } from '@/lib/types'

interface StoryboardTableProps {
  entries: StoryboardEntry[]
  onUpdate: (entries: StoryboardEntry[]) => void
}

export function StoryboardTable({ entries, onUpdate }: StoryboardTableProps) {
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
      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border/50 py-16 text-center">
        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-secondary">
          <Camera className="h-5 w-5 text-muted-foreground/50" />
        </div>
        <p className="text-sm text-muted-foreground">暂无分镜数据</p>
        <p className="mt-1 text-xs text-muted-foreground/50">点击上方按钮为本集生成 AI 分镜</p>
      </div>
    )
  }

  return (
    <div className="grid gap-2.5">
      {entries.map((entry) => {
        const isEditing = editingId === entry.id

        if (isEditing && editData) {
          return (
            <div key={entry.id} className="rounded-xl border border-primary/30 bg-card p-4">
              <div className="mb-3 flex items-center justify-between">
                <div className="flex h-6 items-center gap-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded bg-primary/20 text-[10px] font-bold text-primary">
                    {editData.sceneNumber}
                  </span>
                  <span className="text-xs font-medium text-primary">编辑中</span>
                </div>
                <div className="flex gap-1">
                  <Button size="sm" variant="ghost" onClick={cancelEdit} className="h-6 gap-1 px-2 text-[11px] text-muted-foreground">
                    <X className="h-3 w-3" /> 取消
                  </Button>
                  <Button size="sm" onClick={saveEdit} className="h-6 gap-1 px-2 text-[11px]">
                    <Save className="h-3 w-3" /> 保存
                  </Button>
                </div>
              </div>
              <div className="grid gap-2.5">
                <div className="grid gap-1">
                  <label className="text-[10px] text-muted-foreground">场景描述（完整场景）</label>
                  <Textarea
                    value={editData.sceneDescription}
                    onChange={(e) => setEditData({ ...editData, sceneDescription: e.target.value })}
                    placeholder="时空与光线、空间层次、人物动作与细节、道具与叙事作用等，尽量写细。"
                    className="min-h-[120px] border-border/60 bg-secondary/50 text-xs resize-y"
                    rows={5}
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="grid gap-1">
                    <label className="text-[10px] text-muted-foreground">镜头运动</label>
                    <Input
                      value={editData.cameraMovement}
                      onChange={(e) => setEditData({ ...editData, cameraMovement: e.target.value })}
                      className="h-7 border-border/60 bg-secondary/50 text-xs"
                    />
                  </div>
                  <div className="grid gap-1">
                    <label className="text-[10px] text-muted-foreground">出场角色</label>
                    <Input
                      value={editData.characterInScene}
                      onChange={(e) => setEditData({ ...editData, characterInScene: e.target.value })}
                      className="h-7 border-border/60 bg-secondary/50 text-xs"
                    />
                  </div>
                </div>
                <div className="grid gap-1">
                  <label className="text-[10px] text-muted-foreground">角色对白</label>
                  <Textarea
                    value={editData.dialogue}
                    onChange={(e) => setEditData({ ...editData, dialogue: e.target.value })}
                    className="border-border/60 bg-secondary/50 text-xs resize-none"
                    rows={2}
                  />
                </div>
                <div className="grid gap-1">
                  <label className="text-[10px] text-muted-foreground">视觉元素</label>
                  <Input
                    value={editData.visualElements}
                    onChange={(e) => setEditData({ ...editData, visualElements: e.target.value })}
                    className="h-7 border-border/60 bg-secondary/50 text-xs"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="grid gap-1">
                    <label className="text-[10px] text-muted-foreground">时长</label>
                    <Input
                      value={editData.duration}
                      onChange={(e) => setEditData({ ...editData, duration: e.target.value })}
                      className="h-7 border-border/60 bg-secondary/50 text-xs"
                    />
                  </div>
                  <div className="grid gap-1">
                    <label className="text-[10px] text-muted-foreground">情绪基调</label>
                    <Input
                      value={editData.mood}
                      onChange={(e) => setEditData({ ...editData, mood: e.target.value })}
                      className="h-7 border-border/60 bg-secondary/50 text-xs"
                    />
                  </div>
                </div>
                <div className="grid gap-1">
                  <label className="text-[10px] text-muted-foreground flex items-center gap-1">
                    <Sparkles className="h-3 w-3" />
                    AI 视频生成提示词
                  </label>
                  <Textarea
                    value={editData.aiVideoPrompt || ''}
                    onChange={(e) => setEditData({ ...editData, aiVideoPrompt: e.target.value })}
                    className="border-border/60 bg-secondary/50 text-xs resize-none font-mono"
                    rows={3}
                    placeholder="cinematic shot, close-up, character walking..."
                  />
                </div>
              </div>
            </div>
          )
        }

        return (
          <div
            key={entry.id}
            className="group rounded-xl border border-border/40 bg-card/80 p-4 transition-colors hover:border-border"
          >
            {/* Header */}
            <div className="mb-2.5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded bg-primary/15 text-[10px] font-bold text-primary">
                  {entry.sceneNumber}
                </span>
                <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
                  <Clock className="h-2.5 w-2.5" /> {entry.duration}
                </span>
                <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
                  <Smile className="h-2.5 w-2.5" /> {entry.mood}
                </span>
              </div>
              <div className="flex gap-0.5 opacity-0 transition-opacity group-hover:opacity-100">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 text-muted-foreground hover:text-foreground"
                  onClick={() => startEdit(entry)}
                >
                  <Pencil className="h-3 w-3" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 text-muted-foreground hover:text-destructive"
                  onClick={() => deleteScene(entry.id)}
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </div>

            {/* Scene Description */}
            <p className="mb-3 text-xs leading-relaxed text-foreground/90">
              {entry.sceneDescription}
            </p>

            {/* Details grid */}
            <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 rounded-lg bg-secondary/40 p-3 text-[11px]">
              <div className="flex items-start gap-1.5">
                <Camera className="mt-px h-3 w-3 shrink-0 text-primary/70" />
                <span className="text-foreground/80">{entry.cameraMovement}</span>
              </div>
              <div className="flex items-start gap-1.5">
                <Eye className="mt-px h-3 w-3 shrink-0 text-primary/70" />
                <span className="text-foreground/80">{entry.characterInScene}</span>
              </div>
              <div className="col-span-2 flex items-start gap-1.5">
                <MessageSquare className="mt-px h-3 w-3 shrink-0 text-primary/70" />
                <span className="text-foreground/80">{entry.dialogue}</span>
              </div>
              <div className="col-span-2 flex items-start gap-1.5">
                <Palette className="mt-px h-3 w-3 shrink-0 text-primary/70" />
                <span className="text-foreground/80">{entry.visualElements}</span>
              </div>
              {entry.aiVideoPrompt && (
                <div className="col-span-2 flex items-start gap-1.5 mt-1 pt-2 border-t border-border/30">
                  <Sparkles className="mt-px h-3 w-3 shrink-0 text-primary/70" />
                  <span className="text-foreground/80 font-mono text-[10px]">{entry.aiVideoPrompt}</span>
                </div>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
