<!--
  工具名称: JSON 格式化
  功能描述: JSON 格式化、压缩、校验
-->
<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useLocalStorage } from '@/composables/useLocalStorage'
import CopyButton from '@/components/common/CopyButton.vue'

const input = useLocalStorage('tool-json-input', '')
const output = ref('')
const error = ref('')
const indentSize = ref(2)

// 拖动调整高度
const inputRef = ref(null)
const outputRef = ref(null)
const isDragging = ref(false)
const startY = ref(0)
const startHeight = ref(0)

const startResize = (event) => {
  isDragging.value = true
  startY.value = event.clientY
  startHeight.value = inputRef.value.offsetHeight

  document.body.style.cursor = 'ns-resize'
  document.body.style.userSelect = 'none'

  event.preventDefault()
}

const resize = (event) => {
  if (!isDragging.value) return

  const deltaY = event.clientY - startY.value
  const newHeight = startHeight.value + deltaY

  // 最小高度 200px
  if (newHeight >= 200) {
    inputRef.value.style.height = `${newHeight}px`
    outputRef.value.style.height = `${newHeight}px`
  }
}

const stopResize = () => {
  if (!isDragging.value) return

  isDragging.value = false
  document.body.style.cursor = ''
  document.body.style.userSelect = ''
}

onMounted(() => {
  document.addEventListener('mousemove', resize)
  document.addEventListener('mouseup', stopResize)
})

onUnmounted(() => {
  document.removeEventListener('mousemove', resize)
  document.removeEventListener('mouseup', stopResize)
})

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

      <!-- 操作按钮 -->
      <div class="flex flex-wrap gap-3 mb-4">
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
      <div v-if="error" class="mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-400">
        {{ error }}
      </div>

      <!-- 输入输出区域 -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <!-- 输入区 -->
        <div>
          <label class="block text-sm font-medium mb-2">输入 JSON</label>
          <textarea
            ref="inputRef"
            v-model="input"
            placeholder='{"name": "Little Guai", "type": "tools"}'
            rows="20"
            class="tool-textarea resize-none"
          ></textarea>
        </div>

        <!-- 输出区 -->
        <div>
          <label class="block text-sm font-medium mb-2">输出结果</label>
          <textarea
            ref="outputRef"
            v-model="output"
            readonly
            rows="20"
            placeholder="输出结果将显示在这里..."
            class="tool-textarea resize-none"
          ></textarea>
          <div class="mt-2 flex justify-end">
            <CopyButton :text="output" />
          </div>
        </div>
      </div>

      <!-- 统一拖动手柄 -->
      <div
        @mousedown="startResize"
        class="resize-handle"
        :class="{ 'dragging': isDragging }"
      >
        <div class="resize-handle-line"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.resize-handle {
  height: 12px;
  cursor: ns-resize;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 8px;
  position: relative;
  z-index: 10;
}

.resize-handle-line {
  width: 100%;
  height: 2px;
  background: rgb(209 213 219 / 0.5);
  border-radius: 2px;
  transition: all 0.15s ease;
}

.resize-handle:hover .resize-handle-line,
.resize-handle.dragging .resize-handle-line {
  background: rgb(59 130 246 / 0.5);
  height: 4px;
}

.dark .resize-handle-line {
  background: rgb(71 85 105 / 0.5);
}

.dark .resize-handle:hover .resize-handle-line,
.dark .resize-handle.dragging .resize-handle-line {
  background: rgb(59 130 246 / 0.5);
}
</style>
