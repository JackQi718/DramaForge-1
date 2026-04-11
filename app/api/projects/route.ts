import { NextResponse } from 'next/server'
import { createSupabaseServerClient } from '@/lib/supabase/server'
import { createProjectForUser, fetchProjectsForUser } from '@/lib/supabase/project-service'
import type { Episode } from '@/lib/types'

function jsonError(message: string, status: number) {
  return NextResponse.json({ error: message }, { status })
}

export async function GET() {
  try {
    const supabase = await createSupabaseServerClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) return jsonError('未登录', 401)

    const projects = await fetchProjectsForUser(supabase, user.id)
    return NextResponse.json(projects)
  } catch (e) {
    console.error('[GET /api/projects]', e)
    return jsonError(e instanceof Error ? e.message : '服务器错误', 500)
  }
}

export async function POST(req: Request) {
  try {
    const supabase = await createSupabaseServerClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) return jsonError('未登录', 401)

    const body = await req.json()
    const totalEpisodes = Number(body.totalEpisodes) || 1

    const episodes: Episode[] = Array.from({ length: totalEpisodes }, (_, i) => ({
      id: crypto.randomUUID(),
      episodeNumber: i + 1,
      title: `第 ${i + 1} 集`,
      synopsis: '',
      storyboard: [],
      status: '草稿' as const,
    }))

    const project = await createProjectForUser(supabase, user.id, {
      title: body.title,
      genre: body.genre,
      visual_style: body.visualStyle,
      storyline: body.storyline,
      total_episodes: totalEpisodes,
      characters: body.characters ?? [],
      episodes,
    })

    return NextResponse.json(project, { status: 201 })
  } catch (e) {
    console.error('[POST /api/projects]', e)
    return jsonError(e instanceof Error ? e.message : '服务器错误', 500)
  }
}
