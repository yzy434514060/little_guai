<!--
  侧边栏组件
  功能：显示工具分类和工具列表
-->
<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { toolCategories } from '@/config/tools'

const props = defineProps({
  searchQuery: {
    type: String,
    default: ''
  },
  isOpen: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['close'])
const route = useRoute()

// 图标映射
const icons = {
  FileText: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
  RefreshCw: 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15',
  Sparkles: 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z',
  Code: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4'
}

// 过滤工具
const filteredCategories = computed(() => {
  if (!props.searchQuery) return toolCategories

  return toolCategories.map(category => ({
    ...category,
    tools: category.tools.filter(tool =>
      tool.name.toLowerCase().includes(props.searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(props.searchQuery.toLowerCase())
    )
  })).filter(category => category.tools.length > 0)
})

// 判断工具是否激活
const isToolActive = (toolId) => {
  return route.params.id === toolId
}
</script>

<template>
  <!-- 移动端遮罩 -->
  <div
    v-if="isOpen"
    class="fixed inset-0 bg-black/50 z-40 lg:hidden"
    @click="emit('close')"
  ></div>

  <!-- 侧边栏 -->
  <aside
    :class="[
      'fixed lg:sticky top-0 left-0 h-screen w-64 bg-white dark:bg-slate-800 border-r border-gray-200 dark:border-slate-700 overflow-y-auto z-40 transition-transform lg:translate-x-0',
      isOpen ? 'translate-x-0' : '-translate-x-full'
    ]"
  >
    <div class="p-4 space-y-6 pt-20 lg:pt-4">
      <!-- 全部工具 -->
      <div>
        <router-link
          to="/"
          class="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
          :class="route.name === 'home' ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400' : ''"
          @click="emit('close')"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <span class="font-medium">全部工具</span>
        </router-link>
      </div>

      <!-- 工具分类 -->
      <div
        v-for="category in filteredCategories"
        :key="category.id"
        class="space-y-2"
      >
        <div class="flex items-center gap-2 px-3 text-sm font-semibold text-gray-500 dark:text-gray-400">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="icons[category.icon]" />
          </svg>
          <span>{{ category.name }}</span>
        </div>

        <div class="space-y-1">
          <router-link
            v-for="tool in category.tools"
            :key="tool.id"
            :to="`/tool/${tool.id}`"
            class="block px-3 py-2 rounded-lg text-sm hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
            :class="isToolActive(tool.id) ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 font-medium' : 'text-gray-700 dark:text-gray-300'"
            @click="emit('close')"
          >
            {{ tool.name }}
          </router-link>
        </div>
      </div>

      <!-- 无结果提示 -->
      <div v-if="searchQuery && filteredCategories.length === 0" class="text-center py-8 text-gray-500 dark:text-gray-400">
        <p>未找到相关工具</p>
      </div>
    </div>
  </aside>
</template>
