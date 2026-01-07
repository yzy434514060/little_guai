<!--
  复制按钮组件
  功能：一键复制文本到剪贴板
-->
<script setup>
import { useClipboard } from '@/composables/useClipboard'

const props = defineProps({
  text: {
    type: String,
    required: true
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

const { copied, copy } = useClipboard()

const handleCopy = () => {
  if (!props.disabled && props.text) {
    copy(props.text)
  }
}
</script>

<template>
  <button
    @click="handleCopy"
    :disabled="disabled || !text"
    class="btn-secondary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
    :class="copied ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' : ''"
  >
    <svg v-if="!copied" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
    <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
    </svg>
    <span>{{ copied ? '已复制' : '复制' }}</span>
  </button>
</template>
