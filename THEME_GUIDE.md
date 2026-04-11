# 主题切换功能说明

## 功能特点

- 支持深色和浅色两种主题模式
- 一键快速切换主题
- 自动保存用户的主题偏好
- 支持跟随系统主题设置
- 平滑的主题切换动画

## 使用方法

在应用顶部导航栏右侧，点击太阳/月亮图标即可切换主题：
- 🌙 月亮图标 = 当前为深色模式，点击切换到浅色
- ☀️ 太阳图标 = 当前为浅色模式，点击切换到深色

## 技术实现

### 组件

1. **ThemeProvider** (`components/theme-provider.tsx`)
   - 基于 `next-themes` 库
   - 提供全局主题上下文

2. **ThemeToggleSimple** (`components/theme-toggle-simple.tsx`)
   - 简单的一键切换按钮
   - 带有平滑的图标切换动画

3. **ThemeToggle** (`components/theme-toggle.tsx`)
   - 下拉菜单版本（可选）
   - 支持浅色/深色/跟随系统三个选项

### 主题配置

在 `app/globals.css` 中定义了两套完整的颜色变量：

- `:root` - 浅色主题颜色
- `.dark` - 深色主题颜色

所有颜色使用 OKLCH 色彩空间，确保颜色在不同主题下的一致性和可访问性。

### 颜色变量

主要颜色变量包括：
- `--background` / `--foreground` - 背景和前景色
- `--card` / `--card-foreground` - 卡片颜色
- `--primary` / `--primary-foreground` - 主色调
- `--secondary` / `--secondary-foreground` - 次要色
- `--muted` / `--muted-foreground` - 柔和色
- `--accent` / `--accent-foreground` - 强调色
- `--destructive` / `--destructive-foreground` - 警告/删除色
- `--border` / `--input` / `--ring` - 边框和输入框色

## 自定义主题

如需自定义主题颜色，编辑 `app/globals.css` 中的颜色变量：

```css
:root {
  --primary: oklch(0.65 0.19 50); /* 浅色模式主色 */
}

.dark {
  --primary: oklch(0.72 0.19 50); /* 深色模式主色 */
}
```

## 默认主题

- 默认主题：深色模式
- 可在 `app/layout.tsx` 中修改 `defaultTheme` 属性
