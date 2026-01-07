<!--
  工具名称: 文本大小写转换
  功能描述: 转换文本为小驼峰、大驼峰、全大写、全小写
-->
<script setup>
import { ref } from 'vue'
import { useLocalStorage } from '@/composables/useLocalStorage'
import CopyButton from '@/components/common/CopyButton.vue'
import ResizableTextarea from '@/components/common/ResizableTextarea.vue'

const input = useLocalStorage('tool-text-case-input', '')

// 转换函数
const toCamelCase = (text) => {
  return text
    .replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase())
    .replace(/^[A-Z]/, (chr) => chr.toLowerCase())
}

const toPascalCase = (text) => {
  return text
    .replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase())
    .replace(/^[a-z]/, (chr) => chr.toUpperCase())
}

const toUpperCase = (text) => {
  return text.toUpperCase()
}

const toLowerCase = (text) => {
  return text.toLowerCase()
}

const toSnakeCase = (text) => {
  return text
    .replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`)
    .replace(/[^a-zA-Z0-9]+/g, '_')
    .replace(/^_/, '')
    .replace(/_+/g, '_')
}

const toKebabCase = (text) => {
  return text
    .replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`)
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-/, '')
    .replace(/-+/g, '-')
}

// 结果
const results = ref({
  camelCase: '',
  pascalCase: '',
  uppercase: '',
  lowercase: '',
  snakeCase: '',
  kebabCase: ''
})

// 转换
const convert = () => {
  if (!input.value) {
    results.value = {
      camelCase: '',
      pascalCase: '',
      uppercase: '',
      lowercase: '',
      snakeCase: '',
      kebabCase: ''
    }
    return
  }

  results.value = {
    camelCase: toCamelCase(input.value),
    pascalCase: toPascalCase(input.value),
    uppercase: toUpperCase(input.value),
    lowercase: toLowerCase(input.value),
    snakeCase: toSnakeCase(input.value),
    kebabCase: toKebabCase(input.value)
  }
}

// 清空
const clear = () => {
  input.value = ''
  results.value = {
    camelCase: '',
    pascalCase: '',
    uppercase: '',
    lowercase: '',
    snakeCase: '',
    kebabCase: ''
  }
}

// 自动转换
const autoConvert = () => {
  convert()
}
</script>

<template>
  <div class="tool-container">
    <div class="tool-card">
      <h2 class="text-2xl font-bold mb-2">文本大小写转换</h2>
      <p class="text-gray-600 dark:text-gray-400 mb-6">转换文本为各种命名格式</p>

      <div class="space-y-4">
        <!-- 输入区 -->
        <div>
          <label class="block text-sm font-medium mb-2">输入文本</label>
          <ResizableTextarea
            v-model="input"
            @input="autoConvert"
            placeholder="输入要转换的文本，例如：hello world 或 HelloWorld"
            :rows="6"
          />
        </div>

        <!-- 操作按钮 -->
        <div class="flex gap-3">
          <button @click="convert" class="btn-primary">转换</button>
          <button @click="clear" class="btn-secondary">清空</button>
        </div>

        <!-- 转换结果 -->
        <div v-if="input" class="space-y-3">
          <h3 class="font-semibold">转换结果</h3>

          <div class="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <div class="flex-1 min-w-0">
              <div class="text-sm text-gray-600 dark:text-gray-400 mb-1">小驼峰 (camelCase)</div>
              <div class="font-mono text-lg break-all">{{ results.camelCase }}</div>
            </div>
            <CopyButton :text="results.camelCase" />
          </div>

          <div class="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-lg border border-purple-200 dark:border-purple-800">
            <div class="flex-1 min-w-0">
              <div class="text-sm text-gray-600 dark:text-gray-400 mb-1">大驼峰 (PascalCase)</div>
              <div class="font-mono text-lg break-all">{{ results.pascalCase }}</div>
            </div>
            <CopyButton :text="results.pascalCase" />
          </div>

          <div class="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-lg border border-green-200 dark:border-green-800">
            <div class="flex-1 min-w-0">
              <div class="text-sm text-gray-600 dark:text-gray-400 mb-1">蛇形命名 (snake_case)</div>
              <div class="font-mono text-lg break-all">{{ results.snakeCase }}</div>
            </div>
            <CopyButton :text="results.snakeCase" />
          </div>

          <div class="flex items-center justify-between p-4 bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 rounded-lg border border-orange-200 dark:border-orange-800">
            <div class="flex-1 min-w-0">
              <div class="text-sm text-gray-600 dark:text-gray-400 mb-1">短横线命名 (kebab-case)</div>
              <div class="font-mono text-lg break-all">{{ results.kebabCase }}</div>
            </div>
            <CopyButton :text="results.kebabCase" />
          </div>

          <div class="flex items-center justify-between p-4 bg-gradient-to-r from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 rounded-lg border border-red-200 dark:border-red-800">
            <div class="flex-1 min-w-0">
              <div class="text-sm text-gray-600 dark:text-gray-400 mb-1">全大写 (UPPERCASE)</div>
              <div class="font-mono text-lg break-all">{{ results.uppercase }}</div>
            </div>
            <CopyButton :text="results.uppercase" />
          </div>

          <div class="flex items-center justify-between p-4 bg-gradient-to-r from-cyan-50 to-cyan-100 dark:from-cyan-900/20 dark:to-cyan-800/20 rounded-lg border border-cyan-200 dark:border-cyan-800">
            <div class="flex-1 min-w-0">
              <div class="text-sm text-gray-600 dark:text-gray-400 mb-1">全小写 (lowercase)</div>
              <div class="font-mono text-lg break-all">{{ results.lowercase }}</div>
            </div>
            <CopyButton :text="results.lowercase" />
          </div>
        </div>

        <!-- 使用示例 -->
        <div class="p-4 bg-gray-50 dark:bg-slate-900 rounded-lg text-sm">
          <div class="font-semibold mb-2">💡 使用示例</div>
          <div class="space-y-1 text-gray-600 dark:text-gray-400">
            <div>输入：<code class="px-1 bg-gray-200 dark:bg-slate-700 rounded">hello world</code></div>
            <div>输入：<code class="px-1 bg-gray-200 dark:bg-slate-700 rounded">HelloWorld</code></div>
            <div>输入：<code class="px-1 bg-gray-200 dark:bg-slate-700 rounded">hello-world</code></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
