# 获取正确的 Supabase API Key

## 问题
你提供的是 `PUBLISHABLE_DEFAULT_KEY`，但我们需要的是 `anon` key。

## 如何获取正确的 Key

### 步骤 1: 登录 Supabase
访问你的项目：https://fimmgmqhfhkucbpwhqge.supabase.co

### 步骤 2: 进入 API 设置
1. 点击左侧菜单的 **Settings** (齿轮图标)
2. 点击 **API**

### 步骤 3: 复制正确的 Key
在 API 页面，你会看到两个重要的 Key：

1. **Project URL** (已有)
   ```
   https://fimmgmqhfhkucbpwhqge.supabase.co
   ```

2. **anon public** (需要这个！)
   - 在 "Project API keys" 部分
   - 找到标记为 `anon` 或 `public` 的 key
   - 这个 key 通常很长，以 `eyJ` 开头
   - 看起来像这样：
   ```
   eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6...
   ```

### 步骤 4: 更新 .env.local
将正确的 key 添加到 `.env.local` 文件：

```env
NEXT_PUBLIC_SUPABASE_URL=https://fimmgmqhfhkucbpwhqge.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=你的_anon_key_这里
```

### 步骤 5: 重启开发服务器
```bash
# 停止当前服务器 (Ctrl+C)
npm run dev
```

## 注意事项

### ❌ 错误的 Key 类型
- `PUBLISHABLE_DEFAULT_KEY` - 这不是我们需要的
- `service_role` key - 这个是服务端密钥，不要在前端使用

### ✅ 正确的 Key 类型
- `anon` key - 这是公开的客户端密钥
- 也可能标记为 `public` key

## 为什么需要 anon key？

- `anon` key 是专门设计用于客户端（浏览器）的
- 它有适当的权限限制
- 配合行级安全策略 (RLS) 使用
- 可以安全地暴露在前端代码中

## 截图参考

在 Supabase 仪表板的 API 页面，你应该看到类似这样的内容：

```
Project API keys
├── anon public
│   └── eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9... (复制这个！)
└── service_role
    └── eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9... (不要用这个)
```

## 完成后

配置正确的 key 后，你应该能够：
1. 访问应用看到登录页面
2. 注册新用户
3. 登录系统
4. 创建和保存项目

## 需要帮助？

如果找不到 anon key：
1. 确保你在正确的项目中
2. 检查 Settings → API 页面
3. 如果还是找不到，可以重新生成 API keys
