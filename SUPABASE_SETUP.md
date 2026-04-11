# Supabase 数据库配置指南

## 1. 创建 Supabase 项目

1. 访问 [Supabase](https://supabase.com/)
2. 注册/登录账号
3. 点击 "New Project" 创建新项目
4. 填写项目信息：
   - Name: `drama-forge` (或其他名称)
   - Database Password: 设置一个强密码
   - Region: 选择离你最近的区域
5. 等待项目创建完成（约 2 分钟）

## 2. 获取 API 密钥

1. 在项目仪表板中，点击左侧的 "Settings" (设置)
2. 点击 "API"
3. 复制以下信息：
   - `Project URL` → 这是你的 `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` key → 这是你的 `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## 3. 配置环境变量

在 `.env.local` 文件中添加：

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

## 4. 创建数据库表

1. 在 Supabase 仪表板中，点击左侧的 "SQL Editor"
2. 点击 "New query"
3. 复制 `lib/supabase/schema.sql` 文件的全部内容
4. 粘贴到 SQL 编辑器中
5. 点击 "Run" 执行 SQL

这将创建以下表：
- `profiles` - 用户配置表
- `projects` - 项目表
- `characters` - 角色表
- `episodes` - 剧集表
- `storyboard_entries` - 分镜表

## 5. 配置认证

### 启用邮箱认证

1. 在 Supabase 仪表板中，点击 "Authentication"
2. 点击 "Providers"
3. 确保 "Email" 已启用
4. 配置邮件模板（可选）：
   - 点击 "Email Templates"
   - 自定义确认邮件、重置密码邮件等

### 配置邮件服务（可选）

默认情况下，Supabase 使用内置的邮件服务。如果需要自定义：

1. 点击 "Settings" → "Auth"
2. 滚动到 "SMTP Settings"
3. 配置你的 SMTP 服务器

## 6. 配置行级安全策略 (RLS)

SQL 脚本已经自动配置了 RLS 策略，确保：
- 用户只能查看和修改自己的数据
- 项目、角色、剧集、分镜都有适当的访问控制

## 7. 测试数据库连接

重启开发服务器后，尝试：

1. 注册新用户
2. 登录
3. 创建项目
4. 生成分镜

## 数据库结构

### profiles (用户配置)
- `id` - 用户 ID (UUID, 主键)
- `email` - 邮箱
- `full_name` - 姓名
- `avatar_url` - 头像 URL
- `created_at` - 创建时间
- `updated_at` - 更新时间

### projects (项目)
- `id` - 项目 ID (UUID, 主键)
- `user_id` - 用户 ID (外键)
- `title` - 标题
- `genre` - 类型
- `visual_style` - 视觉风格
- `storyline` - 故事梗概
- `total_episodes` - 总集数
- `status` - 状态
- `created_at` - 创建时间
- `updated_at` - 更新时间

### characters (角色)
- `id` - 角色 ID (UUID, 主键)
- `project_id` - 项目 ID (外键)
- `name` - 姓名
- `age` - 年龄
- `height` - 身高
- `personality` - 性格
- `appearance` - 外貌
- `role` - 角色定位

### episodes (剧集)
- `id` - 剧集 ID (UUID, 主键)
- `project_id` - 项目 ID (外键)
- `episode_number` - 集数
- `title` - 标题
- `synopsis` - 简介
- `status` - 状态

### storyboard_entries (分镜)
- `id` - 分镜 ID (UUID, 主键)
- `episode_id` - 剧集 ID (外键)
- `scene_number` - 场景号
- `scene_description` - 场景描述
- `camera_movement` - 镜头运动
- `dialogue` - 对话
- `character_in_scene` - 出场角色
- `visual_elements` - 视觉元素
- `duration` - 时长
- `mood` - 情绪
- `voice_over` - 画外音
- `color_tone` - 画面色调
- `ai_video_prompt` - AI 视频提示词

## 常见问题

### Q: 注册后没有收到验证邮件？
A: 检查垃圾邮件文件夹，或在 Supabase 仪表板的 Authentication → Users 中手动验证用户。

### Q: 无法连接到数据库？
A: 检查环境变量是否正确配置，确保 URL 和 Key 没有多余的空格。

### Q: RLS 策略导致无法访问数据？
A: 确保用户已登录，并且数据的 `user_id` 与当前用户 ID 匹配。

### Q: 如何备份数据？
A: 在 Supabase 仪表板中，点击 "Database" → "Backups" 可以创建和恢复备份。

## 下一步

配置完成后，重启开发服务器：

```bash
npm run dev
```

现在你可以：
- 注册新用户
- 登录系统
- 创建和管理项目
- 所有数据都会自动保存到 Supabase
