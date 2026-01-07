<!--
  根组件
  功能：应用主框架，包含路由视图和主题管理
-->
<script setup>
import { onMounted } from 'vue'
import { useTheme } from '@/composables/useTheme'

const { initTheme } = useTheme()

onMounted(() => {
  initTheme()
})
</script>

<template>
  <div id="app" class="min-h-screen">
    <RouterView />
  </div>
</template>
