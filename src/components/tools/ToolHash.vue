<!--
  工具名称: Hash 计算
  功能描述: MD5/SHA-1/SHA-256 计算
-->
<script setup>
import { ref, computed } from 'vue'
import { useLocalStorage } from '@/composables/useLocalStorage'
import CopyButton from '@/components/common/CopyButton.vue'
import ResizableTextarea from '@/components/common/ResizableTextarea.vue'
import CryptoJS from 'crypto-js'

const input = useLocalStorage('tool-hash-input', '')
const inputType = ref('text') // 'text' | 'file'
const fileInput = ref(null)

// 计算各种 Hash
const hashes = computed(() => {
  if (!input.value) return null

  return {
    md5: CryptoJS.MD5(input.value).toString(),
    sha1: CryptoJS.SHA1(input.value).toString(),
    sha256: CryptoJS.SHA256(input.value).toString(),
    sha512: CryptoJS.SHA512(input.value).toString()
  }
})

// 处理文件上传
const handleFileUpload = (event) => {
  const file = event.target.files[0]
  if (!file) return

  const reader = new FileReader()
  reader.onload = (e) => {
    input.value = e.target.result
  }
  reader.readAsText(file)
}

// 清空
const clear = () => {
  input.value = ''
  if (fileInput.value) {
    fileInput.value.value = ''
  }
}
</script>

<template>
  <div class="tool-container">
    <div class="tool-card">
      <h2 class="text-2xl font-bold mb-2">Hash 计算</h2>
      <p class="text-gray-600 dark:text-gray-400 mb-6">计算文本的 MD5、SHA-1、SHA-256、SHA-512 哈希值</p>

      <div class="space-y-4">
        <!-- 输入类型选择 -->
        <div class="flex gap-3">
          <button
            @click="inputType = 'text'"
            :class="[
              'px-4 py-2 rounded-lg font-medium transition-colors',
              inputType === 'text' ? 'bg-primary-600 text-white' : 'bg-gray-200 dark:bg-slate-700'
            ]"
          >
            文本输入
          </button>
          <button
            @click="inputType = 'file'"
            :class="[
              'px-4 py-2 rounded-lg font-medium transition-colors',
              inputType === 'file' ? 'bg-primary-600 text-white' : 'bg-gray-200 dark:bg-slate-700'
            ]"
          >
            文件上传
          </button>
        </div>

        <!-- 文本输入 -->
        <div v-if="inputType === 'text'">
          <label class="block text-sm font-medium mb-2">输入文本</label>
          <ResizableTextarea
            v-model="input"
            placeholder="输入要计算哈希的文本..."
            :rows="12"
          />
        </div>

        <!-- 文件上传 -->
        <div v-else>
          <label class="block text-sm font-medium mb-2">选择文件</label>
          <input
            ref="fileInput"
            type="file"
            @change="handleFileUpload"
            class="block w-full text-sm text-gray-500 dark:text-gray-400
              file:mr-4 file:py-2 file:px-4
              file:rounded-lg file:border-0
              file:text-sm file:font-semibold
              file:bg-primary-50 file:text-primary-700
              hover:file:bg-primary-100
              dark:file:bg-primary-900/20 dark:file:text-primary-400
              dark:hover:file:bg-primary-900/30"
          >
        </div>

        <!-- 操作按钮 -->
        <div class="flex gap-3">
          <button @click="clear" class="btn-secondary">清空</button>
        </div>

        <!-- Hash 结果 -->
        <div v-if="hashes" class="space-y-3">
          <h3 class="font-semibold">计算结果</h3>

          <div class="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <div class="flex-1 min-w-0">
              <div class="text-sm font-semibold text-blue-600 dark:text-blue-400 mb-1">MD5</div>
              <div class="font-mono text-sm break-all">{{ hashes.md5 }}</div>
            </div>
            <CopyButton :text="hashes.md5" />
          </div>

          <div class="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-lg border border-green-200 dark:border-green-800">
            <div class="flex-1 min-w-0">
              <div class="text-sm font-semibold text-green-600 dark:text-green-400 mb-1">SHA-1</div>
              <div class="font-mono text-sm break-all">{{ hashes.sha1 }}</div>
            </div>
            <CopyButton :text="hashes.sha1" />
          </div>

          <div class="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-lg border border-purple-200 dark:border-purple-800">
            <div class="flex-1 min-w-0">
              <div class="text-sm font-semibold text-purple-600 dark:text-purple-400 mb-1">SHA-256</div>
              <div class="font-mono text-sm break-all">{{ hashes.sha256 }}</div>
            </div>
            <CopyButton :text="hashes.sha256" />
          </div>

          <div class="flex items-center justify-between p-4 bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 rounded-lg border border-orange-200 dark:border-orange-800">
            <div class="flex-1 min-w-0">
              <div class="text-sm font-semibold text-orange-600 dark:text-orange-400 mb-1">SHA-512</div>
              <div class="font-mono text-xs break-all">{{ hashes.sha512 }}</div>
            </div>
            <CopyButton :text="hashes.sha512" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
