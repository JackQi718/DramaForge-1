# 快速修复：Supabase 配置

## 问题
应用启动时显示 "supabaseKey is required" 错误。

## 原因
Supabase 环境变量未配置。

## 解决方案

### 方案 1：配置 Supabase（推荐）

如果你想使用完整的用户认证和数据库功能：

1. **创建 Supabase 项目**
   - 访问 https://supabase.com
   - 注册并创建新项目
   - 等待项目初始化（约 2 分钟）

2. **获取 API 密钥**
   - 在项目仪表板，点击 Settings → API
   - 复制 `Project URL`
   - 复制 `anon public` key

3. **配置环境变量**
   
   在 `.env.local` 文件中添加（如果文件不存在则创建）：
   
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

4. **创建数据库表**
   - 在 Supabase 仪表板，点击 SQL Editor
   - 复制 `lib/supabase/schema.sql` 的全部内容
   - 粘贴并点击 Run

5. **重启开发服务器**
   ```bash
   # 停止当前服务器（Ctrl+C）
   npm run dev
   ```

### 方案 2：临时跳过（仅用于测试 UI）

如果你只想测试 UI，暂时不需要数据库功能：

1. **添加占位符配置**
   
   在 `.env.local` 中添加：
   
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://placeholder.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=placeholder-key
   ```

2. **重启服务器**
   ```bash
   npm run dev
   ```

3. **注意**
   - 这样配置后应用会显示配置提示页面
   - 认证和数据保存功能将不可用
   - 仅用于查看 UI 设计

## 验证配置

配置完成后，访问 http://localhost:3000

- ✅ 正确配置：显示登录/注册页面
- ❌ 未配置：显示配置提示页面

## 常见问题

### Q: 我的 .env.local 文件在哪里？
A: 在项目根目录（与 package.json 同级）。如果不存在，创建一个新文件。

### Q: 配置后还是报错？
A: 
1. 确保环境变量名称正确（必须以 NEXT_PUBLIC_ 开头）
2. 确保没有多余的空格或引号
3. 重启开发服务器

### Q: 如何检查配置是否正确？
A: 在浏览器控制台运行：
```javascript
console.log(process.env.NEXT_PUBLIC_SUPABASE_URL)
```
应该显示你的 Supabase URL。

### Q: 免费版 Supabase 够用吗？
A: 是的！免费版包含：
- 500MB 数据库存储
- 1GB 文件存储
- 50,000 月活跃用户
- 对于个人项目完全够用

## 下一步

配置完成后，你可以：
1. 注册新用户
2. 登录系统
3. 创建项目
4. 生成 AI 分镜
5. 所有数据自动保存到云端

## 需要帮助？

查看详细文档：
- `SUPABASE_SETUP.md` - 完整的 Supabase 配置指南
- `AUTH_QUICKSTART.md` - 认证系统快速入门
- `INTEGRATION_SUMMARY.md` - 集成总结
