<!--
  工具名称: URL 编解码
  功能描述: URL 编码和解码
-->
<script setup>
import { ref } from 'vue'
import { useLocalStorage } from '@/composables/useLocalStorage'
import CopyButton from '@/components/common/CopyButton.vue'
import ResizableTextarea from '@/components/common/ResizableTextarea.vue'

const input = useLocalStorage('tool-url-input', '')
const output = ref('')
const error = ref('')

// 编码
const encode = () => {
  try {
    output.value = encodeURIComponent(input.value)
    error.value = ''
  } catch (e) {
    error.value = `编码失败: ${e.message}`
    output.value = ''
  }
}

// 解码
const decode = () => {
  try {
    output.value = decodeURIComponent(input.value)
    error.value = ''
  } catch (e) {
    error.value = `解码失败: ${e.message}`
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
      <h2 class="text-2xl font-bold mb-2">URL 编解码</h2>
      <p class="text-gray-600 dark:text-gray-400 mb-6">URL 编码和解码工具</p>

      <!-- 输入区 -->
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium mb-2">输入文本</label>
          <ResizableTextarea
            v-model="input"
            placeholder="输入要编码或解码的 URL..."
            :rows="10"
          />
        </div>

        <!-- 操作按钮 -->
        <div class="flex flex-wrap gap-3">
          <button @click="encode" class="btn-primary">编码</button>
          <button @click="decode" class="btn-secondary">解码</button>
          <button @click="clear" class="btn-secondary">清空</button>
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
          <ResizableTextarea
            v-model="output"
            :readonly="true"
            :rows="15"
          />
        </div>
      </div>
    </div>
  </div>
</template>
