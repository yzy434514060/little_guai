<!--
  首页视图
  功能：显示所有工具的卡片列表
-->
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import AppHeader from '@/components/layout/AppHeader.vue'
import AppSidebar from '@/components/layout/AppSidebar.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import { toolCategories } from '@/config/tools'

const router = useRouter()
const searchQuery = ref('')
const sidebarOpen = ref(false)

const handleSearch = (query) => {
  searchQuery.value = query
}

const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value
}

const closeSidebar = () => {
  sidebarOpen.value = false
}

const goToTool = (toolId) => {
  router.push(`/tool/${toolId}`)
  closeSidebar()
}
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <AppHeader @search="handleSearch" @toggle-sidebar="toggleSidebar" />

    <div class="flex flex-1">
      <AppSidebar
        :search-query="searchQuery"
        :is-open="sidebarOpen"
        @close="closeSidebar"
      />

      <main class="flex-1 p-4 md:p-6 lg:p-8">
        <div class="max-w-7xl mx-auto">
          <!-- 欢迎区域 -->
          <div class="mb-8">
            <h1 class="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-primary-600 to-blue-600 dark:from-primary-400 dark:to-blue-400 bg-clip-text text-transparent">
              Little Guai
            </h1>
            <p class="text-gray-600 dark:text-gray-400">
              综合在线工具集，所有数据处理均在浏览器本地完成
            </p>
          </div>

          <!-- 工具分类 -->
          <div
            v-for="category in toolCategories"
            :key="category.id"
            class="mb-8"
          >
            <h2 class="text-2xl font-bold mb-4 flex items-center gap-2">
              <span>{{ category.name }}</span>
              <span class="text-sm font-normal text-gray-500 dark:text-gray-400">
                ({{ category.tools.length }})
              </span>
            </h2>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div
                v-for="tool in category.tools"
                :key="tool.id"
                @click="goToTool(tool.id)"
                class="tool-card cursor-pointer hover:shadow-lg hover:border-primary-300 dark:hover:border-primary-700 transition-all group"
              >
                <h3 class="text-lg font-semibold mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                  {{ tool.name }}
                </h3>
                <p class="text-sm text-gray-600 dark:text-gray-400">
                  {{ tool.description }}
                </p>

                <!-- 箭头图标 -->
                <div class="mt-4 flex items-center text-primary-600 dark:text-primary-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span class="text-sm font-medium">使用工具</span>
                  <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>

    <AppFooter />
  </div>
</template>
