<!--
  可调整大小的文本框组件
  功能：支持从底部边缘拖动调整高度
-->
<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: ''
  },
  rows: {
    type: Number,
    default: 10
  },
  readonly: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue', 'input'])

const textareaRef = ref(null)
const handleRef = ref(null)
const isDragging = ref(false)
const startY = ref(0)
const startHeight = ref(0)

const handleInput = (event) => {
  emit('update:modelValue', event.target.value)
  emit('input', event)
}

const startResize = (event) => {
  isDragging.value = true
  startY.value = event.clientY
  startHeight.value = textareaRef.value.offsetHeight

  document.body.style.cursor = 'ns-resize'
  document.body.style.userSelect = 'none'

  event.preventDefault()
}

const resize = (event) => {
  if (!isDragging.value) return

  const deltaY = event.clientY - startY.value
  const newHeight = startHeight.value + deltaY

  // 最小高度 100px
  if (newHeight >= 100) {
    textareaRef.value.style.height = `${newHeight}px`
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
</script>

<template>
  <div class="resizable-textarea-wrapper">
    <textarea
      ref="textareaRef"
      :value="modelValue"
      @input="handleInput"
      :placeholder="placeholder"
      :rows="rows"
      :readonly="readonly"
      class="tool-textarea resize-none"
    ></textarea>
    <div
      ref="handleRef"
      @mousedown="startResize"
      class="resize-handle"
      :class="{ 'dragging': isDragging }"
    >
      <div class="resize-handle-line"></div>
    </div>
  </div>
</template>

<style scoped>
.resizable-textarea-wrapper {
  position: relative;
}

.resize-handle {
  height: 12px;
  cursor: ns-resize;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: -6px;
  position: relative;
  z-index: 10;
}

.resize-handle:hover .resize-handle-line,
.resize-handle.dragging .resize-handle-line {
  background: rgb(59 130 246 / 0.5);
  height: 4px;
}

.resize-handle-line {
  width: 100%;
  height: 2px;
  background: rgb(209 213 219 / 0.5);
  border-radius: 2px;
  transition: all 0.15s ease;
}

.dark .resize-handle-line {
  background: rgb(71 85 105 / 0.5);
}

.dark .resize-handle:hover .resize-handle-line,
.dark .resize-handle.dragging .resize-handle-line {
  background: rgb(59 130 246 / 0.5);
}
</style>
