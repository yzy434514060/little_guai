<!--
  工具详情视图
  功能：动态加载并显示具体工具组件
-->
<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { defineAsyncComponent } from 'vue'
import AppHeader from '@/components/layout/AppHeader.vue'
import AppSidebar from '@/components/layout/AppSidebar.vue'
import { getToolById } from '@/config/tools'

const route = useRoute()
const searchQuery = ref('')
const sidebarOpen = ref(false)

// 获取当前工具信息
const currentTool = computed(() => {
  return getToolById(route.params.id)
})

// 动态加载工具组件
const toolComponent = computed(() => {
  if (!currentTool.value) return null

  return defineAsyncComponent(() =>
    import(`@/components/tools/${currentTool.value.component}.vue`)
  )
})

const handleSearch = (query) => {
  searchQuery.value = query
}

const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value
}

const closeSidebar = () => {
  sidebarOpen.value = false
}

// 监听路由变化，关闭侧边栏
watch(() => route.params.id, () => {
  closeSidebar()
})
</script>

<template>
  <div class="flex flex-col h-screen">
    <AppHeader @search="handleSearch" @toggle-sidebar="toggleSidebar" />

    <div class="flex flex-1 overflow-hidden">
      <AppSidebar
        :search-query="searchQuery"
        :is-open="sidebarOpen"
        @close="closeSidebar"
      />

      <main class="flex-1 overflow-y-auto">
        <div class="min-h-full p-4 md:p-6 lg:p-8">
          <div class="max-w-[1600px] mx-auto">
              <!-- 工具未找到 -->
              <div v-if="!currentTool" class="text-center py-16">
                <div class="text-6xl mb-4">🔍</div>
                <h2 class="text-2xl font-bold mb-2">工具未找到</h2>
                <p class="text-gray-600 dark:text-gray-400 mb-6">
                  抱歉，您访问的工具不存在
                </p>
                <router-link to="/" class="btn-primary">
                  返回首页
                </router-link>
              </div>

              <!-- 加载工具组件 -->
              <component v-else :is="toolComponent" />
            </div>
          </div>
        </main>
    </div>
  </div>
</template>
