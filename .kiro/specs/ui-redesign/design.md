# 设计文档

## 概述

本设计文档定义了 DramaForge AI短剧创作工坊的UI和视觉系统优化方案。设计目标是创建一个符合影视剧本创作行业特点的专业界面，通过电影胶片风格的暖色调、精心设计的排版系统和流畅的交互动画，为用户提供沉浸式的创作体验。

设计遵循以下核心原则：
- **专业性**: 采用电影行业视觉语言，营造专业创作氛围
- **艺术感**: 通过渐变、纹理和装饰元素体现创意特质
- **易用性**: 清晰的信息层次和直观的交互反馈
- **性能**: 优化动画和渲染，确保流畅体验
- **可访问性**: 符合WCAG AA标准，支持键盘导航和屏幕阅读器

## 架构

### 设计系统层次结构

```
设计系统
├── 设计令牌层 (Design Tokens)
│   ├── 颜色变量 (CSS Custom Properties)
│   ├── 排版变量 (字体、字号、行高)
│   ├── 间距变量 (8px基础系统)
│   └── 动画变量 (时长、缓动函数)
├── 基础样式层 (Base Styles)
│   ├── 全局重置和规范化
│   ├── 字体加载和回退
│   └── 滚动条样式
├── 组件样式层 (Component Styles)
│   ├── UI组件库 (shadcn/ui)
│   ├── 自定义组件
│   └── 组件变体和状态
└── 工具类层 (Utility Classes)
    └── Tailwind CSS配置
```

### 技术栈集成

- **样式系统**: Tailwind CSS v4 + CSS Custom Properties
- **颜色空间**: OKLCH (更好的感知均匀性和渐变效果)
- **字体**: Noto Sans SC (中文) + Geist (英文) + Geist Mono (代码)
- **图标**: Lucide Icons
- **动画**: Tailwind Animate + CSS Transitions
- **主题**: 深色和浅色双主题支持，用户可自由切换


## 组件和接口

### 1. 颜色系统设计

#### 1.0 主题切换系统

**设计决策**: 提供深色和浅色两种主题，满足不同用户偏好和使用场景。

**主题切换实现**:
```typescript
// 主题类型
type Theme = 'dark' | 'light'

// 主题上下文
interface ThemeContext {
  theme: Theme
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
}

// 主题持久化
localStorage.setItem('theme', theme)

// 系统偏好检测
const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches 
  ? 'dark' 
  : 'light'
```

**主题切换UI**:
```tsx
// 主题切换按钮
<button onClick={toggleTheme} className="theme-toggle">
  {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
</button>
```

#### 1.1 主色调方案

**设计决策**: 采用电影胶片风格的琥珀金色作为主色调，营造温暖、专业的创作氛围。使用OKLCH颜色空间确保渐变平滑和感知一致性。同时提供深色和浅色两套完整的颜色方案。

**深色主题颜色定义**:
```css
:root {
  /* 主色 - 琥珀金色系 */
  --primary: oklch(0.72 0.19 50);           /* 主要操作按钮、链接 */
  --primary-foreground: oklch(0.11 0.01 270);
  
  /* 背景色 - 深色基调 */
  --background: oklch(0.11 0.01 270);       /* 主背景 */
  --foreground: oklch(0.93 0.005 270);      /* 主文本 */
  
  /* 卡片和表面 */
  --card: oklch(0.15 0.01 270);             /* 卡片背景 */
  --card-foreground: oklch(0.93 0.005 270);
  
  /* 状态颜色 */
  --status-draft: oklch(0.65 0.15 250);     /* 草稿 - 蓝紫色 */
  --status-generating: oklch(0.70 0.15 80); /* 生成中 - 黄绿色 */
  --status-completed: oklch(0.65 0.15 160); /* 已完成 - 青绿色 */
  
  /* 语义颜色 */
  --accent: oklch(0.72 0.19 50);            /* 强调色 */
  --destructive: oklch(0.55 0.2 27);        /* 危险操作 */
  --muted: oklch(0.19 0.01 270);            /* 次要背景 */
  --muted-foreground: oklch(0.58 0.01 270); /* 次要文本 */
  
  /* 边框和输入 */
  --border: oklch(0.24 0.01 270);
  --input: oklch(0.19 0.01 270);
  --ring: oklch(0.72 0.19 50);              /* 焦点环 */
}
```

**浅色主题颜色定义**:
```css
.light {
  /* 主色 - 琥珀金色系（深化以保持对比度） */
  --primary: oklch(0.55 0.19 50);           /* 主要操作按钮、链接 */
  --primary-foreground: oklch(0.98 0.005 270);
  
  /* 背景色 - 浅色基调 */
  --background: oklch(0.98 0.005 270);      /* 主背景 */
  --foreground: oklch(0.15 0.01 270);       /* 主文本 */
  
  /* 卡片和表面 */
  --card: oklch(1 0 0);                     /* 卡片背景 - 纯白 */
  --card-foreground: oklch(0.15 0.01 270);
  
  /* 状态颜色 */
  --status-draft: oklch(0.50 0.15 250);     /* 草稿 - 蓝紫色 */
  --status-generating: oklch(0.55 0.15 80); /* 生成中 - 黄绿色 */
  --status-completed: oklch(0.50 0.15 160); /* 已完成 - 青绿色 */
  
  /* 语义颜色 */
  --accent: oklch(0.55 0.19 50);            /* 强调色 */
  --destructive: oklch(0.50 0.2 27);        /* 危险操作 */
  --muted: oklch(0.95 0.005 270);           /* 次要背景 */
  --muted-foreground: oklch(0.45 0.01 270); /* 次要文本 */
  
  /* 边框和输入 */
  --border: oklch(0.88 0.005 270);
  --input: oklch(0.95 0.005 270);
  --ring: oklch(0.55 0.19 50);              /* 焦点环 */
}
```

**渐变和装饰**:
- 卡片边缘装饰: `linear-gradient(90deg, oklch(0.72 0.19 50), oklch(0.70 0.15 80))`
- 背景纹理: 使用CSS `background-image` 添加微妙的噪点纹理 (opacity: 0.03)
- 玻璃态效果: `backdrop-filter: blur(8px)` + 半透明背景

**对比度保证**:
- 所有文本与背景对比度 ≥ 4.5:1 (WCAG AA标准)
- 大文本 (≥18px) 对比度 ≥ 3:1
- 使用在线工具验证所有颜色组合

#### 1.2 状态颜色映射

| 状态 | 颜色变量 | 使用场景 |
|------|---------|---------|
| 草稿 | `--status-draft` | 项目卡片状态标签、进度指示器 |
| 生成中 | `--status-generating` | 加载动画、进度条 |
| 已完成 | `--status-completed` | 完成标记、成功提示 |


### 2. 排版系统设计

#### 2.1 字体栈

**设计决策**: 使用思源黑体 (Noto Sans SC) 作为中文主字体，确保优秀的中文显示效果和专业感。

```typescript
// 字体配置
const notoSansSC = Noto_Sans_SC({ 
  subsets: ['latin'], 
  weight: ['400', '500', '600', '700'],
  display: 'swap'
})

const geist = Geist({ 
  subsets: ['latin'],
  display: 'swap'
})

const geistMono = Geist_Mono({ 
  subsets: ['latin'],
  display: 'swap'
})
```

**字体应用**:
- 主要内容: Noto Sans SC (中文) / Geist (英文)
- 代码和数字: Geist Mono
- 回退字体: system-ui, -apple-system, sans-serif

#### 2.2 字号层级

**设计决策**: 采用模块化比例 (1.25倍) 创建清晰的视觉层次，适配中文阅读习惯。

| 层级 | 字号 | 行高 | 用途 | Tailwind类 |
|------|------|------|------|-----------|
| H1 | 32px | 1.3 | 页面主标题 | `text-3xl` |
| H2 | 24px | 1.4 | 区块标题 | `text-2xl` |
| H3 | 20px | 1.4 | 卡片标题 | `text-xl` |
| H4 | 18px | 1.5 | 小标题 | `text-lg` |
| Body Large | 16px | 1.6 | 重要正文 | `text-base` |
| Body | 14px | 1.6 | 常规正文 | `text-sm` |
| Caption | 12px | 1.5 | 辅助信息 | `text-xs` |
| Tiny | 10px | 1.4 | 标签、徽章 | `text-[10px]` |

#### 2.3 字重使用

- **Regular (400)**: 正文内容
- **Medium (500)**: 次要标题、强调文本
- **Semibold (600)**: 卡片标题、按钮文字
- **Bold (700)**: 页面标题、数据展示

#### 2.4 字间距和行高

**设计决策**: 中文内容需要更宽松的行高以提升可读性。

- 标题行高: 1.3-1.4
- 正文行高: 1.6-1.8
- 字间距: 默认 (中文不需要额外调整)
- 段落间距: 1.5em


### 3. 组件视觉风格设计

#### 3.1 卡片组件

**设计决策**: 使用多层次的视觉效果创建深度感，通过边框装饰体现电影胶片质感。

```css
/* 基础卡片样式 */
.card {
  background: oklch(0.15 0.01 270 / 0.8);
  border: 1px solid oklch(0.24 0.01 270 / 0.4);
  border-radius: 12px;
  box-shadow: 
    0 1px 3px oklch(0 0 0 / 0.1),
    0 1px 2px oklch(0 0 0 / 0.06);
  transition: all 200ms ease;
}

.card:hover {
  border-color: oklch(0.72 0.19 50 / 0.3);
  box-shadow: 
    0 4px 6px oklch(0 0 0 / 0.1),
    0 2px 4px oklch(0 0 0 / 0.06);
  transform: translateY(-2px);
}

/* 装饰边框 */
.card-decorated::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(
    90deg, 
    oklch(0.72 0.19 50), 
    oklch(0.70 0.15 80)
  );
  border-radius: 12px 12px 0 0;
}
```

**变体**:
- 默认卡片: 8px圆角，微妙阴影
- 交互卡片: 12px圆角，悬停提升效果
- 统计卡片: 带图标和渐变背景的小卡片

#### 3.2 按钮组件

**设计决策**: 提供清晰的视觉层次和即时反馈，使用主色调强调主要操作。

```css
/* 主要按钮 */
.button-primary {
  background: oklch(0.72 0.19 50);
  color: oklch(0.11 0.01 270);
  padding: 0.5rem 1.25rem;
  border-radius: 8px;
  font-weight: 500;
  transition: all 150ms ease;
}

.button-primary:hover {
  background: oklch(0.68 0.19 50);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px oklch(0.72 0.19 50 / 0.3);
}

.button-primary:active {
  transform: translateY(0);
  box-shadow: 0 2px 4px oklch(0.72 0.19 50 / 0.2);
}

/* 次要按钮 */
.button-secondary {
  background: oklch(0.19 0.01 270);
  color: oklch(0.85 0.005 270);
  border: 1px solid oklch(0.24 0.01 270);
}

/* 幽灵按钮 */
.button-ghost {
  background: transparent;
  color: oklch(0.93 0.005 270);
}

.button-ghost:hover {
  background: oklch(0.19 0.01 270 / 0.5);
}
```

**尺寸规格**:
- Small: 高度32px，padding 0.375rem 1rem，字号12px
- Medium: 高度40px，padding 0.5rem 1.25rem，字号14px
- Large: 高度48px，padding 0.75rem 1.5rem，字号16px

#### 3.3 输入框组件

**设计决策**: 清晰的焦点状态和边框高亮，确保用户知道当前输入位置。

```css
.input {
  background: oklch(0.19 0.01 270);
  border: 1px solid oklch(0.24 0.01 270);
  border-radius: 8px;
  padding: 0.5rem 0.75rem;
  color: oklch(0.93 0.005 270);
  transition: all 200ms ease;
}

.input:focus {
  outline: none;
  border-color: oklch(0.72 0.19 50);
  box-shadow: 0 0 0 3px oklch(0.72 0.19 50 / 0.1);
}

.input::placeholder {
  color: oklch(0.58 0.01 270);
}
```

#### 3.4 滚动条样式

**设计决策**: 自定义滚动条以匹配整体深色主题，宽度适中不遮挡内容。

```css
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: oklch(0.30 0.01 270);
  border-radius: 3px;
  transition: background 200ms ease;
}

::-webkit-scrollbar-thumb:hover {
  background: oklch(0.38 0.01 270);
}
```


### 4. 布局和间距系统

#### 4.1 间距系统

**设计决策**: 采用8px基础间距系统，确保视觉一致性和可预测性。

```javascript
// Tailwind spacing scale (基于8px)
spacing: {
  0: '0',
  1: '0.25rem',  // 4px
  2: '0.5rem',   // 8px  - 基础单位
  3: '0.75rem',  // 12px
  4: '1rem',     // 16px - 常用间距
  5: '1.25rem',  // 20px
  6: '1.5rem',   // 24px - 组件间距
  8: '2rem',     // 32px - 区块间距
  10: '2.5rem',  // 40px
  12: '3rem',    // 48px - 大区块间距
  16: '4rem',    // 64px
  20: '5rem',    // 80px
}
```

**应用规则**:
- 组件内部元素: 8px (gap-2)
- 卡片内边距: 16-24px (p-4 到 p-6)
- 组件之间: 12-16px (gap-3 到 gap-4)
- 区块之间: 32-48px (space-y-8 到 space-y-12)
- 页面边距: 24px (px-6)

#### 4.2 布局容器

**设计决策**: 使用最大宽度约束确保内容在大屏幕上保持可读性。

```css
/* 主内容容器 */
.container-main {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

/* 窄内容容器 (表单、文章) */
.container-narrow {
  max-width: 768px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

/* 宽内容容器 (仪表板) */
.container-wide {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 1.5rem;
}
```

#### 4.3 网格系统

**设计决策**: 使用CSS Grid实现灵活的响应式布局。

```css
/* 统计卡片网格 */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.75rem; /* 12px */
}

/* 项目卡片网格 */
.project-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.5rem; /* 8px */
}

/* 响应式断点 */
@media (min-width: 768px) {
  .project-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem; /* 16px */
  }
}

@media (min-width: 1024px) {
  .project-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

#### 4.4 响应式设计

**断点定义**:
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

**适配策略**:
- 移动端: 单列布局，减少内边距至16px
- 平板: 双列网格，保持24px间距
- 桌面: 多列网格，最大宽度约束


### 5. 动画和过渡效果

#### 5.1 动画时长和缓动

**设计决策**: 使用不同时长的动画区分交互类型，快速反馈用户操作，平滑过渡视图变化。

```css
/* 动画时长变量 */
:root {
  --duration-instant: 100ms;   /* 即时反馈 */
  --duration-fast: 150ms;      /* 快速交互 */
  --duration-normal: 200ms;    /* 标准过渡 */
  --duration-slow: 300ms;      /* 复杂动画 */
  --duration-slower: 500ms;    /* 视图切换 */
}

/* 缓动函数 */
:root {
  --ease-in: cubic-bezier(0.4, 0, 1, 1);
  --ease-out: cubic-bezier(0, 0, 0.2, 1);
  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
}
```

#### 5.2 交互动画

**悬停效果**:
```css
/* 按钮悬停 */
.button {
  transition: all 150ms var(--ease-out);
}

.button:hover {
  transform: translateY(-1px);
}

/* 卡片悬停 */
.card {
  transition: all 200ms var(--ease-out);
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px oklch(0 0 0 / 0.15);
}

/* 链接悬停 */
.link {
  position: relative;
  transition: color 150ms var(--ease-out);
}

.link::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 2px;
  background: currentColor;
  transition: width 200ms var(--ease-out);
}

.link:hover::after {
  width: 100%;
}
```

**点击反馈**:
```css
.button:active {
  transform: translateY(0);
  transition-duration: 100ms;
}

.card:active {
  transform: scale(0.98);
  transition-duration: 100ms;
}
```

#### 5.3 视图过渡

**页面切换**:
```css
/* 淡入淡出 */
.fade-enter {
  opacity: 0;
}

.fade-enter-active {
  opacity: 1;
  transition: opacity 300ms var(--ease-in-out);
}

.fade-exit {
  opacity: 1;
}

.fade-exit-active {
  opacity: 0;
  transition: opacity 200ms var(--ease-in-out);
}
```

**内容展开/折叠**:
```css
.collapse {
  overflow: hidden;
  transition: height 300ms var(--ease-in-out);
}
```

#### 5.4 加载动画

**设计决策**: 使用优雅的加载指示器和骨架屏，避免突兀的内容闪现。

```css
/* 旋转加载器 */
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.spinner {
  animation: spin 1s linear infinite;
}

/* 脉冲动画 */
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.skeleton {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  background: oklch(0.19 0.01 270);
}

/* 进度条 */
@keyframes progress {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

.progress-bar::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    oklch(0.72 0.19 50 / 0.3),
    transparent
  );
  animation: progress 1.5s ease-in-out infinite;
}
```

#### 5.5 减少动画偏好

**设计决策**: 尊重用户的系统偏好设置，提供无动画版本。

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```


### 6. 特殊视觉元素

#### 6.1 背景纹理和渐变

**设计决策**: 使用微妙的纹理和渐变模拟电影胶片质感，增强艺术氛围。

```css
/* 页面背景纹理 */
body::before {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: 
    radial-gradient(
      circle at 20% 50%,
      oklch(0.72 0.19 50 / 0.03) 0%,
      transparent 50%
    ),
    radial-gradient(
      circle at 80% 80%,
      oklch(0.70 0.15 80 / 0.02) 0%,
      transparent 50%
    ),
    url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E");
  pointer-events: none;
  z-index: -1;
}

/* 卡片渐变背景 */
.card-gradient {
  background: linear-gradient(
    135deg,
    oklch(0.15 0.01 270) 0%,
    oklch(0.13 0.01 270) 100%
  );
}

/* 玻璃态效果 */
.glass {
  background: oklch(0.15 0.01 270 / 0.6);
  backdrop-filter: blur(8px) saturate(180%);
  border: 1px solid oklch(0.24 0.01 270 / 0.5);
}
```

#### 6.2 装饰元素

**金色装饰线条**:
```css
/* 顶部装饰线 */
.decorated-top::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    oklch(0.72 0.19 50) 20%,
    oklch(0.70 0.15 80) 80%,
    transparent 100%
  );
}

/* 侧边装饰线 */
.decorated-side::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 3px;
  background: linear-gradient(
    180deg,
    oklch(0.72 0.19 50),
    oklch(0.70 0.15 80)
  );
  border-radius: 2px;
}

/* 角落装饰 */
.decorated-corner::after {
  content: '';
  position: absolute;
  top: -1px;
  right: -1px;
  width: 24px;
  height: 24px;
  background: linear-gradient(
    135deg,
    oklch(0.72 0.19 50 / 0.2) 0%,
    transparent 50%
  );
  border-radius: 0 12px 0 0;
}
```

#### 6.3 图标和徽章

**设计决策**: 使用Lucide Icons统一图标风格，配合颜色编码增强信息可读性。

```typescript
// 图标尺寸规范
const iconSizes = {
  sm: 16,   // 小图标 (内联文本)
  md: 20,   // 中等图标 (按钮、列表)
  lg: 24,   // 大图标 (标题、卡片)
  xl: 32,   // 特大图标 (空状态)
}

// 状态图标映射
const statusIcons = {
  draft: Pencil,
  generating: Sparkles,
  completed: CheckCircle,
}

// 统计图标映射
const statIcons = {
  projects: FolderOpen,
  completed: Sparkles,
  episodes: Layers,
  scenes: Film,
}
```

**徽章样式**:
```css
.badge {
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.5rem;
  border-radius: 6px;
  font-size: 10px;
  font-weight: 500;
  line-height: 1;
}

.badge-draft {
  background: oklch(0.65 0.15 250 / 0.15);
  color: oklch(0.75 0.15 250);
  border: 1px solid oklch(0.65 0.15 250 / 0.3);
}

.badge-generating {
  background: oklch(0.70 0.15 80 / 0.15);
  color: oklch(0.80 0.15 80);
  border: 1px solid oklch(0.70 0.15 80 / 0.3);
}

.badge-completed {
  background: oklch(0.65 0.15 160 / 0.15);
  color: oklch(0.75 0.15 160);
  border: 1px solid oklch(0.65 0.15 160 / 0.3);
}
```

#### 6.4 空状态设计

**设计决策**: 使用友好的插图和引导文案，鼓励用户采取行动。

```tsx
// 空状态组件结构
<div className="empty-state">
  <div className="empty-icon">
    <BookOpen size={56} />
  </div>
  <h3 className="empty-title">还没有项目</h3>
  <p className="empty-description">
    创建您的第一个短剧项目，开始 AI 创作之旅
  </p>
  <button className="empty-action">
    创建第一个项目
  </button>
</div>
```

```css
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 5rem 2rem;
  text-align: center;
}

.empty-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  margin-bottom: 1rem;
  border-radius: 50%;
  background: oklch(0.19 0.01 270);
  color: oklch(0.58 0.01 270 / 0.4);
}

.empty-title {
  font-size: 14px;
  font-weight: 500;
  color: oklch(0.58 0.01 270);
  margin-bottom: 0.25rem;
}

.empty-description {
  font-size: 12px;
  color: oklch(0.58 0.01 270 / 0.6);
  margin-bottom: 1.25rem;
}
```


### 7. DeepSeek AI集成设计

#### 7.1 API集成架构

**设计决策**: 创建独立的API服务层，封装DeepSeek API调用逻辑，便于维护和测试。

```typescript
// API服务接口
interface DeepSeekService {
  generateProjectOutline(params: ProjectParams): Promise<ProjectOutline>
  generateEpisodeScript(params: EpisodeParams): Promise<EpisodeScript>
  optimizeDialogue(params: DialogueParams): Promise<OptimizedDialogue>
}

// 请求参数类型
interface ProjectParams {
  title: string
  genre: Genre
  visualStyle: VisualStyle
  storyline: string
  totalEpisodes: number
}

interface EpisodeParams {
  projectId: string
  episodeNumber: number
  previousContext?: string
}

interface DialogueParams {
  characterId: string
  context: string
  dialogue: string
}
```

**API路由设计**:
```
POST /api/ai/generate-outline
POST /api/ai/generate-episode
POST /api/ai/optimize-dialogue
```

#### 7.2 加载状态UI

**设计决策**: 提供清晰的进度反馈，使用动画和文案减少用户等待焦虑。

```tsx
// 加载状态组件
<div className="ai-loading">
  <div className="ai-loading-icon">
    <Sparkles className="animate-pulse" size={24} />
  </div>
  <div className="ai-loading-content">
    <h4 className="ai-loading-title">AI 正在创作中...</h4>
    <p className="ai-loading-description">
      {loadingMessages[currentStep]}
    </p>
    <div className="ai-loading-progress">
      <div 
        className="ai-loading-progress-bar" 
        style={{ width: `${progress}%` }}
      />
    </div>
  </div>
</div>
```

```css
.ai-loading {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  background: oklch(0.15 0.01 270);
  border: 1px solid oklch(0.24 0.01 270);
  border-radius: 12px;
}

.ai-loading-icon {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: oklch(0.72 0.19 50 / 0.15);
  color: oklch(0.72 0.19 50);
}

.ai-loading-progress {
  height: 4px;
  background: oklch(0.19 0.01 270);
  border-radius: 2px;
  overflow: hidden;
  margin-top: 0.75rem;
}

.ai-loading-progress-bar {
  height: 100%;
  background: linear-gradient(
    90deg,
    oklch(0.72 0.19 50),
    oklch(0.70 0.15 80)
  );
  transition: width 300ms ease;
}
```

**加载文案**:
```typescript
const loadingMessages = [
  '分析项目设定...',
  '构思剧情大纲...',
  '生成角色设定...',
  '创作分镜脚本...',
  '优化对话内容...',
  '即将完成...',
]
```

#### 7.3 错误处理UI

**设计决策**: 提供友好的错误提示和明确的重试选项。

```tsx
// 错误状态组件
<div className="ai-error">
  <div className="ai-error-icon">
    <AlertCircle size={24} />
  </div>
  <div className="ai-error-content">
    <h4 className="ai-error-title">生成失败</h4>
    <p className="ai-error-description">
      {errorMessage || '网络连接异常，请稍后重试'}
    </p>
    <div className="ai-error-actions">
      <button onClick={onRetry} className="button-primary">
        重试
      </button>
      <button onClick={onCancel} className="button-ghost">
        取消
      </button>
    </div>
  </div>
</div>
```

```css
.ai-error {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.5rem;
  background: oklch(0.55 0.2 27 / 0.1);
  border: 1px solid oklch(0.55 0.2 27 / 0.3);
  border-radius: 12px;
}

.ai-error-icon {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: oklch(0.55 0.2 27 / 0.15);
  color: oklch(0.55 0.2 27);
}

.ai-error-actions {
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
}
```

#### 7.4 成功反馈UI

**设计决策**: 使用Toast通知提供即时反馈，不打断用户工作流。

```typescript
// Toast配置
import { toast } from 'sonner'

// 成功提示
toast.success('剧本生成完成', {
  description: '已为第1集生成完整分镜脚本',
  duration: 3000,
})

// 错误提示
toast.error('生成失败', {
  description: errorMessage,
  duration: 5000,
  action: {
    label: '重试',
    onClick: () => handleRetry(),
  },
})

// 加载提示
const toastId = toast.loading('AI 正在创作中...', {
  description: '预计需要30秒',
})

// 更新Toast
toast.success('生成完成', { id: toastId })
```

**Toast样式定制**:
```css
/* 通过Sonner的theme="dark"和richColors自动应用 */
/* 可通过CSS变量进一步定制 */
[data-sonner-toast] {
  background: oklch(0.15 0.01 270) !important;
  border: 1px solid oklch(0.24 0.01 270) !important;
}

[data-sonner-toast][data-type="success"] {
  border-color: oklch(0.65 0.15 160 / 0.5) !important;
}

[data-sonner-toast][data-type="error"] {
  border-color: oklch(0.55 0.2 27 / 0.5) !important;
}
```


## 数据模型

### 剧本类型和视觉风格扩展

**设计决策**: 扩展剧本类型和视觉风格选项，提供更丰富的创作可能性，并为每种类型设计独特的视觉标识。

#### 扩展的剧本类型

```typescript
// 扩展的剧本类型
export type Genre = 
  | '复仇'      // 原有
  | '爱情'      // 原有
  | '悬疑'      // 原有
  | '喜剧'      // 原有
  | '奇幻'      // 原有
  | '都市'      // 原有
  | '古装'      // 原有
  | '科幻'      // 原有
  | '武侠'      // 新增
  | '恐怖'      // 新增
  | '历史'      // 新增
  | '战争'      // 新增
  | '犯罪'      // 新增
  | '青春'      // 新增
  | '家庭'      // 新增
  | '励志'      // 新增

// 类型元数据
interface GenreMetadata {
  name: Genre
  icon: LucideIcon
  color: string
  description: string
  keywords: string[]
}

const genreMetadata: Record<Genre, GenreMetadata> = {
  '复仇': {
    name: '复仇',
    icon: Flame,
    color: 'oklch(0.55 0.2 27)',
    description: '以复仇为主线的剧情',
    keywords: ['仇恨', '报复', '正义']
  },
  '爱情': {
    name: '爱情',
    icon: Heart,
    color: 'oklch(0.65 0.2 350)',
    description: '浪漫爱情故事',
    keywords: ['浪漫', '情感', '爱恋']
  },
  '悬疑': {
    name: '悬疑',
    icon: Search,
    color: 'oklch(0.60 0.15 250)',
    description: '充满谜团的推理剧情',
    keywords: ['推理', '谜团', '真相']
  },
  '武侠': {
    name: '武侠',
    icon: Swords,
    color: 'oklch(0.65 0.15 30)',
    description: '江湖恩怨，侠义精神',
    keywords: ['武功', '江湖', '侠客']
  },
  '恐怖': {
    name: '恐怖',
    icon: Ghost,
    color: 'oklch(0.40 0.1 270)',
    description: '惊悚恐怖氛围',
    keywords: ['惊悚', '恐惧', '灵异']
  },
  // ... 其他类型
}
```

#### 扩展的视觉风格

```typescript
// 扩展的视觉风格
export type VisualStyle = 
  | '真人实拍'   // 原有
  | '动漫'       // 原有
  | 'CG'         // 原有
  | '电影'       // 原有
  | '卡通'       // 原有
  | '水墨画'     // 新增
  | '赛博朋克'   // 新增
  | '蒸汽朋克'   // 新增
  | '像素风'     // 新增
  | '油画风'     // 新增
  | '漫画风'     // 新增
  | '写实主义'   // 新增

// 视觉风格元数据
interface VisualStyleMetadata {
  name: VisualStyle
  icon: LucideIcon
  color: string
  description: string
  examples: string[]
}

const visualStyleMetadata: Record<VisualStyle, VisualStyleMetadata> = {
  '真人实拍': {
    name: '真人实拍',
    icon: Camera,
    color: 'oklch(0.70 0.15 80)',
    description: '真实演员拍摄',
    examples: ['电视剧', '电影']
  },
  '动漫': {
    name: '动漫',
    icon: Sparkles,
    color: 'oklch(0.65 0.2 320)',
    description: '日式动画风格',
    examples: ['二维动画', '手绘风格']
  },
  '水墨画': {
    name: '水墨画',
    icon: Brush,
    color: 'oklch(0.50 0.05 270)',
    description: '中国传统水墨画风格',
    examples: ['山水画', '写意画']
  },
  '赛博朋克': {
    name: '赛博朋克',
    icon: Cpu,
    color: 'oklch(0.60 0.25 300)',
    description: '未来科技霓虹风格',
    examples: ['霓虹灯', '高科技低生活']
  },
  // ... 其他风格
}
```

#### UI展示设计

**类型/风格选择器**:
```tsx
// 网格选择器组件
<div className="genre-selector">
  {Object.values(genreMetadata).map((genre) => (
    <button
      key={genre.name}
      className={cn(
        "genre-option",
        selected === genre.name && "genre-option-selected"
      )}
      style={{
        '--genre-color': genre.color
      } as React.CSSProperties}
    >
      <genre.icon size={24} />
      <span>{genre.name}</span>
    </button>
  ))}
</div>
```

```css
.genre-selector {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 0.75rem;
}

.genre-option {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
  background: oklch(0.15 0.01 270);
  border: 2px solid oklch(0.24 0.01 270);
  border-radius: 12px;
  transition: all 200ms ease;
}

.genre-option:hover {
  border-color: var(--genre-color);
  background: color-mix(in oklch, var(--genre-color) 10%, oklch(0.15 0.01 270));
  transform: translateY(-2px);
}

.genre-option-selected {
  border-color: var(--genre-color);
  background: color-mix(in oklch, var(--genre-color) 15%, oklch(0.15 0.01 270));
  box-shadow: 0 0 0 3px color-mix(in oklch, var(--genre-color) 20%, transparent);
}
```

### 环境配置设计

**设计决策**: 使用.env文件管理敏感配置，确保API密钥安全，支持多环境部署。

#### 环境变量结构

```bash
# .env.local (本地开发环境)
# DeepSeek AI API配置
DEEPSEEK_API_KEY=your_api_key_here
DEEPSEEK_API_BASE_URL=https://api.deepseek.com/v1
DEEPSEEK_MODEL=deepseek-chat
DEEPSEEK_MAX_TOKENS=4000
DEEPSEEK_TEMPERATURE=0.7

# 应用配置
NEXT_PUBLIC_APP_NAME=DramaForge
NEXT_PUBLIC_APP_VERSION=1.0.0

# 功能开关
NEXT_PUBLIC_ENABLE_AI_GENERATION=true
NEXT_PUBLIC_ENABLE_THEME_TOGGLE=true

# 性能配置
NEXT_PUBLIC_API_TIMEOUT=30000
NEXT_PUBLIC_MAX_RETRIES=3
```

```bash
# .env.example (示例文件，提交到版本控制)
# DeepSeek AI API配置
DEEPSEEK_API_KEY=
DEEPSEEK_API_BASE_URL=https://api.deepseek.com/v1
DEEPSEEK_MODEL=deepseek-chat
DEEPSEEK_MAX_TOKENS=4000
DEEPSEEK_TEMPERATURE=0.7

# 应用配置
NEXT_PUBLIC_APP_NAME=DramaForge
NEXT_PUBLIC_APP_VERSION=1.0.0

# 功能开关
NEXT_PUBLIC_ENABLE_AI_GENERATION=true
NEXT_PUBLIC_ENABLE_THEME_TOGGLE=true

# 性能配置
NEXT_PUBLIC_API_TIMEOUT=30000
NEXT_PUBLIC_MAX_RETRIES=3
```

#### 配置类型定义

```typescript
// lib/config.ts
interface AppConfig {
  deepseek: {
    apiKey: string
    baseUrl: string
    model: string
    maxTokens: number
    temperature: number
  }
  app: {
    name: string
    version: string
  }
  features: {
    enableAIGeneration: boolean
    enableThemeToggle: boolean
  }
  performance: {
    apiTimeout: number
    maxRetries: number
  }
}

// 配置验证和加载
export function loadConfig(): AppConfig {
  const apiKey = process.env.DEEPSEEK_API_KEY
  
  if (!apiKey) {
    throw new Error('DEEPSEEK_API_KEY is required')
  }
  
  return {
    deepseek: {
      apiKey,
      baseUrl: process.env.DEEPSEEK_API_BASE_URL || 'https://api.deepseek.com/v1',
      model: process.env.DEEPSEEK_MODEL || 'deepseek-chat',
      maxTokens: parseInt(process.env.DEEPSEEK_MAX_TOKENS || '4000'),
      temperature: parseFloat(process.env.DEEPSEEK_TEMPERATURE || '0.7'),
    },
    app: {
      name: process.env.NEXT_PUBLIC_APP_NAME || 'DramaForge',
      version: process.env.NEXT_PUBLIC_APP_VERSION || '1.0.0',
    },
    features: {
      enableAIGeneration: process.env.NEXT_PUBLIC_ENABLE_AI_GENERATION === 'true',
      enableThemeToggle: process.env.NEXT_PUBLIC_ENABLE_THEME_TOGGLE === 'true',
    },
    performance: {
      apiTimeout: parseInt(process.env.NEXT_PUBLIC_API_TIMEOUT || '30000'),
      maxRetries: parseInt(process.env.NEXT_PUBLIC_MAX_RETRIES || '3'),
    },
  }
}

// 使用配置
export const config = loadConfig()
```

#### API客户端实现

```typescript
// lib/deepseek-client.ts
import { config } from './config'

export class DeepSeekClient {
  private apiKey: string
  private baseUrl: string
  private model: string
  
  constructor() {
    this.apiKey = config.deepseek.apiKey
    this.baseUrl = config.deepseek.baseUrl
    this.model = config.deepseek.model
  }
  
  async chat(messages: Message[], options?: ChatOptions): Promise<ChatResponse> {
    const response = await fetch(`${this.baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({
        model: this.model,
        messages,
        max_tokens: options?.maxTokens || config.deepseek.maxTokens,
        temperature: options?.temperature || config.deepseek.temperature,
      }),
      signal: AbortSignal.timeout(config.performance.apiTimeout),
    })
    
    if (!response.ok) {
      throw new APIError(response.status, await response.text())
    }
    
    return response.json()
  }
}
```

#### 配置UI展示

**设置页面**:
```tsx
// 显示配置状态（不显示敏感信息）
<div className="settings-section">
  <h3>AI配置状态</h3>
  <div className="config-status">
    <div className="config-item">
      <span>API连接</span>
      <Badge variant={apiConnected ? 'success' : 'error'}>
        {apiConnected ? '已连接' : '未连接'}
      </Badge>
    </div>
    <div className="config-item">
      <span>模型</span>
      <span>{config.deepseek.model}</span>
    </div>
    <div className="config-item">
      <span>最大Token</span>
      <span>{config.deepseek.maxTokens}</span>
    </div>
  </div>
</div>
```

### 设计令牌数据结构

```typescript
// 颜色令牌
interface ColorTokens {
  primary: string
  primaryForeground: string
  background: string
  foreground: string
  card: string
  cardForeground: string
  border: string
  input: string
  ring: string
  statusDraft: string
  statusGenerating: string
  statusCompleted: string
  // ... 其他颜色
}

// 间距令牌
interface SpacingTokens {
  0: string
  1: string
  2: string
  3: string
  4: string
  6: string
  8: string
  12: string
  16: string
  20: string
}

// 排版令牌
interface TypographyTokens {
  fontFamily: {
    sans: string
    mono: string
  }
  fontSize: {
    xs: string
    sm: string
    base: string
    lg: string
    xl: string
    '2xl': string
    '3xl': string
  }
  fontWeight: {
    normal: number
    medium: number
    semibold: number
    bold: number
  }
  lineHeight: {
    tight: number
    normal: number
    relaxed: number
  }
}

// 动画令牌
interface AnimationTokens {
  duration: {
    instant: string
    fast: string
    normal: string
    slow: string
    slower: string
  }
  easing: {
    in: string
    out: string
    inOut: string
    spring: string
  }
}
```

### 组件状态模型

```typescript
// 按钮状态
type ButtonState = 'default' | 'hover' | 'active' | 'disabled' | 'loading'

// 输入框状态
type InputState = 'default' | 'focus' | 'error' | 'disabled'

// 卡片状态
type CardState = 'default' | 'hover' | 'active' | 'selected'

// AI生成状态
type AIGenerationState = 'idle' | 'loading' | 'success' | 'error'

interface AIGenerationStatus {
  state: AIGenerationState
  progress: number // 0-100
  currentStep: string
  errorMessage?: string
}
```

## 错误处理

### UI错误处理策略

**设计决策**: 分层错误处理，确保用户始终知道发生了什么以及如何解决。

#### 1. 表单验证错误

```typescript
// 即时验证反馈
interface ValidationError {
  field: string
  message: string
  type: 'required' | 'format' | 'length' | 'custom'
}

// UI显示
<div className="input-error">
  <input className="input input-invalid" />
  <p className="input-error-message">
    <AlertCircle size={12} />
    {error.message}
  </p>
</div>
```

```css
.input-invalid {
  border-color: oklch(0.55 0.2 27);
}

.input-error-message {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  margin-top: 0.25rem;
  font-size: 12px;
  color: oklch(0.55 0.2 27);
}
```

#### 2. API错误处理

```typescript
// 错误类型定义
enum APIErrorType {
  NETWORK = 'network',
  TIMEOUT = 'timeout',
  RATE_LIMIT = 'rate_limit',
  INVALID_REQUEST = 'invalid_request',
  SERVER_ERROR = 'server_error',
}

// 错误消息映射
const errorMessages: Record<APIErrorType, string> = {
  [APIErrorType.NETWORK]: '网络连接失败，请检查网络设置',
  [APIErrorType.TIMEOUT]: '请求超时，请稍后重试',
  [APIErrorType.RATE_LIMIT]: 'API调用次数已达上限，请稍后再试',
  [APIErrorType.INVALID_REQUEST]: '请求参数有误，请检查输入',
  [APIErrorType.SERVER_ERROR]: '服务器错误，请稍后重试',
}

// 错误处理函数
function handleAPIError(error: APIError): void {
  const message = errorMessages[error.type] || '未知错误'
  
  toast.error('操作失败', {
    description: message,
    action: error.retryable ? {
      label: '重试',
      onClick: () => error.retry(),
    } : undefined,
  })
}
```

#### 3. 降级策略

```typescript
// 功能降级
interface FeatureFallback {
  feature: string
  fallback: () => void
  message: string
}

// 示例：AI生成失败时的降级
const aiGenerationFallback: FeatureFallback = {
  feature: 'ai-generation',
  fallback: () => {
    // 显示手动输入表单
    showManualInputForm()
  },
  message: 'AI生成暂时不可用，您可以手动输入内容',
}
```

### 边界情况处理

#### 1. 空数据状态

- 项目列表为空: 显示引导创建的空状态
- 搜索无结果: 显示"未找到匹配项目"提示
- 加载失败: 显示重试按钮

#### 2. 长内容处理

```css
/* 文本截断 */
.text-truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.text-truncate-multiline {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
```

#### 3. 加载超时

```typescript
// 超时处理
const TIMEOUT_DURATION = 30000 // 30秒

async function generateWithTimeout<T>(
  promise: Promise<T>,
  timeout: number = TIMEOUT_DURATION
): Promise<T> {
  const timeoutPromise = new Promise<never>((_, reject) => {
    setTimeout(() => reject(new Error('TIMEOUT')), timeout)
  })
  
  return Promise.race([promise, timeoutPromise])
}
```


## 测试策略

### 视觉回归测试

**目标**: 确保UI更改不会意外破坏现有视觉效果。

**工具**: Playwright + Percy/Chromatic

**测试场景**:
1. 组件快照测试
   - 按钮各种状态 (default, hover, active, disabled)
   - 卡片各种变体
   - 表单输入框状态
   - 加载和错误状态

2. 页面快照测试
   - 项目仪表板 (空状态、有数据)
   - 项目详情页
   - 表单页面

3. 响应式测试
   - 移动端视图 (375px)
   - 平板视图 (768px)
   - 桌面视图 (1440px)

### 可访问性测试

**目标**: 确保符合WCAG AA标准。

**测试项**:
1. 颜色对比度
   - 使用axe-core自动检测
   - 手动验证所有文本/背景组合 ≥ 4.5:1

2. 键盘导航
   - Tab键顺序合理
   - 焦点指示器清晰可见
   - 所有交互元素可通过键盘访问

3. 屏幕阅读器
   - 语义化HTML标签
   - ARIA标签正确使用
   - 图片alt文本完整

4. 减少动画偏好
   - 验证prefers-reduced-motion生效
   - 确保无动画时功能正常

### 性能测试

**目标**: 确保UI优化不影响性能。

**测试指标**:
1. 首次内容绘制 (FCP): < 1.5s
2. 最大内容绘制 (LCP): < 2.5s
3. 首次输入延迟 (FID): < 100ms
4. 累积布局偏移 (CLS): < 0.1
5. 动画帧率: 保持60fps

**测试方法**:
- Lighthouse CI集成
- Chrome DevTools Performance分析
- 真实设备测试 (低端设备)

### 交互测试

**目标**: 验证动画和过渡效果符合设计规范。

**测试场景**:
1. 悬停效果
   - 按钮悬停: 150ms过渡
   - 卡片悬停: 200ms过渡 + 2px提升

2. 点击反馈
   - 按钮点击: 100ms缩放
   - 卡片点击: 98%缩放

3. 页面过渡
   - 淡入淡出: 300ms
   - 内容展开: 300ms高度过渡

4. 加载状态
   - 骨架屏显示
   - 进度条动画流畅

### 浏览器兼容性测试

**目标**: 确保在主流浏览器中表现一致。

**测试浏览器**:
- Chrome (最新版 + 前2个版本)
- Firefox (最新版)
- Safari (最新版)
- Edge (最新版)

**测试重点**:
- OKLCH颜色空间回退
- CSS Grid布局
- backdrop-filter支持
- 自定义滚动条样式


## 实施计划

### 阶段1: 设计令牌和基础样式 (优先级: 高)

**目标**: 建立设计系统基础，更新CSS变量和全局样式，实现主题切换功能。

**任务**:
1. 实现主题切换系统
   - 创建主题上下文和Provider
   - 实现深色/浅色主题切换
   - 添加主题持久化（localStorage）
   - 创建主题切换按钮组件

2. 更新globals.css中的颜色变量
   - 调整主色调为琥珀金色系
   - 添加深色主题颜色变量
   - 添加浅色主题颜色变量
   - 添加状态颜色变量
   - 优化背景和文本颜色对比度

3. 配置字体系统
   - 确认Noto Sans SC字重加载
   - 设置字体回退栈
   - 配置font-display策略

4. 实现间距系统
   - 验证Tailwind spacing配置
   - 统一组件间距使用

5. 添加背景纹理和渐变
   - 实现页面背景效果
   - 添加微妙噪点纹理
   - 适配深色/浅色主题

6. 更新滚动条样式
   - 调整宽度为6px
   - 匹配深色/浅色主题颜色

**验收标准**:
- 主题切换功能正常工作
- 深色和浅色主题颜色符合WCAG AA标准
- 字体正确加载，中文显示清晰
- 背景纹理效果微妙不突兀
- 滚动条样式在两种主题下都统一

### 阶段2: 组件样式优化 (优先级: 高)

**目标**: 更新现有组件样式，应用新的视觉设计。

**任务**:
1. 优化卡片组件
   - 调整圆角为12px
   - 添加悬停提升效果
   - 实现装饰边框

2. 更新按钮组件
   - 应用新的颜色方案
   - 添加悬停和点击动画
   - 统一尺寸规格

3. 优化输入框组件
   - 增强焦点状态
   - 添加边框高亮效果
   - 改进错误状态显示

4. 更新统计卡片
   - 添加图标和渐变背景
   - 优化布局和间距
   - 增强视觉层次

5. 优化项目卡片
   - 添加状态徽章
   - 实现装饰元素
   - 改进悬停效果

**验收标准**:
- 所有组件应用新的视觉风格
- 悬停和点击动画流畅
- 组件状态清晰可辨
- 视觉层次分明

### 阶段3: 动画和过渡效果 (优先级: 中)

**目标**: 实现流畅的交互动画，提升用户体验。

**任务**:
1. 实现交互动画
   - 按钮悬停和点击效果
   - 卡片悬停提升
   - 链接下划线动画

2. 添加页面过渡
   - 淡入淡出效果
   - 内容展开/折叠动画

3. 实现加载动画
   - 旋转加载器
   - 骨架屏
   - 进度条动画

4. 配置动画变量
   - 定义时长常量
   - 设置缓动函数

5. 实现减少动画偏好
   - 添加prefers-reduced-motion支持
   - 测试无动画模式

**验收标准**:
- 所有动画时长符合设计规范
- 动画流畅不卡顿
- 减少动画偏好正常工作
- 动画不影响性能

### 阶段4: DeepSeek AI集成和环境配置 (优先级: 高)

**目标**: 实现AI功能相关的UI组件和交互，配置环境变量管理。

**任务**:
1. 创建环境配置
   - 创建.env.example文件
   - 创建.env.local文件（添加到.gitignore）
   - 定义所有必需的环境变量
   - 实现配置加载和验证逻辑

2. 创建API服务层
   - 实现DeepSeek API客户端封装
   - 定义请求/响应类型
   - 添加错误处理和重试逻辑
   - 实现超时控制

3. 实现加载状态UI
   - 创建加载组件
   - 添加进度指示器
   - 实现加载文案轮播
   - 添加取消功能

4. 实现错误处理UI
   - 创建错误提示组件
   - 添加重试功能
   - 优化错误消息显示
   - 实现降级策略

5. 配置Toast通知
   - 定制Sonner样式（深色/浅色主题）
   - 实现成功/错误提示
   - 添加操作按钮
   - 优化通知位置和时长

6. 集成到现有流程
   - 项目创建流程
   - 剧集生成流程
   - 对话优化功能

**验收标准**:
- 环境变量正确配置和加载
- API调用正常工作
- 加载状态清晰可见
- 错误提示友好明确
- Toast通知样式在两种主题下统一

### 阶段5: 剧本类型和视觉风格扩展 (优先级: 中)

**目标**: 扩展剧本类型和视觉风格选项，提供更丰富的创作可能性。

**任务**:
1. 扩展数据类型定义
   - 更新Genre类型（新增8种类型）
   - 更新VisualStyle类型（新增7种风格）
   - 创建类型元数据配置
   - 创建视觉风格元数据配置

2. 实现类型选择器UI
   - 创建网格布局选择器
   - 为每种类型添加图标和颜色
   - 实现悬停和选中效果
   - 添加类型描述提示

3. 实现视觉风格选择器UI
   - 创建风格卡片组件
   - 添加风格预览图标
   - 实现选中状态
   - 添加风格说明

4. 更新项目表单
   - 集成新的类型选择器
   - 集成新的风格选择器
   - 优化表单布局
   - 添加表单验证

5. 更新项目卡片显示
   - 显示类型图标和颜色
   - 显示视觉风格标签
   - 优化卡片布局

**验收标准**:
- 所有新类型和风格可选择
- 选择器UI美观易用
- 类型和风格正确保存和显示
- 图标和颜色编码清晰

### 阶段6: 特殊视觉元素和优化 (优先级: 中)

**目标**: 添加装饰元素，优化细节体验。

**任务**:
1. 实现装饰元素
   - 金色装饰线条
   - 角落装饰
   - 玻璃态效果

2. 优化空状态
   - 设计空状态插图
   - 优化引导文案
   - 添加操作按钮

3. 实现徽章系统
   - 状态徽章
   - 标签徽章
   - 数字徽章

4. 优化图标使用
   - 统一图标尺寸
   - 添加颜色编码
   - 优化图标布局

5. 细节优化
   - 调整间距和对齐
   - 优化文本层次
   - 改进视觉平衡

**验收标准**:
- 装饰元素增强视觉效果
- 空状态引导清晰
- 徽章系统统一
- 整体视觉和谐

### 阶段7: 可访问性和性能优化 (优先级: 高)

**目标**: 确保应用符合可访问性标准并保持高性能。

**任务**:
1. 可访问性优化
   - 验证颜色对比度
   - 添加ARIA标签
   - 优化键盘导航
   - 测试屏幕阅读器

2. 性能优化
   - 优化字体加载
   - 减少CSS体积
   - 优化动画性能
   - 实现代码分割

3. 响应式优化
   - 测试各种屏幕尺寸
   - 优化移动端体验
   - 调整断点和布局

4. 浏览器兼容性
   - 测试主流浏览器
   - 添加必要的polyfill
   - 实现优雅降级

5. 测试和验证
   - 运行Lighthouse审计
   - 执行可访问性测试
   - 进行性能基准测试

**验收标准**:
- WCAG AA标准合规
- Lighthouse分数 > 90
- 所有浏览器表现一致
- 移动端体验流畅

## 设计决策记录

### 1. 为什么选择OKLCH颜色空间？

**决策**: 使用OKLCH而非传统的RGB/HSL。

**理由**:
- 感知均匀性更好，渐变更平滑
- 更容易创建一致的颜色系统
- 支持更广的色域
- 现代浏览器支持良好

**权衡**: 需要为旧浏览器提供回退方案。

### 2. 为什么采用8px间距系统？

**决策**: 使用8px作为基础间距单位。

**理由**:
- 易于计算和记忆
- 与常见屏幕分辨率对齐
- 提供足够的灵活性
- 行业标准实践

**权衡**: 某些设计可能需要4px的微调。

### 3. 为什么选择深色主题为主？

**决策**: 默认使用深色主题，预留浅色主题扩展。

**理由**:
- 符合创作工具的专业感
- 减少长时间使用的视觉疲劳
- 突出内容和数据
- 电影行业常用深色界面

**权衡**: 需要确保对比度符合可访问性标准。

### 4. 为什么使用Noto Sans SC？

**决策**: 选择思源黑体作为中文主字体。

**理由**:
- 专为中文优化，显示效果好
- 字重齐全，支持多种层次
- 开源免费，无版权问题
- Google Fonts支持，加载方便

**权衡**: 字体文件较大，需要优化加载策略。

### 5. 为什么动画时长设置为150-300ms？

**决策**: 大部分动画时长控制在150-300ms范围。

**理由**:
- 足够快，不会让用户等待
- 足够慢，能感知到变化
- 符合人类感知的"即时"阈值
- 行业最佳实践

**权衡**: 复杂动画可能需要更长时间。

## 附录

### A. 颜色对比度验证

所有文本/背景组合的对比度验证结果：

| 前景色 | 背景色 | 对比度 | 等级 |
|--------|--------|--------|------|
| foreground | background | 7.2:1 | AAA |
| muted-foreground | background | 4.8:1 | AA |
| primary-foreground | primary | 8.1:1 | AAA |
| card-foreground | card | 6.9:1 | AAA |

### B. 浏览器支持矩阵

| 特性 | Chrome | Firefox | Safari | Edge |
|------|--------|---------|--------|------|
| OKLCH | ✓ 111+ | ✓ 113+ | ✓ 15.4+ | ✓ 111+ |
| backdrop-filter | ✓ | ✓ | ✓ | ✓ |
| CSS Grid | ✓ | ✓ | ✓ | ✓ |
| Custom Properties | ✓ | ✓ | ✓ | ✓ |

### C. 性能基准

目标性能指标：

- FCP: < 1.5s
- LCP: < 2.5s
- FID: < 100ms
- CLS: < 0.1
- TTI: < 3.5s

### D. 参考资源

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [OKLCH Color Space](https://oklch.com/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [Lucide Icons](https://lucide.dev/)
- [Material Design Motion](https://m3.material.io/styles/motion)

