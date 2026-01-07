<!--
  工具名称: 二维码生成器
  功能描述: 生成二维码
-->
<script setup>
import { ref, watch } from 'vue'
import { useLocalStorage } from '@/composables/useLocalStorage'
import QRCode from 'qrcode'

const input = useLocalStorage('tool-qrcode-input', 'https://github.com')
const qrcodeUrl = ref('')
const size = ref(256)
const errorLevel = ref('M')

// 生成二维码
const generate = async () => {
  if (!input.value) {
    qrcodeUrl.value = ''
    return
  }

  try {
    qrcodeUrl.value = await QRCode.toDataURL(input.value, {
      width: size.value,
      margin: 2,
      errorCorrectionLevel: errorLevel.value
    })
  } catch (error) {
    console.error('生成二维码失败:', error)
  }
}

// 下载二维码
const download = () => {
  if (!qrcodeUrl.value) return

  const link = document.createElement('a')
  link.download = 'qrcode.png'
  link.href = qrcodeUrl.value
  link.click()
}

// 监听输入变化
watch([input, size, errorLevel], generate, { immediate: true })
</script>

<template>
  <div class="tool-container">
    <div class="tool-card">
      <h2 class="text-2xl font-bold mb-2">二维码生成器</h2>
      <p class="text-gray-600 dark:text-gray-400 mb-6">将文本或 URL 转换为二维码</p>

      <div class="space-y-4">
        <!-- 输入区 -->
        <div>
          <label class="block text-sm font-medium mb-2">输入内容</label>
          <textarea
            v-model="input"
            placeholder="输入文本或 URL..."
            rows="4"
            class="tool-textarea"
          ></textarea>
        </div>

        <!-- 配置选项 -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium mb-2">尺寸 ({{ size }}px)</label>
            <input
              v-model.number="size"
              type="range"
              min="128"
              max="512"
              step="64"
              class="w-full"
            >
            <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
              <span>128</span>
              <span>512</span>
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium mb-2">容错级别</label>
            <select v-model="errorLevel" class="tool-input">
              <option value="L">低 (7%)</option>
              <option value="M">中 (15%)</option>
              <option value="Q">较高 (25%)</option>
              <option value="H">高 (30%)</option>
            </select>
          </div>
        </div>

        <!-- 二维码预览 -->
        <div v-if="qrcodeUrl" class="flex flex-col items-center gap-4 p-6 bg-gray-50 dark:bg-slate-900 rounded-lg">
          <img :src="qrcodeUrl" alt="QR Code" class="border-4 border-white dark:border-slate-700 rounded-lg shadow-lg">

          <button @click="download" class="btn-primary">
            <svg class="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            下载二维码
          </button>
        </div>

        <!-- 提示 -->
        <div class="text-sm text-gray-500 dark:text-gray-400">
          <p>💡 提示：容错级别越高，二维码越复杂，但更容易被损坏后识别</p>
        </div>
      </div>
    </div>
  </div>
</template>
