# DramaForge · 剧本创作系统

面向**竖屏短剧**的 Web 应用：管理项目与角色、用 **DeepSeek** 生成分镜与剧本片段、用 **Supabase** 做登录与数据持久化。支持从故事梗概提取角色、导出分镜等能力。

**仓库：** [github.com/qishiyou/DramaForge](https://github.com/qishiyou/DramaForge)

---

## 功能概览

| 模块 | 说明 |
|------|------|
| **认证** | Supabase Auth（邮箱注册/登录），会话通过 Cookie 在服务端校验 |
| **项目管理** | 创建/编辑/删除项目；数据按用户隔离，存于 Supabase |
| **故事与角色** | 故事梗概、类型、视觉风格、集数；支持**从梗概一键提取角色**（AI） |
| **分镜生成** | 按集生成分镜脚本（单镜 3～8 秒、整集约 1～3 分钟）；场景描述偏完整、可执行 |
| **AI 能力** | 分镜生成、剧集剧本、大纲、视频提示词（中/英）、台词优化、角色提取等 |
| **导出** | 分镜相关导出（如 Word/CSV，以界面为准） |

---

## 技术栈

- **框架：** [Next.js](https://nextjs.org/) 16（App Router）、React 19、TypeScript  
- **样式：** Tailwind CSS 4、Radix UI、Lucide Icons  
- **数据与认证：** [Supabase](https://supabase.com/)（PostgreSQL + RLS + Auth），`@supabase/ssr`  
- **AI：** [DeepSeek](https://www.deepseek.com/) OpenAI 兼容 API（`lib/deepseek-client.ts`）  
- **状态与请求：** SWR、Sonner  

---

## 环境要求

- **Node.js** 20+（推荐 LTS）  
- **npm** / **pnpm**（仓库内同时存在 `package-lock.json` 与 `pnpm-lock.yaml`，任选其一安装依赖即可）  
- 可用的 **Supabase** 项目  
- 可用的 **DeepSeek API Key**（调用 AI 功能时必需）  

---

## 快速开始

### 1. 克隆与安装

```bash
git clone https://github.com/qishiyou/DramaForge.git
cd DramaForge
npm install
# 或: pnpm install
```

### 2. 环境变量

复制示例文件并填写真实值：

```bash
cp .env.example .env.local
```

**请勿**将 `.env.local` 提交到 Git（已在 `.gitignore` 中）。`.env.example` 内应只保留占位符，真实密钥仅放在本地或部署平台的私密环境变量中。

### 3. Supabase 数据库

1. 在 [Supabase](https://supabase.com/) 创建项目。  
2. 在 SQL 编辑器中执行仓库内 `lib/supabase/schema.sql`（创建表、索引、RLS、策略等）。  
3. 若已有旧库且缺少列，可按该文件末尾注释执行补充迁移（如 `appearance_detail`）。  
4. 在 Authentication 中启用邮箱登录等所需方式。  
5. 确保用户注册后存在 `profiles` 记录（若 schema 中 `projects.user_id` 引用 `profiles`，需与业务一致；可参考项目内 `SUPABASE_SETUP.md`）。

### 4. 启动开发服务器

```bash
npm run dev
```

浏览器访问 [http://localhost:3000](http://localhost:3000)。未配置 Supabase 时，界面会提示检查环境变量；未登录会跳转 `/auth`。

### 5. 生产构建

```bash
npm run build
npm run start
```

---

## 环境变量说明

| 变量 | 必填 | 说明 |
|------|------|------|
| `NEXT_PUBLIC_SUPABASE_URL` | 是* | Supabase 项目 URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | 是* | Supabase 匿名（anon）公钥，用于浏览器与服务端带会话访问 |
| `DEEPSEEK_API_KEY` | AI 功能 | DeepSeek API 密钥；未设置时，依赖配置的 AI 接口会在运行时失败 |
| `DEEPSEEK_API_URL` | 否 | 默认 `https://api.deepseek.com/v1` |
| `DEEPSEEK_MAX_RETRIES` | 否 | 默认 `3` |
| `DEEPSEEK_TIMEOUT_MS` | 否 | 默认 `30000` |
| `NEXT_PUBLIC_APP_NAME` | 否 | 应用名称展示 |
| `NEXT_PUBLIC_APP_VERSION` | 否 | 版本号展示 |

\* 登录与项目 API 依赖 Supabase；仅浏览静态页可不配，但核心功能不可用。

---

## 主要目录结构

```
app/                    # Next.js App Router 页面与 Route Handlers
  api/                  # REST API（projects、generate、ai/*）
  auth/                 # 登录注册页
components/             # UI 与业务组件
lib/
  supabase/             # Supabase 客户端、服务端 client、project-service、schema.sql
  deepseek-client.ts    # DeepSeek 调用
  types.ts              # 项目/角色/分镜等类型
public/                 # 静态资源
```

---

## API 一览（节选）

| 路径 | 方法 | 说明 |
|------|------|------|
| `/api/projects` | GET / POST | 当前用户项目列表 / 创建项目 |
| `/api/projects/[id]` | GET / PATCH / DELETE | 读写删除单个项目 |
| `/api/generate` | POST | 按集生成分镜 JSON（竖屏短剧节奏约束） |
| `/api/ai/extract-characters` | POST | 从故事梗概提取角色 |
| `/api/ai/generate-episode` | POST | 生成单集剧本式场景列表 |
| `/api/ai/generate-outline` | POST | 生成剧本大纲 |
| `/api/ai/generate-video-prompt` | POST | 由分镜信息生成英文视频提示词 |
| `/api/ai/optimize-dialogue` | POST | 台词优化 |

具体请求体见各 `route.ts` 实现。

---

## 部署建议

- **Vercel**：连接 GitHub 仓库，配置与环境变量中填写 `NEXT_PUBLIC_*`、`DEEPSEEK_*`。  
- **数据库**：使用同一 Supabase 生产项目，执行相同 schema。  
- **安全**：切勿在客户端暴露 Service Role Key；本项目使用 anon + 用户 JWT + RLS 即可。  

---

## 相关文档（仓库内）

| 文档 | 内容 |
|------|------|
| `SUPABASE_SETUP.md` | Supabase 项目与表、认证说明 |
| `DEEPSEEK_SETUP.md` | DeepSeek API 配置 |
| `AUTH_QUICKSTART.md` | 认证快速说明 |
| `GET_SUPABASE_KEY.md` | 获取 Supabase 密钥指引 |

---

## 常见问题

**Q：提示缺少 `DEEPSEEK_API_KEY`？**  
A：在 `.env.local` 中配置有效密钥，并重启开发服务器。

**Q：项目保存 401？**  
A：确认已登录，且 `NEXT_PUBLIC_SUPABASE_*` 正确、Cookie 未被浏览器拦截。

**Q：数据库插入失败 / 外键错误？**  
A：检查是否已执行 `schema.sql`，且用户是否存在 `profiles` 等与 schema 一致。

---

## 开源协议

本项目 `package.json` 标记为 `private`，若为个人/团队私有仓库，默认不对外授权；若你希望以开源协议发布，可自行添加 `LICENSE` 文件并更新本说明。

---

## 贡献与反馈

欢迎通过 [Issues](https://github.com/qishiyou/DramaForge/issues) 反馈问题或建议。
