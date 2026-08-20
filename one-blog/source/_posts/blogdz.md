---
title: Hexo 博客定制记录：布局重构、暗黑模式与几个 CSS 细节
date: 2026-08-06 22:30:00
---

搭建个人博客时，我用的是 Hexo 配合 Fluid 主题。Fluid 默认功能其实够用了，但我看文章时总觉得目录放右边不太顺手，尤其是长文来回扫目录时有点别扭。

为了保证后续能正常通过 Git 升级主题，我没有去改动底层的 EJS 模板，而是采用“纯 CSS 覆盖”的方式完成定制。这篇就当作一次改主题的备忘，后面再折腾样式时也方便回头看。

<!-- more -->

## 1. 不改 DOM 结构，把目录（TOC）移到左侧

Fluid 默认的布局是把文章目录放在右侧，左侧留出较大的空白。我更习惯类似 Notion 的左侧目录结构。

在不改动 HTML 结构的前提下，可以直接利用 Flexbox 的 `order` 属性来改变视觉渲染顺序：

```css
@media (min-width: 992px) {
  /* Fluid 文章页实际是：左空列 + 正文 + 右目录 */
  body.is-post-page main > .container-fluid > .row {
    display: flex;
    justify-content: center;
  }

  /* 左侧空列挪到右边 */
  body.is-post-page main > .container-fluid > .row > .side-col:first-child {
    order: 3;
  }

  /* 正文保持在中间 */
  body.is-post-page main > .container-fluid > .row > .col-lg-8 {
    order: 2;
  }

  /* 右侧目录列挪到左边 */
  body.is-post-page main > .container-fluid > .row > .side-col:last-child {
    order: 1;
  }

  body.is-post-page main > .container-fluid > .row > .side-col:last-child .sidebar {
    margin-right: -1rem;
    margin-left: 0 !important;
  }
}
```

配合媒体查询，只在屏幕宽度大于 992px 时生效，移动端依然保持原生的单列自适应。

## 2. 样式管理：用 CSS 变量统一暗黑模式
一开始我也想过直接哪里不顺眼改哪里，但暗黑模式一开就会发现颜色到处打架，所以后来还是抽了一层变量。

我将页面的核心色彩抽象成了几组 CSS 变量（自定义属性），并在切换主题时只覆盖根变量的值：
```css
/* 浅色主题变量 */
body.is-subpage {
  --shell-bg: #f5f7fb;
  --shell-surface: #ffffff;
  --shell-ink: #172033;
  --shell-muted: #697386;
  --shell-line: rgba(23, 32, 51, 0.1);
  --shell-accent: #4f6bff;
  --shell-accent-soft: #eef1ff;
  color: var(--shell-ink);
  background: var(--shell-bg);
}

/* 暗色主题变量：结构不变，只覆盖色值 */
html[data-user-color-scheme='dark'] body.is-subpage {
  --shell-bg: #0e1320;
  --shell-surface: #151c2b;
  --shell-ink: #eef2ff;
  --shell-muted: #9ba6bc;
  --shell-line: rgba(223, 230, 255, 0.11);
  --shell-accent: #8093ff;
  --shell-accent-soft: rgba(101, 122, 255, 0.14);
}
```

这样写组件样式时直接引用 var(--shell-ink)，无需为每个类单独写深色适配代码。

## 3. 视觉与性能细节
### 3.1 毛玻璃导航栏与兼容性
导航栏做了半透明毛玻璃效果，注意要带上 -webkit- 前缀兼容 iOS Safari：
```css
body.is-subpage .navbar {
  background-color: rgba(255, 255, 255, 0.85) !important;
  backdrop-filter: blur(10px) !important;
  -webkit-backdrop-filter: blur(10px) !important;
}
```

### 3.2 子页面 Banner 优化（透明占位图）
默认配置下，子页面会加载一张高度很高的大图 Banner，遮挡正文首屏内容。我在主题配置中把图片替换为 1x1 的 Base64 透明 GIF，并在 CSS 中压低高度，避免发出无用的网络请求，同时把正文拉回首屏可见区域：

```css
# _config.fluid.yml
archive:
  banner_img: "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
  banner_img_height: 50
```

### 3.3 动画性能
状态指示灯的呼吸动效只操作 transform 属性，避免触发浏览器的重排（Reflow）和重绘（Repaint），降低滚动时的渲染开销：

```css
@keyframes project-alert-pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.08); }
}
```

### 3.4 代码字体覆盖
将代码块统一替换为支持连字特性的等宽字体：

```css
code, pre {
  font-family: "Fira Code", "JetBrains Mono", Consolas, monospace !important;
}
```

## 总结
最后感觉这套方式最省心：主题照常升级，我自己的改动就集中在 custom.css 里，不用每次合并模板冲突。这篇不是完整教程，更像是我改博客时留下的备忘。以后主题升级或者换电脑，也能快速找回当时为什么这么写。
