<!--
  底部栏组件
  功能：显示版权信息、链接、安装提示
-->
<script setup>
import { ref, onMounted } from 'vue'

const deferredPrompt = ref(null)
const showInstallButton = ref(false)

onMounted(() => {
  // 监听 PWA 安装提示
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault()
    deferredPrompt.value = e
    showInstallButton.value = true
  })
})

const installApp = async () => {
  if (!deferredPrompt.value) return

  deferredPrompt.value.prompt()
  const { outcome } = await deferredPrompt.value.userChoice

  if (outcome === 'accepted') {
    showInstallButton.value = false
  }

  deferredPrompt.value = null
}
</script>

<template>
  <footer class="bg-white dark:bg-slate-800 border-t border-gray-200 dark:border-slate-700 py-6 mt-auto">
    <div class="container mx-auto px-4">
      <div class="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-600 dark:text-gray-400">
        <!-- 版权信息 -->
        <div class="flex items-center gap-4">
          <span>© 2024 Little Guai</span>
          <span class="hidden md:inline">|</span>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            class="hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
          >
            GitHub
          </a>
        </div>

        <!-- 隐私说明 -->
        <div class="text-center md:text-right">
          <p>所有数据处理均在浏览器本地完成，不会上传到服务器</p>
        </div>

        <!-- 安装按钮 -->
        <button
          v-if="showInstallButton"
          @click="installApp"
          class="btn-primary text-xs"
        >
          安装应用
        </button>
      </div>
    </div>
  </footer>
</template>
