'use client'

import { useState, useEffect, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { Clapperboard } from 'lucide-react'
import { LoginForm } from '@/components/auth/login-form'
import { SignupForm } from '@/components/auth/signup-form'
import { SupabaseConfigWarning } from '@/components/supabase-config-warning'
import { useAuth } from '@/lib/supabase/auth-context'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function AuthPage() {
  const router = useRouter()
  const authContext = useAuth()
  const { user, loading } = authContext
  const isConfigured = useMemo(() => authContext.isConfigured, [authContext.isConfigured])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted && !loading && user && isConfigured) {
      router.push('/')
    }
  }, [mounted, loading, user, isConfigured, router])

  if (!mounted || loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    )
  }

  // 如果 Supabase 未配置，显示配置提示
  if (!isConfigured) {
    return <SupabaseConfigWarning />
  }

  if (user) {
    return null
  }

  return (
    <div className="flex min-h-screen">
      {/* Left side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary/20 via-primary/10 to-background items-center justify-center p-12">
        <div className="max-w-md space-y-6">
          <div className="flex items-center gap-3">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/20 ring-2 ring-primary/30">
              <Clapperboard className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">DramaForge</h1>
              <p className="text-sm text-muted-foreground">AI 短剧创作工坊</p>
            </div>
          </div>
          
          <div className="space-y-4 text-foreground/80">
            <h2 className="text-2xl font-semibold">开启你的创作之旅</h2>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/20 text-xs font-bold text-primary">
                  1
                </span>
                <div>
                  <p className="font-medium">AI 智能生成</p>
                  <p className="text-sm text-muted-foreground">
                    基于 DeepSeek AI，自动生成完整的剧本和分镜
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/20 text-xs font-bold text-primary">
                  2
                </span>
                <div>
                  <p className="font-medium">专业分镜表格</p>
                  <p className="text-sm text-muted-foreground">
                    详细的场景描述、镜头语言、视频拍摄提示词
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/20 text-xs font-bold text-primary">
                  3
                </span>
                <div>
                  <p className="font-medium">云端同步</p>
                  <p className="text-sm text-muted-foreground">
                    所有项目自动保存到云端，随时随地访问
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Right side - Auth forms */}
      <div className="flex w-full lg:w-1/2 items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          {/* Mobile logo */}
          <div className="flex lg:hidden items-center justify-center gap-3 mb-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/20 ring-2 ring-primary/30">
              <Clapperboard className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">DramaForge</h1>
              <p className="text-xs text-muted-foreground">AI 短剧创作工坊</p>
            </div>
          </div>

          <div className="space-y-2 text-center">
            <h2 className="text-2xl font-bold text-foreground">欢迎使用</h2>
            <p className="text-sm text-muted-foreground">
              登录或注册开始创作你的短剧
            </p>
          </div>

          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">登录</TabsTrigger>
              <TabsTrigger value="signup">注册</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login" className="mt-6">
              <LoginForm
                onSuccess={() => router.push('/')}
                onSwitchToSignup={() => {
                  const signupTab = document.querySelector('[value="signup"]') as HTMLElement
                  signupTab?.click()
                }}
              />
            </TabsContent>
            
            <TabsContent value="signup" className="mt-6">
              <SignupForm
                onSuccess={() => router.push('/')}
                onSwitchToLogin={() => {
                  const loginTab = document.querySelector('[value="login"]') as HTMLElement
                  loginTab?.click()
                }}
              />
            </TabsContent>
          </Tabs>

          <div className="text-center text-xs text-muted-foreground">
            <p>
              注册即表示你同意我们的
              <a href="#" className="text-primary hover:underline ml-1">服务条款</a>
              和
              <a href="#" className="text-primary hover:underline ml-1">隐私政策</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
