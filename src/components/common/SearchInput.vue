<!--
  搜索输入框组件
  功能：搜索工具
-->
<script setup>
import { ref } from 'vue'

const emit = defineEmits(['search'])
const searchQuery = ref('')

const handleSearch = () => {
  emit('search', searchQuery.value)
}

const clearSearch = () => {
  searchQuery.value = ''
  emit('search', '')
}
</script>

<template>
  <div class="relative">
    <input
      v-model="searchQuery"
      @input="handleSearch"
      type="text"
      placeholder="搜索工具..."
      class="w-full pl-10 pr-10 py-2 bg-gray-100 dark:bg-slate-800 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
    >

    <!-- 搜索图标 -->
    <svg
      class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>

    <!-- 清除按钮 -->
    <button
      v-if="searchQuery"
      @click="clearSearch"
      class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
    >
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  </div>
</template>
