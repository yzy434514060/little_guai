<!--
  顶部导航栏组件
  功能：显示 Logo、搜索框、主题切换、GitHub 链接
-->
<script setup>
import { ref } from 'vue'
import ThemeToggle from '@/components/common/ThemeToggle.vue'
import SearchInput from '@/components/common/SearchInput.vue'

const emit = defineEmits(['search', 'toggle-sidebar'])
</script>

<template>
  <header class="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-slate-700">
    <div class="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
      <!-- Logo -->
      <div class="flex items-center gap-4">
        <button
          @click="emit('toggle-sidebar')"
          class="lg:hidden btn-icon"
          aria-label="切换侧边栏"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <router-link to="/" class="flex items-center gap-2 font-bold text-xl">
          <span class="text-primary-600 dark:text-primary-400">⚡</span>
          <span class="hidden sm:inline">Little Guai</span>
        </router-link>
      </div>

      <!-- 搜索框 -->
      <div class="flex-1 max-w-md hidden md:block">
        <SearchInput @search="emit('search', $event)" />
      </div>

      <!-- 右侧操作 -->
      <div class="flex items-center gap-2">
        <ThemeToggle />

        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          class="btn-icon"
          aria-label="GitHub"
        >
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd" />
          </svg>
        </a>
      </div>
    </div>

    <!-- 移动端搜索框 -->
    <div class="md:hidden px-4 pb-3">
      <SearchInput @search="emit('search', $event)" />
    </div>
  </header>
</template>
