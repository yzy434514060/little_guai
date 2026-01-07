# Little Guai - 在线工具集

<div align="center">

⚡ 一个现代化的综合在线工具集，所有数据处理均在浏览器本地完成

[在线演示](https://your-username.github.io/little-guai) | [功能列表](#功能列表) | [快速开始](#快速开始)

</div>

## ✨ 特性

- 🎨 **现代化设计** - 科技感界面，支持暗黑/明亮主题
- 🔒 **隐私安全** - 所有数据处理均在浏览器本地完成，不上传服务器
- 📱 **响应式布局** - 完美适配桌面、平板、移动端
- 💾 **本地存储** - 自动保存输入内容，刷新不丢失
- ⚡ **PWA 支持** - 可安装到桌面，离线可用
- 🎯 **易于扩展** - 配置驱动，添加新工具只需修改配置文件

## 🛠️ 功能列表

### 文本处理
- ✅ JSON 格式化 / 压缩 / 校验
- ✅ Base64 编码 / 解码
- ✅ URL 编码 / 解码
- ✅ 文本字数统计

### 编码转换
- ✅ 时间戳转换（秒/毫秒 ↔ 日期时间）
- ✅ 进制转换（2/8/10/16进制互转）
- ✅ 颜色格式转换（HEX ↔ RGB ↔ HSL）

### 生成器
- ✅ UUID / GUID 生成
- ✅ 随机密码生成
- ✅ 二维码生成

### 开发工具
- ✅ 正则表达式测试
- ✅ Hash 计算（MD5 / SHA-1 / SHA-256 / SHA-512）

## 🚀 快速开始

### 环境要求

- Node.js 18+
- npm 或 yarn

### 安装依赖

```bash
npm install
```

### 本地开发

```bash
npm run dev
```

访问 http://localhost:5173

### 构建生产版本

```bash
npm run build
```

构建产物在 `dist` 目录

### 预览生产版本

```bash
npm run preview
```

## 📦 部署到 GitHub Pages

### 1. 创建 GitHub 仓库

在 GitHub 创建一个新仓库，例如 `little-guai`

### 2. 推送代码

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/your-username/little-guai.git
git push -u origin main
```

### 3. 配置 GitHub Pages

1. 进入仓库的 Settings > Pages
2. Source 选择 "GitHub Actions"
3. 代码推送后会自动触发部署

### 4. 配置自定义域名（可选）

1. 在域名 DNS 设置中添加 CNAME 记录：
   ```
   类型: CNAME
   名称: tools (或其他子域名)
   值: your-username.github.io
   ```

2. 修改 `public/CNAME` 文件内容为你的域名：
   ```
   tools.example.com
   ```

3. 在 GitHub 仓库 Settings > Pages > Custom domain 中填入域名

4. 等待 DNS 生效（可能需要几分钟到几小时）

## 🔧 添加新工具

添加新工具非常简单，只需 3 步：

### 1. 创建工具组件

在 `src/components/tools/` 目录创建新组件，例如 `ToolExample.vue`：

```vue
<!--
  工具名称: 示例工具
  功能描述: 这是一个示例工具
-->
<script setup>
import { ref } from 'vue'
import { useLocalStorage } from '@/composables/useLocalStorage'
import CopyButton from '@/components/common/CopyButton.vue'

const input = useLocalStorage('tool-example-input', '')
const output = ref('')

const process = () => {
  // 处理逻辑
  output.value = input.value.toUpperCase()
}
</script>

<template>
  <div class="tool-container">
    <div class="tool-card">
      <h2 class="text-2xl font-bold mb-2">示例工具</h2>
      <p class="text-gray-600 dark:text-gray-400 mb-6">工具描述</p>

      <div class="space-y-4">
        <!-- 输入区 -->
        <div>
          <label class="block text-sm font-medium mb-2">输入</label>
          <textarea v-model="input" class="tool-textarea" rows="6"></textarea>
        </div>

        <!-- 操作按钮 -->
        <button @click="process" class="btn-primary">处理</button>

        <!-- 输出区 -->
        <div v-if="output">
          <div class="flex items-center justify-between mb-2">
            <label class="block text-sm font-medium">输出</label>
            <CopyButton :text="output" />
          </div>
          <textarea v-model="output" readonly class="tool-textarea" rows="6"></textarea>
        </div>
      </div>
    </div>
  </div>
</template>
```

### 2. 在配置文件中注册

编辑 `src/config/tools.js`，在对应分类中添加工具配置：

```javascript
{
  id: 'example',
  name: '示例工具',
  description: '这是一个示例工具',
  component: 'ToolExample',
  keywords: ['example', '示例']
}
```

### 3. 完成！

路由会自动注册，无需额外配置。访问 `/tool/example` 即可使用新工具。

## 📁 项目结构

```
little-guai/
├── public/                  # 静态资源
│   ├── CNAME               # 自定义域名配置
│   └── icons/              # PWA 图标
├── src/
│   ├── assets/             # 资源文件
│   │   └── styles/         # 样式文件
│   ├── components/
│   │   ├── common/         # 通用组件
│   │   ├── layout/         # 布局组件
│   │   └── tools/          # 工具组件
│   ├── composables/        # 可复用逻辑
│   ├── config/             # 配置文件
│   │   └── tools.js        # 工具配置（重要！）
│   ├── router/             # 路由配置
│   ├── views/              # 页面视图
│   ├── App.vue             # 根组件
│   └── main.js             # 入口文件
├── .github/
│   └── workflows/
│       └── deploy.yml      # GitHub Actions 部署配置
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

## 🎨 技术栈

- **框架**: Vue 3 (Composition API)
- **构建工具**: Vite
- **样式**: Tailwind CSS
- **路由**: Vue Router 4
- **状态管理**: Pinia
- **PWA**: vite-plugin-pwa
- **工具库**: qrcode, crypto-js

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

MIT License

## 🙏 致谢

感谢所有开源项目的贡献者！

---

<div align="center">

Made with ❤️ by Little Guai

</div>
