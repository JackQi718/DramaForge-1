# DeepSeek AI 集成配置指南

## 环境变量配置

1. 复制 `.env.example` 文件为 `.env.local`：
```bash
copy .env.example .env.local
```

2. 在 `.env.local` 中填入你的 DeepSeek API 密钥：
```env
DEEPSEEK_API_KEY=your_actual_api_key_here
```

3. 可选配置项（使用默认值即可）：
```env
DEEPSEEK_API_URL=https://api.deepseek.com/v1
DEEPSEEK_MAX_RETRIES=3
DEEPSEEK_TIMEOUT_MS=30000
```

## 测试 API 配置

配置完成后，可以运行测试脚本验证 API 是否正常工作：

```bash
node scripts/test-ai.js
```

如果配置正确，你会看到：
```
✓ API Key 已配置
正在测试 DeepSeek API 连接...

✅ API 连接成功！
AI 回复: 测试成功

配置正确，可以开始使用 AI 功能了！
```

如果出现错误，请检查：
- API Key 是否正确
- 网络连接是否正常
- API Key 是否有足够的额度

## 获取 DeepSeek API 密钥

1. 访问 [DeepSeek 官网](https://platform.deepseek.com/)
2. 注册并登录账号
3. 在控制台中创建 API 密钥
4. 复制密钥并粘贴到 `.env.local` 文件中

## 功能说明

### 已实现的 AI 功能

1. **生成剧本大纲** (`/api/ai/generate-outline`)
   - 根据项目信息生成详细的剧本大纲
   - 包含故事概要、角色设定、剧集结构等

2. **生成剧集内容** (`/api/ai/generate-episode`)
   - 为指定集数生成详细的场景和对话
   - 包含场景描述、角色对话、转场说明等
   - 自动生成每个场景的 AI 视频生成提示词

3. **优化对话** (`/api/ai/optimize-dialogue`)
   - 优化剧本中的对话内容
   - 提升对话的自然度和戏剧张力

4. **生成视频提示词** (`/api/ai/generate-video-prompt`)
   - 为单个分镜场景生成专业的 AI 视频提示词
   - 适用于 Runway、Pika、Sora 等视频生成工具
   - 使用专业电影术语和视觉描述

### UI 组件

- **AILoading**: AI 生成时的加载状态组件
- **AIError**: AI 错误处理和重试组件
- **GenreSelector**: 剧本类型选择器（支持 16 种类型）
- **VisualStyleSelector**: 视觉风格选择器（支持 12 种风格）

### 分镜数据结构

每个分镜场景包含以下信息：
- 场景编号、场景描述
- 镜头运动、出场角色
- 角色对白、视觉元素
- 时长、情绪基调
- **AI 视频生成提示词**（英文，专业电影术语）

AI 视频提示词格式示例：
```
cinematic shot, medium close-up, young woman walking through neon-lit street, 
dramatic lighting with blue and pink tones, cyberpunk atmosphere, 
smooth tracking shot following character, rain-soaked pavement reflections, 
high contrast, moody and mysterious, 4k, high quality
```

## 新增的剧本类型

- 复仇、爱情、悬疑、喜剧、奇幻、都市、古装、科幻
- 武侠、恐怖、历史、战争、犯罪、青春、家庭、励志

## 新增的视觉风格

- 真人实拍、动漫、CG、电影、卡通
- 水墨画、赛博朋克、蒸汽朋克、像素风、油画风、漫画风、写实主义

## 错误处理

系统会自动处理以下错误类型：
- 网络连接失败
- 请求超时
- API 密钥错误
- 请求频率限制
- 服务器错误

所有 API 请求都支持自动重试（最多 3 次），并使用指数退避策略。
