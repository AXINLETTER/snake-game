# 🚀 用 OpenClaw + OpenCode + GitHub + Vercel 实现 Agent Coding

> 一个完整的 AI 辅助编程工作流实践案例：从零开始开发贪吃蛇游戏并部署上线

---

## 📋 项目概述

本项目展示了如何利用现代化的 AI 编程工具链，实现从需求到部署的全流程自动化开发。通过 **OpenClaw** 作为 AI Agent 调度中心，结合 **OpenCode** 的编程能力，**GitHub** 进行代码托管，**Vercel** 实现自动部署，我们完成了一个完整的贪吃蛇游戏开发。

---

## 🏗️ 系统架构图

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              Agent Coding 工作流                             │
└─────────────────────────────────────────────────────────────────────────────┘

    ┌─────────────┐
    │   用户输入   │ ────────────────────────────────────────────────────────────────┐
    │  "开发贪吃蛇" │                                                                │
    └─────────────┘                                                                │
           │                                                                       │
           ▼                                                                       │
┌──────────────────────┐                                                         │
│   🤖 OpenClaw Agent   │  AI 调度中心，理解需求并协调工具执行                     │
│  - 需求分析            │                                                         │
│  - 工具调用            │                                                         │
│  - 流程编排            │                                                         │
└──────────┬───────────┘                                                         │
           │                                                                       │
           │ 生成代码                                                               │
           ▼                                                                       │
┌──────────────────────┐                                                         │
│   💻 OpenCode CLI    │  AI 编程助手，生成代码文件                              │
│  - 生成 HTML          │                                                         │
│  - 生成 CSS           │                                                         │
│  - 生成 JavaScript    │                                                         │
└──────────┬───────────┘                                                         │
           │                                                                       │
           │ 保存到本地                                                             │
           ▼                                                                       │
┌──────────────────────┐                                                         │
│   📁 本地工作目录     │  /root/.openclaw/workspace/myopencode/                  │
│  - index.html         │                                                         │
│  - style.css          │                                                         │
│  - snake.js           │                                                         │
└──────────┬───────────┘                                                         │
           │                                                                       │
           │ Git 操作                                                               │
           ▼                                                                       │
┌──────────────────────┐                                                         │
│   🐙 GitHub 仓库      │  代码托管与版本控制                                      │
│  - 代码提交            │                                                         │
│  - 版本管理            │                                                         │
│  - GitHub Pages       │  ← 静态网站托管                                         │
└──────────┬───────────┘                                                         │
           │                                                                       │
           │ 自动部署                                                               │
           ▼                                                                       │
┌──────────────────────┐                                                         │
│   ⚡ Vercel /         │  前端应用部署平台                                        │
│   📄 GitHub Pages    │  - 自动构建                                              │
│                      │  - CDN 加速                                              │
│                      │  - 自定义域名                                            │
└──────────────────────┘                                                         │
           │                                                                       │
           │ 可访问链接                                                             │
           ▼                                                                       │
┌──────────────────────┐                                                         │
│   🌐 线上游戏         │  https://axinletter.github.io/snake-game/               │
│   用户可玩            │                                                         │
└──────────────────────┘                                                         │
           │                                                                       │
           │ 反馈迭代                                                               │
           ▼                                                                       │
    ┌─────────────┐                                                               │
    │  用户反馈    │ ───────────────────────────────────────────────────────────────┘
    │ "修复Bug"   │
    └─────────────┘
```

---

## 🔄 完整工作流程

### 第一步：环境准备

#### 1.1 安装 OpenClaw
OpenClaw 是一个 AI Agent 管理平台，可以连接各种 AI 工具和外部服务。

```bash
# 安装 OpenClaw
npm install -g @openclaw/cli

# 配置 AI 提供商
openclaw configure
```

#### 1.2 安装 OpenCode
OpenCode 是一个 AI 编程助手 CLI 工具。

```bash
npm install -g opencode-ai

# 验证安装
opencode --version
```

#### 1.3 准备 GitHub Token
用于代码托管和 GitHub Pages 部署。

1. 访问 https://github.com/settings/tokens
2. 生成 Personal Access Token
3. 保存 Token 用于后续操作

---

### 第二步：创建项目目录

```bash
# 创建工作目录
mkdir -p ~/.openclaw/workspace/myopencode
cd ~/.openclaw/workspace/myopencode
```

---

### 第三步：使用 OpenCode 生成代码

通过自然语言描述，让 OpenCode 生成完整的游戏代码：

```bash
opencode run "创建一个完整的贪吃蛇游戏，使用 HTML5 Canvas 和 JavaScript，包含：
1. 蛇的移动和控制
2. 食物生成
3. 碰撞检测
4. 分数系统
5. 游戏结束逻辑
生成 index.html、style.css 和 snake.js 三个文件"
```

**生成的文件结构：**

```
myopencode/
├── index.html    # 游戏主页面
├── style.css     # 样式文件
└── snake.js      # 游戏逻辑
```

---

### 第四步：初始化 Git 仓库

```bash
# 初始化 Git
git init

# 配置用户信息
git config user.name "Your Name"
git config user.email "your@email.com"

# 添加文件
git add .

# 提交代码
git commit -m "🐍 初始提交：贪吃蛇游戏"
```

---

### 第五步：推送到 GitHub

#### 5.1 创建 GitHub 仓库

使用 GitHub API 创建仓库：

```bash
curl -X POST \
  -H "Authorization: token YOUR_GITHUB_TOKEN" \
  -H "Accept: application/vnd.github.v3+json" \
  -d '{
    "name": "snake-game",
    "description": "🐍 贪吃蛇游戏 - HTML5 Canvas + JavaScript",
    "private": false
  }' \
  https://api.github.com/user/repos
```

#### 5.2 关联远程仓库并推送

```bash
# 添加远程仓库
git remote add origin https://github.com/YOUR_USERNAME/snake-game.git

# 推送代码
git branch -M main
git push -u origin main
```

---

### 第六步：部署到线上

#### 方案一：GitHub Pages（推荐）

GitHub Pages 是免费的静态网站托管服务。

```bash
# 启用 GitHub Pages
curl -X POST \
  -H "Authorization: token YOUR_GITHUB_TOKEN" \
  -H "Accept: application/vnd.github.v3+json" \
  -d '{
    "source": {
      "branch": "main",
      "path": "/"
    }
  }' \
  https://api.github.com/repos/YOUR_USERNAME/snake-game/pages
```

**访问地址：** `https://YOUR_USERNAME.github.io/snake-game/`

#### 方案二：Vercel

Vercel 提供更强大的部署功能和 CDN 加速。

```bash
# 安装 Vercel CLI
npm install -g vercel

# 登录并部署
vercel --token YOUR_VERCEL_TOKEN
```

---

## 📊 工作流程详解

### 🎯 核心概念：Agent Coding

**Agent Coding** 是一种利用 AI Agent 进行软件开发的新范式：

1. **自然语言驱动**：用人类语言描述需求
2. **AI 自动执行**：AI 自动调用工具完成任务
3. **人机协作**：人类负责创意和验收，AI 负责实现
4. **持续迭代**：根据反馈不断优化

### 🔧 工具链协同

| 工具 | 角色 | 功能 |
|------|------|------|
| **OpenClaw** | 调度中心 | 理解需求、协调工具、编排流程 |
| **OpenCode** | 代码生成器 | 根据需求生成代码文件 |
| **GitHub** | 代码仓库 | 版本控制、代码托管、协作开发 |
| **Vercel/Pages** | 部署平台 | 自动构建、CDN 分发、域名托管 |

---

## 🛠️ 开发与迭代流程

### 需求 → 代码 → 部署 → 反馈 循环

```
用户提出需求
      │
      ▼
┌────────────────┐
│ OpenClaw 分析   │
│ 并生成任务列表  │
└────────┬───────┘
         │
         ▼
┌────────────────┐
│ OpenCode 生成   │
│ 初始代码        │
└────────┬───────┘
         │
         ▼
┌────────────────┐
│ 本地测试运行    │
└────────┬───────┘
         │
         ▼
┌────────────────┐
│ 推送到 GitHub   │
└────────┬───────┘
         │
         ▼
┌────────────────┐
│ 自动部署到      │
│ Vercel/Pages   │
└────────┬───────┘
         │
         ▼
┌────────────────┐
│ 用户测试体验    │
└────────┬───────┘
         │
    ┌────┴────┐
    │ 发现问题 │
    └────┬────┘
         │
         ▼
┌────────────────┐
│ 返回修复阶段    │
│ (重复上述流程)  │
└────────────────┘
```

---

## 📝 实际案例：贪吃蛇游戏开发

### 初始需求

> "帮我开发一个贪吃蛇游戏"

### OpenClaw 执行流程

1. **创建项目目录**
   ```bash
   mkdir -p ~/.openclaw/workspace/myopencode
   ```

2. **调用 OpenCode 生成代码**
   ```bash
   opencode run "创建贪吃蛇游戏..."
   ```

3. **初始化 Git 并提交**
   ```bash
   git init
   git add .
   git commit -m "初始提交"
   ```

4. **创建 GitHub 仓库并推送**
   ```bash
   # 创建仓库
   curl -X POST ...
   
   # 推送代码
   git push origin main
   ```

5. **启用 GitHub Pages**
   ```bash
   curl -X POST ...
   ```

### 迭代优化

**用户反馈：**
- "分数不增加"
- "移动速度太快"

**OpenClaw 修复流程：**
1. 分析问题原因
2. 修改 snake.js 代码
3. 提交并推送更新
4. GitHub Pages 自动重新部署

---

## 🎮 项目成果

### 在线演示

**🕹️ 立即试玩：** https://axinletter.github.io/snake-game/

### 游戏特性

- ✅ 完整的贪吃蛇游戏逻辑
- ✅ 方向键控制移动
- ✅ 食物收集系统
- ✅ 分数统计与最高分记录
- ✅ 暂停/继续功能
- ✅ 响应式设计
- ✅ 自适应难度（随分数增加速度）

---

## 🔑 关键技术点

### 1. 碰撞检测优化

从精确坐标匹配改为距离检测：

```javascript
// 吃食物检测 - 使用中心点距离检测
const headCenterX = head.x + gridSize / 2;
const headCenterY = head.y + gridSize / 2;
const foodCenterX = food.x + gridSize / 2;
const foodCenterY = food.y + gridSize / 2;
const distance = Math.sqrt(
  Math.pow(headCenterX - foodCenterX, 2) + 
  Math.pow(headCenterY - foodCenterY, 2)
);
const ateFood = distance < gridSize;
```

### 2. 动态速度控制

根据分数调整游戏速度：

```javascript
function getGameSpeed() {
    // 基础速度 200ms，每得50分加速15ms
    const speedIncrease = Math.floor(score / 50) * 15;
    return Math.max(100, 200 - speedIncrease);
}
```

---

## 📚 扩展阅读

### 相关工具

- [OpenClaw 官方文档](https://docs.openclaw.ai)
- [OpenCode GitHub](https://github.com/opencode-ai)
- [Vercel 文档](https://vercel.com/docs)
- [GitHub Pages 文档](https://docs.github.com/pages)

### AI 编程趋势

Agent Coding 代表了软件开发的未来趋势：

1. **低代码/无代码**：降低编程门槛
2. **智能辅助**：AI 成为程序员的得力助手
3. **快速迭代**：从需求到上线的周期大幅缩短
4. **个性化**：根据用户反馈持续优化

---

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request 来改进这个项目！

### 提交步骤

1. Fork 本仓库
2. 创建你的分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

---

## 📄 许可证

本项目采用 [MIT](LICENSE) 许可证。

---

## 🙏 致谢

- OpenClaw 团队提供强大的 AI Agent 平台
- OpenCode 提供优秀的 AI 编程体验
- GitHub 和 Vercel 提供便捷的托管服务

---

> 💡 **提示**：这个项目展示了 AI 辅助编程的强大能力。未来，更多的开发工作将由 AI Agent 完成，人类只需要关注创意和产品设计。

**开始你的 Agent Coding 之旅吧！** 🚀
