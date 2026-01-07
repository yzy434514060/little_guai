<!--
  工具名称: 字数统计
  功能描述: 统计文本字数、字符数、行数
-->
<script setup>
import { ref, computed } from 'vue'
import { useLocalStorage } from '@/composables/useLocalStorage'

const input = useLocalStorage('tool-word-count-input', '')

// 统计信息
const stats = computed(() => {
  const text = input.value
  return {
    characters: text.length,
    charactersNoSpaces: text.replace(/\s/g, '').length,
    words: text.trim() ? text.trim().split(/\s+/).length : 0,
    lines: text ? text.split('\n').length : 0,
    paragraphs: text.trim() ? text.trim().split(/\n\n+/).length : 0,
    bytes: new Blob([text]).size
  }
})

// 清空
const clear = () => {
  input.value = ''
}
</script>

<template>
  <div class="tool-container">
    <div class="tool-card">
      <h2 class="text-2xl font-bold mb-2">字数统计</h2>
      <p class="text-gray-600 dark:text-gray-400 mb-6">统计文本的字数、字符数、行数等信息</p>

      <!-- 输入区 -->
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium mb-2">输入文本</label>
          <textarea
            v-model="input"
            placeholder="输入要统计的文本..."
            rows="12"
            class="tool-textarea"
          ></textarea>
        </div>

        <!-- 操作按钮 -->
        <div class="flex gap-3">
          <button @click="clear" class="btn-secondary">清空</button>
        </div>

        <!-- 统计结果 -->
        <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div class="p-4 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <div class="text-2xl font-bold text-blue-600 dark:text-blue-400">{{ stats.characters }}</div>
            <div class="text-sm text-gray-600 dark:text-gray-400">字符数（含空格）</div>
          </div>

          <div class="p-4 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-lg border border-purple-200 dark:border-purple-800">
            <div class="text-2xl font-bold text-purple-600 dark:text-purple-400">{{ stats.charactersNoSpaces }}</div>
            <div class="text-sm text-gray-600 dark:text-gray-400">字符数（不含空格）</div>
          </div>

          <div class="p-4 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-lg border border-green-200 dark:border-green-800">
            <div class="text-2xl font-bold text-green-600 dark:text-green-400">{{ stats.words }}</div>
            <div class="text-sm text-gray-600 dark:text-gray-400">单词数</div>
          </div>

          <div class="p-4 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 rounded-lg border border-orange-200 dark:border-orange-800">
            <div class="text-2xl font-bold text-orange-600 dark:text-orange-400">{{ stats.lines }}</div>
            <div class="text-sm text-gray-600 dark:text-gray-400">行数</div>
          </div>

          <div class="p-4 bg-gradient-to-br from-pink-50 to-pink-100 dark:from-pink-900/20 dark:to-pink-800/20 rounded-lg border border-pink-200 dark:border-pink-800">
            <div class="text-2xl font-bold text-pink-600 dark:text-pink-400">{{ stats.paragraphs }}</div>
            <div class="text-sm text-gray-600 dark:text-gray-400">段落数</div>
          </div>

          <div class="p-4 bg-gradient-to-br from-cyan-50 to-cyan-100 dark:from-cyan-900/20 dark:to-cyan-800/20 rounded-lg border border-cyan-200 dark:border-cyan-800">
            <div class="text-2xl font-bold text-cyan-600 dark:text-cyan-400">{{ stats.bytes }}</div>
            <div class="text-sm text-gray-600 dark:text-gray-400">字节数</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
