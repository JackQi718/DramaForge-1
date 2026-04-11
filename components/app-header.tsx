'use client'

import { ArrowLeft, Clapperboard, Plus, LogOut, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ThemeToggleSimple } from '@/components/theme-toggle-simple'
import { useAuth } from '@/lib/supabase/auth-context'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { toast } from 'sonner'

interface AppHeaderProps {
  onNewProject: () => void
  showBack?: boolean
  onBack?: () => void
  title?: string
}

export function AppHeader({ onNewProject, showBack, onBack, title }: AppHeaderProps) {
  const { user, signOut } = useAuth()

  const handleSignOut = async () => {
    try {
      await signOut()
      toast.success('已退出登录')
    } catch (error) {
      toast.error('退出失败，请重试')
    }
  }

  const getUserInitials = () => {
    if (!user?.email) return 'U'
    return user.email.charAt(0).toUpperCase()
  }

  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-border/60 bg-card/50 px-6 backdrop-blur-sm">
      <div className="flex items-center gap-3">
        {showBack && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="mr-1 h-8 w-8 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">返回</span>
          </Button>
        )}
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/15 ring-1 ring-primary/25">
            <Clapperboard className="h-4 w-4 text-primary" />
          </div>
          {title ? (
            <h1 className="text-base font-semibold text-foreground">{title}</h1>
          ) : (
            <div>
              <h1 className="text-base font-semibold leading-none text-foreground">DramaForge</h1>
              <p className="mt-0.5 text-[11px] tracking-wide text-muted-foreground">
                AI 短剧创作工坊
              </p>
            </div>
          )}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <ThemeToggleSimple />
        {!showBack && (
          <Button onClick={onNewProject} size="sm" className="gap-1.5 text-xs font-medium">
            <Plus className="h-3.5 w-3.5" />
            新建项目
          </Button>
        )}
        
        {user && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-primary/20 text-primary text-xs font-semibold">
                    {getUserInitials()}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium">我的账号</p>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleSignOut}>
                <LogOut className="mr-2 h-4 w-4" />
                退出登录
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </header>
  )
}
