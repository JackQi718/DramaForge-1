'use client'

import { AlertCircle, ExternalLink } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'

export function SupabaseConfigWarning() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="max-w-2xl w-full space-y-6">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Supabase 未配置</AlertTitle>
          <AlertDescription className="mt-2 space-y-4">
            <p>
              应用需要 Supabase 数据库才能正常运行。请按照以下步骤配置：
            </p>
            
            <div className="space-y-2 text-sm">
              <p className="font-semibold">步骤 1: 创建 Supabase 项目</p>
              <ol className="list-decimal list-inside space-y-1 ml-2">
                <li>访问 <a href="https://supabase.com" target="_blank" rel="noopener noreferrer" className="underline">supabase.com</a></li>
                <li>注册/登录账号</li>
                <li>创建新项目</li>
                <li>等待项目初始化完成</li>
              </ol>
            </div>

            <div className="space-y-2 text-sm">
              <p className="font-semibold">步骤 2: 获取 API 密钥</p>
              <ol className="list-decimal list-inside space-y-1 ml-2">
                <li>在项目仪表板中，点击 Settings → API</li>
                <li>复制 Project URL</li>
                <li>复制 anon public key</li>
              </ol>
            </div>

            <div className="space-y-2 text-sm">
              <p className="font-semibold">步骤 3: 配置环境变量</p>
              <p className="ml-2">在项目根目录的 <code className="bg-muted px-1 py-0.5 rounded">.env.local</code> 文件中添加：</p>
              <pre className="bg-muted p-3 rounded-lg overflow-x-auto text-xs">
{`NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here`}
              </pre>
            </div>

            <div className="space-y-2 text-sm">
              <p className="font-semibold">步骤 4: 创建数据库表</p>
              <ol className="list-decimal list-inside space-y-1 ml-2">
                <li>在 Supabase 仪表板中，点击 SQL Editor</li>
                <li>复制 <code className="bg-muted px-1 py-0.5 rounded">lib/supabase/schema.sql</code> 的内容</li>
                <li>粘贴并运行 SQL</li>
              </ol>
            </div>

            <div className="space-y-2 text-sm">
              <p className="font-semibold">步骤 5: 重启开发服务器</p>
              <pre className="bg-muted p-3 rounded-lg text-xs">
npm run dev
              </pre>
            </div>

            <div className="flex gap-2 mt-4">
              <Button asChild variant="outline" size="sm">
                <a href="https://supabase.com" target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  访问 Supabase
                </a>
              </Button>
              <Button asChild variant="outline" size="sm">
                <a href="/SUPABASE_SETUP.md" target="_blank" rel="noopener noreferrer">
                  查看详细文档
                </a>
              </Button>
            </div>
          </AlertDescription>
        </Alert>

        <div className="text-center text-sm text-muted-foreground">
          <p>配置完成后，刷新页面即可使用应用</p>
        </div>
      </div>
    </div>
  )
}
