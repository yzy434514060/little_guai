<!--
  工具名称: 正则表达式测试
  功能描述: 正则表达式测试和匹配
-->
<script setup>
import { ref, computed } from 'vue'
import { useLocalStorage } from '@/composables/useLocalStorage'

const pattern = useLocalStorage('tool-regex-pattern', '\\d+')
const flags = ref({ g: true, i: false, m: false })
const testString = useLocalStorage('tool-regex-test', 'Test 123 string 456')
const error = ref('')

// 构建正则表达式
const regex = computed(() => {
  try {
    const flagsStr = Object.entries(flags.value)
      .filter(([_, enabled]) => enabled)
      .map(([flag]) => flag)
      .join('')

    error.value = ''
    return new RegExp(pattern.value, flagsStr)
  } catch (e) {
    error.value = e.message
    return null
  }
})

// 匹配结果
const matches = computed(() => {
  if (!regex.value || !testString.value) return []

  const results = []
  let match

  if (flags.value.g) {
    const re = new RegExp(regex.value.source, regex.value.flags)
    while ((match = re.exec(testString.value)) !== null) {
      results.push({
        match: match[0],
        index: match.index,
        groups: match.slice(1)
      })
    }
  } else {
    match = regex.value.exec(testString.value)
    if (match) {
      results.push({
        match: match[0],
        index: match.index,
        groups: match.slice(1)
      })
    }
  }

  return results
})

// 高亮显示匹配
const highlightedText = computed(() => {
  if (!regex.value || !testString.value || matches.value.length === 0) {
    return testString.value
  }

  let result = ''
  let lastIndex = 0

  matches.value.forEach(({ match, index }) => {
    result += testString.value.slice(lastIndex, index)
    result += `<mark class="bg-yellow-200 dark:bg-yellow-700">${match}</mark>`
    lastIndex = index + match.length
  })

  result += testString.value.slice(lastIndex)
  return result
})

// 常用正则
const commonPatterns = [
  { name: '邮箱', pattern: '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}' },
  { name: 'URL', pattern: 'https?://[^\\s]+' },
  { name: '手机号', pattern: '1[3-9]\\d{9}' },
  { name: 'IP地址', pattern: '\\b(?:\\d{1,3}\\.){3}\\d{1,3}\\b' },
  { name: '日期', pattern: '\\d{4}-\\d{2}-\\d{2}' },
  { name: '数字', pattern: '\\d+' }
]

const usePattern = (p) => {
  pattern.value = p
}
</script>

<template>
  <div class="tool-container">
    <div class="tool-card">
      <h2 class="text-2xl font-bold mb-2">正则表达式测试</h2>
      <p class="text-gray-600 dark:text-gray-400 mb-6">测试和调试正则表达式</p>

      <div class="space-y-4">
        <!-- 正则表达式输入 -->
        <div>
          <label class="block text-sm font-medium mb-2">正则表达式</label>
          <div class="flex items-center gap-2">
            <span class="text-gray-500">/</span>
            <input
              v-model="pattern"
              type="text"
              placeholder="输入正则表达式..."
              class="tool-input flex-1 font-mono"
            >
            <span class="text-gray-500">/</span>

            <!-- 标志 -->
            <div class="flex gap-2">
              <label class="flex items-center gap-1 cursor-pointer">
                <input v-model="flags.g" type="checkbox" class="w-4 h-4">
                <span class="text-sm">g</span>
              </label>
              <label class="flex items-center gap-1 cursor-pointer">
                <input v-model="flags.i" type="checkbox" class="w-4 h-4">
                <span class="text-sm">i</span>
              </label>
              <label class="flex items-center gap-1 cursor-pointer">
                <input v-model="flags.m" type="checkbox" class="w-4 h-4">
                <span class="text-sm">m</span>
              </label>
            </div>
          </div>

          <div class="text-xs text-gray-500 dark:text-gray-400 mt-1">
            g: 全局匹配 | i: 忽略大小写 | m: 多行模式
          </div>
        </div>

        <!-- 错误提示 -->
        <div v-if="error" class="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-400">
          {{ error }}
        </div>

        <!-- 常用正则 -->
        <div>
          <label class="block text-sm font-medium mb-2">常用正则</label>
          <div class="flex flex-wrap gap-2">
            <button
              v-for="item in commonPatterns"
              :key="item.name"
              @click="usePattern(item.pattern)"
              class="px-3 py-1 text-sm bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 rounded-lg transition-colors"
            >
              {{ item.name }}
            </button>
          </div>
        </div>

        <!-- 测试字符串 -->
        <div>
          <label class="block text-sm font-medium mb-2">测试字符串</label>
          <textarea
            v-model="testString"
            placeholder="输入要测试的字符串..."
            rows="6"
            class="tool-textarea"
          ></textarea>
        </div>

        <!-- 匹配结果 -->
        <div v-if="regex && testString">
          <div class="flex items-center justify-between mb-2">
            <label class="block text-sm font-medium">匹配结果</label>
            <span class="text-sm text-gray-500 dark:text-gray-400">
              找到 {{ matches.length }} 个匹配
            </span>
          </div>

          <!-- 高亮显示 -->
          <div
            class="p-4 bg-gray-50 dark:bg-slate-900 rounded-lg font-mono text-sm whitespace-pre-wrap break-all"
            v-html="highlightedText"
          ></div>

          <!-- 匹配详情 -->
          <div v-if="matches.length > 0" class="mt-4 space-y-2">
            <div
              v-for="(match, index) in matches"
              :key="index"
              class="p-3 bg-gray-50 dark:bg-slate-900 rounded-lg"
            >
              <div class="flex items-center justify-between mb-1">
                <span class="text-sm font-semibold">匹配 {{ index + 1 }}</span>
                <span class="text-xs text-gray-500 dark:text-gray-400">位置: {{ match.index }}</span>
              </div>
              <div class="font-mono text-sm">{{ match.match }}</div>
              <div v-if="match.groups.length > 0" class="mt-2 text-xs text-gray-600 dark:text-gray-400">
                分组: {{ match.groups.join(', ') }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
