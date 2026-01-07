<!--
  工具名称: 进制转换
  功能描述: 2/8/10/16进制互转
-->
<script setup>
import { ref, computed } from 'vue'
import { useLocalStorage } from '@/composables/useLocalStorage'
import CopyButton from '@/components/common/CopyButton.vue'

const input = useLocalStorage('tool-radix-input', '255')
const inputRadix = ref(10)
const error = ref('')

// 转换结果
const results = computed(() => {
  try {
    const decimal = parseInt(input.value, inputRadix.value)

    if (isNaN(decimal)) {
      error.value = '输入无效'
      return null
    }

    error.value = ''
    return {
      binary: decimal.toString(2),
      octal: decimal.toString(8),
      decimal: decimal.toString(10),
      hex: decimal.toString(16).toUpperCase()
    }
  } catch (e) {
    error.value = `转换失败: ${e.message}`
    return null
  }
})

// 清空
const clear = () => {
  input.value = ''
  error.value = ''
}
</script>

<template>
  <div class="tool-container">
    <div class="tool-card">
      <h2 class="text-2xl font-bold mb-2">进制转换</h2>
      <p class="text-gray-600 dark:text-gray-400 mb-6">2/8/10/16 进制互转</p>

      <div class="space-y-4">
        <!-- 输入区 -->
        <div class="flex gap-3">
          <div class="flex-1">
            <label class="block text-sm font-medium mb-2">输入数值</label>
            <input
              v-model="input"
              type="text"
              placeholder="输入数值"
              class="tool-input"
            >
          </div>

          <div>
            <label class="block text-sm font-medium mb-2">输入进制</label>
            <select v-model.number="inputRadix" class="px-4 py-3 bg-gray-50 dark:bg-slate-900 border border-gray-300 dark:border-slate-600 rounded-lg h-[52px]">
              <option :value="2">二进制 (2)</option>
              <option :value="8">八进制 (8)</option>
              <option :value="10">十进制 (10)</option>
              <option :value="16">十六进制 (16)</option>
            </select>
          </div>
        </div>

        <!-- 操作按钮 -->
        <div class="flex gap-3">
          <button @click="clear" class="btn-secondary">清空</button>
        </div>

        <!-- 错误提示 -->
        <div v-if="error" class="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-400">
          {{ error }}
        </div>

        <!-- 转换结果 -->
        <div v-if="results" class="space-y-3">
          <h3 class="font-semibold">转换结果</h3>

          <div class="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <div>
              <div class="text-sm text-gray-600 dark:text-gray-400">二进制 (Binary)</div>
              <div class="font-mono text-lg">{{ results.binary }}</div>
            </div>
            <CopyButton :text="results.binary" />
          </div>

          <div class="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-lg border border-green-200 dark:border-green-800">
            <div>
              <div class="text-sm text-gray-600 dark:text-gray-400">八进制 (Octal)</div>
              <div class="font-mono text-lg">{{ results.octal }}</div>
            </div>
            <CopyButton :text="results.octal" />
          </div>

          <div class="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-lg border border-purple-200 dark:border-purple-800">
            <div>
              <div class="text-sm text-gray-600 dark:text-gray-400">十进制 (Decimal)</div>
              <div class="font-mono text-lg">{{ results.decimal }}</div>
            </div>
            <CopyButton :text="results.decimal" />
          </div>

          <div class="flex items-center justify-between p-4 bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 rounded-lg border border-orange-200 dark:border-orange-800">
            <div>
              <div class="text-sm text-gray-600 dark:text-gray-400">十六进制 (Hexadecimal)</div>
              <div class="font-mono text-lg">{{ results.hex }}</div>
            </div>
            <CopyButton :text="results.hex" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
