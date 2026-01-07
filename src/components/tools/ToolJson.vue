<!--
  工具名称: JSON 格式化
  功能描述: JSON 格式化、压缩、校验
-->
<script setup>
import { ref } from 'vue'
import { useLocalStorage } from '@/composables/useLocalStorage'
import CopyButton from '@/components/common/CopyButton.vue'

const input = useLocalStorage('tool-json-input', '')
const output = ref('')
const error = ref('')
const indentSize = ref(2)

// 格式化
const format = () => {
  try {
    const parsed = JSON.parse(input.value)
    output.value = JSON.stringify(parsed, null, indentSize.value)
    error.value = ''
  } catch (e) {
    error.value = `格式化失败: ${e.message}`
    output.value = ''
  }
}

// 压缩
const compress = () => {
  try {
    const parsed = JSON.parse(input.value)
    output.value = JSON.stringify(parsed)
    error.value = ''
  } catch (e) {
    error.value = `压缩失败: ${e.message}`
    output.value = ''
  }
}

// 校验
const validate = () => {
  try {
    JSON.parse(input.value)
    error.value = ''
    output.value = '✓ JSON 格式正确'
  } catch (e) {
    error.value = `校验失败: ${e.message}`
    output.value = ''
  }
}

// 清空
const clear = () => {
  input.value = ''
  output.value = ''
  error.value = ''
}
</script>

<template>
  <div class="tool-container">
    <div class="tool-card">
      <h2 class="text-2xl font-bold mb-2">JSON 格式化</h2>
      <p class="text-gray-600 dark:text-gray-400 mb-6">格式化、压缩、校验 JSON 数据</p>

      <!-- 输入区 -->
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium mb-2">输入 JSON</label>
          <textarea
            v-model="input"
            placeholder='{"name": "Little Guai", "type": "tools"}'
            rows="10"
            class="tool-textarea"
          ></textarea>
        </div>

        <!-- 操作按钮 -->
        <div class="flex flex-wrap gap-3">
          <button @click="format" class="btn-primary">格式化</button>
          <button @click="compress" class="btn-secondary">压缩</button>
          <button @click="validate" class="btn-secondary">校验</button>
          <button @click="clear" class="btn-secondary">清空</button>

          <div class="flex items-center gap-2 ml-auto">
            <label class="text-sm">缩进:</label>
            <select v-model.number="indentSize" class="px-3 py-2 bg-gray-100 dark:bg-slate-700 rounded-lg border border-gray-300 dark:border-slate-600">
              <option :value="2">2 空格</option>
              <option :value="4">4 空格</option>
              <option :value="8">8 空格</option>
            </select>
          </div>
        </div>

        <!-- 错误提示 -->
        <div v-if="error" class="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-400">
          {{ error }}
        </div>

        <!-- 输出区 -->
        <div v-if="output">
          <div class="flex items-center justify-between mb-2">
            <label class="block text-sm font-medium">输出结果</label>
            <CopyButton :text="output" />
          </div>
          <textarea
            v-model="output"
            readonly
            rows="10"
            class="tool-textarea"
          ></textarea>
        </div>
      </div>
    </div>
  </div>
</template>
